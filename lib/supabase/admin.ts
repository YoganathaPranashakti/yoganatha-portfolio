import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Privileged server-only client. The service role key bypasses RLS, so this
 * module must never be imported into a Client Component or a route that is
 * not explicitly authorized. Admin authorization is enforced before use.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;

  return createSupabaseClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
