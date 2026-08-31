import { padCount } from "@/components/home/home-section";
import { Icons } from "@/components/icons";
import { PressLink } from "@/components/ui/pressable-links";

type RouteCard = {
  href: string;
  code: string;
  title: string;
  description: string;
};

export function HomeRouteIndex({
  cards,
}: {
  cards: RouteCard[];
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {cards.map((card) => (
        <PressLink
          key={card.href}
          href={card.href}
          className="border-border bg-card hover:border-primary/50 group rounded-xl border p-4 transition-colors"
        >
          <div className="text-muted-foreground group-hover:text-primary mb-3 flex items-center justify-between font-mono text-[11px] tracking-widest">
            <span>{card.code}</span>
            <Icons.arrowupright className="size-3.5" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold tracking-tight">{card.title}</h3>
          <p className="text-muted-foreground mt-1 text-sm">{card.description}</p>
        </PressLink>
      ))}
    </div>
  );
}

export function HomeNoteList({
  posts,
  locale,
}: {
  posts: Array<{ slug: string; title: string; date: string }>;
  locale: string;
}) {
  return (
    <ol className="divide-border divide-y">
      {posts.map((post, index) => (
        <li key={post.slug}>
          <PressLink
            href={`/diary/${post.slug}`}
            locale={locale}
            className="hover:text-primary flex items-baseline gap-3 py-3 text-sm transition-colors"
          >
            <span className="text-muted-foreground font-mono text-[11px]">
              {padCount(index + 1)}
            </span>
            <span className="text-muted-foreground font-mono text-[11px]">
              {post.date.slice(0, 10)}
            </span>
            <span className="font-medium">{post.title}</span>
          </PressLink>
        </li>
      ))}
    </ol>
  );
}

export function HomeProjectPulse({
  projects,
}: {
  projects: Array<{
    title: string;
    href?: string;
    dates: string;
    description: string;
    technologies?: string[];
  }>;
}) {
  return (
    <ol className="space-y-3">
      {projects.map((project, index) => {
        const inner = (
          <>
            <div className="text-muted-foreground flex items-baseline gap-3 font-mono text-[11px]">
              <span>{padCount(index + 1)}</span>
              <span>{project.dates}</span>
            </div>
            <h3 className="mt-1 text-base font-semibold tracking-tight">
              {project.title}
            </h3>
            <p className="text-muted-foreground mt-1 text-sm">
              {project.description}
            </p>
            {project.technologies && project.technologies.length > 0 ? (
              <p className="text-muted-foreground mt-2 font-mono text-[11px]">
                {project.technologies.join(" / ")}
              </p>
            ) : null}
          </>
        );

        return (
          <li
            key={`${project.title}-${index}`}
            className="border-border bg-card rounded-xl border p-4"
          >
            {project.href ? (
              <a
                href={project.href}
                target={project.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  project.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="hover:text-primary block transition-colors"
              >
                {inner}
              </a>
            ) : (
              inner
            )}
          </li>
        );
      })}
    </ol>
  );
}

export function HomeTimelinePulse({
  items,
  labels,
}: {
  items: Array<{
    date: string;
    title: string;
    description: string;
    type: "study" | "make" | "life" | "record";
    types?: Array<"study" | "make" | "life" | "record">;
  }>;
  labels: Record<"study" | "make" | "life" | "record", string>;
}) {
  return (
    <ol className="space-y-1">
      {items.map((item, index) => {
        const types = item.types?.length ? item.types : [item.type];
        return (
          <li
            key={`${item.date}-${item.title}`}
            className="hover:bg-accent/40 flex gap-3 rounded-lg px-2 py-3"
          >
            <span className="text-muted-foreground w-6 shrink-0 font-mono text-[11px]">
              {padCount(index + 1)}
            </span>
            <div className="min-w-0">
              <div className="text-muted-foreground flex flex-wrap items-center gap-2 font-mono text-[11px]">
                <time>{item.date}</time>
                <span>{types.map((type) => labels[type]).join(" · ")}</span>
              </div>
              <p className="mt-0.5 text-sm font-semibold">{item.title}</p>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function HomeFeaturedPost({
  slug,
  title,
  date,
  summary,
  locale,
  readMore,
}: {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  locale: string;
  readMore: string;
}) {
  return (
    <PressLink
      href={`/diary/${slug}`}
      locale={locale}
      className="border-border bg-card hover:border-primary/50 group block rounded-xl border p-5 transition-colors"
    >
      <p className="text-muted-foreground font-mono text-[11px] tracking-wide">
        {date.slice(0, 10)}
      </p>
      <h3 className="group-hover:text-primary mt-2 text-xl font-semibold tracking-tight">
        {title}
      </h3>
      {summary ? (
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          {summary}
        </p>
      ) : null}
      <span className="text-primary mt-4 inline-flex items-center gap-1 font-mono text-xs">
        {readMore} <Icons.chevronright className="size-3.5" />
      </span>
    </PressLink>
  );
}
