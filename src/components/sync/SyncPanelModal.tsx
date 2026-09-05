import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wifi,
  WifiOff,
  CloudUpload,
  HardDrive,
  Clock,
  ShieldCheck,
  X,
  CheckCircle2,
  RefreshCw,
  Info
} from 'lucide-react';

export const SyncPanelModal: React.FC = () => {
  const {
    isSyncModalOpen,
    setIsSyncModalOpen,
    syncStatus,
    triggerManualSync,
    setSyncOnlineStatus
  } = useApp();

  const [syncing, setSyncing] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!isSyncModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSyncModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSyncModalOpen, setIsSyncModalOpen]);

  if (!isSyncModalOpen) return null;

  const handleSyncNow = async () => {
    setSyncing(true);
    await triggerManualSync();
    setSyncing(false);
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000);
  };

  return (
    <div
      id="sync-panel-modal"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsSyncModalOpen(false);
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-300 text-stone-900 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center">
              <CloudUpload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-stone-900">
                Data Synchronization & Offline Storage
              </h2>
              <p className="text-xs text-stone-500 font-medium">
                National Rural &amp; Urban Health Telemetry Status
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSyncModalOpen(false)}
            className="p-1.5 rounded-xl hover:bg-stone-100 text-stone-400 hover:text-stone-700"
            aria-label="Close sync modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {successMessage && (
          <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold rounded-xl mb-4 text-center">
            ✓ Successfully synced all queued telemetry with primary health server!
          </div>
        )}

        {/* Telemetry Status Grid */}
        <div className="space-y-3 mb-6">
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3 text-xs font-semibold">
            {/* Local Storage */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-stone-700">
                <HardDrive className="w-4 h-4 text-stone-500" />
                <span>Local Edge Storage:</span>
              </div>
              <span className="font-extrabold text-stone-900 text-sm">
                {syncStatus.localStorageSessions} sessions saved safely
              </span>
            </div>

            {/* Last Sync */}
            <div className="flex items-center justify-between border-t border-stone-200 pt-2">
              <div className="flex items-center gap-2 text-stone-700">
                <Clock className="w-4 h-4 text-stone-500" />
                <span>Last Cloud Sync:</span>
              </div>
              <span className="font-bold text-stone-900">
                {syncStatus.lastSyncTime}
              </span>
            </div>

            {/* Network status */}
            <div className="flex items-center justify-between border-t border-stone-200 pt-2">
              <div className="flex items-center gap-2 text-stone-700">
                {syncStatus.isOnline ? (
                  <Wifi className="w-4 h-4 text-emerald-600" />
                ) : (
                  <WifiOff className="w-4 h-4 text-amber-600" />
                )}
                <span>Network Status:</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    syncStatus.isOnline
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {syncStatus.isOnline ? 'Online Connected' : 'Offline Mode'}
                </span>

                <button
                  onClick={() => setSyncOnlineStatus(!syncStatus.isOnline)}
                  className="text-[11px] underline text-teal-800 font-bold hover:text-teal-950"
                  title="Toggle network connectivity simulation"
                >
                  Toggle
                </button>
              </div>
            </div>

            {/* Pending Uploads */}
            <div className="flex items-center justify-between border-t border-stone-200 pt-2">
              <div className="flex items-center gap-2 text-stone-700">
                <CloudUpload className="w-4 h-4 text-stone-500" />
                <span>Pending Uploads:</span>
              </div>
              <span
                className={`font-black text-sm ${
                  syncStatus.pendingUploads > 0 ? 'text-amber-700' : 'text-emerald-700'
                }`}
              >
                {syncStatus.pendingUploads} records queued
              </span>
            </div>
          </div>
        </div>

        {/* Sync Now Button */}
        <div className="mb-6">
          <button
            onClick={handleSyncNow}
            disabled={syncing}
            className="w-full h-14 rounded-2xl bg-teal-800 hover:bg-teal-700 active:scale-98 text-white font-extrabold text-base sm:text-lg shadow-md flex items-center justify-center gap-2.5 transition-transform disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Synchronizing...' : '[ SYNC NOW ]'}</span>
          </button>
        </div>

        {/* Explanatory Quote from prompt */}
        <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-2xl text-xs text-stone-700 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed font-medium">
            &ldquo;SmritiCare works completely without internet. All data is stored safely
            on this tablet and will automatically sync when a connection becomes
            available.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
};
