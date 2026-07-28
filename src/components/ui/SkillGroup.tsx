import { motion } from "framer-motion";
import type { SkillCategory } from "../../data/skills";
import { getTechIcon } from "../../lib/techIcons";
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

/** Compétences avec icônes officielles et hover dynamique */
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
          {category.skills.map((skill) => {
            const { icon: Icon, color } = getTechIcon(skill.name);
            return (
              <motion.div
                key={skill.name}
                variants={chipItem}
                className="skill-chip group/skill flex cursor-default items-center gap-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2"
                whileHover={{ scale: 1.04 }}
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 group-hover/skill:bg-white/5"
                  style={{ backgroundColor: `${color}18` }}
                >
                  <Icon size={18} style={{ color }} aria-hidden />
                </span>
                <span className="text-sm font-medium">{skill.name}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </ScrollReveal>
  );
}
