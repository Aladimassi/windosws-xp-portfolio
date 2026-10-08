/** English content for the recruiter view (?lang=en). French lives in the other data files. */
import type { Experience } from "./experience";

export const profileEn = {
  title: "AI & Data Engineering Student · Seeking a final-year internship",
  target: "Final-year internship (PFE) in Data & AI — 2027",
  location: "Monastir, Tunisia",
  languages: "Arabic (native) · French (B2) · English (B2)",
  tagline:
    "Computer science engineering student at ESPRIT, I build AI solutions that are reliable, traceable and deployed: LLMs, multimodal RAG, multi-agent systems, machine learning and BI. I am looking for a final-year internship in Data & AI: trustworthy AI, audit automation, document analysis or risk management.",
};

export const experiencesEn: Experience[] = [
  {
    company: "Pixelium",
    role: "AI Engineering Intern",
    period: "Summer 2026",
    location: "Tunisia",
    description:
      "Pixelium Consent Commerce: an e-commerce platform where AI agents shop on the user's behalf, but only with their explicit consent (human-in-the-loop, inspired by the AP2 protocol).",
    highlights: [
      "Multi-agent architecture: 2 Python agents (LangGraph, FastAPI) isolated behind a Node.js consent broker acting as the single point of control (A2A pattern).",
      "Chain of 3 HMAC-SHA256 signed mandates (Intent → Cart → Payment): no transaction without the user's explicit approval.",
      "Full audit trail: every mandate and broker operation is logged and viewable in an audit dashboard.",
      "Conversational RAG assistant (Groq LLM, MiniLM embeddings) with input and output prompt-injection guardrails.",
      "21 automated tests including adversarial ones; security review that found a critical issue (hard-coded JWT secret).",
      "Deployed on an Azure VM (Docker Compose, nginx HTTPS, Let's Encrypt).",
    ],
    technologies: ["Python", "LangGraph", "FastAPI", "Node.js", "TypeScript", "React", "MySQL", "Docker", "Azure"],
  },
  {
    company: "Talan Tunisie",
    role: "AI Engineering Intern (Summer Camp)",
    period: "Summer 2025",
    location: "Tunis",
    description:
      "Team project: a sales-strategy decision-support tool combining LLMs, RAG architectures and reinforcement learning.",
    highlights: [
      "MuRAG pipeline (multimodal RAG) combining Ollama / LLaMA 3.2 and Google Gemini Vision.",
      "Scraping and crawling pipelines to collect, clean and structure customer data.",
      "Explored multi-agent systems and the A2A and MCP protocols; wrote the technical report.",
      "Presented and pitched the work to stakeholders.",
    ],
    technologies: ["Python", "LangChain", "Ollama", "Gemini", "RAG", "MCP"],
  },
];

export const projectsEn: Record<string, { title: string; description: string; metrics?: string[] }> = {
  pixelium: {
    title: "Pixelium — Consent Commerce",
    description:
      "AI agents that shop for the user but never pay without signed consent. Consent broker, AP2-inspired Intent → Cart → Payment mandate chain, full audit trail. Internship project (summer 2026).",
    metrics: [
      "2 isolated agents + 1 broker, single point of control",
      "3 HMAC-SHA256 signed mandates",
      "21 automated tests, including adversarial tests",
      "Deployed on Azure (Docker, HTTPS)",
    ],
  },
  cryptoapp: {
    title: "Data Minds — Crypto AI & customer segmentation",
    description:
      "End-to-end platform: price-direction prediction (XGBoost), trader risk segmentation, news sentiment analysis and a RAG assistant.",
    metrics: [
      "Up/down price classification with XGBoost",
      "Trader segmentation (KMeans, DBSCAN)",
      "News sentiment analysis with caching",
    ],
  },
  murag1: {
    title: "MuRAG — Agentic multimodal RAG",
    description:
      "Document analysis (PDF, images, OCR) with Gemini: query classification, agent planning, self-reflection and conversation memory. Use cases: reviewing contracts, supporting documents and reports.",
    metrics: ["PDF, images and OCR", "Planning agent + self-reflection"],
  },
  "r-project": {
    title: "Gold price forecasting",
    description:
      "Time series in R: decomposition, stationarity tests (ADF, KPSS), ARIMA/SARIMA models, 80% and 95% confidence intervals, R Shiny dashboard.",
    metrics: ["Evaluated with MAE, RMSE, MAPE", "Interactive Shiny dashboard"],
  },
};

export const skillTitlesEn: Record<string, string> = {
  "IA & LLM": "AI & LLMs",
  "IA de confiance & sécurité": "Trustworthy AI & security",
  "Machine learning": "Machine learning",
  "Data & BI": "Data & BI",
  "Cloud & déploiement": "Cloud & deployment",
  "Langages & frameworks": "Languages & frameworks",
};
