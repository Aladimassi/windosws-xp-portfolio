import { useCallback, useState } from "react";

type Grid = number[][];

function emptyGrid(): Grid {
  return Array.from({ length: 4 }, () => Array(4).fill(0));
}

function spawn(grid: Grid): Grid {
  const empty: [number, number][] = [];
  grid.forEach((row, r) => row.forEach((v, c) => { if (!v) empty.push([r, c]); }));
  if (!empty.length) return grid;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)]!;
  const next = grid.map((row) => [...row]);
  next[r]![c] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

function slide(row: number[]) {
  const filtered = row.filter((v) => v);
  const merged: number[] = [];
  let i = 0;
  while (i < filtered.length) {
    if (filtered[i] === filtered[i + 1]) {
      merged.push(filtered[i]! * 2);
      i += 2;
    } else {
      merged.push(filtered[i]!);
      i += 1;
    }
  }
  while (merged.length < 4) merged.push(0);
  return merged;
}

function moveLeft(grid: Grid): Grid {
  return grid.map((row) => slide(row));
}

function rotateGrid(grid: Grid): Grid {
  return grid[0]!.map((_, c) => grid.map((row) => row[c]!).reverse());
}

function move(grid: Grid, dir: "left" | "right" | "up" | "down"): Grid {
  let g = grid;
  if (dir === "right") g = rotateGrid(rotateGrid(moveLeft(rotateGrid(rotateGrid(g)))));
  else if (dir === "up") g = rotateGrid(rotateGrid(rotateGrid(moveLeft(rotateGrid(g)))));
  else if (dir === "down") g = rotateGrid(moveLeft(rotateGrid(rotateGrid(rotateGrid(g)))));
  else g = moveLeft(g);
  return g;
}

function gridsEqual(a: Grid, b: Grid) {
  return a.every((row, r) => row.every((v, c) => v === b[r]![c]));
}

function scoreOf(grid: Grid) {
  return grid.flat().reduce((s, v) => s + v, 0);
}

const COLORS: Record<number, string> = {
  0: "#bdbdbd", 2: "#eee4da", 4: "#ede0c8", 8: "#f2b179",
  16: "#f59563", 32: "#f67c5f", 64: "#f65e3b", 128: "#edcf72",
  256: "#edcc61", 512: "#edc850", 1024: "#edc53f", 2048: "#edc22e",
};

export function Game2048App() {
  const [grid, setGrid] = useState(() => spawn(spawn(emptyGrid())));
  const [best, setBest] = useState(0);
  const [won, setWon] = useState(false);

  const tryMove = useCallback((dir: "left" | "right" | "up" | "down") => {
    setGrid((prev) => {
      const moved = move(prev, dir);
      if (gridsEqual(moved, prev)) return prev;
      const next = spawn(moved);
      const sc = scoreOf(next);
      setBest((b) => Math.max(b, sc));
      if (next.flat().includes(2048)) setWon(true);
      return next;
    });
  }, []);

  const reset = () => {
    setGrid(spawn(spawn(emptyGrid())));
    setWon(false);
  };

  return (
    <div className="w98-game">
      <div className="w98-snake-hud w98-outset">
        <span>Score: {scoreOf(grid)} · Best: {best}</span>
        <button type="button" className="w98-btn w98-outset" onClick={reset}>New</button>
      </div>
      <div className="w98-2048-grid w98-inset">
        {grid.flat().map((v, i) => (
          <div
            key={i}
            className="w98-2048-cell"
            style={{ background: COLORS[v] ?? "#3c3a32", color: v > 4 ? "#fff" : "#000" }}
          >
            {v || ""}
          </div>
        ))}
      </div>
      <div className="w98-snake-pad">
        <button type="button" className="w98-btn w98-outset" onClick={() => tryMove("up")}>▲</button>
        <div className="w98-snake-pad-mid">
          <button type="button" className="w98-btn w98-outset" onClick={() => tryMove("left")}>◀</button>
          <button type="button" className="w98-btn w98-outset" onClick={() => tryMove("right")}>▶</button>
        </div>
        <button type="button" className="w98-btn w98-outset" onClick={() => tryMove("down")}>▼</button>
      </div>
      {won && <p className="w98-mine-msg w98-mine-msg--win">2048! 🎉</p>}
    </div>
  );
}
