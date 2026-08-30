import Image from "next/image";

import SocialLinks from "@/components/portfolio/socallinks";
import { siteConfig } from "@/data/site";

type SocialMap = Parameters<typeof SocialLinks>[0]["socials"];

export function HomeProfileCard({
  name,
  location,
  focusLabel,
  focus,
  sinceLabel,
  since,
  initials = "M",
  avatarUrl = siteConfig.avatarUrl,
  socials,
}: {
  name: string;
  location: string;
  focusLabel: string;
  focus: string;
  sinceLabel: string;
  since: string;
  initials?: string;
  avatarUrl?: string;
  socials: SocialMap;
}) {
  const fields = [
    { label: focusLabel, value: focus },
    { label: sinceLabel, value: since },
  ].filter((field) => field.value);

  return (
    <aside className="border-border bg-card flex h-fit flex-col rounded-xl border p-5 lg:min-h-[calc(100dvh-7.5rem)] lg:p-6">
      <div className="flex items-center gap-4 lg:block">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-full border-2 border-border bg-black lg:size-36">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name}
              fill
              sizes="144px"
              className="object-cover"
              priority
            />
          ) : (
            <span className="flex size-full items-center justify-center text-lg">
              {initials}
            </span>
          )}
        </div>
        <div className="lg:mt-6">
          <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
            {name}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">{location}</p>
        </div>
      </div>

      {fields.length > 0 ? (
        <dl className="border-border mt-6 hidden border-t sm:block">
          {fields.map((field) => (
            <div
              key={field.label}
              className="border-border grid grid-cols-[4.5rem_1fr] gap-3 border-b py-3.5 text-sm last:border-b-0"
            >
              <dt className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
                {field.label}
              </dt>
              <dd>{field.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="mt-6 lg:mt-auto lg:pt-10">
        <SocialLinks
          socials={socials}
          iconClassName="size-7"
          containerClassName="flex items-center gap-4"
        />
      </div>
    </aside>
  );
}
