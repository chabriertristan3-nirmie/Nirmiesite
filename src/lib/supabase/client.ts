"use client";

import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from "./config";

/**
 * Browser Supabase client. Returns `null` when Supabase isn't configured
 * (demo mode), so callers can fall back to mock behaviour.
 */
export function getBrowserSupabase() {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
