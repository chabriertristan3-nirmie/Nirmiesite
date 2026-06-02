/* ============================================================
   Pro-space data access.
   Seed-first: returns the Pontoise demo data when Supabase isn't
   configured. When it is, it reads the aggregate views described in the
   README (v_animation_kpis, v_poi_stats, …) and falls back to seed on any
   error so the UI never breaks.
   ============================================================ */

import { getServerSupabase } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { ANIMATIONS, PONTOISE_DASHBOARD, PONTOISE_DETAIL } from "./seed";
import type {
  AnimationSummary,
  DashboardData,
  DetailData,
} from "./types";

export async function listAnimations(): Promise<AnimationSummary[]> {
  if (isSupabaseConfigured) {
    try {
      const sb = await getServerSupabase();
      const { data } = await sb!
        .from("animations")
        .select("id,name,kind,status,location_label,starts_at")
        .order("starts_at", { ascending: false });
      if (data?.length) {
        // Aggregate completion/participants come from v_animation_kpis.
        const { data: kpis } = await sb!
          .from("v_animation_kpis")
          .select("animation_id,participants,completion_rate");
        const byId = new Map(
          (kpis ?? []).map((k) => [k.animation_id as string, k]),
        );
        return data.map((a): AnimationSummary => {
          const k = byId.get(a.id as string);
          return {
            id: a.id as string,
            name: a.name as string,
            subtitle: (a.location_label as string) ?? "",
            kind: a.kind as AnimationSummary["kind"],
            status: a.status as AnimationSummary["status"],
            dateLabel: "",
            participants: (k?.participants as number) ?? 0,
            completion: (k?.completion_rate as number) ?? 0,
          };
        });
      }
    } catch {
      /* fall through to seed */
    }
  }
  return ANIMATIONS;
}

export async function getDashboardData(
  animationId = "pontoise",
): Promise<DashboardData> {
  if (isSupabaseConfigured) {
    try {
      const sb = await getServerSupabase();
      const [{ data: kpi }, { data: freq }, { data: ages }, { data: places }] =
        await Promise.all([
          sb!.from("v_animation_kpis").select("*").eq("animation_id", animationId).single(),
          sb!.from("v_frequentation_daily").select("day,visits").eq("animation_id", animationId).order("day"),
          sb!.from("v_age_distribution").select("age_bucket,pct").eq("animation_id", animationId),
          sb!.from("v_poi_stats").select("name,visits,heat").eq("animation_id", animationId).order("visits", { ascending: false }),
        ]);
      if (kpi) {
        const ageColors: Record<string, string> = {
          "21-30": "#4FD900",
          "31-50": "#2EA300",
          "51+": "#7BEE3C",
          "<20": "#1f6b00",
        };
        return {
          ...PONTOISE_DASHBOARD,
          animationId,
          kpis: {
            participants: kpi.participants,
            visits: kpi.visits,
            completionRate: kpi.completion_rate,
            partners: kpi.partners,
            avgMinutes: kpi.avg_minutes,
          },
          frequentation: (freq ?? []).map((f) => f.visits as number),
          ages: (ages ?? []).map((a) => ({
            label: a.age_bucket as string,
            pct: a.pct as number,
            color: ageColors[a.age_bucket as string] ?? "#4FD900",
          })),
          topPlaces: (places ?? []).slice(0, 6).map((p) => ({
            name: p.name as string,
            visits: p.visits as number,
            heat: p.heat as DashboardData["topPlaces"][number]["heat"],
          })),
          animations: await listAnimations(),
        };
      }
    } catch {
      /* fall through to seed */
    }
  }
  return { ...PONTOISE_DASHBOARD, animations: await listAnimations() };
}

export async function getDetailData(
  animationId = "pontoise",
): Promise<DetailData> {
  if (isSupabaseConfigured) {
    try {
      const sb = await getServerSupabase();
      const { data: commerces } = await sb!
        .from("v_commerce_interactions")
        .select("name,interactions")
        .eq("animation_id", animationId)
        .order("interactions", { ascending: false });
      if (commerces?.length) {
        return {
          ...PONTOISE_DETAIL,
          animationId,
          commerceInteractions: commerces.map((c) => ({
            name: c.name as string,
            interactions: c.interactions as number,
          })),
        };
      }
    } catch {
      /* fall through to seed */
    }
  }
  return PONTOISE_DETAIL;
}
