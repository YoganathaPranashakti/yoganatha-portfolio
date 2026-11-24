import type { MetadataRoute } from "next";

import { getProjects } from "@/lib/data/portfolio";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const projects = await getProjects();
  const now = new Date();

  const staticRoutes = [
    { path: "/", priority: 1, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/certifications", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...projects.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      lastModified: project.created_at ? new Date(project.created_at) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
