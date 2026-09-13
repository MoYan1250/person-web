export const TECH_SKILLS = [
  { id: "c", label: "C", aliases: ["C language"] },
  { id: "cpp", label: "C++", aliases: ["cpp", "cplusplus"] },
  { id: "csharp", label: "C#", aliases: ["cs", "csharp"] },
  { id: "python", label: "Python", aliases: ["py"] },
  { id: "javascript", label: "JavaScript", aliases: ["JS", "js"] },
  { id: "html", label: "HTML", aliases: ["HTML5"] },
  { id: "css", label: "CSS", aliases: ["CSS3"] },
  { id: "typescript", label: "TypeScript", aliases: ["TS", "ts"] },
  { id: "linux", label: "Linux", aliases: [] },
  { id: "unity", label: "Unity", aliases: [] },
] as const;

export type TechSkillId = (typeof TECH_SKILLS)[number]["id"];
