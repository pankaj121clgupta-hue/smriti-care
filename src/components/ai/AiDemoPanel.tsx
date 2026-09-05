import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  X,
  TrendingDown,
  TrendingUp,
  RotateCcw,
  CloudUpload,
  Brain,
  ShieldCheck,
  AlertTriangle,
  Info,
  Globe2,
  Check
} from 'lucide-react';
import { LanguageCode } from '../../types';

export const AiDemoPanel: React.FC = () => {
  const {
    isAiDemoPanelOpen,
    setIsAiDemoPanelOpen,
    aiState,
    accessibility,
    updateAccessibility,
    simulatePerformanceDrop,
    simulateImprovement,
    resetAiState,
    syncStatus,
    triggerManualSync
  } = useApp();

  const [notification, setNotification] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isAiDemoPanelOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsAiDemoPanelOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAiDemoPanelOpen, setIsAiDemoPanelOpen]);

  if (!isAiDemoPanelOpen) return null;

  const handleClose = () => {
    setIsAiDemoPanelOpen(false);
  };

  const handleDrop = async () => {
    await simulatePerformanceDrop();
    setNotification(
      accessibility.language === 'hi'
        ? '15% की गिरावट दर्ज की गई! असामान्यता अलर्ट और केयरगिवर डैशबोर्ड देखें।'
        : 'Simulated 15% drop! Check Anomaly Alerts & Caregiver Dashboard.'
    );
    setTimeout(() => setNotification(null), 4000);
  };

  const handleImprove = async () => {
    await simulateImprovement();
    setNotification(
      accessibility.language === 'hi'
        ? 'संज्ञानात्मक सुधार दर्ज किया गया! कठिनाई स्तर बढ़ाया गया।'
        : 'Simulated cognitive improvement! Difficulty adjusted upward.'
    );
    setTimeout(() => setNotification(null), 4000);
  };

  const handleReset = async () => {
    await resetAiState();
    setNotification(
      accessibility.language === 'hi'
        ? 'एआई बेसलाइन और पैरामीटर सामान्य स्थिर स्थिति में रीसेट किए गए।'
        : 'AI baseline & parameters restored to default stable state.'
    );
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSync = async () => {
    await triggerManualSync();
    setNotification(
      accessibility.language === 'hi'
        ? 'क्लाउड सिंक सफलतापूर्वक पूरा हुआ!'
        : 'Cloud telemetry sync completed safely!'
    );
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div
      id="ai-demo-panel-modal"
      role="dialog"
      aria-modal="true"
      aria-label="AI Engine Demo Simulator"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
    >
      <div
        className="bg-white rounded-[28px] sm:rounded-3xl max-w-xl w-full shadow-2xl border-2 border-stone-800 text-stone-900 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with prominent close button */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-stone-50 border-b border-stone-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-stone-900 text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-stone-900 leading-tight">
                {accessibility.language === 'hi'
                  ? 'स्मृतिकेयर एज-एआई सिमुलेटर'
                  : 'SmritiCare Edge-AI Engine Simulator'}
              </h2>
              <p className="text-[11px] sm:text-xs text-stone-500 font-medium">
                {accessibility.language === 'hi'
                  ? 'लाइव अनुकूली अंशांकन और विसंगति का प्रदर्शन'
                  : 'Live Adaptive Calibration & Anomaly Detection'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-200/80 hover:bg-stone-300 text-stone-700 hover:text-stone-900 font-bold text-xs transition-colors cursor-pointer"
              aria-label="Close AI panel"
              title="Close dialog (Escape)"
            >
              <X className="w-4 h-4" />
              <span>{accessibility.language === 'hi' ? 'बंद करें' : 'Close'}</span>
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-4">
          {notification && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold rounded-xl text-center animate-in fade-in flex items-center justify-center gap-2 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{notification}</span>
            </div>
          )}

          {/* Current Real-Time AI Insight Box */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <span className="font-extrabold text-stone-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-emerald-700" />
                {accessibility.language === 'hi'
                  ? 'सक्रिय एआई पैरामीटर'
                  : 'Active AI Insight Parameters'}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-stone-200 text-stone-800 font-bold text-[10px]">
                Edge Model v2.4 (Offline-Trained)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-semibold">
              <div className="bg-white p-2.5 rounded-xl border border-stone-200/80">
                <span className="text-stone-500 block text-[11px]">
                  {accessibility.language === 'hi' ? 'कठिनाई स्तर:' : 'Difficulty Level:'}
                </span>
                <span className="text-base font-extrabold text-stone-900">
                  {aiState.currentDifficulty} (L{Math.round(aiState.currentDifficulty * 5)})
                </span>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-stone-200/80">
                <span className="text-stone-500 block text-[11px]">
                  {accessibility.language === 'hi' ? 'प्रदर्शन स्थिति:' : 'Performance Trend:'}
                </span>
                <span
                  className={`text-base font-extrabold ${
                    aiState.performanceTrend === 'Stable'
                      ? 'text-emerald-700'
                      : aiState.performanceTrend === 'Improving'
                      ? 'text-teal-700'
                      : 'text-amber-700'
                  }`}
                >
                  {aiState.performanceTrend}
                </span>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-stone-200/80 col-span-2 sm:col-span-1">
                <span className="text-stone-500 block text-[11px]">
                  {accessibility.language === 'hi' ? 'सटीकता दर:' : 'Recent Accuracy:'}
                </span>
                <span className="text-base font-extrabold text-stone-900">
                  {aiState.accuracy}%
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-200">
              <span className="text-stone-500 block text-[11px] font-bold">
                {accessibility.language === 'hi' ? 'गतिशील अनुशंसा:' : 'Dynamic Recommendation:'}
              </span>
              <p className="text-stone-800 font-bold text-xs mt-1 bg-white p-2.5 rounded-xl border border-stone-200/80">
                &ldquo;
                {accessibility.language === 'hi'
                  ? (aiState.isSimulatedDrop
                      ? 'संज्ञान में 15% की गिरावट दर्ज की गई। कठिनाई स्तर कम किया गया और देखभालकर्ता को अलर्ट भेजा गया।'
                      : 'वर्तमान कठिनाई स्तर संतुलित है। स्मृति और ध्यान का अभ्यास जारी रखें।')
                  : aiState.recommendation}
                &rdquo;
              </p>
            </div>

            {/* AI Language Engine Selection */}
            <div className="pt-2 border-t border-stone-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-stone-700 font-bold text-[11px] flex items-center gap-1">
                  <Globe2 className="w-3.5 h-3.5 text-emerald-700" />
                  {accessibility.language === 'hi'
                    ? 'एआई भाषा और ध्वनिक मॉडल:'
                    : 'AI Language & Acoustic Model:'}
                </span>
                <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-md">
                  {accessibility.language === 'hi'
                    ? 'Devanagari Hindi (hi-IN) Active'
                    : `${accessibility.language.toUpperCase()} Active`}
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 text-[11px]">
                {[
                  { code: 'hi', label: 'हिन्दी' },
                  { code: 'en', label: 'English' },
                  { code: 'bn', label: 'বাংলা' },
                  { code: 'mr', label: 'मराठी' },
                  { code: 'ta', label: 'தமிழ்' },
                  { code: 'te', label: 'తెలుగు' },
                  { code: 'gu', label: 'ગુજરાતી' },
                  { code: 'kn', label: 'ಕನ್ನಡ' },
                  { code: 'pa', label: 'ਪੰਜਾਬੀ' },
                  { code: 'ml', label: 'മലയാളം' },
                  { code: 'or', label: 'ଓଡ଼ିଆ' },
                  { code: 'as', label: 'অসমীয়া' }
                ].map((item) => (
                  <button
                    key={item.code}
                    onClick={() => updateAccessibility({ language: item.code as LanguageCode })}
                    className={`py-1.5 px-1 rounded-lg font-bold text-center transition-all cursor-pointer truncate ${
                      accessibility.language === item.code
                        ? 'bg-stone-900 text-amber-300 shadow-xs ring-1 ring-amber-300'
                        : 'bg-white hover:bg-stone-200 text-stone-700 border border-stone-200'
                    }`}
                    title={item.label}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Simulation Action Buttons */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-stone-700 block">
              {accessibility.language === 'hi'
                ? 'संज्ञानात्मक परिदृश्यों का अनुकरण करें:'
                : 'Simulate Patient Cognitive Scenarios:'}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Simulate Performance Drop */}
              <button
                onClick={handleDrop}
                className="p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 text-amber-900 font-bold text-xs flex items-center gap-2.5 transition-colors text-left cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-200 flex items-center justify-center shrink-0">
                  <TrendingDown className="w-5 h-5 text-amber-800" />
                </div>
                <div>
                  <span className="block font-black">
                    {accessibility.language === 'hi'
                      ? 'प्रदर्शन में गिरावट का अनुकरण'
                      : 'Simulate Performance Drop'}
                  </span>
                  <span className="text-[11px] font-normal text-amber-800 block">
                    {accessibility.language === 'hi'
                      ? 'अलर्ट भेजता है व स्तर घटाता है'
                      : 'Triggers anomaly alert & lowers difficulty'}
                  </span>
                </div>
              </button>

              {/* Simulate Improvement */}
              <button
                onClick={handleImprove}
                className="p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-300 text-emerald-900 font-bold text-xs flex items-center gap-2.5 transition-colors text-left cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-200 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-emerald-800" />
                </div>
                <div>
                  <span className="block font-black">
                    {accessibility.language === 'hi'
                      ? 'संज्ञानात्मक सुधार का अनुकरण'
                      : 'Simulate Steady Improvement'}
                  </span>
                  <span className="text-[11px] font-normal text-emerald-800 block">
                    {accessibility.language === 'hi'
                      ? 'कठिनाई को धीरे-धीरे बढ़ाता है'
                      : 'Gradually challenges cognitive reserve'}
                  </span>
                </div>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Force Sync */}
              <button
                onClick={handleSync}
                className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <CloudUpload className="w-4 h-4 text-teal-700" />
                <span>
                  {accessibility.language === 'hi'
                    ? `क्लाउड सिंक (${syncStatus.pendingUploads} कतार में)`
                    : `Simulate Cloud Sync (${syncStatus.pendingUploads} queued)`}
                </span>
              </button>

              {/* Reset to Baseline */}
              <button
                onClick={handleReset}
                className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-stone-600" />
                <span>
                  {accessibility.language === 'hi'
                    ? 'मानक बेसलाइन पर रीसेट करें'
                    : 'Reset to Standard Baseline'}
                </span>
              </button>
            </div>
          </div>

          {/* Ethical Safety Notice */}
          <div className="p-3 bg-stone-100 rounded-xl text-[11px] text-stone-600 flex items-start gap-2 border border-stone-200">
            <Info className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
            <span>
              {accessibility.language === 'hi'
                ? 'प्रदर्शन मोड: कठिनाई स्तर समायोजित करने से वास्तविक समय में गेम पैरामीटर बदलते हैं ताकि मरीज का आत्मविश्वास बना रहे।'
                : 'Demonstration mode: Adjusting difficulty affects local game parameters in real time to preserve patient dignity and prevent cognitive frustration.'}
            </span>
          </div>
        </div>

        {/* Sticky Persistent Footer with Big Cancel / Close & Done Buttons */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2.5 rounded-xl border-2 border-stone-300 bg-white hover:bg-stone-100 text-stone-700 hover:text-stone-900 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <X className="w-4 h-4 text-stone-500" />
            <span>{accessibility.language === 'hi' ? 'रद्द करें / बंद करें' : 'Cancel / Close'}</span>
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{accessibility.language === 'hi' ? 'पूर्ण (Done)' : 'Done & Apply'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
