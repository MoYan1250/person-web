"use client";

import { Link } from "@/i18n/routing";

export function SiteMark() {
  return (
    <div
      data-no-drag
      className="pointer-events-none fixed top-4 left-6 z-50 sm:left-8 md:top-5 md:left-10 lg:left-12"
    >
      <Link
        href="/"
        className="font-display pointer-events-auto text-xl tracking-[0.18em] text-foreground transition-opacity hover:opacity-70 sm:text-2xl"
        aria-label="MOYAN"
      >
        MOYAN
      </Link>
    </div>
  );
}
