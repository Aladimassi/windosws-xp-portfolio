import { cn } from "../../lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

/** Petit badge pour tags de stack technologique */
export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-2.5 py-1 text-xs font-medium text-[var(--color-muted)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
