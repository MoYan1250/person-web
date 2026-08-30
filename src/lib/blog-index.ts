import fs from "fs";
import matter from "gray-matter";
import path from "path";

import {
  normalizeArticleCategory,
  type ArticleCategory,
} from "@/lib/articles";

export function getBlogContentDir(locale: string): string {
  const localeDir = locale === "zh" ? "zh" : "en";
  return path.join(process.cwd(), "content", "blog", localeDir);
}

export function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

export type BlogIndexEntry = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: ArticleCategory;
  /** Links this post to a paper tile on /academic. */
  paperId?: string;
  status?: string;
  updatedAt?: string;
};

export function getBlogIndex(locale: string = "en"): BlogIndexEntry[] {
  const dir = getBlogContentDir(locale);
  return getMDXFiles(dir).map((file) => {
    const slug = path.basename(file, path.extname(file));
    const source = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data } = matter(source);
    const paperId =
      typeof data.paperId === "string" && data.paperId.trim()
        ? data.paperId.trim()
        : undefined;
    const status =
      typeof data.status === "string" && data.status.trim()
        ? data.status.trim()
        : undefined;
    const updatedAt =
      typeof data.updatedAt === "string" && data.updatedAt.trim()
        ? data.updatedAt.trim()
        : undefined;
    return {
      slug,
      title: String(data.title || slug),
      summary: String(data.summary || ""),
      date: String(data.date || ""),
      category: normalizeArticleCategory(data.category),
      paperId,
      status,
      updatedAt,
    };
  });
}

export function estimateReadingTimeMinutes(markdown: string): number {
  const codeSections = markdown.match(/```[\s\S]*?```/g) || [];
  const codeLines = codeSections.reduce(
    (total, block) => total + block.split("\n").length,
    0,
  );
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, " ");
  const plain = withoutCode
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_~`|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const cjk = (plain.match(/[\u4e00-\u9fff\u3400-\u4dbf]/gu) || []).length;
  const latin = plain.replace(/[\u4e00-\u9fff\u3400-\u4dbf]/gu, " ");
  const words = latin.split(/\s+/).filter(Boolean).length;

  const minutes = cjk / 500 + words / 200 + codeLines / 80;
  return Math.max(1, Math.ceil(minutes));
}

export function sortIndexByDate(posts: BlogIndexEntry[]): BlogIndexEntry[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
