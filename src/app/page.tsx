export default function RootPage() {
  return (
    <html lang="zh-Hant">
      <head>
        <meta httpEquiv="refresh" content="0;url=/zh" />
        <link rel="canonical" href="/zh" />
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
