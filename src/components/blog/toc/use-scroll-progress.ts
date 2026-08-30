"use client";

import { useLenis } from "lenis/react";
import { useCallback, useEffect, useState } from "react";

const ARTICLE_SELECTOR = "#blog article";
const READ_LINE_OFFSET = 112;

function computePageProgress(scrollY: number): number {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0) return 0;
  return Math.min(100, Math.max(0, (scrollY / max) * 100));
}

function computeArticleProgress(): number {
  const article = document.querySelector<HTMLElement>(ARTICLE_SELECTOR);
  if (!article) {
    return computePageProgress(window.scrollY);
  }

  const rect = article.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const readableHeight = viewportHeight - READ_LINE_OFFSET;
  const totalScrollable = rect.height - readableHeight;

  if (totalScrollable <= 0) {
    return rect.top <= READ_LINE_OFFSET ? 100 : 0;
  }

  const scrolled = READ_LINE_OFFSET - rect.top;
  return Math.min(100, Math.max(0, (scrolled / totalScrollable) * 100));
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    setProgress(computeArticleProgress());
  }, []);

  useLenis(update);

  useEffect(() => {
    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    const article = document.querySelector<HTMLElement>(ARTICLE_SELECTOR);
    const resizeObserver =
      typeof ResizeObserver !== "undefined" && article
        ? new ResizeObserver(update)
        : null;

    resizeObserver?.observe(article!);

    const zoomRoot = article?.parentElement;
    if (resizeObserver && zoomRoot && zoomRoot !== article) {
      resizeObserver.observe(zoomRoot);
    }

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      resizeObserver?.disconnect();
    };
  }, [update]);

  return progress;
}
