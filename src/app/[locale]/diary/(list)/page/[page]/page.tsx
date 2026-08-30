import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { PageLogbookHeader } from "@/components/blocks/page-logbook-header";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogPagination } from "@/components/blog/blog-pagination";
import { siteConfig } from "@/data/site";
import { LOCALES, routing } from "@/i18n/routing";
import { getBlogPosts, getPaginatedBlogPosts } from "@/lib/blog";
import { generateBlogJsonLd } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { jsonldScript } from "@/lib/utils";

type RouteParams = {
  locale: string;
  page: string;
};

type MetadataProps = {
  params: Promise<RouteParams>;
};

function parsePage(value: string): number | null {
  if (!/^\d+$/.test(value)) return null;
  const parsed = Number.parseInt(value, 10);
  /* Page 1 lives at /diary – avoid duplicate URLs by 404'ing /diary/page/1 */
  return parsed >= 2 ? parsed : null;
}

export async function generateStaticParams() {
  const postsPerPage = siteConfig.blog.postsPerPage;
  const params: Array<{ locale: string; page: string }> = [];

  for (const locale of LOCALES) {
    const posts = await getBlogPosts(locale);
    const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage));
    for (let page = 2; page <= totalPages; page++) {
      params.push({ locale, page: String(page) });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale, page } = await params;
  const t = await getTranslations({ locale });
  const pageNumber = parsePage(page);

  if (pageNumber === null) {
    return constructMetadata({
      title: t("blog.title"),
      description: t("blogTagline"),
      path: "/diary",
      locale,
    });
  }

  return constructMetadata({
    title: `${t("blog.title")} – ${t("blog.pagination.pageInfo", {
      current: pageNumber,
      total: pageNumber,
    })}`,
    description: t("blogTagline"),
    path: `/diary/page/${pageNumber}`,
    locale,
  });
}

export default async function BlogPaginatedPage(props: {
  params: Promise<RouteParams>;
}) {
  const params = await props.params;
  const locale = params.locale || routing.defaultLocale;
  const pageNumber = parsePage(params.page);

  if (pageNumber === null) notFound();

  const { posts, currentPage, totalPages } = await getPaginatedBlogPosts(
    locale,
    pageNumber,
  );

  if (pageNumber > totalPages || posts.length === 0) notFound();

  const blogJsonLd = generateBlogJsonLd(posts);
  const t = await getTranslations({ locale });

  const allPosts = await getBlogPosts(locale);

  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col px-6 pt-20 pb-24 sm:px-8 md:px-10 md:pt-32">
      {jsonldScript(blogJsonLd)}
      <PageLogbookHeader
        kicker={t("blogPage.kicker")}
        grid={t("blogPage.grid")}
        title={t("blog.title")}
        description={t("blogPage.description")}
        statLabel={t("blogPage.stat")}
        statValue={allPosts.length}
      />

      <p className="text-muted-foreground mb-8 text-sm leading-6 sm:text-base sm:leading-7">
        {t("blogPage.localeNote")}
      </p>

      <div className="grid grid-cols-1 gap-4 sm:gap-5">
        {posts.map((post) => (
          <BlogCard
            key={post.slug}
            locale={locale}
            slug={post.slug}
            title={post.metadata.title}
            date={post.metadata.date}
            summary={post.metadata.summary}
          />
        ))}
      </div>

      <BlogPagination
        currentPage={currentPage}
        totalPages={totalPages}
        locale={locale}
      />
    </main>
  );
}
