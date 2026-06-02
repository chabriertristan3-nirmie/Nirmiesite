# Nirmie — site vitrine + espace pro

Site web de **Nirmie**, l'application mobile de géogamification qui transforme les
lieux réels en terrains d'aventure. Reconstruction en production de la maquette
HD, fidèle à la direction artistique, avec un backend **Supabase** prêt à brancher.

> **Un jeu pour les visiteurs. Un outil de pilotage pour les organisateurs.**

- **Stack** : Next.js 15 (App Router) · TypeScript · React 19 · CSS global (design tokens) · Supabase (`@supabase/ssr`).
- **Vitrine** : Accueil, L'univers, L'application, Animations pro, Contact.
- **Espace pro** : Connexion → Tableau de bord → Détail d'une animation.

---

## Démarrage rapide

```bash
npm install
npm run dev      # http://localhost:3000
```

Le site **tourne immédiatement, sans configuration** : en l'absence de clés
Supabase il bascule en *mode démo* et sert les données de seed « Pontoise »
(les mêmes chiffres que la maquette). La connexion à l'espace pro accepte
n'importe quels identifiants et entre dans le tableau de bord.

```bash
npm run build && npm start   # build de production
```

---

## Mode Supabase (auth + données réelles)

1. Copier les variables d'environnement :

   ```bash
   cp .env.example .env.local
   ```

   ```dotenv
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```

2. Appliquer le schéma et le seed (Supabase CLI ou éditeur SQL) :

   ```bash
   supabase db push          # applique supabase/migrations/0001_init.sql
   psql "$DATABASE_URL" -f supabase/seed.sql   # données de démo Pontoise
   ```

3. Créer un compte organisateur (Auth) puis **lier son profil à l'organisation** :

   ```sql
   insert into profiles (id, organization_id, full_name, role)
   values ('<auth-user-uuid>', '11111111-1111-1111-1111-111111111111',
           'Ville de Pontoise', 'owner');
   ```

Dès que les variables sont renseignées :
- le **login** passe par `supabase.auth.signInWithPassword` ;
- le **middleware** protège `/pro/dashboard` et `/pro/detail` ;
- le **tableau de bord / détail** lisent les vues d'agrégats (`v_animation_kpis`, `v_poi_stats`, `v_frequentation_daily`, `v_age_distribution`, `v_commerce_interactions`) ;
- le **formulaire de contact** insère dans `leads`.

Toutes les vues sont **scopées à l'organisation** du compte connecté (`current_org()`)
et calculées à partir d'events bruts **jamais exposés** au front (RGPD).

---

## Structure

```
src/
  app/
    layout.tsx              # <html>, fonts (Sora + Inter), globals.css
    globals.css             # design system (tokens + composants) — porté de site.css
    (site)/                 # vitrine : header + footer + particules + effets
      layout.tsx
      page.tsx              # Accueil
      univers/ application/ animations-pro/ contact/
    pro/                    # espace pro : chrome dédié (sidebar/topbar)
      layout.tsx
      login/ dashboard/ detail/
    middleware.ts → src/middleware.ts (protège les routes pro si Supabase actif)
  components/               # SiteHeader, SiteFooter, Particles, SiteEffects,
                            # StoreBadges, CountUp, QrCode, ProBodyClass
  lib/
    supabase/               # client (browser), server (SSR), config
    data/                   # types, seed Pontoise, accès données (seed↔Supabase)
  styles/
    pages.css               # styles des pages vitrine
    pro.css                 # styles de l'espace pro
supabase/
  migrations/0001_init.sql  # schéma + RLS + vues d'agrégats
  seed.sql                  # données de démo Pontoise
public/assets/              # visuels (PLACEHOLDERS — à remplacer, voir ci-dessous)
scripts/generate_placeholders.py
```

### Couche données (`src/lib/data`)
`getDashboardData()`, `getDetailData()`, `listAnimations()` renvoient le **seed**
si Supabase n'est pas configuré, sinon interrogent les vues — avec repli sur le
seed en cas d'erreur, pour que l'UI ne casse jamais. Brancher la prod = renseigner
les variables d'environnement, rien d'autre à changer dans le front.

---

## ⚠️ Assets — placeholders à remplacer

Les images de `public/assets/` sont des **placeholders on-brand générés** (dégradés
verts + emblème + libellés), car les visuels sources n'étaient pas fournis avec la
maquette. Il suffit de déposer les vrais fichiers `.png` aux mêmes noms
(`emblem-electric.png`, `cut-gromousse.png`, `scene-a.png` … `scene-r.png`,
`map-pose.png`, etc.) pour les remplacer — aucun changement de code nécessaire.

Régénérer les placeholders : `python3 scripts/generate_placeholders.py`.

---

## Phase 2 (non bloquant)
- Liens réels **App Store / Google Play** (badges actuellement en `href="#"`).
- **QR code** de téléchargement réel (actuellement décoratif/déterministe).
- Génération réelle des **bilans PDF / exports CSV** (Edge Function).
- Envoi d'email sur nouveau **lead** (Edge Function / Resend).

---

## Direction artistique
Sombre, immersif, « forêt magique ». Vert électrique `#4FD900` = action.
Tous les tokens sont dans `src/app/globals.css` (`:root`). Typo : **Sora** (titres)
+ **Inter** (texte). Effets signature : champ de particules « Ætheris », scroll-reveal
(avec filet de sécurité), parallax léger, glow au curseur, count-up des chiffres.
