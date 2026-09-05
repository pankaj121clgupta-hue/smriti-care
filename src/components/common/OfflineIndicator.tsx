import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div
      id="offline-banner-alert"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-2xl bg-[#1B4D4E] text-white px-4 py-2.5 text-xs font-semibold shadow-xl border border-[#D1E8E2]/30 animate-in slide-in-from-bottom-2"
    >
      <span className="w-2.5 h-2.5 rounded-full bg-[#F27D26] animate-pulse shrink-0" />
      <WifiOff className="w-4 h-4 text-amber-300 shrink-0" />
      <span>Offline Mode Active &bull; Games &amp; Reminders saved locally</span>
    </div>
  );
};
