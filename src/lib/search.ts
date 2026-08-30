export const SEARCH_KINDS = [
  "page",
  "diary",
  "project",
  "timeline",
  "likes",
  "academic",
  "friend",
  "skill",
] as const;

export type SearchKind = (typeof SEARCH_KINDS)[number];

export type SearchItem = {
  id: string;
  kind: SearchKind;
  title: string;
  description?: string;
  href: string;
  tags?: string[];
};

export function filterSearchItems(
  items: SearchItem[],
  query: string,
): SearchItem[] {
  const words = query
    .toLowerCase()
    .normalize("NFKC")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return items.filter((item) => item.kind === "page").slice(0, 8);
  }

  return items
    .filter((item) => {
      const hay = [item.title, item.description, ...(item.tags ?? [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .normalize("NFKC");
      return words.every((word) => hay.includes(word));
    })
    .slice(0, 24);
}
