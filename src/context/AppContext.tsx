import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  Patient,
  CognitiveRecord,
  ReminderItem,
  DailyRoutineItem,
  AnomalyAlert,
  AiAdaptationState,
  SyncStatus,
  AccessibilitySettings,
  LanguageCode
} from '../types';
import { SmritiCareApiService } from '../services/api';
import { TRANSLATIONS } from '../data/mockData';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  patientView: 'home' | 'games' | 'gameplay' | 'today' | 'reminders';
  setPatientView: (view: 'home' | 'games' | 'gameplay' | 'today' | 'reminders') => void;
  selectedGameId: string;
  setSelectedGameId: (id: string) => void;
  
  // Data
  patients: Patient[];
  activePatient: Patient;
  setActivePatient: (patient: Patient) => void;
  cognitiveRecords: CognitiveRecord[];
  routines: DailyRoutineItem[];
  reminders: ReminderItem[];
  alerts: AnomalyAlert[];
  aiState: AiAdaptationState;
  syncStatus: SyncStatus;
  accessibility: AccessibilitySettings;
  
  // Handlers
  updateAccessibility: (settings: Partial<AccessibilitySettings>) => void;
  toggleRoutine: (id: string) => Promise<void>;
  toggleReminder: (id: string) => Promise<void>;
  addReminder: (reminder: Omit<ReminderItem, 'id'>) => Promise<void>;
  acknowledgeAlert: (id: string) => Promise<void>;
  toggleSimulatedPerformanceDrop: () => Promise<void>;
  toggleOnlineOffline: () => void;
  triggerManualSync: () => Promise<void>;
  recordGameCompletion: (gameId: string, scorePercent: number, reactionSeconds: number) => Promise<void>;
  
  // Active UI Dialogs
  isHelpModalOpen: boolean;
  setIsHelpModalOpen: (open: boolean) => void;
  isVoiceModalOpen: boolean;
  setIsVoiceModalOpen: (open: boolean) => void;
  isSyncModalOpen: boolean;
  setIsSyncModalOpen: (open: boolean) => void;
  isAccessibilityModalOpen: boolean;
  setIsAccessibilityModalOpen: (open: boolean) => void;
  isClinicalReportOpen: boolean;
  setIsClinicalReportOpen: (open: boolean) => void;
  isAiDemoPanelOpen: boolean;
  setIsAiDemoPanelOpen: (open: boolean) => void;
  isApkModalOpen: boolean;
  setIsApkModalOpen: (open: boolean) => void;

  // Language helper
  t: (key: keyof typeof TRANSLATIONS['en']) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('landing');
  const [patientView, setPatientView] = useState<'home' | 'games' | 'gameplay' | 'today' | 'reminders'>('home');
  const [selectedGameId, setSelectedGameId] = useState<string>('local-memory');

  const [patients, setPatients] = useState<Patient[]>([]);
  const [activePatient, setActivePatient] = useState<Patient | null>(null);
  const [cognitiveRecords, setCognitiveRecords] = useState<CognitiveRecord[]>([]);
  const [routines, setRoutines] = useState<DailyRoutineItem[]>([]);
  const [reminders, setReminders] = useState<ReminderItem[]>([]);
  const [alerts, setAlerts] = useState<AnomalyAlert[]>([]);
  const [aiState, setAiState] = useState<AiAdaptationState>({
    currentDifficulty: 0.68,
    accuracy: 82,
    reactionTime: 1.7,
    fatigueSignal: 'Low',
    performanceTrend: 'Stable',
    recentTrend: 'Stable over past 14 days',
    recommendation: 'Maintain current difficulty',
    isSimulatedDrop: false
  });
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isOnline: true,
    offlineActivitiesCount: 12,
    pendingUploadsCount: 0,
    lastSyncTime: '14:32 Today',
    isSyncing: false,
    statusText: 'All activities synchronized safely'
  });

  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    textSize: 'large', // default large for elderly ease of use
    highContrast: false,
    reducedMotion: false,
    voiceAssistance: true,
    soundEnabled: true,
    language: 'hi' // default Hindi for Pan-India accessibility, switchable to any regional language
  });

  // Modals
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState(false);
  const [isClinicalReportOpen, setIsClinicalReportOpen] = useState(false);
  const [isAiDemoPanelOpen, setIsAiDemoPanelOpen] = useState(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);

  // Initialize data on mount
  useEffect(() => {
    async function init() {
      const pList = await SmritiCareApiService.getPatients();
      setPatients(pList);
      const active = pList.find((p) => p.id === 'IND-000124') || pList[0];
      setActivePatient(active);

      const records = await SmritiCareApiService.getCognitiveRecords(active.id);
      setCognitiveRecords(records);

      const rts = await SmritiCareApiService.getRoutines();
      setRoutines(rts);

      const rems = await SmritiCareApiService.getReminders();
      setReminders(rems);

      const alts = await SmritiCareApiService.getAlerts();
      setAlerts(alts);

      const ai = await SmritiCareApiService.getAiAdaptation();
      setAiState(ai);

      const sync = await SmritiCareApiService.getSyncStatus();
      setSyncStatus(sync);
    }
    init();
  }, []);

  const updateAccessibility = (settings: Partial<AccessibilitySettings>) => {
    setAccessibility((prev) => ({ ...prev, ...settings }));
  };

  const toggleRoutine = async (id: string) => {
    const updated = await SmritiCareApiService.toggleRoutineItem(id);
    setRoutines([...updated]);
    const sync = await SmritiCareApiService.getSyncStatus();
    setSyncStatus(sync);
  };

  const toggleReminder = async (id: string) => {
    const updated = await SmritiCareApiService.toggleReminder(id);
    setReminders([...updated]);
    const sync = await SmritiCareApiService.getSyncStatus();
    setSyncStatus(sync);
  };

  const addReminder = async (newRem: Omit<ReminderItem, 'id'>) => {
    await SmritiCareApiService.addReminder(newRem);
    const updated = await SmritiCareApiService.getReminders();
    setReminders([...updated]);
  };

  const acknowledgeAlert = async (id: string) => {
    const updated = await SmritiCareApiService.acknowledgeAlert(id);
    setAlerts([...updated]);
  };

  const toggleSimulatedPerformanceDrop = async () => {
    const targetState = !aiState.isSimulatedDrop;
    const newAi = await SmritiCareApiService.simulatePerformanceDrop(targetState);
    setAiState(newAi);

    // Refresh patients and alerts
    const pList = await SmritiCareApiService.getPatients();
    setPatients([...pList]);
    if (activePatient) {
      const refreshedActive = pList.find((p) => p.id === activePatient.id) || activePatient;
      setActivePatient({ ...refreshedActive });
    }

    const alts = await SmritiCareApiService.getAlerts();
    setAlerts([...alts]);
  };

  const toggleOnlineOffline = () => {
    setSyncStatus((prev) => {
      const nextOnline = !prev.isOnline;
      const updated: SyncStatus = {
        ...prev,
        isOnline: nextOnline,
        statusText: nextOnline
          ? 'Connected. Online synchronization available.'
          : 'Offline Mode. Your activities are safely stored on this device.'
      };
      SmritiCareApiService.updateSyncStatus(updated);
      return updated;
    });
  };

  const triggerManualSync = async () => {
    const updated = await SmritiCareApiService.performManualSync();
    setSyncStatus(updated);
  };

  const recordGameCompletion = async (
    gameId: string,
    scorePercent: number,
    reactionSeconds: number
  ) => {
    if (!activePatient) return;
    const { aiState: newAi } = await SmritiCareApiService.recordGameSession(
      activePatient.id,
      gameId,
      scorePercent,
      reactionSeconds
    );
    setAiState(newAi);

    const records = await SmritiCareApiService.getCognitiveRecords(activePatient.id);
    setCognitiveRecords([...records]);

    const pList = await SmritiCareApiService.getPatients();
    setPatients([...pList]);
    const refreshed = pList.find((p) => p.id === activePatient.id);
    if (refreshed) setActivePatient(refreshed);

    const sync = await SmritiCareApiService.getSyncStatus();
    setSyncStatus(sync);
  };

  const t = (key: keyof typeof TRANSLATIONS['en']): string => {
    const lang = accessibility.language as LanguageCode;
    const dict = TRANSLATIONS[lang] || TRANSLATIONS['en'];
    return dict[key] || TRANSLATIONS['en'][key] || '';
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        patientView,
        setPatientView,
        selectedGameId,
        setSelectedGameId,
        patients,
        activePatient: activePatient || patients[0] || ({} as Patient),
        setActivePatient,
        cognitiveRecords,
        routines,
        reminders,
        alerts,
        aiState,
        syncStatus,
        accessibility,
        updateAccessibility,
        toggleRoutine,
        toggleReminder,
        addReminder,
        acknowledgeAlert,
        toggleSimulatedPerformanceDrop,
        toggleOnlineOffline,
        triggerManualSync,
        recordGameCompletion,
        isHelpModalOpen,
        setIsHelpModalOpen,
        isVoiceModalOpen,
        setIsVoiceModalOpen,
        isSyncModalOpen,
        setIsSyncModalOpen,
        isAccessibilityModalOpen,
        setIsAccessibilityModalOpen,
        isClinicalReportOpen,
        setIsClinicalReportOpen,
        isAiDemoPanelOpen,
        setIsAiDemoPanelOpen,
        isApkModalOpen,
        setIsApkModalOpen,
        t
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
