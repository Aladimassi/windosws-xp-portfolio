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
  { label: "3½ Floppy (A:)", icon: "drive", action: "navigate", target: "a:" },
  { label: "Local Disk (C:)", icon: "drive", action: "navigate", target: "c:" },
  { label: "Network Neighborhood", icon: "network", appId: "network" },
];

const C_DRIVE_ITEMS: Item[] = [
  { label: "My Documents", icon: "folder", appId: "cvviewer" },
  { label: "Projects", icon: "folder", appId: "projects" },
  { label: "Control Panel", icon: "folder", appId: "skills" },
  { label: "Work History", icon: "folder", appId: "experience" },
  { label: "Games", icon: "folder", action: "navigate", target: "c:/games" },
  { label: "Internet Explorer", icon: "folder", appId: "ie" },
  { label: "About Ala", icon: "folder", appId: "about" },
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
  root: { path: "My Computer", title: "My Computer", items: ROOT_ITEMS },
  "c:": { path: "C:\\", title: "Local Disk (C:)", items: C_DRIVE_ITEMS },
  "c:/games": { path: "C:\\Games", title: "Games", items: GAME_ITEMS },
  "a:": {
    path: "A:\\",
    title: "3½ Floppy (A:)",
    items: [],
    empty: "Please insert a disk into drive A:",
  },
};

function ItemIcon({ type, size = 32 }: { type: Item["icon"]; size?: number }) {
  if (type === "drive") return <DriveIcon size={size} />;
  if (type === "network") return <ComputerIcon size={size} />;
  return <FolderIcon size={size} />;
}

export function MyComputerApp() {
  const { openWindow } = useWindowManager();
  const [view, setView] = useState("root");
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
            ↑ Up
          </button>
        )}
        <span className="w98-mycomputer-address">
          Address: <strong>{current.path}</strong>
        </span>
      </div>

      <p className="w98-mycomputer-hint">Double-click an item to open.</p>

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
