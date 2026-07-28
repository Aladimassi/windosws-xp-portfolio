import { useSettings, type Wallpaper } from "../../../hooks/useSettings";
import { t } from "../../../lib/i18n";
import { playClickSound } from "../../../lib/sounds";

const WALLPAPERS: { id: Wallpaper; preview: string }[] = [
  { id: "clouds", preview: "linear-gradient(180deg,#0080c8,#58b4e8,#87ceeb)" },
  { id: "bliss", preview: "linear-gradient(180deg,#1a6b1a 0%,#3cb043 40%,#87ceeb 100%)" },
  { id: "teal", preview: "#008080" },
];

export function DisplayApp() {
  const { wallpaper, sounds, locale, setWallpaper, setSounds, setLocale } = useSettings();

  return (
    <div className="w98-display">
      <fieldset className="w98-fieldset">
        <legend>{t("wallpaper", locale)}</legend>
        <div className="w98-display-grid">
          {WALLPAPERS.map((w) => (
            <button
              key={w.id}
              type="button"
              className={`w98-display-opt${wallpaper === w.id ? " selected" : ""}`}
              onClick={() => {
                setWallpaper(w.id);
                playClickSound();
              }}
            >
              <div className="w98-display-preview" style={{ background: w.preview }} />
              <span>{t(w.id, locale)}</span>
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="w98-fieldset">
        <legend>{t("sounds", locale)}</legend>
        <label className="w98-display-check">
          <input type="checkbox" checked={sounds} onChange={(e) => setSounds(e.target.checked)} />
          Enable system sounds
        </label>
      </fieldset>
      <fieldset className="w98-fieldset">
        <legend>{t("language", locale)}</legend>
        <div className="w98-display-lang">
          <button type="button" className={`w98-btn w98-outset${locale === "fr" ? " pressed" : ""}`} onClick={() => setLocale("fr")}>
            Français
          </button>
          <button type="button" className={`w98-btn w98-outset${locale === "en" ? " pressed" : ""}`} onClick={() => setLocale("en")}>
            English
          </button>
        </div>
      </fieldset>
    </div>
  );
}
