import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PageLogbookHeader } from "@/components/blocks/page-logbook-header";
import { AboutKeywordsLine } from "@/components/portfolio/about-keywords-line";
import { ContactChannels } from "@/components/portfolio/contact-channels";
import { TechSkills } from "@/components/portfolio/tech-skills";
import { CustomReactMarkdown } from "@/components/react-markdown";
import { BlurFade } from "@/components/ui/blur-fade";
import { routing } from "@/i18n/routing";
import { getArrayField } from "@/lib/content";
import { constructMetadata } from "@/lib/metadata";
import { transformSocialData } from "@/lib/social-icons";

type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return constructMetadata({
    title: t("sections.about"),
    description: t("headline"),
    path: "/about",
    locale,
  });
}

export default async function AboutPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const locale = params.locale || routing.defaultLocale;
  const t = await getTranslations({ locale });
  const skills = getArrayField<string>(t, "skills");
  const experiences = t.raw("aboutExperiences") as {
    title?: string;
    items?: string[];
  };
  const experienceItems = Array.isArray(experiences?.items)
    ? experiences.items
    : [];
  const socialData = transformSocialData(
    t.raw("social") as Parameters<typeof transformSocialData>[0],
  );

  const proseClassName =
    "prose text-muted-foreground dark:prose-invert max-w-full font-sans text-base leading-8 sm:text-lg sm:leading-9 [&_p]:mb-6 [&_p:last-child]:mb-0 text-pretty";

  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col space-y-12 px-6 pt-20 mobile-page-pad sm:px-8 md:px-10 md:pt-32">
      <BlurFade delay={0}>
        <PageLogbookHeader
          kicker={t("aboutPage.kicker")}
          title={t("sections.about")}
          description={t("aboutPage.description")}
          statLabel={t("aboutPage.stat")}
          statValue={skills.length}
        />
      </BlurFade>

      <BlurFade delay={0.05}>
        <div className="glass-panel rounded-2xl p-8 sm:p-10 md:p-12">
          <div className={proseClassName}>
            <CustomReactMarkdown>{t("bioMarkdown")}</CustomReactMarkdown>
          </div>

          {skills.length > 0 ? (
            <div className="border-border/60 mt-10 border-t pt-8">
              <AboutKeywordsLine
                label={t("sections.skills")}
                skills={skills}
              />
            </div>
          ) : null}

          {experienceItems.length > 0 ? (
            <div className="border-border/60 mt-10 border-t pt-8">
              <div className={proseClassName}>
                <CustomReactMarkdown>{`## ${experiences.title ?? ""}\n\n${experienceItems.map((item) => `- ${item}`).join("\n")}`}</CustomReactMarkdown>
              </div>
            </div>
          ) : null}
        </div>
      </BlurFade>

      <BlurFade delay={0.08}>
        <div className="glass-panel rounded-2xl p-8 sm:p-10 md:p-12">
          <TechSkills
            title={t("sections.techSkills")}
            description={t("aboutPage.techSkillsNote")}
          />
        </div>
      </BlurFade>

      <BlurFade delay={0.12}>
        <section id="connect" className="glass-panel space-y-4 overflow-hidden rounded-2xl p-8 sm:p-10 md:p-12">
          <h2 className="text-xl font-bold sm:text-2xl">
            {t("sections.contact")}
          </h2>
          <p className="text-muted-foreground text-base leading-7 sm:text-lg sm:leading-8">
            {t("sections.contactDescription")}
          </p>
          <ContactChannels socials={socialData} />
        </section>
      </BlurFade>
    </main>
  );
}
