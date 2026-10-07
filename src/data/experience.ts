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
    role: "Stagiaire Ingénieur IA",
    period: "Été 2026",
    location: "Tunisie",
    description:
      "Pixelium Consent Commerce : plateforme e-commerce où des agents IA achètent pour l'utilisateur, uniquement avec son consentement explicite (human-in-the-loop, inspiré du protocole AP2).",
    highlights: [
      "Architecture multi-agents : 2 agents Python (LangGraph, FastAPI) isolés derrière un broker de consentement Node.js, point de contrôle unique (pattern A2A).",
      "Chaîne de 3 mandats signés HMAC-SHA256 (Intent → Cart → Payment) : aucune transaction sans validation explicite de l'utilisateur.",
      "Piste d'audit complète : chaque mandat et opération journalisés en base, consultables dans un dashboard d'audit.",
      "Assistant conversationnel RAG (Groq LLM, embeddings MiniLM) avec garde-fous anti-injection en entrée et en sortie.",
      "21 tests automatisés dont des tests adverses ; revue de sécurité ayant détecté une faille critique (secret JWT codé en dur).",
      "Déploiement sur VM Azure (Docker Compose, nginx HTTPS, Let's Encrypt).",
    ],
    technologies: ["Python", "LangGraph", "FastAPI", "Node.js", "TypeScript", "React", "MySQL", "Docker", "Azure"],
  },
  {
    company: "Talan Tunisie",
    role: "AI Engineering Intern (Summer Camp)",
    period: "Été 2025",
    location: "Tunis",
    description:
      "Outil d'aide à la décision commerciale combinant LLM, architectures RAG et reinforcement learning, développé en équipe.",
    highlights: [
      "Pipeline MuRAG (RAG multimodal) combinant Ollama / LLaMA 3.2 et Google Gemini Vision.",
      "Pipelines de scraping et de crawling pour collecter, nettoyer et structurer les données clients.",
      "Exploration des systèmes multi-agents et des protocoles A2A et MCP ; rédaction du rapport technique.",
      "Présentation et pitch des travaux aux parties prenantes.",
    ],
    technologies: ["Python", "LangChain", "Ollama", "Gemini", "RAG", "MCP"],
  },
];
