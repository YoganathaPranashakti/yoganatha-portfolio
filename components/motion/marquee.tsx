import type { ReactNode } from "react";

/** Pure-CSS marquee: two identical tracks, pauses naturally under reduced motion. */
export function Marquee({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex w-max animate-marquee items-center">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
