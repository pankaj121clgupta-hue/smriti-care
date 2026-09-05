import {
  Patient,
  CognitiveRecord,
  ReminderItem,
  DailyRoutineItem,
  AnomalyAlert,
  AiAdaptationState,
  SyncStatus
} from '../types';
import {
  INITIAL_PATIENT,
  MOCK_PATIENTS,
  GENERATE_30_DAY_RECORDS,
  INITIAL_ROUTINE,
  INITIAL_REMINDERS,
  INITIAL_ALERTS
} from '../data/mockData';

const STORAGE_KEYS = {
  PATIENTS: 'smriticare_patients_v2',
  ACTIVE_PATIENT_ID: 'smriticare_active_patient_id_v2',
  COGNITIVE_RECORDS: 'smriticare_records_v2',
  ROUTINES: 'smriticare_routines_v2',
  REMINDERS: 'smriticare_reminders_v2',
  ALERTS: 'smriticare_alerts_v2',
  SYNC_STATUS: 'smriticare_sync_v2',
  AI_ADAPTATION: 'smriticare_ai_adaptation_v2'
};

export class SmritiCareApiService {
  // --- Initialization & Local Storage ---
  private static getStoredItem<T>(key: string, fallback: T): T {
    try {
      const stored = localStorage.getItem(key);
      if (stored) return JSON.parse(stored);
    } catch {
      // Fallback on error / SSR
    }
    return fallback;
  }

  private static setStoredItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore quota errors in restricted contexts
    }
  }

  // --- Patients ---
  static async getPatients(): Promise<Patient[]> {
    return this.getStoredItem<Patient[]>(STORAGE_KEYS.PATIENTS, MOCK_PATIENTS);
  }

  static async getPatientById(id: string): Promise<Patient> {
    const list = await this.getPatients();
    return list.find((p) => p.id === id) || INITIAL_PATIENT;
  }

  static async updatePatient(updated: Patient): Promise<Patient> {
    const list = await this.getPatients();
    const index = list.findIndex((p) => p.id === updated.id);
    if (index >= 0) {
      list[index] = updated;
    } else {
      list.push(updated);
    }
    this.setStoredItem(STORAGE_KEYS.PATIENTS, list);
    return updated;
  }

  // --- Cognitive Records (30 Days) ---
  static async getCognitiveRecords(_patientId?: string): Promise<CognitiveRecord[]> {
    let records = this.getStoredItem<CognitiveRecord[]>(
      STORAGE_KEYS.COGNITIVE_RECORDS,
      []
    );
    if (!records || records.length === 0) {
      records = GENERATE_30_DAY_RECORDS();
      this.setStoredItem(STORAGE_KEYS.COGNITIVE_RECORDS, records);
    }
    return records;
  }

  static async recordGameSession(
    patientId: string,
    gameId: string,
    scorePercent: number,
    reactionSeconds: number
  ): Promise<{ updatedRecord: CognitiveRecord; aiState: AiAdaptationState }> {
    const records = await this.getCognitiveRecords(patientId);
    const todayStr = new Date().toISOString().split('T')[0];
    let latest = records[records.length - 1];

    if (latest && latest.date === todayStr) {
      // Update today's entry
      latest.gameCompletion = Math.min(100, latest.gameCompletion + 10);
      if (gameId === 'local-memory' || gameId === 'remember-match') {
        latest.memoryScore = Math.round((latest.memoryScore + scorePercent) / 2);
      } else if (gameId === 'find-symbol') {
        latest.attentionScore = Math.round((latest.attentionScore + scorePercent) / 2);
      } else {
        latest.spatialScore = Math.round((latest.spatialScore + scorePercent) / 2);
      }
      latest.reactionTime = Number(((latest.reactionTime + reactionSeconds) / 2).toFixed(2));
      latest.compositeScore = Math.round(
        latest.memoryScore * 0.4 + latest.attentionScore * 0.3 + latest.spatialScore * 0.3
      );
    }

    this.setStoredItem(STORAGE_KEYS.COGNITIVE_RECORDS, records);

    // Update patient current score
    const patient = await this.getPatientById(patientId);
    patient.todayCompletedCount = Math.min(patient.todayTotalCount, patient.todayCompletedCount + 1);
    patient.lastActivityTime = 'Just now';
    patient.currentPerformance = latest ? latest.compositeScore : scorePercent;
    await this.updatePatient(patient);

    // Register offline action
    await this.incrementOfflineAction();

    // Calculate AI adaptation
    const aiState = await this.getAiAdaptation();
    // Dynamic adjustment
    if (scorePercent >= 80) {
      aiState.accuracy = Math.min(95, Math.round(aiState.accuracy * 0.7 + scorePercent * 0.3));
      aiState.recommendation = 'Maintain current difficulty';
      aiState.currentDifficulty = Number(Math.min(0.85, aiState.currentDifficulty + 0.02).toFixed(2));
    } else {
      aiState.recommendation = 'Gentle adjustment recommended';
      aiState.currentDifficulty = Number(Math.max(0.45, aiState.currentDifficulty - 0.03).toFixed(2));
    }
    this.setStoredItem(STORAGE_KEYS.AI_ADAPTATION, aiState);

    return { updatedRecord: latest, aiState };
  }

  // --- Daily Routines ---
  static async getRoutines(): Promise<DailyRoutineItem[]> {
    return this.getStoredItem<DailyRoutineItem[]>(STORAGE_KEYS.ROUTINES, INITIAL_ROUTINE);
  }

  static async toggleRoutineItem(id: string): Promise<DailyRoutineItem[]> {
    const routines = await this.getRoutines();
    const item = routines.find((r) => r.id === id);
    if (item) {
      item.completed = !item.completed;
      this.setStoredItem(STORAGE_KEYS.ROUTINES, routines);
      await this.incrementOfflineAction();
    }
    return routines;
  }

  // --- Reminders ---
  static async getReminders(): Promise<ReminderItem[]> {
    return this.getStoredItem<ReminderItem[]>(STORAGE_KEYS.REMINDERS, INITIAL_REMINDERS);
  }

  static async toggleReminder(id: string): Promise<ReminderItem[]> {
    const list = await this.getReminders();
    const item = list.find((r) => r.id === id);
    if (item) {
      item.completed = !item.completed;
      this.setStoredItem(STORAGE_KEYS.REMINDERS, list);
      await this.incrementOfflineAction();
    }
    return list;
  }

  static async addReminder(newReminder: Omit<ReminderItem, 'id'>): Promise<ReminderItem> {
    const list = await this.getReminders();
    const item: ReminderItem = {
      ...newReminder,
      id: `rem-${Date.now()}`
    };
    list.unshift(item);
    this.setStoredItem(STORAGE_KEYS.REMINDERS, list);
    await this.incrementOfflineAction();
    return item;
  }

  // --- Anomaly Alerts ---
  static async getAlerts(): Promise<AnomalyAlert[]> {
    return this.getStoredItem<AnomalyAlert[]>(STORAGE_KEYS.ALERTS, INITIAL_ALERTS);
  }

  static async acknowledgeAlert(id: string): Promise<AnomalyAlert[]> {
    const list = await this.getAlerts();
    const item = list.find((a) => a.id === id);
    if (item) {
      item.acknowledged = true;
      this.setStoredItem(STORAGE_KEYS.ALERTS, list);
    }
    return list;
  }

  static async triggerSimulatedPerformanceDropAlert(): Promise<AnomalyAlert> {
    const list = await this.getAlerts();
    const newAlert: AnomalyAlert = {
      id: `alt-${Date.now()}`,
      patientId: 'IND-000124',
      patientName: 'Kanta Devi Sharma',
      timestamp: 'Just now (Simulated)',
      title: 'Performance Change Detected',
      description:
        'A noticeable deviation from recent baseline detected across memory & attention exercises.',
      memoryDelta: -12,
      attentionDelta: -9,
      routineDelta: -15,
      severity: 'high',
      acknowledged: false,
      recommendedAction: 'Caregiver review recommended. Consider verifying sleep and water intake.'
    };
    list.unshift(newAlert);
    this.setStoredItem(STORAGE_KEYS.ALERTS, list);
    return newAlert;
  }

  // --- AI Adaptation State ---
  static async getAiAdaptation(): Promise<AiAdaptationState> {
    const fallback: AiAdaptationState = {
      currentDifficulty: 0.68,
      accuracy: 82,
      reactionTime: 1.7,
      fatigueSignal: 'Low',
      performanceTrend: 'Stable',
      recentTrend: 'Stable over past 14 days',
      recommendation: 'Maintain current difficulty',
      isSimulatedDrop: false
    };
    return this.getStoredItem<AiAdaptationState>(STORAGE_KEYS.AI_ADAPTATION, fallback);
  }

  static async simulatePerformanceDrop(enable: boolean): Promise<AiAdaptationState> {
    let state: AiAdaptationState;
    if (enable) {
      state = {
        currentDifficulty: 0.52, // Difficulty decreased to support patient
        accuracy: 64, // Accuracy dropped
        reactionTime: 2.6, // Reaction time prolonged
        fatigueSignal: 'Elevated',
        performanceTrend: 'Declining',
        recentTrend: 'Noticeable drop in last 48h',
        recommendation: 'Difficulty reduced; Caregiver review recommended',
        isSimulatedDrop: true
      };
      await this.triggerSimulatedPerformanceDropAlert();
      // Update patient status to 'Review'
      const patient = await this.getPatientById('IND-000124');
      patient.status = 'Review';
      patient.currentPerformance = 64;
      patient.memoryScore = 68;
      patient.attentionScore = 67;
      await this.updatePatient(patient);
    } else {
      state = {
        currentDifficulty: 0.68,
        accuracy: 82,
        reactionTime: 1.7,
        fatigueSignal: 'Low',
        performanceTrend: 'Stable',
        recentTrend: 'Stable over past 14 days',
        recommendation: 'Maintain current difficulty',
        isSimulatedDrop: false
      };
      // Restore patient status to 'Stable'
      const patient = await this.getPatientById('IND-000124');
      patient.status = 'Stable';
      patient.currentPerformance = 82;
      patient.memoryScore = 82;
      patient.attentionScore = 78;
      await this.updatePatient(patient);
    }
    this.setStoredItem(STORAGE_KEYS.AI_ADAPTATION, state);
    return state;
  }

  // --- Offline & Synchronization ---
  static async getSyncStatus(): Promise<SyncStatus> {
    const fallback: SyncStatus = {
      isOnline: true,
      offlineActivitiesCount: 12,
      pendingUploadsCount: 8,
      lastSyncTime: '14:32 Today',
      isSyncing: false,
      statusText: 'All changes synchronized safely to central health registry'
    };
    return this.getStoredItem<SyncStatus>(STORAGE_KEYS.SYNC_STATUS, fallback);
  }

  static async updateSyncStatus(status: SyncStatus): Promise<SyncStatus> {
    this.setStoredItem(STORAGE_KEYS.SYNC_STATUS, status);
    return status;
  }

  static async incrementOfflineAction(): Promise<void> {
    const status = await this.getSyncStatus();
    status.offlineActivitiesCount += 1;
    if (!status.isOnline) {
      status.pendingUploadsCount += 1;
    }
    this.setStoredItem(STORAGE_KEYS.SYNC_STATUS, status);
  }

  static async performManualSync(): Promise<SyncStatus> {
    const status = await this.getSyncStatus();
    status.isSyncing = true;
    this.setStoredItem(STORAGE_KEYS.SYNC_STATUS, status);

    // Simulate async sync completion
    await new Promise((res) => setTimeout(res, 1200));

    status.isSyncing = false;
    status.pendingUploadsCount = 0;
    const now = new Date();
    status.lastSyncTime = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')} Today`;
    status.statusText = 'Sync complete. 12 activities safely verified.';
    this.setStoredItem(STORAGE_KEYS.SYNC_STATUS, status);
    return status;
  }
}
