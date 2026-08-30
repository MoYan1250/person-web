import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import { PageLogbookHeader } from "@/components/blocks/page-logbook-header";
import { ArticleZoomContent } from "@/components/blog/toc/article-zoom";
import { routing } from "@/i18n/routing";
import { normalizeArticleCategory } from "@/lib/articles";
import { getPost } from "@/lib/blog";
import { getBlogIndex } from "@/lib/blog-index";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  return [
    ...getBlogIndex("en").map((post) => ({ locale: "en", slug: post.slug })),
    ...getBlogIndex("zh").map((post) => ({ locale: "zh", slug: post.slug })),
  ];
}

export default async function Blog(props: {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}) {
  const params = await props.params;
  const locale = params.locale || routing.defaultLocale;
  const post = await getPost(params.slug, locale);
  const t = await getTranslations({ locale });

  if (!post) {
    return null;
  }

  const readingTime =
    typeof post.metadata.readingTime === "number" &&
    post.metadata.readingTime > 0
      ? post.metadata.readingTime
      : 1;
  const category = normalizeArticleCategory(post.metadata.category);

  return (
    <div className="w-full">
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
      <ArticleZoomContent className="block w-full">
        <article
          className="glass-panel prose dark:prose-invert w-full max-w-none rounded-2xl px-5 py-6 sm:px-7 sm:py-8 md:px-9 md:py-10 [&_h2]:scroll-mt-28 [&_h3]:scroll-mt-28 [&_h4]:scroll-mt-28"
          dangerouslySetInnerHTML={{ __html: post.source }}
        ></article>
      </ArticleZoomContent>
    </div>
  );
}
