import { useCallback, useState } from "react";

const EMOJIS = ["🐍", "☕", "⚛️", "🤖", "📦", "🔧", "💻", "🌐"];

type Card = { id: number; emoji: string; flipped: boolean; matched: boolean };

function buildDeck(): Card[] {
  const pairs = [...EMOJIS, ...EMOJIS];
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j]!, pairs[i]!];
  }
  return pairs.map((emoji, id) => ({ id, emoji, flipped: false, matched: false }));
}

export function MemoryApp() {
  const [cards, setCards] = useState<Card[]>(() => buildDeck());
  const [first, setFirst] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const won = cards.length > 0 && cards.every((c) => c.matched);

  const reset = () => {
    setCards(buildDeck());
    setFirst(null);
    setMoves(0);
    setLocked(false);
  };

  const flip = useCallback(
    (idx: number) => {
      if (locked || cards[idx]!.flipped || cards[idx]!.matched) return;

      setCards((prev) => prev.map((c, i) => (i === idx ? { ...c, flipped: true } : c)));

      if (first === null) {
        setFirst(idx);
        return;
      }

      setMoves((m) => m + 1);
      setLocked(true);
      const a = cards[first]!.emoji;
      const b = cards[idx]!.emoji;

      if (a === b) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) => (i === first || i === idx ? { ...c, matched: true } : c)),
          );
          setFirst(null);
          setLocked(false);
        }, 400);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) => (i === first || i === idx ? { ...c, flipped: false } : c)),
          );
          setFirst(null);
          setLocked(false);
        }, 700);
      }
    },
    [cards, first, locked],
  );

  return (
    <div className="w98-game">
      <div className="w98-snake-hud w98-outset">
        <span>Moves: {moves}</span>
        <button type="button" className="w98-btn w98-outset" onClick={reset}>New</button>
      </div>
      <div className="w98-memory-grid w98-inset">
        {cards.map((card, i) => (
          <button
            key={card.id + "-" + i}
            type="button"
            className={`w98-memory-card w98-outset${card.flipped || card.matched ? " w98-memory-card--open" : ""}${card.matched ? " w98-memory-card--matched" : ""}`}
            onClick={() => flip(i)}
            disabled={card.matched}
          >
            {card.flipped || card.matched ? card.emoji : "?"}
          </button>
        ))}
      </div>
      {won && <p className="w98-mine-msg w98-mine-msg--win">All pairs found! 🎉</p>}
    </div>
  );
}
