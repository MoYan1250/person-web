import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import { ArticleLocaleUnavailable } from "@/components/blog/article-locale-unavailable";
import { PageMotionHeader, PageMotionSection } from "@/components/blocks/page-motion";
import { PageLogbookHeader } from "@/components/blocks/page-logbook-header";
import { ArticleZoomContent } from "@/components/blog/toc/article-zoom";
import { normalizeArticleCategory } from "@/lib/articles";
import { getAvailableLocales, getPost } from "@/lib/blog";
import { getBlogSlugLocaleParams } from "@/lib/blog-index";
import { routing, LOCALES, type Locale } from "@/i18n/routing";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-static";
export const revalidate = false;
export const dynamicParams = false;

export async function generateStaticParams() {
  return getBlogSlugLocaleParams();
}

export default async function Blog(props: {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}) {
  const params = await props.params;
  const locale = (params.locale || routing.defaultLocale) as Locale;
  const post = await getPost(params.slug, locale);
  const t = await getTranslations({ locale });

  if (!post) {
    const availableLocales = await getAvailableLocales(params.slug, LOCALES);
    if (availableLocales.length === 0) {
      return null;
    }

    return (
      <ArticleLocaleUnavailable
        slug={params.slug}
        availableLocales={availableLocales}
        locale={locale}
      />
    );
  }

  const readingTime =
    typeof post.metadata.readingTime === "number" &&
    post.metadata.readingTime > 0
      ? post.metadata.readingTime
      : 1;
  const category = normalizeArticleCategory(post.metadata.category);

  return (
    <div className="w-full">
      <PageMotionHeader>
        <PageLogbookHeader
          kicker={t("blogPage.kicker")}
          grid={t("blogPage.grid")}
          title={post.metadata.title}
          description={
            post.metadata.summary || t(`blog.categories.${category}`)
          }
          statLabel={t("blogPage.readStat")}
          statValue={readingTime}
          statUnit={t("blogPage.readStatUnit")}
        />
      </PageMotionHeader>
      <PageMotionSection delay={0.05}>
        <div className="mb-8 flex items-center justify-between text-sm">
          <Suspense fallback={<p className="h-5" />}>
            <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
              <p className="text-primary font-mono text-[11px] tracking-widest uppercase">
                {t(`blog.categories.${category}`)}
              </p>
              <span className="mx-1">·</span>
              <p>{formatDate(post.metadata.date, locale)}</p>
            </div>
          </Suspense>
        </div>
      </PageMotionSection>
      <PageMotionSection delay={0.12}>
        <ArticleZoomContent className="block w-full">
          <article
            className="glass-panel prose dark:prose-invert w-full max-w-none rounded-2xl px-5 py-6 sm:px-7 sm:py-8 md:px-9 md:py-10 [&_h2]:scroll-mt-28 [&_h3]:scroll-mt-28 [&_h4]:scroll-mt-28"
            dangerouslySetInnerHTML={{ __html: post.source }}
          ></article>
        </ArticleZoomContent>
      </PageMotionSection>
    </div>
  );
}
