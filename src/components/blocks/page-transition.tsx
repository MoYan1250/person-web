"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { useEffect } from "react";

import { usePathname } from "@/i18n/routing";

const transitionEase = [0.22, 1, 0.36, 1] as const;

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenis = useLenis();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const scrollKey = `scroll-${pathname}`;
    if (sessionStorage.getItem(scrollKey) !== null) return;

    requestAnimationFrame(() => {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    });
  }, [pathname, lenis]);

  if (reducedMotion) {
    return children;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.28, ease: transitionEase }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
