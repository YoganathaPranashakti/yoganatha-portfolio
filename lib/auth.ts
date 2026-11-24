import "server-only";

import { cache } from "react";
import type { User } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/server";

/**
 * Server-side admin authorization. Checks the authenticated user against the
 * admin_users table through RLS; hidden UI is never used as authorization.
 */
export const getAdminUser = cache(async (): Promise<User | null> => {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;

  const { data: adminRow, error: adminError } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (adminError || !adminRow) return null;
  return data.user;
});
