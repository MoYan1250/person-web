import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function PageLogbookHeader({
  kicker,
  grid = "PERSONAL INDEX",
  title,
  description,
  meta,
  statLabel,
  statValue,
  statUnit,
  className,
}: {
  kicker: string;
  grid?: string;
  title: string;
  description?: string;
  meta?: ReactNode;
  statLabel?: string;
  statValue?: string | number;
  statUnit?: string;
  className?: string;
}) {
  const showStat =
    statLabel !== undefined && statValue !== undefined && statValue !== "";

  return (
    <header
      className={cn(
        "border-border glass-panel mb-8 overflow-hidden rounded-xl border",
        className,
      )}
    >
      <div className="border-border flex items-center justify-between gap-4 border-b px-4 py-2 font-mono text-[10px] font-bold tracking-[0.18em] uppercase sm:px-6">
        <span className="text-primary">{kicker}</span>
        <span className="text-muted-foreground">{grid}</span>
      </div>
      <div
        className={cn(
          "grid",
          showStat && "sm:grid-cols-[minmax(0,1fr)_10rem]",
        )}
      >
        <div className="p-5 sm:p-7">
          <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>
          {meta ? <div className="mt-3 sm:mt-4">{meta}</div> : null}
          {description ? (
            <p className="text-muted-foreground font-serif mt-4 max-w-3xl text-sm leading-7 font-bold sm:text-base sm:leading-8">
              {description}
            </p>
          ) : null}
        </div>
        {showStat ? (
          <div className="border-border flex flex-row items-end justify-between gap-3 border-t p-5 sm:flex-col sm:items-start sm:justify-end sm:border-t-0 sm:border-l sm:p-6">
            <div className="text-muted-foreground font-mono text-xs font-bold tracking-[0.14em] uppercase sm:text-sm">
              {statLabel}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-primary font-mono text-3xl font-bold leading-none sm:text-4xl">
                {statValue}
              </span>
              {statUnit ? (
                <span className="text-muted-foreground font-mono text-sm font-semibold sm:text-base">
                  {statUnit}
                </span>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
