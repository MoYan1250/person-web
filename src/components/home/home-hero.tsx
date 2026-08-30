import { Link } from "@/i18n/routing";

export function HomeHero({
  kicker,
  title,
  subtitle,
  headline,
  aboutHref = "/about",
  aboutLabel,
  diaryHref = "/diary",
  diaryLabel,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  headline: string;
  aboutHref?: string;
  aboutLabel: string;
  diaryHref?: string;
  diaryLabel: string;
}) {
  return (
    <section className="border-border bg-card rounded-xl border px-5 py-8 sm:px-8 sm:py-10">
      <p className="text-muted-foreground font-mono text-sm">{kicker}</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="text-muted-foreground mt-3 text-sm">{subtitle}</p>
      ) : null}
      <p className="mt-5 max-w-xl text-base leading-relaxed sm:text-lg sm:leading-8">
        {headline}
      </p>
      <div className="mt-8 flex flex-col gap-3">
        <Link
          href={aboutHref}
          className="bg-primary text-primary-foreground inline-flex w-full items-center justify-between rounded-xl px-5 py-3.5 text-sm font-semibold transition-transform hover:opacity-90 active:scale-[0.99]"
        >
          {aboutLabel}
          <span aria-hidden="true">→</span>
        </Link>
        <Link
          href={diaryHref}
          className="border-border hover:bg-accent/50 inline-flex w-full items-center justify-between rounded-xl border px-5 py-3.5 text-sm font-semibold transition-colors active:scale-[0.99]"
        >
          {diaryLabel}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
