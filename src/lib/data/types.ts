/* Shared types for the pro-space data layer. */

export type AnimationStatus = "draft" | "live" | "done";
export type AnimationKind = "ville" | "salon" | "cc" | "tourisme";
export type Heat = "hot" | "warm" | "cold";

export interface AnimationSummary {
  id: string;
  name: string;
  subtitle: string;
  kind: AnimationKind;
  status: AnimationStatus;
  dateLabel: string;
  participants: number;
  completion: number; // percent
}

export interface AnimationKpis {
  participants: number;
  visits: number;
  completionRate: number; // percent
  partners: number;
  avgMinutes: number;
}

export interface AgeSegment {
  label: string;
  pct: number;
  color: string;
}

export interface PoiStat {
  name: string;
  visits: number;
  heat: Heat;
}

export interface CommerceInteraction {
  name: string;
  interactions: number;
}

export interface VisitShare {
  label: string;
  pct: number;
}

/** A point of interest placed on the internal animation map (detail view). */
export interface MapPoi {
  rank: number;
  name: string;
  visits: number;
  heat: Heat;
  /** position in percent of the map viewport */
  left: number;
  top: number;
  /** pin diameter in px */
  size: number;
}

export interface Recommendation {
  title: string;
  body: string;
  icon: "balance" | "trend" | "clock";
}

export interface DashboardData {
  animationId: string;
  animationLabel: string;
  kpis: AnimationKpis;
  frequentation: number[];
  ages: AgeSegment[];
  topPlaces: PoiStat[];
  visitShares: VisitShare[];
  animations: AnimationSummary[];
}

export interface DetailData {
  animationId: string;
  name: string;
  badge: string;
  kpis: Pick<AnimationKpis, "participants" | "visits" | "completionRate">;
  mapPois: MapPoi[];
  /** route polyline points in the 800×600 map viewBox */
  route: [number, number][];
  placeStats: PoiStat[];
  recommendations: Recommendation[];
  commerceInteractions: CommerceInteraction[];
}
