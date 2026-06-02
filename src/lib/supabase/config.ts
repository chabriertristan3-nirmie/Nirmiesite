/* Single source of truth for whether Supabase is wired up.
   When the env vars are empty the whole app gracefully falls back to the
   Pontoise seed, so the site runs with zero configuration. */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured: boolean = Boolean(
  SUPABASE_URL && SUPABASE_ANON_KEY,
);
