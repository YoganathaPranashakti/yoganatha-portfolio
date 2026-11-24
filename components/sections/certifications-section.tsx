import { Award } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Certification } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function CertificationsSection({
  certifications,
  full = false,
}: {
  certifications: Certification[];
  full?: boolean;
}) {
  return (
    <section id={full ? undefined : "certifications"} className={full ? "" : "section-pad border-t border-line/60 bg-surface/30"}>
      <div className="container-page">
        {full ? null : (
          <Reveal>
            <SectionHeading
              eyebrow="Certifications"
              title="Learning, documented"
              description="Certifications appear here once verified and published. Nothing is listed without a credential to back it up."
            />
          </Reveal>
        )}

        <div className={full ? "" : "mt-10"}>
          {certifications.length === 0 ? (
            <EmptyState
              icon={Award}
              title="No certifications published yet"
              description="There are no verified public certifications to show at this time. This section is ready for credentials added through the admin dashboard."
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((cert, index) => (
                <Reveal key={cert.id} delay={index * 0.07}>
                  <article className="surface-card h-full rounded-card p-5">
                    <div className="flex items-start gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                        <Award className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-semibold leading-tight">{cert.name}</h3>
                        <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted">
                      {cert.issue_date ? <span>Issued {formatDate(cert.issue_date)}</span> : null}
                      {cert.credential_id ? <span>ID: {cert.credential_id}</span> : null}
                    </div>
                    {cert.description ? (
                      <p className="mt-3 text-sm leading-relaxed text-muted">{cert.description}</p>
                    ) : null}
                    {cert.verification_url ? (
                      <a
                        href={cert.verification_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block text-xs font-semibold text-primary hover:underline"
                      >
                        Verify credential
                      </a>
                    ) : null}
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
