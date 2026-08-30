import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PapersGrid } from "@/components/academic/papers-grid";
import { PageLogbookHeader } from "@/components/blocks/page-logbook-header";
import { READ_PAPERS } from "@/data/read-papers";
import { routing } from "@/i18n/routing";
import { getBlogIndex } from "@/lib/blog";
import { type ResearchWork } from "@/lib/content";
import { constructMetadata } from "@/lib/metadata";
import {
  PAPER_TAGS,
  VENUE_TIER_LABELS,
  type PaperTag,
  withPaperTags,
} from "@/lib/papers";

type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return constructMetadata({
    title: t("sections.academic"),
    description: t("academicPage.description"),
    path: "/academic",
    locale,
  });
}

export default async function AcademicPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const locale = params.locale || routing.defaultLocale;
  const t = await getTranslations({ locale });
  const academic = t.raw("academic") as {
    research?: ResearchWork[];
  };
  const research = academic?.research ?? [];
  const paperIds = new Set(READ_PAPERS.map((paper) => paper.id));
  const noteByPaperId: Record<string, string> = {};
  for (const post of getBlogIndex(locale)) {
    const linkedId =
      (post.paperId && paperIds.has(post.paperId) && post.paperId) ||
      (paperIds.has(post.slug) ? post.slug : undefined);
    if (linkedId && !noteByPaperId[linkedId]) {
      noteByPaperId[linkedId] = post.slug;
    }
  }
  const papers = withPaperTags(READ_PAPERS, { locale, noteByPaperId });
  const tagLabels = Object.fromEntries(
    PAPER_TAGS.map((tag) => [tag, t(`academicPage.tags.${tag}`)]),
  ) as Record<PaperTag, string>;

  return (
    <main className="mx-auto flex min-h-dvh max-w-6xl flex-col px-6 pt-20 pb-24 sm:px-8 md:px-10 md:pt-32">
      <PageLogbookHeader
        kicker={t("academicPage.kicker")}
        grid={t("academicPage.grid")}
        title={t("sections.academic")}
        description={t("academicPage.description")}
        statLabel={t("academicPage.stat")}
        statValue={papers.length}
      />

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">
          {t("academicPage.research")}
        </h2>
        <div className="flex flex-col gap-3">
          {research.map((item) => (
            <ResearchCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight">
          {t("academicPage.papers")}
        </h2>
        <p className="text-muted-foreground mt-1 mb-4 text-sm leading-6">
          {t("academicPage.papersNote")}
        </p>
        <PapersGrid
          papers={papers}
          labels={tagLabels}
          venueLabels={VENUE_TIER_LABELS}
          copy={{
            filter: t("academicPage.filter"),
            all: t("academicPage.all"),
            empty: t("academicPage.emptyPapers"),
            venue: t("academicPage.venue"),
            paperNote: t("academicPage.paperNote"),
          }}
        />
      </section>
    </main>
  );
}

function ResearchCard({ item }: { item: ResearchWork }) {
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
    return (
      <a
        href={item.href}
        target={item.href.startsWith("http") ? "_blank" : undefined}
        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="border-border glass-panel hover:bg-accent/40 block rounded-xl border p-5 transition-colors"
      >
        {body}
      </a>
    );
  }

  return (
    <article className="border-border glass-panel rounded-xl border p-5">{body}</article>
  );
}

