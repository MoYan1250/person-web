import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { isPreviewDeployment, siteConfig } from "@/data/site";
import {
  DEFAULT_LOCALE,
  getLocaleUrl,
  type Locale,
  LOCALE_TO_HREFLANG,
  LOCALES,
} from "@/i18n/routing";

function getAtomFeedUrl(locale: Locale): string {
  const u = new URL("/api/feed/atom.xml", siteConfig.url);
  if (locale !== DEFAULT_LOCALE) {
    u.searchParams.set("locale", locale);
  }
  return u.toString();
}

type MetadataProps = {
  title?: string;
  description?: string;
  path?: string;
  locale?: Locale;
  availableLocales?: string[];
  noIndex?: boolean;
};

export async function constructMetadata({
  title,
  description,
  path,
  locale,
  availableLocales,
  noIndex = false,
}: MetadataProps): Promise<Metadata> {
  const shouldNoIndex = noIndex || isPreviewDeployment;
  const googleVerification =
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  const bingVerification =
    process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim();
  const baiduVerification =
    process.env.NEXT_PUBLIC_BAIDU_SITE_VERIFICATION?.trim();
  const resolvedLocale = (locale || DEFAULT_LOCALE) as Locale;
  const t = await getTranslations({ locale: resolvedLocale });

  const pageTitle = title || t("name.full");
  const finalTitle =
    path === "/" ? pageTitle : `${pageTitle} | ${t("name.full")}`;
  const finalDescription = description || t("headline");
  const canonicalUrl = getLocaleUrl(resolvedLocale, path || "");
  const atomFeedUrl = getAtomFeedUrl(resolvedLocale);

  // Use availableLocales if provided, otherwise use all locales
  const locales = availableLocales || LOCALES;
  const alternateLanguages = locales.reduce(
    (acc, lang) => {
      const url = getLocaleUrl(lang, path || "");
      const hreflangCode = LOCALE_TO_HREFLANG[lang] || lang;
      acc[hreflangCode] = url;
      return acc;
    },
    {} as Record<string, string>,
  );
  alternateLanguages["x-default"] = getLocaleUrl(DEFAULT_LOCALE, path || "");

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: [],
    authors: [{ name: t("name.full"), url: siteConfig.url }],
    creator: t("name.full"),
    metadataBase: new URL(siteConfig.url),
    icons: {
      icon: [{ url: "/moyan-mark.png", type: "image/png" }],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages,
      types: {
        "application/atom+xml": atomFeedUrl,
      },
    },
    openGraph: {
      type: "website",
      title: pageTitle,
      description: finalDescription,
      url: path,
      siteName: t("name.full"),
      locale: resolvedLocale,
      images: [{ url: siteConfig.avatarUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: finalDescription,
      site: canonicalUrl,
      creator: t("name.full"),
      images: [siteConfig.avatarUrl],
    },
    robots: {
      index: !shouldNoIndex,
      follow: !shouldNoIndex,
      googleBot: {
        index: !shouldNoIndex,
        follow: !shouldNoIndex,
      },
    },
    verification: {
      ...(googleVerification ? { google: googleVerification } : {}),
      ...(bingVerification || baiduVerification
        ? {
            other: {
              ...(bingVerification ? { "msvalidate.01": bingVerification } : {}),
              ...(baiduVerification
                ? { "baidu-site-verification": baiduVerification }
                : {}),
            },
          }
        : {}),
    },
    // Next.js metadata route `src/app/manifest.ts` is served at `/manifest.webmanifest`
    manifest: "/manifest.webmanifest",
  };
}
