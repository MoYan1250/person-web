"use client";

import { useTranslations } from "next-intl";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { cn } from "@/lib/utils";

const ZOOM_STEPS = [0.85, 1, 1.15, 1.3, 1.5] as const;
const DEFAULT_INDEX = 1;
const STORAGE_KEY = "diary-article-zoom";

type ArticleZoomContextValue = {
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  canZoomIn: boolean;
  canZoomOut: boolean;
};

const ArticleZoomContext = createContext<ArticleZoomContextValue | null>(null);

function readStoredIndex(): number {
  if (typeof window === "undefined") return DEFAULT_INDEX;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) return DEFAULT_INDEX;
  const value = Number(saved);
  const index = ZOOM_STEPS.findIndex((step) => step === value);
  return index >= 0 ? index : DEFAULT_INDEX;
}

export function ArticleZoomProvider({ children }: { children: React.ReactNode }) {
  const [index, setIndex] = useState(DEFAULT_INDEX);

  useEffect(() => {
    setIndex(readStoredIndex());
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, String(ZOOM_STEPS[index]));
  }, [index]);

  const zoomIn = useCallback(() => {
    setIndex((current) => Math.min(current + 1, ZOOM_STEPS.length - 1));
  }, []);

  const zoomOut = useCallback(() => {
    setIndex((current) => Math.max(current - 1, 0));
  }, []);

  const resetZoom = useCallback(() => {
    setIndex(DEFAULT_INDEX);
  }, []);

  const value = useMemo(
    () => ({
      zoom: ZOOM_STEPS[index],
      zoomIn,
      zoomOut,
      resetZoom,
      canZoomIn: index < ZOOM_STEPS.length - 1,
      canZoomOut: index > 0,
    }),
    [index, zoomIn, zoomOut, resetZoom],
  );

  return (
    <ArticleZoomContext.Provider value={value}>{children}</ArticleZoomContext.Provider>
  );
}

export function useArticleZoom() {
  const context = useContext(ArticleZoomContext);
  if (!context) {
    throw new Error("useArticleZoom must be used within ArticleZoomProvider");
  }
  return context;
}

export function ArticleZoomContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { zoom } = useArticleZoom();

  return (
    <div className={className} style={{ zoom }}>
      {children}
    </div>
  );
}

export function ArticleZoomControls({
  className,
  placement = "top",
}: {
  className?: string;
  placement?: "top" | "bottom";
}) {
  const t = useTranslations();
  const { zoom, zoomIn, zoomOut, resetZoom, canZoomIn, canZoomOut } =
    useArticleZoom();

  return (
    <div
      className={cn(
        "border-border/60 flex items-center justify-between gap-2",
        placement === "top"
          ? "mb-4 border-b pb-3"
          : "mt-4 border-t pt-3",
        className,
      )}
      aria-label={t("blog.toc.zoomLabel")}
    >
      <span className="text-muted-foreground font-mono text-[10px] tracking-[0.14em] uppercase">
        {t("blog.toc.zoomLabel")}
      </span>
      <div className="flex items-center gap-1">
        <ZoomButton
          label={t("blog.toc.zoomOut")}
          onClick={zoomOut}
          disabled={!canZoomOut}
        >
          −
        </ZoomButton>
        <button
          type="button"
          onClick={resetZoom}
          className="text-muted-foreground hover:text-foreground min-w-12 rounded-md px-1.5 py-1 font-mono text-[11px] tabular-nums transition-colors"
          aria-label={t("blog.toc.zoomReset")}
        >
          {Math.round(zoom * 100)}%
        </button>
        <ZoomButton
          label={t("blog.toc.zoomIn")}
          onClick={zoomIn}
          disabled={!canZoomIn}
        >
          +
        </ZoomButton>
      </div>
    </div>
  );
}

function ZoomButton({
  children,
  label,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "border-border bg-muted/40 text-foreground hover:border-primary/30 hover:bg-primary/10 inline-flex size-7 items-center justify-center rounded-md border text-sm leading-none transition-colors",
        disabled && "cursor-not-allowed opacity-40",
      )}
    >
      {children}
    </button>
  );
}
