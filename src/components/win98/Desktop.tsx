import { useCallback, useEffect, useRef, useState } from "react";
import { profile } from "../../data/profile";
import { BsodProvider } from "../../hooks/useBsod";
import { useSettings } from "../../hooks/useSettings";
import { type AppId, useWindowManager } from "../../hooks/useWindowManager";
import { playClickSound, playStartupSound } from "../../lib/sounds";
import { BSOD } from "./BSOD";
import { BlissWallpaper, TealWallpaper } from "./BlissWallpaper";
import { BootScreen } from "./BootScreen";
import { CloudWallpaper } from "./CloudWallpaper";
import { ContextMenu, type ContextMenuItem } from "./ContextMenu";
import { DesktopIcon } from "./DesktopIcon";
import {
  BriefcaseIcon,
  ComputerIcon,
  ControlPanelIcon,
  DocumentIcon,
  FolderIcon,
  MailIcon,
  MinesweeperIcon,
  NotepadIcon,
  RecycleIcon,
} from "./icons";
import { RunDialog } from "./RunDialog";
import { ScreenSaver } from "./ScreenSaver";
import { ShutdownDialog } from "./ShutdownDialog";
import { StartMenu } from "./StartMenu";
import { Taskbar } from "./Taskbar";
import { WindowLayer } from "./WindowLayer";

type DesktopItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  appId?: AppId;
  action?: () => void;
};

const DESKTOP_ITEMS: DesktopItem[] = [
  { id: "mycomputer", label: "My Computer", icon: <ComputerIcon />, appId: "mycomputer" },
  { id: "about", label: "About Ala", icon: <ComputerIcon />, appId: "about" },
  { id: "projects", label: "My Projects", icon: <FolderIcon />, appId: "projects" },
  { id: "ie", label: "Internet Explorer", icon: <GlobeDesktopIcon />, appId: "ie" },
  { id: "chat", label: "MSN Messenger", icon: <MailIcon />, appId: "chat" },
  { id: "skills", label: "Skills", icon: <ControlPanelIcon />, appId: "skills" },
  { id: "experience", label: "Work History", icon: <BriefcaseIcon />, appId: "experience" },
  { id: "contact", label: "Contact", icon: <MailIcon />, appId: "contact" },
  { id: "minesweeper", label: "Minesweeper", icon: <MinesweeperIcon />, appId: "minesweeper" },
  { id: "paint", label: "Paint", icon: <NotepadIcon />, appId: "paint" },
  { id: "cmd", label: "MS-DOS Prompt", icon: <ComputerIcon />, appId: "cmd" },
  { id: "network", label: "Network", icon: <ComputerIcon />, appId: "network" },
  { id: "guestbook", label: "Guestbook", icon: <NotepadIcon />, appId: "guestbook" },
  {
    id: "cv",
    label: "My CV",
    icon: <DocumentIcon />,
    action: () => {},
    appId: "cvviewer",
  },
  { id: "readme", label: "readme.txt", icon: <NotepadIcon />, appId: "notepad" },
  { id: "recycle", label: "Recycle Bin", icon: <RecycleIcon />, appId: "recycle" },
];

function GlobeDesktopIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden>
      <circle cx="16" cy="16" r="14" fill="#0080ff" stroke="#000" strokeWidth="1" />
      <ellipse cx="16" cy="16" rx="5" ry="14" fill="none" stroke="#fff" strokeWidth="1" />
      <line x1="2" y1="16" x2="30" y2="16" stroke="#fff" strokeWidth="0.75" />
    </svg>
  );
}

function defaultIconPos(index: number) {
  const col = Math.floor(index / 8);
  const row = index % 8;
  return { x: 8 + col * 80, y: 8 + row * 76 };
}

export function Win98Desktop() {
  const { openWindow } = useWindowManager();
  const { wallpaper, sounds, iconPositions, updateIconPosition, screensaverMinutes } = useSettings();
  const [booting, setBooting] = useState(true);
  const [startOpen, setStartOpen] = useState(false);
  const [shutdownOpen, setShutdownOpen] = useState(false);
  const [runOpen, setRunOpen] = useState(false);
  const [bsodOpen, setBsodOpen] = useState(false);
  const [screensaver, setScreensaver] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; target: "desktop" | DesktopItem } | null>(null);
  const idleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetIdle = useCallback(() => {
    if (idleRef.current) clearTimeout(idleRef.current);
    idleRef.current = setTimeout(
      () => setScreensaver(true),
      screensaverMinutes * 60 * 1000,
    );
  }, [screensaverMinutes]);

  useEffect(() => {
    resetIdle();
    const events = ["pointerdown", "keydown", "mousemove"] as const;
    const handler = () => {
      setScreensaver(false);
      resetIdle();
    };
    events.forEach((e) => window.addEventListener(e, handler));
    return () => {
      events.forEach((e) => window.removeEventListener(e, handler));
      if (idleRef.current) clearTimeout(idleRef.current);
    };
  }, [resetIdle]);

  const handleBootComplete = useCallback(() => {
    setBooting(false);
    if (sounds) playStartupSound();
    openWindow("welcome");
  }, [openWindow, sounds]);

  const closeContextMenu = useCallback(() => setContextMenu(null), []);

  const openContextMenu = useCallback((x: number, y: number, target: "desktop" | DesktopItem) => {
    setStartOpen(false);
    setContextMenu({ x, y, target });
  }, []);

  const handleDesktopClick = () => {
    setSelectedIcon(null);
    setStartOpen(false);
    closeContextMenu();
    if (sounds) playClickSound();
  };

  const handleRefresh = () => window.location.reload();

  const handleRunCommand = (command: string) => {
    setRunOpen(false);
    const cmd = command.trim().toLowerCase();
    const map: Record<string, AppId> = {
      about: "about", projects: "projects", skills: "skills", experience: "experience",
      contact: "contact", notepad: "notepad", welcome: "welcome",
      minesweeper: "minesweeper", mine: "minesweeper", winmine: "minesweeper",
      snake: "snake", tetris: "tetris", solitaire: "solitaire",
      pong: "pong", breakout: "breakout", "2048": "game2048", game2048: "game2048",
      memory: "memory", invaders: "invaders", paint: "paint",
      cmd: "cmd", command: "cmd", ie: "ie", iexplore: "ie", chat: "chat", msn: "chat",
      guestbook: "guestbook", cv: "cvviewer", display: "display", network: "network",
      sysmon: "sysmon", assistant: "assistant", mycomputer: "mycomputer", computer: "mycomputer",
    };
    if (cmd === "portfolio") { openWindow("welcome"); return; }
    if (cmd === "bsod") { setBsodOpen(true); return; }
    if (map[cmd]) { openWindow(map[cmd]!); return; }
    if (cmd === "github") { window.open(profile.github, "_blank"); return; }
    openWindow("projects");
  };

  const handleOpen = (item: DesktopItem) => {
    if (item.id === "cv") openWindow("cvviewer");
    else if (item.action && !item.appId) item.action();
    else if (item.appId) openWindow(item.appId);
  };

  const getPos = (id: string, index: number) => {
    const saved = iconPositions.find((p) => p.id === id);
    return saved ?? defaultIconPos(index);
  };

  const buildDesktopMenu = (): ContextMenuItem[] => [
    { id: "arrange", label: "Arranger les icônes", bold: true, children: [
      { id: "a1", label: "Par nom", onClick: () => {} },
      { id: "a2", label: "Par type", onClick: () => {} },
    ]},
    { id: "refresh", label: "Actualiser", onClick: handleRefresh },
    { id: "sep1", separator: true, label: "" },
    { id: "display", label: "Propriétés de l'affichage", onClick: () => openWindow("display") },
    { id: "sep2", separator: true, label: "" },
    { id: "games", label: "Jeux", children: [
      { id: "m", label: "Démineur", onClick: () => openWindow("minesweeper") },
      { id: "s", label: "Snake", onClick: () => openWindow("snake") },
      { id: "t", label: "Tetris", onClick: () => openWindow("tetris") },
      { id: "sol", label: "Solitaire", onClick: () => openWindow("solitaire") },
      { id: "p", label: "Pong", onClick: () => openWindow("pong") },
      { id: "br", label: "Breakout", onClick: () => openWindow("breakout") },
      { id: "2048", label: "2048", onClick: () => openWindow("game2048") },
      { id: "mem", label: "Memory Match", onClick: () => openWindow("memory") },
      { id: "inv", label: "Space Invaders", onClick: () => openWindow("invaders") },
    ]},
    { id: "tools", label: "Outils", children: [
      { id: "cmd", label: "Invite de commandes", onClick: () => openWindow("cmd") },
      { id: "paint", label: "Paint", onClick: () => openWindow("paint") },
      { id: "ie", label: "Internet Explorer", onClick: () => openWindow("ie") },
    ]},
    { id: "sep3", separator: true, label: "" },
    { id: "props", label: "Propriétés", onClick: () => openWindow("about") },
  ];

  const buildIconMenu = (item: DesktopItem): ContextMenuItem[] => [
    { id: "open", label: "Ouvrir", bold: true, onClick: () => handleOpen(item) },
    { id: "sep1", separator: true, label: "" },
    { id: "props", label: "Propriétés", onClick: () => openWindow(item.appId ?? "about") },
  ];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setStartOpen(false);
        setShutdownOpen(false);
        setRunOpen(false);
        setBsodOpen(false);
        closeContextMenu();
        setScreensaver(false);
      }
      if (e.key === "Meta" || (e.ctrlKey && e.key === "Escape")) {
        e.preventDefault();
        setStartOpen((v) => !v);
      }
      if (e.altKey && e.key.toLowerCase() === "r") {
        e.preventDefault();
        setRunOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeContextMenu]);

  const wallpaperEl =
    wallpaper === "bliss" ? <BlissWallpaper /> :
    wallpaper === "teal" ? <TealWallpaper /> :
    <CloudWallpaper />;

  return (
    <BsodProvider onTrigger={() => setBsodOpen(true)}>
      {booting && <BootScreen onComplete={handleBootComplete} />}
      {screensaver && <ScreenSaver onDismiss={() => { setScreensaver(false); resetIdle(); }} />}
      {bsodOpen && <BSOD onDismiss={() => setBsodOpen(false)} />}

      <div
        className="w98-desktop"
        onClick={handleDesktopClick}
        onContextMenu={(e) => {
          e.preventDefault();
          openContextMenu(e.clientX, e.clientY, "desktop");
        }}
        onPointerDown={(e) => {
          if ((e.target as Element).closest?.(".w98-icon, .w98-window, .w98-taskbar, .w98-context-menu")) return;
          const timer = setTimeout(() => openContextMenu(e.clientX, e.clientY, "desktop"), 600);
          const clear = () => clearTimeout(timer);
          e.currentTarget.addEventListener("pointerup", clear, { once: true });
        }}
        role="presentation"
      >
        {wallpaperEl}

        <div className="w98-desktop-icons w98-desktop-icons--free">
          {DESKTOP_ITEMS.map((item, i) => {
            const pos = getPos(item.id, i);
            return (
              <DesktopIcon
                key={item.id}
                label={item.label}
                icon={item.icon}
                selected={selectedIcon === item.id}
                x={pos.x}
                y={pos.y}
                onSelect={() => setSelectedIcon(item.id)}
                onOpen={() => handleOpen(item)}
                onContextMenu={(x, y) => openContextMenu(x, y, item)}
                onDragEnd={(x, y) => updateIconPosition(item.id, x, y)}
              />
            );
          })}
        </div>

        <WindowLayer />

        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            items={
              contextMenu.target === "desktop"
                ? buildDesktopMenu()
                : buildIconMenu(contextMenu.target)
            }
            onClose={closeContextMenu}
          />
        )}

        <StartMenu
          open={startOpen}
          onClose={() => setStartOpen(false)}
          onShutdown={() => { setStartOpen(false); setShutdownOpen(true); }}
          onRun={() => { setStartOpen(false); setRunOpen(true); }}
        />

        {runOpen && <RunDialog onClose={() => setRunOpen(false)} onRun={handleRunCommand} />}
        {shutdownOpen && (
          <ShutdownDialog onClose={() => setShutdownOpen(false)} onRestart={handleRefresh} />
        )}

        <Taskbar startOpen={startOpen} onToggleStart={() => setStartOpen((v) => !v)} />
      </div>
    </BsodProvider>
  );
}
