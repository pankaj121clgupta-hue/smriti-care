export type UserRole = 'landing' | 'patient' | 'caregiver' | 'clinician' | 'architecture';

export type LanguageCode =
  | 'hi'
  | 'en'
  | 'bn'
  | 'mr'
  | 'ta'
  | 'te'
  | 'kn'
  | 'gu'
  | 'pa'
  | 'ml'
  | 'or'
  | 'as'
  | 'mni'
  | 'kha'
  | 'lus'
  | 'nag';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  region: string;
}

export type PatientStatus = 'Stable' | 'Watch' | 'Review';

export interface Patient {
  id: string;
  name: string;
  relationshipName: string; // e.g. "Mataji", "Dadi", "Aai", "Paati", "Thakuma", "Baa", "Ajoba"
  age: number;
  gender: string;
  language: LanguageCode;
  district: string;
  state: string;
  status: PatientStatus;
  primaryCaregiver: string;
  caregiverPhone: string;
  lastActivityTime: string;
  todayCompletedCount: number;
  todayTotalCount: number;
  adherenceRate: number;
  memoryScore: number;
  attentionScore: number;
  spatialScore: number;
  reactionTime: number; // in seconds
  baselineScore: number;
  currentPerformance: number;
  avatarUrl?: string;
  notes?: string;
}

export interface CognitiveRecord {
  date: string;
  dayLabel: string;
  memoryScore: number;
  attentionScore: number;
  spatialScore: number;
  reactionTime: number; // in seconds
  routineAdherence: number; // percentage 0 - 100
  gameCompletion: number; // percentage 0 - 100
  compositeScore: number;
}

export type ReminderType = 'medicine' | 'hydration' | 'meal' | 'exercise' | 'doctor' | 'game';

export interface ReminderItem {
  id: string;
  type: ReminderType;
  title: string;
  time: string;
  completed: boolean;
  repeat: string;
  voiceMessage: string;
  language: LanguageCode;
  icon?: string;
}

export interface DailyRoutineItem {
  id: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  title: string;
  subtitle?: string;
  completed: boolean;
  type: 'routine' | 'meal' | 'medicine' | 'water' | 'game';
}

export interface AnomalyAlert {
  id: string;
  patientId: string;
  patientName: string;
  timestamp: string;
  title: string;
  description: string;
  memoryDelta: number; // e.g. -12
  attentionDelta: number; // e.g. -9
  routineDelta: number; // e.g. -15
  severity: 'low' | 'moderate' | 'high';
  acknowledged: boolean;
  recommendedAction: string;
}

export interface GameMetadata {
  id: string;
  name: string;
  nativeName?: string;
  cognitiveSkill: 'Short-term memory' | 'Selective attention' | 'Spatial orientation' | 'Daily activity retention' | 'Working memory' | 'Cultural familiarity';
  skillShort: 'Memory' | 'Attention' | 'Spatial' | 'Routine' | 'Working Memory' | 'Culture';
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  estimatedDuration: string;
  description: string;
  theme: string;
  iconName: string;
  color: string;
}

export interface AiAdaptationState {
  currentDifficulty: number; // 0.1 to 1.0, e.g. 0.68
  accuracy: number; // percentage e.g. 82
  reactionTime: number; // in seconds e.g. 1.7
  fatigueSignal: 'Low' | 'Moderate' | 'Elevated';
  performanceTrend: 'Stable' | 'Declining' | 'Improving';
  recentTrend: string;
  recommendation: string;
  isSimulatedDrop: boolean;
}

export interface SyncStatus {
  isOnline: boolean;
  offlineActivitiesCount: number;
  pendingUploadsCount: number;
  lastSyncTime: string;
  isSyncing: boolean;
  statusText: string;
}

export interface AccessibilitySettings {
  textSize: 'standard' | 'large' | 'extra-large';
  highContrast: boolean;
  reducedMotion: boolean;
  voiceAssistance: boolean;
  soundEnabled: boolean;
  language: LanguageCode;
}
