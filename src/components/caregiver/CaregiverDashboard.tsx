import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Patient } from '../../types';
import { PersonalBaselineCard } from './PersonalBaselineCard';
import { CognitiveTrendsCharts } from './CognitiveTrendsCharts';
import { CaregiverAlertsView } from './CaregiverAlertsView';
import { CaregiverRemindersView } from './CaregiverRemindersView';
import { CaregiverPatientsList } from './CaregiverPatientsList';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  TrendingUp,
  Clock,
  AlertTriangle,
  FileText,
  Settings,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

type CaregiverTab =
  | 'dashboard'
  | 'patients'
  | 'activities'
  | 'trends'
  | 'reminders'
  | 'alerts'
  | 'reports'
  | 'settings';

export const CaregiverDashboard: React.FC = () => {
  const {
    patients,
    activePatient,
    setActivePatient,
    alerts,
    routines,
    setIsClinicalReportOpen,
    setIsAccessibilityModalOpen,
    setIsAiDemoPanelOpen
  } = useApp();

  const [activeTab, setActiveTab] = useState<CaregiverTab>('dashboard');

  const activeTodayCount = patients.filter((p) => p.todayCompletedCount > 0).length;
  const reviewCount = patients.filter((p) => p.status === 'Review').length;
  const unackAlertsCount = alerts.filter((a) => !a.acknowledged).length;

  const handleSelectPatient = (p: Patient) => {
    setActivePatient(p);
    setActiveTab('dashboard');
  };

  return (
    <div id="caregiver-dashboard-container" className="min-h-[85vh] bg-[#FDFBF7] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside
        id="caregiver-sidebar"
        className="w-full md:w-64 bg-[#1B4D4E] text-[#D1E8E2] border-r border-[#153a3b] flex flex-col justify-between shrink-0"
      >
        <div className="p-4 sm:p-5 space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-white text-base block">
                Care Portal
              </span>
              <span className="text-[11px] text-[#D1E8E2] font-semibold">
                National Care Network
              </span>
            </div>
          </div>

          <nav className="space-y-1.5 text-xs sm:text-sm font-semibold">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-white/20 text-white shadow-xs font-bold'
                  : 'text-[#D1E8E2] hover:bg-white/10 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('patients')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'patients'
                  ? 'bg-white/20 text-white shadow-xs font-bold'
                  : 'text-[#D1E8E2] hover:bg-white/10 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Patients ({patients.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('activities')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'activities'
                  ? 'bg-white/20 text-white shadow-xs font-bold'
                  : 'text-[#D1E8E2] hover:bg-white/10 hover:text-white'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Today&apos;s Activities</span>
            </button>

            <button
              onClick={() => setActiveTab('trends')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'trends'
                  ? 'bg-white/20 text-white shadow-xs font-bold'
                  : 'text-[#D1E8E2] hover:bg-white/10 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Cognitive Trends</span>
            </button>

            <button
              onClick={() => setActiveTab('reminders')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'reminders'
                  ? 'bg-white/20 text-white shadow-xs font-bold'
                  : 'text-[#D1E8E2] hover:bg-white/10 hover:text-white'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Reminders</span>
            </button>

            <button
              onClick={() => setActiveTab('alerts')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'alerts'
                  ? 'bg-white/20 text-white shadow-xs font-bold'
                  : 'text-[#D1E8E2] hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-4 h-4" />
                <span>Alerts</span>
              </div>
              {unackAlertsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F27D26] text-white">
                  {unackAlertsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsClinicalReportOpen(true)}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#D1E8E2] hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Clinical Reports</span>
            </button>

            <button
              onClick={() => setIsAccessibilityModalOpen(true)}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#D1E8E2] hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom Active Patient Tag */}
        <div className="p-4 bg-black/20 border-t border-white/10 text-xs">
          <span className="text-[#D1E8E2] font-bold block mb-1">
            Focus Patient:
          </span>
          <div className="font-extrabold text-white text-sm">
            {activePatient.name}
          </div>
          <p className="text-[#D1E8E2]/80 text-[11px]">
            ID: {activePatient.id} • {activePatient.district}
          </p>
        </div>
      </aside>

      {/* Main Caregiver Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-6">
        {/* Top Header Card */}
        <header className="bg-white rounded-[32px] p-6 sm:p-7 border border-[#E5E2D9] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2D5A27] bg-[#F0F7F4] px-3 py-1 rounded-full border border-[#D1E8E2]">
              Caregiver Dashboard
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1B4D4E] mt-2 tracking-tight">
              Good Morning, Priya
            </h1>
            <p className="text-xs sm:text-sm text-[#4A4A4A] font-medium mt-1">
              Family & Community Health Monitoring • Live synchronization enabled
            </p>
          </div>

          {/* Quick Metrics Pills */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold">
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F0F7F4] text-[#2D5A27] border border-[#D1E8E2]">
              <span className="w-2 h-2 rounded-full bg-[#2D5A27]" />
              <span>● {patients.length} Patients</span>
            </div>

            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E9F2EF] text-[#1B4D4E] border border-[#D1E8E2]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4D4E]" />
              <span>● {activeTodayCount} Active Today</span>
            </div>

            {reviewCount > 0 && (
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FDF3E1] text-[#F27D26] border border-[#F27D26]/30">
                <AlertTriangle className="w-3.5 h-3.5 text-[#F27D26]" />
                <span>⚠ {reviewCount} Needs Review</span>
              </div>
            )}

            <button
              onClick={() => setIsAiDemoPanelOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1B4D4E] text-white hover:bg-[#153a3b] transition-colors cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI Simulator</span>
            </button>
          </div>
        </header>

        {/* Tab Router Content */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Personal Baseline View */}
            <PersonalBaselineCard />

            {/* Cognitive Performance Charts */}
            <CognitiveTrendsCharts />

            {/* Quick Patients Grid */}
            <div className="pt-2">
              <CaregiverPatientsList onSelectPatient={handleSelectPatient} />
            </div>
          </div>
        )}

        {activeTab === 'patients' && (
          <CaregiverPatientsList onSelectPatient={handleSelectPatient} />
        )}

        {activeTab === 'activities' && (
          <div className="space-y-6">
            <PersonalBaselineCard />
            <CaregiverRemindersView />
          </div>
        )}

        {activeTab === 'trends' && <CognitiveTrendsCharts />}

        {activeTab === 'reminders' && <CaregiverRemindersView />}

        {activeTab === 'alerts' && <CaregiverAlertsView />}
      </main>
    </div>
  );
};
