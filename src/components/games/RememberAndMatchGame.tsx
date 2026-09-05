import React, { useState, useEffect } from 'react';
import { Check, Sparkles } from 'lucide-react';

interface CardItem {
  uid: string;
  symbol: string;
  label: string;
  matched: boolean;
}

const SYMBOLS = [
  { symbol: '🎋', label: 'Bamboo' },
  { symbol: '🌸', label: 'Kopou Orchid' },
  { symbol: '👒', label: 'Jaapi' },
  { symbol: '🪶', label: 'Hornbill Feather' }
];

interface RememberAndMatchProps {
  onComplete: (score: number, total: number, reactionSeconds: number) => void;
  speakPrompt: (text: string) => void;
}

export const RememberAndMatchGame: React.FC<RememberAndMatchProps> = ({
  onComplete,
  speakPrompt
}) => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedUids, setFlippedUids] = useState<string[]>([]);
  const [matchesCount, setMatchesCount] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [attempts, setAttempts] = useState<number>(0);

  useEffect(() => {
    // Generate pairs
    const deck: CardItem[] = [];
    SYMBOLS.forEach((item, index) => {
      deck.push({
        uid: `${item.label}-1-${index}`,
        symbol: item.symbol,
        label: item.label,
        matched: false
      });
      deck.push({
        uid: `${item.label}-2-${index}`,
        symbol: item.symbol,
        label: item.label,
        matched: false
      });
    });

    const shuffled = deck.sort(() => 0.5 - Math.random());
    setCards(shuffled);
    setFlippedUids([]);
    setMatchesCount(0);
    setAttempts(0);
    setStartTime(Date.now());

    speakPrompt('Turn over cards to find the matching pairs of traditional Indian symbols.');
  }, []);

  const handleCardClick = (card: CardItem) => {
    if (card.matched || flippedUids.includes(card.uid) || flippedUids.length === 2) {
      return;
    }

    const nextFlipped = [...flippedUids, card.uid];
    setFlippedUids(nextFlipped);

    if (nextFlipped.length === 2) {
      setAttempts((prev) => prev + 1);
      const first = cards.find((c) => c.uid === nextFlipped[0])!;
      const second = card;

      if (first.symbol === second.symbol) {
        // Matched!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.symbol === first.symbol ? { ...c, matched: true } : c
            )
          );
          setFlippedUids([]);
          const newMatches = matchesCount + 1;
          setMatchesCount(newMatches);

          if (newMatches === SYMBOLS.length) {
            const reactionSeconds = Number(
              ((Date.now() - startTime) / 1000).toFixed(1)
            );
            onComplete(SYMBOLS.length, SYMBOLS.length, reactionSeconds);
          }
        }, 500);
      } else {
        // Not matched, flip back after short pause
        setTimeout(() => {
          setFlippedUids([]);
        }, 1200);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto text-center">
      <div className="space-y-2">
        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-4 py-1.5 rounded-full">
          Short-Term Memory Match
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-stone-900">
          Find the Matching Pairs
        </h2>
        <p className="text-stone-600 text-base font-medium">
          Tap cards to flip and match the peaceful regional symbols.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3 sm:gap-4 py-4">
        {cards.map((card) => {
          const isFlipped = flippedUids.includes(card.uid) || card.matched;
          return (
            <button
              key={card.uid}
              onClick={() => handleCardClick(card)}
              className={`h-28 sm:h-36 rounded-3xl border-4 text-center transition-all flex flex-col items-center justify-center shadow-md active:scale-95 ${
                card.matched
                  ? 'bg-emerald-50 border-emerald-500 opacity-90'
                  : isFlipped
                  ? 'bg-white border-teal-600 ring-4 ring-teal-200'
                  : 'bg-teal-900 border-teal-800 hover:bg-teal-800'
              }`}
              aria-label={isFlipped ? card.label : 'Hidden card'}
            >
              {isFlipped ? (
                <div className="animate-in zoom-in-75 duration-200">
                  <span className="text-4xl sm:text-5xl">{card.symbol}</span>
                  <p className="text-[11px] sm:text-xs font-bold text-stone-700 mt-1">
                    {card.label}
                  </p>
                </div>
              ) : (
                <div className="text-teal-400 font-extrabold text-2xl">❖</div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-stone-500 font-bold text-sm px-4">
        <span>
          Pairs Found: <span className="text-emerald-700">{matchesCount} / {SYMBOLS.length}</span>
        </span>
        <span>Attempts: {attempts}</span>
      </div>
    </div>
  );
};
