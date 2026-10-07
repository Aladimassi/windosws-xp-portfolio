import { useEffect, useState } from "react";
import { experiences } from "../../data/experience";
import { academicProjects, featuredProjects } from "../../data/projects";
import { profile } from "../../data/profile";
import { experiencesEn, profileEn, projectsEn, skillTitlesEn } from "../../data/recruiterEn";
import { skillCategories } from "../../data/skills";
import { PixeliumDiagram } from "./PixeliumDiagram";

type Lang = "fr" | "en";

const UI = {
  fr: {
    nav: { experience: "Expérience", projects: "Projets", skills: "Compétences", contact: "Contact" },
    desktop: "Version Windows 98",
    cv: "Télécharger le CV",
    contactMe: "Me contacter",
    seeking: "Recherche :",
    experience: "Expérience",
    projects: "Projets phares",
    pixeliumZoom: "Zoom sur Pixelium",
    code: "Code sur GitHub →",
    demo: "Démo en ligne →",
    academic: "Projets académiques",
    skills: "Compétences",
    education: "Formation",
    certs: "Certifications IBM Machine Learning et Deep Learning (Coursera) · Hackathon : 6e sur 32 équipes.",
    contact: "Contact",
    contactText: "Disponible pour un PFE en Data & IA. Écrivez-moi à",
    or: "ou appelez le",
    footerDesktop: "Voir la version interactive Windows 98",
    mailSubject: "PFE Data & IA",
    education1: { degree: "Cycle ingénieur en informatique", period: "2024 — aujourd'hui", detail: "Cours : gestion de projet, ERP Odoo, administration de bases Oracle, RSE." },
    education2: { degree: "Classes préparatoires aux études d'ingénieur", period: "2022 — 2024" },
    docTitle: "Ala Dimassi — Élève ingénieur IA & Data",
  },
  en: {
    nav: { experience: "Experience", projects: "Projects", skills: "Skills", contact: "Contact" },
    desktop: "Windows 98 version",
    cv: "Download CV",
    contactMe: "Contact me",
    seeking: "Looking for:",
    experience: "Experience",
    projects: "Key projects",
    pixeliumZoom: "A closer look at Pixelium",
    code: "Code on GitHub →",
    demo: "Live demo →",
    academic: "Academic projects",
    skills: "Skills",
    education: "Education",
    certs: "IBM Machine Learning and Deep Learning certifications (Coursera) · Hackathon: 6th out of 32 teams.",
    contact: "Contact",
    contactText: "Available for a final-year internship in Data & AI. Email me at",
    or: "or call",
    footerDesktop: "See the interactive Windows 98 version",
    mailSubject: "Data & AI internship",
    education1: { degree: "Computer Science Engineering degree", period: "2024 — present", detail: "Courses: project management, Odoo ERP, Oracle database administration, CSR." },
    education2: { degree: "Preparatory classes for engineering schools", period: "2022 — 2024" },
    docTitle: "Ala Dimassi — AI & Data Engineering Student",
  },
} as const;

const DESKTOP_URL = "/?mode=desktop";

function initialLang(): Lang {
  const param = new URLSearchParams(window.location.search).get("lang");
  if (param === "en" || param === "fr") return param;
  return "fr";
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-slate-200 py-10 dark:border-slate-800">
      <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.14em] text-indigo-700 dark:text-indigo-300">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
      {children}
    </span>
  );
}

function LinkButton({
  href,
  children,
  primary,
  download,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  download?: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={
        primary
          ? "inline-flex items-center rounded-lg bg-indigo-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
          : "inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
      }
    >
      {children}
    </a>
  );
}

/** Classic one-page portfolio for recruiters and mobile visitors, in French or English. */
export function RecruiterView() {
  const [lang, setLang] = useState<Lang>(initialLang);
  const t = UI[lang];
  const p = lang === "en" ? { ...profile, ...profileEn } : profile;
  const exps = lang === "en" ? experiencesEn : experiences;
  const projects = featuredProjects.map((pr) => (lang === "en" ? { ...pr, ...projectsEn[pr.id] } : pr));

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = UI[lang].docTitle;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchLang = (next: Lang) => {
    setLang(next);
    document.documentElement.lang = next;
    document.title = UI[next].docTitle;
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState(null, "", url);
  };

  return (
    <div className="fixed inset-0 overflow-y-auto bg-white font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <nav className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="#top" className="text-sm font-bold tracking-tight">
            Ala Dimassi
          </a>
          <div className="hidden gap-5 text-sm text-slate-600 md:flex dark:text-slate-400">
            <a href="#experience" className="hover:text-slate-900 dark:hover:text-white">{t.nav.experience}</a>
            <a href="#projets" className="hover:text-slate-900 dark:hover:text-white">{t.nav.projects}</a>
            <a href="#competences" className="hover:text-slate-900 dark:hover:text-white">{t.nav.skills}</a>
            <a href="#contact" className="hover:text-slate-900 dark:hover:text-white">{t.nav.contact}</a>
          </div>
          <div className="flex items-center gap-2">
            <div role="group" aria-label="Langue / Language" className="flex overflow-hidden rounded-md border border-slate-300 text-xs font-semibold dark:border-slate-700">
              {(["fr", "en"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => switchLang(l)}
                  aria-pressed={lang === l}
                  className={
                    lang === l
                      ? "bg-slate-900 px-2.5 py-1 text-white dark:bg-slate-100 dark:text-slate-900"
                      : "px-2.5 py-1 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <a
              href={DESKTOP_URL}
              className="hidden rounded-md border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 sm:inline-block dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {t.desktop}
            </a>
          </div>
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
        <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center">
          <img
            src={profile.avatar}
            alt={profile.name}
            width={112}
            height={112}
            className="h-28 w-28 shrink-0 rounded-2xl object-cover ring-1 ring-slate-200 dark:ring-slate-800"
          />
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{profile.name}</h1>
            <p className="mt-1 text-lg text-slate-700 dark:text-slate-300">{p.title}</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {p.location} · ESPRIT · {p.languages}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <LinkButton href={profile.cvUrl} download={profile.cvFileName} primary>
                {t.cv}
              </LinkButton>
              <LinkButton href={`mailto:${profile.email}?subject=${encodeURIComponent(t.mailSubject)}`}>{t.contactMe}</LinkButton>
              <LinkButton href={profile.linkedin}>LinkedIn</LinkButton>
              <LinkButton href={profile.github}>GitHub</LinkButton>
            </div>
          </div>
        </div>

        <div className="mb-10 rounded-xl border border-indigo-200 bg-indigo-50 p-5 dark:border-indigo-900 dark:bg-indigo-950/40">
          <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
            {t.seeking} {p.target}
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">{p.tagline}</p>
        </div>

        <Section id="experience" title={t.experience}>
          <div className="space-y-8">
            {exps.map((exp) => (
              <article key={exp.company}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-lg font-semibold">
                    {exp.company} <span className="font-normal text-slate-600 dark:text-slate-400">— {exp.role}</span>
                  </h3>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {exp.period} · {exp.location}
                  </span>
                </div>
                <p className="mt-2 text-[15px] text-slate-700 dark:text-slate-300">{exp.description}</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] text-slate-700 marker:text-slate-400 dark:text-slate-300">
                  {exp.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="projets" title={t.projects}>
          <div className="mb-6 rounded-xl border border-slate-200 p-5 dark:border-slate-800">
            <h3 className="font-semibold">{t.pixeliumZoom}</h3>
            <PixeliumDiagram lang={lang} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((pr) => (
              <article key={pr.id} className="flex flex-col rounded-xl border border-slate-200 p-5 dark:border-slate-800">
                <h3 className="font-semibold">{pr.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{pr.description}</p>
                {pr.metrics && (
                  <ul className="mt-3 space-y-1 text-sm font-medium text-slate-900 dark:text-slate-100">
                    {pr.metrics.map((m) => (
                      <li key={m} className="flex gap-2">
                        <span aria-hidden className="text-indigo-600 dark:text-indigo-400">▸</span>
                        {m}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {pr.stack.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
                <div className="mt-auto flex gap-4 pt-4 text-sm font-semibold">
                  <a href={pr.github} target="_blank" rel="noopener noreferrer" className="text-indigo-700 hover:underline dark:text-indigo-300">
                    {t.code}
                  </a>
                  {pr.demo && (
                    <a href={pr.demo} target="_blank" rel="noopener noreferrer" className="text-indigo-700 hover:underline dark:text-indigo-300">
                      {t.demo}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          <details className="mt-6 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
            <summary className="cursor-pointer text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t.academic} ({academicProjects.length})
            </summary>
            <ul className="mt-3 space-y-2 text-sm">
              {academicProjects.map((pr) => (
                <li key={pr.id}>
                  <a href={pr.github} target="_blank" rel="noopener noreferrer" className="font-medium text-indigo-700 hover:underline dark:text-indigo-300">
                    {pr.title}
                  </a>{" "}
                  <span className="text-slate-600 dark:text-slate-400">— {pr.description}</span>
                </li>
              ))}
            </ul>
          </details>
        </Section>

        <Section id="competences" title={t.skills}>
          <dl className="grid gap-5 sm:grid-cols-2">
            {skillCategories.map((cat) => (
              <div key={cat.title}>
                <dt className="mb-2 text-sm font-semibold">{lang === "en" ? skillTitlesEn[cat.title] ?? cat.title : cat.title}</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {cat.skills.map((s) => (
                    <Tag key={s.name}>{s.name}</Tag>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="formation" title={t.education}>
          <div className="space-y-4">
            {[
              { school: "ESPRIT", ...t.education1 },
              { school: "IPEIM", ...t.education2 },
            ].map((e) => (
              <div key={e.school}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-semibold">
                    {e.school} <span className="font-normal text-slate-600 dark:text-slate-400">— {e.degree}</span>
                  </h3>
                  <span className="text-sm text-slate-500 dark:text-slate-400">{e.period}</span>
                </div>
                {"detail" in e && <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{e.detail}</p>}
              </div>
            ))}
            <p className="text-sm text-slate-700 dark:text-slate-300">{t.certs}</p>
          </div>
        </Section>

        <Section id="contact" title={t.contact}>
          <p className="text-[15px] text-slate-700 dark:text-slate-300">
            {t.contactText}{" "}
            <a href={`mailto:${profile.email}`} className="font-semibold text-indigo-700 hover:underline dark:text-indigo-300">
              {profile.email}
            </a>{" "}
            {t.or}{" "}
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="font-semibold text-indigo-700 hover:underline dark:text-indigo-300">
              {profile.phone}
            </a>
            .
          </p>
        </Section>
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        © {new Date().getFullYear()} Ala Dimassi ·{" "}
        <a href={DESKTOP_URL} className="hover:underline">
          {t.footerDesktop}
        </a>
      </footer>
    </div>
  );
}
