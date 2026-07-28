import { useEffect, useState } from "react";
import { profile } from "../../data/profile";

type ScreenSaverProps = {
  onDismiss: () => void;
};

export function ScreenSaver({ onDismiss }: ScreenSaverProps) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [dx, setDx] = useState(2);
  const [dy, setDy] = useState(1.5);

  useEffect(() => {
    const id = setInterval(() => {
      setPos((p) => {
        let nx = p.x + dx;
        let ny = p.y + dy;
        let ndx = dx;
        let ndy = dy;
        if (nx <= 5 || nx >= 85) ndx = -ndx;
        if (ny <= 5 || ny >= 75) ndy = -ndy;
        setDx(ndx);
        setDy(ndy);
        return { x: nx, y: ny };
      });
    }, 40);
    return () => clearInterval(id);
  }, [dx, dy]);

  return (
    <div
      className="w98-screensaver"
      onPointerDown={onDismiss}
      onKeyDown={onDismiss}
      role="presentation"
      tabIndex={0}
    >
      <div
        className="w98-screensaver-logo"
        style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
      >
        <div className="w98-screensaver-text">PortfolioOS 98</div>
        <div className="w98-screensaver-sub">{profile.name}</div>
      </div>
      <p className="w98-screensaver-hint">Move mouse or tap to return</p>
    </div>
  );
}
