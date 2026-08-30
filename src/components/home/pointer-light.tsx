"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label";

export function PointerLight() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const root = document.documentElement;
    root.classList.add("pointer-light-on");

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dot = { x: mouse.x, y: mouse.y };
    const outline = { x: mouse.x, y: mouse.y };
    const glow = { x: mouse.x, y: mouse.y };
    let dragging = false;
    let hovering = false;
    let seen = false;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      if (!seen) {
        seen = true;
        dot.x = mouse.x;
        dot.y = mouse.y;
        outline.x = mouse.x;
        outline.y = mouse.y;
        glow.x = mouse.x;
        glow.y = mouse.y;
      }
      const target = event.target as Element | null;
      hovering = Boolean(target?.closest(INTERACTIVE));
    };
    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      dragging = true;
    };
    const onUp = () => {
      dragging = false;
    };

    const tick = () => {
      const pull = dragging ? 0.045 : 0.09;
      dot.x += (mouse.x - dot.x) * 0.42;
      dot.y += (mouse.y - dot.y) * 0.42;
      outline.x += (mouse.x - outline.x) * 0.16;
      outline.y += (mouse.y - outline.y) * 0.16;
      glow.x += (mouse.x - glow.x) * pull;
      glow.y += (mouse.y - glow.y) * pull;

      const dx = mouse.x - glow.x;
      const dy = mouse.y - glow.y;
      const dist = Math.hypot(dx, dy);
      const stretch = Math.min(dist / 90, dragging ? 0.42 : 0.22);
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      const glowScale = (dragging ? 1.18 : hovering ? 1.08 : 1) + stretch * 0.35;

      if (dotRef.current) {
        dotRef.current.style.opacity = seen ? "1" : "0";
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
        dotRef.current.dataset.active = hovering || dragging ? "true" : "false";
      }
      if (outlineRef.current) {
        outlineRef.current.style.opacity = seen ? "1" : "0";
        outlineRef.current.style.transform = `translate3d(${outline.x}px, ${outline.y}px, 0) translate(-50%, -50%)`;
        outlineRef.current.dataset.active = hovering || dragging ? "true" : "false";
      }
      if (glowRef.current) {
        glowRef.current.style.opacity = seen ? "1" : "0";
        glowRef.current.style.transform = `translate3d(${glow.x}px, ${glow.y}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${glowScale}, ${1 - stretch * 0.28})`;
        glowRef.current.dataset.dragging = dragging ? "true" : "false";
      }

      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    frame = requestAnimationFrame(tick);

    return () => {
      root.classList.remove("pointer-light-on");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="pointer-light" aria-hidden="true">
      <div ref={glowRef} className="pointer-light-glow" />
      <div ref={outlineRef} className="pointer-light-outline" />
      <div ref={dotRef} className="pointer-light-dot" />
    </div>
  );
}
