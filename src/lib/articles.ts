export const ARTICLE_CATEGORIES = ["diary", "notes", "review", "writeup"] as const;
export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

export function normalizeArticleCategory(value: unknown): ArticleCategory {
  if (
    value === "notes" ||
    value === "review" ||
    value === "diary" ||
    value === "writeup"
  ) {
    return value;
  }
  return "diary";
}
