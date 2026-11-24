import { Compass, Cpu, GraduationCap, Leaf } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Education, Profile } from "@/lib/types";

const pillars = [
  {
    icon: Compass,
    title: "Problem first",
    body: "Understand the requirement, then choose the smallest implementation that actually solves it.",
  },
  {
    icon: Leaf,
    title: "Privacy by design",
    body: "Cyclela keeps personal health data on the device — no account and no remote storage.",
  },
  {
    icon: Cpu,
    title: "Quality mindset",
    body: "Interested in black-box testing and SUS as ways to check whether software works for people.",
  },
];

export function AboutSection({
  profile,
  education,
}: {
  profile: Profile;
  education: Education[];
}) {
  const school = education[0];

  return (
    <section id="about" className="section-pad relative">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="About"
            title={
              <>
                A developer who cares about
                <span className="gradient-text"> how it works</span>
              </>
            }
            description="A short, honest introduction — built from verified profile and repository information."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <SpotlightCard className="surface-card h-full rounded-card p-6 sm:p-8">
              <div className="space-y-5 text-[0.95rem] leading-relaxed text-muted sm:text-base">
                <p>{profile.about}</p>
                <p>{profile.philosophy}</p>
              </div>
              {school ? (
                <div className="mt-8 flex items-start gap-3 rounded-2xl border border-line bg-surface/60 p-4">
                  <GraduationCap className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {school.program} · {school.institution}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {[school.degree, school.gpa ? `GPA ${school.gpa}` : null]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                </div>
              ) : null}
            </SpotlightCard>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {pillars.map(({ icon: Icon, title, body }, index) => (
              <Reveal key={title} delay={index * 0.08}>
                <SpotlightCard className="surface-card h-full rounded-card p-5">
                  <div className="flex gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-semibold">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
