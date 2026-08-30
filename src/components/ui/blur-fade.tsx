"use client";

import {
  AnimatePresence,
  motion,
  MotionProps,
  useInView,
  useReducedMotion,
  UseInViewOptions,
  Variants,
} from "motion/react";
import { useRef, useState } from "react";

type MarginType = UseInViewOptions["margin"];

const STAGGER_STEP = 0.04;
const MAX_STAGGER_DELAY = 0.4;
const TOUCH_BLUR = "3px";
const DESKTOP_BLUR = "6px";

interface BlurFadeProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  staggerIndex?: number;
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
  inView?: boolean;
  inViewMargin?: MarginType;
  blur?: string;
}

export function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  staggerIndex = 0,
  offset = 6,
  direction = "down",
  inView = false,
  inViewMargin = "-50px",
  blur,
  ...props
}: BlurFadeProps) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const [activeBlur] = useState(() => {
    if (typeof window === "undefined") return DESKTOP_BLUR;
    return window.matchMedia("(pointer: coarse)").matches ? TOUCH_BLUR : DESKTOP_BLUR;
  });
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;

  const resolvedDelay =
    delay + Math.min(staggerIndex * STAGGER_STEP, MAX_STAGGER_DELAY);
  const resolvedBlur = blur ?? activeBlur;

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const fromOffset =
    direction === "right" || direction === "down" ? -offset : offset;

  const motionVariants: Variants = variant ?? {
    hidden: {
      [axis]: fromOffset,
      opacity: 0,
      filter: `blur(${resolvedBlur})`,
    },
    visible: {
      [axis]: 0,
      opacity: 1,
      filter: "none",
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={motionVariants}
        transition={{
          delay: 0.04 + resolvedDelay,
          duration,
          ease: "easeOut",
        }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
