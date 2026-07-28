import { useCallback, useMemo, useRef, useState } from "react";

const ROWS = 9;
const COLS = 9;
const MINES = 10;

type Cell = {
  mine: boolean;
  adjacent: number;
  revealed: boolean;
  flagged: boolean;
};

type Status = "idle" | "playing" | "won" | "lost";

function makeGrid(): Cell[][] {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      mine: false,
      adjacent: 0,
      revealed: false,
      flagged: false,
    })),
  );
}

function placeMines(grid: Cell[][], safeR: number, safeC: number) {
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (grid[r]![c]!.mine) continue;
    if (Math.abs(r - safeR) <= 1 && Math.abs(c - safeC) <= 1) continue;
    grid[r]![c]!.mine = true;
    placed += 1;
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r]![c]!.mine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr]![nc]!.mine) {
            count += 1;
          }
        }
      }
      grid[r]![c]!.adjacent = count;
    }
  }
}

function cloneGrid(grid: Cell[][]) {
  return grid.map((row) => row.map((cell) => ({ ...cell })));
}

function revealCells(grid: Cell[][], r: number, c: number): Cell[][] {
  const next = cloneGrid(grid);
  const stack: [number, number][] = [[r, c]];

  while (stack.length > 0) {
    const [cr, cc] = stack.pop()!;
    const cell = next[cr]![cc]!;
    if (cell.revealed || cell.flagged) continue;
    cell.revealed = true;
    if (cell.mine) continue;
    if (cell.adjacent === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = cr + dr;
          const nc = cc + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && !next[nr]![nc]!.revealed) {
            stack.push([nr, nc]);
          }
        }
      }
    }
  }

  return next;
}

function checkWin(grid: Cell[][]) {
  for (const row of grid) {
    for (const cell of row) {
      if (!cell.mine && !cell.revealed) return false;
    }
  }
  return true;
}

function countFlags(grid: Cell[][]) {
  return grid.flat().filter((c) => c.flagged).length;
}

const NUM_COLORS = ["", "#0000ff", "#008000", "#ff0000", "#000080", "#800000", "#008080", "#000", "#808080"];

export function MinesweeperApp() {
  const [grid, setGrid] = useState<Cell[][]>(() => makeGrid());
  const [status, setStatus] = useState<Status>("idle");
  const [flagMode, setFlagMode] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const longPressRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const minesLeft = MINES - countFlags(grid);

  const startTimer = useCallback(() => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => setSeconds((s) => Math.min(s + 1, 999)), 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    stopTimer();
    setGrid(makeGrid());
    setStatus("idle");
    setSeconds(0);
  }, [stopTimer]);

  const handleReveal = useCallback(
    (r: number, c: number) => {
      if (status === "won" || status === "lost") return;

      setGrid((prev) => {
        const cell = prev[r]![c]!;
        if (cell.flagged || cell.revealed) return prev;

        let next = prev;
        if (status === "idle") {
          next = makeGrid();
          placeMines(next, r, c);
          setStatus("playing");
          startTimer();
        }

        if (next[r]![c]!.mine) {
          stopTimer();
          setStatus("lost");
          return next.map((row) =>
            row.map((cell) => ({
              ...cell,
              revealed: cell.mine ? true : cell.revealed,
            })),
          );
        }

        const revealed = revealCells(next, r, c);
        if (checkWin(revealed)) {
          stopTimer();
          setStatus("won");
        }
        return revealed;
      });
    },
    [status, startTimer, stopTimer],
  );

  const handleFlag = useCallback(
    (r: number, c: number) => {
      if (status === "won" || status === "lost") return;

      setGrid((prev) => {
        const cell = prev[r]![c]!;
        if (cell.revealed) return prev;
        const next = cloneGrid(prev);
        next[r]![c]!.flagged = !next[r]![c]!.flagged;
        return next;
      });

      if (status === "idle") setStatus("playing");
    },
    [status],
  );

  const face = useMemo(() => {
    if (status === "won") return "😎";
    if (status === "lost") return "😵";
    return "🙂";
  }, [status]);

  const pad = (n: number) => String(n).padStart(3, "0").slice(-3);

  return (
    <div className="w98-mine">
      <div className="w98-mine-toolbar w98-outset">
        <div className="w98-mine-counter w98-inset">{pad(minesLeft)}</div>
        <button type="button" className="w98-btn w98-outset w98-mine-face" onClick={reset} aria-label="New game">
          {face}
        </button>
        <div className="w98-mine-counter w98-inset">{pad(seconds)}</div>
      </div>

      <div className="w98-mine-mode">
        <button
          type="button"
          className={`w98-btn w98-outset w98-mine-mode-btn${!flagMode ? " pressed" : ""}`}
          onClick={() => setFlagMode(false)}
        >
          👆 Reveal
        </button>
        <button
          type="button"
          className={`w98-btn w98-outset w98-mine-mode-btn${flagMode ? " pressed" : ""}`}
          onClick={() => setFlagMode(true)}
        >
          🚩 Flag
        </button>
      </div>
      <p className="w98-mine-hint">Tap to play · Long press = flag</p>

      <div className="w98-mine-grid w98-inset" role="grid" aria-label="Minesweeper">
        {grid.map((row, r) =>
          row.map((cell, c) => {
            let content: React.ReactNode = null;
            if (cell.flagged && !cell.revealed) content = "🚩";
            else if (cell.revealed) {
              if (cell.mine) content = "💣";
              else if (cell.adjacent > 0) {
                content = (
                  <span style={{ color: NUM_COLORS[cell.adjacent] }}>{cell.adjacent}</span>
                );
              }
            }

            return (
              <button
                key={`${r}-${c}`}
                type="button"
                className={`w98-mine-cell w98-outset${cell.revealed ? " w98-mine-cell--open" : ""}${cell.revealed && cell.mine ? " w98-mine-cell--boom" : ""}`}
                aria-label={`Cell ${r + 1}, ${c + 1}`}
                onClick={() => (flagMode ? handleFlag(r, c) : handleReveal(r, c))}
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleFlag(r, c);
                }}
                onPointerDown={() => {
                  longPressRef.current = setTimeout(() => handleFlag(r, c), 450);
                }}
                onPointerUp={() => {
                  if (longPressRef.current) clearTimeout(longPressRef.current);
                }}
                onPointerLeave={() => {
                  if (longPressRef.current) clearTimeout(longPressRef.current);
                }}
              >
                {content}
              </button>
            );
          }),
        )}
      </div>

      {status === "won" && <p className="w98-mine-msg w98-mine-msg--win">You win! 🎉</p>}
      {status === "lost" && <p className="w98-mine-msg w98-mine-msg--lose">BOOM! Click 🙂 to retry.</p>}
    </div>
  );
}
