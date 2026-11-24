import Link from "next/link";
import { Compass } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main id="main-content" className="relative grid min-h-screen place-items-center overflow-hidden px-5">
      <div className="aurora pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="glass max-w-lg rounded-card p-8 text-center sm:p-12">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Compass className="size-7" aria-hidden="true" />
        </span>
        <p className="mt-6 font-mono text-sm text-primary">404</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">This page took a different route</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          The page you were looking for does not exist, or it has been unpublished.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button asChild variant="gradient">
            <Link href="/">Back home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/projects">Browse projects</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
