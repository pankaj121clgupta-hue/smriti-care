import React from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../data/mockData';
import { LanguageCode } from '../../types';
import {
  Sliders,
  X,
  Type,
  Eye,
  Volume2,
  Globe,
  Sparkles,
  Check
} from 'lucide-react';

export const AccessibilityModal: React.FC = () => {
  const {
    isAccessibilityModalOpen,
    setIsAccessibilityModalOpen,
    accessibility,
    updateAccessibility,
    selectedLanguage,
    setSelectedLanguage,
    t
  } = useApp();

  // Close on Escape key
  useEffect(() => {
    if (!isAccessibilityModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsAccessibilityModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAccessibilityModalOpen, setIsAccessibilityModalOpen]);

  if (!isAccessibilityModalOpen) return null;

  return (
    <div
      id="accessibility-settings-modal"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsAccessibilityModalOpen(false);
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-300 text-stone-900 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-800">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-stone-900">
                {t('accessibilitySettings')}
              </h2>
              <p className="text-xs text-stone-500 font-medium">
                Elderly-friendly accessibility &amp; language preferences
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAccessibilityModalOpen(false)}
            className="p-1.5 rounded-xl hover:bg-stone-100 text-stone-400 hover:text-stone-700"
            aria-label="Close accessibility modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-5 text-sm">
          {/* 1. Language Selector */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-700" />
              <span>Language (Indian Regional Languages &amp; English)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`p-2.5 rounded-xl border text-left transition-colors flex items-center justify-between ${
                    selectedLanguage === lang.code
                      ? 'bg-emerald-50 border-emerald-600 font-bold text-emerald-900'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div>
                    <span className="block text-xs font-extrabold">
                      {lang.nativeName}
                    </span>
                    <span className="block text-[10px] text-stone-500">
                      {lang.name}
                    </span>
                  </div>
                  {selectedLanguage === lang.code && (
                    <Check className="w-4 h-4 text-emerald-700" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Text Sizing */}
          <div className="pt-2 border-t border-stone-200">
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Type className="w-4 h-4 text-emerald-700" />
              <span>Text &amp; UI Sizing</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['normal', 'large', 'extra-large'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => updateAccessibility({ fontSize: size })}
                  className={`py-2 px-3 rounded-xl border text-center capitalize text-xs font-bold transition-colors ${
                    accessibility.fontSize === size
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {size.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Toggles: High Contrast, Simplified Mode, Voice */}
          <div className="pt-2 border-t border-stone-200 space-y-3">
            {/* High Contrast Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-stone-900 text-xs block">
                  High Contrast (WCAG AAA)
                </span>
                <span className="text-[11px] text-stone-500 font-medium">
                  Deep dark borders and elevated text contrast
                </span>
              </div>
              <button
                onClick={() =>
                  updateAccessibility({ highContrast: !accessibility.highContrast })
                }
                className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                  accessibility.highContrast ? 'bg-emerald-600 justify-end' : 'bg-stone-300 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            {/* Simplified Mode Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-stone-900 text-xs block">
                  Simplified Mode
                </span>
                <span className="text-[11px] text-stone-500 font-medium">
                  Hides non-essential labels for calming focus
                </span>
              </div>
              <button
                onClick={() =>
                  updateAccessibility({ simplifiedMode: !accessibility.simplifiedMode })
                }
                className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                  accessibility.simplifiedMode ? 'bg-emerald-600 justify-end' : 'bg-stone-300 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            {/* Voice Assistance */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-stone-900 text-xs block">
                  Automatic Spoken Prompts
                </span>
                <span className="text-[11px] text-stone-500 font-medium">
                  Speaks greetings, instructions, and reminders
                </span>
              </div>
              <button
                onClick={() =>
                  updateAccessibility({ voiceAssistance: !accessibility.voiceAssistance })
                }
                className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                  accessibility.voiceAssistance ? 'bg-emerald-600 justify-end' : 'bg-stone-300 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-200">
          <button
            onClick={() => setIsAccessibilityModalOpen(false)}
            className="w-full py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-xs transition-colors"
          >
            Apply &amp; Close Settings
          </button>
        </div>
      </div>
    </div>
  );
};
