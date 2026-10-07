type Lang = "fr" | "en";

const T = {
  fr: {
    user: "Utilisateur",
    userSub: "valide chaque étape",
    broker: "Broker de consentement",
    brokerSub: "point de contrôle unique",
    sign: "Signe les mandats (HMAC-SHA256)",
    guard: "Garde-fous anti-injection",
    rag: "Assistant RAG (Groq)",
    product: "Agent produit",
    productSub: "recherche, panier",
    payment: "Agent paiement",
    paymentSub: "paiement simulé",
    audit: "Journal d'audit",
    auditSub: "MySQL, chaque mandat",
    chain: "Intent → Cart → Payment",
    caption: "Architecture de Pixelium : aucun agent ne parle à l'utilisateur ni ne paie sans passer par le broker.",
  },
  en: {
    user: "User",
    userSub: "approves each step",
    broker: "Consent broker",
    brokerSub: "single point of control",
    sign: "Signs mandates (HMAC-SHA256)",
    guard: "Prompt-injection guardrails",
    rag: "RAG assistant (Groq)",
    product: "Product agent",
    productSub: "search, cart",
    payment: "Payment agent",
    paymentSub: "simulated payment",
    audit: "Audit log",
    auditSub: "MySQL, every mandate",
    chain: "Intent → Cart → Payment",
    caption: "Pixelium architecture: no agent talks to the user or pays without going through the broker.",
  },
} as const;

/** Pixelium consent-commerce architecture, drawn as inline SVG (theme-aware). */
export function PixeliumDiagram({ lang = "fr" }: { lang?: Lang }) {
  const t = T[lang];
  return (
    <figure className="mt-4">
      <svg
        viewBox="0 30 640 260"
        role="img"
        aria-label={t.caption}
        className="h-auto w-full text-slate-700 dark:text-slate-300"
      >
        <defs>
          <marker id="pxArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" className="fill-slate-500 dark:fill-slate-400" />
          </marker>
        </defs>

        {/* User */}
        <rect x="16" y="112" width="120" height="64" rx="10" className="fill-white stroke-slate-300 dark:fill-slate-900 dark:stroke-slate-700" />
        <text x="76" y="140" textAnchor="middle" className="fill-current text-[13px] font-semibold">{t.user}</text>
        <text x="76" y="158" textAnchor="middle" className="fill-slate-500 text-[11px]">{t.userSub}</text>

        {/* Broker */}
        <rect x="200" y="60" width="210" height="168" rx="12" className="fill-indigo-50 stroke-indigo-300 dark:fill-indigo-950/60 dark:stroke-indigo-800" />
        <text x="305" y="86" textAnchor="middle" className="fill-indigo-900 text-[13px] font-semibold dark:fill-indigo-200">{t.broker}</text>
        <text x="305" y="103" textAnchor="middle" className="fill-indigo-700 text-[11px] dark:fill-indigo-300">{t.brokerSub}</text>
        {[t.sign, t.guard, t.rag].map((line, i) => (
          <g key={line}>
            <rect x="208" y={118 + i * 34} width="194" height="26" rx="6" className="fill-white stroke-indigo-200 dark:fill-slate-900 dark:stroke-indigo-900" />
            <text x="305" y={135 + i * 34} textAnchor="middle" className="fill-current text-[11px]">{line}</text>
          </g>
        ))}

        {/* Agents */}
        <rect x="480" y="40" width="144" height="56" rx="10" className="fill-white stroke-slate-300 dark:fill-slate-900 dark:stroke-slate-700" />
        <text x="552" y="64" textAnchor="middle" className="fill-current text-[13px] font-semibold">{t.product}</text>
        <text x="552" y="81" textAnchor="middle" className="fill-slate-500 text-[11px]">{t.productSub}</text>

        <rect x="480" y="116" width="144" height="56" rx="10" className="fill-white stroke-slate-300 dark:fill-slate-900 dark:stroke-slate-700" />
        <text x="552" y="140" textAnchor="middle" className="fill-current text-[13px] font-semibold">{t.payment}</text>
        <text x="552" y="157" textAnchor="middle" className="fill-slate-500 text-[11px]">{t.paymentSub}</text>

        <rect x="480" y="200" width="144" height="56" rx="10" className="fill-amber-50 stroke-amber-300 dark:fill-amber-950/40 dark:stroke-amber-800" />
        <text x="552" y="224" textAnchor="middle" className="fill-current text-[13px] font-semibold">{t.audit}</text>
        <text x="552" y="241" textAnchor="middle" className="fill-slate-500 text-[11px]">{t.auditSub}</text>

        {/* Arrows */}
        <line x1="138" y1="144" x2="196" y2="144" className="stroke-slate-500 dark:stroke-slate-400" strokeWidth="1.5" markerEnd="url(#pxArrow)" markerStart="url(#pxArrow)" />
        <text x="167" y="134" textAnchor="middle" className="fill-slate-500 text-[10px]">{lang === "fr" ? "mandats" : "mandates"}</text>
        <line x1="412" y1="100" x2="476" y2="72" className="stroke-slate-500 dark:stroke-slate-400" strokeWidth="1.5" markerEnd="url(#pxArrow)" />
        <line x1="412" y1="144" x2="476" y2="144" className="stroke-slate-500 dark:stroke-slate-400" strokeWidth="1.5" markerEnd="url(#pxArrow)" />
        <line x1="412" y1="190" x2="476" y2="222" className="stroke-slate-500 dark:stroke-slate-400" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#pxArrow)" />

        <text x="305" y="256" textAnchor="middle" className="fill-indigo-800 text-[12px] font-semibold dark:fill-indigo-300">{t.chain}</text>
        <text x="305" y="276" textAnchor="middle" className="fill-slate-500 text-[11px]">HMAC-SHA256 · A2A · LangGraph</text>
      </svg>
      <figcaption className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t.caption}</figcaption>
    </figure>
  );
}
