import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ReminderType, LanguageCode } from '../../types';
import { LANGUAGES } from '../../data/mockData';
import {
  Plus,
  Clock,
  Pill,
  Droplets,
  Calendar,
  Footprints,
  Coffee,
  CheckCircle2,
  Circle,
  Volume2,
  X
} from 'lucide-react';

export const CaregiverRemindersView: React.FC = () => {
  const { reminders, toggleReminder, addReminder, activePatient } = useApp();
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form states
  const [newType, setNewType] = useState<ReminderType>('medicine');
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('11:00 AM');
  const [newRepeat, setNewRepeat] = useState('Daily');
  const [newVoiceMessage, setNewVoiceMessage] = useState('');
  const [newLanguage, setNewLanguage] = useState<LanguageCode>('as');

  const handleCreateReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    await addReminder({
      type: newType,
      title: newTitle.trim(),
      time: newTime,
      completed: false,
      repeat: newRepeat,
      voiceMessage:
        newVoiceMessage.trim() || `${activePatient.name}, it is time for ${newTitle}.`,
      language: newLanguage
    });

    setIsAddOpen(false);
    setNewTitle('');
    setNewVoiceMessage('');
  };

  const getIcon = (type: ReminderType) => {
    switch (type) {
      case 'medicine':
        return <Pill className="w-5 h-5 text-rose-600" />;
      case 'hydration':
        return <Droplets className="w-5 h-5 text-sky-600" />;
      case 'exercise':
        return <Footprints className="w-5 h-5 text-emerald-600" />;
      case 'meal':
        return <Coffee className="w-5 h-5 text-amber-600" />;
      default:
        return <Calendar className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <div id="caregiver-reminders-view" className="space-y-6">
      {/* Header & Add Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#1B4D4E]">
            Reminders &amp; Daily Adherence Schedules
          </h2>
          <p className="text-xs text-[#4A4A4A] font-medium mt-0.5">
            Synchronized to {activePatient.name}&apos;s tablet with spoken voice prompts
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1B4D4E] hover:bg-[#153a3b] text-white rounded-2xl text-sm font-bold shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Add Reminder</span>
        </button>
      </div>

      {/* Reminders List */}
      <div className="bg-white rounded-[32px] p-6 sm:p-7 border border-[#E5E2D9] shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-[#1A1A1A] border-b border-[#E5E2D9] pb-3">
          Today&apos;s Active Reminders
        </h3>

        <div className="space-y-3">
          {reminders.map((rem) => (
            <div
              key={rem.id}
              className={`p-4 rounded-2xl border flex items-center justify-between gap-3 transition-colors ${
                rem.completed
                  ? 'bg-[#FDFBF7] border-[#E5E2D9] text-[#4A4A4A]'
                  : 'bg-white border-[#E5E2D9] text-[#1A1A1A] shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FDFBF7] border border-[#E5E2D9] flex items-center justify-center shrink-0">
                  {getIcon(rem.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4
                      className={`text-sm sm:text-base font-bold ${
                        rem.completed ? 'line-through text-[#4A4A4A]' : 'text-[#1A1A1A]'
                      }`}
                    >
                      {rem.title}
                    </h4>
                    <span className="text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-[#E9F2EF] text-[#1B4D4E] border border-[#D1E8E2]">
                      {rem.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#4A4A4A] font-semibold mt-0.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#4A4A4A]" />
                      {rem.time}
                    </span>
                    <span>•</span>
                    <span>{rem.repeat}</span>
                    <span>•</span>
                    <span>Voice Prompt Active</span>
                  </div>
                </div>
              </div>

              {/* Status & Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleReminder(rem.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
                    rem.completed
                      ? 'bg-[#F0F7F4] text-[#2D5A27] border-[#D1E8E2]'
                      : 'bg-[#FDF3E1] text-[#F27D26] border-[#F27D26]/30 hover:bg-[#faebd0]'
                  }`}
                >
                  {rem.completed ? 'Completed ✓' : 'Pending ○'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Reminder Modal */}
      {isAddOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
        >
          <div className="bg-white rounded-[32px] max-w-md w-full p-7 shadow-2xl border border-[#E5E2D9] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E2D9] mb-4">
              <h3 className="text-lg font-black text-[#1B4D4E]">Add Reminder</h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-1 rounded-lg text-[#4A4A4A] hover:text-[#1A1A1A] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReminder} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-[#1A1A1A] mb-1">Reminder Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as ReminderType)}
                  className="w-full p-2.5 rounded-xl border border-[#E5E2D9] bg-[#FDFBF7] font-medium text-[#1A1A1A] focus:ring-2 focus:ring-[#1B4D4E] focus:outline-none"
                >
                  <option value="medicine">💊 Medicine</option>
                  <option value="hydration">💧 Hydration</option>
                  <option value="exercise">🚶 Walking / Garden Walk</option>
                  <option value="meal">🍵 Meal / Herbal Tea</option>
                  <option value="doctor">🏥 Doctor / PHC Visit</option>
                </select>
              </div>

              <div>
                <label className="block text-[#1A1A1A] mb-1">Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Afternoon Blood Pressure Tablet"
                  required
                  className="w-full p-2.5 rounded-xl border border-[#E5E2D9] font-medium text-[#1A1A1A] focus:ring-2 focus:ring-[#1B4D4E] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#1A1A1A] mb-1">Time</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="e.g. 10:30 AM"
                    className="w-full p-2.5 rounded-xl border border-[#E5E2D9] font-medium text-[#1A1A1A] focus:ring-2 focus:ring-[#1B4D4E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#1A1A1A] mb-1">Repeat</label>
                  <select
                    value={newRepeat}
                    onChange={(e) => setNewRepeat(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#E5E2D9] bg-[#FDFBF7] font-medium text-[#1A1A1A] focus:ring-2 focus:ring-[#1B4D4E] focus:outline-none"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Every 2 Hours">Every 2 Hours</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Once">Once</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#1A1A1A] mb-1">
                  Spoken Voice Message (Multilingual TTS)
                </label>
                <textarea
                  value={newVoiceMessage}
                  onChange={(e) => setNewVoiceMessage(e.target.value)}
                  placeholder="e.g. Aai, please take your afternoon medicine with warm water."
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-[#E5E2D9] font-medium text-[#1A1A1A] focus:ring-2 focus:ring-[#1B4D4E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#1A1A1A] mb-1">Language</label>
                <select
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value as LanguageCode)}
                  className="w-full p-2.5 rounded-xl border border-[#E5E2D9] bg-[#FDFBF7] font-medium text-[#1A1A1A] focus:ring-2 focus:ring-[#1B4D4E] focus:outline-none"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.nativeName} ({l.name})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-xl text-[#4A4A4A] hover:bg-[#FDFBF7] font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1B4D4E] hover:bg-[#153a3b] text-white font-bold shadow-xs cursor-pointer"
                >
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
