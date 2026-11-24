import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Project } from "@/lib/types";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const shown = projects.filter((project) => project.featured).slice(0, 3);
  const items = shown.length > 0 ? shown : projects.slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section id="projects" className="section-pad border-y border-line/60 bg-surface/30">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Projects"
              title={
                <>
                  Selected work, <span className="gradient-text">verified</span>
                </>
              }
              description="Real repositories with public documentation and live demos. Every case study links back to its source."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
            >
              View all projects
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-11 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.09}>
              <ProjectCard project={project} className="h-full" priority={index === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
