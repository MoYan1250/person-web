"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { Link } from "@/i18n/routing";
import {
  TIMELINE_TYPES,
  getTimelineTypes,
  type TimelineItem,
  type TimelineLink,
  type TimelineType,
} from "@/lib/content";
import { cn } from "@/lib/utils";

type FilterKey = "all" | TimelineType;

/** Chapter breaks (newest-first): inserted when the list crosses these months. */
const TIMELINE_ERA_SPLITS = ["2026-07", "2025-11"] as const;

function timelineMonth(date: string): string {
  const match = date.match(/^(\d{4})[-./](\d{1,2})/);
  if (!match) return date;
  return `${match[1]}-${match[2].padStart(2, "0")}`;
}

type TimelineRow =
  | { kind: "split"; date: string }
  | { kind: "item"; item: TimelineItem; index: number };

function rowsWithEraSplits(items: TimelineItem[]): TimelineRow[] {
  const rows: TimelineRow[] = [];
  let previous: string | null = null;

  for (let index = 0; index < items.length; index += 1) {
    const month = timelineMonth(items[index].date);
    if (previous) {
      for (const split of TIMELINE_ERA_SPLITS) {
        if (previous > split && month <= split) {
          rows.push({ kind: "split", date: split });
        }
      }
    }
    rows.push({ kind: "item", item: items[index], index });
    previous = month;
  }

  return rows;
}

export function TimelineLogbook({
  items,
  labels,
  copy,
}: {
  items: TimelineItem[];
  labels: Record<TimelineType, string>;
  copy: {
    filter: string;
    all: string;
    empty: string;
    era: string;
  };
}) {
  const [active, setActive] = useState<FilterKey>("all");

  const counts = useMemo(() => {
    const next: Record<FilterKey, number> = {
      all: items.length,
      study: 0,
      make: 0,
      life: 0,
      record: 0,
    };
    for (const item of items) {
      for (const type of getTimelineTypes(item)) {
        next[type] += 1;
      }
    }
    return next;
  }, [items]);

  const filters = useMemo(
    () =>
      TIMELINE_TYPES.filter((type) => counts[type] > 0).map((type) => ({
        key: type as FilterKey,
        label: labels[type],
        count: counts[type],
      })),
    [counts, labels],
  );

  const visible =
    active === "all"
      ? items
      : items.filter((item) => getTimelineTypes(item).includes(active));

  const rows = useMemo(() => rowsWithEraSplits(visible), [visible]);

  return (
    <>
      <div className="border-border mt-10 border-y py-4" aria-label={copy.filter}>
        <p className="text-muted-foreground mb-3 font-mono text-[10px] font-bold tracking-[0.18em] uppercase">
          {copy.filter}
        </p>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            pressed={active === "all"}
            onClick={() => setActive("all")}
            label={copy.all}
            count={counts.all}
          />
          {filters.map((filter) => (
            <FilterChip
              key={filter.key}
              pressed={active === filter.key}
              onClick={() => setActive(filter.key)}
              label={filter.label}
              count={filter.count}
            />
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="text-muted-foreground font-serif mt-10 text-sm font-bold">{copy.empty}</p>
      ) : (
        <section className="relative mt-7">
          <div className="bg-primary/30 absolute top-2 bottom-4 left-2 w-px -translate-x-1/2 md:left-[9.25rem]" />
          <ol>
            {rows.map((row) =>
              row.kind === "split" ? (
                <TimelineEraSplit
                  key={`split-${row.date}`}
                  date={row.date}
                  label={copy.era.replace("{date}", row.date)}
                />
              ) : (
                <TimelineEntry
                  key={`${row.item.date}-${row.item.title}-${row.index}`}
                  item={row.item}
                  labels={labels}
                />
              ),
            )}
          </ol>
        </section>
      )}
    </>
  );
}

function FilterChip({
  pressed,
  onClick,
  label,
  count,
}: {
  pressed: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        pressed
          ? "border-primary/30 bg-primary/15 text-primary"
          : "border-border bg-muted/40 text-muted-foreground hover:border-primary/25 hover:text-foreground",
      )}
    >
      {label}
      <span className="font-mono text-[10px] opacity-60">{count}</span>
    </button>
  );
}

function TimelineEraSplit({ date, label }: { date: string; label: string }) {
  return (
    <li
      className="relative grid grid-cols-[1rem_minmax(0,1fr)] gap-x-4 py-5 md:grid-cols-[7.5rem_1.25rem_minmax(0,1fr)] md:gap-x-5 md:py-7"
      aria-label={label}
    >
      <span className="text-muted-foreground hidden pt-0.5 text-right font-mono text-[10px] tracking-[0.18em] uppercase md:block">
        {date}
      </span>
      <div className="relative z-10 mt-1 grid size-4 place-items-center">
        <span className="bg-primary/70 h-px w-3.5" aria-hidden />
      </div>
      <div className="flex min-h-4 items-center gap-3">
        <span className="text-muted-foreground font-mono text-[11px] tracking-[0.22em] uppercase md:hidden">
          {date}
        </span>
        <span className="from-border via-border to-transparent h-px min-w-8 flex-1 bg-gradient-to-r" />
      </div>
    </li>
  );
}

function TimelineEntry({
  item,
  labels,
}: {
  item: TimelineItem;
  labels: Record<TimelineType, string>;
}) {
  const types = getTimelineTypes(item);

  return (
    <li className="relative grid grid-cols-[1rem_minmax(0,1fr)] gap-x-4 pb-3 md:grid-cols-[7.5rem_1.25rem_minmax(0,1fr)] md:gap-x-5 md:pb-4">
      <time className="text-muted-foreground hidden pt-0.5 text-right font-mono text-xs leading-6 md:block">
        {item.date}
      </time>
      <div className="border-primary/40 bg-background relative z-10 mt-1 grid size-4 place-items-center rounded-full border shadow-[0_0_0_6px_hsl(var(--primary)/0.08)]">
        <span className="bg-primary size-1.5 rounded-full" />
      </div>
      <div className="glass-panel rounded-2xl p-4 sm:p-5 md:p-6">
        <time className="text-muted-foreground mb-2 block font-mono text-xs md:hidden">
          {item.date}
        </time>
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap gap-1.5">
              {types.map((type) => (
                <span
                  key={type}
                  className="border-primary/20 bg-primary/10 text-primary rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-[0.12em]"
                >
                  {labels[type]}
                </span>
              ))}
            </div>
            <h2 className="font-serif mt-1.5 text-xl font-bold tracking-tight sm:text-2xl">
              {item.title}
            </h2>
            <p className="text-muted-foreground font-serif mt-0.5 text-xs leading-5 font-bold sm:text-sm">
              {item.description}
            </p>
            {(item.tags && item.tags.length > 0) ||
            (item.links && item.links.length > 0) ? (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {item.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="border-border bg-muted/40 text-muted-foreground hidden rounded-md border px-2 py-1 text-[11px] sm:inline-flex"
                  >
                    {tag}
                  </span>
                ))}
                {item.links?.map((link) => (
                  <EntryLink key={`${link.label}-${link.href}`} link={link} />
                ))}
              </div>
            ) : null}
          </div>
          {item.image ? (
            <div
              className={cn(
                "border-border relative overflow-hidden rounded-xl border sm:shrink-0",
                item.imagePresentation === "logo"
                  ? "aspect-square w-full bg-muted/30 sm:w-44 md:w-52"
                  : "aspect-[16/10] w-full bg-muted/20 sm:aspect-[4/3] sm:w-44 md:w-52",
              )}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                unoptimized
                sizes="(min-width: 768px) 208px, 100vw"
                className={
                  item.imagePresentation === "logo"
                    ? "object-contain p-3"
                    : "object-contain p-1.5"
                }
                style={
                  item.imageScale && item.imageScale !== 1
                    ? {
                        transform: `scale(${item.imageScale})`,
                        transformOrigin: "center",
                      }
                    : undefined
                }
              />
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
}

function EntryLink({ link }: { link: TimelineLink }) {
  const className =
    "text-primary ml-1 inline-flex items-center gap-1 text-xs font-semibold transition-opacity hover:opacity-70";

  if (link.href.startsWith("http") || link.href.startsWith("mailto:")) {
    return (
      <a
        href={link.href}
        target={link.href.startsWith("http") ? "_blank" : undefined}
        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={className}
      >
        {link.label} ↗
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {link.label} ↗
    </Link>
  );
}
