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

  return (
    <div
      data-no-drag
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 mx-auto mb-9 flex h-full max-h-14 origin-bottom justify-center px-3 md:top-0 md:mb-0 md:px-0",
      )}
    >
      <div
        className={cn(
          "bg-background dark:bg-background fixed inset-x-0 bottom-0 h-16 w-full to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] md:top-0",
        )}
      ></div>
      <div className="pointer-events-auto relative z-50 w-full max-md:max-w-full max-md:overflow-x-auto max-md:overscroll-x-contain max-md:[-ms-overflow-style:none] max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden md:w-auto">
        <Dock
          iconSize={isDesktop ? 40 : 34}
          className="bg-background relative z-50 mx-auto flex h-full min-h-full w-max shrink-0 transform-gpu items-center px-1 max-md:!gap-0.5 max-md:!p-1.5 [box-shadow:0_0_0_1px_rgba(140,66,209,.08),0_2px_4px_rgba(140,66,209,.08),0_12px_24px_rgba(140,66,209,.08)] md:mt-1 dark:[box-shadow:0_-20px_80px_-20px_#8c52ff33_inset] dark:[border:1px_solid_#7355ae80]"
        >
        {items.map((item) => {
          const Icon = NAV_ICONS[item.icon] || Icons.home;

          return (
            <DockIcon key={item.href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-9 md:size-12",
                    )}
                    aria-label={item.label}
                  >
                    <Icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side={isDesktop ? "bottom" : "top"}
                  sideOffset={8}
                >
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          );
        })}
        <div className="hidden md:contents">
          <Separator orientation="vertical" className="h-full" />
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <ModeToggle />
              </TooltipTrigger>
              <TooltipContent
                side={isDesktop ? "bottom" : "top"}
                sideOffset={8}
              >
                <p>{t("navbar.theme")}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <LanguageToggle />
              </TooltipTrigger>
              <TooltipContent
                side={isDesktop ? "bottom" : "top"}
                sideOffset={8}
              >
                <p>{t("navbar.language")}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </div>
      </Dock>
      </div>
    </div>
  );
}
