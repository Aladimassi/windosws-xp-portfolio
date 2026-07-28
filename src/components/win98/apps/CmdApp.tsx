import { useCallback, useRef, useState, type KeyboardEvent } from "react";
import { projects } from "../../../data/projects";
import { profile } from "../../../data/profile";
import { type AppId, useWindowManager } from "../../../hooks/useWindowManager";

type Line = { type: "in" | "out" | "err"; text: string };

export function CmdApp({ onBsod }: { onBsod?: () => void }) {
  const { openWindow } = useWindowManager();
  const [lines, setLines] = useState<Line[]>([
    { type: "out", text: "Microsoft(R) Windows 98" },
    { type: "out", text: "   (C) Copyright Microsoft Corp 1981-1998." },
    { type: "out", text: "" },
    { type: "out", text: 'Type "help" for commands.' },
    { type: "out", text: "" },
  ]);
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  const append = useCallback((newLines: Line[]) => {
    setLines((prev) => [...prev, ...newLines]);
    setTimeout(() => {
      bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight);
    }, 0);
  }, []);

  const run = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      const lower = cmd.toLowerCase();
      append([{ type: "in", text: `C:\\Users\\Ala>${cmd}` }]);

      if (!cmd) return;

      const openMap: Record<string, AppId> = {
        about: "about",
        projects: "projects",
        skills: "skills",
        contact: "contact",
        minesweeper: "minesweeper",
        winmine: "minesweeper",
        snake: "snake",
        tetris: "tetris",
        solitaire: "solitaire",
        pong: "pong",
        breakout: "breakout",
        game2048: "game2048",
        memory: "memory",
        invaders: "invaders",
        paint: "paint",
        ie: "ie",
        iexplore: "ie",
        chat: "chat",
        msn: "chat",
        guestbook: "guestbook",
        cv: "cvviewer",
        display: "display",
        network: "network",
        sysmon: "sysmon",
        assistant: "assistant",
        notepad: "notepad",
      };

      if (lower === "help") {
        append([
          { type: "out", text: "Available commands:" },
          { type: "out", text: "  help dir cls ver whoami date time" },
          { type: "out", text: "  projects contact github email" },
          { type: "out", text: "  open <app>  — about, snake, ie, paint..." },
          { type: "out", text: "  start <url> — open in IE" },
        ]);
      } else if (lower === "cls") {
        setLines([]);
      } else if (lower === "dir") {
        projects.forEach((p) => {
          append([{ type: "out", text: ` ${p.id.padEnd(16)} ${p.title}` }]);
        });
      } else if (lower === "whoami") {
        append([
          { type: "out", text: profile.name },
          { type: "out", text: profile.title },
          { type: "out", text: profile.school },
        ]);
      } else if (lower === "ver") {
        append([{ type: "out", text: "Microsoft Windows 98 [Version 4.10.1998]" }]);
        append([{ type: "out", text: "Registered to: Ala Dimassi" }]);
      } else if (lower === "date" || lower === "time") {
        append([{ type: "out", text: new Date().toLocaleString("fr-FR") }]);
      } else if (lower === "projects") {
        openWindow("projects");
      } else if (lower === "contact") {
        openWindow("contact");
      } else if (lower === "github") {
        window.open(profile.github, "_blank");
        append([{ type: "out", text: profile.github }]);
      } else if (lower === "email") {
        append([{ type: "out", text: profile.email }]);
      } else if (lower === "bsod") {
        onBsod?.();
        append([{ type: "err", text: "A fatal exception 0E has occurred..." }]);
      } else if (lower.startsWith("echo ")) {
        append([{ type: "out", text: cmd.slice(5) }]);
      } else if (lower.startsWith("open ")) {
        const app = lower.slice(5).trim();
        if (openMap[app]) openWindow(openMap[app]!);
        else append([{ type: "err", text: `Cannot open '${app}'` }]);
      } else if (lower.startsWith("start ")) {
        const url = cmd.slice(6).trim();
        window.open(url.startsWith("http") ? url : `https://${url}`, "_blank");
      } else {
        append([{ type: "err", text: `'${cmd}' is not recognized.` }]);
      }
      append([{ type: "out", text: "" }]);
    },
    [append, openWindow, onBsod],
  );

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    }
  };

  return (
    <div className="w98-cmd">
      <div ref={bodyRef} className="w98-cmd-body w98-inset">
        {lines.map((line, i) => (
          <div key={i} className={`w98-cmd-line w98-cmd-line--${line.type}`}>
            {line.text}
          </div>
        ))}
      </div>
      <div className="w98-cmd-input-row">
        <span>C:\Users\Ala&gt;</span>
        <input
          className="w98-cmd-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          autoFocus
          spellCheck={false}
        />
      </div>
    </div>
  );
}
