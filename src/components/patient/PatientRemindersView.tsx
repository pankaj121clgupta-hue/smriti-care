import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Pill,
  Droplets,
  Calendar,
  Gamepad2,
  Volume2,
  CheckCircle,
  Clock,
  Plus
} from 'lucide-react';

export const PatientRemindersView: React.FC = () => {
  const { reminders, toggleReminder, setPatientView, t } = useApp();

  const handleSpeakReminder = (msg: string) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(msg);
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };

  const getReminderIcon = (type: string) => {
    switch (type) {
      case 'medicine':
        return <Pill className="w-8 h-8 text-rose-700" />;
      case 'hydration':
        return <Droplets className="w-8 h-8 text-sky-700" />;
      case 'doctor':
        return <Calendar className="w-8 h-8 text-amber-700" />;
      default:
        return <Gamepad2 className="w-8 h-8 text-emerald-700" />;
    }
  };

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

        <span className="text-xs font-bold uppercase tracking-wider text-[#2D5A27] bg-[#F0F7F4] px-3.5 py-1.5 rounded-full border border-[#D1E8E2]">
          Adherence: 92%
        </span>
      </div>

      <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-[#E5E2D9] shadow-sm space-y-4">
        <div className="border-b border-[#E5E2D9] pb-4 mb-2 flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#1B4D4E] tracking-tight">
              {t('remindersTitle')}
            </h1>
            <p className="text-[#4A4A4A] text-base sm:text-lg font-medium mt-1">
              {t('remindersSubtitle')}
            </p>
          </div>
        </div>

        <div className="space-y-3.5">
          {reminders.map((item) => (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                item.completed
                  ? 'bg-[#F0F7F4] border-[#D1E8E2] text-[#1A1A1A]'
                  : 'bg-[#FDFBF7] border-[#E5E2D9] text-[#1A1A1A] hover:border-[#1B4D4E]/40'
              }`}
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-13 h-13 rounded-2xl bg-white border border-[#E5E2D9] flex items-center justify-center shrink-0 shadow-xs">
                  {getReminderIcon(item.type)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`text-lg sm:text-xl font-bold truncate ${
                        item.completed ? 'line-through text-[#4A4A4A] opacity-75' : 'text-[#1A1A1A]'
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#4A4A4A] mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#1B4D4E]" />
                      {item.time}
                    </span>
                    <span>•</span>
                    <span>{item.repeat}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  onClick={() => handleSpeakReminder(item.voiceMessage || item.title)}
                  className="w-11 h-11 rounded-xl bg-white hover:bg-stone-50 border border-[#E5E2D9] flex items-center justify-center text-[#1B4D4E] shrink-0 transition-colors shadow-xs"
                  title="Hear reminder spoken aloud"
                  aria-label="Speak reminder"
                >
                  <Volume2 className="w-5 h-5 text-[#1B4D4E]" />
                </button>

                <button
                  onClick={() => toggleReminder(item.id)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-colors shrink-0 shadow-xs ${
                    item.completed
                      ? 'bg-[#2D5A27] text-white hover:bg-[#254b20]'
                      : 'bg-[#1B4D4E] hover:bg-[#153a3b] text-white'
                  }`}
                >
                  {item.completed ? 'Completed ✓' : 'Mark Done'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
