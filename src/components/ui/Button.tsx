import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

type ButtonProps = Omit<HTMLMotionProps<"button">, "ref"> & {
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  external?: boolean;
  download?: string;
};

const variants = {
  primary:
    "btn-shimmer bg-indigo-500 text-white hover:bg-indigo-400 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40",
  secondary:
    "border border-[var(--color-border)] bg-[var(--color-surface-elevated)] hover:border-indigo-500/40 hover:bg-indigo-500/5 hover:shadow-lg hover:shadow-indigo-500/5",
  ghost: "hover:bg-white/5 text-[var(--color-muted)] hover:text-[var(--color-foreground)]",
};

const motionProps = {
  whileHover: { scale: 1.03, y: -1 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring" as const, stiffness: 400, damping: 25 },
};

/** Bouton animé avec hover spring et shimmer */
export function Button({
  variant = "primary",
  href,
  external,
  download,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-200",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        {...motionProps}
        {...(download ? { download } : {})}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button className={classes} {...motionProps} {...props}>
      {children}
    </motion.button>
  );
}
