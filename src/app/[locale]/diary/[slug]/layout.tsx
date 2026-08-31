import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { ArticleZoomProvider } from "@/components/blog/toc/article-zoom";
import {
  ArticleColumn,
  ArticleSidebarProvider,
  DesktopArticleSidebar,
} from "@/components/blog/toc/desktop-article-sidebar";
import { MobileTOC } from "@/components/blog/toc/mobile-toc";
import { ReadingProgressBar } from "@/components/blog/toc/reading-progress-bar";
import type { Locale } from "@/i18n/routing";
import { LOCALES, routing } from "@/i18n/routing";
import { getAvailableLocales, getPost } from "@/lib/blog";
import { generateBlogPostingJsonLd } from "@/lib/jsonld";
import { constructMetadata } from "@/lib/metadata";
import { jsonldScript } from "@/lib/utils";

export const dynamic = "force-static";
export const revalidate = false;
export const dynamicParams = false;

export async function generateMetadata(props: {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}): Promise<Metadata | undefined> {
  const params = await props.params;
  const locale = (params.locale || routing.defaultLocale) as Locale;
  const post = await getPost(params.slug, locale);

  if (!post) {
    const availableLocales = await getAvailableLocales(params.slug, LOCALES);
    if (availableLocales.length === 0) {
      return undefined;
    }

    const t = await getTranslations({ locale });
    return constructMetadata({
      title: t("blog.unavailable.title"),
      description: t("blog.unavailable.description"),
      path: `/diary/${params.slug}`,
      locale,
      availableLocales,
    });
  }

  const { title, date: publishedTime, summary: description } = post.metadata;

  const blogPath = `/diary/${post.slug}`;
  const availableLocales = await getAvailableLocales(params.slug, LOCALES);

  const baseMetadata = await constructMetadata({
    title,
    description,
    path: blogPath,
    locale,
    availableLocales,
  });

  return {
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      type: "article",
      publishedTime,
    },
  };
}

export default async function BlogLayout(props: {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}) {
  const params = await props.params;
  const locale = params.locale || routing.defaultLocale;
  const post = await getPost(params.slug, locale);

  if (!post) {
    const availableLocales = await getAvailableLocales(params.slug, LOCALES);
    if (availableLocales.length === 0) {
      notFound();
    }

    return (
      <ArticleSidebarProvider>
        <main
          id="blog"
          className="mobile-page-pad pt-[calc(4.75rem+env(safe-area-inset-top,0px))] pb-12 sm:pt-24 sm:pb-14 md:pt-32 md:pb-16 lg:pt-36 xl:pt-40"
        >
          <ArticleColumn>{props.children}</ArticleColumn>
        </main>
      </ArticleSidebarProvider>
    );
  }

  const blogPostingJsonLd = await generateBlogPostingJsonLd(post);
  const documentTitle = String(post.metadata.title || "");

  return (
    <ArticleZoomProvider>
      <ArticleSidebarProvider>
        <main
          id="blog"
          className="mobile-page-pad pt-[calc(4.75rem+env(safe-area-inset-top,0px))] pb-12 sm:pt-24 sm:pb-14 md:pt-32 md:pb-16 lg:pt-36 xl:pt-40"
        >
          {jsonldScript(blogPostingJsonLd)}

          <ReadingProgressBar />

          <DesktopArticleSidebar
            content={post.source}
            documentTitle={documentTitle}
          />

          <ArticleColumn>{props.children}</ArticleColumn>

          <MobileTOC content={post.source} documentTitle={documentTitle} />
        </main>
      </ArticleSidebarProvider>
    </ArticleZoomProvider>
  );
}
