import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import {
  PageMotionHeader,
  PageMotionSection,
  StaggerItem,
} from "@/components/blocks/page-motion";
import { PageLogbookHeader } from "@/components/blocks/page-logbook-header";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogPagination } from "@/components/blog/blog-pagination";
import { siteConfig } from "@/data/site";
import { LOCALES, routing } from "@/i18n/routing";
import { getBlogIndex, sortIndexByDate } from "@/lib/blog-index";
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
  return parsed >= 2 ? parsed : null;
}

export async function generateStaticParams() {
  const postsPerPage = siteConfig.blog.postsPerPage;
  const params: Array<{ locale: string; page: string }> = [];

  for (const locale of LOCALES) {
    const posts = getBlogIndex(locale);
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

  const postsPerPage = siteConfig.blog.postsPerPage;
  const allPosts = sortIndexByDate(getBlogIndex(locale));
  const totalPosts = allPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / postsPerPage));
  const start = (pageNumber - 1) * postsPerPage;
  const posts = allPosts.slice(start, start + postsPerPage);

  if (pageNumber > totalPages || posts.length === 0) notFound();

  const blogJsonLd = generateBlogJsonLd(
    posts.map((post) => ({
      slug: post.slug,
      metadata: {
        title: post.title,
        date: post.date,
        summary: post.summary,
      },
    })),
  );
  const t = await getTranslations({ locale });

  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col px-6 pt-20 mobile-page-pad sm:px-8 md:px-10 md:pt-32">
      {jsonldScript(blogJsonLd)}
      <PageMotionHeader>
        <PageLogbookHeader
          kicker={t("blogPage.kicker")}
          grid={t("blogPage.grid")}
          title={t("blog.title")}
          description={t("blogPage.description")}
          statLabel={t("blogPage.stat")}
          statValue={totalPosts}
        />
      </PageMotionHeader>

      <PageMotionSection>
        <p className="text-muted-foreground mb-8 text-sm leading-6 sm:text-base sm:leading-7">
          {t("blogPage.localeNote")}
        </p>

        <div className="grid grid-cols-1 gap-4 sm:gap-5">
          {posts.map((post, index) => (
            <StaggerItem key={post.slug} index={index}>
              <BlogCard
                locale={locale}
                slug={post.slug}
                title={post.title}
                date={post.date}
                summary={post.summary}
              />
            </StaggerItem>
          ))}
        </div>

        <BlogPagination
          currentPage={pageNumber}
          totalPages={totalPages}
          locale={locale}
        />
      </PageMotionSection>
    </main>
  );
}
