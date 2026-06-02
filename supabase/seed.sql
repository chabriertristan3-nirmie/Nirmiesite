-- ============================================================
-- NIRMIE — demo seed (Pontoise).
-- Produces representative figures behind the aggregate views.
-- Run after 0001_init.sql:  supabase db reset   (or paste in SQL editor)
--
-- NOTE: the aggregate views are scoped to current_org(). To SEE this data
-- in the dashboard you must be authenticated as a member of the org below.
-- After creating the auth user, link their profile to the org:
--
--   insert into profiles (id, organization_id, full_name, role)
--   values ('<auth-user-uuid>', '11111111-1111-1111-1111-111111111111',
--           'Ville de Pontoise', 'owner');
-- ============================================================

-- Stable IDs so the seed is idempotent-friendly.
insert into organizations (id, name, type) values
  ('11111111-1111-1111-1111-111111111111', 'Ville de Pontoise', 'ville')
on conflict (id) do nothing;

insert into animations (id, organization_id, name, kind, status, starts_at, ends_at, location_label) values
  ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Pontoise — Chasse aux Nirmies', 'ville', 'done', '2025-12-01', '2025-12-21', 'Centre-ville · Noël'),
  ('22222222-2222-2222-2222-222222222233', '11111111-1111-1111-1111-111111111111', 'Salon du Mariage — Cergy', 'salon', 'live', '2026-05-28', null, 'Événement · stands'),
  ('22222222-2222-2222-2222-222222222244', '11111111-1111-1111-1111-111111111111', 'CC Art de Vivre — Beauvais', 'cc', 'live', '2026-05-21', null, 'Centre commercial · retail'),
  ('22222222-2222-2222-2222-222222222255', '11111111-1111-1111-1111-111111111111', 'Parcours Vexin — Office tourisme', 'tourisme', 'done', '2025-10-01', '2025-11-12', 'Tourisme · permanent')
on conflict (id) do nothing;

-- ---------- Places (7) ----------
insert into pois (animation_id, name, category, nfc_tag_id, sort_order)
select '22222222-2222-2222-2222-222222222222', name, 'place', 'NFC-P' || lpad(ord::text, 3, '0'), ord
from (values
  ('Place du Grand Martroy', 1),
  ('Rue de la Coutellerie', 2),
  ('Cathédrale St-Maclou', 3),
  ('Halle aux grains', 4),
  ('Quai du Pothuis', 5),
  ('Jardin de la Ville', 6),
  ('Musée Tavet-Delacour', 7)
) as p(name, ord)
where not exists (
  select 1 from pois x where x.animation_id = '22222222-2222-2222-2222-222222222222' and x.name = p.name
);

-- ---------- Commerces : 6 named + 50 generic = 56 partners ----------
insert into pois (animation_id, name, category, nfc_tag_id, sort_order)
select '22222222-2222-2222-2222-222222222222', name, 'commerce', 'NFC-C' || lpad(ord::text, 3, '0'), ord
from (values
  ('Boulangerie du Martroy', 1),
  ('Librairie des Arts', 2),
  ('Café de la Coutellerie', 3),
  ('Fromagerie Pithou', 4),
  ('Concept store Maelo', 5),
  ('Fleuriste Saint-Maclou', 6)
) as c(name, ord)
where not exists (
  select 1 from pois x where x.animation_id = '22222222-2222-2222-2222-222222222222' and x.name = c.name
);

insert into pois (animation_id, name, category, nfc_tag_id, sort_order)
select '22222222-2222-2222-2222-222222222222', 'Commerce partenaire #' || g, 'commerce', 'NFC-C' || lpad(g::text, 3, '0'), g
from generate_series(7, 56) g
where not exists (
  select 1 from pois x where x.animation_id = '22222222-2222-2222-2222-222222222222' and x.name = 'Commerce partenaire #' || g
);

-- ---------- Play sessions : 1240, 68% completed, age distribution ----------
insert into play_sessions (animation_id, anon_session_id, started_at, completed_at, age_bucket)
select
  '22222222-2222-2222-2222-222222222222',
  'sess-' || g,
  s.started,
  case when g <= 843 then s.started + ((8 + random() * 8) * interval '1 minute') else null end,
  case
    when g <= 49   then '<20'    -- 4%
    when g <= 632  then '21-30'  -- 47%
    when g <= 1103 then '31-50'  -- 38%
    else '51+'                   -- 11%
  end
from generate_series(1, 1240) g
cross join lateral (
  select timestamptz '2025-12-01' + (random() * 20) * interval '1 day' as started
) s
where not exists (
  select 1 from play_sessions x
  where x.animation_id = '22222222-2222-2222-2222-222222222222' and x.anon_session_id = 'sess-' || g
);

-- ---------- Scan events for named places (design visit counts) ----------
insert into scan_events (animation_id, poi_id, anon_session_id, scanned_at)
select p.animation_id, p.id, 'sess-' || floor(1 + random() * 1239)::int,
       timestamptz '2025-12-01' + (random() * 20) * interval '1 day'
from (values
  ('Place du Grand Martroy', 38),
  ('Rue de la Coutellerie', 31),
  ('Cathédrale St-Maclou', 27),
  ('Halle aux grains', 22),
  ('Quai du Pothuis', 18),
  ('Jardin de la Ville', 14),
  ('Musée Tavet-Delacour', 9)
) as pc(name, n)
join pois p on p.name = pc.name and p.animation_id = '22222222-2222-2222-2222-222222222222'
cross join generate_series(1, pc.n);

-- ---------- Scan events for named commerces (design interaction counts) ----------
insert into scan_events (animation_id, poi_id, anon_session_id, scanned_at)
select p.animation_id, p.id, 'sess-' || floor(1 + random() * 1239)::int,
       timestamptz '2025-12-01' + (random() * 20) * interval '1 day'
from (values
  ('Boulangerie du Martroy', 42),
  ('Librairie des Arts', 36),
  ('Café de la Coutellerie', 33),
  ('Fromagerie Pithou', 28),
  ('Concept store Maelo', 24),
  ('Fleuriste Saint-Maclou', 19)
) as cc(name, n)
join pois p on p.name = cc.name and p.animation_id = '22222222-2222-2222-2222-222222222222'
cross join generate_series(1, cc.n);

-- ---------- A few scans for generic commerces (so ~93% are "visited") ----------
insert into scan_events (animation_id, poi_id, anon_session_id, scanned_at)
select p.animation_id, p.id, 'sess-' || floor(1 + random() * 1239)::int,
       timestamptz '2025-12-01' + (random() * 20) * interval '1 day'
from pois p
cross join lateral generate_series(1, (1 + floor(random() * 3))::int) g
where p.animation_id = '22222222-2222-2222-2222-222222222222'
  and p.name like 'Commerce partenaire #%'
  and random() < 0.92;  -- ~8% never scanned

-- ---------- Sample leads ----------
insert into leads (profile_type, name, organization, email, phone, message, source) values
  ('Ville / collectivité', 'Camille Durand', 'Mairie de Pontoise', 'camille@pontoise.fr', '06 12 34 56 78', 'Animation de Noël au centre-ville.', 'contact'),
  ('Centre commercial', 'Yanis Benali', 'CC Art de Vivre', 'yanis@artdevivre.fr', '06 98 76 54 32', 'Parcours retail pour le printemps.', 'contact');
