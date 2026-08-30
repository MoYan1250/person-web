import type { MetadataRoute } from "next";

import enMessages from "@/i18n/messages/en/personal.json";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: enMessages.name.full,
    short_name: enMessages.name.full,
    description: enMessages.headline.replace(/\n/g, ", "),
    start_url: "/",
    display: "standalone",
    background_color: "#232323",
    theme_color: "#8c52ff",
    orientation: "portrait-primary",
    scope: "/",
    lang: "en",
    icons: [
      {
        src: "/moyan-mark.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
