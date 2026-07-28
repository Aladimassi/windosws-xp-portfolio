import { profile } from "../../../data/profile";

const WELCOME_TEXT = `╔══════════════════════════════════════════╗
║      Welcome to Ala Dimassi's PC         ║
║            Microsoft Windows 98           ║
╚══════════════════════════════════════════╝

Hello! I'm ${profile.name}.
${profile.title}

Location: ${profile.location}
School:   ESPRIT — Computer Science Engineering

────────────────────────────────────────────

EXPLORE THE DESKTOP:

  [About Ala Dimassi] → System Properties & bio
  [My Projects]   → GitHub repos (Explorer)
  [Skills]        → Control Panel applets
  [Work History]  → Internships & experience
  [Contact]       → Send me a message
  [My CV]         → Download resume

TIP: Use the Start menu or double-click icons.

Thanks for visiting — enjoy the nostalgia!
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
      <p className="w98-recycle-title">Recycle Bin</p>
      <p className="w98-recycle-sub">
        The Recycle Bin is empty.
        <br />
        No bugs were harmed building this portfolio.
      </p>
    </div>
  );
}
