/**
 * Projets — les 4 projets phares (alignés avec le CV) d'abord,
 * puis les projets académiques.
 */
export type Project = {
  id: string;
  title: string;
  description: string;
  /** Résultats chiffrés affichés en premier */
  metrics?: string[];
  stack: string[];
  github: string;
  demo?: string;
  featured?: boolean;
  academic?: boolean;
  category: "ai" | "fullstack" | "backend" | "embedded" | "data";
};

export const projects: Project[] = [
  {
    id: "pixelium",
    title: "Pixelium — Consent Commerce",
    description:
      "Projet de stage (été 2026) : des agents IA font les achats pour l'utilisateur, mais doivent obtenir son consentement signé avant de payer. Broker de consentement, mandats Intent → Cart → Payment inspirés d'AP2 et journalisation des actions.",
    metrics: [
      "2 agents + 1 broker de consentement",
      "3 mandats signés HMAC-SHA256",
      "21 tests automatisés",
      "Déployé sur Azure (Docker, HTTPS)",
    ],
    stack: ["Python", "LangGraph", "FastAPI", "Node.js", "TypeScript", "React", "Docker", "Azure"],
    github: "https://github.com/Aladimassi/Pixelium",
    demo: "https://pixelium.duckdns.org",
    featured: true,
    category: "ai",
  },
  {
    id: "cryptoapp",
    title: "Data Minds — IA crypto & segmentation client",
    description:
      "Projet qui combine prédiction du sens d'évolution des prix (XGBoost), segmentation des traders, analyse de sentiment des actualités et un assistant RAG.",
    metrics: [
      "Classification haussier/baissier avec XGBoost",
      "Segmentation des traders (KMeans, DBSCAN)",
      "Analyse de sentiment des actualités avec cache",
    ],
    stack: ["Python", "XGBoost", "scikit-learn", "LangChain", "ChromaDB", "FastAPI", "React"],
    github: "https://github.com/Aladimassi/CRYPTOAPP",
    featured: true,
    category: "ai",
  },
  {
    id: "murag1",
    title: "MuRAG — RAG agentique multimodal",
    description:
      "Questions-réponses sur des documents (PDF, images, OCR) avec Gemini : classification des requêtes, agent planificateur, auto-réflexion et mémoire de conversation.",
    metrics: ["PDF, images et OCR", "Agent planificateur + auto-réflexion"],
    stack: ["Python", "Gemini", "RAG", "OCR", "FastAPI"],
    github: "https://github.com/Aladimassi/murag1",
    featured: true,
    category: "ai",
  },
  {
    id: "r-project",
    title: "Prévision du prix de l'or",
    description:
      "Série temporelle en R : décomposition, tests de stationnarité (ADF, KPSS), modèles ARIMA/SARIMA, intervalles de confiance à 80 % et 95 %, dashboard R Shiny.",
    metrics: ["Évaluation MAE, RMSE, MAPE", "Dashboard interactif Shiny"],
    stack: ["R", "ARIMA/SARIMA", "Shiny"],
    github: "https://github.com/Aladimassi/R-PROJECT",
    featured: true,
    category: "data",
  },
  {
    id: "personal-budget",
    title: "Coach financier intelligent",
    description:
      "Analyse budgétaire, aide à la décision d'achat (« Puis-je acheter ? »), plan d'épargne automatique et suggestions adaptées au budget restant.",
    stack: ["Python", "Flask", "SQLite", "Pandas", "pytest"],
    github: "https://github.com/Aladimassi/personal-budget",
    academic: true,
    category: "data",
  },
  {
    id: "taf-v2",
    title: "TAV Airports — Gestion de stock",
    description:
      "Gestion de stock multi-départements (Administration, Production, Qualité, Maintenance) : entrées/sorties, import Excel et dashboard.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    github: "https://github.com/Aladimassi/taf-v2",
    academic: true,
    category: "fullstack",
  },
  {
    id: "mindshift",
    title: "MindShift — Santé mentale",
    description:
      "Plateforme de soutien en santé mentale (hackathon, 6e sur 32 équipes) : accueil, aide, dons et authentification.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    github: "https://github.com/Aladimassi/mindshift",
    academic: true,
    category: "fullstack",
  },
  {
    id: "padelapp",
    title: "PadelApp",
    description: "Application desktop JavaFX de gestion de courts de padel, avec persistance MySQL.",
    stack: ["Java", "JavaFX", "MySQL", "Maven"],
    github: "https://github.com/Aladimassi/padelapp",
    academic: true,
    category: "fullstack",
  },
  {
    id: "la-gestion-de-zoo",
    title: "Gestion de zoo",
    description: "Application Java orientée objet de gestion d'un parc zoologique (animaux, enclos, opérations).",
    stack: ["Java", "POO", "Maven"],
    github: "https://github.com/Aladimassi/la-gestion-de-zoo",
    academic: true,
    category: "backend",
  },
  {
    id: "parky",
    title: "Parky — Gestion de parking",
    description: "Application de gestion de parking en C avec interface GTK/Glade.",
    stack: ["C", "GTK", "Glade", "Linux"],
    github: "https://github.com/Aladimassi/parky",
    academic: true,
    category: "embedded",
  },
  {
    id: "charging-stations",
    title: "Stations de recharge EV",
    description:
      "Système embarqué de gestion de stations de recharge pour véhicules électriques sur microcontrôleur PIC (C / Assembleur).",
    stack: ["C", "Assembleur", "PIC"],
    github:
      "https://github.com/Aladimassi/Syst-me-de-gestion-des-stations-de-recharge-de-v-hicules-lectriques",
    academic: true,
    category: "embedded",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const academicProjects = projects.filter((p) => p.academic);
