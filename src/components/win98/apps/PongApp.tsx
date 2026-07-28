import { useEffect, useRef, useState } from "react";

const W = 280;
const H = 200;
const PADDLE_W = 50;
const PADDLE_H = 8;

export function PongApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({
    px: W / 2 - PADDLE_W / 2,
    ax: W / 2 - PADDLE_W / 2,
    ballX: W / 2,
    ballY: H / 2,
    vx: 2.5,
    vy: 2,
    scoreP: 0,
    scoreA: 0,
    keys: { left: false, right: false },
  });
  const [score, setScore] = useState({ p: 0, a: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const onKey = (e: KeyboardEvent, down: boolean) => {
      if (e.key === "ArrowLeft") state.current.keys.left = down;
      if (e.key === "ArrowRight") state.current.keys.right = down;
    };
    window.addEventListener("keydown", (e) => onKey(e, true));
    window.addEventListener("keyup", (e) => onKey(e, false));

    let id = 0;
    const loop = () => {
      const s = state.current;
      if (s.keys.left) s.px = Math.max(0, s.px - 5);
      if (s.keys.right) s.px = Math.min(W - PADDLE_W, s.px + 5);

      s.ax += (s.ballX - s.ax - PADDLE_W / 2) * 0.08;
      s.ax = Math.max(0, Math.min(W - PADDLE_W, s.ax));

      s.ballX += s.vx;
      s.ballY += s.vy;

      if (s.ballX <= 4 || s.ballX >= W - 4) s.vx *= -1;
      if (s.ballY <= 4) s.vy = Math.abs(s.vy);

      if (s.ballY >= H - 16 && s.ballX >= s.px && s.ballX <= s.px + PADDLE_W) {
        s.vy = -Math.abs(s.vy);
        s.vx += (s.ballX - (s.px + PADDLE_W / 2)) * 0.05;
      }
      if (s.ballY <= 16 && s.ballX >= s.ax && s.ballX <= s.ax + PADDLE_W) {
        s.vy = Math.abs(s.vy);
      }

      if (s.ballY > H) {
        s.scoreA += 1;
        setScore({ p: s.scoreP, a: s.scoreA });
        resetBall(s);
      }
      if (s.ballY < 0) {
        s.scoreP += 1;
        setScore({ p: s.scoreP, a: s.scoreA });
        resetBall(s);
      }

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "#333";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, H / 2);
      ctx.lineTo(W, H / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#fff";
      ctx.fillRect(s.ax, 8, PADDLE_W, PADDLE_H);
      ctx.fillStyle = "#00ff00";
      ctx.fillRect(s.px, H - 16, PADDLE_W, PADDLE_H);
      ctx.beginPath();
      ctx.arc(s.ballX, s.ballY, 5, 0, Math.PI * 2);
      ctx.fill();

      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("keydown", (e) => onKey(e, true));
      window.removeEventListener("keyup", (e) => onKey(e, false));
    };
  }, []);

  const move = (dir: -1 | 1) => {
    const s = state.current;
    s.px = Math.max(0, Math.min(W - PADDLE_W, s.px + dir * 20));
  };

  const reset = () => {
    state.current.scoreP = 0;
    state.current.scoreA = 0;
    setScore({ p: 0, a: 0 });
    resetBall(state.current);
  };

  return (
    <div className="w98-game">
      <div className="w98-snake-hud w98-outset">
        <span>You {score.p} — CPU {score.a}</span>
        <button type="button" className="w98-btn w98-outset" onClick={reset}>New</button>
      </div>
      <canvas ref={canvasRef} width={W} height={H} className="w98-game-canvas w98-inset" />
      <div className="w98-game-pad">
        <button type="button" className="w98-btn w98-outset" onClick={() => move(-1)}>◀</button>
        <button type="button" className="w98-btn w98-outset" onClick={() => move(1)}>▶</button>
      </div>
    </div>
  );
}

function resetBall(s: { ballX: number; ballY: number; vx: number; vy: number }) {
  s.ballX = W / 2;
  s.ballY = H / 2;
  s.vx = (Math.random() > 0.5 ? 1 : -1) * 2.5;
  s.vy = 2;
}
