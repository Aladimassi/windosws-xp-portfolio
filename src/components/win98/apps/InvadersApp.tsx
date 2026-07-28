import { useEffect, useRef, useState } from "react";

const W = 280;
const H = 240;
const COLS = 8;
const ROWS = 4;

type Bullet = { x: number; y: number };
type Alien = { x: number; y: number; alive: boolean };

export function InvadersApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [over, setOver] = useState(false);

  const initAliens = (): Alien[] => {
    const aliens: Alien[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        aliens.push({ x: 20 + c * 30, y: 20 + r * 22, alive: true });
      }
    }
    return aliens;
  };

  const game = useRef({
    px: W / 2,
    bullets: [] as Bullet[],
    aliens: initAliens(),
    dir: 1,
    tick: 0,
    score: 0,
    over: false,
  });

  const reset = () => {
    game.current = {
      px: W / 2,
      bullets: [],
      aliens: initAliens(),
      dir: 1,
      tick: 0,
      score: 0,
      over: false,
    };
    setScore(0);
    setOver(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let id = 0;

    const loop = () => {
      const g = game.current;
      g.tick += 1;

      if (!g.over && g.tick % 30 === 0) {
        let edge = false;
        g.aliens.forEach((a) => {
          if (!a.alive) return;
          if ((g.dir > 0 && a.x > W - 24) || (g.dir < 0 && a.x < 8)) edge = true;
        });
        if (edge) {
          g.dir *= -1;
          g.aliens.forEach((a) => { if (a.alive) a.y += 10; });
        } else {
          g.aliens.forEach((a) => { if (a.alive) a.x += g.dir * 4; });
        }

        g.aliens.forEach((a) => {
          if (a.alive && a.y > H - 40) {
            g.over = true;
            setOver(true);
          }
        });
      }

      g.bullets = g.bullets.filter((b) => {
        b.y -= 6;
        if (b.y < 0) return false;
        for (const a of g.aliens) {
          if (a.alive && Math.abs(b.x - a.x) < 14 && Math.abs(b.y - a.y) < 12) {
            a.alive = false;
            g.score += 10;
            setScore(g.score);
            return false;
          }
        }
        return true;
      });

      if (g.aliens.every((a) => !a.alive)) {
        g.over = true;
        setOver(true);
      }

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);

      g.aliens.forEach((a) => {
        if (!a.alive) return;
        ctx.fillStyle = "#00ff00";
        ctx.fillRect(a.x - 10, a.y - 8, 20, 14);
        ctx.fillStyle = "#000";
        ctx.fillRect(a.x - 4, a.y - 2, 3, 3);
        ctx.fillRect(a.x + 2, a.y - 2, 3, 3);
      });

      ctx.fillStyle = "#00ffff";
      ctx.fillRect(g.px - 14, H - 20, 28, 10);

      ctx.fillStyle = "#ffff00";
      g.bullets.forEach((b) => {
        ctx.fillRect(b.x - 1, b.y - 6, 3, 8);
      });

      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  const move = (dir: -1 | 1) => {
    game.current.px = Math.max(14, Math.min(W - 14, game.current.px + dir * 16));
  };

  const shoot = () => {
    if (game.current.over) return;
    game.current.bullets.push({ x: game.current.px, y: H - 24 });
  };

  return (
    <div className="w98-game">
      <div className="w98-snake-hud w98-outset">
        <span>Score: {score}</span>
        <button type="button" className="w98-btn w98-outset" onClick={reset}>New</button>
      </div>
      <canvas ref={canvasRef} width={W} height={H} className="w98-game-canvas w98-inset" />
      <div className="w98-game-pad w98-game-pad--3">
        <button type="button" className="w98-btn w98-outset" onClick={() => move(-1)}>◀</button>
        <button type="button" className="w98-btn w98-outset w98-btn--primary" onClick={shoot}>🔫 Fire</button>
        <button type="button" className="w98-btn w98-outset" onClick={() => move(1)}>▶</button>
      </div>
      {over && (
        <p className="w98-mine-msg w98-mine-msg--lose">
          {game.current.aliens.every((a) => !a.alive) ? "Earth saved! 🌍" : "Invaders landed!"}
        </p>
      )}
    </div>
  );
}
