/**
 * Search-engine ownership tags. Codes come from Search Console / Bing /
 * Baidu after you add the site; set them as Cloudflare env vars and rebuild.
 */
export function SiteVerification() {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  const bing = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim();
  const baidu = process.env.NEXT_PUBLIC_BAIDU_SITE_VERIFICATION?.trim();

  if (!google && !bing && !baidu) return null;

  return (
    <>
      {google ? (
        <meta name="google-site-verification" content={google} />
      ) : null}
      {bing ? <meta name="msvalidate.01" content={bing} /> : null}
      {baidu ? (
        <meta name="baidu-site-verification" content={baidu} />
      ) : null}
    </>
  );
}
