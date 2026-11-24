"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

/** Card with a pointer-following spotlight. Pointer-only; never on touch or reduced motion. */
export function SpotlightCard({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  function onMove(event: MouseEvent<HTMLElement>) {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const node = event.currentTarget;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    node.style.setProperty("--my", `${event.clientY - rect.top}px`);
    node.style.setProperty("--spot", "1");
  }

  function onLeave(event: MouseEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--spot", "0");
  }

  return (
    <Tag
      ref={ref as never}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("spotlight-card group relative", className)}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-[var(--spot,0)] transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--primary) 16%, transparent), transparent 70%)",
        }}
      />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-[var(--spot,0)] transition-opacity duration-300 mix-blend-screen" 
        style={{
          background:
            "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </Tag>
  );
}
