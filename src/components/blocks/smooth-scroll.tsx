"use client";

import { ReactLenis } from "lenis/react";

export function SmoothScroll() {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.1,
        wheelMultiplier: 0.8,
      }}
    />
  );
}
