import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CognitiveTrendsCharts } from '../caregiver/CognitiveTrendsCharts';
import { PersonalBaselineCard } from '../caregiver/PersonalBaselineCard';
import {
  Stethoscope,
  Users,
  Activity,
  FileText,
  Clock,
  AlertTriangle,
  FileCheck,
  CheckCircle,
  Download,
  Calendar,
  Sparkles,
  ChevronRight,
  Send,
  UserCheck
} from 'lucide-react';

type ClinicianTab =
  | 'overview'
  | 'history'
  | 'trends'
  | 'game-analytics'
  | 'adherence'
  | 'alerts'
  | 'reports';

export const ClinicianDashboard: React.FC = () => {
  const {
    patients,
    activePatient,
    setActivePatient,
    alerts,
    syncStatus,
    setIsClinicalReportOpen,
    setIsAiDemoPanelOpen
  } = useApp();

  const [activeTab, setActiveTab] = useState<ClinicianTab>('overview');
  const [clinicalNoteInput, setClinicalNoteInput] = useState(
    'Patient shows consistent adherence to morning game stimuli. Baseline variance remains within acceptable ±4% window. Recommended continuing personalized cultural memory games.'
  );
  const [noteSaved, setNoteSaved] = useState(false);

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2500);
  };

  return (
    <div
      id="clinician-dashboard-container"
      className="min-h-[85vh] bg-stone-100 flex flex-col md:flex-row"
    >
      {/* Sidebar */}
      <aside
        id="clinician-sidebar"
        className="w-full md:w-64 bg-slate-900 text-slate-100 border-r border-slate-800 flex flex-col justify-between shrink-0"
      >
        <div className="p-4 sm:p-5 space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-sky-800 text-white flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-white text-base block">
                Clinician Portal
              </span>
              <span className="text-[11px] text-sky-300 font-semibold">
                National Geriatric Health Registry
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 text-xs sm:text-sm font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                activeTab === 'overview'
                  ? 'bg-sky-700 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                activeTab === 'history'
                  ? 'bg-sky-700 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Patient History</span>
            </button>

            <button
              onClick={() => setActiveTab('trends')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                activeTab === 'trends'
                  ? 'bg-sky-700 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Cognitive Trends</span>
            </button>

            <button
              onClick={() => setActiveTab('game-analytics')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                activeTab === 'game-analytics'
                  ? 'bg-sky-700 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Game Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('adherence')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                activeTab === 'adherence'
                  ? 'bg-sky-700 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>Routine Adherence</span>
            </button>

            <button
              onClick={() => setActiveTab('alerts')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                activeTab === 'alerts'
                  ? 'bg-sky-700 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Alerts ({alerts.length})</span>
            </button>

            <button
              onClick={() => setIsClinicalReportOpen(true)}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sky-200 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Reports (PDF Export)</span>
            </button>
          </nav>
        </div>

        {/* Patient Switcher in Sidebar */}
        <div className="p-4 bg-slate-950/60 border-t border-slate-800 text-xs">
          <label className="text-slate-400 font-bold block mb-1.5">
            Select Patient:
          </label>
          <select
            value={activePatient.id}
            onChange={(e) => {
              const p = patients.find((pat) => pat.id === e.target.value);
              if (p) setActivePatient(p);
            }}
            className="w-full p-2 rounded-xl bg-slate-800 text-white border border-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {patients.map((pat) => (
              <option key={pat.id} value={pat.id}>
                {pat.name} ({pat.id})
              </option>
            ))}
          </select>
        </div>
      </aside>

      {/* Main Clinician Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-6">
        {/* Clinician Overview Card Header */}
        <header className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-3 py-1 rounded-full">
              Geriatric Telemedicine &amp; Longitudinal Cohort
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900">
              Clinical Assessment: {activePatient.name}
            </h1>
            <p className="text-xs text-stone-500 font-medium">
              Primary Care Facility: {activePatient.district} Geriatric Telecare Center / National Health Network
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <button
              onClick={() => setIsClinicalReportOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-800 hover:bg-sky-700 text-white transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Full Clinical Report (PDF)</span>
            </button>

            <button
              onClick={() => setIsAiDemoPanelOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-900 text-white hover:bg-stone-800 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>AI Simulator</span>
            </button>
          </div>
        </header>

        {/* Patient Quick Specs Banner (As specified in prompt Section 18) */}
        <section className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-xs">
            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
              <span className="text-stone-500 font-bold block mb-1">Patient ID:</span>
              <span className="text-base font-black text-stone-900">
                {activePatient.id}
              </span>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
              <span className="text-stone-500 font-bold block mb-1">Age / Gender:</span>
              <span className="text-base font-black text-stone-900">
                {activePatient.age} / {activePatient.gender}
              </span>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
              <span className="text-stone-500 font-bold block mb-1">Language:</span>
              <span className="text-base font-black text-stone-900 uppercase">
                {activePatient.language}
              </span>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
              <span className="text-stone-500 font-bold block mb-1">Care Status:</span>
              <span
                className={`text-base font-black ${
                  activePatient.status === 'Stable'
                    ? 'text-emerald-700'
                    : 'text-amber-700'
                }`}
              >
                ● {activePatient.status}
              </span>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 col-span-2 sm:col-span-1">
              <span className="text-stone-500 font-bold block mb-1">Last Sync:</span>
              <span className="text-xs font-black text-stone-900 block mt-1">
                Today, 14:32
              </span>
            </div>
          </div>
        </section>

        {/* Personal Baseline Analytics */}
        <PersonalBaselineCard />

        {/* Cognitive Trends Visualizers */}
        <CognitiveTrendsCharts />

        {/* Clinician Direct Notes & Digital Sign-off Section */}
        <section className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-sky-800" />
              <h3 className="font-extrabold text-stone-900 text-base">
                Clinical Longitudinal Review &amp; Consultation Notes
              </h3>
            </div>
            <span className="text-xs font-bold text-stone-400">
              Dr. D. K. Barua, MD
            </span>
          </div>

          <form onSubmit={handleSaveNote} className="space-y-3">
            <textarea
              value={clinicalNoteInput}
              onChange={(e) => setClinicalNoteInput(e.target.value)}
              rows={3}
              className="w-full p-4 rounded-2xl border border-stone-300 font-medium text-xs sm:text-sm text-stone-900 focus:ring-2 focus:ring-sky-600 focus:outline-none"
              placeholder="Enter clinical observations, caregiver recommendations, or medication adjustments..."
            />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-stone-500 font-medium">
                * Note will be permanently appended to the patient&apos;s digital health passport.
              </p>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                {noteSaved && (
                  <span className="text-xs font-bold text-emerald-700">
                    ✓ Clinical note saved
                  </span>
                )}

                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-sky-800 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Save Clinical Note</span>
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};
