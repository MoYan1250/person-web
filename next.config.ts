import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: [
    "@google-analytics/data",
    "google-auth-library",
    "shiki",
    "@shikijs/core",
    "@shikijs/engine-oniguruma",
    "@shikijs/vscode-textmate",
    "rehype-pretty-code",
    "rehype-katex",
    "katex",
    "rehype-raw",
    "rehype-sanitize",
    "rehype-slug",
    "rehype-stringify",
    "remark-gfm",
    "remark-math",
    "remark-parse",
    "remark-rehype",
    "unified",
    "gray-matter",
  ],
  async redirects() {
    return [
      { source: "/blog", destination: "/diary", permanent: true },
      { source: "/blog/:path*", destination: "/diary/:path*", permanent: true },
      { source: "/en/blog", destination: "/en/diary", permanent: true },
      {
        source: "/en/blog/:path*",
        destination: "/en/diary/:path*",
        permanent: true,
      },
      { source: "/zh/blog", destination: "/diary", permanent: true },
      {
        source: "/zh/blog/:path*",
        destination: "/diary/:path*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/open-source/nextjs-portfolio-blog-research/docs",
        destination:
          "https://nextjs-portfolio-blog-research-docs.vercel.app/open-source/nextjs-portfolio-blog-research/docs",
      },
      {
        source: "/open-source/nextjs-portfolio-blog-research/docs/:path*",
        destination:
          "https://nextjs-portfolio-blog-research-docs.vercel.app/open-source/nextjs-portfolio-blog-research/docs/:path*",
      },
    ];
  },
};

export default withNextIntl(nextConfig);

initOpenNextCloudflareForDev();
