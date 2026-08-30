import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import {
  PageMotionHeader,
  PageMotionSection,
  StaggerItem,
} from "@/components/blocks/page-motion";
import { PageLogbookHeader } from "@/components/blocks/page-logbook-header";
import { GameCard } from "@/components/likes/game-card";
import { LIKED_GAME_COVERS } from "@/data/liked-game-covers";
import { routing } from "@/i18n/routing";
import { type LikedGame, type LikedMusic } from "@/lib/content";
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
    title: t("sections.likes"),
    description: t("likesPage.description"),
    path: "/likes",
    locale,
  });
}

export default async function LikesPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const locale = params.locale || routing.defaultLocale;
  const t = await getTranslations({ locale });
  const likes = t.raw("likes") as {
    games?: LikedGame[];
    music?: LikedMusic[];
  };
  const games = (likes?.games ?? []).map((game, index) => ({
    ...game,
    cover: LIKED_GAME_COVERS[index],
  }));
  const music = likes?.music ?? [];

  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col px-6 pt-20 mobile-page-pad sm:px-8 md:px-10 md:pt-32">
      <PageMotionHeader>
        <PageLogbookHeader
          kicker={t("likesPage.kicker")}
          grid={t("likesPage.grid")}
          title={t("sections.likes")}
          description={t("likesPage.description")}
          statLabel={t("likesPage.stat")}
          statValue={games.length + music.length}
        />
      </PageMotionHeader>

      <PageMotionSection>
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">
            {t("likesPage.games")}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {games.map((game, index) => (
              <StaggerItem key={game.title} index={index}>
                <GameCard game={game} />
              </StaggerItem>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold tracking-tight">
            {t("likesPage.music")}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {music.map((track, index) => {
            const inner = (
              <>
                <p className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                  {track.genre}
                </p>
                <h3 className="mt-1 text-lg font-semibold tracking-tight">
                  {track.title}
                </h3>
                {track.artist ? (
                  <p className="text-muted-foreground mt-1 text-sm">
                    {track.artist}
                  </p>
                ) : null}
                {track.note ? (
                  <p className="mt-3 text-sm leading-6">{track.note}</p>
                ) : null}
              </>
            );

            return track.url ? (
              <StaggerItem
                key={`${track.title}-${track.artist}`}
                index={games.length + index}
              >
                <a
                  href={track.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border glass-panel hover:bg-accent/40 block rounded-xl border p-5 transition-colors"
                >
                  {inner}
                </a>
              </StaggerItem>
            ) : (
              <StaggerItem
                key={`${track.title}-${track.artist}`}
                index={games.length + index}
              >
                <article className="border-border glass-panel rounded-xl border p-5">
                  {inner}
                </article>
              </StaggerItem>
            );
          })}
          </div>
        </section>
      </PageMotionSection>
    </main>
  );
}
