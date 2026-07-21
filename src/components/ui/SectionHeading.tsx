import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

type SectionHeadingProps = {
  label: string;
  title: string;
  description?: string;
};

/** En-tête de section avec ligne animée */
export function SectionHeading({ label, title, description }: SectionHeadingProps) {
  return (
    <ScrollReveal className="mb-12 max-w-2xl">
      <motion.p
        className="mb-2 text-sm font-medium tracking-widest text-indigo-400 uppercase"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        {label}
      </motion.p>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      <div className="section-line my-4 w-24" />
      {description && (
        <p className="text-base leading-relaxed text-[var(--color-muted)]">{description}</p>
      )}
    </ScrollReveal>
  );
}
