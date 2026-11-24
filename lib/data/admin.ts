import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";

import { getAdminUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { DashboardStats } from "@/lib/types";

/** Authorization lives in the data layer, so every admin read is protected. */
export const requireAdminRead = cache(async () => {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login");
  return admin;
});

export type AdminRow = Record<string, unknown>;

/** Reads all rows of an allowed table. RLS still applies and permits only admins. */
export async function getAdminRows(
  table:
    | "projects"
    | "skills"
    | "experiences"
    | "education"
    | "certifications"
    | "testimonials"
    | "contact_messages"
    | "profiles",
): Promise<AdminRow[]> {
  await requireAdminRead();
  const supabase = await createClient();
  if (!supabase) return [];
  const { data, error } = await supabase.from(table).select("*");
  if (error || !data) return [];
  return data as AdminRow[];
}

async function count(
  table: "projects" | "certifications" | "testimonials" | "contact_messages",
  filters?: Record<string, unknown>,
): Promise<number> {
  const supabase = await createClient();
  if (!supabase) return 0;
  let query = supabase.from(table).select("*", { count: "exact", head: true });
  for (const [key, value] of Object.entries(filters ?? {})) {
    query = query.eq(key, value);
  }
  const { count: total, error } = await query;
  return error ? 0 : (total ?? 0);
}

export async function getDashboardStats(): Promise<DashboardStats> {
  await requireAdminRead();
  const [projects, publishedProjects, certifications, testimonials, pendingTestimonials, messages, unreadMessages] =
    await Promise.all([
      count("projects"),
      count("projects", { published: true }),
      count("certifications"),
      count("testimonials"),
      count("testimonials", { approved: false }),
      count("contact_messages", { archived: false }),
      count("contact_messages", { is_read: false, archived: false }),
    ]);

  return {
    projects,
    publishedProjects,
    certifications,
    testimonials,
    pendingTestimonials,
    messages,
    unreadMessages,
  };
}

export function isSupabaseReady() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
