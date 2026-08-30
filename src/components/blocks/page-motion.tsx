"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { BLUR_FADE_DELAY } from "@/data/site";

export function PageMotionHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <BlurFade delay={0} className={className}>
      {children}
    </BlurFade>
  );
}

export function PageMotionSection({
  children,
  className,
  delay = BLUR_FADE_DELAY,
  staggerIndex = 0,
  inView = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerIndex?: number;
  inView?: boolean;
}) {
  return (
    <BlurFade
      delay={delay}
      staggerIndex={staggerIndex}
      inView={inView}
      className={className}
    >
      {children}
    </BlurFade>
  );
}

export function StaggerItem({
  children,
  className,
  index = 0,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <BlurFade inView staggerIndex={index} className={className}>
      {children}
    </BlurFade>
  );
}
