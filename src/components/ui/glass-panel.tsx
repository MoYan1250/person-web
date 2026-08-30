import { cn } from "@/lib/utils";

export function GlassPanel({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("glass-panel", className)} {...props}>
      {children}
    </div>
  );
}
