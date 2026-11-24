import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white shadow-[0_10px_30px_-12px_var(--primary)] hover:brightness-110 hover:shadow-[0_14px_38px_-12px_var(--primary)] dark:text-white",
        gradient:
          "bg-gradient-to-r from-primary to-accent text-white shadow-[0_12px_34px_-14px_var(--primary)] hover:brightness-110",
        outline:
          "border border-line bg-surface-raised/60 text-foreground hover:border-primary/60 hover:bg-surface",
        ghost: "text-muted hover:bg-surface hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        danger:
          "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-7 text-[0.95rem]",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
