import { Icons } from "@/components/icons";
import { PressLink } from "@/components/ui/pressable-links";

export function HomeSectionHeader({
  code,
  title,
  href,
  allLabel,
}: {
  code: string;
  title: string;
  href?: string;
  allLabel?: string;
}) {
  return (
    <div className="mb-5">
      <p className="text-primary font-mono text-[11px] tracking-widest uppercase">
        {code}
      </p>
      <div className="mt-1 flex items-end justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {href && allLabel ? (
          <PressLink
            href={href}
            className="text-muted-foreground hover:text-primary inline-flex shrink-0 items-center gap-1 font-mono text-xs tracking-wide"
          >
            {allLabel}
            <Icons.arrowupright className="size-3" aria-hidden="true" />
          </PressLink>
        ) : null}
      </div>
    </div>
  );
}

export function padCount(value: number): string {
  return String(value).padStart(2, "0");
}

export function HomeStats({
  items,
}: {
  items: Array<{ label: string; value: number; href: string }>;
}) {
  return (
    <div className="border-border grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-4">
      {items.map((item) => (
        <PressLink
          key={item.label}
          href={item.href}
          className="bg-card hover:bg-accent/50 px-4 py-4 transition-colors"
        >
          <p className="text-muted-foreground font-mono text-[11px] tracking-widest uppercase">
            {item.label}
          </p>
          <p className="mt-2 font-mono text-3xl font-semibold tracking-tight">
            {padCount(item.value)}
          </p>
        </PressLink>
      ))}
    </div>
  );
}
