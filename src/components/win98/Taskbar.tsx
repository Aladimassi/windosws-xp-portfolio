import { useEffect, useState } from "react";
import { useWindowManager, WINDOW_CONFIGS } from "../../hooks/useWindowManager";
import { useSettings } from "../../hooks/useSettings";
import { playClickSound } from "../../lib/sounds";
import { WinLogo } from "./icons";

type TaskbarProps = {
  startOpen: boolean;
  onToggleStart: () => void;
};

export function Taskbar({ startOpen, onToggleStart }: TaskbarProps) {
  const { sounds } = useSettings();
  const { windows, activeId, restoreWindow, minimizeWindow } = useWindowManager();
  const [time, setTime] = useState(formatClock());

  useEffect(() => {
    const id = setInterval(() => setTime(formatClock()), 1000);
    return () => clearInterval(id);
  }, []);

  const toggleStart = () => {
    if (sounds) playClickSound();
    onToggleStart();
  };

  return (
    <footer
      className="w98-taskbar w98-outset"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className={`w98-btn w98-start-btn${startOpen ? " active" : ""}`}
        onClick={toggleStart}
        aria-expanded={startOpen}
        aria-label="Start"
      >
        <WinLogo size={16} className="w98-start-logo" />
        Start
      </button>

      <div className="w98-taskbar-divider" aria-hidden />

      <div className="w98-taskbar-windows">
        {windows.map((w) => (
          <button
            key={w.id}
            type="button"
            className={`w98-btn w98-outset w98-taskbar-item${
              activeId === w.id && !w.minimized ? " active" : ""
            }`}
            onClick={() => {
              if (activeId === w.id && !w.minimized) {
                minimizeWindow(w.id);
              } else {
                restoreWindow(w.id);
              }
            }}
            title={WINDOW_CONFIGS[w.id].title}
          >
            {WINDOW_CONFIGS[w.id].title.split("—")[0]?.trim()}
          </button>
        ))}
      </div>

      <div className="w98-tray w98-inset">
        <span className="w98-tray-icon" aria-hidden title="Volume">
          🔊
        </span>
        <time className="w98-clock" dateTime={new Date().toISOString()} title={formatDate()}>
          {time}
        </time>
      </div>
    </footer>
  );
}

function formatClock() {
  return new Date().toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate() {
  return new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
