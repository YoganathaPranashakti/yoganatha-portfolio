import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Cookie-free anon client for public reads. RLS still applies; no session is
 * needed, so Server Components using it can remain statically generated.
 */
export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return createSupabaseClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
