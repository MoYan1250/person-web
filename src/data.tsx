import { Icons } from "@/components/icons";
import { siteConfig } from "@/data/site";

export const DATA = {
  url: siteConfig.url,
  lastUpdated: siteConfig.lastUpdated,
  name: "Shang-Jing Lyu",
  description: "A personal index of who I am, what I make, and what I write.",
  chinese: {
    name: "魔閻 / Shang-Jing Lyu",
  },
  navbar: [
    { href: "/about", icon: Icons.user, label: "About" },
    { href: "/academic", icon: Icons.academic, label: "Academic" },
    { href: "/projects", icon: Icons.folder, label: "Projects" },
    { href: "/timeline", icon: Icons.calendar, label: "Timeline" },
    { href: "/diary", icon: Icons.notebook, label: "Writing" },
    { href: "/friends", icon: Icons.users, label: "Friends" },
  ],
  location: "St. Peter Senior High School / Hsinchu",
  locationLink: "https://www.google.com/maps/place/Hsinchu",
  discover: [
    {
      name: "Template",
      url: "https://github.com/zhengzangw/nextjs-portfolio-blog-research",
    },
  ],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/MoYan1250",
        icon: Icons.github,
        footer: true,
      },
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/moyan_1250",
        icon: Icons.instagram,
        footer: true,
      },
      Discord: {
        name: "Discord",
        url: "https://discord.com/users/765915749331632139",
        icon: Icons.discord,
        footer: true,
      },
      email: {
        name: "Email",
        url: "mailto:ziknsodardow@gmail.com",
        icon: Icons.email,
        footer: false,
      },
    },
  },
} as const;

export function getEmail(): string {
  return DATA.contact.social.email.url;
}
