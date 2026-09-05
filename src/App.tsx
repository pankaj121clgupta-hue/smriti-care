import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { LandingPage } from './components/landing/LandingPage';
import { PatientHome } from './components/patient/PatientHome';
import { PatientTodayView } from './components/patient/PatientTodayView';
import { PatientRemindersView } from './components/patient/PatientRemindersView';
import { GameSelection } from './components/games/GameSelection';
import { GamePlayContainer } from './components/games/GamePlayContainer';
import { CaregiverDashboard } from './components/caregiver/CaregiverDashboard';
import { ClinicianDashboard } from './components/clinician/ClinicianDashboard';

// Modals
import { PatientHelpModal } from './components/patient/PatientHelpModal';
import { VoiceAssistantModal } from './components/voice/VoiceAssistantModal';
import { AiDemoPanel } from './components/ai/AiDemoPanel';
import { SyncPanelModal } from './components/sync/SyncPanelModal';
import { ClinicalReportModal } from './components/clinician/ClinicalReportModal';
import { AccessibilityModal } from './components/accessibility/AccessibilityModal';
import { ApkDownloadModal } from './components/common/ApkDownloadModal';
import { OfflineIndicator } from './components/common/OfflineIndicator';

const AppContent: React.FC = () => {
  const { role, patientView, accessibility } = useApp();

  const getFontSizeClass = () => {
    switch (accessibility.fontSize) {
      case 'large':
        return 'text-size-large';
      case 'extra-large':
        return 'text-size-extra-large';
      default:
        return '';
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-[#FDFBF7] text-[#1A1A1A] transition-all ${getFontSizeClass()} ${
        accessibility.highContrast ? 'theme-high-contrast' : ''
      }`}
    >
      {/* Top Universal Accessible Navigation Header */}
      <Header />

      {/* Main Screen Router based on Role and View State */}
      <div className="flex-1">
        {role === 'landing' && <LandingPage />}

        {role === 'patient' && (
          <>
            {patientView === 'home' && <PatientHome />}
            {patientView === 'today' && <PatientTodayView />}
            {patientView === 'reminders' && <PatientRemindersView />}
            {patientView === 'games' && <GameSelection />}
            {patientView === 'gameplay' && <GamePlayContainer />}
          </>
        )}

        {role === 'caregiver' && <CaregiverDashboard />}

        {role === 'clinician' && <ClinicianDashboard />}
      </div>

      {/* Bento Grid Minimalist Status Footer */}
      <footer className="px-6 sm:px-8 py-3 bg-[#1B4D4E]/5 border-t border-[#E5E2D9] flex flex-wrap justify-between items-center gap-2 text-xs">
        <div className="text-[11px] sm:text-xs font-semibold text-[#1B4D4E] uppercase tracking-wider">
          SmritiCare • Pan-India Cognitive Health &amp; Memory Platform
        </div>
        <div className="flex items-center space-x-3 text-[11px] text-[#4A4A4A]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#2D5A27]" />
            <span>Pan-India Edge Protocol</span>
          </span>
          <span>•</span>
          <span>Role: <strong className="capitalize text-[#1B4D4E]">{role}</strong></span>
        </div>
      </footer>

      {/* Global Modals */}
      <PatientHelpModal />
      <VoiceAssistantModal />
      <AiDemoPanel />
      <SyncPanelModal />
      <ClinicalReportModal />
      <AccessibilityModal />
      <ApkDownloadModal />
      <OfflineIndicator />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
