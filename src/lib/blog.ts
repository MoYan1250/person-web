import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { siteConfig } from "@/data/site";
import {
  normalizeArticleCategory,
  type ArticleCategory,
} from "@/lib/articles";
import {
  estimateReadingTimeMinutes,
  getBlogContentDir,
  getMDXFiles,
} from "@/lib/blog-index";

const MATH_UNICODE_REPLACEMENTS: Array<[RegExp, string]> = [[/𝜇/gu, "\\mu"]];
const BLOG_HTML_SANITIZE_SCHEMA = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), "iframe"],
  attributes: {
    ...(defaultSchema.attributes ?? {}),
    iframe: [
      "src",
      "title",
      "width",
      "height",
      "allow",
      "allowfullscreen",
      "frameborder",
      "referrerpolicy",
      "loading",
    ],
  },
  protocols: {
    ...(defaultSchema.protocols ?? {}),
    src: ["https"],
  },
};

interface BlogPostMetadata {
  title: string;
  date: string;
  summary: string;
  category: ArticleCategory;
  [key: string]: unknown;
}

export interface BlogPost {
  metadata: BlogPostMetadata;
  slug: string;
  source: string;
  locale: string;
}

export async function markdownToHTML(markdown: string) {
  const normalizedMarkdown = MATH_UNICODE_REPLACEMENTS.reduce(
    (content, [pattern, replacement]) => content.replace(pattern, replacement),
    markdown,
  );

  const p = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize, BLOG_HTML_SANITIZE_SCHEMA)
    .use(rehypeSlug)
    .use(rehypeKatex, { strict: "ignore" })
    .use(rehypePrettyCode, {
      theme: {
        light: "material-theme-lighter",
        dark: "github-dark-dimmed",
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(normalizedMarkdown);

  return p.toString();
}

export async function getPost(
  slug: string,
  locale: string = "en",
): Promise<BlogPost | null> {
  const filePath = path.join(getBlogContentDir(locale), `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data: rawMetadata } = matter(source);
  const content = await markdownToHTML(rawContent);

  const metadata: BlogPostMetadata = {
    title: rawMetadata.title || "",
    date: rawMetadata.date || "",
    summary: rawMetadata.summary || "",
    category: normalizeArticleCategory(rawMetadata.category),
    ...rawMetadata,
  };
  metadata.category = normalizeArticleCategory(rawMetadata.category);
  metadata.readingTime =
    typeof rawMetadata.readingTime === "number" && rawMetadata.readingTime > 0
      ? rawMetadata.readingTime
      : estimateReadingTimeMinutes(rawContent);

  return {
    source: content,
    metadata,
    slug,
    locale,
  };
}

async function getAllPosts(
  dir: string,
  locale: string = "en",
): Promise<BlogPost[]> {
  const mdxFiles = getMDXFiles(dir);
  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = path.basename(file, path.extname(file));
      const post = await getPost(slug, locale);
      if (!post) {
        return null;
      }
      return post;
    }),
  );

  return posts.filter((post): post is BlogPost => post !== null);
}

export async function getBlogPosts(locale: string = "en"): Promise<BlogPost[]> {
  return getAllPosts(getBlogContentDir(locale), locale);
}

export interface PaginatedBlogPosts {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  postsPerPage: number;
}

export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
  );
}

export function getPostPreviewText(post: BlogPost, maxLength = 420): string {
  const html = post.source || "";
  const plain = html
    .replace(/<pre[\s\S]*?<\/pre>/gi, "\n")
    .replace(/<code[\s\S]*?<\/code>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<\/blockquote>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[^\S\n]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const text = plain || post.metadata.summary?.trim() || "";
  if (text.length <= maxLength) return text;

  const sliced = text.slice(0, maxLength);
  const breakAt = Math.max(
    sliced.lastIndexOf("\n\n"),
    sliced.lastIndexOf("\n"),
  );
  const cut =
    breakAt > maxLength * 0.4 ? sliced.slice(0, breakAt) : sliced.trimEnd();
  return cut.trim();
}

export async function getPaginatedBlogPosts(
  locale: string,
  currentPage: number,
): Promise<PaginatedBlogPosts> {
  const postsPerPage = siteConfig.blog.postsPerPage;
  const allPosts = sortPostsByDate(await getBlogPosts(locale));
  const totalPosts = allPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / postsPerPage));
  const start = (currentPage - 1) * postsPerPage;
  const posts = allPosts.slice(start, start + postsPerPage);

  return {
    posts,
    currentPage,
    totalPages,
    totalPosts,
    postsPerPage,
  };
}

export async function getAvailableLocales(
  slug: string,
  locales: string[],
): Promise<string[]> {
  const availableLocales: string[] = [];

  for (const locale of locales) {
    const filePath = path.join(getBlogContentDir(locale), `${slug}.mdx`);
    if (fs.existsSync(filePath)) {
      availableLocales.push(locale);
    }
  }

  return availableLocales;
}
