import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../data/mockData';
import {
  Download,
  Printer,
  X,
  FileText,
  ShieldCheck,
  Brain,
  AlertCircle,
  CheckCircle2,
  Calendar,
  User,
  Activity
} from 'lucide-react';

export const ClinicalReportModal: React.FC = () => {
  const {
    isClinicalReportOpen,
    setIsClinicalReportOpen,
    activePatient,
    aiState,
    syncStatus
  } = useApp();

  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isClinicalReportOpen) return null;

  const handleDownloadPdf = () => {
    setDownloadSuccess(true);
    // Trigger standard browser print which generates crisp vector PDF
    setTimeout(() => {
      window.print();
      setDownloadSuccess(false);
    }, 400);
  };

  return (
    <div
      id="clinical-report-modal"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-10 shadow-2xl border border-stone-300 text-stone-800 my-8 animate-in fade-in zoom-in-95 duration-200 print:m-0 print:p-0 print:border-none print:shadow-none">
        {/* Top Modal Controls */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-100 px-3 py-1 rounded-full">
              Formal Health Record Preview
            </span>
            <span className="text-xs text-stone-500 font-medium">
              Confidential Medical Auxiliary
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-700 hover:bg-sky-600 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={() => setIsClinicalReportOpen(false)}
              className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
              aria-label="Close report preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="p-3 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl mb-4 text-center print:hidden">
            ✓ Preparing print-ready PDF export document...
          </div>
        )}

        {/* Printable Report Document Body */}
        <div className="space-y-6 text-stone-800 font-sans">
          {/* Header */}
          <div className="border-b-2 border-stone-800 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900">
                  SMRITICARE
                </h1>
                <h2 className="text-sm sm:text-base font-bold text-teal-800 uppercase tracking-wider">
                  Cognitive Activity & Longitudinal Monitoring Report
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  National Geriatric Cognitive Health Registry
                </p>
              </div>

              <div className="text-right text-xs text-stone-500">
                <p className="font-bold text-stone-900">
                  Report ID: REP-{activePatient.id}-2026
                </p>
                <p>Generated: Today, 14:32 IST</p>
                <p>Sync Verified: {syncStatus.statusText.slice(0, 30)}...</p>
              </div>
            </div>
          </div>

          {/* 1. Patient Information */}
          <section className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs">
            <h3 className="font-black text-stone-900 uppercase tracking-wider text-xs mb-3 pb-1 border-b border-stone-200">
              1. Patient Information
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <span className="text-stone-500 font-semibold block">Full Name:</span>
                <span className="font-bold text-stone-900 text-sm">
                  {activePatient.name} ({activePatient.relationshipName})
                </span>
              </div>
              <div>
                <span className="text-stone-500 font-semibold block">Patient ID:</span>
                <span className="font-bold text-stone-900 text-sm">{activePatient.id}</span>
              </div>
              <div>
                <span className="text-stone-500 font-semibold block">Age / Gender:</span>
                <span className="font-bold text-stone-900">
                  {activePatient.age} yrs / {activePatient.gender}
                </span>
              </div>
              <div>
                <span className="text-stone-500 font-semibold block">District / State:</span>
                <span className="font-bold text-stone-900">
                  {activePatient.district}, {activePatient.state}
                </span>
              </div>
              <div>
                <span className="text-stone-500 font-semibold block">Preferred Language:</span>
                <span className="font-bold text-stone-900 uppercase">
                  {activePatient.language} ({LANGUAGES.find((l) => l.code === activePatient.language)?.name || 'Native Language'})
                </span>
              </div>
              <div>
                <span className="text-stone-500 font-semibold block">Primary Caregiver:</span>
                <span className="font-bold text-stone-900">
                  {activePatient.primaryCaregiver}
                </span>
              </div>
              <div>
                <span className="text-stone-500 font-semibold block">Current Status:</span>
                <span className="font-bold text-teal-800">
                  {activePatient.status} (Baseline: {activePatient.baselineScore}%)
                </span>
              </div>
              <div>
                <span className="text-stone-500 font-semibold block">Device Connectivity:</span>
                <span className="font-bold text-stone-900">Edge Offline-Enabled</span>
              </div>
            </div>
          </section>

          {/* 2. Reporting Period & Activity Summary */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <h3 className="font-black text-stone-900 uppercase tracking-wider mb-2">
                2. Reporting Period
              </h3>
              <p className="text-stone-600 leading-relaxed font-medium">
                Last 30 Calendar Days (Rolling Cohort Assessment). Comprehensive daily
                gamified memory stimuli and routine tracking events.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <h3 className="font-black text-stone-900 uppercase tracking-wider mb-2">
                3. Activity Summary
              </h3>
              <div className="flex justify-between font-medium text-stone-700">
                <span>Completed Cognitive Sessions:</span>
                <span className="font-bold text-stone-900">28 sessions</span>
              </div>
              <div className="flex justify-between font-medium text-stone-700 mt-1">
                <span>Daily Routine Adherence:</span>
                <span className="font-bold text-emerald-800">
                  {activePatient.adherenceRate}%
                </span>
              </div>
            </div>
          </section>

          {/* 4. Cognitive Domain Scores Table */}
          <section className="border border-stone-200 rounded-2xl overflow-hidden text-xs">
            <div className="bg-stone-100 p-3 font-black text-stone-900 uppercase tracking-wider">
              4. Domain Performance vs Personal Baseline
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-stone-600 font-bold">
                  <th className="p-3">Cognitive Domain</th>
                  <th className="p-3">Assessed Activity</th>
                  <th className="p-3">Recent Average</th>
                  <th className="p-3">Personal Baseline</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-medium">
                <tr>
                  <td className="p-3 font-bold text-stone-900">Memory Performance</td>
                  <td className="p-3 text-stone-600">Local Memory &amp; Cultural Recall</td>
                  <td className="p-3 font-bold text-stone-900">{activePatient.memoryScore}%</td>
                  <td className="p-3 text-stone-600">80%</td>
                  <td className="p-3 font-bold text-emerald-700">Stable</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-stone-900">Attention Performance</td>
                  <td className="p-3 text-stone-600">Find the Symbol (Kopou Orchid)</td>
                  <td className="p-3 font-bold text-stone-900">{activePatient.attentionScore}%</td>
                  <td className="p-3 text-stone-600">76%</td>
                  <td className="p-3 font-bold text-emerald-700">Stable</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-stone-900">Spatial Performance</td>
                  <td className="p-3 text-stone-600">Follow the Path (Root Bridge)</td>
                  <td className="p-3 font-bold text-stone-900">{activePatient.spatialScore}%</td>
                  <td className="p-3 text-stone-600">83%</td>
                  <td className="p-3 font-bold text-emerald-700">Consistent</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-stone-900">Routine Adherence</td>
                  <td className="p-3 text-stone-600">Morning BP Medicine &amp; Hydration</td>
                  <td className="p-3 font-bold text-stone-900">{activePatient.adherenceRate}%</td>
                  <td className="p-3 text-stone-600">88%</td>
                  <td className="p-3 font-bold text-emerald-700">+4% Adherent</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* 5. Performance Deviations & Caregiver Notes */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <h3 className="font-black text-stone-900 uppercase tracking-wider mb-2">
                5. Performance Deviations
              </h3>
              <p className="text-stone-700 leading-relaxed font-medium">
                No acute drops observed in morning sessions. Latency mildly elevates during
                late afternoon (past 16:30), reflecting natural circadian tiredness.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <h3 className="font-black text-stone-900 uppercase tracking-wider mb-2">
                6. Caregiver Notes ({activePatient.primaryCaregiver})
              </h3>
              <p className="text-stone-700 leading-relaxed font-medium">
                &ldquo;{activePatient.relationshipName || 'Mataji'} was very pleased to see the traditional Diya and cultural symbols in the
                game. Her mood after breakfast is peaceful and alert.&rdquo;
              </p>
            </div>
          </section>

          {/* 7. AI-Assisted Observations */}
          <section className="p-4 bg-teal-50/70 border border-teal-200 rounded-2xl text-xs">
            <h3 className="font-black text-teal-950 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-teal-700" />
              <span>7. AI-Assisted Adaptation Observations</span>
            </h3>
            <p className="text-stone-700 font-medium leading-relaxed">
              Engine difficulty currently calibrated to Level 3 (coefficient{' '}
              {aiState.currentDifficulty}). Reaction latency sits at {activePatient.reactionTime}s.
              Recommendation: {aiState.recommendation}.
            </p>
          </section>

          {/* 8. Clinical Review Notes (Medical Sign-Off) */}
          <section className="p-4 bg-stone-100 rounded-2xl border border-stone-300 text-xs">
            <h3 className="font-black text-stone-900 uppercase tracking-wider mb-2">
              8. Clinical Review Notes
            </h3>
            <p className="text-stone-700 font-medium italic mb-4">
              &ldquo;Patient maintains high engagement with culturally localized memory
              stimuli. Adherence to prescribed blood pressure medication is strong. Continued
              family engagement and morning walks recommended.&rdquo;
            </p>
            <div className="flex justify-between items-end pt-4 border-t border-stone-300">
              <div>
                <p className="font-bold text-stone-900">Dr. D. K. Barua, MD (Geriatric Care)</p>
                <p className="text-stone-500">National Geriatric Health Centre &amp; Telecare Network</p>
              </div>
              <div className="text-right">
                <span className="font-serif italic font-bold text-sm text-stone-800">
                  D. K. Barua
                </span>
                <p className="text-[10px] text-stone-400">Digital Signature Verified</p>
              </div>
            </div>
          </section>

          {/* Safety & Non-Diagnostic Mandate Footer */}
          <div className="p-3 bg-stone-100 border border-stone-200 rounded-xl text-[11px] text-stone-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-stone-500 shrink-0" />
            <span>
              <strong>Clinical Notice:</strong> &ldquo;Game-derived measurements are
              supportive indicators and are not diagnostic tests.&rdquo; This report is
              intended for auxiliary lifestyle and caregiver assistance.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
