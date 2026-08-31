"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type PointerEvent,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";

import { cn } from "@/lib/utils";

type Ripple = { id: number; x: number; y: number };

type PressSurfaceProps = ComponentPropsWithoutRef<"div"> & {
  asChild?: boolean;
  children?: ReactNode;
};

type PressableChild = ReactElement<{
  className?: string;
  onPointerDown?: (event: PointerEvent<HTMLElement>) => void;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  ref?: Ref<HTMLElement>;
  children?: ReactNode;
}>;

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (value: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref && typeof ref === "object") {
        (ref as { current: T | null }).current = value;
      }
    }
  };
}

export function PressSurface({
  asChild = false,
  className,
  children,
  onPointerDown,
  onClick,
  ...props
}: PressSurfaceProps) {
  const ref = useRef<HTMLElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const spawnRipple = useCallback((clientX: number, clientY: number) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const id = performance.now();

    setRipples((current) => [...current, { id, x, y }]);
    window.setTimeout(() => {
      setRipples((current) => current.filter((ripple) => ripple.id !== id));
    }, 620);
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.button !== 0) return;
    spawnRipple(event.clientX, event.clientY);
    onPointerDown?.(event as PointerEvent<HTMLDivElement>);
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (event.detail === 0) {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        spawnRipple(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    }
    onClick?.(event as MouseEvent<HTMLDivElement>);
  };

  const rippleNodes = ripples.map((ripple) => (
    <span
      key={ripple.id}
      aria-hidden="true"
      className="press-ripple pointer-events-none absolute rounded-full"
      style={{ left: ripple.x, top: ripple.y }}
    />
  ));

  const pressClassName = cn("press-surface touch-manipulation", className);

  if (asChild) {
    const child = Children.only(children);
    if (!isValidElement(child)) {
      throw new Error("PressSurface expects a single React element child.");
    }

    const childElement = child as PressableChild;

    return cloneElement(childElement, {
      ...props,
      className: cn(pressClassName, childElement.props.className),
      onPointerDown: (event: PointerEvent<HTMLElement>) => {
        handlePointerDown(event);
        childElement.props.onPointerDown?.(event);
      },
      onClick: (event: MouseEvent<HTMLElement>) => {
        handleClick(event);
        childElement.props.onClick?.(event);
      },
      ref: mergeRefs(ref, childElement.props.ref),
      children: (
        <>
          {childElement.props.children}
          {rippleNodes}
        </>
      ),
    });
  }

  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      {...props}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      className={pressClassName}
    >
      {children}
      {rippleNodes}
    </div>
  );
}
