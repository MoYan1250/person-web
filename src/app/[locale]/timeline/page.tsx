import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PageLogbookHeader } from "@/components/blocks/page-logbook-header";
import { TimelineLogbook } from "@/components/portfolio/timeline-logbook";
import { routing } from "@/i18n/routing";
import { getCollectionItems, type TimelineItem } from "@/lib/content";
import { constructMetadata } from "@/lib/metadata";

type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return constructMetadata({
    title: t("sections.timeline"),
    description: t("timelinePage.description"),
    path: "/timeline",
    locale,
  });
}

export default async function TimelinePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const locale = params.locale || routing.defaultLocale;
  const t = await getTranslations({ locale });
  const timelineItems = getCollectionItems<TimelineItem>(t, "timeline.items");

  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col px-6 pt-20 pb-24 sm:px-8 md:px-10 md:pt-32">
      <PageLogbookHeader
        kicker={t("timelinePage.kicker")}
        grid={t("timelinePage.grid")}
        title={t("timelinePage.title")}
        description={t("timelinePage.description")}
        statLabel={t("timelinePage.records")}
        statValue={timelineItems.length}
      />

      <TimelineLogbook
        items={timelineItems}
        labels={{
          study: t("timelineTypes.study"),
          make: t("timelineTypes.make"),
          life: t("timelineTypes.life"),
          record: t("timelineTypes.record"),
        }}
        copy={{
          filter: t("timelinePage.filter"),
          all: t("timelinePage.all"),
          empty: t("timelinePage.empty"),
          era: t.raw("timelinePage.era") as string,
        }}
      />
    </main>
  );
}
