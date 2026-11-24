import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

import { BackToTop } from "@/components/layout/back-to-top";
import { siteConfig } from "@/lib/site";

const socials = [
  { label: "GitHub", href: siteConfig.links.github, icon: Github },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-10 border-t border-line bg-surface/40">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-xs font-bold text-white">
                {siteConfig.initials}
              </span>
              <span className="font-semibold">{siteConfig.name}</span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Full-stack web developer and QA enthusiast. Building useful, thoughtful digital
              products — one verified step at a time.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Explore
            </h2>
            <ul className="grid gap-2.5 text-sm">
              {siteConfig.nav.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-muted transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Elsewhere
            </h2>
            <ul className="grid gap-2.5">
              {socials.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Built with care.</p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
