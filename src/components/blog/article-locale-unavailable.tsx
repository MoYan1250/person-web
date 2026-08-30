import { getTranslations } from "next-intl/server";

import { PageMotionHeader, PageMotionSection } from "@/components/blocks/page-motion";
import { PageLogbookHeader } from "@/components/blocks/page-logbook-header";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";

export async function ArticleLocaleUnavailable({
  slug,
  availableLocales,
  locale,
}: {
  slug: string;
  availableLocales: string[];
  locale: Locale;
}) {
  const t = await getTranslations({ locale });
  const fallbackLocale = availableLocales.find((item) => item !== locale);

  return (
    <div className="w-full">
      <PageMotionHeader>
        <PageLogbookHeader
          kicker={t("blogPage.kicker")}
          grid={t("blogPage.grid")}
          title={t("blog.unavailable.title")}
          description={t("blog.unavailable.description")}
          statLabel={t("blogPage.stat")}
          statValue={0}
        />
      </PageMotionHeader>
      <PageMotionSection>
        <div className="border-border glass-panel mx-auto max-w-2xl rounded-2xl border px-6 py-10 text-center sm:px-8 sm:py-12">
          <p className="text-lg font-semibold tracking-tight sm:text-xl">
            {t("blog.unavailable.heading")}
          </p>
          <p className="text-muted-foreground mt-3 text-sm leading-6 sm:text-base">
            {t("blog.unavailable.description")}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            {fallbackLocale ? (
              <Button asChild>
                <Link
                  href={`/diary/${slug}`}
                  locale={fallbackLocale as Locale}
                >
                  {t(`blog.unavailable.readIn.${fallbackLocale}`)}
                </Link>
              </Button>
            ) : null}
            <Button variant="outline" asChild>
              <Link href="/diary">{t("blog.unavailable.backToList")}</Link>
            </Button>
          </div>
        </div>
      </PageMotionSection>
    </div>
  );
}
