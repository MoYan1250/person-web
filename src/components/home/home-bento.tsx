"use client";

import Image from "next/image";

import { BlurFade } from "@/components/ui/blur-fade";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export type HomeBentoCard = {
  area:
    | "about"
    | "diary"
    | "timeline"
    | "friends"
    | "projects"
    | "likes"
    | "academic";
  href: string;
  kicker: string;
  title: string;
  description?: string;
  ghost: string;
  image?: string;
};

export function HomeBento({ cards }: { cards: HomeBentoCard[] }) {
  return (
    <div className="flex flex-col gap-4">
      {cards.map((card, index) => (
        <BlurFade key={card.area} staggerIndex={index}>
          <HomeBentoRow card={card} />
        </BlurFade>
      ))}
    </div>
  );
}

function HomeBentoRow({ card }: { card: HomeBentoCard }) {
  const featured = Boolean(card.image);

  return (
    <Link
      href={card.href}
      className={cn(
        "border-border bg-card hover:bg-accent/40 group relative flex w-full overflow-hidden rounded-xl border transition-colors",
        featured ? "min-h-[9.5rem]" : "min-h-[7.25rem]",
      )}
    >
      {card.image ? (
        <Image
          src={card.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 780px, 100vw"
          className="object-cover opacity-20 transition-transform duration-700 group-hover:scale-105"
        />
      ) : null}
      <div className="relative z-10 flex w-full items-center justify-between gap-4 px-5 py-5 sm:px-6">
        <div className="min-w-0">
          <p className="text-muted-foreground font-mono text-[11px] tracking-[0.2em]">
            {card.kicker}
          </p>
          <h2
            className={cn(
              "mt-1.5 font-semibold tracking-tight",
              featured
                ? "text-2xl sm:text-3xl"
                : "text-xl sm:text-2xl",
            )}
          >
            {card.title}
          </h2>
          {card.description ? (
            <p className="text-muted-foreground mt-1.5 text-sm">
              {card.description}
            </p>
          ) : null}
        </div>
        <span className="border-border bg-background/50 text-muted-foreground group-hover:text-primary group-hover:border-primary/40 flex size-11 shrink-0 items-center justify-center rounded-full border text-lg transition-all duration-500 group-hover:rotate-0 rotate-45">
          ↗
        </span>
      </div>
      <span
        aria-hidden="true"
        className="text-foreground/5 group-hover:text-primary/15 pointer-events-none absolute -right-1 -bottom-5 text-[6.5rem] leading-none font-bold select-none transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-4deg] sm:text-[7.5rem]"
      >
        {card.ghost}
      </span>
    </Link>
  );
}
