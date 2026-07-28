import { motion } from "framer-motion";
import type { Experience } from "../../data/experience";
import { TechBadge } from "./TechBadge";
import { ScrollReveal } from "./ScrollReveal";

type TimelineItemProps = {
  experience: Experience;
  index: number;
  isLast: boolean;
};

/** Timeline animée avec pulse sur le point actif */
export function TimelineItem({ experience, index, isLast }: TimelineItemProps) {
  const isCurrent = index === 0;

  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div
        className="relative flex gap-6 pb-12"
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {!isLast && (
          <div className="absolute top-3 left-[11px] h-full w-px bg-gradient-to-b from-indigo-500/50 to-[var(--color-border)]" />
        )}

        <div
          className={`relative z-10 mt-1.5 h-[22px] w-[22px] shrink-0 rounded-full border-2 border-indigo-500 bg-[var(--color-surface)] ${isCurrent ? "timeline-pulse" : ""}`}
        >
          <div className="absolute inset-1 rounded-full bg-indigo-500" />
        </div>

        <motion.div
          className="flex-1 rounded-xl border border-transparent p-4 -m-4 transition-colors hover:border-[var(--color-border)] hover:bg-[var(--color-surface-elevated)]/50"
        >
          <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="text-lg font-semibold">{experience.company}</h3>
            <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-400">
              {experience.period}
            </span>
          </div>
          <p className="mb-1 text-sm font-medium text-indigo-400">{experience.role}</p>
          <p className="mb-1 text-sm text-[var(--color-muted)]">{experience.location}</p>
          <p className="mb-4 text-sm leading-relaxed text-[var(--color-muted)]">
            {experience.description}
          </p>

          <ul className="mb-4 space-y-2">
            {experience.highlights.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-2 text-sm leading-relaxed text-[var(--color-muted)]"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
                {item}
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </ScrollReveal>
  );
}
