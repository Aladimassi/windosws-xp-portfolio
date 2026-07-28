import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { type Locale } from "../lib/i18n";

export type Wallpaper = "clouds" | "bliss" | "teal";

export type IconPosition = { id: string; x: number; y: number };

type Settings = {
  wallpaper: Wallpaper;
  sounds: boolean;
  locale: Locale;
  iconPositions: IconPosition[];
  screensaverMinutes: number;
};

const STORAGE_KEY = "portfolioos98-settings";

const DEFAULT: Settings = {
  wallpaper: "clouds",
  sounds: true,
  locale: "fr",
  iconPositions: [],
  screensaverMinutes: 2,
};

function load(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT;
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT;
  }
}

type SettingsContextValue = Settings & {
  setWallpaper: (w: Wallpaper) => void;
  setSounds: (v: boolean) => void;
  setLocale: (l: Locale) => void;
  setIconPositions: (p: IconPosition[]) => void;
  updateIconPosition: (id: string, x: number, y: number) => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const setWallpaper = useCallback((wallpaper: Wallpaper) => {
    setSettings((s) => ({ ...s, wallpaper }));
  }, []);

  const setSounds = useCallback((sounds: boolean) => {
    setSettings((s) => ({ ...s, sounds }));
  }, []);

  const setLocale = useCallback((locale: Locale) => {
    setSettings((s) => ({ ...s, locale }));
  }, []);

  const setIconPositions = useCallback((iconPositions: IconPosition[]) => {
    setSettings((s) => ({ ...s, iconPositions }));
  }, []);

  const updateIconPosition = useCallback((id: string, x: number, y: number) => {
    setSettings((s) => {
      const rest = s.iconPositions.filter((p) => p.id !== id);
      return { ...s, iconPositions: [...rest, { id, x, y }] };
    });
  }, []);

  const value = useMemo(
    () => ({
      ...settings,
      setWallpaper,
      setSounds,
      setLocale,
      setIconPositions,
      updateIconPosition,
    }),
    [settings, setWallpaper, setSounds, setLocale, setIconPositions, updateIconPosition],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}

export function playIfEnabled(fn: () => void, enabled: boolean) {
  if (enabled) fn();
}
