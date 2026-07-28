import { type ComponentType, type ReactNode } from "react";
import { projects } from "../../data/projects";
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
  RecycleIcon,
} from "./icons";
import { MenuBar } from "./MenuBar";
import { Window } from "./Window";
import { AboutApp } from "./apps/AboutApp";
import { AssistantApp, ChatApp } from "./apps/ChatApp";
import { CmdApp } from "./apps/CmdAppWrapper";
import { ContactApp } from "./apps/ContactApp";
import { DisplayApp } from "./apps/DisplayApp";
import { ExperienceApp } from "./apps/ExperienceApp";
import { CvViewerApp, GuestbookApp } from "./apps/GuestbookApps";
import { IEApp } from "./apps/IEApp";
import { MinesweeperApp } from "./apps/MinesweeperApp";
import { MyComputerApp } from "./apps/MyComputerApp";
import { NetworkApp } from "./apps/NetworkApp";
import { NotepadApp, RecycleApp, WelcomeApp } from "./apps/NotepadApps";
import { BreakoutApp } from "./apps/BreakoutApp";
import { Game2048App } from "./apps/Game2048App";
import { InvadersApp } from "./apps/InvadersApp";
import { MemoryApp } from "./apps/MemoryApp";
import { PaintApp } from "./apps/PaintApp";
import { PongApp } from "./apps/PongApp";
import { ProjectsApp } from "./apps/ProjectsApp";
import { SkillsApp } from "./apps/SkillsApp";
import { SnakeApp } from "./apps/SnakeApp";
import { SolitaireApp } from "./apps/SolitaireApp";
import { SysMonitorApp } from "./apps/SysMonitorApp";
import { TetrisApp } from "./apps/TetrisApp";

const APP_COMPONENTS: Record<AppId, ComponentType> = {
  about: AboutApp,
  projects: ProjectsApp,
  skills: SkillsApp,
  experience: ExperienceApp,
  contact: ContactApp,
  welcome: WelcomeApp,
  notepad: NotepadApp,
  recycle: RecycleApp,
  minesweeper: MinesweeperApp,
  snake: SnakeApp,
  tetris: TetrisApp,
  solitaire: SolitaireApp,
  pong: PongApp,
  breakout: BreakoutApp,
  game2048: Game2048App,
  memory: MemoryApp,
  invaders: InvadersApp,
  paint: PaintApp,
  mycomputer: MyComputerApp,
  cmd: CmdApp,
  ie: IEApp,
  chat: ChatApp,
  cvviewer: CvViewerApp,
  guestbook: GuestbookApp,
  display: DisplayApp,
  network: NetworkApp,
  sysmon: SysMonitorApp,
  assistant: AssistantApp,
};

const WINDOW_ICONS: Record<AppId, ReactNode> = {
  about: <ComputerIcon size={16} />,
  projects: <FolderIcon size={16} />,
  skills: <ControlPanelIcon size={16} />,
  experience: <BriefcaseIcon size={16} />,
  contact: <MailIcon size={16} />,
  welcome: <NotepadIcon size={16} />,
  notepad: <NotepadIcon size={16} />,
  recycle: <RecycleIcon size={16} />,
  minesweeper: <MinesweeperIcon size={16} />,
  snake: <MinesweeperIcon size={16} />,
  tetris: <MinesweeperIcon size={16} />,
  solitaire: <MinesweeperIcon size={16} />,
  pong: <MinesweeperIcon size={16} />,
  breakout: <MinesweeperIcon size={16} />,
  game2048: <MinesweeperIcon size={16} />,
  memory: <MinesweeperIcon size={16} />,
  invaders: <MinesweeperIcon size={16} />,
  paint: <NotepadIcon size={16} />,
  mycomputer: <ComputerIcon size={16} />,
  cmd: <ComputerIcon size={16} />,
  ie: <GlobeIcon />,
  chat: <MailIcon size={16} />,
  cvviewer: <DocumentIcon size={16} />,
  guestbook: <NotepadIcon size={16} />,
  display: <ControlPanelIcon size={16} />,
  network: <ComputerIcon size={16} />,
  sysmon: <ComputerIcon size={16} />,
  assistant: <MailIcon size={16} />,
};

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <circle cx="8" cy="8" r="7" fill="#0080ff" stroke="#000" strokeWidth="0.75" />
      <ellipse cx="8" cy="8" rx="3" ry="7" fill="none" stroke="#fff" strokeWidth="0.75" />
    </svg>
  );
}

const STATUS: Partial<Record<AppId, string[]>> = {
  welcome: ["Welcome to Ala Dimassi's portfolio"],
  notepad: ["Ln 1, Col 1"],
  projects: [`${projects.length} object(s)`, "C:\\Projects"],
  recycle: ["0 object(s)"],
  about: ["General tab"],
  skills: ["Control Panel"],
  experience: ["2 record(s)"],
  contact: ["Ready"],
  minesweeper: ["Beginner: 9×9, 10 mines"],
  snake: ["Use arrows or pad"],
  tetris: ["Lines: score x100"],
  solitaire: ["Foundations A→K"],
  pong: ["vs CPU · ◀ ▶"],
  breakout: ["Break all bricks"],
  game2048: ["Reach 2048"],
  memory: ["Match pairs"],
  invaders: ["◀ ▶ · Fire"],
  paint: ["Free draw"],
  cmd: ["C:\\Users\\Ala"],
  ie: ["Connected"],
  chat: ["Online"],
  sysmon: ["Refreshing..."],
};

const NOTEPAD_IDS: AppId[] = ["welcome", "notepad"];
const FLUSH_IDS: AppId[] = ["welcome", "notepad", "projects", "cmd", "ie", "paint", "cvviewer"];

export function WindowLayer() {
  const { windows, activeId } = useWindowManager();

  return (
    <>
      {windows.map((w) => {
        const App = APP_COMPONENTS[w.id];
        return (
          <Window
            key={w.id}
            id={w.id}
            title={w.title}
            icon={WINDOW_ICONS[w.id]}
            active={activeId === w.id}
            x={w.x}
            y={w.y}
            width={w.width}
            height={w.height}
            minimized={w.minimized}
            maximized={w.maximized}
            zIndex={w.zIndex}
            statusPanels={STATUS[w.id]}
            menuBar={NOTEPAD_IDS.includes(w.id) ? <MenuBar items={["File", "Edit", "Search", "Help"]} /> : undefined}
            noPadding={FLUSH_IDS.includes(w.id)}
          >
            <App />
          </Window>
        );
      })}
    </>
  );
}
