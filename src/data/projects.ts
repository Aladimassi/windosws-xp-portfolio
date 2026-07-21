/**
 * Projets issus des dépôts publics GitHub d'Aladimassi.
 * Descriptions basées sur les README et la structure réelle des repos.
 */
export type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  github: string;
  demo?: string;
  featured?: boolean;
  category: "ai" | "fullstack" | "backend" | "embedded" | "data";
};

export const projects: Project[] = [
  {
    id: "pixelium",
    title: "Pixelium — Consent Commerce",
    description:
      "Prototype de commerce agentique consent-aware : deux agents A2A (e-commerce + paiement) communiquent via un broker de consentement avec chaîne de mandats AP2 (Intent → Cart → Payment).",
    stack: ["TypeScript", "Node.js", "A2A", "AP2", "Multi-Agent"],
    github: "https://github.com/Aladimassi/Pixelium",
    featured: true,
    category: "ai",
  },
  {
    id: "cryptoapp",
    title: "Data Minds — Analyse Crypto & Client",
    description:
      "Plateforme end-to-end combinant ML (XGBoost), IA (LangChain) et analyse de sentiments pour la prédiction des marchés crypto et la segmentation client.",
    stack: ["Python", "FastAPI", "React", "XGBoost", "LangChain"],
    github: "https://github.com/Aladimassi/CRYPTOAPP",
    featured: true,
    category: "ai",
  },
  {
    id: "murag1",
    title: "MuRAG1 — Multi-Agent RAG",
    description:
      "Système RAG agentique avancé avec classification de requêtes, planification adaptative, auto-réflexion et traitement multimodal (PDF, images, OCR) via Gemini AI.",
    stack: ["Python", "Gemini AI", "RAG", "LangChain", "Multimodal"],
    github: "https://github.com/Aladimassi/murag1",
    featured: true,
    category: "ai",
  },
  {
    id: "personal-budget",
    title: "Coach Financier Intelligent",
    description:
      "Application de coaching financier personnel : analyse budgétaire, décision d'achat instantanée (« Puis-je acheter ? »), plan d'épargne automatique et suggestions adaptées.",
    stack: ["Python", "Flask", "HTML", "Gemini AI"],
    github: "https://github.com/Aladimassi/personal-budget",
    featured: true,
    category: "ai",
  },
  {
    id: "taf-v2",
    title: "TAV Airports — Gestion de Stock v2",
    description:
      "Système de gestion de stock multi-départements (Administration, Production, Qualité, Maintenance, Technique) avec dashboard, entrées/sorties et import Excel.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "XLSX"],
    github: "https://github.com/Aladimassi/taf-v2",
    featured: true,
    category: "fullstack",
  },
  {
    id: "mindshift",
    title: "MindShift",
    description:
      "Application web React pour le bien-être mental : pages d'accueil, aide, dons et authentification (inscription/connexion). Interface moderne avec routing.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "React Router"],
    github: "https://github.com/Aladimassi/mindshift",
    featured: true,
    category: "fullstack",
  },
  {
    id: "test-erp",
    title: "Gestion des Jardins",
    description:
      "Application Angular CRUD pour la gestion des jardins (adresse, surface, date d'entrée, statut) avec validation, recherche et API JSON Server.",
    stack: ["Angular 18", "TypeScript", "JSON Server"],
    github: "https://github.com/Aladimassi/test-ala-dimassi-4bi-erp-4",
    category: "fullstack",
  },
  {
    id: "padelapp",
    title: "PadelApp",
    description:
      "Application desktop JavaFX de gestion de courts de padel avec connexion MySQL — interface graphique et persistance des données.",
    stack: ["Java", "JavaFX", "MySQL", "Maven"],
    github: "https://github.com/Aladimassi/padelapp",
    category: "fullstack",
  },
  {
    id: "taf",
    title: "TAV Airports — Gestion de Stock",
    description:
      "Première version du système de gestion de stock TAV Airports : accès par département, suivi entrées/sorties et dashboard statistiques.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    github: "https://github.com/Aladimassi/taf",
    category: "fullstack",
  },
  {
    id: "mlprojectrrr",
    title: "ML Project — Prédiction & RAG",
    description:
      "Projet ML combinant notebooks Jupyter, modèles de prédiction et pipeline RAG. Exploration de deep learning et régression.",
    stack: ["Python", "Jupyter", "TypeScript", "RAG", "ML"],
    github: "https://github.com/Aladimassi/mlprojectrrr",
    category: "ai",
  },
  {
    id: "r-project",
    title: "Série Temporelle — Prix de l'Or",
    description:
      "Étude complète de série temporelle des prix de l'or en R : exploration, tests statistiques, modélisation ARIMA et application Shiny interactive.",
    stack: ["R", "Shiny", "Time Series", "Forecasting"],
    github: "https://github.com/Aladimassi/R-PROJECT",
    category: "data",
  },
  {
    id: "la-gestion-de-zoo",
    title: "Gestion de Zoo",
    description:
      "Application Java de gestion d'un parc zoologique — gestion des animaux, enclos et opérations du zoo (projet académique ESPRIT).",
    stack: ["Java", "OOP", "Maven"],
    github: "https://github.com/Aladimassi/la-gestion-de-zoo",
    category: "backend",
  },
  {
    id: "parky",
    title: "Parky — Application de Parking",
    description:
      "Application de gestion de parking développée en C avec interface GTK/Glade. Gestion des places et suivi des véhicules.",
    stack: ["C", "GTK", "Glade", "Linux"],
    github: "https://github.com/Aladimassi/parky",
    category: "embedded",
  },
  {
    id: "charging-stations",
    title: "Stations de Recharge EV",
    description:
      "Système embarqué de gestion de stations de recharge pour véhicules électriques — programmation bas niveau sur microcontrôleur PIC (C/Assembly).",
    stack: ["C", "Assembly", "PIC", "Embedded"],
    github:
      "https://github.com/Aladimassi/Syst-me-de-gestion-des-stations-de-recharge-de-v-hicules-lectriques",
    category: "embedded",
  },
  {
    id: "biii",
    title: "Projet Business Intelligence",
    description:
      "Tableau de bord Power BI pour l'analyse et la visualisation de données métier (fichier .pbix).",
    stack: ["Power BI", "DAX", "Data Visualization"],
    github: "https://github.com/Aladimassi/BIII-",
    category: "data",
  },
];
