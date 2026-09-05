import React from 'react';
import { useApp } from '../../context/AppContext';
import { TrendingUp, TrendingDown, Info, ShieldCheck, User } from 'lucide-react';

export const PersonalBaselineCard: React.FC = () => {
  const { activePatient, aiState } = useApp();

  const currentScore = activePatient.currentPerformance;
  const baseline = activePatient.baselineScore;
  const deviation = currentScore - baseline;
  const isPositive = deviation >= 0;

  return (
    <div
      id="personal-baseline-card"
      className="bg-white rounded-[32px] p-6 sm:p-7 border border-[#E5E2D9] shadow-sm"
    >
      <div className="flex items-center justify-between pb-4 border-b border-[#E5E2D9] mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#E9F2EF] text-[#1B4D4E] border border-[#D1E8E2] flex items-center justify-center font-black text-xs">
            PB
          </div>
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#1B4D4E]">
              Personal Baseline View
            </h3>
            <p className="text-xs text-[#4A4A4A] font-medium">
              Individual Longitudinal Tracking ({activePatient.name})
            </p>
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-bold border ${
            activePatient.status === 'Stable'
              ? 'bg-[#F0F7F4] text-[#2D5A27] border-[#D1E8E2]'
              : activePatient.status === 'Watch'
              ? 'bg-[#FDF3E1] text-[#F27D26] border-[#F27D26]/30'
              : 'bg-[#FFF5F5] text-[#D94E33] border-[#D94E33]/30'
          }`}
        >
          ● Status: {activePatient.status}
        </span>
      </div>

      {/* 4 Metrics Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#FDFBF7] rounded-2xl p-4 border border-[#E5E2D9]">
          <span className="text-xs font-bold text-[#4A4A4A] block mb-1">
            Current Performance
          </span>
          <span className="text-3xl font-black text-[#1A1A1A]">
            {currentScore}%
          </span>
        </div>

        <div className="bg-[#FDFBF7] rounded-2xl p-4 border border-[#E5E2D9]">
          <span className="text-xs font-bold text-[#4A4A4A] block mb-1">
            Historical Baseline
          </span>
          <span className="text-3xl font-black text-[#4A4A4A]">
            {baseline}%
          </span>
        </div>

        <div className="bg-[#FDFBF7] rounded-2xl p-4 border border-[#E5E2D9]">
          <span className="text-xs font-bold text-[#4A4A4A] block mb-1">
            Deviation
          </span>
          <div className="flex items-center gap-1.5">
            <span
              className={`text-3xl font-black ${
                isPositive ? 'text-[#2D5A27]' : 'text-[#F27D26]'
              }`}
            >
              {isPositive ? `+${deviation}%` : `${deviation}%`}
            </span>
            {isPositive ? (
              <TrendingUp className="w-5 h-5 text-[#2D5A27]" />
            ) : (
              <TrendingDown className="w-5 h-5 text-[#F27D26]" />
            )}
          </div>
        </div>

        <div className="bg-[#FDFBF7] rounded-2xl p-4 border border-[#E5E2D9]">
          <span className="text-xs font-bold text-[#4A4A4A] block mb-1">
            Cognitive Stability
          </span>
          <span className="text-2xl font-black text-[#1B4D4E] block mt-1">
            {aiState.performanceTrend}
          </span>
        </div>
      </div>

      {/* Narrative Clinical Explanation */}
      <div className="p-4 bg-[#F0F7F4] border border-[#D1E8E2] rounded-2xl flex items-start gap-3 text-xs text-[#1A1A1A]">
        <Info className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          &ldquo;This compares recent activity with the patient&apos;s own historical
          pattern.&rdquo; SmritiCare monitors personal deviations rather than grading patients
          against generic population norms, ensuring dignity and personalized sensitivity.
        </p>
      </div>
    </div>
  );
};
