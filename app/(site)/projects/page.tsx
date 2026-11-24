import type { Metadata } from "next";

import { ProjectBrowser } from "@/components/projects/project-browser";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProjects } from "@/lib/data/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse verified portfolio projects with technology stacks, case studies and repository links.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects — Yoganatha Pranashakti",
    description: "Verified portfolio projects with source code and live demos.",
    url: "/projects",
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="section-pad pt-32 sm:pt-40">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Portfolio"
            title={
              <>
                Projects &amp; <span className="gradient-text">case studies</span>
              </>
            }
            description="Every entry links to a real repository. Project details are limited to information that can be verified from public sources."
          />
        </Reveal>

        <div className="mt-11">
          <ProjectBrowser projects={projects} />
        </div>
      </div>
    </div>
  );
}
