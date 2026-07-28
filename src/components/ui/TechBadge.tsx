import { cn } from "../../lib/utils";
import { TechIcon } from "../../lib/techIcons";

type TechBadgeProps = {
  name: string;
  className?: string;
  iconOnly?: boolean;
};

/** Badge stack avec icône de technologie */
export function TechBadge({ name, className, iconOnly = false }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-2.5 py-1 text-xs font-medium text-[var(--color-muted)]",
        className,
      )}
    >
      <TechIcon name={name} size={14} />
      {!iconOnly && <span>{name}</span>}
    </span>
  );
}
