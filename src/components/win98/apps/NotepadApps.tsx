import { profile } from "../../../data/profile";

const WELCOME_TEXT = `BIENVENUE SUR LE PC DE ALA
══════════════════════════

${profile.name} — ${profile.title}
${profile.location} · ESPRIT, cycle ingénieur en informatique

EN BREF
  • Stage Pixelium (2026) : agents IA qui achètent
    uniquement avec le consentement signé de
    l'utilisateur — journalisation, tests, Azure.
  • Stage Talan Tunisie (2025) : LLM, RAG
    multimodal, systèmes multi-agents.
  • Projets : ML (XGBoost, clustering),
    RAG, séries temporelles, BI.

RECRUTEUR PRESSÉ ?
  → Double-cliquez sur [Vue recruteur]
    pour une version classique en une page.
  → [Mon CV] pour télécharger le CV.

Contact : ${profile.email}
`;

export function WelcomeApp() {
  return (
    <textarea
      className="w98-notepad w98-inset"
      readOnly
      value={WELCOME_TEXT}
      aria-label="Welcome message"
    />
  );
}

export function NotepadApp() {
  const text = `${profile.tagline}

────────────────────────────────────────────
CONTACT
  GitHub:   ${profile.github}
  LinkedIn: ${profile.linkedin}
  Website:  ${profile.website}
  Email:    ${profile.email}
  Phone:    ${profile.phone}
  CV:       ${profile.cvUrl}
`;

  return (
    <textarea className="w98-notepad w98-inset" readOnly value={text} aria-label="Readme" />
  );
}

export function RecycleApp() {
  return (
    <div className="w98-recycle-empty">
      <div className="w98-recycle-icon">🗑️</div>
      <p className="w98-recycle-title">Corbeille</p>
      <p className="w98-recycle-sub">
        La corbeille est vide.
        <br />
        Aucun bug n'a été maltraité pendant la création de ce portfolio.
      </p>
    </div>
  );
}
