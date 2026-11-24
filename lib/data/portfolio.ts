import "server-only";

import { cache } from "react";

import {
  fallbackCertifications,
  fallbackEducation,
  fallbackExperience,
  fallbackProfile,
  fallbackProjects,
  fallbackSkills,
  fallbackTestimonials,
} from "@/lib/data/fallback";
import { createClient } from "@/lib/supabase/server";
import type {
  Certification,
  Education,
  Experience,
  Profile,
  Project,
  Skill,
  Testimonial,
} from "@/lib/types";

function asArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

function str(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function nullableStr(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

async function selectPublished<T>(table: string): Promise<T[] | null> {
  const supabase = await createClient();
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("published", true);
    if (error || !data) return null;
    return data as T[];
  } catch {
    return null;
  }
}

function mapProject(row: Record<string, unknown>): Project {
  return {
    id: str(row.id),
    slug: str(row.slug),
    title: str(row.title),
    description: str(row.description),
    thumbnail: nullableStr(row.thumbnail),
    gallery: asArray(row.gallery),
    category: str(row.category, "Project"),
    technologies: asArray(row.technologies),
    role: str(row.role),
    features: asArray(row.features),
    challenges: asArray(row.challenges),
    solutions: asArray(row.solutions),
    results: asArray(row.results),
    overview: nullableStr(row.overview),
    problem: nullableStr(row.problem),
    objectives: asArray(row.objectives),
    process: asArray(row.process),
    live_url: nullableStr(row.live_url),
    github_url: nullableStr(row.github_url),
    featured: Boolean(row.featured),
    published: Boolean(row.published),
    created_at: nullableStr(row.created_at),
  };
}

export const getProjects = cache(async (): Promise<Project[]> => {
  const rows = await selectPublished<Record<string, unknown>>("projects");
  if (!rows || rows.length === 0) return fallbackProjects;
  return rows.map(mapProject);
});

export const getFeaturedProjects = cache(async (): Promise<Project[]> => {
  const projects = await getProjects();
  return projects.filter((p) => p.featured);
});

export const getProjectBySlug = cache(async (slug: string): Promise<Project | null> => {
  try {
    const supabase = await createClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (!error && data) return mapProject(data as Record<string, unknown>);
    }
  } catch {
    // fall through to verified static content
  }
  return fallbackProjects.find((p) => p.slug === slug) ?? null;
});

export const getSkills = cache(async (): Promise<Skill[]> => {
  const rows = await selectPublished<Record<string, unknown>>("skills");
  if (!rows || rows.length === 0) return fallbackSkills;
  return rows
    .map((row) => ({
      id: str(row.id),
      name: str(row.name),
      category: str(row.category, "Other"),
      note: nullableStr(row.note),
      sort_order: typeof row.sort_order === "number" ? row.sort_order : 0,
      published: true,
    }))
    .sort((a, b) => a.sort_order - b.sort_order);
});

export const getEducation = cache(async (): Promise<Education[]> => {
  const rows = await selectPublished<Record<string, unknown>>("education");
  if (!rows || rows.length === 0) return fallbackEducation;
  return rows.map((row) => ({
    id: str(row.id),
    institution: str(row.institution),
    program: str(row.program),
    degree: nullableStr(row.degree),
    gpa: nullableStr(row.gpa),
    start_date: nullableStr(row.start_date),
    end_date: nullableStr(row.end_date),
    description: nullableStr(row.description),
    published: true,
  }));
});

export const getExperience = cache(async (): Promise<Experience[]> => {
  const rows = await selectPublished<Record<string, unknown>>("experiences");
  if (!rows || rows.length === 0) return fallbackExperience;
  return rows.map((row) => ({
    id: str(row.id),
    title: str(row.title),
    organization: str(row.organization),
    type: str(row.type, "Project"),
    start_date: nullableStr(row.start_date),
    end_date: nullableStr(row.end_date),
    description: nullableStr(row.description),
    highlights: asArray(row.highlights),
    url: nullableStr(row.url),
    published: true,
  }));
});

export const getCertifications = cache(async (): Promise<Certification[]> => {
  const rows = await selectPublished<Record<string, unknown>>("certifications");
  if (!rows || rows.length === 0) return fallbackCertifications;
  return rows.map((row) => ({
    id: str(row.id),
    name: str(row.name),
    issuer: str(row.issuer),
    issue_date: nullableStr(row.issue_date),
    credential_id: nullableStr(row.credential_id),
    verification_url: nullableStr(row.verification_url),
    image_url: nullableStr(row.image_url),
    description: nullableStr(row.description),
    published: true,
  }));
});

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  const supabase = await createClient();
  if (!supabase) return fallbackTestimonials;
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("published", true)
      .eq("approved", true);
    if (error || !data || data.length === 0) return fallbackTestimonials;
    return (data as Record<string, unknown>[]).map((row) => ({
      id: str(row.id),
      author_name: str(row.author_name),
      author_role: nullableStr(row.author_role),
      organization: nullableStr(row.organization),
      content: str(row.content),
      approved: true,
      featured: Boolean(row.featured),
    }));
  } catch {
    return fallbackTestimonials;
  }
});

export const getProfile = cache(async (): Promise<Profile> => {
  const supabase = await createClient();
  if (!supabase) return fallbackProfile;
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .limit(1)
      .maybeSingle();
    if (error || !data) return fallbackProfile;
    const row = data as Record<string, unknown>;
    return {
      id: str(row.id, fallbackProfile.id),
      headline: str(row.headline, fallbackProfile.headline),
      summary: str(row.summary, fallbackProfile.summary),
      location: nullableStr(row.location),
      availability: nullableStr(row.availability),
      about: nullableStr(row.about) ?? fallbackProfile.about,
      philosophy: nullableStr(row.philosophy) ?? fallbackProfile.philosophy,
      updated_at: nullableStr(row.updated_at),
    };
  } catch {
    return fallbackProfile;
  }
});
