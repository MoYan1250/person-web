"use client";

import type { ComponentProps } from "react";

import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

import { PressSurface } from "./press-surface";

type PressLinkProps = ComponentProps<typeof Link>;

export function PressLink({ className, ...props }: PressLinkProps) {
  return (
    <PressSurface asChild>
      <Link className={cn(className)} {...props} />
    </PressSurface>
  );
}

type PressAnchorProps = ComponentProps<"a">;

export function PressAnchor({ className, ...props }: PressAnchorProps) {
  return (
    <PressSurface asChild>
      <a className={cn(className)} {...props} />
    </PressSurface>
  );
}
