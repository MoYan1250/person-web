import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PageLogbookHeader } from "@/components/blocks/page-logbook-header";
import ProjectsSection from "@/components/portfolio/projects-section/projects-section";
import { routing } from "@/i18n/routing";
import { getCollectionItems, type ProjectItem } from "@/lib/content";
import { constructMetadata } from "@/lib/metadata";
import { getIconComponent } from "@/lib/utils";

type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return constructMetadata({
    title: t("sections.selectedProjects"),
    description: t("index.cards.projects.description"),
    path: "/projects",
    locale,
  });
}

export default async function ProjectsPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const locale = params.locale || routing.defaultLocale;
  const t = await getTranslations({ locale });
  const projectsItems = getCollectionItems<ProjectItem>(t, "projects.items");

  return (
    <main className="mx-auto flex min-h-dvh max-w-7xl flex-col px-6 pt-20 pb-24 sm:px-16 md:px-20 md:pt-32 lg:px-24">
      <PageLogbookHeader
        kicker={t("projectsPage.kicker")}
        grid={t("projectsPage.grid")}
        title={t("sections.selectedProjects")}
        description={t("projectsPage.description")}
        statLabel={t("projectsPage.stat")}
        statValue={projectsItems.length}
      />
      <ProjectsSection
        projects={projectsItems.map((project) => ({
          ...project,
          links: project.links?.map((link) => ({
            ...link,
            icon: getIconComponent(link.icon),
          })),
        }))}
        mobileDisplayCount={12}
        desktopDisplayCount={12}
      />
    </main>
  );
}
