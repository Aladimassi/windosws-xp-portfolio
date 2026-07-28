import { motion } from "framer-motion";
import { GraduationCap, Sparkles } from "lucide-react";
import { profile } from "../../data/profile";
import { SectionHeading } from "../ui/SectionHeading";
import { ScrollReveal } from "../ui/ScrollReveal";

/** Section à propos — parcours académique et focus technique */
export function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="About"
          title="Qui suis-je ?"
          description="Étudiant en ingénierie informatique, orienté vers l'IA et le développement full-stack."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <ScrollReveal>
            <div className="space-y-6 text-base leading-relaxed text-[var(--color-muted)]">
              <p>
                Je suis <strong className="text-[var(--color-foreground)]">{profile.name}</strong>,
                étudiant en{" "}
                <strong className="text-[var(--color-foreground)]">Computer Science Engineering</strong>{" "}
                à <strong className="text-[var(--color-foreground)]">ESPRIT</strong> ({profile.location}).
                Avant ESPRIT, j&apos;ai suivi les classes préparatoires à l&apos;
                <strong className="text-[var(--color-foreground)]">IPEIM</strong>.
              </p>
              <p>
                Mon parcours combine une formation académique solide en programmation, structures de
                données et systèmes embarqués, avec une passion croissante pour l&apos;
                <strong className="text-[var(--color-foreground)]">intelligence artificielle</strong>, le{" "}
                <strong className="text-[var(--color-foreground)]">machine learning</strong> et la{" "}
                <strong className="text-[var(--color-foreground)]">business intelligence</strong>.
              </p>
              <p>
                J&apos;ai eu l&apos;opportunité de travailler sur des projets concrets en stage — de
                l&apos;architecture multi-agents chez Pixelium aux pipelines RAG chez Talan Tunisie —
                ce qui m&apos;a permis de relier la théorie académique à des problématiques réelles.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="space-y-4">
              <InfoCard
                icon={<GraduationCap className="h-5 w-5 text-indigo-400" />}
                title="Formation"
                content="ESPRIT — Computer Science Engineering (2024 — Present). IPEIM — classes préparatoires (2022 — 2024)."
              />
              <InfoCard
                icon={<Sparkles className="h-5 w-5 text-indigo-400" />}
                title="Stage actuel — Pixelium"
                content='Projet « Consent-Aware Agent Commerce » : architecture multi-agents, protocoles A2A/AP2, broker de consentement.'
              />
              <InfoCard
                icon={<Sparkles className="h-5 w-5 text-violet-400" />}
                title="Stage précédent — Talan Tunisie"
                content="AI Engineering Intern (Summer Camp 2025) : LLMs, RL, RAG, multi-agents, A2A/MCP et pipelines de données."
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
}) {
  return (
    <motion.div
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5"
      whileHover={{ y: -3, borderColor: "rgba(99,102,241,0.3)" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <p className="text-sm leading-relaxed text-[var(--color-muted)]">{content}</p>
    </motion.div>
  );
}
