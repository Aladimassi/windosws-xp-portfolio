export type AppId =
  | "about" | "projects" | "skills" | "experience" | "contact"
  | "welcome" | "notepad" | "recycle" | "minesweeper"
  | "snake" | "tetris" | "solitaire" | "pong" | "breakout" | "game2048" | "memory" | "invaders"
  | "paint" | "mycomputer" | "cmd"
  | "ie" | "chat" | "cvviewer" | "guestbook" | "display" | "network"
  | "sysmon" | "assistant";

export type WindowConfig = {
  id: AppId;
  title: string;
  defaultWidth: number;
  defaultHeight: number;
  defaultX: number;
  defaultY: number;
};

export const WINDOW_CONFIGS: Record<AppId, WindowConfig> = {
  welcome: { id: "welcome", title: "Welcome.txt — Notepad", defaultWidth: 420, defaultHeight: 320, defaultX: 80, defaultY: 40 },
  about: { id: "about", title: "System Properties — Ala Dimassi", defaultWidth: 480, defaultHeight: 380, defaultX: 120, defaultY: 60 },
  projects: { id: "projects", title: "C:\\Projects", defaultWidth: 580, defaultHeight: 420, defaultX: 160, defaultY: 80 },
  skills: { id: "skills", title: "Control Panel — Skills", defaultWidth: 440, defaultHeight: 360, defaultX: 200, defaultY: 100 },
  experience: { id: "experience", title: "Work History", defaultWidth: 460, defaultHeight: 380, defaultX: 140, defaultY: 70 },
  contact: { id: "contact", title: "Internet Mail — Contact", defaultWidth: 400, defaultHeight: 340, defaultX: 180, defaultY: 90 },
  notepad: { id: "notepad", title: "readme.txt — Notepad", defaultWidth: 400, defaultHeight: 300, defaultX: 220, defaultY: 120 },
  recycle: { id: "recycle", title: "Recycle Bin", defaultWidth: 360, defaultHeight: 240, defaultX: 260, defaultY: 140 },
  minesweeper: { id: "minesweeper", title: "Minesweeper", defaultWidth: 280, defaultHeight: 400, defaultX: 100, defaultY: 50 },
  snake: { id: "snake", title: "Snake", defaultWidth: 320, defaultHeight: 400, defaultX: 110, defaultY: 55 },
  tetris: { id: "tetris", title: "Tetris", defaultWidth: 300, defaultHeight: 440, defaultX: 130, defaultY: 45 },
  solitaire: { id: "solitaire", title: "Solitaire", defaultWidth: 480, defaultHeight: 400, defaultX: 90, defaultY: 40 },
  pong: { id: "pong", title: "Pong", defaultWidth: 320, defaultHeight: 320, defaultX: 95, defaultY: 48 },
  breakout: { id: "breakout", title: "Breakout", defaultWidth: 320, defaultHeight: 340, defaultX: 105, defaultY: 42 },
  game2048: { id: "game2048", title: "2048", defaultWidth: 300, defaultHeight: 400, defaultX: 115, defaultY: 50 },
  memory: { id: "memory", title: "Memory Match", defaultWidth: 320, defaultHeight: 380, defaultX: 125, defaultY: 45 },
  invaders: { id: "invaders", title: "Space Invaders", defaultWidth: 320, defaultHeight: 360, defaultX: 100, defaultY: 40 },
  paint: { id: "paint", title: "Paint", defaultWidth: 520, defaultHeight: 420, defaultX: 150, defaultY: 60 },
  mycomputer: { id: "mycomputer", title: "My Computer", defaultWidth: 460, defaultHeight: 340, defaultX: 100, defaultY: 70 },
  cmd: { id: "cmd", title: "MS-DOS Prompt", defaultWidth: 560, defaultHeight: 360, defaultX: 120, defaultY: 80 },
  ie: { id: "ie", title: "Internet Explorer — GitHub", defaultWidth: 640, defaultHeight: 480, defaultX: 80, defaultY: 30 },
  chat: { id: "chat", title: "MSN Messenger — Ala", defaultWidth: 360, defaultHeight: 420, defaultX: 200, defaultY: 70 },
  cvviewer: { id: "cvviewer", title: "CV-Ala-Dimassi.pdf", defaultWidth: 560, defaultHeight: 520, defaultX: 140, defaultY: 40 },
  guestbook: { id: "guestbook", title: "Guestbook", defaultWidth: 400, defaultHeight: 360, defaultX: 170, defaultY: 90 },
  display: { id: "display", title: "Display Properties", defaultWidth: 400, defaultHeight: 340, defaultX: 180, defaultY: 80 },
  network: { id: "network", title: "Network Neighborhood", defaultWidth: 440, defaultHeight: 360, defaultX: 160, defaultY: 75 },
  sysmon: { id: "sysmon", title: "System Monitor — GitHub", defaultWidth: 400, defaultHeight: 320, defaultX: 190, defaultY: 85 },
  assistant: { id: "assistant", title: "Portfolio Assistant", defaultWidth: 380, defaultHeight: 400, defaultX: 210, defaultY: 65 },
};

const WIN_STORAGE = "portfolioos98-window-positions";

export type SavedWindowPos = { x: number; y: number; width: number; height: number };

export function loadWindowPos(id: AppId): SavedWindowPos | null {
  try {
    const all = JSON.parse(localStorage.getItem(WIN_STORAGE) ?? "{}") as Record<string, SavedWindowPos>;
    return all[id] ?? null;
  } catch {
    return null;
  }
}

export function saveWindowPos(id: AppId, pos: SavedWindowPos) {
  try {
    const all = JSON.parse(localStorage.getItem(WIN_STORAGE) ?? "{}") as Record<string, SavedWindowPos>;
    all[id] = pos;
    localStorage.setItem(WIN_STORAGE, JSON.stringify(all));
  } catch {
    /* ignore */
  }
}
