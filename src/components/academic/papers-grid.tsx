"use client";

import { useMemo, useState, type ReactNode } from "react";

import { Icons } from "@/components/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "@/i18n/routing";
import {
  PAPER_TAGS,
  PAPER_VENUE_TIERS,
  type PaperTag,
  type PaperVenueTier,
  type TaggedPaper,
} from "@/lib/papers";
import { cn } from "@/lib/utils";

export function PapersGrid({
  papers,
  labels,
  venueLabels,
  copy,
}: {
  papers: TaggedPaper[];
  labels: Record<PaperTag, string>;
  venueLabels: Record<PaperVenueTier, string>;
  copy: {
    filter: string;
    all: string;
    empty: string;
    venue: string;
    paperNote: string;
  };
}) {
  const [selectedTags, setSelectedTags] = useState<PaperTag[]>([]);
  const [selectedVenues, setSelectedVenues] = useState<PaperVenueTier[]>([]);

  const tagCounts = useMemo(() => {
    const next: Record<PaperTag | "all", number> = {
      all: papers.length,
      marl: 0,
      rl: 0,
      games: 0,
      imitation: 0,
      llm: 0,
      eval: 0,
      comm: 0,
      deception: 0,
      hierarchy: 0,
      pomdp: 0,
      crypto: 0,
    };
    for (const paper of papers) {
      for (const tag of paper.tags) {
        next[tag] += 1;
      }
    }
    return next;
  }, [papers]);

  const venueCounts = useMemo(() => {
    const next: Record<PaperVenueTier, number> = {
      transcendent: 0,
      top: 0,
      flagship: 0,
      solid: 0,
      workshop: 0,
      outside: 0,
    };
    for (const paper of papers) {
      next[paper.venueTier] += 1;
    }
    return next;
  }, [papers]);

  const visibleTags = PAPER_TAGS.filter((tag) => tagCounts[tag] > 0);
  const visibleVenueTiers = PAPER_VENUE_TIERS.filter(
    (tier) => venueCounts[tier] > 0,
  );

  const visible = papers.filter((paper) => {
    const tagOk =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => paper.tags.includes(tag));
    const venueOk =
      selectedVenues.length === 0 ||
      selectedVenues.includes(paper.venueTier);
    return tagOk && venueOk;
  });

  function toggleTag(tag: PaperTag) {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag],
    );
  }

  function toggleVenue(tier: PaperVenueTier) {
    setSelectedVenues((current) =>
      current.includes(tier)
        ? current.filter((item) => item !== tier)
        : [...current, tier],
    );
  }

  return (
    <>
      <div className="mb-6 space-y-4" aria-label={copy.filter}>
        <div>
          <p className="text-muted-foreground mb-3 font-mono text-[10px] font-bold tracking-[0.18em] uppercase">
            {copy.filter}
            <span className="text-primary ml-2 font-mono text-xs tracking-normal">
              {visible.length}
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              pressed={selectedTags.length === 0}
              onClick={() => setSelectedTags([])}
              label={copy.all}
              count={tagCounts.all}
            />
            {visibleTags.map((tag) => (
              <FilterChip
                key={tag}
                pressed={selectedTags.includes(tag)}
                onClick={() => toggleTag(tag)}
                label={labels[tag]}
                count={tagCounts[tag]}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="text-muted-foreground mb-3 text-sm leading-6">
            {copy.venue}
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              pressed={selectedVenues.length === 0}
              onClick={() => setSelectedVenues([])}
              label={copy.all}
              count={papers.length}
            />
            {visibleVenueTiers.map((tier) => (
              <FilterChip
                key={tier}
                pressed={selectedVenues.includes(tier)}
                onClick={() => toggleVenue(tier)}
                label={venueLabels[tier]}
                count={venueCounts[tier]}
              />
            ))}
          </div>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="text-muted-foreground text-sm">{copy.empty}</p>
      ) : (
        <ul className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
          {visible.map((paper) => (
            <li key={paper.id}>
              <PaperTile
                paper={paper}
                tagLabels={labels}
                venueLabels={venueLabels}
                noteLabel={copy.paperNote}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function PaperTile({
  paper,
  tagLabels,
  venueLabels,
  noteLabel,
}: {
  paper: TaggedPaper;
  tagLabels: Record<PaperTag, string>;
  venueLabels: Record<PaperVenueTier, string>;
  noteLabel: string;
}) {
  const inner = (
    <>
      <p className="truncate font-mono text-[13px] font-semibold tracking-tight">
        {paper.short}
      </p>
      <p className="text-primary mt-1 truncate font-mono text-[10px]">
        {venueLabels[paper.venueTier]}
      </p>
      <p className="text-muted-foreground mt-1 truncate font-mono text-[10px]">
        {[paper.year, paper.authors].filter(Boolean).join(" · ")}
      </p>
      {paper.tags.length ? (
        <p className="text-muted-foreground mt-2 truncate text-[10px]">
          {paper.tags.map((tag) => tagLabels[tag]).join(" / ")}
        </p>
      ) : null}
    </>
  );

  const className = cn(
    "border-border glass-panel hover:border-primary/50 hover:bg-accent/30 block h-full rounded-none border px-3 py-3 transition-colors",
    paper.noteSlug && "pr-10",
  );

  const tile = paper.href ? (
    <a
      href={paper.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={paper.title}
      className={className}
    >
      {inner}
    </a>
  ) : (
    <article aria-label={paper.title} className={className}>
      {inner}
    </article>
  );

  return (
    <div className="relative h-full">
      <Tooltip>
        <TooltipTrigger asChild>{tile}</TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-sm whitespace-normal text-left leading-5"
        >
          <p className="font-medium">{paper.title}</p>
          {paper.blurb ? (
            <p className="mt-1.5 text-[11px] leading-5 opacity-90">
              {paper.blurb}
            </p>
          ) : null}
        </TooltipContent>
      </Tooltip>
      {paper.noteSlug ? (
        <Link
          href={`/diary/${paper.noteSlug}`}
          aria-label={noteLabel}
          title={noteLabel}
          className="border-border bg-card text-muted-foreground hover:border-primary hover:text-primary absolute top-1.5 right-1.5 z-10 inline-flex size-7 items-center justify-center rounded-none border"
        >
          <Icons.academic className="size-3.5" />
        </Link>
      ) : null}
    </div>
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
  label: ReactNode;
  count: number;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-none border px-3 py-1.5 text-xs font-medium transition-colors",
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
