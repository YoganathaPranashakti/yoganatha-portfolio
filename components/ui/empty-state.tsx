import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "surface-card flex flex-col items-center gap-4 rounded-card px-6 py-14 text-center",
        className,
      )}
    >
      <div className="grid size-14 place-items-center rounded-2xl border border-line bg-surface text-primary">
        <Icon className="size-6" aria-hidden="true" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-muted">{description}</p>
      </div>
      {action}
    </div>
  );
}
