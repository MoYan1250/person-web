import { SocialAction } from "@/components/portfolio/social-action";
import { cn } from "@/lib/utils";

type Social = {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  content?: boolean;
  copyText?: string;
};

const CHANNEL_ORDER = ["email", "GitHub", "instagram", "discord"];

function displayValue(social: Social): string {
  if (social.copyText) return social.copyText;
  if (social.url.startsWith("mailto:")) {
    return social.url.replace(/^mailto:/i, "");
  }
  try {
    const path = new URL(social.url).pathname.replace(/\/+$/, "");
    const handle = path.split("/").filter(Boolean).pop();
    return handle ? `@${handle}` : social.url;
  } catch {
    return social.url;
  }
}

function sortChannels(socials: Record<string, Social>): Social[] {
  const entries = Object.entries(socials).filter(
    ([key, social]) => social.content || key.toLowerCase() === "email",
  );

  return entries
    .sort(([a], [b]) => {
      const ai = CHANNEL_ORDER.findIndex((key) => key.toLowerCase() === a.toLowerCase());
      const bi = CHANNEL_ORDER.findIndex((key) => key.toLowerCase() === b.toLowerCase());
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    })
    .map(([, social]) => social);
}

export function ContactChannels({
  socials,
}: {
  socials: Record<string, Social>;
}) {
  const channels = sortChannels(socials);
  if (channels.length === 0) return null;

  return (
    <div className="mx-auto grid w-full min-w-0 gap-3 md:grid-cols-2">
      {channels.map((social) => (
        <SocialAction
          key={social.name}
          name={social.name}
          url={social.url}
          copyText={social.copyText}
          className={cn(
            "border-border hover:border-primary/50 group m-0 flex w-full min-w-0 max-w-full cursor-pointer items-center gap-3 overflow-hidden rounded-xl border bg-background/35 p-4 text-left transition-colors sm:gap-4 sm:p-5",
          )}
        >
          <div className="border-border bg-muted/40 text-foreground shrink-0 rounded-lg border p-2.5 sm:p-3">
            <social.icon className="size-5 sm:size-6" />
          </div>
          <div className="min-w-0 flex-1 overflow-hidden">
            <p className="text-muted-foreground text-sm">{social.name}</p>
            <p className="truncate font-semibold tracking-tight">
              {displayValue(social)}
            </p>
          </div>
        </SocialAction>
      ))}
    </div>
  );
}
