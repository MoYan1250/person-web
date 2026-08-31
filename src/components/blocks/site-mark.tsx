"use client";

import { cn } from "@/lib/utils";

import { PressLink } from "@/components/ui/pressable-links";

export function SiteMark() {
  return (
    <div
      data-no-drag
      className={cn(
        "pointer-events-none fixed z-50",
        "left-3 sm:left-4",
        "top-[calc(0.75rem+env(safe-area-inset-top,0px))]",
        "md:top-5 md:left-10 lg:left-12",
      )}
    >
      <PressLink
        href="/"
        aria-label="MOYAN"
        className={cn(
          "font-display pointer-events-auto tracking-[0.18em] text-foreground transition-colors",
          "inline-flex h-11 items-center rounded-2xl border border-border bg-background/80 px-4 text-base shadow-sm backdrop-blur-md hover:bg-accent/50",
          "sm:text-lg",
          "md:h-auto md:rounded-none md:border-0 md:bg-transparent md:px-0 md:text-xl md:shadow-none md:backdrop-blur-none md:hover:bg-transparent md:hover:opacity-70 lg:text-2xl",
        )}
      >
        MOYAN
      </PressLink>
    </div>
  );
}
