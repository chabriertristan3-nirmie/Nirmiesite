import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from "./config";

/**
 * Server Supabase client (App Router). Returns `null` in demo mode.
 * Reads/writes the auth session through Next's cookie store.
 */
export async function getServerSupabase() {
  if (!isSupabaseConfigured) return null;

  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set({ name, value, ...options }),
          );
        } catch {
          // Called from a Server Component — middleware refreshes the session.
        }
      },
    },
  });
}
