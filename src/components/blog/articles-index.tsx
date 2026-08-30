"use client";

import { useMemo, useState } from "react";

import { BlogCard } from "@/components/blog/blog-card";
import {
  ARTICLE_CATEGORIES,
  type ArticleCategory,
} from "@/lib/articles";
import { cn } from "@/lib/utils";

export type ArticleListItem = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  category: ArticleCategory;
};

type FilterKey = "all" | ArticleCategory;

export function ArticlesIndex({
  posts,
  labels,
  copy,
  locale,
}: {
  posts: ArticleListItem[];
  labels: Record<ArticleCategory, string>;
  copy: {
    filter: string;
    all: string;
    empty: string;
  };
  locale: string;
}) {
  const [active, setActive] = useState<FilterKey>("all");

  const counts = useMemo(() => {
    const next: Record<FilterKey, number> = {
      all: posts.length,
      diary: 0,
      notes: 0,
      review: 0,
      writeup: 0,
    };
    for (const post of posts) {
      next[post.category] += 1;
    }
    return next;
  }, [posts]);

  const visible =
    active === "all"
      ? posts
      : posts.filter((post) => post.category === active);

  return (
    <>
      <div className="mb-8" aria-label={copy.filter}>
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
          {ARTICLE_CATEGORIES.map((category) => (
            <FilterChip
              key={category}
              pressed={active === category}
              onClick={() => setActive(category)}
              label={labels[category]}
              count={counts[category]}
            />
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="text-muted-foreground text-sm">{copy.empty}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:gap-5">
          {visible.map((post) => (
            <BlogCard
              key={post.slug}
              locale={locale}
              slug={post.slug}
              title={post.title}
              date={post.date}
              summary={post.summary}
              categoryLabel={labels[post.category]}
            />
          ))}
        </div>
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
