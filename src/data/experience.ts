/** Expériences professionnelles (stages) — alignées avec le CV */
export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  technologies: string[];
};

export const experiences: Experience[] = [
  {
    company: "Pixelium",
    role: "Stagiaire — Software Engineering / AI",
    period: "2026 — En cours",
    location: "Tunisie",
    description:
      "Stage sur le projet « Consent-Aware Agent Commerce » — prototype de commerce agentique avec gestion du consentement.",
    highlights: [
      "Architecture multi-agents (e-commerce + payment) communiquant via protocole A2A",
      "Broker de consentement inspiré d'AP2 : chaîne de mandats Intent → Cart → Payment",
      "Journal d'audit et validation des transactions agent-to-agent",
    ],
    technologies: ["TypeScript", "Node.js", "A2A", "AP2", "Multi-Agent Systems"],
  },
  {
    company: "Talan Tunisie",
    role: "AI Engineering Intern — Summer Camp",
    period: "Été 2025",
    location: "Tunisie",
    description:
      "Outil de gestion de stratégie commerciale propulsé par l'IA, combinant LLMs, reinforcement learning et architectures RAG au sein d'une équipe.",
    highlights: [
      "Exploration des systèmes multi-agents et des protocoles A2A et MCP",
      "Pipelines de scraping et crawling pour collecter, nettoyer et structurer les données client",
      "Techniques MURAG pour améliorer la retrieval contextuelle et les workflows RAG",
      "Présentation et pitch des travaux techniques aux stakeholders",
    ],
    technologies: [
      "Python",
      "LangChain",
      "RAG",
      "LLMs",
      "Reinforcement Learning",
      "A2A",
      "MCP",
    ],
  },
];
