import { Link } from "@/i18n/routing";
import type { TimelineItem } from "@/lib/content";

const TYPE_STYLES: Record<TimelineItem["type"], string> = {
  study: "bg-[#AA96DC] dark:bg-black",
  make: "bg-[#8C42D1] dark:bg-[#8c52ff]",
  life: "bg-[#C27DE0] dark:bg-[#7355ae]",
  record: "bg-[#7355ae] dark:bg-[#8c52ff]",
};

export function TimelineList({
  items,
  labels,
}: {
  items: TimelineItem[];
  labels: Record<TimelineItem["type"], string>;
}) {
  return (
    <ol className="relative space-y-8 border-l border-border pl-6">
      {items.map((item) => (
        <li key={`${item.date}-${item.title}`} className="relative">
          <span
            className={`absolute top-1.5 -left-[29px] size-3 rounded-full ${TYPE_STYLES[item.type] || "bg-foreground"}`}
          />
          <div className="text-muted-foreground mb-1 flex flex-wrap items-center gap-2 text-xs">
            <time>{item.date}</time>
            <span className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5">
              {labels[item.type]}
            </span>
          </div>
          <h3 className="text-sm font-semibold sm:text-base">{item.title}</h3>
          <p className="text-muted-foreground mt-1 text-sm">{item.description}</p>
        </li>
      ))}
    </ol>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  href,
  viewAll,
}: {
  eyebrow?: string;
  title: string;
  href?: string;
  viewAll?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <div className="bg-primary text-primary-foreground mb-2 inline-block rounded-lg px-3 py-1 text-sm">
            {eyebrow}
          </div>
        ) : null}
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h2>
      </div>
      {href && viewAll ? (
        <Link
          href={href}
          className="text-muted-foreground hover:text-foreground text-sm underline-offset-4 hover:underline"
        >
          {viewAll}
        </Link>
      ) : null}
    </div>
  );
}
