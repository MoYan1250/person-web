/**
 * Site configuration
 * Unified configuration for the portfolio website
 */

export const BLUR_FADE_DELAY = 0.05;

function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }
  return "http://localhost:3000";
}

export const siteConfig = {
  url: resolveSiteUrl(),
  lastUpdated: "2026.08",
  avatarUrl: "/moyan-mark.png",
  blog: {
    /* Number of posts per page on the diary list */
    postsPerPage: 6,
  },
} as const;
