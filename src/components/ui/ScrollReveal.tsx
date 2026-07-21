import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

type ScrollRevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

/** Animation d'apparition au scroll via framer-motion */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  ...props
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
