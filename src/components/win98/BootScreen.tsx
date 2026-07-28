import { useEffect, useState } from "react";
import { WinLogo } from "./icons";

const BOOT_MESSAGES = [
  "Starting PortfolioOS 98...",
  "Loading kernel modules...",
  "Initializing desktop environment...",
  "Mounting C:\\Projects...",
  "Loading user profile: Ala Dimassi...",
  "Welcome.",
];

type BootScreenProps = {
  onComplete: () => void;
};

export function BootScreen({ onComplete }: BootScreenProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reducedMotion ? 400 : 3200;
    const steps = reducedMotion ? 1 : 32;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step += 1;
      setProgress(Math.min(100, (step / steps) * 100));
      setMessageIndex(
        Math.min(BOOT_MESSAGES.length - 1, Math.floor((step / steps) * BOOT_MESSAGES.length)),
      );

      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, reducedMotion ? 100 : 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="w98-boot" role="status" aria-live="polite">
      <div className="w98-boot-inner">
        <div className="w98-boot-logo-wrap">
          <WinLogo size={48} />
          <div className="w98-boot-logo">
            Microsoft <span>Windows</span> 98
          </div>
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
        <div className="w98-boot-copyright">Copyright © 1998 Ala Dimassi Portfolio</div>
      </div>
    </div>
  );
}
