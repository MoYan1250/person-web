"use client";

import { useState } from "react";

type SocialActionProps = {
  name: string;
  url: string;
  copyText?: string;
  className?: string;
  children: React.ReactNode;
};

export function SocialAction({
  name,
  url,
  copyText,
  className,
  children,
}: SocialActionProps) {
  const [copied, setCopied] = useState(false);

  if (copyText) {
    return (
      <button
        type="button"
        className={className}
        aria-label={copied ? `${name} copied` : `Copy ${name} ${copyText}`}
        title={copied ? "Copied" : copyText}
        onClick={async () => {
          await navigator.clipboard.writeText(copyText);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        }}
      >
        {children}
        <span className="sr-only">{copied ? `${name} copied` : name}</span>
      </button>
    );
  }

  return (
    <a
      href={url}
      target={url.startsWith("http") ? "_blank" : undefined}
      rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
      className={className}
      aria-label={name}
    >
      {children}
      <span className="sr-only">{name}</span>
    </a>
  );
}
