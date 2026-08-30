"use client";

import { useLenis } from "lenis/react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  documentTitle?: string;
  className?: string;
  hideTitle?: boolean;
  onItemClick?: () => void;
  /** When true, wheel events scroll this panel only (not the page). */
  isolateScroll?: boolean;
}

const READ_LINE_OFFSET = 112;

const LEVEL_INDENT: Record<number, string> = {
  1: "pl-0",
  2: "pl-3",
  3: "pl-6",
  4: "pl-9",
  5: "pl-12",
  6: "pl-[3.75rem]",
};

const LEVEL_TEXT: Record<number, string> = {
  1: "text-[13px] font-semibold leading-snug",
  2: "text-xs font-medium leading-snug",
  3: "text-[11px] font-normal leading-snug",
  4: "text-[11px] font-normal leading-snug",
  5: "text-[11px] font-normal leading-snug",
  6: "text-[11px] font-normal leading-snug",
};

const SCROLL_PANEL_CLASS =
  "max-h-[calc(100dvh-11rem)] overflow-y-auto overscroll-contain scrollbar-thin";

function TocDot({
  level,
  state,
}: {
  level: number;
  state: "upcoming" | "visited" | "active";
}) {
  const size =
    level === 1 ? "h-2 w-2" : level === 2 ? "h-1.5 w-1.5" : "h-1 w-1";

  return (
    <span
      className={cn(
        "relative z-10 shrink-0 rounded-full transition-colors duration-200",
        size,
        state === "active" && "bg-primary ring-primary/30 ring-2",
        state === "visited" && "bg-primary/45",
        state === "upcoming" && "bg-muted-foreground/25",
      )}
    />
  );
}

function headingsFromArticle(): TOCItem[] {
  const article = document.querySelector("#blog article");
  if (!article) return [];

  return Array.from(article.querySelectorAll("h1, h2, h3, h4, h5, h6"))
    .map((heading) => {
      const el = heading as HTMLHeadingElement;
      if (!el.id) {
        el.id = el.textContent?.trim().toLowerCase().replace(/\s+/g, "-") ?? "";
      }
      return {
        id: el.id,
        text: el.textContent?.trim() || "",
        level: Number.parseInt(el.tagName.charAt(1), 10),
      };
    })
    .filter((item) => item.id && item.text.length > 0);
}

function headingsFromHtml(html: string): TOCItem[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return Array.from(doc.querySelectorAll("h1, h2, h3, h4, h5, h6"))
    .filter((heading) => heading.id)
    .map((heading) => ({
      id: heading.id,
      text: heading.textContent?.trim() || "",
      level: Number.parseInt(heading.tagName.charAt(1), 10),
    }))
    .filter((item) => item.text.length > 0);
}

function resolveActiveId(items: TOCItem[]): string {
  if (typeof window === "undefined") return "__doc_top__";

  let active = "__doc_top__";

  for (const item of items) {
    if (item.id === "__doc_top__") continue;
    const el = document.getElementById(item.id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= READ_LINE_OFFSET + 4) {
      active = item.id;
    }
  }

  return active;
}

export function TableOfContents({
  content,
  documentTitle,
  className,
  hideTitle = false,
  onItemClick,
  isolateScroll = false,
}: TableOfContentsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("__doc_top__");
  const t = useTranslations();
  const lenis = useLenis();

  const items = useMemo(() => {
    const next = [...toc];
    if (documentTitle) {
      next.unshift({ id: "__doc_top__", text: documentTitle, level: 1 });
    }
    return next;
  }, [documentTitle, toc]);

  const activeIndex = items.findIndex((item) => item.id === activeId);

  useEffect(() => {
    let observer: MutationObserver | null = null;
    let raf = 0;

    const apply = () => {
      const live = headingsFromArticle();
      setToc(live.length > 0 ? live : headingsFromHtml(content));

      const article = document.querySelector("#blog article");
      if (article && !observer && typeof MutationObserver !== "undefined") {
        observer = new MutationObserver(apply);
        observer.observe(article, { childList: true, subtree: true });
      }
    };

    apply();
    if (!document.querySelector("#blog article")) {
      raf = window.requestAnimationFrame(apply);
    }

    return () => {
      window.cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [content]);

  useEffect(() => {
    if (items.length === 0) return;

    const updateActive = () => {
      setActiveId((current) => {
        const next = resolveActiveId(items);
        return current === next ? current : next;
      });
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive, { passive: true });

    const article = document.querySelector("#blog article");
    const resizeObserver =
      typeof ResizeObserver !== "undefined" && article
        ? new ResizeObserver(updateActive)
        : null;
    resizeObserver?.observe(article);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
      resizeObserver?.disconnect();
    };
  }, [items, content]);

  useLenis(
    () => {
      if (items.length === 0) return;
      setActiveId((current) => {
        const next = resolveActiveId(items);
        return current === next ? current : next;
      });
    },
    [items],
  );

  useEffect(() => {
    const panel = scrollRef.current;
    const activeItem = itemRefs.current.get(activeId);
    if (!panel || !activeItem) return;

    const panelRect = panel.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const pad = 8;
    let delta = 0;

    if (itemRect.top < panelRect.top + pad) {
      delta = itemRect.top - panelRect.top - pad;
    } else if (itemRect.bottom > panelRect.bottom - pad) {
      delta = itemRect.bottom - panelRect.bottom + pad;
    }

    if (delta !== 0) {
      panel.scrollTo({ top: panel.scrollTop + delta, behavior: "smooth" });
    }
  }, [activeId]);

  const scrollToHeading = (id: string) => {
    if (id === "__doc_top__") {
      if (lenis) {
        lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      const el = document.getElementById(id);
      if (!el) return;

      if (lenis) {
        lenis.scrollTo(el, { offset: -READ_LINE_OFFSET });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    onItemClick?.();
  };

  const getDotState = (index: number): "upcoming" | "visited" | "active" => {
    if (index === activeIndex) return "active";
    if (activeIndex >= 0 && index < activeIndex) return "visited";
    return "upcoming";
  };

  const tocContent = (
    <>
      {!hideTitle && (
        <p className="text-muted-foreground mb-4 font-mono text-[10px] tracking-[0.18em] uppercase">
          {t("blog.toc.title")}
        </p>
      )}
      {items.length === 0 ? (
        <p className="text-muted-foreground/70 text-sm">{t("blog.toc.empty")}</p>
      ) : (
        <nav aria-label={t("blog.toc.title")} className="relative">
          <span
            aria-hidden
            className="bg-border/50 absolute top-2 bottom-2 left-[3px] w-px"
          />
          <ul className="space-y-1">
            {items.map((item, index) => {
              const isActive = activeId === item.id;
              const dotState = getDotState(index);

              return (
                <li
                  key={item.id}
                  ref={(node) => {
                    if (node) itemRefs.current.set(item.id, node);
                    else itemRefs.current.delete(item.id);
                  }}
                >
                  <a
                    href={item.id === "__doc_top__" ? "#blog" : `#${item.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToHeading(item.id);
                    }}
                    className={cn(
                      "group flex items-start gap-2.5 rounded-md py-1 pr-1 transition-colors duration-200",
                      LEVEL_INDENT[item.level] ?? "pl-3",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span className="mt-1.5 flex w-2 justify-center">
                      <TocDot level={item.level} state={dotState} />
                    </span>
                    <span
                      className={cn(
                        "min-w-0 flex-1 truncate",
                        LEVEL_TEXT[item.level] ?? "text-xs",
                        isActive &&
                          "border-primary/20 bg-primary/10 rounded-md border px-2 py-1",
                      )}
                    >
                      {item.text}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </>
  );

  const panel = (
    <div
      ref={scrollRef}
      data-lenis-prevent={isolateScroll ? "" : undefined}
      data-lenis-prevent-wheel={isolateScroll ? "" : undefined}
      className={cn(isolateScroll && SCROLL_PANEL_CLASS, className)}
    >
      {tocContent}
    </div>
  );

  if (hideTitle) {
    return panel;
  }

  return (
    <div className="w-full max-w-60 xl:max-w-64">{panel}</div>
  );
}
