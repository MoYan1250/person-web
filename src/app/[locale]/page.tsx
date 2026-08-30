import { getTranslations } from "next-intl/server";

import { PageLogbookHeader } from "@/components/blocks/page-logbook-header";
import { HomeLatestWriting } from "@/components/home/home-latest-writing";
import { HomeBento } from "@/components/home/home-bento";
import { HomeDragScroll } from "@/components/home/home-drag-scroll";
import { HomeMarquee } from "@/components/home/home-marquee";
import { HomeProfileCard } from "@/components/home/home-profile-card";
import { BlurFade } from "@/components/ui/blur-fade";
import { BLUR_FADE_DELAY, siteConfig } from "@/data/site";
import { routing } from "@/i18n/routing";
import { getBlogIndex, sortIndexByDate } from "@/lib/blog-index";
import { normalizeArticleCategory } from "@/lib/articles";
import {
  getCollectionItems,
  type ProjectItem,
  type TimelineItem,
} from "@/lib/content";
import { collectLatestSignals } from "@/lib/feed";
import { generatePersonJsonLd } from "@/lib/jsonld";
import { transformSocialData } from "@/lib/social-icons";
import { jsonldScript } from "@/lib/utils";

export default async function Page(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const locale = params.locale || routing.defaultLocale;
  const t = await getTranslations({ locale });

  const socialData = transformSocialData(
    t.raw("social") as Parameters<typeof transformSocialData>[0],
  );
  const projectsItems = getCollectionItems<ProjectItem>(t, "projects.items");
  const timelineItems = getCollectionItems<TimelineItem>(t, "timeline.items");
  const diaryPosts = sortIndexByDate(getBlogIndex(locale));
  const latestPost = diaryPosts[0];
  const latestCategory = latestPost
    ? normalizeArticleCategory(latestPost.category)
    : null;
  const latestSignals = collectLatestSignals({
    diary: diaryPosts.map((post) => ({
      date: post.date,
      title: post.title,
      slug: post.slug,
    })),
    projects: projectsItems,
    timeline: timelineItems,
  });
  const personJsonLd = await generatePersonJsonLd(locale);
  const displayName = t("name.short");
  const zh = locale === "zh";
  const routeCards = [
    "about",
    "diary",
    "likes",
    "academic",
    "timeline",
    "friends",
    "projects",
  ] as const;

  return (
    <main className="mobile-page-pad">
      {jsonldScript(personJsonLd)}
      <HomeDragScroll />
      <div className="mt-16 md:mt-20">
        <HomeMarquee
          items={latestSignals}
          kindLabels={{
            diary: t("home.marquee.diary"),
            project: t("home.marquee.project"),
            timeline: t("home.marquee.timeline"),
          }}
          onlineLabel={t("home.marquee.online")}
          offlineLabel={t("home.marquee.offline")}
        />
      </div>

      <div className="mx-auto max-w-[1180px] px-5 py-8 sm:px-6 md:px-8">
        <div className="flex flex-col items-start gap-5 lg:flex-row">
          <div className="w-full lg:sticky lg:top-24 lg:w-[340px] lg:shrink-0">
            <BlurFade delay={0}>
              <HomeProfileCard
                name={displayName}
                location={t("location.name")}
                focusLabel={t("home.focus")}
                focus={t("focus")}
                sinceLabel={t("home.since")}
                since={t("since")}
                initials={t("name.initials")}
                avatarUrl={siteConfig.avatarUrl}
                socials={socialData}
              />
            </BlurFade>
          </div>

          <div className="w-full min-w-0 flex-1 space-y-5">
            <BlurFade delay={BLUR_FADE_DELAY}>
              <PageLogbookHeader
                kicker={t("home.kicker")}
                grid={t("home.grid")}
                title={displayName}
                description={t("headline")}
                statLabel={t("home.stat")}
                statValue={routeCards.length}
              />
              <HomeLatestWriting
                slug={latestPost?.slug}
                title={latestPost?.title}
                excerpt={latestPost?.summary}
                date={latestPost?.date}
                categoryLabel={
                  latestCategory
                    ? t(`blog.categories.${latestCategory}`)
                    : undefined
                }
                kicker={t("home.latest.code")}
                readMoreLabel={t("home.readMore")}
                allLabel={t("home.latest.all")}
                emptyLabel={t("blog.empty")}
                locale={locale}
              />
            </BlurFade>

            <HomeBento
                cards={[
                  {
                    area: "about",
                    href: "/about",
                    kicker: "ABOUT",
                    title: t("index.cards.about.title"),
                    description: t("index.cards.about.description"),
                    ghost: zh ? "我" : "A",
                    image: siteConfig.avatarUrl,
                  },
                  {
                    area: "diary",
                    href: "/diary",
                    kicker: "WRITING",
                    title: t("index.cards.diary.title"),
                    description: t("index.cards.diary.description"),
                    ghost: zh ? "文" : "W",
                  },
                  {
                    area: "likes",
                    href: "/likes",
                    kicker: "LIKES",
                    title: t("index.cards.likes.title"),
                    description: t("index.cards.likes.description"),
                    ghost: zh ? "藏" : "L",
                  },
                  {
                    area: "academic",
                    href: "/academic",
                    kicker: "ACADEMIC",
                    title: t("index.cards.academic.title"),
                    description: t("index.cards.academic.description"),
                    ghost: zh ? "學" : "R",
                  },
                  {
                    area: "timeline",
                    href: "/timeline",
                    kicker: "JOURNEY",
                    title: t("index.cards.timeline.title"),
                    description: t("index.cards.timeline.description"),
                    ghost: zh ? "時" : "T",
                  },
                  {
                    area: "friends",
                    href: "/friends",
                    kicker: "LINKS",
                    title: t("index.cards.friends.title"),
                    description: t("index.cards.friends.description"),
                    ghost: zh ? "友" : "F",
                  },
                  {
                    area: "projects",
                    href: "/projects",
                    kicker: "PROJECTS",
                    title: t("index.cards.projects.title"),
                    description: t("index.cards.projects.description"),
                    ghost: zh ? "作" : "P",
                  },
                ]}
              />
          </div>
        </div>
      </div>
    </main>
  );
}
