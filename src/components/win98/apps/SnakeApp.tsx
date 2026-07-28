import { useCallback, useEffect, useState } from "react";

const COLS = 14;
const ROWS = 16;
const TICK = 140;

type Point = { x: number; y: number };

export function SnakeApp() {
  const [snake, setSnake] = useState<Point[]>([{ x: 7, y: 8 }]);
  const [dir, setDir] = useState<Point>({ x: 1, y: 0 });
  const [food, setFood] = useState<Point>({ x: 10, y: 8 });
  const [alive, setAlive] = useState(true);
  const [score, setScore] = useState(0);

  const spawnFood = useCallback((body: Point[]) => {
    let p: Point;
    do {
      p = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    } while (body.some((s) => s.x === p.x && s.y === p.y));
    setFood(p);
  }, []);

  useEffect(() => {
    if (!alive) return;
    const id = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0]!;
        const next = { x: head.x + dir.x, y: head.y + dir.y };
        if (next.x < 0 || next.x >= COLS || next.y < 0 || next.y >= ROWS) {
          setAlive(false);
          return prev;
        }
        if (prev.some((s) => s.x === next.x && s.y === next.y)) {
          setAlive(false);
          return prev;
        }
        const ate = next.x === food.x && next.y === food.y;
        const newSnake = [next, ...prev];
        if (!ate) newSnake.pop();
        else {
          setScore((s) => s + 10);
          spawnFood(newSnake);
        }
        return newSnake;
      });
    }, TICK);
    return () => clearInterval(id);
  }, [alive, dir, food, spawnFood]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Point> = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      };
      const d = map[e.key];
      if (d) {
        e.preventDefault();
        setDir((cur) => (cur.x + d.x === 0 && cur.y + d.y === 0 ? cur : d));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const reset = () => {
    setSnake([{ x: 7, y: 8 }]);
    setDir({ x: 1, y: 0 });
    setFood({ x: 10, y: 8 });
    setAlive(true);
    setScore(0);
  };

  const turn = (d: Point) => setDir((cur) => (cur.x + d.x === 0 && cur.y + d.y === 0 ? cur : d));

  return (
    <div className="w98-snake">
      <div className="w98-snake-hud w98-outset">
        <span>Score: {score}</span>
        <button type="button" className="w98-btn w98-outset" onClick={reset}>
          New
        </button>
      </div>
      <div className="w98-snake-grid w98-inset" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
        {Array.from({ length: ROWS * COLS }).map((_, i) => {
          const x = i % COLS;
          const y = Math.floor(i / COLS);
          const isSnake = snake.some((s) => s.x === x && s.y === y);
          const isHead = snake[0]?.x === x && snake[0]?.y === y;
          const isFood = food.x === x && food.y === y;
          return (
            <div
              key={i}
              className={`w98-snake-cell${isSnake ? " w98-snake-cell--snake" : ""}${isHead ? " w98-snake-cell--head" : ""}${isFood ? " w98-snake-cell--food" : ""}`}
            />
          );
        })}
      </div>
      <div className="w98-snake-pad">
        <button type="button" className="w98-btn w98-outset" onClick={() => turn({ x: 0, y: -1 })}>▲</button>
        <div className="w98-snake-pad-mid">
          <button type="button" className="w98-btn w98-outset" onClick={() => turn({ x: -1, y: 0 })}>◀</button>
          <button type="button" className="w98-btn w98-outset" onClick={() => turn({ x: 1, y: 0 })}>▶</button>
        </div>
        <button type="button" className="w98-btn w98-outset" onClick={() => turn({ x: 0, y: 1 })}>▼</button>
      </div>
      {!alive && <p className="w98-mine-msg w98-mine-msg--lose">Game Over! Score: {score}</p>}
    </div>
  );
}
