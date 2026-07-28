import { useState } from "react";
import { profile } from "../../../data/profile";
import { projects } from "../../../data/projects";

type Msg = { from: "ala" | "you"; text: string };

const GREETINGS: Msg[] = [
  { from: "ala", text: `Hey! 👋 I'm ${profile.name.split(" ")[0]}. Ask me about my projects, skills, or internships!` },
];

function reply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("project") || q.includes("projet")) {
    const names = projects.slice(0, 4).map((p) => p.title.split("—")[0]?.trim()).join(", ");
    return `I have ${projects.length} projects on GitHub! Featured: ${names}... Open "My Projects" to explore.`;
  }
  if (q.includes("skill") || q.includes("compétence") || q.includes("tech")) {
    return "Python, TypeScript, React, FastAPI, LangChain, RAG, XGBoost... Check Control Panel → Skills!";
  }
  if (q.includes("stage") || q.includes("intern") || q.includes("experience")) {
    return "Internships at Pixelium (A2A agent commerce) and Talan Tunisie (RAG/LLMs). See Work History!";
  }
  if (q.includes("contact") || q.includes("email") || q.includes("hire")) {
    return `Email me: ${profile.email} — or use the Contact app / Guestbook!`;
  }
  if (q.includes("cv") || q.includes("resume")) {
    return "Download my CV from the desktop or Documents menu!";
  }
  if (q.includes("esprit") || q.includes("school") || q.includes("école")) {
    return profile.school;
  }
  if (q.includes("hello") || q.includes("salut") || q.includes("bonjour") || q.includes("hi")) {
    return "Hello! Welcome to Ala Dimassi's Windows 98 desktop 😊 Type 'projects' or 'skills' to learn more.";
  }
  if (q.includes("game") || q.includes("jeu")) {
    return "Try Minesweeper, Snake, or Tetris from Start → Games!";
  }
  return "Hmm, try asking about: projects, skills, internships, contact, CV, or games!";
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
