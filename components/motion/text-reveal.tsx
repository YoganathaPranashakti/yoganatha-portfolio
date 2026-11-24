"use client";

import { motion, useReducedMotion } from "motion/react";

export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) return <span className={className}>{text}</span>;

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className={wordClassName ?? "inline-block"}
            initial={{ opacity: 0, y: "0.45em", filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.65,
              delay: delay + i * 0.055,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </span>
    </span>
  );
}
