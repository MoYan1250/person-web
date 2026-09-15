import type { ReactNode } from "react";
import { siTypescript, siUnity } from "simple-icons";

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

/** CSS3 / JS share the HTML5-family shield used by Devicon. */
const SHIELD_LEFT =
  "M18.814 114.123 8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z";
const SHIELD_RIGHT =
  "M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z";

function JsIcon() {
  return (
    <Icon viewBox="0 0 128 128">
      <path fill="#E4A820" d={SHIELD_LEFT} />
      <path fill="#F0DB4F" d={SHIELD_RIGHT} />
      <path
        fill="#323330"
        d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"
      />
    </Icon>
  );
}

function CssIcon() {
  return (
    <Icon viewBox="0 0 128 128">
      <path fill="#1572B6" d={SHIELD_LEFT} />
      <path fill="#33A9DC" d={SHIELD_RIGHT} />
      <path
        fill="#fff"
        d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z"
      />
      <path
        fill="#EBEBEB"
        d="M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.39z"
      />
      <path
        fill="#fff"
        d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881H81.127z"
      />
      <path
        fill="#EBEBEB"
        d="M64.048 23.435v13.831H30.64l-.277-3.108-.63-7.012-.331-3.711h34.646zm-.047 27.996v13.831H48.792l-.277-3.108-.631-7.012-.33-3.711h16.447z"
      />
    </Icon>
  );
}

function HtmlIcon() {
  return (
    <Icon viewBox="0 0 128 128">
      <path
        fill="#E44D26"
        d="M19.037 113.876 9.032 1.661h109.936l-10.016 112.198-45.019 12.48z"
      />
      <path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z" />
      <path
        fill="#EBEBEB"
        d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z"
      />
      <path
        fill="#fff"
        d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z"
      />
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
