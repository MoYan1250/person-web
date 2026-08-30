import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PageLogbookHeader } from "@/components/blocks/page-logbook-header";
import { ArticlesIndex } from "@/components/blog/articles-index";
import { routing } from "@/i18n/routing";
import { getBlogPosts, sortPostsByDate } from "@/lib/blog";
import { normalizeArticleCategory } from "@/lib/articles";
import { generateBlogJsonLd } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { jsonldScript } from "@/lib/utils";

type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const metadata = await constructMetadata({
    title: t("blog.title"),
    description: t("blogTagline"),
    path: "/diary",
    locale,
  });

  return metadata;
}

export default async function BlogPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const locale = params.locale || routing.defaultLocale;
  const posts = sortPostsByDate(await getBlogPosts(locale));
  const blogJsonLd = generateBlogJsonLd(posts);
  const t = await getTranslations({ locale });

  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col px-6 pt-20 pb-24 sm:px-8 md:px-10 md:pt-32">
      {jsonldScript(blogJsonLd)}
      <PageLogbookHeader
        kicker={t("blogPage.kicker")}
        grid={t("blogPage.grid")}
        title={t("blog.title")}
        description={t("blogPage.description")}
        statLabel={t("blogPage.stat")}
        statValue={posts.length}
      />
      <p className="text-muted-foreground mb-8 text-sm leading-6 sm:text-base sm:leading-7">
        {t("blogPage.localeNote")}
      </p>
      <ArticlesIndex
          locale={locale}
          posts={posts.map((post) => ({
            slug: post.slug,
            title: post.metadata.title,
            date: post.metadata.date,
            summary: post.metadata.summary,
            category: normalizeArticleCategory(post.metadata.category),
          }))}
          labels={{
            diary: t("blog.categories.diary"),
            notes: t("blog.categories.notes"),
            review: t("blog.categories.review"),
            writeup: t("blog.categories.writeup"),
          }}
          copy={{
            filter: t("blog.filter"),
            all: t("blog.all"),
            empty: t("blog.empty"),
          }}
        />
    </main>
  );
}
