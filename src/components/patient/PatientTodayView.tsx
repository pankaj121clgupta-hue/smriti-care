import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  CheckCircle,
  Circle,
  Volume2,
  Calendar,
  Sparkles,
  Coffee,
  Pill,
  Droplets,
  Gamepad2,
  Heart
} from 'lucide-react';

export const PatientTodayView: React.FC = () => {
  const { routines, toggleRoutine, setPatientView, t } = useApp();

  const handleSpeakItem = (text: string) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'meal':
        return <Coffee className="w-8 h-8 text-amber-700" />;
      case 'medicine':
        return <Pill className="w-8 h-8 text-rose-700" />;
      case 'water':
        return <Droplets className="w-8 h-8 text-sky-700" />;
      case 'game':
        return <Gamepad2 className="w-8 h-8 text-emerald-700" />;
      default:
        return <Heart className="w-8 h-8 text-teal-700" />;
    }
  };

  const completedCount = routines.filter((r) => r.completed).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Back Button & Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setPatientView('home')}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-[#FDFBF7] text-[#1A1A1A] border border-[#E5E2D9] font-bold text-base transition-colors shadow-xs focus:ring-4 focus:ring-[#1B4D4E]/20"
        >
          <ArrowLeft className="w-5 h-5 text-[#1B4D4E]" />
          <span>Back to Home</span>
        </button>

        <div className="text-right">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2D5A27] bg-[#F0F7F4] px-3 py-1 rounded-full border border-[#D1E8E2]">
            Today&apos;s Progress
          </span>
          <p className="text-xl sm:text-2xl font-black text-[#1B4D4E] mt-1">
            {completedCount} of {routines.length} Done
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-[#E5E2D9] shadow-sm space-y-4">
        <div className="border-b border-[#E5E2D9] pb-4 mb-2">
          <h1 className="text-3xl sm:text-4xl font-black text-[#1B4D4E] tracking-tight">
            {t('todayTitle')}
          </h1>
          <p className="text-[#4A4A4A] text-base sm:text-lg font-medium mt-1">
            {t('todaySubtitle')} • Tap any step when completed
          </p>
        </div>

        <div className="space-y-3.5">
          {routines.map((routine) => (
            <div
              key={routine.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                routine.completed
                  ? 'bg-[#F0F7F4] border-[#D1E8E2] text-[#1A1A1A]'
                  : 'bg-[#FDFBF7] border-[#E5E2D9] text-[#1A1A1A] hover:border-[#1B4D4E]/40'
              }`}
            >
              {/* Checkbox Touch Area */}
              <button
                onClick={() => toggleRoutine(routine.id)}
                className="flex items-center gap-4 flex-1 text-left w-full"
                aria-label={`Toggle ${routine.title}`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                    routine.completed
                      ? 'bg-[#2D5A27] text-white'
                      : 'border-2 border-stone-300 bg-white'
                  }`}
                >
                  {routine.completed && <CheckCircle className="w-7 h-7" />}
                </div>

                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="hidden sm:flex w-11 h-11 rounded-xl bg-white border border-[#E5E2D9] items-center justify-center shrink-0">
                    {getIcon(routine.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`text-lg sm:text-xl font-bold truncate ${
                        routine.completed ? 'line-through text-[#4A4A4A] opacity-75' : 'text-[#1A1A1A]'
                      }`}
                    >
                      {routine.title}
                    </h3>
                    {routine.subtitle && (
                      <p className="text-xs sm:text-sm text-[#4A4A4A] font-semibold mt-0.5 truncate">
                        {routine.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* Audio Listen Button */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeakItem(routine.title);
                  }}
                  className="w-11 h-11 rounded-xl bg-white hover:bg-stone-50 border border-[#E5E2D9] flex items-center justify-center text-[#1B4D4E] shrink-0 transition-colors shadow-xs"
                  title="Hear this item spoken aloud"
                >
                  <Volume2 className="w-5 h-5 text-[#1B4D4E]" />
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
