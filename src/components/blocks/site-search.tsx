"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "@/i18n/routing";
import { filterSearchItems, SEARCH_KINDS, type SearchItem } from "@/lib/search";
import { cn } from "@/lib/utils";

export function SiteSearch({ items }: { items: SearchItem[] }) {
  const t = useTranslations("search");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [modKey, setModKey] = useState("Ctrl");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(
    () => filterSearchItems(items, query),
    [items, query],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKey);
    if (navigator.platform.toUpperCase().includes("MAC")) {
      setModKey("⌘");
    }
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActive(0);
      return;
    }
    const id = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const go = (item: SearchItem) => {
    setOpen(false);
    router.push(item.href);
  };

  const grouped = SEARCH_KINDS.map((kind) => ({
    kind,
    items: results.filter((item) => item.kind === kind),
  })).filter((group) => group.items.length > 0);

  return (
    <>
      <div
        data-no-drag
        className="pointer-events-none fixed top-3 right-3 z-50 md:top-[11px] md:right-4"
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="border-border bg-background/80 pointer-events-auto inline-flex h-11 items-center gap-2.5 rounded-2xl border px-4 text-sm font-medium shadow-sm backdrop-blur-md transition-colors hover:bg-accent md:h-[46px]"
          aria-label={t("button")}
        >
          <MagnifyingGlassIcon className="size-4" />
          <span className="hidden sm:inline">{t("button")}</span>
          <kbd className="bg-muted text-muted-foreground hidden rounded-md px-1.5 py-0.5 font-mono text-[11px] sm:inline">
            {modKey} K
          </kbd>
        </button>
      </div>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        data-no-drag
        data-lenis-prevent
        className="top-[14%] z-[60] translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-lg"
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setActive((value) =>
              results.length ? (value + 1) % results.length : 0,
            );
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActive((value) =>
              results.length
                ? (value - 1 + results.length) % results.length
                : 0,
            );
          } else if (event.key === "Enter") {
            event.preventDefault();
            const item = results[active];
            if (item) go(item);
          }
        }}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{t("button")}</DialogTitle>
          <DialogDescription>{t("hint")}</DialogDescription>
        </DialogHeader>
        <div className="border-border flex items-center gap-2 border-b px-4">
          <MagnifyingGlassIcon className="text-muted-foreground size-4 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("placeholder")}
            className="placeholder:text-muted-foreground h-12 w-full bg-transparent text-sm outline-none"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </div>
        <div className="max-h-[min(24rem,60vh)] overflow-y-auto py-2">
          {results.length === 0 ? (
            <p className="text-muted-foreground px-4 py-8 text-center text-sm">
              {t("empty")}
            </p>
          ) : (
            grouped.map((group) => (
              <section key={group.kind} className="px-2 py-1">
                <p className="text-muted-foreground px-2 py-1.5 font-mono text-[10px] tracking-wider uppercase">
                  {t(`groups.${group.kind}`)}
                </p>
                <ul>
                  {group.items.map((item) => {
                    const index = results.indexOf(item);
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onMouseEnter={() => setActive(index)}
                          onClick={() => go(item)}
                          className={cn(
                            "flex w-full flex-col rounded-lg px-3 py-2 text-left transition-colors",
                            index === active
                              ? "bg-accent text-accent-foreground"
                              : "hover:bg-accent/50",
                          )}
                        >
                          <span className="text-sm font-medium">{item.title}</span>
                          {item.description ? (
                            <span className="text-muted-foreground line-clamp-1 text-xs">
                              {item.description}
                            </span>
                          ) : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}
