import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.7rem] font-medium tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default: "border-primary/25 bg-primary/10 text-primary",
        accent: "border-accent/25 bg-accent/10 text-accent",
        outline: "border-line bg-transparent text-muted",
        success: "border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        warning: "border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-400",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
