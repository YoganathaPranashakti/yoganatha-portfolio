"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Download, Menu, X } from "lucide-react";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

const sectionIds = ["home", "about", "skills", "experience", "contact"];

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.25, 0.5] },
    );
    sectionIds.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  function isActive(href: string) {
    if (!isHome) return pathname === href || pathname.startsWith(`${href}/`);
    if (!href.includes("#")) return false;
    return href.endsWith(`#${active}`);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="container-page">
        <div
          className={cn(
            "glass flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.7)] transition-all duration-300 sm:px-4",
            scrolled && "shadow-[0_16px_50px_-24px_rgba(0,0,0,0.9)]",
          )}
        >
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5 rounded-lg"
          >
            <span className="relative grid size-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-primary to-accent text-xs font-bold text-white shadow-lg">
              {siteConfig.initials}
              <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 group-hover:translate-x-full" aria-hidden="true" />
            </span>
            <span className="hidden text-sm font-semibold tracking-tight sm:block">
              {siteConfig.shortName}
              <span className="text-primary">.</span>
            </span>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-0.5 lg:flex">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-2 text-[0.82rem] font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-primary/12 text-primary"
                    : "text-muted hover:bg-surface hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button asChild size="sm" variant="outline" className="hidden sm:inline-flex">
              <Link href={siteConfig.links.cv} target="_blank" rel="noopener noreferrer">
                <Download aria-hidden="true" />
                CV
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {menuOpen ? (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="glass mt-2 rounded-2xl p-3 lg:hidden"
          >
            <ul className="grid gap-1">
              {siteConfig.nav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-primary/12 text-primary"
                        : "text-muted hover:bg-surface hover:text-foreground",
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                    <ArrowUpRight className="size-4 opacity-50" aria-hidden="true" />
                  </Link>
                </li>
              ))}
              <li className="pt-2 sm:hidden">
                <Button asChild variant="gradient" className="w-full">
                  <Link href={siteConfig.links.cv} target="_blank" rel="noopener noreferrer">
                    <Download aria-hidden="true" />
                    Download CV
                  </Link>
                </Button>
              </li>
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
