import { motion } from "framer-motion";

type GradientTextProps = {
  children: string;
  className?: string;
};

/** Texte avec dégradé animé */
export function GradientText({ children, className = "" }: GradientTextProps) {
  return (
    <motion.span
      className={`animate-gradient inline-block bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-[length:200%_auto] bg-clip-text text-transparent ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.span>
  );
}
