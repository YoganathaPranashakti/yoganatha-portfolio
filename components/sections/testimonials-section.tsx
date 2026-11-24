import { MessageSquareQuote } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Testimonial } from "@/lib/types";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section id="testimonials" className="section-pad">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="Words from collaborators"
            description="Only approved testimonials are shown. None are written on behalf of real people."
            align="center"
          />
        </Reveal>

        <div className="mt-11">
          {testimonials.length === 0 ? (
            <EmptyState
              icon={MessageSquareQuote}
              title="No approved testimonials yet"
              description="There are no verified testimonials to display right now. Once a collaborator provides one and the owner approves it, it will appear here."
              className="mx-auto max-w-2xl"
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((item, index) => (
                <Reveal key={item.id} delay={index * 0.08}>
                  <figure className="surface-card flex h-full flex-col rounded-card p-6">
                    <MessageSquareQuote className="mb-4 size-6 text-primary" aria-hidden="true" />
                    <blockquote className="flex-1 text-sm leading-relaxed text-muted">
                      “{item.content}”
                    </blockquote>
                    <figcaption className="mt-5 border-t border-line pt-4">
                      <p className="text-sm font-semibold">{item.author_name}</p>
                      <p className="text-xs text-muted">
                        {[item.author_role, item.organization].filter(Boolean).join(" · ")}
                      </p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
