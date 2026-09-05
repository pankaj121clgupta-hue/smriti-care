import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { LANGUAGES } from '../../data/mockData';
import {
  Brain,
  Wifi,
  WifiOff,
  Mic,
  Sliders,
  Sparkles,
  AlertTriangle,
  RotateCw,
  Info,
  User,
  HeartHandshake,
  Stethoscope
} from 'lucide-react';
import { PWAInstallButton } from '../common/PWAInstallButton';

export const Header: React.FC = () => {
  const {
    role,
    setRole,
    syncStatus,
    toggleOnlineOffline,
    accessibility,
    updateAccessibility,
    setIsSyncModalOpen,
    setIsVoiceModalOpen,
    setIsAccessibilityModalOpen,
    setIsAiDemoPanelOpen,
    aiState,
    alerts,
    setPatientView
  } = useApp();

  const unackAlertsCount = alerts.filter((a) => !a.acknowledged).length;

  const getRoleLabel = () => {
    switch (role) {
      case 'patient':
        return 'Patient Mode';
      case 'caregiver':
        return 'Caregiver Mode';
      case 'clinician':
        return 'Clinician Mode';
      case 'architecture':
        return 'System Architecture';
      default:
        return 'Explore Mode';
    }
  };

  return (
    <header
      id="smriticare-header"
      className="sticky top-0 z-40 w-full bg-white text-[#1A1A1A] shadow-xs border-b border-[#E5E2D9] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <button
              id="brand-logo-btn"
              onClick={() => {
                setRole('landing');
              }}
              className="flex items-center gap-3 text-left group focus:outline-none focus:ring-2 focus:ring-[#1B4D4E]/40 rounded-xl p-1 transition-transform"
              title="Return to Landing"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#1B4D4E] flex items-center justify-center text-white font-bold text-xl shadow-xs group-hover:scale-105 transition-transform">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#1B4D4E]">
                    SmritiCare
                  </span>
                  <span className="bg-[#E9F2EF] text-[#1B4D4E] text-[10px] px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider border border-[#1B4D4E]/10">
                    {getRoleLabel()}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#2D5A27] font-medium hidden sm:block">
                  Cognitive Care for India
                </p>
              </div>
            </button>
          </div>

          {/* Role Navigation Switcher (Bento Capsule) */}
          <nav
            id="role-nav-switcher"
            aria-label="User Experience Modes"
            className="hidden md:flex items-center bg-[#F0F7F4] p-1.5 rounded-2xl border border-[#D1E8E2] shadow-inner"
          >
            <button
              id="nav-patient-role"
              onClick={() => {
                setRole('patient');
                setPatientView('home');
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                role === 'patient'
                  ? 'bg-[#1B4D4E] text-white shadow-sm'
                  : 'text-[#1B4D4E] hover:text-[#153a3b] hover:bg-white/80'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Elderly Patient</span>
            </button>

            <button
              id="nav-caregiver-role"
              onClick={() => setRole('caregiver')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all relative ${
                role === 'caregiver'
                  ? 'bg-[#1B4D4E] text-white shadow-sm'
                  : 'text-[#1B4D4E] hover:text-[#153a3b] hover:bg-white/80'
              }`}
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Caregiver</span>
              {unackAlertsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-[#F27D26] animate-pulse ml-0.5" />
              )}
            </button>

            <button
              id="nav-clinician-role"
              onClick={() => setRole('clinician')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                role === 'clinician'
                  ? 'bg-[#1B4D4E] text-white shadow-sm'
                  : 'text-[#1B4D4E] hover:text-[#153a3b] hover:bg-white/80'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Clinician</span>
            </button>

            <button
              id="nav-architecture-role"
              onClick={() => setRole('architecture')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                role === 'architecture'
                  ? 'bg-[#1B4D4E] text-white shadow-sm'
                  : 'text-[#1B4D4E] hover:text-[#153a3b] hover:bg-white/80'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>How It Works</span>
            </button>
          </nav>

          {/* Quick Controls & Tools (Bento Grid Style) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Offline / Online Status Pill */}
            <div className="flex items-center bg-[#F0F7F4] rounded-full border border-[#D1E8E2] p-0.5">
              <button
                id="offline-toggle-btn"
                onClick={toggleOnlineOffline}
                title={syncStatus.isOnline ? 'Switch to Offline Mode' : 'Switch to Online Mode'}
                className="flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium text-[#2D5A27] hover:bg-white/80 transition-colors"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    syncStatus.isOnline ? 'bg-green-500' : 'bg-amber-500 animate-pulse'
                  }`}
                />
                <span className="hidden lg:inline">
                  {syncStatus.isOnline ? 'Connected • Cloud Sync' : 'Offline Ready • Local Edge'}
                </span>
              </button>

              <button
                id="sync-modal-btn"
                onClick={() => setIsSyncModalOpen(true)}
                title="View Synchronization Queue"
                className="p-1.5 text-[#1B4D4E] hover:bg-white rounded-full transition-colors mr-0.5"
                aria-label="View Sync Queue"
              >
                <RotateCw
                  className={`w-3.5 h-3.5 ${syncStatus.isSyncing ? 'animate-spin text-[#1B4D4E]' : ''}`}
                />
              </button>
            </div>

            {/* Language Quick Dropdown */}
            <div className="relative hidden sm:block">
              <select
                id="language-select-dropdown"
                value={accessibility.language}
                onChange={(e) =>
                  updateAccessibility({ language: e.target.value as any })
                }
                className="bg-white text-[#1A1A1A] text-xs font-semibold rounded-xl px-3 py-1.5 border border-[#E5E2D9] focus:ring-2 focus:ring-[#1B4D4E]/30 focus:outline-none appearance-none cursor-pointer pr-7 shadow-xs"
                aria-label="Select Language"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-white text-stone-900">
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#1B4D4E] text-xs">
                ▼
              </div>
            </div>

            {/* Voice Assistant Quick Trigger */}
            <button
              id="voice-assistant-header-btn"
              onClick={() => setIsVoiceModalOpen(true)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#E9F2EF] hover:bg-[#d8ece5] text-[#1B4D4E] border border-[#D1E8E2] text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all focus:ring-2 focus:ring-[#1B4D4E]/30"
              title="Voice Assistant (Multilingual)"
              aria-label="Open Voice Assistant"
            >
              <Mic className="w-4 h-4 text-[#1B4D4E]" />
              <span className="hidden xl:inline">Voice Help</span>
            </button>

            {/* Accessibility Quick Trigger */}
            <button
              id="accessibility-header-btn"
              onClick={() => setIsAccessibilityModalOpen(true)}
              className="p-2 rounded-xl bg-white hover:bg-[#FDFBF7] text-[#1B4D4E] border border-[#E5E2D9] text-xs font-semibold flex items-center justify-center transition-all shadow-xs focus:ring-2 focus:ring-[#1B4D4E]/30"
              title="Accessibility Settings (Font size, High contrast)"
              aria-label="Open Accessibility Settings"
            >
              <Sliders className="w-4 h-4 text-[#1B4D4E]" />
            </button>

            {/* Install APK / Native App Quick Trigger */}
            <PWAInstallButton variant="header" />

            {/* Hackathon Judge AI Demo Trigger */}
            <button
              id="ai-demo-panel-header-btn"
              onClick={() => setIsAiDemoPanelOpen(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                aiState.isSimulatedDrop
                  ? 'bg-[#FDF3E1] text-[#8B4513] border-2 border-[#F27D26] animate-pulse'
                  : 'bg-[#1B4D4E] text-white hover:bg-[#153a3b]'
              }`}
              title="Hackathon Judge: Interactive AI Adaptation & Demo Panel"
            >
              {aiState.isSimulatedDrop ? (
                <AlertTriangle className="w-3.5 h-3.5 text-[#F27D26]" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              )}
              <span className="hidden sm:inline">AI Engine Demo</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-[#E5E2D9] bg-white text-xs">
          <button
            onClick={() => {
              setRole('patient');
              setPatientView('home');
            }}
            className={`px-3 py-1 rounded-lg font-semibold ${
              role === 'patient' ? 'bg-[#1B4D4E] text-white' : 'text-[#1B4D4E]'
            }`}
          >
            Patient
          </button>
          <button
            onClick={() => setRole('caregiver')}
            className={`px-3 py-1 rounded-lg font-semibold relative ${
              role === 'caregiver' ? 'bg-[#1B4D4E] text-white' : 'text-[#1B4D4E]'
            }`}
          >
            Caregiver
            {unackAlertsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#F27D26]" />
            )}
          </button>
          <button
            onClick={() => setRole('clinician')}
            className={`px-3 py-1 rounded-lg font-semibold ${
              role === 'clinician' ? 'bg-[#1B4D4E] text-white' : 'text-[#1B4D4E]'
            }`}
          >
            Clinician
          </button>
          <button
            onClick={() => setRole('architecture')}
            className={`px-3 py-1 rounded-lg font-semibold ${
              role === 'architecture' ? 'bg-[#1B4D4E] text-white' : 'text-[#1B4D4E]'
            }`}
          >
            Architecture
          </button>
        </div>
      </div>
    </header>
  );
};
