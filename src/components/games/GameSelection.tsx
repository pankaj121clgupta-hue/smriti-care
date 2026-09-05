import React from 'react';
import { useApp } from '../../context/AppContext';
import { GAMES_CATALOGUE } from '../../data/mockData';
import {
  ArrowLeft,
  Brain,
  Layers,
  Eye,
  Compass,
  CheckCircle2,
  Sparkles,
  Flower2,
  Clock,
  Gauge
} from 'lucide-react';

export const GameSelection: React.FC = () => {
  const { setSelectedGameId, setPatientView } = useApp();

  const getGameIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flower2':
        return <Flower2 className="w-12 h-12 text-emerald-800" />;
      case 'Layers':
        return <Layers className="w-12 h-12 text-teal-800" />;
      case 'Eye':
        return <Eye className="w-12 h-12 text-teal-900" />;
      case 'Compass':
        return <Compass className="w-12 h-12 text-amber-900" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-12 h-12 text-blue-900" />;
      case 'Sparkles':
        return <Sparkles className="w-12 h-12 text-indigo-900" />;
      default:
        return <Brain className="w-12 h-12 text-emerald-800" />;
    }
  };

  const handleLaunchGame = (gameId: string) => {
    setSelectedGameId(gameId);
    setPatientView('gameplay');
  };

  return (
    <div
      id="game-selection-screen"
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setPatientView('home')}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-[#FDFBF7] text-[#1A1A1A] border border-[#E5E2D9] font-bold text-base transition-colors shadow-xs focus:ring-4 focus:ring-[#1B4D4E]/20"
        >
          <ArrowLeft className="w-5 h-5 text-[#1B4D4E]" />
          <span>Back to Home</span>
        </button>

        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2D5A27] bg-[#F0F7F4] px-3.5 py-1.5 rounded-full border border-[#D1E8E2]">
          Culturally Localized for India
        </span>
      </div>

      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-black text-[#1B4D4E] tracking-tight">
          Choose a Calm Activity
        </h1>
        <p className="text-[#4A4A4A] text-base sm:text-lg font-medium mt-2">
          Select any exercise to enjoy gentle mental stimulation with familiar sights and sounds.
        </p>
      </div>

      {/* 6 Game Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {GAMES_CATALOGUE.map((game) => (
          <div
            key={game.id}
            id={`game-card-${game.id}`}
            className="bg-white rounded-[32px] p-6 sm:p-7 border border-[#E5E2D9] shadow-sm hover:border-[#1B4D4E] hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Large Visual Illustration & Theme */}
              <div className="w-full h-32 rounded-2xl bg-[#FDFBF7] border border-[#E5E2D9] flex items-center justify-center mb-5 group-hover:bg-[#F0F7F4] transition-colors">
                <div className="p-4 rounded-2xl bg-white shadow-xs border border-[#E5E2D9]">
                  {getGameIcon(game.iconName)}
                </div>
              </div>

              {/* Title & Native Script */}
              <div className="mb-3">
                <h3 className="text-2xl font-black text-[#1A1A1A] leading-tight">
                  {game.name}
                </h3>
                {game.nativeName && (
                  <p className="text-xs font-bold text-[#1B4D4E] mt-0.5">
                    {game.nativeName}
                  </p>
                )}
              </div>

              {/* Target Cognitive Skill Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F7F4] text-[#2D5A27] text-xs sm:text-sm font-bold mb-3 border border-[#D1E8E2]">
                <Brain className="w-4 h-4 text-[#2D5A27]" />
                <span>Target: {game.cognitiveSkill}</span>
              </div>

              <p className="text-[#4A4A4A] text-sm font-medium line-clamp-2 mb-4">
                {game.description}
              </p>

              {/* Difficulty & Duration */}
              <div className="flex items-center justify-between text-xs text-[#4A4A4A] font-semibold mb-6 pt-3 border-t border-[#E5E2D9]">
                <span className="flex items-center gap-1">
                  <Gauge className="w-4 h-4 text-[#1B4D4E]" />
                  {game.difficulty}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-[#1B4D4E]" />
                  {game.estimatedDuration}
                </span>
              </div>
            </div>

            {/* Huge Play Button */}
            <button
              onClick={() => handleLaunchGame(game.id)}
              className="w-full h-14 rounded-2xl bg-[#1B4D4E] hover:bg-[#153a3b] active:scale-[0.98] text-white font-extrabold text-lg tracking-wider shadow-sm flex items-center justify-center gap-2 transition-transform focus:outline-none focus:ring-4 focus:ring-[#1B4D4E]/20"
            >
              <span>[ PLAY ]</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
