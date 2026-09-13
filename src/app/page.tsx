import { SiteVerification } from "@/components/third-party";
import { siteConfig } from "@/data/site";

export default function RootPage() {
  const zhUrl = `${siteConfig.url}/zh`;

  return (
    <html lang="zh-Hant">
      <head>
        <meta httpEquiv="refresh" content="0;url=/zh" />
        <link rel="canonical" href={zhUrl} />
        <SiteVerification />
        <title>Redirecting</title>
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `location.replace("/zh")`,
          }}
        />
        <p>
          <a href="/zh">Continue to the site</a>
        </p>
      </body>
    </html>
  );
}
