import { Icons } from "@/components/icons";
import { Link, LOCALE_TO_HREFLANG, type Locale } from "@/i18n/routing";

export function HomeLatestWriting({
  slug,
  title,
  excerpt,
  date,
  categoryLabel,
  kicker,
  readMoreLabel,
  allLabel,
  emptyLabel,
  locale,
}: {
  slug?: string;
  title?: string;
  excerpt?: string;
  date?: string;
  categoryLabel?: string;
  kicker: string;
  readMoreLabel: string;
  allLabel: string;
  emptyLabel: string;
  locale: string;
}) {
  if (!slug || !title) {
    return (
      <div className="border-border bg-card mt-5 overflow-hidden rounded-xl border">
        <div className="border-border flex items-center justify-between gap-4 border-b px-4 py-2 font-mono text-[10px] font-bold tracking-[0.18em] uppercase sm:px-6">
          <span className="text-primary">{kicker}</span>
        </div>
        <div className="flex min-h-48 flex-col justify-between p-5 sm:min-h-56 sm:p-7">
          <p className="text-muted-foreground font-serif text-sm leading-7 font-bold sm:text-base sm:leading-8">
            {emptyLabel}
          </p>
          <Link
            href="/diary"
            locale={locale}
            className="text-primary mt-8 inline-flex items-center gap-1 text-sm font-semibold"
          >
            {allLabel}
            <Icons.chevronright className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const dateLocale =
    LOCALE_TO_HREFLANG[locale as Locale] || locale || "en-US";
  const formattedDate = date
    ? new Date(date).toLocaleDateString(dateLocale, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : null;

  return (
    <article className="border-border bg-card mt-5 overflow-hidden rounded-xl border">
      <div className="border-border flex items-center justify-between gap-4 border-b px-4 py-2 font-mono text-[10px] font-bold tracking-[0.18em] uppercase sm:px-6">
        <span className="text-primary">{kicker}</span>
        <div className="text-muted-foreground flex items-center gap-2">
          {categoryLabel ? <span>{categoryLabel}</span> : null}
          {formattedDate ? <span>{formattedDate}</span> : null}
        </div>
      </div>

      <Link
        href={`/diary/${slug}`}
        locale={locale}
        className="hover:bg-accent/20 group block min-h-[18rem] min-w-0 p-5 transition-colors sm:min-h-[22rem] sm:p-7"
      >
        <h2 className="min-w-0 font-serif text-2xl font-bold tracking-tight break-words transition-colors group-hover:text-primary sm:text-3xl">
          {title}
        </h2>
        {excerpt ? (
          <p className="text-muted-foreground font-serif mt-5 min-w-0 max-w-3xl text-sm leading-8 font-bold whitespace-pre-line break-words [overflow-wrap:anywhere] line-clamp-6 sm:mt-6 sm:text-base sm:leading-9 sm:line-clamp-8">
            {excerpt}
          </p>
        ) : null}
        <span className="text-primary mt-8 inline-flex items-center gap-1 text-sm font-semibold sm:mt-10">
          {readMoreLabel}
          <Icons.chevronright className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </article>
  );
}
