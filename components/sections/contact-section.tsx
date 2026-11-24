import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site";

const channels = [
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: Mail },
  { label: "LinkedIn", value: "in/yoganatha-pranashakti", href: siteConfig.links.linkedin, icon: Linkedin },
  { label: "GitHub", value: "@YoganathaPranashakti", href: siteConfig.links.github, icon: Github },
];

export function ContactSection() {
  return (
    <section id="contact" className="section-pad border-t border-line/60 bg-surface/30">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title={
              <>
                Let&apos;s build something <span className="gradient-text">useful</span>
              </>
            }
            description="Have a project, a question, or an opportunity? Send a message — or reach me directly on the platforms below."
          />
        </Reveal>

        <div className="mt-11 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="flex h-full flex-col gap-5">
              <div className="surface-card rounded-card p-6 sm:p-7">
                <h3 className="font-semibold">Direct channels</h3>
                <ul className="mt-5 space-y-4">
                  {channels.map(({ label, value, href, icon: Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-surface"
                      >
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                          <Icon className="size-4" aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[0.7rem] uppercase tracking-wide text-muted">{label}</span>
                          <span className="block truncate text-sm font-medium group-hover:text-primary">{value}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass rounded-card p-6">
                <p className="text-sm leading-relaxed text-muted">
                  Prefer something async? The fastest way to reach me is email. I read every message
                  and reply when I can.
                </p>
                <Link href={siteConfig.links.cv} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
                  View my CV →
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
