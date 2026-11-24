"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { animate, useReducedMotion } from "motion/react";

/** Subtle magnetic hover effect. Disabled on touch devices and reduced motion. */
export function Magnetic({
  children,
  strength = 0.18,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  function onMove(event: MouseEvent<HTMLDivElement>) {
    if (reduce || !window.matchMedia("(pointer: fine)").matches || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * strength;
    const y = (event.clientY - rect.top - rect.height / 2) * strength;
    animate(ref.current, { x, y }, { type: "spring", stiffness: 260, damping: 18 });
  }

  function onLeave() {
    if (ref.current) {
      animate(ref.current, { x: 0, y: 0 }, { type: "spring", stiffness: 260, damping: 18 });
    }
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
      {children}
    </div>
  );
}
