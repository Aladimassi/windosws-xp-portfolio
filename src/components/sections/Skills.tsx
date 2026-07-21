import { skillCategories } from "../../data/skills";
import { SectionHeading } from "../ui/SectionHeading";
import { SkillGroup } from "../ui/SkillGroup";

/** Section compétences groupées par catégorie */
export function Skills() {
  return (
    <section id="skills" className="border-y border-[var(--color-border)] bg-[var(--color-surface-elevated)]/50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="Skills"
          title="Stack technique"
          description="Technologies utilisées dans mes projets académiques et professionnels, issues de mon GitHub."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <SkillGroup key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
