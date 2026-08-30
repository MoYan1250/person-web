import { MetadataRoute } from "next";

import { siteConfig } from "@/data/site";
import { LOCALES } from "@/i18n/routing";
import { getBlogIndex } from "@/lib/blog-index";

const siteUrl = siteConfig.url;
const postsPerPage = siteConfig.blog.postsPerPage;

export const dynamic = "force-static";

function localePathPrefix(locale: string): string {
  return `/${locale}`;
}

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never"
  | undefined;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = ["", "/diary", "/about", "/projects", "/timeline", "/friends", "/likes", "/academic"];

  const pages = LOCALES.flatMap((locale) => {
    return staticPages.map((page) => ({
      url: `${siteUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: (["", "/diary"].includes(page)
        ? "weekly"
        : "monthly") as ChangeFrequency,
      priority: page === "" ? 1.0 : ["/diary", "/about", "/projects", "/timeline", "/friends", "/likes", "/academic"].includes(page) ? 0.8 : 0.5,
    }));
  });

  const allBlogSitemapEntries: MetadataRoute.Sitemap = [];
  const blogPaginationEntries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    const posts = getBlogIndex(locale);
    const visiblePosts = posts.filter(
      (post) => post.slug && (post.status !== "draft" || !post.status),
    );

    visiblePosts.forEach((post) => {
      const slugPart = post.slug.replace(/^\//, "").replace(/^blogs\//, "");
      if (slugPart) {
        allBlogSitemapEntries.push({
          url: `${siteUrl}${localePathPrefix(locale)}/diary/${slugPart}`,
          lastModified: post.updatedAt
            ? new Date(post.updatedAt)
            : post.date
              ? new Date(post.date)
              : new Date(),
          changeFrequency: "monthly" as ChangeFrequency,
          priority: 0.7,
        });
      }
    });

    const totalPages = Math.max(
      1,
      Math.ceil(visiblePosts.length / postsPerPage),
    );
    for (let page = 2; page <= totalPages; page++) {
      blogPaginationEntries.push({
        url: `${siteUrl}${localePathPrefix(locale)}/diary/page/${page}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as ChangeFrequency,
        priority: 0.6,
      });
    }
  }

  const uniqueBlogPostEntries = Array.from(
    new Map(allBlogSitemapEntries.map((entry) => [entry.url, entry])).values(),
  );

  return [...pages, ...blogPaginationEntries, ...uniqueBlogPostEntries];
}
