import type { IconType } from "react-icons";
import { FaJava } from "react-icons/fa";
import {
  SiAngular,
  SiApachemaven,
  SiC,
  SiCss,
  SiDotnet,
  SiFastapi,
  SiFlask,
  SiGit,
  SiGithub,
  SiGooglegemini,
  SiHtml5,
  SiJavascript,
  SiJupyter,
  SiLangchain,
  SiMysql,
  SiN8N,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPython,
  SiR,
  SiReact,
  SiReactrouter,
  SiScikitlearn,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { BarChart3, Bot, Brain, Cpu, Database, FileSpreadsheet, Workflow } from "lucide-react";
import { cn } from "./utils";

type TechEntry = {
  icon: IconType;
  color: string;
};

/** Wrapper Lucide → react-icons compatible */
function lucideIcon(
  Icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>,
): IconType {
  const Wrapped: IconType = ({ size, className, style }) => (
    <Icon
      size={typeof size === "number" ? size : 18}
      className={className}
      style={style}
    />
  );
  return Wrapped;
}

const ALIASES: Record<string, string> = {
  "tailwind css": "tailwindcss",
  "node.js": "nodejs",
  "next.js": "nextjs",
  "spring boot": "springboot",
  "gemini ai": "gemini",
  "llms / gemini": "gemini",
  llms: "gemini",
  "rag / chromadb": "rag",
  "git / github": "github",
  "talend / etl": "etl",
  "a2a / mcp": "agents",
  a2a: "agents",
  ap2: "agents",
  "multi-agent": "agents",
  "multi-agent systems": "agents",
  "react router": "reactrouter",
  "angular 18": "angular",
  "json server": "json",
  javafx: "java",
  ".net": "dotnet",
  net: "dotnet",
  html: "html",
  "html/css": "html",
  xlsx: "excel",
  shiny: "r",
  "time series": "data",
  forecasting: "data",
  "data visualization": "powerbi",
  dax: "powerbi",
  oop: "java",
  gtk: "java",
  glade: "java",
  linux: "c",
  pic: "embedded",
  assembly: "c",
  multimodal: "gemini",
  "reinforcement learning": "ml",
  "machine learning": "ml",
  ml: "ml",
  "rest apis": "nodejs",
};

function normalizeTech(name: string): string {
  const lower = name.toLowerCase().trim();
  if (ALIASES[lower]) return ALIASES[lower];
  return lower.replace(/[\s./-]/g, "");
}

const TECH_ICONS: Record<string, TechEntry> = {
  python: { icon: SiPython, color: "#3776AB" },
  java: { icon: FaJava, color: "#ED8B00" },
  javascript: { icon: SiJavascript, color: "#F7DF1E" },
  typescript: { icon: SiTypescript, color: "#3178C6" },
  mysql: { icon: SiMysql, color: "#4479A1" },
  sql: { icon: SiMysql, color: "#4479A1" },
  c: { icon: SiC, color: "#A8B9CC" },
  react: { icon: SiReact, color: "#61DAFB" },
  nextjs: { icon: SiNextdotjs, color: "#ffffff" },
  angular: { icon: SiAngular, color: "#DD0031" },
  tailwindcss: { icon: SiTailwindcss, color: "#06B6D4" },
  vite: { icon: SiVite, color: "#646CFF" },
  fastapi: { icon: SiFastapi, color: "#009688" },
  springboot: { icon: SiSpringboot, color: "#6DB33F" },
  flask: { icon: SiFlask, color: "#ffffff" },
  dotnet: { icon: SiDotnet, color: "#512BD4" },
  nodejs: { icon: SiNodedotjs, color: "#339933" },
  xgboost: { icon: SiPython, color: "#00B4D8" },
  scikitlearn: { icon: SiScikitlearn, color: "#F7931E" },
  langchain: { icon: SiLangchain, color: "#1C3C3C" },
  rag: { icon: lucideIcon(Database), color: "#818CF8" },
  gemini: { icon: SiGooglegemini, color: "#8E75B2" },
  powerbi: { icon: lucideIcon(BarChart3), color: "#F2C811" },
  github: { icon: SiGithub, color: "#ffffff" },
  git: { icon: SiGit, color: "#F05032" },
  etl: { icon: lucideIcon(Workflow), color: "#06B6D4" },
  n8n: { icon: SiN8N, color: "#EA4B71" },
  agents: { icon: lucideIcon(Bot), color: "#A78BFA" },
  maven: { icon: SiApachemaven, color: "#C71A36" },
  jupyter: { icon: SiJupyter, color: "#F37626" },
  html: { icon: SiHtml5, color: "#E34F26" },
  css: { icon: SiCss, color: "#1572B6" },
  reactrouter: { icon: SiReactrouter, color: "#CA4245" },
  excel: { icon: lucideIcon(FileSpreadsheet), color: "#217346" },
  r: { icon: SiR, color: "#276DC3" },
  ml: { icon: lucideIcon(Brain), color: "#F472B6" },
  data: { icon: lucideIcon(Database), color: "#38BDF8" },
  embedded: { icon: lucideIcon(Cpu), color: "#FBBF24" },
  json: { icon: SiJavascript, color: "#F7DF1E" },
  openjdk: { icon: SiOpenjdk, color: "#ED8B00" },
};

/** Résout l'icône et la couleur pour une technologie */
export function getTechIcon(name: string): TechEntry {
  const key = normalizeTech(name);
  return TECH_ICONS[key] ?? { icon: lucideIcon(Database), color: "#6366f1" };
}

type TechIconProps = {
  name: string;
  size?: number;
  className?: string;
  showColor?: boolean;
};

/** Icône de technologie avec couleur de marque */
export function TechIcon({ name, size = 18, className, showColor = true }: TechIconProps) {
  const { icon: Icon, color } = getTechIcon(name);
  return (
    <Icon
      size={size}
      className={cn("shrink-0", className)}
      style={showColor ? { color } : undefined}
      aria-hidden
    />
  );
}
