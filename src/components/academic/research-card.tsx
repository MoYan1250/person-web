"use client";

import { PressAnchor } from "@/components/ui/pressable-links";
import { PressSurface } from "@/components/ui/press-surface";
import { Link } from "@/i18n/routing";
import { type ResearchWork } from "@/lib/content";

export function ResearchCard({ item }: { item: ResearchWork }) {
  const body = (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
        {item.status ? (
          <span className="border-primary/20 bg-primary/10 text-primary rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase">
            {item.status}
          </span>
        ) : null}
      </div>
      <p className="text-muted-foreground mt-2 text-sm leading-6">
        {item.description}
      </p>
      {item.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="border-border bg-muted/40 text-muted-foreground rounded-md border px-2 py-1 text-[11px]"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </>
  );

  if (item.href) {
    const external = item.href.startsWith("http");

    if (external) {
      return (
        <PressAnchor
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="border-border glass-panel hover:bg-accent/40 block rounded-xl border p-5 transition-colors"
        >
          {body}
        </PressAnchor>
      );
    }

    return (
      <PressSurface asChild>
        <Link
          href={item.href}
          className="border-border glass-panel hover:bg-accent/40 block rounded-xl border p-5 transition-colors"
        >
          {body}
        </Link>
      </PressSurface>
    );
  }

  return (
    <article className="border-border glass-panel rounded-xl border p-5">
      {body}
    </article>
  );
}
