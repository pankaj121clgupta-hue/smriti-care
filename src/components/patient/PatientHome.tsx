import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Brain,
  CheckCircle,
  Circle,
  Clock,
  Heart,
  Pill,
  Droplets,
  Calendar,
  Sparkles,
  Volume2,
  ChevronRight,
  Sun,
  Coffee,
  Check
} from 'lucide-react';

export const PatientHome: React.FC = () => {
  const {
    activePatient,
    routines,
    reminders,
    setPatientView,
    setSelectedGameId,
    setIsHelpModalOpen,
    setIsVoiceModalOpen,
    accessibility,
    t
  } = useApp();

  const handleStartGame = () => {
    setSelectedGameId('local-memory');
    setPatientView('games');
  };

  const handleSpeakGreeting = () => {
    if ('speechSynthesis' in window) {
      const greeting = `${t('goodMorning')}, ${activePatient.name}. ${t('todayIs')}. ${t('playSubtitle')}.`;
      const u = new SpeechSynthesisUtterance(greeting);
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };

  const completedRoutines = routines.filter((r) => r.completed).length;

  return (
    <div
      id="patient-home-screen"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
    >
      {/* Bento Grid Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* BENTO TILE 1: Hero Greeting Banner (col-span-8) */}
        <div
          id="patient-header-banner"
          className="md:col-span-2 lg:col-span-8 bg-gradient-to-br from-[#1B4D4E] to-[#2D5A27] rounded-[32px] p-6 sm:p-8 relative overflow-hidden shadow-xl text-white flex flex-col justify-between min-h-[240px]"
        >
          {/* Decorative Regional Background Wave Motif */}
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <svg width="280" height="280" viewBox="0 0 100 100" fill="currentColor" className="text-white">
              <path d="M0 50 Q25 0 50 50 T100 50" stroke="currentColor" fill="none" strokeWidth="2" />
              <path d="M0 60 Q25 10 50 60 T100 60" stroke="currentColor" fill="none" strokeWidth="2" />
              <path d="M0 70 Q25 20 50 70 T100 70" stroke="currentColor" fill="none" strokeWidth="2" />
            </svg>
          </div>

          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[#D1E8E2] text-sm sm:text-base font-medium flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-300" />
                <span>{t('todayIs')}</span>
              </span>
              <button
                onClick={handleSpeakGreeting}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors focus:ring-2 focus:ring-white/50"
                title="Speak greeting aloud"
                aria-label="Speak greeting"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <h1 className="text-white text-3xl sm:text-5xl font-bold tracking-tight">
              {t('goodMorning')}, {activePatient.name}
            </h1>

            <p className="text-[#D1E8E2] text-base sm:text-lg font-medium max-w-xl">
              A peaceful day in {activePatient.district}. We are here with gentle memory games and everyday care.
            </p>
          </div>

          {/* Ambient weather & regional context badge */}
          <div className="relative z-10 mt-6 inline-flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-white w-fit">
            <span className="mr-2 text-lg">⛅</span>
            <span className="text-xs sm:text-sm font-medium">
              Pleasant morning in {activePatient.district} · 24°C • Courtyard Care
            </span>
          </div>
        </div>

        {/* BENTO TILE 2: Today's Routine (col-span-4) */}
        <div
          id="patient-card-today"
          className="md:col-span-1 lg:col-span-4 bg-white border border-[#E5E2D9] rounded-[32px] p-6 sm:p-8 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold text-[#1B4D4E]">
                {t('todayTitle')}
              </h2>
              <span className="text-[#2D5A27] font-semibold text-sm bg-[#F0F7F4] px-2.5 py-1 rounded-full border border-[#D1E8E2]">
                {completedRoutines}/{routines.length} Done
              </span>
            </div>

            <div className="space-y-3">
              {routines.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center p-3 sm:p-3.5 rounded-2xl border transition-all ${
                    item.completed
                      ? 'bg-[#F0F7F4] border-[#D1E8E2]'
                      : 'bg-[#FDFBF7] border-[#E5E2D9]'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm mr-3 shadow-xs shrink-0 ${
                      item.completed
                        ? 'bg-white text-[#2D5A27] font-bold border border-[#D1E8E2]'
                        : 'bg-white text-stone-400 border border-[#E5E2D9]'
                    }`}
                  >
                    {item.completed ? '✓' : '○'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`font-bold text-sm sm:text-base truncate ${
                        item.completed ? 'text-[#1A1A1A] line-through opacity-70' : 'text-[#1A1A1A]'
                      }`}
                    >
                      {item.title}
                    </p>
                    <p className="text-xs text-[#4A4A4A] truncate">
                      {item.completed ? 'Completed' : item.subtitle || 'Scheduled today'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setPatientView('today')}
            className="mt-6 w-full py-3.5 bg-[#1B4D4E] text-white rounded-2xl font-bold text-base hover:bg-[#153a3b] transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <span>View Full Schedule</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* BENTO TILE 3: PLAY (Primary interactive hero card - col-span-4) */}
        <div
          id="patient-card-play"
          onClick={handleStartGame}
          className="md:col-span-1 lg:col-span-4 bg-[#FDF3E1] border-4 border-[#F27D26] rounded-[40px] p-6 sm:p-8 shadow-lg flex flex-col items-center justify-center text-center cursor-pointer transform hover:scale-[1.02] transition-transform group"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#F27D26] rounded-full flex items-center justify-center text-4xl sm:text-5xl mb-4 shadow-md group-hover:rotate-6 transition-transform">
            🧠
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#8B4513] mb-2 tracking-tight">
            {t('playTitle')}
          </h2>

          <p className="text-[#8B4513] text-base sm:text-lg font-medium opacity-80 mb-6 max-w-xs">
            {t('playSubtitle')}
          </p>

          <button
            id="patient-play-start-btn"
            className="w-full max-w-xs py-4 px-8 bg-[#8B4513] text-white rounded-3xl font-black text-xl sm:text-2xl tracking-wide shadow-lg hover:bg-[#70360e] transition-colors flex items-center justify-center gap-2"
          >
            <span>{t('start')}</span>
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* BENTO TILE 4: Reminders (col-span-4) */}
        <div
          id="patient-card-reminders"
          onClick={() => setPatientView('reminders')}
          className="md:col-span-1 lg:col-span-4 bg-[#E9F2EF] rounded-[32px] p-6 sm:p-8 border border-[#D1E8E2] flex flex-col justify-between shadow-sm cursor-pointer hover:border-teal-400/80 transition-colors group"
        >
          <div>
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold text-[#1B4D4E]">
                {t('remindersTitle')}
              </h2>
              <div className="bg-white p-2.5 rounded-xl text-lg shadow-xs text-[#1B4D4E]">
                🔔
              </div>
            </div>

            <div className="space-y-3">
              {reminders.slice(0, 2).map((rem) => (
                <div
                  key={rem.id}
                  className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-[#D1E8E2] shadow-xs"
                >
                  <div className="min-w-0 pr-2">
                    <span className="font-bold text-[#1A1A1A] block text-sm sm:text-base truncate">
                      {rem.title}
                    </span>
                    <span className="text-xs text-[#4A4A4A]">
                      {rem.time}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${
                      rem.completed
                        ? 'bg-[#F0F7F4] text-[#2D5A27]'
                        : 'bg-[#FDF3E1] text-[#F27D26]'
                    }`}
                  >
                    {rem.completed ? 'Done' : 'Upcoming'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between text-xs font-bold text-[#1B4D4E] group-hover:underline">
            <span>View All Reminders</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* BENTO TILE 5: HELP (Emergency & Support - col-span-4) */}
        <div
          id="patient-card-help"
          onClick={() => setIsHelpModalOpen(true)}
          className="md:col-span-1 lg:col-span-4 bg-[#FFF5F5] border-4 border-[#D94E33] rounded-[40px] p-6 sm:p-8 flex flex-col items-center justify-center cursor-pointer shadow-lg hover:bg-red-50/90 transition-colors text-center"
        >
          <div className="w-18 h-18 sm:w-20 sm:h-20 bg-[#D94E33] rounded-full flex items-center justify-center text-3xl sm:text-4xl mb-3 shadow-inner text-white">
            🆘
          </div>

          <h2 className="text-3xl font-black text-[#D94E33]">
            {t('helpButton')}
          </h2>

          <p className="text-[#D94E33] font-bold mt-2 text-sm sm:text-base">
            I need assistance • Call caregiver or ASHA
          </p>

          <span className="mt-4 px-5 py-2 bg-[#D94E33] text-white rounded-full text-xs font-bold shadow-xs">
            Tap Anytime for Support
          </span>
        </div>

        {/* BENTO TILE 6: Tap to Speak Voice Assist (col-span-5) */}
        <div
          id="patient-card-voice"
          onClick={() => setIsVoiceModalOpen(true)}
          className="md:col-span-1 lg:col-span-5 bg-[#1B4D4E] rounded-[32px] px-6 sm:px-8 py-5 flex items-center justify-between text-white shadow-md cursor-pointer hover:bg-[#153a3b] transition-colors"
        >
          <div className="flex items-center">
            <span className="text-3xl mr-4">🎙️</span>
            <div>
              <span className="font-bold text-lg sm:text-xl block">Tap to speak with Smriti</span>
              <span className="text-xs text-[#D1E8E2]">Multilingual Voice Assistant • Native Accents</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xs font-black shrink-0 border border-white/30">
            {accessibility.language.toUpperCase()}
          </div>
        </div>

        {/* BENTO TILE 7: Progress & Cognitive Reserve Visualizer (col-span-7) */}
        <div
          id="patient-card-progress"
          className="md:col-span-2 lg:col-span-7 bg-white border border-[#E5E2D9] rounded-[32px] p-6 shadow-sm overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-bold text-[#1B4D4E]">
              Your Weekly Activity &amp; Memory Rhythm
            </h2>
            <span className="text-xs font-bold text-[#2D5A27] bg-[#F0F7F4] px-2.5 py-1 rounded-full border border-[#D1E8E2]">
              Adaptive Level: 2 (Comfortable)
            </span>
          </div>

          <div className="flex items-end justify-between h-20 space-x-2 pt-2">
            <div className="w-full flex flex-col items-center gap-1">
              <div className="w-full bg-[#F0F7F4] rounded-t-xl h-9" title="Mon" />
              <span className="text-[10px] font-semibold text-[#4A4A4A]">Mon</span>
            </div>
            <div className="w-full flex flex-col items-center gap-1">
              <div className="w-full bg-[#F0F7F4] rounded-t-xl h-12" title="Tue" />
              <span className="text-[10px] font-semibold text-[#4A4A4A]">Tue</span>
            </div>
            <div className="w-full flex flex-col items-center gap-1">
              <div className="w-full bg-[#F0F7F4] rounded-t-xl h-11" title="Wed" />
              <span className="text-[10px] font-semibold text-[#4A4A4A]">Wed</span>
            </div>
            <div className="w-full flex flex-col items-center gap-1">
              <div className="w-full bg-[#F0F7F4] rounded-t-xl h-16" title="Thu" />
              <span className="text-[10px] font-semibold text-[#4A4A4A]">Thu</span>
            </div>
            <div className="w-full flex flex-col items-center gap-1">
              <div className="w-full bg-[#2D5A27] rounded-t-xl h-18 shadow-xs" title="Today" />
              <span className="text-[10px] font-bold text-[#2D5A27]">Today</span>
            </div>
            <div className="w-full flex flex-col items-center gap-1">
              <div className="w-full bg-[#F0F7F4] rounded-t-xl h-8 opacity-40" title="Sat" />
              <span className="text-[10px] font-semibold text-stone-400">Sat</span>
            </div>
            <div className="w-full flex flex-col items-center gap-1">
              <div className="w-full bg-[#F0F7F4] rounded-t-xl h-8 opacity-40" title="Sun" />
              <span className="text-[10px] font-semibold text-stone-400">Sun</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E5E2D9] flex flex-wrap items-center justify-between text-xs font-bold text-[#4A4A4A] gap-2">
            <span>WEEKLY ACTIVITY SCORE: 82%</span>
            <span className="text-[#2D5A27] flex items-center gap-1">
              <span>↑ 4% Improved against baseline</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
