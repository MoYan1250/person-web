/**
 * Site configuration
 * Unified configuration for the portfolio website
 */

export const BLUR_FADE_DELAY = 0.05;

/** Current Cloudflare Pages production host (no custom domain yet). */
export const PAGES_PRODUCTION_URL = "https://moyan-5hx.pages.dev";

function stripSlash(url: string): string {
  return url.replace(/\/$/, "");
}

function hostnameOf(url: string): string | null {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

/**
 * Cloudflare sets CF_PAGES_URL to this deployment, often
 * `https://<hash>.<project>.pages.dev`. Canonical should be the
 * stable `https://<project>.pages.dev` alias.
 */
function cloudflareProductionUrl(): string | undefined {
  if (process.env.CF_PAGES !== "1") return undefined;
  const raw = process.env.CF_PAGES_URL?.trim();
  if (!raw) return PAGES_PRODUCTION_URL;
  try {
    const host = new URL(raw).hostname;
    if (!host.endsWith(".pages.dev")) return new URL(raw).origin;
    const labels = host.slice(0, -".pages.dev".length).split(".").filter(Boolean);
    const project = labels[labels.length - 1];
    if (!project) return new URL(raw).origin;
    return `https://${project}.pages.dev`;
  } catch {
    return PAGES_PRODUCTION_URL;
  }
}

function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const envUrl = fromEnv ? stripSlash(fromEnv) : "";
  const envHost = envUrl ? hostnameOf(envUrl) : null;
  const cfUrl = cloudflareProductionUrl();

  // A purchased domain in env always wins.
  if (envUrl && envHost && !envHost.endsWith(".pages.dev")) {
    return envUrl;
  }

  // On Pages builds, this project's host is more accurate than a stale
  // NEXT_PUBLIC_SITE_URL (e.g. pointing at another *.pages.dev site).
  if (cfUrl) return cfUrl;

  if (envUrl) return envUrl;
  if (process.env.NODE_ENV === "production") return PAGES_PRODUCTION_URL;
  return "http://localhost:3000";
}

export const isPreviewDeployment =
  process.env.CF_PAGES === "1" &&
  Boolean(process.env.CF_PAGES_BRANCH) &&
  process.env.CF_PAGES_BRANCH !== "main";

export const siteConfig = {
  url: resolveSiteUrl(),
  lastUpdated: "2026.08",
  avatarUrl: "/moyan-mark.png",
  blog: {
    /* Number of posts per page on the diary list */
    postsPerPage: 6,
  },
} as const;
