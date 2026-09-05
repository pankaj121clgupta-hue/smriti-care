import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle,
  Heart,
  ChevronDown,
  ChevronUp,
  Sparkles,
  RotateCcw,
  Check,
  Brain,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AdaptiveResultModalProps {
  score: number;
  total: number;
  reactionTime: number;
  onPlayAgain: () => void;
  onDone: () => void;
}

export const AdaptiveResultModal: React.FC<AdaptiveResultModalProps> = ({
  score,
  total,
  reactionTime,
  onPlayAgain,
  onDone
}) => {
  const { aiState, role, t } = useApp();
  const [showAiDetails, setShowAiDetails] = useState(false);

  const percentage = Math.round((score / total) * 100);
  const isHighSuccess = percentage >= 70;

  // Trigger subtle festive confetti on strong success
  React.useEffect(() => {
    if (isHighSuccess) {
      try {
        confetti({
          particleCount: 35,
          spread: 50,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe fallback
      }
    }
  }, [isHighSuccess]);

  return (
    <div
      id="adaptive-game-result-modal"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-emerald-600 text-stone-800 text-center animate-in fade-in zoom-in-95 duration-200">
        {/* Friendly Success Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center mb-4 shadow-sm">
          {isHighSuccess ? (
            <CheckCircle className="w-12 h-12 text-emerald-700 stroke-[2.5]" />
          ) : (
            <Heart className="w-12 h-12 text-teal-700 fill-teal-600" />
          )}
        </div>

        {/* Message */}
        <h2 className="text-3xl sm:text-4xl font-black text-stone-900 mb-2">
          {isHighSuccess ? t('wellDone') : t('letsTryAgain')}
        </h2>

        <p className="text-xl sm:text-2xl font-bold text-stone-700 mb-2">
          You remembered {score} out of {total}.
        </p>

        <p className="text-stone-500 text-base font-medium mb-6">
          {isHighSuccess
            ? "Wonderful job exercising your mind today! Let's try one more?"
            : "Every gentle attempt keeps your memory pathways strong and healthy."}
        </p>

        {/* Elderly-Friendly Adaptive Visualization (Dots representation) */}
        <div className="bg-stone-50 rounded-2xl p-5 border-2 border-stone-200 mb-6 text-left">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
              Today&apos;s Challenge Balance
            </span>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
              AI Balanced
            </span>
          </div>

          <div className="space-y-2 text-sm font-semibold text-stone-700">
            <div className="flex items-center justify-between">
              <span>Memory</span>
              <span className="text-emerald-700 font-mono tracking-widest text-base">
                ●●●○○
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Attention</span>
              <span className="text-emerald-700 font-mono tracking-widest text-base">
                ●●●●○
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Speed</span>
              <span className="text-emerald-700 font-mono tracking-widest text-base">
                ●●●○○
              </span>
            </div>
          </div>

          <p className="text-xs text-stone-500 font-medium mt-3 border-t border-stone-200 pt-2 text-center">
            &ldquo;Your next activity has been adjusted to your level.&rdquo;
          </p>
        </div>

        {/* Expandable AI Adaptation Details for Caregiver / Evaluators */}
        <div className="mb-6">
          <button
            onClick={() => setShowAiDetails(!showAiDetails)}
            className="text-xs font-bold text-teal-800 hover:text-teal-900 flex items-center justify-center gap-1 mx-auto focus:outline-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>AI Adaptation Details (Caregiver / Clinician View)</span>
            {showAiDetails ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {showAiDetails && (
            <div className="mt-3 p-4 bg-teal-50 border border-teal-200 rounded-xl text-left text-xs space-y-2 text-stone-800 animate-in fade-in duration-150">
              <div className="flex justify-between">
                <span className="font-medium text-stone-600">Current Difficulty:</span>
                <span className="font-bold text-stone-900">{aiState.currentDifficulty}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-stone-600">Accuracy:</span>
                <span className="font-bold text-stone-900">{aiState.accuracy}%</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-stone-600">Average Reaction Time:</span>
                <span className="font-bold text-stone-900">{reactionTime}s</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-stone-600">Recent Trend:</span>
                <span className="font-bold text-emerald-800">{aiState.recentTrend}</span>
              </div>
              <div className="pt-2 border-t border-teal-200/60">
                <span className="font-medium text-stone-600">Recommendation:</span>
                <p className="font-bold text-teal-950 mt-0.5">{aiState.recommendation}</p>
              </div>
            </div>
          )}
        </div>

        {/* Buttons: PLAY AGAIN & DONE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={onPlayAgain}
            className="h-16 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-lg sm:text-xl border-2 border-stone-300 flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <RotateCcw className="w-6 h-6 text-stone-600" />
            <span>{t('playAgain')}</span>
          </button>

          <button
            onClick={onDone}
            className="h-16 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xl sm:text-2xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <Check className="w-7 h-7" />
            <span>{t('done')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
