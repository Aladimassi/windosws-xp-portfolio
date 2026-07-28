import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { profile } from "../../data/profile";
import { type AppId, useWindowManager } from "../../hooks/useWindowManager";
import {
  BriefcaseIcon,
  ComputerIcon,
  ControlPanelIcon,
  DocumentIcon,
  FolderIcon,
  MailIcon,
  MinesweeperIcon,
  NotepadIcon,
} from "./icons";

type StartMenuProps = {
  open: boolean;
  onClose: () => void;
  onShutdown: () => void;
  onRun: () => void;
};

type MenuEntry = {
  id: string;
  label: string;
  icon?: ReactNode;
  appId?: AppId;
  action?: () => void;
  separator?: boolean;
  bold?: boolean;
  children?: MenuEntry[];
};

export function StartMenu({ open, onClose, onShutdown, onRun }: StartMenuProps) {
  const { openWindow } = useWindowManager();
  const menuRef = useRef<HTMLDivElement>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setOpenSubmenu(null);
      return;
    }

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (menuRef.current?.contains(target)) return;
      if ((target as Element).closest?.(".w98-taskbar")) return;
      onClose();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open, onClose]);

  const activate = useCallback(
    (entry: MenuEntry) => {
      if (entry.action) entry.action();
      else if (entry.appId) openWindow(entry.appId);
      onClose();
    },
    [openWindow, onClose],
  );

  if (!open) return null;

  const portfolioPrograms: MenuEntry[] = [
    { id: "mycomputer", label: "My Computer", icon: <ComputerIcon size={16} />, appId: "mycomputer" },
    { id: "about", label: "About Ala Dimassi", icon: <ComputerIcon size={16} />, appId: "about" },
    { id: "projects", label: "My Projects", icon: <FolderIcon size={16} />, appId: "projects" },
    { id: "skills", label: "Skills", icon: <ControlPanelIcon size={16} />, appId: "skills" },
    { id: "experience", label: "Work History", icon: <BriefcaseIcon size={16} />, appId: "experience" },
    { id: "contact", label: "Contact", icon: <MailIcon size={16} />, appId: "contact" },
  ];

  const games: MenuEntry[] = [
    { id: "minesweeper", label: "Minesweeper", icon: <MinesweeperIcon size={16} />, appId: "minesweeper" },
    { id: "snake", label: "Snake", icon: <MinesweeperIcon size={16} />, appId: "snake" },
    { id: "tetris", label: "Tetris", icon: <MinesweeperIcon size={16} />, appId: "tetris" },
    { id: "solitaire", label: "Solitaire", icon: <MinesweeperIcon size={16} />, appId: "solitaire" },
    { id: "pong", label: "Pong", icon: <MinesweeperIcon size={16} />, appId: "pong" },
    { id: "breakout", label: "Breakout", icon: <MinesweeperIcon size={16} />, appId: "breakout" },
    { id: "game2048", label: "2048", icon: <MinesweeperIcon size={16} />, appId: "game2048" },
    { id: "memory", label: "Memory Match", icon: <MinesweeperIcon size={16} />, appId: "memory" },
    { id: "invaders", label: "Space Invaders", icon: <MinesweeperIcon size={16} />, appId: "invaders" },
  ];

  const accessories: MenuEntry[] = [
    { id: "notepad", label: "Notepad", icon: <NotepadIcon size={16} />, appId: "notepad" },
    { id: "welcome", label: "Welcome.txt", icon: <NotepadIcon size={16} />, appId: "welcome" },
    { id: "paint", label: "Paint", icon: <NotepadIcon size={16} />, appId: "paint" },
    { id: "cmd", label: "MS-DOS Prompt", icon: <ComputerIcon size={16} />, appId: "cmd" },
    { id: "ie", label: "Internet Explorer", icon: <ComputerIcon size={16} />, appId: "ie" },
    { id: "chat", label: "MSN Messenger", icon: <MailIcon size={16} />, appId: "chat" },
    { id: "guestbook", label: "Guestbook", icon: <NotepadIcon size={16} />, appId: "guestbook" },
    { id: "sysmon", label: "System Monitor", icon: <ComputerIcon size={16} />, appId: "sysmon" },
    { id: "assistant", label: "Portfolio Assistant", icon: <MailIcon size={16} />, appId: "assistant" },
  ];

  const programItems: MenuEntry[] = [
    {
      id: "portfolio-folder",
      label: "Portfolio",
      icon: <FolderIcon size={16} />,
      bold: true,
      children: portfolioPrograms,
    },
    {
      id: "games-folder",
      label: "Games",
      icon: <MinesweeperIcon size={16} />,
      bold: true,
      children: games,
    },
    {
      id: "accessories-folder",
      label: "Accessories",
      icon: <FolderIcon size={16} />,
      bold: true,
      children: accessories,
    },
  ];

  const documentItems: MenuEntry[] = [
    {
      id: "cv",
      label: "CV-Ala-Dimassi.pdf",
      icon: <DocumentIcon size={16} />,
      appId: "cvviewer",
    },
    {
      id: "readme",
      label: "readme.txt",
      icon: <NotepadIcon size={16} />,
      appId: "notepad",
    },
  ];

  const settingsItems: MenuEntry[] = [
    { id: "cpanel", label: "Control Panel", icon: <ControlPanelIcon size={16} />, appId: "skills" },
    { id: "display", label: "Display", icon: <ControlPanelIcon size={16} />, appId: "display" },
    { id: "sysprops", label: "System", icon: <ComputerIcon size={16} />, appId: "about" },
    { id: "network", label: "Network", icon: <ComputerIcon size={16} />, appId: "network" },
  ];

  const topItems: MenuEntry[] = [
    { id: "programs", label: "Programs", icon: <FolderIcon size={16} />, bold: true, children: programItems },
    { id: "documents", label: "Documents", icon: <DocumentIcon size={16} />, bold: true, children: documentItems },
    { id: "settings", label: "Settings", icon: <ControlPanelIcon size={16} />, bold: true, children: settingsItems },
    { id: "sep1", separator: true, label: "" },
    { id: "find", label: "Find", icon: <FindIcon />, appId: "projects" },
    { id: "help", label: "Help", icon: <HelpIcon />, appId: "welcome" },
    { id: "run", label: "Run...", icon: <RunIcon />, action: onRun },
  ];

  const renderLeaf = (entry: MenuEntry) => (
    <button
      key={entry.id}
      type="button"
      className={`w98-menu-item${entry.bold ? " w98-menu-item--bold" : ""}`}
      onClick={() => activate(entry)}
    >
      <span className="w98-menu-icon">{entry.icon}</span>
      <span className="w98-menu-label">{entry.label}</span>
    </button>
  );

  const renderSubmenuPanel = (entries: MenuEntry[], parentId: string, depth = 0) => (
    <div
      className={`w98-submenu w98-outset w98-submenu--depth-${depth}`}
      role="menu"
      onMouseEnter={() => setOpenSubmenu(parentId)}
    >
      {entries.map((entry) => {
        if (entry.separator) {
          return <div key={entry.id} className="w98-menu-separator" />;
        }
        if (entry.children) {
          return renderFlyoutItem(entry, depth + 1);
        }
        return renderLeaf(entry);
      })}
    </div>
  );

  const renderFlyoutItem = (entry: MenuEntry, depth = 0) => {
    const isOpen = openSubmenu === entry.id;

    return (
      <div
        key={entry.id}
        className={`w98-menu-flyout${isOpen ? " w98-menu-flyout--open" : ""}`}
        onMouseEnter={() => setOpenSubmenu(entry.id)}
      >
        <div
          className={`w98-menu-item w98-menu-item--flyout${entry.bold ? " w98-menu-item--bold" : ""}${isOpen ? " focused" : ""}`}
          role="menuitem"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span className="w98-menu-icon">{entry.icon}</span>
          <span className="w98-menu-label">{entry.label}</span>
          <span className="w98-menu-arrow" aria-hidden>
            ▶
          </span>
        </div>
        {isOpen && entry.children && renderSubmenuPanel(entry.children, entry.id, depth)}
      </div>
    );
  };

  const renderTopItem = (entry: MenuEntry) => {
    if (entry.separator) {
      return <div key={entry.id} className="w98-menu-separator" />;
    }
    if (entry.children) {
      return renderFlyoutItem(entry);
    }
    return renderLeaf(entry);
  };

  return (
    <div
      ref={menuRef}
      className="w98-start-menu w98-outset"
      role="menu"
      aria-label="Start menu"
      onMouseLeave={() => setOpenSubmenu(null)}
    >
      <div className="w98-start-sidebar">
        <span>Windows</span>
        <span className="w98-start-sidebar-ver">98</span>
        <span className="w98-start-sidebar-user">{profile.name}</span>
      </div>

      <div className="w98-start-body">
        <div className="w98-start-items">
          {topItems.map(renderTopItem)}
        </div>

        <div className="w98-start-footer">
          <div className="w98-menu-separator" />
          <button
            type="button"
            className="w98-menu-item w98-menu-item--bold w98-menu-item--shutdown"
            onClick={() => {
              onClose();
              onShutdown();
            }}
          >
            <span className="w98-menu-icon">
              <ShutdownIcon />
            </span>
            <span className="w98-menu-label">Shut Down...</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function FindIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <circle cx="6.5" cy="6.5" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10" y1="10" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1" />
      <text x="8" y="12" textAnchor="middle" fontSize="11" fontWeight="bold" fill="currentColor">
        ?
      </text>
    </svg>
  );
}

function RunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <rect x="1" y="1" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M4 8h8M8 4v8" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function ShutdownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <line x1="8" y1="4" x2="8" y2="8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
