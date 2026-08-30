import { getTranslations } from "next-intl/server";

import { getBlogIndex } from "@/lib/blog";
import { getPaperBlurb } from "@/data/paper-blurbs";
import { READ_PAPERS } from "@/data/read-papers";
import {
  getArrayField,
  getCollectionItems,
  type FriendItem,
  type LikedGame,
  type LikedMusic,
  type ProjectItem,
  type ReadPaper,
  type ResearchWork,
  type TimelineItem,
} from "@/lib/content";
import { inferPaperTags, inferPaperVenue } from "@/lib/papers";
import type { SearchItem } from "@/lib/search";

const PAGE_CARD: Record<string, string> = {
  "/about": "about",
  "/projects": "projects",
  "/timeline": "timeline",
  "/diary": "diary",
  "/friends": "friends",
  "/likes": "likes",
  "/academic": "academic",
};

export async function buildSearchIndex(locale: string): Promise<SearchItem[]> {
  const t = await getTranslations({ locale });
  const items: SearchItem[] = [];

  const nav = t.raw("navbar.items") as Array<{
    href: string;
    label: string;
  }>;

  for (const page of nav) {
    const card = PAGE_CARD[page.href];
    items.push({
      id: `page:${page.href}`,
      kind: "page",
      title: page.label,
      href: page.href,
      description: card
        ? t(`index.cards.${card}.description`)
        : t("headline"),
    });
  }

  items.push(
    {
      id: "page:/likes",
      kind: "page",
      title: t("sections.likes"),
      href: "/likes",
      description: t("likesPage.description"),
    },
    {
      id: "page:/academic",
      kind: "page",
      title: t("sections.academic"),
      href: "/academic",
      description: t("academicPage.description"),
    },
  );

  for (const post of getBlogIndex(locale)) {
    items.push({
      id: `diary:${post.slug}`,
      kind: "diary",
      title: post.title,
      description: post.summary,
      href: `/diary/${post.slug}`,
      tags: [post.date, post.category].filter(Boolean),
    });
  }

  for (const project of getCollectionItems<ProjectItem>(t, "projects.items")) {
    items.push({
      id: `project:${project.title}`,
      kind: "project",
      title: project.title,
      description: project.description,
      href: "/projects",
      tags: project.technologies,
    });
  }

  for (const entry of getCollectionItems<TimelineItem>(t, "timeline.items")) {
    items.push({
      id: `timeline:${entry.date}:${entry.title}`,
      kind: "timeline",
      title: entry.title,
      description: entry.description,
      href: "/timeline",
      tags: [entry.date, ...(entry.tags ?? [])],
    });
  }

  for (const friend of getCollectionItems<FriendItem>(t, "friends.items")) {
    items.push({
      id: `friend:${friend.url}`,
      kind: "friend",
      title: friend.name,
      description: friend.description,
      href: "/friends",
      tags: friend.url ? [friend.url] : undefined,
    });
  }

  for (const skill of getArrayField<string>(t, "skills")) {
    items.push({
      id: `skill:${skill}`,
      kind: "skill",
      title: skill,
      description: t("sections.skills"),
      href: "/about",
    });
  }

  const likes = t.raw("likes") as {
    games?: LikedGame[];
    music?: LikedMusic[];
  };
  for (const game of likes?.games ?? []) {
    items.push({
      id: `likes:game:${game.title}`,
      kind: "likes",
      title: game.title,
      description: game.note || game.status,
      href: "/likes",
      tags: [game.hours, game.status].filter(Boolean) as string[],
    });
  }
  for (const track of likes?.music ?? []) {
    items.push({
      id: `likes:music:${track.title}`,
      kind: "likes",
      title: track.title,
      description: track.note || track.artist,
      href: "/likes",
      tags: [track.genre, track.artist].filter(Boolean) as string[],
    });
  }

  const academic = t.raw("academic") as {
    research?: ResearchWork[];
  };
  for (const work of academic?.research ?? []) {
    items.push({
      id: `academic:research:${work.title}`,
      kind: "academic",
      title: work.title,
      description: work.description,
      href: "/academic",
      tags: work.tags,
    });
  }
  for (const paper of READ_PAPERS) {
    items.push({
      id: `academic:paper:${paper.id}`,
      kind: "academic",
      title: paper.title,
      description:
        getPaperBlurb(paper.id, locale) ??
        [paper.short, paper.authors, paper.year, inferPaperVenue(paper)]
          .filter(Boolean)
          .join(" · "),
      href: paper.href || "/academic",
      tags: [...inferPaperTags(paper), inferPaperVenue(paper)],
    });
  }

  return items;
}
