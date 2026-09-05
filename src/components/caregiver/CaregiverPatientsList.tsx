import React from 'react';
import { useApp } from '../../context/AppContext';
import { Patient, PatientStatus } from '../../types';
import { User, Activity, Clock, CheckCircle2, AlertCircle, ChevronRight, Phone } from 'lucide-react';

export const CaregiverPatientsList: React.FC<{
  onSelectPatient: (patient: Patient) => void;
}> = ({ onSelectPatient }) => {
  const { patients, activePatient } = useApp();

  const getStatusBadge = (status: PatientStatus) => {
    switch (status) {
      case 'Stable':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F0F7F4] text-[#2D5A27] border border-[#D1E8E2]">
            ● Stable
          </span>
        );
      case 'Watch':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FDF3E1] text-[#F27D26] border border-[#F27D26]/30">
            ● Watch
          </span>
        );
      case 'Review':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FFF5F5] text-[#D94E33] border border-[#D94E33]/30">
            ● Review
          </span>
        );
    }
  };

  return (
    <div id="caregiver-patients-list" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#1B4D4E]">
            Monitored Community Patients
          </h2>
          <p className="text-xs text-[#4A4A4A] font-medium mt-0.5">
            Pan-India Rural &amp; Urban Assisted Cohort ({patients.length} Active Records)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => {
          const isSelected = patient.id === activePatient.id;

          return (
            <div
              key={patient.id}
              className={`bg-white rounded-[32px] p-6 sm:p-7 border-2 transition-all shadow-xs hover:shadow-md flex flex-col justify-between ${
                isSelected ? 'border-[#1B4D4E] ring-4 ring-[#E9F2EF]' : 'border-[#E5E2D9]'
              }`}
            >
              <div>
                {/* Header: Name, Location, Status */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#E9F2EF] border border-[#D1E8E2] flex items-center justify-center font-black text-[#1B4D4E] text-lg shrink-0">
                      {patient.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-extrabold text-base text-[#1A1A1A] leading-tight">
                          {patient.name}
                        </h3>
                        <span className="text-xs font-bold text-[#4A4A4A]">
                          ({patient.relationshipName})
                        </span>
                      </div>
                      <p className="text-xs text-[#4A4A4A] font-medium mt-0.5">
                        {patient.district}, {patient.state} • Age {patient.age}
                      </p>
                    </div>
                  </div>

                  {getStatusBadge(patient.status)}
                </div>

                {/* Key Metrics Grid */}
                <div className="space-y-2.5 text-xs text-[#1A1A1A] bg-[#FDFBF7] p-4 rounded-2xl border border-[#E5E2D9] mb-5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#4A4A4A]">Today&apos;s Activity:</span>
                    <span className="font-bold text-[#1A1A1A]">
                      {patient.todayCompletedCount} / {patient.todayTotalCount} completed
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#4A4A4A]">Cognitive Status:</span>
                    <span className="font-bold text-[#1A1A1A]">
                      {patient.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#4A4A4A]">Last Activity:</span>
                    <span className="font-bold text-[#1A1A1A]">
                      {patient.lastActivityTime}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#E5E2D9] pt-2">
                    <span className="font-semibold text-[#4A4A4A]">Reminder Adherence:</span>
                    <span className="font-bold text-[#2D5A27]">
                      {patient.adherenceRate}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#4A4A4A] mb-5">
                  <Phone className="w-3.5 h-3.5 text-[#1B4D4E]" />
                  <span className="line-clamp-1">Caregiver: {patient.primaryCaregiver}</span>
                </div>
              </div>

              {/* View Details Button */}
              <button
                onClick={() => onSelectPatient(patient)}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#1B4D4E] text-white shadow-xs'
                    : 'bg-[#FDFBF7] hover:bg-white text-[#1B4D4E] border border-[#E5E2D9]'
                }`}
              >
                <span>View Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
