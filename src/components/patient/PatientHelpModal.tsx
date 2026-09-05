import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  PhoneCall,
  Volume2,
  Heart,
  X,
  UserCheck,
  Clock,
  ArrowLeft
} from 'lucide-react';

export const PatientHelpModal: React.FC = () => {
  const { isHelpModalOpen, setIsHelpModalOpen, activePatient, accessibility, t } = useApp();
  const [callInitiated, setCallInitiated] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!isHelpModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHelpModalOpen]);

  const handleClose = () => {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
    setIsPlayingAudio(false);
    setCallInitiated(false);
    setIsHelpModalOpen(false);
  };

  if (!isHelpModalOpen) return null;

  const handleSimulatedCall = () => {
    setCallInitiated(true);
    setTimeout(() => {
      setCallInitiated(false);
    }, 5000);
  };

  const handleSpeakAudio = () => {
    setIsPlayingAudio(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text =
        accessibility.language === 'hi'
          ? 'माँ जी, चिंता न करें। प्रिया पास में ही हैं और उन्हें सूचना भेज दी गई है। धीरे-धीरे गहरी सांस लें।'
          : 'Mataji, do not worry. Priya is nearby and has been notified. Take a slow deep breath.';
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = accessibility.language === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.9;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div
      id="patient-help-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Patient Assistance and Caregiver Contact"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-emerald-500 text-stone-800 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 w-12 h-12 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-xs"
          aria-label="Close help (Escape)"
          title="Close dialog"
        >
          <X className="w-7 h-7" />
        </button>

        <div className="flex items-center gap-4 mb-5 pr-12">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 shadow-xs">
            <Heart className="w-9 h-9 fill-emerald-600 text-emerald-700" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              {t('helpModalTitle')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
              {t('helpButton')}
            </h2>
          </div>
        </div>

        <p className="text-base sm:text-lg text-stone-600 mb-6 font-medium leading-relaxed">
          {t('helpModalBody')}
        </p>

        {callInitiated ? (
          <div className="p-5 bg-emerald-50 border-2 border-emerald-500 rounded-2xl mb-5 text-center shadow-xs">
            <div className="flex items-center justify-center gap-2 text-emerald-800 font-bold text-lg mb-1">
              <PhoneCall className="w-6 h-6 animate-bounce" />
              <span>Connecting to {activePatient.primaryCaregiver}...</span>
            </div>
            <p className="text-xs text-emerald-700 font-medium">
              Alert beacon sent to caregiver tablet. Ringing on phone ({activePatient.caregiverPhone}).
            </p>
          </div>
        ) : null}

        <div className="space-y-3">
          {/* Primary Big Touch Action: Call Caregiver */}
          <button
            type="button"
            onClick={handleSimulatedCall}
            disabled={callInitiated}
            className="w-full h-16 sm:h-18 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg sm:text-xl shadow-md flex items-center justify-center gap-3 transition-transform active:scale-[0.98] cursor-pointer"
          >
            <PhoneCall className="w-7 h-7" />
            <span>{callInitiated ? 'Ringing Caregiver...' : t('callCaregiver')}</span>
          </button>

          {/* Secondary Big Action: Audio Voice Guidance */}
          <button
            type="button"
            onClick={handleSpeakAudio}
            className="w-full h-14 sm:h-16 px-6 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-base sm:text-lg border-2 border-stone-300 flex items-center justify-center gap-3 transition-colors cursor-pointer"
          >
            <Volume2 className={`w-6 h-6 text-emerald-700 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
            <span>
              {isPlayingAudio
                ? accessibility.language === 'hi'
                  ? 'मार्गदर्शन सुनाया जा रहा है...'
                  : 'Playing soothing guide...'
                : accessibility.language === 'hi'
                ? 'आवाज़ में मार्गदर्शन सुनें'
                : 'Listen to Voice Guidance'}
            </span>
          </button>

          {/* Explicit Prominent Cancel / Go Back Button */}
          <button
            type="button"
            onClick={handleClose}
            className="w-full h-12 rounded-2xl bg-white hover:bg-stone-100 text-stone-700 font-bold text-sm border-2 border-stone-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-stone-500" />
            <span>
              {accessibility.language === 'hi'
                ? 'रद्द करें / वापस जाएँ'
                : 'Cancel & Return to Screen'}
            </span>
          </button>
        </div>

        <div className="mt-5 pt-4 border-t border-stone-200 flex items-center justify-between text-xs sm:text-sm text-stone-500">
          <div className="flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>Primary Caregiver: {activePatient.primaryCaregiver}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-stone-400" />
            <span>24/7 Monitored</span>
          </div>
        </div>
      </div>
    </div>
  );
};
