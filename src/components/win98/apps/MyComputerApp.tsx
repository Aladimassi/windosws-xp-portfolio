import { useState } from "react";
import { type AppId, useWindowManager } from "../../../hooks/useWindowManager";
import { ComputerIcon, DriveIcon, FolderIcon } from "../icons";

type Item = {
  label: string;
  icon: "drive" | "folder" | "network";
  action?: "navigate";
  target?: string;
  appId?: AppId;
};

const ROOT_ITEMS: Item[] = [
  { label: "Disquette 3½ (A:)", icon: "drive", action: "navigate", target: "a:" },
  { label: "Disque local (C:)", icon: "drive", action: "navigate", target: "c:" },
  { label: "Voisinage réseau", icon: "network", appId: "network" },
];

const C_DRIVE_ITEMS: Item[] = [
  { label: "Mon CV", icon: "folder", appId: "cvviewer" },
  { label: "Projets", icon: "folder", appId: "projects" },
  { label: "Compétences", icon: "folder", appId: "skills" },
  { label: "Expérience", icon: "folder", appId: "experience" },
  { label: "Jeux", icon: "folder", action: "navigate", target: "c:/games" },
  { label: "Internet Explorer", icon: "folder", appId: "ie" },
  { label: "À propos de moi", icon: "folder", appId: "about" },
];

const GAME_ITEMS: Item[] = [
  { label: "Minesweeper", icon: "folder", appId: "minesweeper" },
  { label: "Snake", icon: "folder", appId: "snake" },
  { label: "Tetris", icon: "folder", appId: "tetris" },
  { label: "Solitaire", icon: "folder", appId: "solitaire" },
  { label: "Pong", icon: "folder", appId: "pong" },
  { label: "Breakout", icon: "folder", appId: "breakout" },
  { label: "2048", icon: "folder", appId: "game2048" },
  { label: "Memory Match", icon: "folder", appId: "memory" },
  { label: "Space Invaders", icon: "folder", appId: "invaders" },
];

const VIEWS: Record<string, { path: string; title: string; items: Item[]; empty?: string }> = {
  root: { path: "Mon PC", title: "Mon PC", items: ROOT_ITEMS },
  "c:": { path: "C:\\", title: "Disque local (C:)", items: C_DRIVE_ITEMS },
  "c:/games": { path: "C:\\Jeux", title: "Jeux", items: GAME_ITEMS },
  "a:": {
    path: "A:\\",
    title: "Disquette 3½ (A:)",
    items: [],
    empty: "Insérez une disquette dans le lecteur A:",
  },
};

function ItemIcon({ type, size = 32 }: { type: Item["icon"]; size?: number }) {
  if (type === "drive") return <DriveIcon size={size} />;
  if (type === "network") return <ComputerIcon size={size} />;
  return <FolderIcon size={size} />;
}

export function MyComputerApp({ initialView = "root" }: { initialView?: string } = {}) {
  const { openWindow } = useWindowManager();
  const [view, setView] = useState(initialView);
  const current = VIEWS[view] ?? VIEWS.root;

  const goUp = () => {
    if (view === "c:/games") setView("c:");
    else if (view === "c:" || view === "a:") setView("root");
  };

  const open = (item: Item) => {
    if (item.action === "navigate" && item.target) {
      setView(item.target);
      return;
    }
    if (item.appId) openWindow(item.appId);
  };

  const canGoUp = view !== "root";

  return (
    <div className="w98-mycomputer">
      <div className="w98-mycomputer-bar w98-outset">
        {canGoUp && (
          <button type="button" className="w98-btn w98-outset" onClick={goUp}>
            ↑ Dossier parent
          </button>
        )}
        <span className="w98-mycomputer-address">
          Adresse : <strong>{current.path}</strong>
        </span>
      </div>

      <p className="w98-mycomputer-hint">Double-cliquez sur un élément pour l'ouvrir.</p>

      <fieldset className="w98-fieldset">
        <legend>{current.title}</legend>
        <div className="w98-mycomputer-grid">
          {current.items.map((item) => (
            <button
              key={item.label}
              type="button"
              className="w98-mycomputer-item"
              onDoubleClick={() => open(item)}
            >
              <ItemIcon type={item.icon} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        {current.empty && current.items.length === 0 && (
          <p className="w98-mycomputer-empty">{current.empty}</p>
        )}
      </fieldset>
    </div>
  );
}

/** Desktop "Jeux" folder: My Computer opened directly on C:\\Games. */
export function GamesApp() {
  return <MyComputerApp initialView="c:/games" />;
}
