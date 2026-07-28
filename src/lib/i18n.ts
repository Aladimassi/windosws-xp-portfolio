export type Locale = "fr" | "en";

const dict = {
  fr: {
    start: "Démarrer",
    myComputer: "Poste de travail",
    recycleBin: "Corbeille",
    displayProps: "Propriétés de l'affichage",
    refresh: "Actualiser",
    properties: "Propriétés",
    open: "Ouvrir",
    games: "Jeux",
    programs: "Programmes",
    shutDown: "Arrêter le système...",
    wallpaper: "Fond d'écran",
    sounds: "Sons système",
    language: "Langue",
    clouds: "Nuages (Win98)",
    bliss: "Bliss (collines)",
    teal: "Sarcelle",
  },
  en: {
    start: "Start",
    myComputer: "My Computer",
    recycleBin: "Recycle Bin",
    displayProps: "Display Properties",
    refresh: "Refresh",
    properties: "Properties",
    open: "Open",
    games: "Games",
    programs: "Programs",
    shutDown: "Shut Down...",
    wallpaper: "Wallpaper",
    sounds: "System sounds",
    language: "Language",
    clouds: "Clouds (Win98)",
    bliss: "Bliss (hills)",
    teal: "Teal",
  },
} as const;

export type I18nKey = keyof typeof dict.en;

export function t(key: I18nKey, locale: Locale): string {
  return dict[locale][key];
}
