import { ExternalLink } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Experience } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section id="experience" className="section-pad">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="What I've actually built"
            description="Academic and personal project work is shown here. No formal employment history is published until the owner confirms it."
          />
        </Reveal>

        <div className="mt-11 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal delay={0.08}>
            <div className="surface-card rounded-card p-6 sm:p-7">
              <p className="text-sm leading-relaxed text-muted">
                My public GitHub activity consists of personal projects. That work is the most
                reliable evidence of how I approach problems, so it is presented here instead of
                unverified roles or titles.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge variant="default">Self-directed</Badge>
                <Badge variant="accent">Project-based</Badge>
                <Badge variant="outline">Open to opportunities</Badge>
              </div>
            </div>
          </Reveal>

          <ol className="relative space-y-4 border-l border-line pl-6 sm:pl-8">
            {experience.map((item, index) => (
              <li key={item.id} className="relative">
                <span className="absolute -left-[1.9rem] top-6 size-3 rounded-full border-2 border-primary bg-background sm:-left-[2.4rem]" aria-hidden="true" />
                <Reveal delay={index * 0.1}>
                  <article className="surface-card rounded-card p-5 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="font-semibold leading-tight">{item.title}</h3>
                        <p className="mt-1 text-sm text-muted">{item.organization}</p>
                      </div>
                      <Badge variant="outline">{item.type}</Badge>
                    </div>
                    {item.start_date || item.end_date ? (
                      <p className="mt-3 text-xs font-medium uppercase tracking-wide text-primary">
                        {formatDate(item.start_date)}
                        {item.end_date ? ` — ${formatDate(item.end_date)}` : " — Present"}
                      </p>
                    ) : null}
                    {item.description ? (
                      <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                    ) : null}
                    {item.highlights.length > 0 ? (
                      <ul className="mt-4 grid gap-1.5 text-sm text-muted">
                        {item.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-2">
                            <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                      >
                        View repository
                        <ExternalLink className="size-3.5" aria-hidden="true" />
                      </a>
                    ) : null}
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
