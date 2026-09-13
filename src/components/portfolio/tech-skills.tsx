import type { ReactNode } from "react";
import { siCss, siHtml5, siJavascript, siTypescript, siUnity } from "simple-icons";

import type { TechSkillId } from "@/data/tech-skills";
import { TECH_SKILLS } from "@/data/tech-skills";

function Icon({
  children,
  viewBox = "0 0 24 24",
}: {
  children: ReactNode;
  viewBox?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      aria-hidden="true"
      className="size-8 shrink-0 sm:size-9"
      preserveAspectRatio="xMidYMid meet"
    >
      {children}
    </svg>
  );
}

const HEX =
  "M12 1.15c.55 0 1.08.2 1.5.45l8.35 4.9c.7.4 1.12 1.14 1.12 1.94v9.12c0 .8-.42 1.54-1.12 1.94l-8.35 4.9c-.42.25-.95.45-1.5.45s-1.08-.2-1.5-.45l-8.35-4.9C1.45 19.1 1.03 18.36 1.03 17.56V8.44c0-.8.42-1.54 1.12-1.94l8.35-4.9C10.92 1.35 11.45 1.15 12 1.15z";

function CStroke() {
  return (
    <path
      d="M15.35 8.05A5.35 5.35 0 1 0 15.35 15.95"
      fill="none"
      stroke="#fff"
      strokeWidth="2.7"
      strokeLinecap="butt"
    />
  );
}

function CIcon() {
  return (
    <Icon>
      <path d={HEX} fill="#005fa3" />
      <CStroke />
    </Icon>
  );
}

function CppIcon() {
  return (
    <Icon>
      <defs>
        <clipPath id="skill-hex-cpp">
          <path d={HEX} />
        </clipPath>
      </defs>
      <g clipPath="url(#skill-hex-cpp)">
        <path d={HEX} fill="#1aa0e0" />
        <path fill="#00599c" d="M0 24 24 8.5V24z" />
      </g>
      <CStroke />
      <g fill="#fff">
        <path d="M14.85 10.55h.85v-.85h.85v.85h.85v.85h-.85v.85h-.85v-.85h-.85z" />
        <path d="M17.85 10.55h.85v-.85h.85v.85h.85v.85h-.85v.85h-.85v-.85h-.85z" />
      </g>
    </Icon>
  );
}

function CsharpIcon() {
  return (
    <Icon>
      <defs>
        <clipPath id="skill-hex-cs">
          <path d={HEX} />
        </clipPath>
      </defs>
      <g clipPath="url(#skill-hex-cs)">
        <path d={HEX} fill="#c084fc" />
        <path fill="#5b21b6" d="M0 24 24 8.5V24z" />
      </g>
      <CStroke />
      <g fill="#fff" transform="translate(14.35 9.15)">
        <rect width=".72" height="5.1" x="1.15" y="0" rx=".12" transform="skewX(-14)" />
        <rect width=".72" height="5.1" x="3.05" y="0" rx=".12" transform="skewX(-14)" />
        <rect width="4.7" height=".72" x=".15" y="1.35" rx=".12" />
        <rect width="4.7" height=".72" x=".15" y="3.05" rx=".12" />
      </g>
    </Icon>
  );
}

function PythonIcon() {
  return (
    <Icon>
      <g transform="scale(.09375)">
        <path
          fill="#3776ab"
          d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H40.188S1.06 61.61 1.06 123.748s34.22 59.81 34.22 59.81h20.35v-28.75s-1.104-34.22 33.632-34.22h57.688s32.528.436 32.528-31.568V32.332S194.668.072 126.916.072ZM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13Z"
        />
        <path
          fill="#ffd43b"
          d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.128H127.6v-8.745h87.884s39.129 4.45 39.129-57.688-34.22-59.81-34.22-59.81h-20.35v28.75s1.104 34.22-33.632 34.22h-57.688s-32.528-.436-32.528 31.568v50.203s-5.235 32.16 62.516 32.16Zm34.114-19.588a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13Z"
        />
      </g>
    </Icon>
  );
}

function JsIcon() {
  return (
    <Icon>
      <path fill={`#${siJavascript.hex}`} d={siJavascript.path} />
    </Icon>
  );
}

function CssIcon() {
  return (
    <Icon>
      <path fill={`#${siCss.hex}`} d={siCss.path} />
    </Icon>
  );
}

function HtmlIcon() {
  return (
    <Icon>
      <path fill={`#${siHtml5.hex}`} d={siHtml5.path} />
    </Icon>
  );
}

function TsIcon() {
  return (
    <Icon>
      <path fill={`#${siTypescript.hex}`} d={siTypescript.path} />
    </Icon>
  );
}

function UnityIcon() {
  return (
    <Icon>
      <path d={siUnity.path} fill="currentColor" />
    </Icon>
  );
}

function LinuxIcon() {
  return (
    <Icon>
      <ellipse cx="7.6" cy="21.7" rx="3.1" ry="1.25" fill="#f5a623" />
      <ellipse cx="16.4" cy="21.7" rx="3.1" ry="1.25" fill="#f5a623" />
      <ellipse cx="5.4" cy="15.2" rx="1.85" ry="3.3" fill="#1a1a1a" transform="rotate(-28 5.4 15.2)" />
      <ellipse cx="18.6" cy="15.2" rx="1.85" ry="3.3" fill="#1a1a1a" transform="rotate(28 18.6 15.2)" />
      <ellipse cx="12" cy="14.6" rx="6.1" ry="7.1" fill="#1a1a1a" />
      <ellipse cx="12" cy="16.1" rx="4" ry="5.4" fill="#f4efe4" />
      <ellipse cx="12" cy="7.6" rx="5" ry="5.3" fill="#1a1a1a" />
      <ellipse cx="10.05" cy="7.25" rx="1.55" ry="1.9" fill="#fff" />
      <ellipse cx="13.95" cy="7.25" rx="1.55" ry="1.9" fill="#fff" />
      <circle cx="10.45" cy="7.55" r=".62" fill="#1a1a1a" />
      <circle cx="14.35" cy="7.55" r=".62" fill="#1a1a1a" />
      <path fill="#f5a623" d="M10.2 9.35 12 11.9l1.8-2.55z" />
    </Icon>
  );
}

const ICONS: Record<TechSkillId, ReactNode> = {
  c: <CIcon />,
  cpp: <CppIcon />,
  csharp: <CsharpIcon />,
  python: <PythonIcon />,
  javascript: <JsIcon />,
  html: <HtmlIcon />,
  css: <CssIcon />,
  typescript: <TsIcon />,
  linux: <LinuxIcon />,
  unity: <UnityIcon />,
};

export function TechSkills({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section id="tech-skills" className="space-y-5">
      <div className="space-y-2">
        <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
        <p className="text-muted-foreground text-base leading-7 sm:text-lg sm:leading-8">
          {description}
        </p>
      </div>
      <ul className="flex flex-wrap gap-3 sm:gap-3.5">
        {TECH_SKILLS.map((skill) => (
          <li
            key={skill.id}
            className="border-border/70 bg-muted/80 text-foreground inline-flex h-12 items-center gap-2.5 rounded-xl border px-3.5 text-base leading-none font-medium sm:h-14 sm:px-4 sm:text-lg dark:border-white/10 dark:bg-black/45"
          >
            {ICONS[skill.id]}
            <span>{skill.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
