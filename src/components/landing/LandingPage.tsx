import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Brain,
  Gamepad2,
  Mic,
  Activity,
  WifiOff,
  Globe2,
  ShieldCheck,
  User,
  HeartHandshake,
  Stethoscope,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  QrCode
} from 'lucide-react';
import { PWAInstallButton } from '../common/PWAInstallButton';

export const LandingPage: React.FC = () => {
  const { setRole, setPatientView, setIsAiDemoPanelOpen, setIsApkModalOpen } = useApp();

  return (
    <div id="landing-page-container" className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A]">
      {/* Hero Bento Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="bg-gradient-to-br from-[#1B4D4E] to-[#2D5A27] rounded-[36px] text-white p-8 sm:p-14 relative overflow-hidden shadow-xl">
          {/* Subtle decorative cultural motif */}
          <div className="absolute -right-16 -bottom-16 opacity-10 pointer-events-none">
            <svg width="340" height="340" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
              <circle cx="50" cy="50" r="40" />
              <path d="M50 10 L50 90 M10 50 L90 50" />
              <circle cx="50" cy="50" r="20" />
            </svg>
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            {/* Pilot Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[#D1E8E2] text-xs sm:text-sm font-semibold mb-6 shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Pan-India Cognitive Care &amp; Geriatric Health Platform</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4">
              Smriti<span className="text-[#D1E8E2]">Care</span>
            </h1>

            <p className="text-xl sm:text-2xl font-medium text-[#D1E8E2] max-w-3xl mx-auto italic mb-4">
              &ldquo;Cognitive support that understands people, communities and everyday life.&rdquo;
            </p>

            <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed mb-10">
              An offline-first cognitive gaming and memory assistance platform designed for
              elderly communities and families across all over India.
            </p>

            {/* Three Role Entry CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto mb-10">
              <button
                id="cta-enter-patient-mode"
                onClick={() => {
                  setRole('patient');
                  setPatientView('home');
                }}
                className="flex flex-col items-center justify-center p-6 rounded-[28px] bg-[#FDF3E1] text-[#8B4513] border-3 border-[#F27D26] shadow-lg transition-all hover:scale-[1.03] active:scale-[0.98] group cursor-pointer"
              >
                <div className="w-13 h-13 rounded-2xl bg-[#F27D26] text-white flex items-center justify-center mb-3 shadow-sm group-hover:rotate-6 transition-transform">
                  <User className="w-7 h-7" />
                </div>
                <span className="text-lg font-black">Enter Patient Mode</span>
                <span className="text-xs text-[#8B4513]/80 mt-1 font-semibold">
                  Simple, large-touch tablet UI
                </span>
              </button>

              <button
                id="cta-enter-caregiver-mode"
                onClick={() => setRole('caregiver')}
                className="flex flex-col items-center justify-center p-6 rounded-[28px] bg-white text-[#1B4D4E] border-2 border-white/60 shadow-lg transition-all hover:scale-[1.03] active:scale-[0.98] group cursor-pointer"
              >
                <div className="w-13 h-13 rounded-2xl bg-[#1B4D4E] text-white flex items-center justify-center mb-3 shadow-sm group-hover:rotate-6 transition-transform">
                  <HeartHandshake className="w-7 h-7" />
                </div>
                <span className="text-lg font-black">Enter Caregiver Mode</span>
                <span className="text-xs text-[#4A4A4A] mt-1 font-semibold">
                  Activity, reminders & alerts
                </span>
              </button>

              <button
                id="cta-enter-clinician-mode"
                onClick={() => setRole('clinician')}
                className="flex flex-col items-center justify-center p-6 rounded-[28px] bg-[#E9F2EF] text-[#1B4D4E] border border-[#D1E8E2] shadow-lg transition-all hover:scale-[1.03] active:scale-[0.98] group cursor-pointer"
              >
                <div className="w-13 h-13 rounded-2xl bg-[#2D5A27] text-white flex items-center justify-center mb-3 shadow-sm group-hover:rotate-6 transition-transform">
                  <Stethoscope className="w-7 h-7" />
                </div>
                <span className="text-lg font-black">Enter Clinician Mode</span>
                <span className="text-xs text-[#4A4A4A] mt-1 font-semibold">
                  Longitudinal trends & reports
                </span>
              </button>
            </div>

            {/* Three Key Architectural Pillars */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs sm:text-sm font-semibold text-white/90">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-xs">
                <WifiOff className="w-4 h-4 text-amber-300" />
                <span>Offline Ready</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-xs">
                <Globe2 className="w-4 h-4 text-amber-300" />
                <span>Multilingual (Major Indian Languages)</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>Privacy First (On-Device Edge)</span>
              </div>
            </div>

            {/* Direct Android APK / PWA Download CTAs */}
            <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <PWAInstallButton variant="hero" />
              <button
                id="hero-open-apk-guide-btn"
                onClick={() => setIsApkModalOpen(true)}
                className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm border border-white/30 backdrop-blur-md transition-all cursor-pointer shadow-xs"
              >
                <QrCode className="w-4 h-4 text-amber-300" />
                <span>Scan QR for Tablet / APK Options</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Three Core Feature Cards - Bento Style */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-black text-[#1B4D4E] tracking-tight">
            Engineered for Cultural Familiarity and Clinical Rigor
          </h2>
          <p className="text-[#4A4A4A] mt-2 max-w-2xl mx-auto text-sm sm:text-base font-medium">
            Designed specifically for elderly individuals across India who may
            experience low digital literacy, language barriers, or rural connectivity constraints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div
            id="feature-card-cognitive-games"
            className="bg-white rounded-[32px] p-7 sm:p-8 border border-[#E5E2D9] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#F0F7F4] text-[#2D5A27] border border-[#D1E8E2] flex items-center justify-center mb-5">
                <Gamepad2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">Cognitive Games</h3>
              <p className="text-[#4A4A4A] text-sm leading-relaxed mb-6 font-medium">
                Localized activities designed around memory, attention, and spatial skills.
                Features culturally familiar treasures like traditional Brass Diya, Peacock Feathers, Clay Chai Kulhar, Lotus, and Indian classical melodies.
              </p>
            </div>
            <ul className="space-y-2.5 text-xs text-[#1A1A1A] font-semibold pt-4 border-t border-[#E5E2D9]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A27]" />
                Adaptive difficulty balancing
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A27]" />
                Gentle non-punitive feedback
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A27]" />
                Audio-guided instructions
              </li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div
            id="feature-card-voice-assistant"
            className="bg-white rounded-[32px] p-7 sm:p-8 border border-[#E5E2D9] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#E9F2EF] text-[#1B4D4E] border border-[#D1E8E2] flex items-center justify-center mb-5">
                <Mic className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">Voice Assistance</h3>
              <p className="text-[#4A4A4A] text-sm leading-relaxed mb-6 font-medium">
                Simple multilingual voice-guided interaction supporting Hindi, English,
                Bengali, Marathi, Tamil, Telugu, Kannada, Gujarati, Punjabi, Malayalam, Odia, Assamese, and more.
              </p>
            </div>
            <ul className="space-y-2.5 text-xs text-[#1A1A1A] font-semibold pt-4 border-t border-[#E5E2D9]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1B4D4E]" />
                One-tap voice navigation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1B4D4E]" />
                Culturally native pronunciations
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1B4D4E]" />
                Spoken medication reminders
              </li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div
            id="feature-card-caregiver-insights"
            className="bg-white rounded-[32px] p-7 sm:p-8 border border-[#E5E2D9] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#FDF3E1] text-[#F27D26] border border-[#F27D26]/30 flex items-center justify-center mb-5">
                <Activity className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">Caregiver Insights</h3>
              <p className="text-[#4A4A4A] text-sm leading-relaxed mb-6 font-medium">
                Understand daily activity adherence and personal baseline trends without
                stigmatizing labels or alarmist clinical jargon.
              </p>
            </div>
            <ul className="space-y-2.5 text-xs text-[#1A1A1A] font-semibold pt-4 border-t border-[#E5E2D9]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A27]" />
                Personal baseline comparison
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A27]" />
                Early non-alarmist deviation alerts
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A27]" />
                Printable clinical reports
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Hackathon Evaluator Quick-Tour Guide */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#F0F7F4] border border-[#D1E8E2] rounded-[32px] p-8 sm:p-10 shadow-xs">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D5A27] bg-white px-3 py-1 rounded-full border border-[#D1E8E2]">
                Interactive Evaluator Tour
              </span>
              <h3 className="text-2xl font-black text-[#1B4D4E] mt-2">
                Complete Hackathon Demo Flow
              </h3>
            </div>
            <button
              onClick={() => setIsAiDemoPanelOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1B4D4E] hover:bg-[#153a3b] text-white rounded-2xl text-sm font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Launch AI Adaptation Engine</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="bg-white p-4 rounded-2xl border border-[#D1E8E2] shadow-xs">
              <span className="font-bold text-[#1B4D4E] text-sm block mb-1">1. Patient Experience</span>
              <p className="text-[#4A4A4A] leading-relaxed">
                Enter Patient Mode to see large-touch Aai home, play &ldquo;Local Memory&rdquo; with Kopou orchids.
              </p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#D1E8E2] shadow-xs">
              <span className="font-bold text-[#2D5A27] text-sm block mb-1">2. Adaptive AI</span>
              <p className="text-[#4A4A4A] leading-relaxed">
                See game outcome adjust difficulty gracefully with non-punitive gentle encouragement.
              </p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#D1E8E2] shadow-xs">
              <span className="font-bold text-[#F27D26] text-sm block mb-1">3. Caregiver &amp; Alerts</span>
              <p className="text-[#4A4A4A] leading-relaxed">
                Switch to Caregiver mode. Test &ldquo;Simulate Performance Drop&rdquo; to trigger deviation alert.
              </p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#D1E8E2] shadow-xs">
              <span className="font-bold text-[#1B4D4E] text-sm block mb-1">4. Clinical Report</span>
              <p className="text-[#4A4A4A] leading-relaxed">
                Switch to Clinician mode, review 30-day baseline adherence, and preview printable PDF report.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Clinical Language Mandate Banner */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-start gap-3 p-5 rounded-2xl bg-white border border-[#E5E2D9] text-left text-xs sm:text-sm text-[#4A4A4A] max-w-2xl mx-auto shadow-xs">
          <AlertCircle className="w-5 h-5 text-[#1B4D4E] shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#1A1A1A]">Clinical Clarification:</strong> SmritiCare
            provides supportive cognitive activity and monitoring information. It does not
            replace professional medical diagnosis or treatment. All game-derived
            measurements are supportive indicators.
          </p>
        </div>
        <p className="text-xs text-[#4A4A4A] mt-4">
          SmritiCare v1.0 • Built for elderly communities across India • Offline-first, multilingual, culturally localized cognitive care
        </p>
      </footer>
    </div>
  );
};
