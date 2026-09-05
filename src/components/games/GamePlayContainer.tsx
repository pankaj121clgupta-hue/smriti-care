import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GAMES_CATALOGUE } from '../../data/mockData';
import { LocalMemoryGame } from './LocalMemoryGame';
import { RememberAndMatchGame } from './RememberAndMatchGame';
import { FindSymbolGame } from './FindSymbolGame';
import { AdaptiveResultModal } from './AdaptiveResultModal';
import { Volume2, LogOut, Brain, Sparkles } from 'lucide-react';

export const GamePlayContainer: React.FC = () => {
  const {
    selectedGameId,
    setPatientView,
    recordGameCompletion,
    aiState,
    accessibility,
    t
  } = useApp();

  const currentGame =
    GAMES_CATALOGUE.find((g) => g.id === selectedGameId) || GAMES_CATALOGUE[0];

  const [currentInstruction, setCurrentInstruction] = useState<string>(
    currentGame.description
  );
  const [resultData, setResultData] = useState<{
    score: number;
    total: number;
    reactionTime: number;
  } | null>(null);
  const [gameKey, setGameKey] = useState<number>(1);

  const speakPrompt = (text: string) => {
    setCurrentInstruction(text);
    if (accessibility.voiceAssistance && 'speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };

  const handleGameComplete = async (
    score: number,
    total: number,
    reactionSeconds: number
  ) => {
    const percent = Math.round((score / total) * 100);
    setResultData({ score, total, reactionTime: reactionSeconds });
    await recordGameCompletion(currentGame.id, percent, reactionSeconds);
  };

  const handleRepeatInstructions = () => {
    speakPrompt(currentInstruction);
  };

  const handlePlayAgain = () => {
    setResultData(null);
    setGameKey((prev) => prev + 1);
  };

  const handleDone = () => {
    setResultData(null);
    setPatientView('home');
  };

  // Convert difficulty 0.1 - 1.0 to Level integer (1 - 5)
  const currentLevel = Math.max(1, Math.min(5, Math.round(aiState.currentDifficulty * 5)));

  return (
    <div
      id="gameplay-container"
      className="min-h-[80vh] flex flex-col justify-between max-w-4xl mx-auto px-4 sm:px-6 py-6"
    >
      {/* Top Header: Simple Level & Game Name */}
      <header className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            {currentGame.cognitiveSkill}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
            {currentGame.name}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
              Adaptive
            </span>
            <span className="text-lg sm:text-xl font-black text-emerald-800">
              Level {currentLevel}
            </span>
          </div>

          <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Brain className="w-6 h-6" />
          </div>
        </div>
      </header>

      {/* Central Interactive Content */}
      <main className="py-6 flex-1 flex items-center justify-center">
        {currentGame.id === 'local-memory' ? (
          <LocalMemoryGame
            key={gameKey}
            onComplete={handleGameComplete}
            speakPrompt={speakPrompt}
          />
        ) : currentGame.id === 'remember-match' ? (
          <RememberAndMatchGame
            key={gameKey}
            onComplete={handleGameComplete}
            speakPrompt={speakPrompt}
          />
        ) : (
          <FindSymbolGame
            key={gameKey}
            onComplete={handleGameComplete}
            speakPrompt={speakPrompt}
          />
        )}
      </main>

      {/* Bottom Simplified Controls */}
      <footer className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Repeat Instructions */}
        <button
          onClick={handleRepeatInstructions}
          className="w-full sm:w-auto h-14 px-6 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-lg border-2 border-stone-300 flex items-center justify-center gap-2 transition-colors active:scale-95"
          title="Repeat spoken instructions"
        >
          <Volume2 className="w-6 h-6 text-emerald-700" />
          <span>{t('repeatInstructions')}</span>
        </button>

        {/* Exit Button */}
        <button
          onClick={() => setPatientView('home')}
          className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-lg flex items-center justify-center gap-2 transition-colors active:scale-95"
        >
          <LogOut className="w-5 h-5 text-stone-600" />
          <span>{t('exitGame')}</span>
        </button>
      </footer>

      {/* Adaptive Result Modal */}
      {resultData && (
        <AdaptiveResultModal
          score={resultData.score}
          total={resultData.total}
          reactionTime={resultData.reactionTime}
          onPlayAgain={handlePlayAgain}
          onDone={handleDone}
        />
      )}
    </div>
  );
};
