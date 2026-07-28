import { useState } from "react";

const SUITS = ["♠", "♥", "♦", "♣"];
const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

type Card = { suit: number; rank: number; id: number };

function makeDeck(): Card[] {
  const deck: Card[] = [];
  let id = 0;
  for (let s = 0; s < 4; s++) {
    for (let r = 0; r < 13; r++) {
      deck.push({ suit: s, rank: r, id: id++ });
    }
  }
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j]!, deck[i]!];
  }
  return deck;
}

export function SolitaireApp() {
  const [deck, setDeck] = useState<Card[]>(() => makeDeck());
  const [waste, setWaste] = useState<Card[]>([]);
  const [foundations, setFoundations] = useState<Card[][]>([[], [], [], []]);
  const [won, setWon] = useState(false);

  const draw = () => {
    if (deck.length === 0) {
      if (waste.length === 0) return;
      setDeck([...waste].reverse());
      setWaste([]);
      return;
    }
    const [top, ...rest] = deck;
    setDeck(rest);
    setWaste((w) => [...w, top!]);
  };

  const toFoundation = (card: Card) => {
    const fi = card.suit;
    const pile = foundations[fi]!;
    const need = pile.length;
    if (card.rank !== need) return;
    setFoundations((f) => {
      const next = f.map((p) => [...p]);
      next[fi] = [...next[fi]!, card];
      return next;
    });
    setWaste((w) => w.slice(0, -1));
    if (foundations.every((p, i) => p.length === 13 || (i === fi && p.length === 12))) {
      setTimeout(() => setWon(true), 100);
    }
  };

  const topWaste = waste[waste.length - 1];
  const canPlace =
    topWaste &&
    foundations[topWaste.suit]!.length === topWaste.rank;

  const reset = () => {
    setDeck(makeDeck());
    setWaste([]);
    setFoundations([[], [], [], []]);
    setWon(false);
  };

  return (
    <div className="w98-solitaire">
      <div className="w98-snake-hud w98-outset">
        <span>Klondike (simplified)</span>
        <button type="button" className="w98-btn w98-outset" onClick={reset}>New</button>
      </div>
      <div className="w98-solitaire-row">
        <button type="button" className="w98-card w98-card--back w98-outset" onClick={draw}>
          🂠 {deck.length}
        </button>
        <button
          type="button"
          className="w98-card w98-outset"
          onClick={() => topWaste && canPlace && toFoundation(topWaste)}
          disabled={!topWaste}
        >
          {topWaste ? `${RANKS[topWaste.rank]}${SUITS[topWaste.suit]}` : "—"}
        </button>
        {foundations.map((pile, i) => (
          <div key={i} className="w98-card w98-outset w98-card--foundation">
            {pile.length > 0
              ? `${RANKS[pile[pile.length - 1]!.rank]}${SUITS[i]}`
              : SUITS[i]}
          </div>
        ))}
      </div>
      <p className="w98-solitaire-hint">
        Draw cards from the deck. Click waste card to auto-move to foundation (A→K per suit).
      </p>
      {won && <p className="w98-mine-msg w98-mine-msg--win">You win! 🎉</p>}
    </div>
  );
}
