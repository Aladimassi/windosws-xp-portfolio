/** English content for the recruiter view (?lang=en). French lives in the other data files. */
import type { Experience } from "./experience";

export const profileEn = {
  title: "AI & Data Engineering Student · Seeking a final-year internship",
  target: "Final-year internship (PFE) in Data & AI — 2027",
  location: "Monastir, Tunisia",
  languages: "Arabic (native) · French (B2) · English (B2)",
  tagline:
    "Computer science engineering student at ESPRIT, interested in applied AI: LLMs, RAG, multi-agent systems, machine learning and BI. I did two internships on these topics (Talan, Pixelium) and I am looking for a final-year internship in Data & AI for 2027.",
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
      "Multi-agent architecture: 2 Python agents (LangGraph, FastAPI) that go through a Node.js consent broker for every action.",
      "3 HMAC-SHA256 signed mandates (Intent → Cart → Payment), so no payment happens without the user's approval.",
      "Mandates and broker operations logged in MySQL and shown in an audit dashboard.",
      "RAG assistant (Groq LLM, MiniLM embeddings) with basic prompt-injection checks.",
      "21 automated tests; a security review led me to fix a hard-coded JWT secret.",
      "Deployed on an Azure VM (Docker Compose, nginx, HTTPS).",
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
      "Internship project (summer 2026): AI agents that shop for the user but need their signed consent before paying. Consent broker, AP2-inspired mandates (Intent → Cart → Payment) and action logging.",
    metrics: [
      "2 agents + 1 consent broker",
      "3 HMAC-SHA256 signed mandates",
      "21 automated tests",
      "Deployed on Azure (Docker, HTTPS)",
    ],
  },
  cryptoapp: {
    title: "Data Minds — Crypto AI & customer segmentation",
    description:
      "Project combining price-direction prediction (XGBoost), trader segmentation, news sentiment analysis and a RAG assistant.",
    metrics: [
      "Up/down price classification with XGBoost",
      "Trader segmentation (KMeans, DBSCAN)",
      "News sentiment analysis with caching",
    ],
  },
  murag1: {
    title: "MuRAG — Agentic multimodal RAG",
    description:
      "Question answering over documents (PDF, images, OCR) with Gemini: query classification, a planning agent, self-reflection and conversation memory.",
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
  "Machine learning": "Machine learning",
  "Data & BI": "Data & BI",
  "Cloud & déploiement": "Cloud & deployment",
  "Langages & frameworks": "Languages & frameworks",
};
