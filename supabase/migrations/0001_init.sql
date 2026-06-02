-- ============================================================
-- NIRMIE — initial schema (auth + animations + RGPD aggregates)
-- Apply with the Supabase CLI (`supabase db push`) or paste in the
-- SQL editor. Mirrors the data model described in the handoff README.
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- Organisations & members ----------
create table if not exists organizations (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  type        text not null default 'autre'
              check (type in ('ville','salon','cc','tourisme','autre')),
  created_at  timestamptz not null default now()
);

create table if not exists profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid references organizations(id) on delete set null,
  full_name       text,
  role            text not null default 'member' check (role in ('owner','member')),
  created_at      timestamptz not null default now()
);

-- ---------- Animations ----------
create table if not exists animations (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  name            text not null,
  kind            text not null check (kind in ('ville','salon','cc','tourisme')),
  status          text not null default 'draft' check (status in ('draft','live','done')),
  starts_at       timestamptz,
  ends_at         timestamptz,
  location_label  text,
  created_at      timestamptz not null default now()
);

-- Points of interest = NFC figurines placed at partner venues.
-- `category` (place|commerce) is an extension of the README schema so the
-- dashboard can separate "lieux visités" from "interactions par commerce".
create table if not exists pois (
  id            uuid primary key default gen_random_uuid(),
  animation_id  uuid not null references animations(id) on delete cascade,
  name          text not null,
  label         text,
  category      text not null default 'place' check (category in ('place','commerce')),
  nfc_tag_id    text,
  lat           double precision,
  lng           double precision,
  sort_order    int default 0
);

-- ---------- Raw field events (NEVER exposed to the pro front-end) ----------
create table if not exists play_sessions (
  id              uuid primary key default gen_random_uuid(),
  animation_id    uuid not null references animations(id) on delete cascade,
  anon_session_id text not null,                       -- rotating hash, no identity
  started_at      timestamptz not null default now(),
  completed_at    timestamptz,
  age_bucket      text check (age_bucket in ('<20','21-30','31-50','51+'))
);

create table if not exists scan_events (
  id              uuid primary key default gen_random_uuid(),
  animation_id    uuid not null references animations(id) on delete cascade,
  poi_id          uuid not null references pois(id) on delete cascade,
  anon_session_id text not null,
  scanned_at      timestamptz not null default now()
);

-- ---------- Leads (contact / demo requests) ----------
create table if not exists leads (
  id            uuid primary key default gen_random_uuid(),
  profile_type  text,
  name          text,
  organization  text,
  email         text,
  phone         text,
  message       text,
  source        text default 'contact',
  created_at    timestamptz not null default now()
);

create index if not exists idx_animations_org on animations(organization_id);
create index if not exists idx_pois_anim on pois(animation_id);
create index if not exists idx_sessions_anim on play_sessions(animation_id);
create index if not exists idx_scans_anim on scan_events(animation_id);
create index if not exists idx_scans_poi on scan_events(poi_id);

-- ============================================================
-- Helper: the organization of the current authenticated user.
-- ============================================================
create or replace function current_org()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select organization_id from profiles where id = auth.uid()
$$;

-- ============================================================
-- Aggregate views (RGPD-safe). These are SECURITY DEFINER by default, so
-- they read the raw tables without exposing them — and each view is scoped
-- to the caller's organisation via current_org().
-- ============================================================
create or replace view v_animation_kpis as
select
  a.id as animation_id,
  (select count(*) from play_sessions ps where ps.animation_id = a.id) as participants,
  (select count(*) from scan_events se where se.animation_id = a.id) as visits,
  coalesce(round(
    100.0 * (select count(*) from play_sessions ps where ps.animation_id = a.id and ps.completed_at is not null)
          / nullif((select count(*) from play_sessions ps where ps.animation_id = a.id), 0)
  ), 0)::int as completion_rate,
  (select count(*) from pois p where p.animation_id = a.id and p.category = 'commerce') as partners,
  coalesce(round((
    select avg(extract(epoch from (ps.completed_at - ps.started_at)) / 60.0)
    from play_sessions ps where ps.animation_id = a.id and ps.completed_at is not null
  )), 0)::int as avg_minutes
from animations a
where a.organization_id = current_org();

create or replace view v_poi_stats as
select
  p.animation_id,
  p.id as poi_id,
  p.name,
  count(se.id) as visits,
  case when count(se.id) >= 27 then 'hot'
       when count(se.id) >= 20 then 'warm'
       else 'cold' end as heat
from pois p
left join scan_events se on se.poi_id = p.id
join animations a on a.id = p.animation_id
where p.category = 'place' and a.organization_id = current_org()
group by p.animation_id, p.id, p.name;

create or replace view v_commerce_interactions as
select
  p.animation_id,
  p.id as poi_id,
  p.name,
  count(se.id) as interactions
from pois p
left join scan_events se on se.poi_id = p.id
join animations a on a.id = p.animation_id
where p.category = 'commerce' and a.organization_id = current_org()
group by p.animation_id, p.id, p.name;

create or replace view v_frequentation_daily as
select
  se.animation_id,
  (date_trunc('day', se.scanned_at))::date as day,
  count(*) as visits
from scan_events se
join animations a on a.id = se.animation_id
where a.organization_id = current_org()
group by se.animation_id, day;

create or replace view v_age_distribution as
select
  ps.animation_id,
  ps.age_bucket,
  round(100.0 * count(*) / nullif(sum(count(*)) over (partition by ps.animation_id), 0))::int as pct
from play_sessions ps
join animations a on a.id = ps.animation_id
where ps.age_bucket is not null and a.organization_id = current_org()
group by ps.animation_id, ps.age_bucket;

-- ============================================================
-- Row Level Security
-- ============================================================
alter table organizations  enable row level security;
alter table profiles       enable row level security;
alter table animations     enable row level security;
alter table pois           enable row level security;
alter table play_sessions  enable row level security;
alter table scan_events    enable row level security;
alter table leads          enable row level security;

-- profiles: a user reads/updates their own row
create policy "own profile (select)" on profiles
  for select using (id = auth.uid());
create policy "own profile (update)" on profiles
  for update using (id = auth.uid());

-- organizations: members read their own org
create policy "member reads org" on organizations
  for select using (id = current_org());

-- animations: members read their org's animations
create policy "member reads animations" on animations
  for select using (organization_id = current_org());

-- pois: members read pois of their org's animations
create policy "member reads pois" on pois
  for select using (
    animation_id in (select id from animations where organization_id = current_org())
  );

-- play_sessions & scan_events: NO policies → raw events are service-role only.

-- leads: anyone can submit (contact form); only service role can read.
create policy "public can submit leads" on leads
  for insert to anon, authenticated with check (true);

-- ---------- Grants (RLS still applies on top) ----------
grant usage on schema public to anon, authenticated;
grant select on organizations, animations, pois to authenticated;
grant insert on leads to anon, authenticated;
grant select on
  v_animation_kpis, v_poi_stats, v_commerce_interactions,
  v_frequentation_daily, v_age_distribution
  to authenticated;
