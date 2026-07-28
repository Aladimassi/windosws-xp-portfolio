import { useCallback, useEffect, useState } from "react";

const W = 10;
const H = 18;
const SHAPES = [
  [[1, 1, 1, 1]],
  [[1, 1], [1, 1]],
  [[0, 1, 0], [1, 1, 1]],
  [[1, 0, 0], [1, 1, 1]],
  [[0, 0, 1], [1, 1, 1]],
  [[1, 1, 0], [0, 1, 1]],
  [[0, 1, 1], [1, 1, 0]],
];

type Piece = { shape: number[][]; x: number; y: number; id: number };

function rotate(shape: number[][]) {
  const rows = shape.length;
  const cols = shape[0]!.length;
  return Array.from({ length: cols }, (_, c) =>
    Array.from({ length: rows }, (_, r) => shape[rows - 1 - r]![c]!),
  );
}

function emptyBoard() {
  return Array.from({ length: H }, () => Array(W).fill(0));
}

export function TetrisApp() {
  const [board, setBoard] = useState<number[][]>(emptyBoard);
  const [piece, setPiece] = useState<Piece>(() => newPiece());
  const [score, setScore] = useState(0);
  const [over, setOver] = useState(false);

  function newPiece(): Piece {
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)]!;
    return { shape, x: 3, y: 0, id: Math.random() };
  }

  const collides = useCallback((p: Piece, b: number[][]) => {
    for (let r = 0; r < p.shape.length; r++) {
      for (let c = 0; c < p.shape[r]!.length; c++) {
        if (!p.shape[r]![c]) continue;
        const x = p.x + c;
        const y = p.y + r;
        if (x < 0 || x >= W || y >= H) return true;
        if (y >= 0 && b[y]![x]) return true;
      }
    }
    return false;
  }, []);

  const merge = useCallback((p: Piece, b: number[][]) => {
    const next = b.map((row) => [...row]);
    for (let r = 0; r < p.shape.length; r++) {
      for (let c = 0; c < p.shape[r]!.length; c++) {
        if (p.shape[r]![c] && p.y + r >= 0) next[p.y + r]![p.x + c] = 1;
      }
    }
    return next;
  }, []);

  const clearLines = (b: number[][]) => {
    const kept = b.filter((row) => row.some((c) => !c));
    const cleared = H - kept.length;
    while (kept.length < H) kept.unshift(Array(W).fill(0));
    return { board: kept, cleared };
  };

  const tick = useCallback(() => {
    if (over) return;
    setPiece((p) => {
      const moved = { ...p, y: p.y + 1 };
      if (!collides(moved, board)) return moved;

      const merged = merge(p, board);
      const { board: cleared, cleared: lines } = clearLines(merged);
      if (lines) setScore((s) => s + lines * 100);
      const np = newPiece();
      if (collides(np, cleared)) setOver(true);
      setBoard(cleared);
      return np;
    });
  }, [board, collides, merge, over]);

  useEffect(() => {
    const id = setInterval(tick, 600);
    return () => clearInterval(id);
  }, [tick]);

  const move = (dx: number) => {
    setPiece((p) => {
      const m = { ...p, x: p.x + dx };
      return collides(m, board) ? p : m;
    });
  };

  const rot = () => {
    setPiece((p) => {
      const m = { ...p, shape: rotate(p.shape) };
      return collides(m, board) ? p : m;
    });
  };

  const drop = () => {
    setPiece((p) => {
      let y = p.y;
      while (!collides({ ...p, y: y + 1 }, board)) y++;
      return { ...p, y };
    });
  };

  const reset = () => {
    setBoard(emptyBoard());
    setPiece(newPiece());
    setScore(0);
    setOver(false);
  };

  const render = () => {
    const grid = board.map((row) => [...row]);
    for (let r = 0; r < piece.shape.length; r++) {
      for (let c = 0; c < piece.shape[r]!.length; c++) {
        if (!piece.shape[r]![c]) continue;
        const y = piece.y + r;
        const x = piece.x + c;
        if (y >= 0 && y < H && x >= 0 && x < W) grid[y]![x] = 2;
      }
    }
    return grid;
  };

  const grid = render();

  return (
    <div className="w98-tetris">
      <div className="w98-snake-hud w98-outset">
        <span>Score: {score}</span>
        <button type="button" className="w98-btn w98-outset" onClick={reset}>New</button>
      </div>
      <div className="w98-tetris-grid w98-inset" style={{ gridTemplateColumns: `repeat(${W}, 1fr)` }}>
        {grid.flat().map((v, i) => (
          <div key={i} className={`w98-tetris-cell${v ? " w98-tetris-cell--filled" : ""}${v === 2 ? " w98-tetris-cell--active" : ""}`} />
        ))}
      </div>
      <div className="w98-tetris-controls">
        <button type="button" className="w98-btn w98-outset" onClick={() => move(-1)}>◀</button>
        <button type="button" className="w98-btn w98-outset" onClick={rot}>↻</button>
        <button type="button" className="w98-btn w98-outset" onClick={() => move(1)}>▶</button>
        <button type="button" className="w98-btn w98-outset" onClick={drop}>▼</button>
      </div>
      {over && <p className="w98-mine-msg w98-mine-msg--lose">Game Over!</p>}
    </div>
  );
}
