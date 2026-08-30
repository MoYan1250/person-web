"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { LanguageToggle } from "@/components/blocks/navbar/language-toggle";
import { ModeToggle } from "@/components/blocks/navbar/mode-toggle";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "@/i18n/routing";
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
    <Link
      href={item.href}
      className={className}
      aria-label={item.label}
    >
      <Icon className="size-4" />
    </Link>
  );
}

export default function Navbar() {
  const t = useTranslations();
  const [isDesktop, setIsDesktop] = useState(false);
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
    "size-9 touch-manipulation transition-transform active:scale-95 md:size-12 md:active:scale-100",
  );

  return (
    <div
      data-no-drag
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-2",
        "pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]",
        "md:top-3 md:bottom-auto md:px-0 md:pb-0",
      )}
    >
      <div
        className={cn(
          "bg-background dark:bg-background pointer-events-none fixed inset-x-0 bottom-0 h-[5.5rem] to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] md:top-0 md:h-16",
        )}
        aria-hidden
      />
      <Dock
        iconSize={isDesktop ? 40 : 30}
        className="bg-background pointer-events-auto relative z-50 mx-auto flex w-max max-w-[calc(100vw-1rem)] shrink-0 transform-gpu items-center px-1 max-md:!mt-0 max-md:!gap-0.5 max-md:!p-1.5 [box-shadow:0_0_0_1px_rgba(140,66,209,.08),0_2px_4px_rgba(140,66,209,.08),0_12px_24px_rgba(140,66,209,.08)] md:mt-1 dark:[box-shadow:0_-20px_80px_-20px_#8c52ff33_inset] dark:[border:1px_solid_#7355ae80]"
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
