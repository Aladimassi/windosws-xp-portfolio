import { useState } from "react";
import { profile } from "../../../data/profile";
import { featuredProjects } from "../../../data/projects";

type Msg = { from: "ala" | "you"; text: string };

const GREETINGS: Msg[] = [
  { from: "ala", text: `Salut ! 👋 Je suis ${profile.name.split(" ")[0]}. Posez-moi une question sur mes projets, mes stages, mes compétences ou mon PFE.` },
];

function reply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("pfe") || q.includes("recrut") || q.includes("dispo")) {
    return `Je recherche un ${profile.target}. Écrivez-moi : ${profile.email}`;
  }
  if (q.includes("project") || q.includes("projet")) {
    const names = featuredProjects.map((p) => p.title.split("—")[0]?.trim()).join(", ");
    return `Mes projets phares : ${names}. Ouvrez « Projets » pour les détails et les résultats.`;
  }
  if (q.includes("skill") || q.includes("compétence") || q.includes("tech")) {
    return "LLM, RAG, LangGraph, systèmes multi-agents, XGBoost, scikit-learn, Power BI, Talend, Docker, Azure… Voir « Compétences ».";
  }
  if (q.includes("stage") || q.includes("intern") || q.includes("exp")) {
    return "Pixelium (2026) : agents IA qui demandent le consentement signé de l'utilisateur. Talan Tunisie (2025) : LLM, RAG multimodal, multi-agents. Voir « Expérience ».";
  }
  if (q.includes("contact") || q.includes("email") || q.includes("mail")) {
    return `Email : ${profile.email} · Tél : ${profile.phone}`;
  }
  if (q.includes("cv") || q.includes("resume")) {
    return "Mon CV est sur le bureau : « Mon CV ».";
  }
  if (q.includes("esprit") || q.includes("school") || q.includes("école")) {
    return profile.school;
  }
  if (q.includes("hello") || q.includes("salut") || q.includes("bonjour") || q.includes("hi")) {
    return "Bonjour ! Tapez « projets », « stages », « PFE » ou « contact ».";
  }
  if (q.includes("game") || q.includes("jeu")) {
    return "Les jeux sont dans Démarrer → Jeux, ou dans le dossier « Jeux » du bureau.";
  }
  return "Essayez : projets, stages, compétences, PFE, contact ou CV.";
}

export function ChatApp() {
  const [messages, setMessages] = useState<Msg[]>(GREETINGS);
  const [input, setInput] = useState("");

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { from: "you", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { from: "ala", text: reply(text) }]);
    }, 600);
  };

  return (
    <div className="w98-chat">
      <div className="w98-chat-header w98-outset">
        <span className="w98-chat-status">● Online</span>
        <strong>{profile.name}</strong>
      </div>
      <div className="w98-chat-body w98-inset">
        {messages.map((m, i) => (
          <div key={i} className={`w98-chat-msg w98-chat-msg--${m.from}`}>
            <strong>{m.from === "ala" ? profile.name.split(" ")[0] : "You"}:</strong> {m.text}
          </div>
        ))}
      </div>
      <div className="w98-chat-input-row">
        <input
          className="w98-inset w98-chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message..."
        />
        <button type="button" className="w98-btn w98-outset" onClick={send}>
          Send
        </button>
      </div>
    </div>
  );
}

export function AssistantApp() {
  return <ChatApp />;
}
