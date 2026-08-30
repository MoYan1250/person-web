export type SignalKind = "diary" | "project" | "timeline";

export type SignalItem = {
  date: string;
  title: string;
  href: string;
  kind: SignalKind;
};

function parseLooseDate(value: string): number {
  const match = value.match(/(\d{4})(?:[-./](\d{1,2}))?(?:[-./](\d{1,2}))?/);
  if (!match) return 0;
  const year = Number(match[1]);
  const month = Number(match[2] || 1);
  const day = Number(match[3] || 1);
  return Date.UTC(year, month - 1, day);
}

export function collectLatestSignals({
  diary,
  projects,
  timeline,
  limit = 12,
}: {
  diary: Array<{ date: string; title: string; slug: string }>;
  projects: Array<{ dates: string; title: string; href?: string }>;
  timeline: Array<{ date: string; title: string }>;
  limit?: number;
}): SignalItem[] {
  const items: SignalItem[] = [
    ...diary.map((post) => ({
      date: post.date,
      title: post.title,
      href: `/diary/${post.slug}`,
      kind: "diary" as const,
    })),
    ...projects.map((project) => ({
      date: project.dates,
      title: project.title,
      href: project.href || "/projects",
      kind: "project" as const,
    })),
    ...timeline.map((entry) => ({
      date: entry.date,
      title: entry.title,
      href: "/timeline",
      kind: "timeline" as const,
    })),
  ];

  return items
    .filter((item) => item.title)
    .sort((a, b) => parseLooseDate(b.date) - parseLooseDate(a.date))
    .slice(0, limit);
}
