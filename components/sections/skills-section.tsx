import { Boxes, GitBranch, Layers3, TestTube2 } from "lucide-react";

import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Skill } from "@/lib/types";

const categoryIcons: Record<string, typeof Boxes> = {
  "Programming Languages": Boxes,
  "Frontend Development": Layers3,
  "Backend Development": Boxes,
  Database: Boxes,
  "Tools and Platforms": GitBranch,
  "System Analysis": GitBranch,
  "Software Testing": TestTube2,
  "UI/UX": Layers3,
};

export function SkillsSection({ skills }: { skills: Skill[] }) {
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    acc[skill.category] ??= [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const categories = Object.keys(grouped);
  const marqueeItems = skills.slice(0, 14).map((skill) => skill.name);

  return (
    <section id="skills" className="section-pad relative overflow-hidden">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Skills"
            title={
              <>
                Tools I use, <span className="gradient-text">interests I pursue</span>
              </>
            }
            description="Every item below is listed on the public GitHub profile, stated as an interest, or verified in a repository. No proficiency scores are claimed."
          />
        </Reveal>

        <div className="mt-10">
          <Reveal>
            <Marquee className="mask-fade-x overflow-hidden border-y border-line py-5">
              {marqueeItems.map((name) => (
                <span
                  key={name}
                  className="mx-2 whitespace-nowrap rounded-full border border-line bg-surface/60 px-4 py-2 text-sm font-medium text-muted sm:mx-3"
                >
                  {name}
                </span>
              ))}
            </Marquee>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => {
            const Icon = categoryIcons[category] ?? Boxes;
            return (
              <Reveal key={category} delay={(index % 4) * 0.06}>
                <SpotlightCard className="surface-card h-full rounded-card p-5">
                  <div className="mb-4 flex items-center gap-2.5">
                    <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <h3 className="text-sm font-semibold leading-tight">{category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {grouped[category].map((skill) => (
                      <Badge key={skill.id} variant="outline" title={skill.note ?? undefined}>
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
