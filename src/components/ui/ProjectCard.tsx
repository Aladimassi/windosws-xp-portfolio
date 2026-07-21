import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "../../data/projects";
import { Badge } from "./Badge";
import { GithubIcon } from "./SocialIcons";
import { TiltCard } from "./TiltCard";
import { cn } from "../../lib/utils";

type ProjectCardProps = {
  project: Project;
};

const categoryColors: Record<Project["category"], string> = {
  ai: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  fullstack: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  backend: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  embedded: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  data: "text-sky-400 bg-sky-500/10 border-sky-500/20",
};

/** Carte projet 3D avec tilt, spotlight et bordure animée */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <TiltCard>
      <motion.article
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "border-glow group relative flex h-full flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6",
          "transition-shadow duration-300 hover:shadow-xl hover:shadow-indigo-500/10",
          project.featured && "glow-accent",
        )}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {project.featured && (
              <motion.span
                className="mb-2 inline-block rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs font-medium text-indigo-400"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ★ Featured
              </motion.span>
            )}
            <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-indigo-300">
              {project.title}
            </h3>
          </div>
          <span
            className={cn(
              "shrink-0 rounded-md border px-2 py-0.5 text-xs font-medium uppercase",
              categoryColors[project.category],
            )}
          >
            {project.category}
          </span>
        </div>

        <p className="mb-5 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
          {project.description}
        </p>

        <div className="mb-5 flex flex-wrap gap-2">
          {project.stack.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Badge>{tech}</Badge>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-4 border-t border-[var(--color-border)] pt-4">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-indigo-400"
            whileHover={{ x: 3 }}
          >
            <GithubIcon className="h-4 w-4" />
            Code
          </motion.a>
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-indigo-400"
              whileHover={{ x: 3 }}
            >
              <ExternalLink className="h-4 w-4" />
              Demo
            </motion.a>
          )}
        </div>
      </motion.article>
    </TiltCard>
  );
}
