import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { projects, type Project } from "../../data/projects";
import { ProjectCard } from "../ui/ProjectCard";
import { SectionHeading } from "../ui/SectionHeading";
import { cn } from "../../lib/utils";

type Filter = "all" | Project["category"];

const filters: { label: string; value: Filter }[] = [
  { label: "Tous", value: "all" },
  { label: "AI / ML", value: "ai" },
  { label: "Full-Stack", value: "fullstack" },
  { label: "Backend", value: "backend" },
  { label: "Data", value: "data" },
  { label: "Embedded", value: "embedded" },
];

/** Projets avec filtres animés et layout transitions */
export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="Projects"
          title="Mes projets GitHub"
          description={`${projects.length} dépôts publics — descriptions basées sur les README et structures réelles.`}
        />

        <div className="mb-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <motion.button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                filter === f.value
                  ? "text-white"
                  : "border border-[var(--color-border)] text-[var(--color-muted)] hover:border-indigo-500/30 hover:text-[var(--color-foreground)]",
              )}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {filter === f.value && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-lg bg-indigo-500 shadow-lg shadow-indigo-500/25"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{f.label}</span>
            </motion.button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
