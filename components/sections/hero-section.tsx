import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Github, Linkedin, Sparkles } from "lucide-react";

import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { RotatingText } from "@/components/motion/rotating-text";
import { TextReveal } from "@/components/motion/text-reveal";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/types";
import { siteConfig } from "@/lib/site";

const roles = [
  "Full-Stack Web Developer",
  "QA Enthusiast",
  "Information Systems Graduate",
] as const;

const facts = [
  { value: "3.71", label: "GPA" },
  { value: "3", label: "Public repositories" },
  { value: "1", label: "Installable PWA" },
];

export function HeroSection({ profile }: { profile: Profile }) {
  return (
    <section id="home" className="relative isolate overflow-hidden pb-20 pt-32 sm:pb-24 sm:pt-36 lg:pt-40">
      <div className="aurora pointer-events-none absolute inset-0 -z-20 opacity-90" aria-hidden="true" />
      <div
        className="grid-pattern mask-fade-x pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] opacity-40 dark:opacity-25"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -left-24 top-28 -z-10 size-72 animate-float rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 top-44 -z-10 size-72 animate-float rounded-full bg-accent/10 blur-3xl [animation-delay:2s]" aria-hidden="true" />

      <div className="container-page grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
        <div className="relative">
          <Reveal>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Information Systems graduate · Building on the web
            </div>
          </Reveal>

          <h1 className="text-[clamp(2.5rem,7vw,4.75rem)] font-extrabold leading-[1.05] tracking-tight">
            <TextReveal text="Hi, I'm" delay={0.05} />
            <br />
            <span className="gradient-text animate-gradient">
              <TextReveal text={siteConfig.name} delay={0.18} />
            </span>
          </h1>

          <Reveal delay={0.15}>
            <p className="mt-6 flex min-h-8 flex-wrap items-center gap-x-2 text-xl font-semibold sm:text-2xl">
              <span className="text-muted">I&apos;m a</span>
              <RotatingText items={roles} className="gradient-text" />
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {profile.summary}
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Button asChild variant="gradient" size="lg">
                  <Link href="/projects">
                    Explore Projects
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </Magnetic>
              <Button asChild variant="outline" size="lg">
                <Link href={siteConfig.links.cv} target="_blank" rel="noopener noreferrer">
                  <Download aria-hidden="true" />
                  Download CV
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <Link href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                  <Github aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <Link href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
                  <Linkedin aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.34}>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-3 sm:gap-5">
              {facts.map((fact) => (
                <div key={fact.label} className="border-l border-line pl-3 sm:pl-4">
                  <dt className="sr-only">{fact.label}</dt>
                  <dd>
                    <span className="block text-2xl font-bold tracking-tight sm:text-3xl">{fact.value}</span>
                    <span className="mt-1 block text-[0.7rem] leading-tight text-muted sm:text-xs">{fact.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-primary/25 via-transparent to-accent/25 blur-2xl" aria-hidden="true" />
            <div className="glass relative overflow-hidden rounded-[2rem] p-3 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-surface">
                <Image
                  src="/images/profile.jpg"
                  alt="Portrait of Yoganatha Pranashakti, sourced from the public GitHub profile"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 380px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-lg font-semibold text-white drop-shadow">{siteConfig.name}</p>
                  <p className="text-xs text-slate-200">Full-Stack Web Developer &amp; QA Enthusiast</p>
                </div>
              </div>
            </div>

            <div className="glass absolute -left-4 bottom-16 animate-float rounded-2xl px-4 py-3 shadow-lg sm:-left-8">
              <p className="text-[0.65rem] uppercase tracking-widest text-muted">Currently building</p>
              <p className="text-sm font-semibold text-primary">Cyclela · PWA</p>
            </div>
            <div className="glass absolute -right-3 top-12 animate-float rounded-2xl px-4 py-3 shadow-lg [animation-delay:1.5s] sm:-right-6">
              <p className="text-[0.65rem] uppercase tracking-widest text-muted">Focus</p>
              <p className="text-sm font-semibold text-accent">Web + Quality</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
