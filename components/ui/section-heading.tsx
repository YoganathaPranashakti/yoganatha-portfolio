import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl space-y-4",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <div
        className={cn(
          "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary",
          align === "center" && "justify-center",
        )}
      >
        <span className="h-px w-6 bg-primary" aria-hidden="true" />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-relaxed text-muted sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
