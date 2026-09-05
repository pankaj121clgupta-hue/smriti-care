import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

interface FindSymbolProps {
  onComplete: (score: number, total: number, reactionSeconds: number) => void;
  speakPrompt: (text: string) => void;
}

export const FindSymbolGame: React.FC<FindSymbolProps> = ({
  onComplete,
  speakPrompt
}) => {
  const target = { symbol: '🌸', name: 'Kopou Phool (Foxtail Orchid)' };
  const distractors = ['🎋', '🍃', '🏠', '🥣', '👒', '🪶'];

  const [grid, setGrid] = useState<string[]>([]);
  const [foundCount, setFoundCount] = useState<number>(0);
  const [totalTargets, setTotalTargets] = useState<number>(3);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [tappedIndices, setTappedIndices] = useState<number[]>([]);

  useEffect(() => {
    // Generate 12 items, exactly 3 targets
    const items = [target.symbol, target.symbol, target.symbol];
    while (items.length < 12) {
      const rand = distractors[Math.floor(Math.random() * distractors.length)];
      items.push(rand);
    }
    const shuffled = items.sort(() => 0.5 - Math.random());
    setGrid(shuffled);
    setFoundCount(0);
    setTappedIndices([]);
    setStartTime(Date.now());

    speakPrompt(`Find and tap all 3 ${target.name} blooming on the screen.`);
  }, []);

  const handleTileClick = (index: number) => {
    if (tappedIndices.includes(index)) return;

    const sym = grid[index];
    setTappedIndices([...tappedIndices, index]);

    if (sym === target.symbol) {
      const nextFound = foundCount + 1;
      setFoundCount(nextFound);

      if (nextFound === totalTargets) {
        const reactionSeconds = Number(
          ((Date.now() - startTime) / 1000).toFixed(1)
        );
        setTimeout(() => {
          onComplete(totalTargets, totalTargets, reactionSeconds);
        }, 500);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto text-center">
      <div className="space-y-2">
        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full">
          Selective Attention Exercise
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-stone-900">
          Find the Kopou Flowers
        </h2>
        <p className="text-stone-600 text-base font-medium">
          Spot and tap all 3 blooming <span className="text-2xl">{target.symbol}</span> orchids in the peaceful garden.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-3 sm:gap-4 py-4">
        {grid.map((sym, idx) => {
          const isTapped = tappedIndices.includes(idx);
          const isTarget = sym === target.symbol;

          return (
            <button
              key={idx}
              onClick={() => handleTileClick(idx)}
              className={`h-24 sm:h-28 rounded-3xl border-4 text-center transition-all flex flex-col items-center justify-center text-4xl sm:text-5xl shadow-md active:scale-95 ${
                isTapped && isTarget
                  ? 'bg-emerald-100 border-emerald-600 scale-105'
                  : isTapped
                  ? 'bg-stone-100 border-stone-300 opacity-60'
                  : 'bg-white border-stone-200 hover:border-emerald-400'
              }`}
            >
              <span>{sym}</span>
              {isTapped && isTarget && (
                <Check className="w-5 h-5 text-emerald-700 stroke-[3] mt-1" />
              )}
            </button>
          );
        })}
      </div>

      <div className="text-stone-600 font-bold text-base">
        Flowers Spotted: <span className="text-emerald-700 text-lg">{foundCount}</span> of {totalTargets}
      </div>
    </div>
  );
};
