/**
 * Compétences techniques — CV + projets GitHub.
 */
export type SkillCategory = {
  title: string;
  skills: { name: string; icon: string }[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "Python", icon: "Py" },
      { name: "Java", icon: "Jv" },
      { name: "JavaScript", icon: "JS" },
      { name: "TypeScript", icon: "TS" },
      { name: "SQL", icon: "SQL" },
      { name: "C", icon: "C" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: "⚛" },
      { name: "Next.js", icon: "N" },
      { name: "Angular", icon: "A" },
      { name: "Tailwind CSS", icon: "TW" },
      { name: "Vite", icon: "V" },
      { name: "JavaFX", icon: "FX" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "FastAPI", icon: "FA" },
      { name: "Spring Boot", icon: "SB" },
      { name: "Flask", icon: "Fl" },
      { name: ".NET", icon: "NET" },
      { name: "Node.js", icon: "N" },
      { name: "MySQL", icon: "DB" },
    ],
  },
  {
    title: "Data / AI",
    skills: [
      { name: "XGBoost", icon: "ML" },
      { name: "scikit-learn", icon: "SK" },
      { name: "LangChain", icon: "LC" },
      { name: "RAG / ChromaDB", icon: "RAG" },
      { name: "LLMs / Gemini", icon: "AI" },
      { name: "Power BI", icon: "BI" },
    ],
  },
  {
    title: "DevOps / Tools",
    skills: [
      { name: "Git / GitHub", icon: "Git" },
      { name: "Talend / ETL", icon: "ETL" },
      { name: "n8n", icon: "n8n" },
      { name: "A2A / MCP", icon: "A2A" },
      { name: "Maven", icon: "Mvn" },
    ],
  },
];
