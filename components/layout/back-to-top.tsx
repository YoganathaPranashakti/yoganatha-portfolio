"use client";

import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";

export function BackToTop() {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="-ml-4"
    >
      Back to top
      <ArrowUp aria-hidden="true" />
    </Button>
  );
}
