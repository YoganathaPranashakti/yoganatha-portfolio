import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github, Layers3 } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { getProjectBySlug, getProjects } from "@/lib/data/portfolio";
import { truncate } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  const description = truncate(project.description, 155);
  return {
    title: project.title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — Yoganatha Pranashakti`,
      description,
      type: "article",
      url: `/projects/${project.slug}`,
      images: project.thumbnail ? [{ url: project.thumbnail }] : undefined,
    },
    twitter: { card: "summary_large_image", description },
  };
}

function CaseBlock({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section className="grid gap-4 border-t border-line pt-7 sm:grid-cols-[9rem_1fr] sm:gap-8">
        <p className="font-mono text-xs text-primary">{index}</p>
        <div>
          <h2 className="text-xl font-semibold sm:text-2xl">{title}</h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted sm:text-base">{children}</div>
        </div>
      </section>
    </Reveal>
  );
}

function BulletList({ items }: { items: string[] }) {
  if (items.length === 0) return <p>Not documented.</p>;
  return (
    <ul className="grid gap-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const gallery = project.gallery.length > 0 ? project.gallery : project.thumbnail ? [project.thumbnail] : [];

  return (
    <article className="section-pad pt-28 sm:pt-36">
      <div className="container-page">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          All projects
        </Link>

        <header className="mt-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent">{project.category}</Badge>
            {project.featured ? <Badge variant="default">Featured</Badge> : null}
          </div>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">{project.description}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            {project.live_url ? (
              <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-5 text-sm font-medium text-white transition-all hover:brightness-110">
                <ExternalLink className="size-4" aria-hidden="true" />
                Live demo
              </a>
            ) : null}
            {project.github_url ? (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface-raised/60 px-5 text-sm font-medium transition-colors hover:border-primary/60">
                <Github className="size-4" aria-hidden="true" />
                View repository
              </a>
            ) : null}
          </div>
        </header>

        {project.thumbnail ? (
          <Reveal>
            <div className="relative mt-12 aspect-[16/10] overflow-hidden rounded-card border border-line bg-surface shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]">
              <Image
                src={project.thumbnail}
                alt={`${project.title} main interface`}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-top"
              />
            </div>
          </Reveal>
        ) : null}

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_17rem]">
          <div className="space-y-10">
            <CaseBlock index="01" title="Project overview">
              <p>{project.overview ?? project.description}</p>
            </CaseBlock>
            <CaseBlock index="02" title="Problem statement">
              <p>{project.problem ?? "Not documented."}</p>
            </CaseBlock>
            <CaseBlock index="03" title="Objectives">
              <BulletList items={project.objectives} />
            </CaseBlock>
            <CaseBlock index="04" title="Technologies">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="outline">{tech}</Badge>
                ))}
              </div>
            </CaseBlock>
            <CaseBlock index="05" title="Key features">
              <BulletList items={project.features} />
            </CaseBlock>
            <CaseBlock index="06" title="Development process">
              <BulletList items={project.process} />
            </CaseBlock>
            <CaseBlock index="07" title="Challenges and solutions">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">Challenges</h3>
                  <BulletList items={project.challenges} />
                </div>
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Solutions</h3>
                  <BulletList items={project.solutions} />
                </div>
              </div>
            </CaseBlock>
            <CaseBlock index="08" title="Results">
              <BulletList items={project.results} />
            </CaseBlock>

            {gallery.length > 1 ? (
              <CaseBlock index="09" title="Screenshots">
                <div className="grid gap-4 sm:grid-cols-2">
                  {gallery.slice(1).map((image, index) => (
                    <figure key={image} className="overflow-hidden rounded-2xl border border-line bg-surface">
                      <div className="relative aspect-[9/16]">
                        <Image
                          src={image}
                          alt={`${project.title} screenshot ${index + 2}`}
                          fill
                          loading="lazy"
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover object-top"
                        />
                      </div>
                    </figure>
                  ))}
                </div>
              </CaseBlock>
            ) : null}

            <CaseBlock index="10" title="Live demo and repository">
              <div className="flex flex-wrap gap-4 text-sm">
                {project.live_url ? (
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">
                    <ArrowUpRight className="size-4" aria-hidden="true" /> {project.live_url}
                  </a>
                ) : <p>No live demo published.</p>}
                {project.github_url ? (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">
                    <Github className="size-4" aria-hidden="true" /> {project.github_url}
                  </a>
                ) : null}
              </div>
            </CaseBlock>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="surface-card rounded-card p-5">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted">
                <Layers3 className="size-4" aria-hidden="true" /> Snapshot
              </p>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="text-xs text-muted">Category</dt>
                  <dd className="mt-0.5 font-medium">{project.category}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Role</dt>
                  <dd className="mt-0.5 font-medium">{project.role || "Not documented"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Tech stack</dt>
                  <dd className="mt-1 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 6).map((tech) => (
                      <Badge key={tech} variant="outline">{tech}</Badge>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="glass rounded-card p-5 text-xs leading-relaxed text-muted">
              Case-study content is derived from the public repository README and file structure.
              No metrics or outcomes are claimed without evidence.
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
