"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { useScrollProgress } from "@/components/blog/toc/use-scroll-progress";
import { cn } from "@/lib/utils";

export function ReadingProgressBar({ className }: { className?: string }) {
  const progress = useScrollProgress();
  const rounded = Math.round(progress);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bar = (
    <div
      className={cn(
        "pointer-events-none fixed top-0 right-0 z-40 flex h-dvh w-9",
        className,
      )}
      aria-hidden={rounded === 0}
    >
      <div className="relative flex h-full w-full flex-col items-center pt-28 pb-8">
        <span className="text-primary mb-3 font-mono text-[10px] font-semibold tabular-nums">
          {rounded}%
        </span>

        <div className="bg-border/40 relative min-h-0 w-1 flex-1 overflow-hidden rounded-full">
          <div
            className="from-primary via-primary to-primary/70 absolute inset-x-0 top-0 rounded-full bg-gradient-to-b will-change-[height]"
            style={{ height: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );

  if (!mounted) return null;

  return createPortal(bar, document.body);
}
