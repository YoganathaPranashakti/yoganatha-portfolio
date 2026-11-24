"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { ProjectCard } from "@/components/projects/project-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProjectBrowser({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((project) => project.category)))],
    [projects],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = category === "All" || project.category === category;
      const haystack = `${project.title} ${project.description} ${project.technologies.join(" ")}`.toLowerCase();
      return matchesCategory && (!needle || haystack.includes(needle));
    });
  }, [projects, query, category]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter projects by category">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors",
                category === item
                  ? "border-primary bg-primary text-white"
                  : "border-line bg-surface/60 text-muted hover:border-primary/50 hover:text-foreground",
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:max-w-64">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects…"
            aria-label="Search projects"
            className="pl-10"
          />
        </div>
      </div>

      <p className="mt-5 text-xs text-muted" aria-live="polite">
        Showing {filtered.length} of {projects.length} projects
      </p>

      {filtered.length > 0 ? (
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, index) => (
            <ProjectCard key={project.id} project={project} className="h-full" priority={index === 0} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Search}
          title="No matching projects"
          description="Try another category or search term."
          className="mt-6"
        />
      )}
    </div>
  );
}
