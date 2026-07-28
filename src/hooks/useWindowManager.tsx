import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  loadWindowPos,
  saveWindowPos,
  WINDOW_CONFIGS,
  type AppId,
  type WindowConfig,
} from "../data/windows";
import { playCloseSound, playOpenSound } from "../lib/sounds";
import { useSettings } from "./useSettings";

export type { AppId, WindowConfig };
export { WINDOW_CONFIGS };

export type WindowInstance = WindowConfig & {
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
};

type WindowManagerContextValue = {
  windows: WindowInstance[];
  activeId: AppId | null;
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  restoreWindow: (id: AppId) => void;
  moveWindow: (id: AppId, x: number, y: number) => void;
  resizeWindow: (id: AppId, width: number, height: number) => void;
};

const WindowManagerContext = createContext<WindowManagerContextValue | null>(null);

let zCounter = 10;

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const { sounds } = useSettings();
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [activeId, setActiveId] = useState<AppId | null>(null);

  const persistWindow = useCallback((w: WindowInstance) => {
    if (!w.maximized) {
      saveWindowPos(w.id, { x: w.x, y: w.y, width: w.width, height: w.height });
    }
  }, []);

  const openWindow = useCallback(
    (id: AppId) => {
      setWindows((prev) => {
        const existing = prev.find((w) => w.id === id);
        if (existing) {
          zCounter += 1;
          if (sounds) playOpenSound();
          return prev.map((w) =>
            w.id === id ? { ...w, minimized: false, zIndex: zCounter } : w,
          );
        }

        const config = WINDOW_CONFIGS[id];
        const saved = loadWindowPos(id);
        zCounter += 1;
        const offset = prev.length * 20;
        const instance: WindowInstance = {
          ...config,
          x: saved?.x ?? config.defaultX + offset,
          y: saved?.y ?? config.defaultY + offset,
          width: saved?.width ?? config.defaultWidth,
          height: saved?.height ?? config.defaultHeight,
          minimized: false,
          maximized: false,
          zIndex: zCounter,
        };
        if (sounds) playOpenSound();
        return [...prev, instance];
      });
      setActiveId(id);
    },
    [sounds],
  );

  const closeWindow = useCallback(
    (id: AppId) => {
      setWindows((prev) => {
        const w = prev.find((win) => win.id === id);
        if (w) persistWindow(w);
        return prev.filter((win) => win.id !== id);
      });
      if (sounds) playCloseSound();
      setActiveId((prev) => (prev === id ? null : prev));
    },
    [sounds, persistWindow],
  );

  const focusWindow = useCallback((id: AppId) => {
    zCounter += 1;
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: zCounter } : w)),
    );
    setActiveId(id);
  }, []);

  const minimizeWindow = useCallback((id: AppId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
    );
    setActiveId((prev) => (prev === id ? null : prev));
  }, []);

  const toggleMaximize = useCallback(
    (id: AppId) => {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, maximized: !w.maximized, minimized: false } : w,
        ),
      );
      focusWindow(id);
    },
    [focusWindow],
  );

  const restoreWindow = useCallback(
    (id: AppId) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, minimized: false } : w)),
      );
      focusWindow(id);
    },
    [focusWindow],
  );

  const moveWindow = useCallback(
    (id: AppId, x: number, y: number) => {
      setWindows((prev) => {
        const next = prev.map((w) => (w.id === id ? { ...w, x, y } : w));
        const w = next.find((win) => win.id === id);
        if (w) persistWindow(w);
        return next;
      });
    },
    [persistWindow],
  );

  const resizeWindow = useCallback(
    (id: AppId, width: number, height: number) => {
      setWindows((prev) => {
        const next = prev.map((w) => (w.id === id ? { ...w, width, height } : w));
        const w = next.find((win) => win.id === id);
        if (w) persistWindow(w);
        return next;
      });
    },
    [persistWindow],
  );

  const value = useMemo(
    () => ({
      windows,
      activeId,
      openWindow,
      closeWindow,
      focusWindow,
      minimizeWindow,
      toggleMaximize,
      restoreWindow,
      moveWindow,
      resizeWindow,
    }),
    [
      windows,
      activeId,
      openWindow,
      closeWindow,
      focusWindow,
      minimizeWindow,
      toggleMaximize,
      restoreWindow,
      moveWindow,
      resizeWindow,
    ],
  );

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) {
    throw new Error("useWindowManager must be used within WindowManagerProvider");
  }
  return ctx;
}
