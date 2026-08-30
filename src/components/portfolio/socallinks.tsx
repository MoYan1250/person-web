import { SocialAction } from "@/components/portfolio/social-action";

interface Social {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  navbar?: boolean;
  content?: boolean;
  footer?: boolean;
  copyText?: string;
}

export default function SocialLinks({
  socials,
  className = "text-muted-foreground hover:text-primary",
  containerClassName = "flex items-center justify-center gap-4",
  iconClassName = "size-5",
}: {
  socials: Record<string, Social>;
  delay?: number;
  className?: string;
  containerClassName?: string;
  iconClassName?: string;
}) {
  return (
    <div className={containerClassName}>
      {Object.values(socials)
        .filter((social) => social.content)
        .map((social) => (
          <SocialAction
            key={social.name}
            name={social.name}
            url={social.url}
            copyText={social.copyText}
            className={className}
          >
            <social.icon className={iconClassName} />
          </SocialAction>
        ))}
    </div>
  );
}
