import { useEffect, useRef, useState } from "react";

const W = 280;
const H = 220;
const BRICK_ROWS = 5;
const BRICK_COLS = 7;

export function BreakoutApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [over, setOver] = useState(false);

  const init = () => ({
    px: W / 2 - 30,
    ballX: W / 2,
    ballY: H - 40,
    vx: 2,
    vy: -2.5,
    bricks: Array.from({ length: BRICK_ROWS }, (_, r) =>
      Array.from({ length: BRICK_COLS }, () => ({
        alive: true,
        color: ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#0080ff"][r]!,
      })),
    ),
    score: 0,
    lives: 3,
    over: false,
  });

  const game = useRef(init());

  const resetGame = () => {
    game.current = init();
    setScore(0);
    setLives(3);
    setOver(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let id = 0;

    const loop = () => {
      const g = game.current;
      if (!g.over) {
        g.ballX += g.vx;
        g.ballY += g.vy;
        if (g.ballX <= 4 || g.ballX >= W - 4) g.vx *= -1;
        if (g.ballY <= 4) g.vy = Math.abs(g.vy);

        const pw = 60;
        if (g.ballY >= H - 20 && g.ballX >= g.px && g.ballX <= g.px + pw && g.vy > 0) {
          g.vy = -Math.abs(g.vy);
          g.vx = (g.ballX - (g.px + pw / 2)) * 0.15;
        }

        if (g.ballY > H) {
          g.lives -= 1;
          setLives(g.lives);
          if (g.lives <= 0) {
            g.over = true;
            setOver(true);
          } else {
            g.ballX = W / 2;
            g.ballY = H - 40;
            g.vx = 2;
            g.vy = -2.5;
          }
        }

        const bw = W / BRICK_COLS - 4;
        const bh = 14;
        g.bricks.forEach((row, r) => {
          row.forEach((brick, c) => {
            if (!brick.alive) return;
            const bx = c * (bw + 4) + 2;
            const by = r * (bh + 4) + 24;
            if (
              g.ballX >= bx && g.ballX <= bx + bw &&
              g.ballY >= by && g.ballY <= by + bh
            ) {
              brick.alive = false;
              g.vy *= -1;
              g.score += 10;
              setScore(g.score);
            }
          });
        });

        if (g.bricks.every((row) => row.every((b) => !b.alive))) {
          g.over = true;
          setOver(true);
        }
      }

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);

      const bw = W / BRICK_COLS - 4;
      const bh = 14;
      g.bricks.forEach((row, r) => {
        row.forEach((brick, c) => {
          if (!brick.alive) return;
          ctx.fillStyle = brick.color;
          ctx.fillRect(c * (bw + 4) + 2, r * (bh + 4) + 24, bw, bh);
        });
      });

      ctx.fillStyle = "#c0c0c0";
      ctx.fillRect(g.px, H - 14, 60, 8);
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(g.ballX, g.ballY, 4, 0, Math.PI * 2);
      ctx.fill();

      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  const move = (dir: -1 | 1) => {
    game.current.px = Math.max(0, Math.min(W - 60, game.current.px + dir * 24));
  };

  return (
    <div className="w98-game">
      <div className="w98-snake-hud w98-outset">
        <span>Score: {score} · Lives: {lives}</span>
        <button type="button" className="w98-btn w98-outset" onClick={resetGame}>New</button>
      </div>
      <canvas ref={canvasRef} width={W} height={H} className="w98-game-canvas w98-inset" />
      <div className="w98-game-pad">
        <button type="button" className="w98-btn w98-outset" onClick={() => move(-1)}>◀</button>
        <button type="button" className="w98-btn w98-outset" onClick={() => move(1)}>▶</button>
      </div>
      {over && (
        <p className="w98-mine-msg w98-mine-msg--lose">
          {game.current.bricks.every((r) => r.every((b) => !b.alive)) ? "You cleared all bricks! 🎉" : "Game Over"}
        </p>
      )}
    </div>
  );
}
