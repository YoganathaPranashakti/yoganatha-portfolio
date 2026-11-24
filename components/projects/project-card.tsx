import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Github, ImageIcon } from "lucide-react";

import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/types";
import { cn, truncate } from "@/lib/utils";

export function ProjectCard({
  project,
  className,
  priority = false,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
}) {
  return (
    <SpotlightCard
      as="article"
      className={cn(
        "surface-card overflow-hidden rounded-card transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/45",
        className,
      )}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block focus-visible:outline-none"
        aria-label={`View case study: ${project.title}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-surface">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={`${project.title} interface preview`}
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="grid h-full place-items-center bg-gradient-to-br from-primary/15 via-transparent to-accent/15">
              <ImageIcon className="size-10 text-primary/60" aria-hidden="true" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" aria-hidden="true" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <Badge variant="accent" className="backdrop-blur-md">{project.category}</Badge>
            {project.featured ? (
              <Badge variant="default" className="backdrop-blur-md">Featured</Badge>
            ) : null}
          </div>
        </div>
      </Link>

      <div className="flex flex-col gap-4 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold tracking-tight">
              <Link href={`/projects/${project.slug}`} className="hover:text-primary">
                {project.title}
              </Link>
            </h3>
            <p className="text-sm leading-relaxed text-muted">{truncate(project.description, 150)}</p>
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-all hover:border-primary hover:bg-primary hover:text-white"
            aria-label={`Open ${project.title} case study`}
          >
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech) => (
            <Badge key={tech} variant="outline">{tech}</Badge>
          ))}
          {project.technologies.length > 5 ? (
            <Badge variant="outline">+{project.technologies.length - 5}</Badge>
          ) : null}
        </div>

        {project.github_url || project.live_url ? (
          <div className="flex flex-wrap items-center gap-4 border-t border-line pt-4 text-xs font-medium">
            {project.github_url ? (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-primary"
              >
                <Github className="size-3.5" aria-hidden="true" /> Source
              </a>
            ) : null}
            {project.live_url ? (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-primary"
              >
                <ExternalLink className="size-3.5" aria-hidden="true" /> Live demo
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </SpotlightCard>
  );
}
