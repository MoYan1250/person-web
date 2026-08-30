import Image from "next/image";

import type { LikedGame } from "@/lib/content";
import { cn } from "@/lib/utils";

export function GameCard({ game }: { game: LikedGame }) {
  return (
    <article
      className={cn(
        "group border-border relative min-h-[11.5rem] overflow-hidden rounded-xl border",
        "sm:min-h-[12.5rem]",
      )}
    >
      {game.cover ? (
        <Image
          src={game.cover}
          alt={game.title}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className={cn(
            "object-cover object-center transition-transform duration-500",
            "[@media(hover:hover)]:scale-[1.02] [@media(hover:hover)]:group-hover:scale-100",
            "motion-reduce:scale-100 motion-reduce:transition-none",
          )}
        />
      ) : null}
      <div
        className={cn(
          "absolute inset-0 transition-[background-color,backdrop-filter] duration-500",
          "bg-black/20 backdrop-blur-[1px]",
          "[@media(hover:hover)]:group-hover:bg-black/10 [@media(hover:hover)]:group-hover:backdrop-blur-0",
          "motion-reduce:bg-black/20 motion-reduce:backdrop-blur-[1px]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
      <div className="relative z-10 flex h-full min-h-[11.5rem] flex-col justify-end p-5 text-white sm:min-h-[12.5rem]">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {game.title}
          </h3>
          {game.hours ? (
            <span className="shrink-0 font-mono text-xs text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              {game.hours}
            </span>
          ) : null}
        </div>
        {game.status ? (
          <p className="mt-1 text-xs text-white/85 drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)]">
            {game.status}
          </p>
        ) : null}
        {game.note ? (
          <p className="mt-3 text-sm leading-6 text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)]">
            {game.note}
          </p>
        ) : null}
      </div>
    </article>
  );
}
