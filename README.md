# Nirmie — site vitrine + espace pro

Site web de **Nirmie**, l'application mobile de géogamification qui transforme les
lieux réels en terrains d'aventure.

> **Un jeu pour les visiteurs. Un outil de pilotage pour les organisateurs.**

## Architecture

Deux parties dans un seul projet déployé sur Vercel :

1. **Vitrine (public)** — les pages marketing sont servies telles quelles depuis
   le **bundle de design validé** (`/public/*.html` + `/public/assets/`), issu de
   Claude Design. Avantages : rendu **100% fidèle** au design, et **mise à jour =
   simple remplacement du bundle** (aucun portage manuel).
   Pages : `index`, `univers`, `application`, `animations-pro`, `contact`,
   `support`, `mentions-legales`, `confidentialite`, `cgu`.
   URLs propres (`/univers`, `/contact`, …) via des *rewrites* (voir `next.config.mjs`).

2. **Espace pro** — application **Next.js (App Router) + TypeScript + Supabase**
   sous `/pro/*` : connexion (Supabase Auth + repli démo), tableau de bord, détail
   d'animation. Tourne en **mode démo** (seed Pontoise) sans configuration.

## Démarrage

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Mettre à jour la vitrine (design)

Quand une nouvelle version du design arrive (bundle Claude Design) :

1. Remplacer les `*.html` dans `/public/` et les images dans `/public/assets/`.
2. Si de nouvelles pages apparaissent, ajouter leur *rewrite* dans `next.config.mjs`
   (`PUBLIC_PAGES`).
3. `git push` → Vercel redéploie automatiquement.

## Espace pro + Supabase

Sans variables d'environnement, l'espace pro tourne en démo (seed Pontoise).
Pour le brancher en réel :

```bash
cp .env.example .env.local   # renseigner NEXT_PUBLIC_SUPABASE_URL / _ANON_KEY
supabase db push             # supabase/migrations/0001_init.sql
psql "$DATABASE_URL" -f supabase/seed.sql
```

Détails (RLS, vues d'agrégats RGPD, liaison du profil organisateur) : voir
`supabase/migrations/0001_init.sql` et `supabase/seed.sql`.

## Assets placeholders ⚠️

Certaines images sont des **placeholders on-brand générés** (`scripts/*.py`), en
attendant les vrais visuels : **captures d'écran de l'app** (`assets/screens/*`),
**cocons compagnons** (`assets/c-*.png`), **hero-group**, **Nirmies nommés**
(`assets/n-*.png`), et la **vidéo teaser** (`assets/nirmie-teaser.mp4`).
Les vrais fichiers se déposent aux **mêmes noms**, aucun changement de code.
Les vrais visuels déjà fournis : photos pro (`assets/pro-*.jpg`), Volcory
(`assets/v-volcory*.png`), et les vignettes de collection (`assets/sm/*`).

## Phase 2 (non bloquant)
- Capture réelle des leads (formulaire contact) et des e-mails waitlist (`#bientot`).
- Liens stores réels + QR code réel quand l'app sort.
- Génération réelle des bilans PDF / exports CSV (Edge Function).
