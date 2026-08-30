"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";

const SKIP = "input, textarea, select, [data-no-drag], [data-lenis-prevent], [role='dialog']";
const DRAG_THRESHOLD = 4;
const DRAG_LERP = 0.38;
const FLING_LERP = 0.085;
const FLING_GAIN = 0.22;
const FLING_MAX = 2200;
const FLING_MIN_SPEED = 140;

export function HomeDragScroll() {
  const lenis = useLenis();

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    root.classList.add("home-drag-on");

    if (!fine) {
      return () => root.classList.remove("home-drag-on");
    }

    let pointerId: number | null = null;
    let dragging = false;
    let moved = false;
    let startY = 0;
    let startScroll = 0;
    let target = 0;
    let current = 0;
    let frame = 0;
    let lastFrame = 0;
    const samples: Array<{ t: number; y: number }> = [];

    const limit = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const clamp = (value: number) => Math.min(limit(), Math.max(0, value));

    const readScroll = () => (lenis ? lenis.scroll : window.scrollY);

    const writeScroll = (value: number, immediate: boolean, lerp?: number) => {
      const next = clamp(value);
      if (lenis) {
        lenis.scrollTo(next, {
          immediate,
          programmatic: true,
          force: true,
          ...(immediate || lerp === undefined ? {} : { lerp }),
        });
      } else {
        window.scrollTo(0, next);
      }
    };

    const stopFrame = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const tick = (now: number) => {
      const dt = Math.min((now - lastFrame) / 1000, 0.048);
      lastFrame = now;

      if (!dragging) {
        frame = 0;
        return;
      }

      const alpha = reduce ? 1 : 1 - Math.exp(-60 * DRAG_LERP * Math.max(dt, 0.008));
      current += (target - current) * alpha;
      if (Math.abs(target - current) < 0.15) current = target;
      writeScroll(current, true);
      frame = requestAnimationFrame(tick);
    };

    const startTick = (now: number) => {
      if (frame) return;
      lastFrame = now;
      frame = requestAnimationFrame(tick);
    };

    const endDrag = () => {
      if (!dragging && pointerId === null) return;

      const wasMoved = moved;
      dragging = false;
      pointerId = null;
      root.classList.remove("home-dragging");
      stopFrame();

      if (!wasMoved || reduce) return;

      const now = performance.now();
      while (samples.length > 1 && now - samples[0].t > 90) samples.shift();

      let speed = 0;
      if (samples.length >= 2) {
        const first = samples[0];
        const last = samples[samples.length - 1];
        const dt = last.t - first.t;
        if (dt > 8) speed = ((first.y - last.y) / dt) * 1000;
      }

      writeScroll(current, true);
      if (Math.abs(speed) < FLING_MIN_SPEED) return;

      const throwPx = Math.max(-FLING_MAX, Math.min(FLING_MAX, speed * FLING_GAIN));
      writeScroll(current + throwPx, false, FLING_LERP);
    };

    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      const targetEl = event.target as Element | null;
      if (targetEl?.closest(SKIP)) return;

      pointerId = event.pointerId;
      dragging = true;
      moved = false;
      startY = event.clientY;
      startScroll = readScroll();
      target = startScroll;
      current = startScroll;
      samples.length = 0;
      samples.push({ t: performance.now(), y: startY });
      writeScroll(startScroll, true);
    };

    const onMove = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== pointerId) return;

      const now = performance.now();
      const y = event.clientY;
      if (!moved && Math.abs(y - startY) < DRAG_THRESHOLD) return;

      if (!moved) {
        moved = true;
        root.classList.add("home-dragging");
        try {
          document.body.setPointerCapture(event.pointerId);
        } catch {
          /* capture is optional */
        }
        startTick(now);
      }

      target = startScroll - (y - startY);
      samples.push({ t: now, y });
      if (samples.length > 24) samples.splice(0, samples.length - 16);
      event.preventDefault();
    };

    const onUp = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      if (moved) {
        const suppress = (click: MouseEvent) => {
          click.preventDefault();
          click.stopPropagation();
          window.removeEventListener("click", suppress, true);
        };
        window.addEventListener("click", suppress, true);
      }
      endDrag();
    };

    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    return () => {
      root.classList.remove("home-drag-on", "home-dragging");
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      stopFrame();
    };
  }, [lenis]);

  return null;
}
