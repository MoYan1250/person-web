import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PageLogbookHeader } from "@/components/blocks/page-logbook-header";
import { FriendsGrid } from "@/components/portfolio/friends-grid";
import { routing } from "@/i18n/routing";
import { getCollectionItems, type FriendItem } from "@/lib/content";
import { constructMetadata } from "@/lib/metadata";

type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return constructMetadata({
    title: t("sections.friends"),
    description: t("friendsPage.description"),
    path: "/friends",
    locale,
  });
}

export default async function FriendsPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const locale = params.locale || routing.defaultLocale;
  const t = await getTranslations({ locale });
  const friends = getCollectionItems<FriendItem>(t, "friends.items");

  return (
    <main className="mx-auto flex min-h-dvh max-w-6xl flex-col px-6 pt-20 pb-24 sm:px-8 md:px-10 md:pt-32">
      <PageLogbookHeader
        kicker={t("friendsPage.kicker")}
        grid={t("friendsPage.grid")}
        title={t("sections.friends")}
        description={t("friendsPage.description")}
        statLabel={t("friendsPage.stat")}
        statValue={friends.length}
      />
      <FriendsGrid
        friends={friends}
        visitLabel={t("friendsPage.visit")}
        searchPlaceholder={t("friendsPage.search")}
        emptyLabel={t("friendsPage.empty")}
      />
    </main>
  );
}
