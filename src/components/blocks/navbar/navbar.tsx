"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { LanguageToggle } from "@/components/blocks/navbar/language-toggle";
import { ModeToggle } from "@/components/blocks/navbar/mode-toggle";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { Dock, DockIcon } from "@/components/ui/dock";
import { PressSurface } from "@/components/ui/press-surface";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const NAV_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  home: Icons.home,
  user: Icons.user,
  folder: Icons.folder,
  calendar: Icons.calendar,
  notebook: Icons.notebook,
  users: Icons.users,
  heart: Icons.heart,
  academic: Icons.academic,
};

function NavItemLink({
  item,
  className,
}: {
  item: { href: string; icon: string; label: string };
  className?: string;
}) {
  const Icon = NAV_ICONS[item.icon] || Icons.home;

  return (
    <PressSurface asChild>
      <Link
        href={item.href}
        className={className}
        aria-label={item.label}
      >
        <Icon className="size-5 md:size-4" />
      </Link>
    </PressSurface>
  );
}

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(false);
  const reserveArticleTocSlot = /\/diary\/[^/]+$/.test(pathname);
  const items = t.raw("navbar.items") as Array<{
    href: string;
    icon: string;
    label: string;
  }>;

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const linkClassName = cn(
    buttonVariants({ variant: "ghost", size: "icon" }),
    "size-11 md:size-12",
  );

  return (
    <div
      data-no-drag
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3",
        "pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]",
        reserveArticleTocSlot && "max-md:pl-[4.75rem] max-md:justify-stretch",
        "md:top-3 md:bottom-auto md:px-0 md:pb-0 md:pl-0",
      )}
    >
      <div
        className={cn(
          "bg-background dark:bg-background pointer-events-none fixed inset-x-0 bottom-0 h-[5.5rem] to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] md:top-0 md:h-16",
        )}
        aria-hidden
      />
      <Dock
        iconSize={isDesktop ? 40 : 38}
        className={cn(
          "bg-background pointer-events-auto relative z-50 mx-auto flex w-max max-w-[calc(100vw-1rem)] shrink-0 transform-gpu items-center px-1 max-md:!mt-0 max-md:h-[4.25rem] max-md:!gap-1.5 max-md:!px-2.5 max-md:!py-2 [box-shadow:0_0_0_1px_rgba(140,66,209,.08),0_2px_4px_rgba(140,66,209,.08),0_12px_24px_rgba(140,66,209,.08)] md:mt-1 dark:[box-shadow:0_-20px_80px_-20px_#8c52ff33_inset] dark:[border:1px_solid_#7355ae80]",
          reserveArticleTocSlot
            ? "max-md:mx-0 max-md:w-full max-md:max-w-none max-md:justify-between"
            : "max-md:w-[calc(100vw-0.75rem)] max-md:max-w-none max-md:justify-between",
        )}
      >
        {items.map((item) => (
          <DockIcon key={item.href}>
            {isDesktop ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavItemLink item={item} className={linkClassName} />
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={8}>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <NavItemLink item={item} className={linkClassName} />
            )}
          </DockIcon>
        ))}
        <div className="hidden md:contents">
          <Separator orientation="vertical" className="h-full" />
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <ModeToggle />
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={8}>
                <p>{t("navbar.theme")}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <LanguageToggle />
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={8}>
                <p>{t("navbar.language")}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </div>
      </Dock>
    </div>
  );
}
