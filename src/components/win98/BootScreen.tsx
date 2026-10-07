import { useCallback, useEffect, useState } from "react";
import { WinLogo } from "./icons";

const BOOT_MESSAGES = [
  "Démarrage d'Ala OS 98...",
  "Chargement du profil : Ala Dimassi...",
  "Bienvenue.",
];

const SEEN_KEY = "alaos98-booted";

/** True when the boot animation already played in this browser session. */
export function hasBootedThisSession(): boolean {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

type BootScreenProps = {
  onComplete: () => void;
};

/** Short boot animation (~1.5 s), skippable with a click or any key, shown once per session. */
export function BootScreen({ onComplete }: BootScreenProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* storage unavailable: boot again next time, no harm */
    }
    setVisible(false);
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reducedMotion ? 200 : 1400;
    const steps = reducedMotion ? 1 : 20;
    const interval = duration / steps;
    let step = 0;
    let done = false;

    const timer = setInterval(() => {
      step += 1;
      setProgress(Math.min(100, (step / steps) * 100));
      setMessageIndex(
        Math.min(BOOT_MESSAGES.length - 1, Math.floor((step / steps) * BOOT_MESSAGES.length)),
      );
      if (step >= steps && !done) {
        done = true;
        clearInterval(timer);
        setTimeout(finish, 150);
      }
    }, interval);

    const skip = () => {
      if (done) return;
      done = true;
      clearInterval(timer);
      finish();
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    return () => {
      clearInterval(timer);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [finish]);

  if (!visible) return null;

  return (
    <div className="w98-boot" role="status" aria-live="polite">
      <div className="w98-boot-inner">
        <div className="w98-boot-logo-wrap">
          <WinLogo size={48} />
          <div className="w98-boot-logo">
            Ala <span>OS</span> 98
          </div>
          <div className="w98-boot-user">Ala Dimassi · Portfolio</div>
        </div>

        <div className="w98-boot-bar-wrap w98-outset">
          <div className="w98-boot-bar-segments">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="w98-boot-segment"
                style={{ opacity: progress >= (i + 1) * 5 ? 1 : 0.15 }}
              />
            ))}
          </div>
        </div>

        <div className="w98-boot-text">{BOOT_MESSAGES[messageIndex]}</div>
        <div className="w98-boot-copyright">Cliquez ou appuyez sur une touche pour passer</div>
      </div>
    </div>
  );
}
