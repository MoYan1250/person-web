import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { hasLocale, Locale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { Inter as FontSans, Noto_Serif_TC as FontSerif, Syne as FontDisplay } from "next/font/google";
import { notFound } from "next/navigation";

import Footer from "@/components/blocks/footer";
import Navbar from "@/components/blocks/navbar/navbar";
import { PageTransition } from "@/components/blocks/page-transition";
import { ScrollRestore } from "@/components/blocks/scroll-restore";
import { SiteMark } from "@/components/blocks/site-mark";
import { SiteSearch } from "@/components/blocks/site-search";
import { SmoothScroll } from "@/components/blocks/smooth-scroll";
import { PointerLight } from "@/components/home/pointer-light";
import JsonLdScripts from "@/components/jsonld-scripts";
import {
  BaiduSiteVerification,
  GoogleTagManager,
} from "@/components/third-party";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DEFAULT_LOCALE, LOCALE_TO_HREFLANG, routing } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { buildSearchIndex } from "@/lib/search-index";
import { cn } from "@/lib/utils";

/* Fonts */
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = FontSerif({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-serif",
  display: "swap",
});

const fontDisplay = FontDisplay({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-display",
  display: "swap",
});

/* Metadata */
type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return constructMetadata({
    description: t("headline"),
    locale: locale as Locale,
    path: `/`,
  });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale - if invalid, trigger 404
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();
  const searchItems = await buildSearchIndex(locale);

  return (
    <html lang={LOCALE_TO_HREFLANG[locale as Locale] || locale || DEFAULT_LOCALE} suppressHydrationWarning>
      <head>
        <BaiduSiteVerification />
        <JsonLdScripts locale={locale} />
      </head>

      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable,
          fontSerif.variable,
          fontDisplay.variable,
        )}
      >
        {/* Main Layout */}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TooltipProvider delayDuration={0}>
              <SmoothScroll />
              <ScrollRestore />
              <PointerLight />
              <SiteMark />
              <SiteSearch items={searchItems} />
              <Navbar />
              <PageTransition>{children}</PageTransition>
              <Footer />
            </TooltipProvider>
          </ThemeProvider>
        </NextIntlClientProvider>

        {/* Third-party services */}
        {process.env.NODE_ENV === "development" ? null : (
          <>
            <GoogleTagManager />
            {process.env.VERCEL_ENV ? (
              <>
                <Analytics />
                <SpeedInsights />
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </body>
    </html>
  );
}
