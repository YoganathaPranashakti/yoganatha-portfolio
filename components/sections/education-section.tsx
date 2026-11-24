import { Award, BookOpen, GraduationCap } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Education } from "@/lib/types";

export function EducationSection({ education }: { education: Education[] }) {
  if (education.length === 0) return null;

  return (
    <section id="education" className="section-pad border-y border-line/60 bg-surface/30">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Education"
            title="Academic foundation"
            description="Verified information from the owner-provided profile. Additional dates will be added once confirmed."
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {education.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.1}>
              <SpotlightCard className="surface-card h-full rounded-card p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
                    <GraduationCap className="size-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold leading-tight">{item.institution}</h3>
                      <Badge variant="success">Verified</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted">{item.program}</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-xl border border-line bg-background/50 p-3">
                        <BookOpen className="mb-2 size-4 text-primary" aria-hidden="true" />
                        <p className="text-[0.7rem] uppercase tracking-wide text-muted">Degree</p>
                        <p className="mt-0.5 text-sm font-medium">{item.degree ?? "—"}</p>
                      </div>
                      <div className="rounded-xl border border-line bg-background/50 p-3">
                        <Award className="mb-2 size-4 text-accent" aria-hidden="true" />
                        <p className="text-[0.7rem] uppercase tracking-wide text-muted">GPA</p>
                        <p className="mt-0.5 text-sm font-medium">{item.gpa ?? "—"}</p>
                      </div>
                      <div className="rounded-xl border border-line bg-background/50 p-3">
                        <GraduationCap className="mb-2 size-4 text-primary" aria-hidden="true" />
                        <p className="text-[0.7rem] uppercase tracking-wide text-muted">Program</p>
                        <p className="mt-0.5 text-sm font-medium">S1</p>
                      </div>
                    </div>
                    {item.description ? (
                      <p className="mt-4 text-sm leading-relaxed text-muted">{item.description}</p>
                    ) : null}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
