/**
 * Compétences techniques — CV + projets GitHub.
 */
export type SkillCategory = {
  title: string;
  skills: { name: string }[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "Python" },
      { name: "Java" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "SQL" },
      { name: "C" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Angular" },
      { name: "Tailwind CSS" },
      { name: "Vite" },
      { name: "JavaFX" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "FastAPI" },
      { name: "Spring Boot" },
      { name: "Flask" },
      { name: ".NET" },
      { name: "Node.js" },
      { name: "MySQL" },
    ],
  },
  {
    title: "Data / AI",
    skills: [
      { name: "XGBoost" },
      { name: "scikit-learn" },
      { name: "LangChain" },
      { name: "RAG / ChromaDB" },
      { name: "LLMs / Gemini" },
      { name: "Power BI" },
    ],
  },
  {
    title: "DevOps / Tools",
    skills: [
      { name: "Git / GitHub" },
      { name: "Talend / ETL" },
      { name: "n8n" },
      { name: "A2A / MCP" },
      { name: "Maven" },
    ],
  },
];
