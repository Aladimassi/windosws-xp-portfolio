/**
 * Compétences techniques — CV + projets GitHub.
 */
export type SkillCategory = {
  title: string;
  skills: { name: string }[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "IA & LLM",
    skills: [{ name: "RAG / RAG multimodal" }, { name: "LangChain" }, { name: "LangGraph" }, { name: "Multi-agents (A2A, MCP)" }, { name: "Gemini · Groq · Ollama" }, { name: "ChromaDB" }],
  },
  {
    title: "IA de confiance & sécurité",
    skills: [{ name: "Garde-fous anti-injection" }, { name: "Signature HMAC" }, { name: "Piste d'audit" }, { name: "Tests adverses" }, { name: "Revue de sécurité" }],
  },
  {
    title: "Machine learning",
    skills: [{ name: "XGBoost" }, { name: "SVM" }, { name: "scikit-learn" }, { name: "Clustering (KMeans, DBSCAN)" }, { name: "Séries temporelles (ARIMA)" }, { name: "MLflow" }],
  },
  {
    title: "Data & BI",
    skills: [{ name: "Power BI" }, { name: "Talend (ETL)" }, { name: "Data warehouse" }, { name: "SQL Server" }, { name: "MySQL · Oracle" }, { name: "n8n" }],
  },
  {
    title: "Cloud & déploiement",
    skills: [{ name: "Azure" }, { name: "Docker / Compose" }, { name: "nginx" }, { name: "Git / GitHub" }],
  },
  {
    title: "Langages & frameworks",
    skills: [{ name: "Python" }, { name: "Java" }, { name: "TypeScript" }, { name: "SQL" }, { name: "C" }, { name: "FastAPI" }, { name: "Spring Boot" }, { name: "Node.js" }, { name: "React" }, { name: "Angular" }],
  },
];
