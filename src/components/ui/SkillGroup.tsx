import { motion } from "framer-motion";
import type { SkillCategory } from "../../data/skills";
import { ScrollReveal } from "./ScrollReveal";

type SkillGroupProps = {
  category: SkillCategory;
  index: number;
};

const chipContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const chipItem = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

/** Compétences avec stagger et hover dynamique */
export function SkillGroup({ category, index }: SkillGroupProps) {
  return (
    <ScrollReveal delay={index * 0.08}>
      <motion.div
        className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-indigo-500/5"
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <h3 className="mb-4 text-sm font-semibold tracking-wide text-indigo-400 uppercase">
          {category.title}
        </h3>
        <motion.div
          className="flex flex-wrap gap-2"
          variants={chipContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {category.skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={chipItem}
              className="skill-chip flex cursor-default items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-500/10 text-xs font-bold text-indigo-400">
                {skill.icon}
              </span>
              <span className="text-sm font-medium">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </ScrollReveal>
  );
}
