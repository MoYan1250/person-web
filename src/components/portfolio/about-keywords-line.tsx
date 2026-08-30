export function AboutKeywordsLine({
  label,
  skills,
}: {
  label: string;
  skills: readonly string[];
}) {
  if (skills.length === 0) return null;

  return (
    <p
      id="skills"
      className="text-muted-foreground text-sm leading-6 sm:text-base sm:leading-7"
    >
      <span>{label} : </span>
      <span className="text-primary text-xs font-medium sm:text-sm">
        {skills.join(", ")}
      </span>
    </p>
  );
}
