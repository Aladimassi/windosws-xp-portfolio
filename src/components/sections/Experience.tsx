import { experiences } from "../../data/experience";
import { SectionHeading } from "../ui/SectionHeading";
import { TimelineItem } from "../ui/TimelineItem";

/** Section expériences — timeline des stages */
export function Experience() {
  return (
    <section
      id="experience"
      className="border-y border-[var(--color-border)] bg-[var(--color-surface-elevated)]/50 py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="Experience"
          title="Parcours professionnel"
          description="Stages en entreprise où j'ai appliqué l'IA et le développement full-stack sur des projets concrets."
        />

        <div className="max-w-3xl">
          {experiences.map((exp, index) => (
            <TimelineItem
              key={exp.company}
              experience={exp}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
