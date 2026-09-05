import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Brain, Activity, Clock, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

export const CognitiveTrendsCharts: React.FC = () => {
  const { cognitiveRecords, activePatient, aiState } = useApp();
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');

  const displayData =
    timeRange === '7d' ? cognitiveRecords.slice(-7) : cognitiveRecords;

  return (
    <div id="cognitive-analytics-dashboard" className="space-y-6">
      {/* Top Header & Range Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[32px] border border-[#E5E2D9] shadow-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-xl font-black text-[#1B4D4E]">
              Cognitive Analytics &amp; Performance Trends
            </h3>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E9F2EF] text-[#1B4D4E] border border-[#D1E8E2]">
              {activePatient.name} ({activePatient.id})
            </span>
          </div>
          <p className="text-xs text-[#4A4A4A] font-medium mt-1">
            Supportive indicators tracking personal deviation from baseline • No diagnostic claims
          </p>
        </div>

        {/* 7-day vs 30-day toggle */}
        <div className="flex items-center bg-[#FDFBF7] p-1.5 rounded-2xl border border-[#E5E2D9] text-xs font-bold self-start sm:self-auto">
          <button
            onClick={() => setTimeRange('7d')}
            className={`px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer ${
              timeRange === '7d'
                ? 'bg-white text-[#1B4D4E] shadow-xs font-extrabold border border-[#E5E2D9]'
                : 'text-[#4A4A4A] hover:text-[#1A1A1A]'
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setTimeRange('30d')}
            className={`px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer ${
              timeRange === '30d'
                ? 'bg-white text-[#1B4D4E] shadow-xs font-extrabold border border-[#E5E2D9]'
                : 'text-[#4A4A4A] hover:text-[#1A1A1A]'
            }`}
          >
            30 Days Overview
          </button>
        </div>
      </div>

      {/* 4 Analytics Visualizers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CHART 1: Memory Performance Trend */}
        <div className="bg-white rounded-[32px] p-6 sm:p-7 border border-[#E5E2D9] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#F0F7F4] text-[#2D5A27] border border-[#D1E8E2] flex items-center justify-center">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] text-sm">
                  Memory Performance Trend
                </h4>
                <p className="text-[11px] text-[#4A4A4A]">
                  Short-term and cultural recall exercises
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#2D5A27] bg-[#F0F7F4] border border-[#D1E8E2] px-3 py-1 rounded-full">
              Avg: {activePatient.memoryScore}%
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={displayData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="dayLabel" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[50, 100]} stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#E5E2D9',
                    borderRadius: '1rem',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="memoryScore"
                  name="Memory Score (%)"
                  stroke="#2D5A27"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#2D5A27' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: Attention Performance Trend */}
        <div className="bg-white rounded-[32px] p-6 sm:p-7 border border-[#E5E2D9] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#E9F2EF] text-[#1B4D4E] border border-[#D1E8E2] flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] text-sm">
                  Attention Performance Trend
                </h4>
                <p className="text-[11px] text-[#4A4A4A]">
                  Symbol search and focused engagement
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#1B4D4E] bg-[#E9F2EF] border border-[#D1E8E2] px-3 py-1 rounded-full">
              Avg: {activePatient.attentionScore}%
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={displayData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="dayLabel" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[50, 100]} stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#E5E2D9',
                    borderRadius: '1rem',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="attentionScore"
                  name="Attention Score (%)"
                  stroke="#1B4D4E"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#1B4D4E' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 3: Average Reaction Latency Trend */}
        <div className="bg-white rounded-[32px] p-6 sm:p-7 border border-[#E5E2D9] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#E9F2EF] text-[#1B4D4E] border border-[#D1E8E2] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] text-sm">
                  Reaction Latency Trend
                </h4>
                <p className="text-[11px] text-[#4A4A4A]">
                  Average stimulus response time in seconds
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#1B4D4E] bg-[#E9F2EF] border border-[#D1E8E2] px-3 py-1 rounded-full">
              Current: {activePatient.reactionTime}s
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={displayData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="dayLabel" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[1.0, 3.5]} stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#E5E2D9',
                    borderRadius: '1rem',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="reactionTime"
                  name="Latency (seconds)"
                  stroke="#1B4D4E"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#1B4D4E' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 4: Routine Adherence Bar Chart */}
        <div className="bg-white rounded-[32px] p-6 sm:p-7 border border-[#E5E2D9] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#FDF3E1] text-[#F27D26] border border-[#F27D26]/30 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] text-sm">
                  Routine &amp; Medication Adherence
                </h4>
                <p className="text-[11px] text-[#4A4A4A]">
                  Daily completion of hydration, medication and exercises
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#F27D26] bg-[#FDF3E1] border border-[#F27D26]/30 px-3 py-1 rounded-full">
              Weekly Adherence: 92%
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={displayData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="dayLabel" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#E5E2D9',
                    borderRadius: '1rem',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}
                />
                <Bar
                  dataKey="routineAdherence"
                  name="Adherence (%)"
                  fill="#F27D26"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
