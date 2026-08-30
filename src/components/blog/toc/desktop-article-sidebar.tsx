"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

import { ArticleZoomControls } from "./article-zoom";
import { TableOfContents } from "./table-of-contents";

const STORAGE_KEY = "diary-sidebar-collapsed";

const SIDEBAR_TRANSITION =
  "duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-0 motion-reduce:transition-none";

function readCollapsed(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "true";
}

type ArticleSidebarContextValue = {
  collapsed: boolean;
  setCollapsed: (value: boolean | ((prev: boolean) => boolean)) => void;
};

const ArticleSidebarContext = createContext<ArticleSidebarContextValue | null>(
  null,
);

export function ArticleSidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCollapsed(readCollapsed());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem(STORAGE_KEY, String(collapsed));
  }, [collapsed, mounted]);

  const value = useMemo(
    () => ({ collapsed, setCollapsed }),
    [collapsed],
  );

  return (
    <ArticleSidebarContext.Provider value={value}>
      {children}
    </ArticleSidebarContext.Provider>
  );
}

function useArticleSidebar() {
  const context = useContext(ArticleSidebarContext);
  if (!context) {
    throw new Error("useArticleSidebar must be used within ArticleSidebarProvider");
  }
  return context;
}

export function ArticleColumn({ children }: { children: React.ReactNode }) {
  const { collapsed } = useArticleSidebar();

  return (
    <div
      className={cn(
        "min-w-0 w-full px-2 transition-[max-width,margin,padding] sm:px-4 md:px-6",
        SIDEBAR_TRANSITION,
        collapsed
          ? "mx-auto max-w-3xl lg:max-w-5xl xl:max-w-6xl lg:px-10"
          : "mx-auto max-w-3xl lg:mx-0 lg:ml-[14.5rem] lg:mr-8",
      )}
    >
      {children}
    </div>
  );
}

interface DesktopArticleSidebarProps {
  content: string;
  documentTitle: string;
}

export function DesktopArticleSidebar({
  content,
  documentTitle,
}: DesktopArticleSidebarProps) {
  const t = useTranslations();
  const { collapsed, setCollapsed } = useArticleSidebar();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const sidebar = (
    <div
      className={cn(
        "fixed top-28 left-0 z-20 hidden overflow-hidden will-change-[width] lg:block",
        "transition-[width] motion-reduce:will-change-auto",
        SIDEBAR_TRANSITION,
        collapsed ? "w-10" : "w-[13rem] xl:w-56",
      )}
      data-lenis-prevent
      data-lenis-prevent-wheel
    >
      <div
        className={cn(
          "border-border/40 bg-background/85 rounded-r-xl border border-l-0 shadow-sm backdrop-blur-sm",
          "transition-[padding] motion-reduce:transition-none",
          SIDEBAR_TRANSITION,
          collapsed ? "px-1.5 py-4" : "py-3 pr-2 pl-3",
        )}
      >
        <div
          className={cn(
            "flex gap-2",
            collapsed
              ? "flex-col items-center"
              : "mb-3 items-center justify-between pr-1",
          )}
        >
          <span
            className={cn(
              "text-muted-foreground font-mono text-[10px] tracking-[0.18em] uppercase",
              "overflow-hidden whitespace-nowrap transition-[opacity,transform,max-width] motion-reduce:transition-none",
              SIDEBAR_TRANSITION,
              collapsed
                ? "max-w-none [writing-mode:vertical-rl] rotate-180 opacity-100"
                : "max-w-full min-w-0 flex-1 translate-x-0 opacity-100",
            )}
          >
            {t("blog.toc.title")}
          </span>

          <button
            type="button"
            onClick={() => setCollapsed((value) => !value)}
            aria-label={
              collapsed ? t("blog.toc.expand") : t("blog.toc.collapse")
            }
            aria-expanded={!collapsed}
            className={cn(
              "text-muted-foreground hover:text-foreground shrink-0 rounded-md p-1 transition-colors",
              !collapsed && "hover:bg-muted/50",
            )}
          >
            {collapsed ? (
              <ChevronRight className="size-4" />
            ) : (
              <ChevronLeft className="size-4" />
            )}
          </button>
        </div>

        <div
          className={cn(
            "grid transition-[grid-template-rows,opacity,margin-top] motion-reduce:transition-none",
            SIDEBAR_TRANSITION,
            collapsed
              ? "pointer-events-none mt-0 grid-rows-[0fr] opacity-0"
              : "mt-0 grid-rows-[1fr] opacity-100",
          )}
          aria-hidden={collapsed}
        >
          <div className="min-h-0 overflow-hidden">
            <ArticleZoomControls placement="top" className="mb-0" />
            <TableOfContents
              content={content}
              documentTitle={documentTitle}
              hideTitle
              isolateScroll
            />
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(sidebar, document.body);
}
