"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

function shouldDisableSmoothScroll() {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(max-width: 767px)").matches
  );
}

export function SmoothScroll() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const update = () => setEnabled(!shouldDisableSmoothScroll());
    update();

    const coarse = window.matchMedia("(pointer: coarse)");
    const narrow = window.matchMedia("(max-width: 767px)");
    coarse.addEventListener("change", update);
    narrow.addEventListener("change", update);

    return () => {
      coarse.removeEventListener("change", update);
      narrow.removeEventListener("change", update);
    };
  }, []);

  if (!enabled) return null;

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
