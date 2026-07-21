import { motion } from "framer-motion";
import { ArrowDown, FileText, Sparkles } from "lucide-react";
import { projects } from "../../data/projects";
import { profile } from "../../data/profile";
import { AnimatedCounter } from "../ui/AnimatedCounter";
import { Button } from "../ui/Button";
import { GradientText } from "../ui/GradientText";
import { GithubIcon, LinkedinIcon } from "../ui/SocialIcons";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

const stats = [
  { value: projects.length, suffix: "+", label: "Projets GitHub" },
  { value: 2, suffix: "", label: "Stages IA / Full-Stack" },
  { value: 15, suffix: "+", label: "Technologies" },
];

/** Hero dynamique — stagger, compteurs, dégradé animé */
export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="bg-grid pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Badge disponibilité */}
          <motion.div variants={item} className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-400" />
              </span>
              {profile.availability}
            </span>
          </motion.div>

          {/* Avatar + meta */}
          <motion.div variants={item} className="mb-8 flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 opacity-50 blur-sm" />
              <img
                src={profile.avatar}
                alt={profile.name}
                className="relative h-16 w-16 rounded-full border-2 border-indigo-500/40 object-cover"
              />
            </motion.div>
            <div>
              <p className="text-sm text-[var(--color-muted)]">{profile.school}</p>
              <p className="text-sm text-indigo-400">{profile.location}</p>
            </div>
          </motion.div>

          {/* Titre */}
          <motion.h1
            variants={item}
            className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            {profile.name.split(" ")[0]}{" "}
            <GradientText>{profile.name.split(" ")[1] ?? ""}</GradientText>
          </motion.h1>

          <motion.p variants={item} className="mb-2 flex items-center gap-2 text-xl font-medium sm:text-2xl">
            <Sparkles className="h-5 w-5 text-indigo-400" />
            <span className="text-indigo-400">{profile.title}</span>
          </motion.p>

          <motion.p
            variants={item}
            className="mb-10 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          {/* Stats animées */}
          <motion.div variants={item} className="mb-10 grid grid-cols-3 gap-4 sm:max-w-lg">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)]/60 px-4 py-3 backdrop-blur-sm"
              >
                <p className="text-2xl font-bold text-[var(--color-foreground)]">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs text-[var(--color-muted)]">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={item} className="flex flex-wrap gap-3">
            <Button href="#projects">Voir mes projets</Button>
            <Button href={profile.cvUrl} variant="secondary" external download={profile.cvFileName}>
              <FileText className="h-4 w-4" />
              CV
            </Button>
            <Button href={profile.github} variant="secondary" external>
              <GithubIcon className="h-4 w-4" />
              GitHub
            </Button>
            <Button href={profile.linkedin} variant="secondary" external>
              <LinkedinIcon className="h-4 w-4" />
              LinkedIn
            </Button>
          </motion.div>

          {/* Scroll hint */}
          <motion.a
            variants={item}
            href="#about"
            className="mt-20 inline-flex flex-col items-center gap-2 text-[var(--color-muted)] transition-colors hover:text-indigo-400"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ArrowDown className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
