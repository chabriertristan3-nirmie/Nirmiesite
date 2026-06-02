/* ============================================================
   Pontoise demo seed — the canonical "design" figures.
   Served by the data layer when Supabase is not configured, so the
   site (incl. the pro space) is fully functional out of the box.
   These same numbers are mirrored in supabase/seed.sql.
   ============================================================ */

import type {
  AnimationSummary,
  DashboardData,
  DetailData,
} from "./types";

export const ANIMATIONS: AnimationSummary[] = [
  {
    id: "pontoise",
    name: "Pontoise — Chasse aux Nirmies",
    subtitle: "Centre-ville · Noël",
    kind: "ville",
    status: "done",
    dateLabel: "déc. 2025 · 3 sem.",
    participants: 1240,
    completion: 68,
  },
  {
    id: "cergy-mariage",
    name: "Salon du Mariage — Cergy",
    subtitle: "Événement · stands",
    kind: "salon",
    status: "live",
    dateLabel: "en cours · J+4",
    participants: 312,
    completion: 54,
  },
  {
    id: "beauvais-cc",
    name: "CC Art de Vivre — Beauvais",
    subtitle: "Centre commercial · retail",
    kind: "cc",
    status: "live",
    dateLabel: "en cours · J+11",
    participants: 874,
    completion: 61,
  },
  {
    id: "vexin-tourisme",
    name: "Parcours Vexin — Office tourisme",
    subtitle: "Tourisme · permanent",
    kind: "tourisme",
    status: "done",
    dateLabel: "oct. 2025 · 6 sem.",
    participants: 2105,
    completion: 72,
  },
];

export const PONTOISE_DASHBOARD: DashboardData = {
  animationId: "pontoise",
  animationLabel: "Pontoise — Chasse aux Nirmies",
  kpis: {
    participants: 1240,
    visits: 365,
    completionRate: 68,
    partners: 56,
    avgMinutes: 12,
  },
  frequentation: [
    6, 9, 11, 14, 12, 22, 28, 18, 16, 20, 24, 21, 34, 41, 26, 23, 27, 30, 28, 38, 46,
  ],
  ages: [
    { label: "21–30 ans", pct: 47, color: "#4FD900" },
    { label: "31–50 ans", pct: 38, color: "#2EA300" },
    { label: "51 ans et +", pct: 11, color: "#7BEE3C" },
    { label: "< 20 ans", pct: 4, color: "#1f6b00" },
  ],
  topPlaces: [
    { name: "Place du Grand Martroy", visits: 38, heat: "hot" },
    { name: "Rue de la Coutellerie", visits: 31, heat: "hot" },
    { name: "Cathédrale St-Maclou", visits: 27, heat: "hot" },
    { name: "Halle aux grains", visits: 22, heat: "warm" },
    { name: "Quai du Pothuis", visits: 18, heat: "cold" },
    { name: "Jardin de la Ville", visits: 14, heat: "cold" },
  ],
  visitShares: [
    { label: "Commerces avec +5 visites", pct: 56 },
    { label: "Commerces avec +3 visites", pct: 71 },
    { label: "Commerces visités au moins 1 fois", pct: 93 },
  ],
  animations: ANIMATIONS,
};

export const PONTOISE_DETAIL: DetailData = {
  animationId: "pontoise",
  name: "Pontoise — Chasse aux Nirmies",
  badge: "Terminée · déc. 2025",
  kpis: { participants: 1240, visits: 365, completionRate: 68 },
  mapPois: [
    { rank: 1, name: "Place du Grand Martroy", visits: 38, heat: "hot", left: 32, top: 38, size: 34 },
    { rank: 2, name: "Rue de la Coutellerie", visits: 31, heat: "hot", left: 54, top: 30, size: 30 },
    { rank: 3, name: "Cathédrale St-Maclou", visits: 27, heat: "warm", left: 68, top: 48, size: 27 },
    { rank: 4, name: "Halle aux grains", visits: 22, heat: "warm", left: 44, top: 58, size: 24 },
    { rank: 5, name: "Quai du Pothuis", visits: 18, heat: "cold", left: 22, top: 64, size: 21 },
    { rank: 6, name: "Jardin de la Ville", visits: 14, heat: "cold", left: 78, top: 72, size: 19 },
    { rank: 7, name: "Musée Tavet", visits: 9, heat: "cold", left: 16, top: 30, size: 17 },
  ],
  route: [
    [256, 228],
    [432, 180],
    [544, 288],
    [352, 348],
    [176, 384],
  ],
  placeStats: [
    { name: "Place du Grand Martroy", visits: 38, heat: "hot" },
    { name: "Rue de la Coutellerie", visits: 31, heat: "hot" },
    { name: "Cathédrale St-Maclou", visits: 27, heat: "hot" },
    { name: "Halle aux grains", visits: 22, heat: "warm" },
    { name: "Quai du Pothuis", visits: 18, heat: "cold" },
    { name: "Musée Tavet-Delacour", visits: 9, heat: "cold" },
  ],
  recommendations: [
    {
      icon: "balance",
      title: "Renforcer le quai du Pothuis",
      body: "Zone froide sous-visitée : y placer un Nirmie rare pour rééquilibrer le flux.",
    },
    {
      icon: "trend",
      title: "Capitaliser sur le Martroy",
      body: "Point d'entrée naturel : idéal pour lancer un nouveau parcours thématique.",
    },
    {
      icon: "clock",
      title: "Prolonger la durée",
      body: "Complétion en hausse en semaine 3 : une 4ᵉ semaine maximiserait l'impact.",
    },
  ],
  commerceInteractions: [
    { name: "Boulangerie du Martroy", interactions: 42 },
    { name: "Librairie des Arts", interactions: 36 },
    { name: "Café de la Coutellerie", interactions: 33 },
    { name: "Fromagerie Pithou", interactions: 28 },
    { name: "Concept store Maelo", interactions: 24 },
    { name: "Fleuriste Saint-Maclou", interactions: 19 },
  ],
};
