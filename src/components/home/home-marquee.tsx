"use client";

import { useEffect, useState } from "react";

import { Link } from "@/i18n/routing";
import type { SignalItem, SignalKind } from "@/lib/feed";
import { cn } from "@/lib/utils";

export function HomeMarquee({
  items,
  kindLabels,
  onlineLabel,
  offlineLabel,
}: {
  items: SignalItem[];
  kindLabels: Record<SignalKind, string>;
  onlineLabel: string;
  offlineLabel: string;
}) {
  if (items.length === 0) return null;

  const track = [...items, ...items];

  return (
    <div className="home-marquee-wrap border-border bg-secondary/40 flex items-center overflow-hidden border-y">
      <div className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_4%,black_96%,transparent)]">
        <div className="home-marquee flex w-max items-center py-2">
          {track.map((item, index) => (
            <span key={`${item.kind}-${item.title}-${index}`} className="flex items-center">
              <SignalLink
                href={item.href}
                className="text-muted-foreground hover:text-foreground px-1 font-mono text-[11px] tracking-wider uppercase transition-colors"
              >
                <span className="text-primary/80">{kindLabels[item.kind]}</span>
                <span className="mx-2 text-primary/35">//</span>
                <span>{item.title}</span>
              </SignalLink>
              <span className="text-primary/35 px-4 font-mono text-[11px]">//</span>
            </span>
          ))}
        </div>
      </div>
      <SiteStatus onlineLabel={onlineLabel} offlineLabel={offlineLabel} />
    </div>
  );
}

function SignalLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function SiteStatus({
  onlineLabel,
  offlineLabel,
}: {
  onlineLabel: string;
  offlineLabel: string;
}) {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-2 border-l px-3 py-2 sm:gap-2.5 sm:px-4",
        online ? "border-primary/20" : "border-border",
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          online ? "status-pulse-online bg-primary" : "bg-muted-foreground/50",
        )}
      />
      <span
        className={cn(
          "font-mono text-[10px] font-bold tracking-[0.16em] uppercase",
          online ? "text-primary" : "text-muted-foreground",
        )}
      >
        {online ? onlineLabel : offlineLabel}
      </span>
    </div>
  );
}
