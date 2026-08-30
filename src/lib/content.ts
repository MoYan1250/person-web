import { getTranslations } from "next-intl/server";

type Translator = Awaited<ReturnType<typeof getTranslations>>;

export function getArrayField<T>(t: Translator, key: string): T[] {
  try {
    const value = t.raw(key);
    if (Array.isArray(value)) {
      return value as T[];
    }
    return [];
  } catch {
    return [];
  }
}

export function getCollectionItems<T>(t: Translator, key: string): T[] {
  try {
    const parentKey = key.split(".")[0];
    const collection = t.raw(parentKey) as
      | { items?: T[] | undefined }
      | undefined
      | null;
    if (
      collection &&
      typeof collection === "object" &&
      "items" in collection &&
      Array.isArray(collection.items)
    ) {
      return collection.items as T[];
    }
    return [];
  } catch {
    return [];
  }
}

export type ProjectItem = {
  title: string;
  href?: string;
  dates: string;
  active: boolean;
  description: string;
  technologies?: string[];
  authors?: string;
  links?: Array<{ type: string; href: string; icon: string }>;
  image?: string;
  video?: string;
};

export const TIMELINE_TYPES = ["study", "make", "life", "record"] as const;
export type TimelineType = (typeof TIMELINE_TYPES)[number];

export type TimelineLink = {
  label: string;
  href: string;
};

export type TimelineItem = {
  date: string;
  title: string;
  description: string;
  type: TimelineType;
  types?: TimelineType[];
  image?: string;
  /** Square logo with baked-in background (no letterboxing). */
  imagePresentation?: "logo" | "photo";
  /** Scale factor for contained logos inside the frame (e.g. 0.7). */
  imageScale?: number;
  tags?: string[];
  links?: TimelineLink[];
};

export function getTimelineTypes(item: TimelineItem): TimelineType[] {
  const listed = item.types?.length ? item.types : [item.type];
  const unique: TimelineType[] = [];
  for (const type of listed) {
    if (!unique.includes(type)) unique.push(type);
  }
  return unique;
}

export type EducationItem = {
  school: string;
  href: string;
  degree: string;
  logoUrl: string;
  start: string;
  end: string;
};

export type WorkItem = {
  company: string;
  href: string;
  badges: readonly string[];
  location: string;
  title: string;
  logoUrl: string;
  start: string;
  end: string;
  description: string;
};

export type FriendItem = {
  name: string;
  url: string;
  description: string;
  avatar?: string;
  domain?: string;
};

export function friendDomain(item: FriendItem): string {
  if (item.domain) return item.domain;
  try {
    return new URL(item.url).hostname.replace(/^www\./, "");
  } catch {
    return item.url;
  }
}

export function friendInitials(name: string): string {
  const trimmed = name.trim();
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2 && /^[A-Za-z]/.test(parts[0])) {
    return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
  }
  return trimmed.slice(0, 2) || "?";
}

export type LikedGame = {
  title: string;
  hours?: string;
  status?: string;
  note?: string;
  cover?: string;
};

export type LikedMusic = {
  title: string;
  artist?: string;
  genre?: string;
  url?: string;
  note?: string;
};

export type ResearchWork = {
  title: string;
  status?: string;
  description: string;
  href?: string;
  tags?: string[];
};

export type ReadPaper = {
  title: string;
  authors?: string;
  year?: string;
  venue?: string;
  note?: string;
  href?: string;
};
