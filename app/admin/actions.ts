"use server";

import { revalidatePath } from "next/cache";
import { getAdminUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/lib/types";

type TableName =
  | "projects"
  | "skills"
  | "experiences"
  | "education"
  | "certifications"
  | "testimonials"
  | "contact_messages"
  | "profiles";

const STRING_FIELDS: Record<TableName, string[]> = {
  projects: [
    "title", "slug", "description", "category", "role", "thumbnail", "live_url",
    "github_url", "overview", "problem",
  ],
  skills: ["name", "category", "note"],
  experiences: ["title", "organization", "type", "start_date", "end_date", "description", "url"],
  education: ["institution", "program", "degree", "gpa", "start_date", "end_date", "description"],
  certifications: ["name", "issuer", "issue_date", "credential_id", "verification_url", "image_url", "description"],
  testimonials: ["author_name", "author_role", "organization", "content"],
  contact_messages: ["name", "email", "subject", "message"],
  profiles: ["headline", "summary", "location", "availability", "about", "philosophy"],
};

const LIST_FIELDS: Record<TableName, string[]> = {
  projects: ["technologies", "features", "challenges", "solutions", "results", "objectives", "process", "gallery"],
  skills: [],
  experiences: ["highlights"],
  education: [],
  certifications: [],
  testimonials: [],
  contact_messages: [],
  profiles: [],
};

const BOOL_FIELDS: Record<TableName, string[]> = {
  projects: ["featured", "published"],
  skills: ["published"],
  experiences: ["published"],
  education: ["published"],
  certifications: ["published"],
  testimonials: ["approved", "featured", "published"],
  contact_messages: ["is_read", "is_replied", "archived"],
  profiles: [],
};

const NUMBER_FIELDS: Record<TableName, string[]> = {
  projects: [],
  skills: ["sort_order"],
  experiences: [],
  education: [],
  certifications: [],
  testimonials: [],
  contact_messages: [],
  profiles: [],
};

async function authorize(): Promise<ActionResult> {
  const admin = await getAdminUser();
  return admin ? { ok: true, data: undefined } : { ok: false, error: "Unauthorized." };
}

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/projects");
  revalidatePath("/certifications");
  revalidatePath("/admin", "layout");
}

function parseValues(table: TableName, input: Record<string, unknown>) {
  const values: Record<string, unknown> = {};
  for (const key of STRING_FIELDS[table]) {
    if (key in input) values[key] = String(input[key] ?? "");
  }
  for (const key of LIST_FIELDS[table]) {
    if (key in input) {
      const raw = input[key];
      values[key] = Array.isArray(raw)
        ? raw.filter((item): item is string => typeof item === "string")
        : String(raw ?? "")
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);
    }
  }
  for (const key of BOOL_FIELDS[table]) {
    if (key in input) values[key] = Boolean(input[key]);
  }
  for (const key of NUMBER_FIELDS[table]) {
    if (key in input) values[key] = Number(input[key]) || 0;
  }
  return values;
}

export async function upsertResource(
  table: TableName,
  id: string | null,
  input: Record<string, unknown>,
): Promise<ActionResult<string>> {
  const auth = await authorize();
  if (!auth.ok) return auth;

  const supabase = await createClient();
  if (!supabase) return { ok: false, error: "Supabase is not configured." };

  const values = parseValues(table, input);
  if (table === "projects") {
    if (!values.title || !values.slug) return { ok: false, error: "Title and slug are required." };
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(values.slug))) {
      return { ok: false, error: "Slug must use lowercase letters, numbers and hyphens." };
    }
  }

  let result;
  if (id) {
    result = await supabase.from(table).update(values).eq("id", id).select("id").single();
  } else {
    result = await supabase.from(table).insert(values).select("id").single();
  }

  if (result.error) return { ok: false, error: result.error.message };
  revalidateAll();
  return { ok: true, data: result.data.id as string };
}

export async function deleteResource(table: TableName, id: string): Promise<ActionResult> {
  const auth = await authorize();
  if (!auth.ok) return auth;

  const supabase = await createClient();
  if (!supabase) return { ok: false, error: "Supabase is not configured." };

  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidateAll();
  return { ok: true, data: undefined };
}

export async function setField(
  table: TableName,
  id: string,
  field: string,
  value: boolean,
): Promise<ActionResult> {
  const auth = await authorize();
  if (!auth.ok) return auth;
  if (!BOOL_FIELDS[table].includes(field)) return { ok: false, error: "Field not allowed." };

  const supabase = await createClient();
  if (!supabase) return { ok: false, error: "Supabase is not configured." };

  const { error } = await supabase.from(table).update({ [field]: value }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidateAll();
  return { ok: true, data: undefined };
}

export async function uploadImage(formData: FormData): Promise<ActionResult<string>> {
  const auth = await authorize();
  if (!auth.ok) return auth;

  const supabase = await createClient();
  if (!supabase) return { ok: false, error: "Supabase is not configured." };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Choose an image file." };
  }
  if (file.size > 4 * 1024 * 1024) {
    return { ok: false, error: "Images must be smaller than 4 MB." };
  }
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/svg+xml"];
  if (!allowed.includes(file.type)) {
    return { ok: false, error: "Only JPEG, PNG, WebP, AVIF or SVG images are allowed." };
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;

  const { error } = await supabase.storage
    .from("portfolio-images")
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) return { ok: false, error: error.message };
  const { data } = supabase.storage.from("portfolio-images").getPublicUrl(path);
  return { ok: true, data: data.publicUrl };
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase?.auth.signOut();
  revalidatePath("/admin", "layout");
}
