"use client";

import { useEffect } from "react";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main id="main-content" className="grid min-h-screen place-items-center px-5">
      <div className="surface-card max-w-lg rounded-card p-8 text-center sm:p-12">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-amber-500/10 text-amber-500">
          <TriangleAlert className="size-7" aria-hidden="true" />
        </span>
        <h1 className="mt-6 text-3xl font-bold">Something went wrong</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          The page could not be loaded right now. This may be a temporary connection issue with
          the portfolio backend — the rest of the site should still work.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button onClick={reset} variant="gradient">Try again</Button>
          <Button asChild variant="outline"><Link href="/">Back home</Link></Button>
        </div>
      </div>
    </main>
  );
}
