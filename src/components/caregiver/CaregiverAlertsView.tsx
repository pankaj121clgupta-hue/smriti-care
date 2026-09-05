import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  AlertTriangle,
  CheckCircle,
  ShieldAlert,
  ArrowDownRight,
  Info,
  Clock,
  User,
  HeartHandshake
} from 'lucide-react';

export const CaregiverAlertsView: React.FC = () => {
  const { alerts, acknowledgeAlert, setActivePatient, patients, setRole } = useApp();

  const handleViewPatientDetails = (patientId: string) => {
    const p = patients.find((pat) => pat.id === patientId);
    if (p) {
      setActivePatient(p);
    }
  };

  return (
    <div id="caregiver-alerts-view" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#1B4D4E]">
            Caregiver Anomaly &amp; Activity Alerts
          </h2>
          <p className="text-xs text-[#4A4A4A] font-medium mt-0.5">
            Real-time notifications of personal performance deviations
          </p>
        </div>
        <span className="px-3.5 py-1 bg-[#FDF3E1] text-[#F27D26] border border-[#F27D26]/30 font-bold text-xs rounded-full">
          {alerts.filter((a) => !a.acknowledged).length} Unacknowledged
        </span>
      </div>

      {/* Safety Mandatory Disclaimer Box */}
      <div className="p-4 bg-[#F0F7F4] border border-[#D1E8E2] rounded-2xl flex items-start gap-3 text-xs text-[#1A1A1A]">
        <Info className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-[#1B4D4E]">Assistance Signal Only:</strong> Performance
          change alerts are supportive indicators designed to prompt a warm check-in with
          family or healthcare workers. They do not constitute a medical diagnosis of
          dementia progression, delirium, or clinical deterioration.
        </p>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`rounded-[32px] p-6 sm:p-7 border transition-all shadow-xs ${
              alert.acknowledged
                ? 'bg-white border-[#E5E2D9] opacity-80'
                : 'bg-[#FDF3E1] border-[#F27D26]/40 shadow-sm'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    alert.acknowledged
                      ? 'bg-stone-100 text-[#4A4A4A]'
                      : 'bg-[#F27D26] text-white shadow-xs'
                  }`}
                >
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold text-[#1A1A1A]">
                      {alert.title}
                    </h3>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white border border-[#E5E2D9] text-[#1B4D4E]">
                      Patient: {alert.patientName} ({alert.patientId})
                    </span>
                    {alert.acknowledged && (
                      <span className="text-xs font-bold text-[#2D5A27] bg-[#F0F7F4] border border-[#D1E8E2] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Acknowledged
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#4A4A4A] font-semibold mt-1">
                    {alert.timestamp}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm font-medium text-[#1A1A1A] mb-5 leading-relaxed">
              {alert.description}
            </p>

            {/* Deviation Deltas Table */}
            <div className="grid grid-cols-3 gap-3 bg-white p-4 rounded-2xl border border-[#E5E2D9] mb-5 max-w-lg">
              <div className="text-center">
                <span className="text-xs font-bold text-[#4A4A4A] block">Memory</span>
                <span className="text-lg font-extrabold text-[#F27D26]">
                  ↓ {Math.abs(alert.memoryDelta)}%
                </span>
              </div>
              <div className="text-center border-x border-[#E5E2D9]">
                <span className="text-xs font-bold text-[#4A4A4A] block">Attention</span>
                <span className="text-lg font-extrabold text-[#F27D26]">
                  ↓ {Math.abs(alert.attentionDelta)}%
                </span>
              </div>
              <div className="text-center">
                <span className="text-xs font-bold text-[#4A4A4A] block">Routine</span>
                <span className="text-lg font-extrabold text-[#F27D26]">
                  ↓ {Math.abs(alert.routineDelta)}%
                </span>
              </div>
            </div>

            {/* Recommended Action */}
            <div className="mb-6 text-xs text-[#1A1A1A] bg-white p-3.5 rounded-xl border border-[#E5E2D9]">
              <strong className="text-[#1B4D4E] font-bold block mb-0.5">
                Recommended Action:
              </strong>
              <span>{alert.recommendedAction}</span>
            </div>

            {/* Action Buttons: Acknowledge & View Details */}
            <div className="flex flex-wrap items-center gap-3">
              {!alert.acknowledged && (
                <button
                  onClick={() => acknowledgeAlert(alert.id)}
                  className="px-5 py-2.5 rounded-xl bg-[#F27D26] hover:bg-[#d66a1a] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                >
                  Acknowledge
                </button>
              )}

              <button
                onClick={() => handleViewPatientDetails(alert.patientId)}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#FDFBF7] text-[#1B4D4E] font-bold text-xs sm:text-sm border border-[#E5E2D9] transition-colors cursor-pointer shadow-xs"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
