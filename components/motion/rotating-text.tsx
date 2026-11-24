"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function RotatingText({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || items.length < 2) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % items.length),
      3200,
    );
    return () => window.clearInterval(timer);
  }, [items.length, reduce]);

  if (reduce) return <span className={className}>{items[0]}</span>;

  return (
    <span className={className}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
