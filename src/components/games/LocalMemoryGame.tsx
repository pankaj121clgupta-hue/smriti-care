import React, { useState, useEffect } from 'react';
import { CULTURAL_OBJECTS, CulturalObject } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { Check, Sparkles, Volume2 } from 'lucide-react';

interface LocalMemoryGameProps {
  onComplete: (score: number, total: number, reactionSeconds: number) => void;
  speakPrompt: (text: string) => void;
}

export const LocalMemoryGame: React.FC<LocalMemoryGameProps> = ({
  onComplete,
  speakPrompt
}) => {
  const { t } = useApp();
  const [phase, setPhase] = useState<'study' | 'recall'>('study');
  const [targetObjects, setTargetObjects] = useState<CulturalObject[]>([]);
  const [choices, setChoices] = useState<CulturalObject[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [countdown, setCountdown] = useState<number>(6);

  // Initialize randomized items from cultural objects
  useEffect(() => {
    // Pick 3 target objects
    const shuffled = [...CULTURAL_OBJECTS].sort(() => 0.5 - Math.random());
    const targets = shuffled.slice(0, 3);
    const distractors = shuffled.slice(3, 6);
    const allChoices = [...targets, ...distractors].sort(() => 0.5 - Math.random());

    setTargetObjects(targets);
    setChoices(allChoices);
    setSelectedIds([]);
    setPhase('study');
    setCountdown(6);
    setStartTime(Date.now());

    speakPrompt('Please look carefully and remember these three culturally familiar objects.');
  }, []);

  // Countdown timer for study phase
  useEffect(() => {
    if (phase !== 'study') return;
    if (countdown <= 0) {
      setPhase('recall');
      setStartTime(Date.now());
      speakPrompt('Which objects did you see? Tap them on the screen.');
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, countdown]);

  const handleToggleSelect = (obj: CulturalObject) => {
    if (phase !== 'recall') return;

    if (selectedIds.includes(obj.id)) {
      setSelectedIds(selectedIds.filter((id) => id !== obj.id));
    } else {
      const next = [...selectedIds, obj.id];
      setSelectedIds(next);

      // If user selected 3 items, evaluate
      if (next.length === targetObjects.length) {
        const correctCount = next.filter((id) =>
          targetObjects.some((t) => t.id === id)
        ).length;
        const reactionSeconds = Number(
          ((Date.now() - startTime) / 1000).toFixed(1)
        );

        setTimeout(() => {
          onComplete(correctCount, targetObjects.length, reactionSeconds);
        }, 600);
      }
    }
  };

  const handleDoneStudying = () => {
    setPhase('recall');
    setStartTime(Date.now());
    speakPrompt('Which objects did you see? Tap them on the screen.');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto text-center">
      {phase === 'study' ? (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full">
              Phase 1: Memorization
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900">
              Remember these objects.
            </h2>
            <p className="text-stone-600 text-base sm:text-lg font-medium">
              Take your time. Memorize these traditional treasures of India.
            </p>
          </div>

          {/* 3 Large Target Cards */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 py-4">
            {targetObjects.map((obj) => (
              <div
                key={obj.id}
                className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-emerald-500 shadow-xl flex flex-col items-center justify-center transform hover:scale-105 transition-transform"
              >
                <div className="text-6xl sm:text-7xl mb-3">{obj.symbol}</div>
                <h4 className="text-lg sm:text-xl font-bold text-stone-900 leading-tight">
                  {obj.name}
                </h4>
                <p className="text-xs sm:text-sm font-bold text-emerald-700 mt-1">
                  {obj.nativeName}
                </p>
              </div>
            ))}
          </div>

          {/* Countdown & Ready Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <div className="text-sm font-bold text-stone-500 bg-stone-100 px-4 py-2 rounded-xl">
              Next in: <span className="text-emerald-700 font-extrabold text-base">{countdown}s</span>
            </div>

            <button
              onClick={handleDoneStudying}
              className="px-8 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-lg shadow-md transition-colors"
            >
              I&apos;ve Remembered Them!
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-4 py-1.5 rounded-full">
              Phase 2: Recall
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900">
              Which objects did you see?
            </h2>
            <p className="text-stone-600 text-base sm:text-lg font-medium">
              Tap the {targetObjects.length} objects you remember from earlier.
            </p>
          </div>

          {/* Grid of Choices with Distractors */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 py-2">
            {choices.map((obj) => {
              const isSelected = selectedIds.includes(obj.id);
              return (
                <button
                  key={obj.id}
                  onClick={() => handleToggleSelect(obj)}
                  className={`rounded-3xl p-5 sm:p-6 border-4 text-center transition-all relative flex flex-col items-center justify-center shadow-md active:scale-95 ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-600 ring-4 ring-emerald-300 scale-[1.02]'
                      : 'bg-white border-stone-200 hover:border-emerald-400'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                      <Check className="w-5 h-5 stroke-[3]" />
                    </div>
                  )}

                  <div className="text-5xl sm:text-6xl mb-3">{obj.symbol}</div>
                  <h4 className="text-base sm:text-lg font-bold text-stone-900">
                    {obj.name}
                  </h4>
                  <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                    {obj.nativeName}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="text-sm font-bold text-stone-500">
            Selected: <span className="text-emerald-700">{selectedIds.length}</span> of{' '}
            {targetObjects.length}
          </div>
        </div>
      )}
    </div>
  );
};
