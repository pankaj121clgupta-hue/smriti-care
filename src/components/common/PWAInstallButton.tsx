import React from 'react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { useApp } from '../../context/AppContext';
import { Smartphone, Download } from 'lucide-react';

export const PWAInstallButton: React.FC<{ variant?: 'header' | 'hero' | 'card' }> = ({
  variant = 'header'
}) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const { setIsApkModalOpen } = useApp();

  const handleClick = async () => {
    if (isInstallable) {
      const installed = await install();
      if (!installed) {
        setIsApkModalOpen(true);
      }
    } else {
      setIsApkModalOpen(true);
    }
  };

  if (variant === 'hero') {
    return (
      <button
        id="hero-get-apk-btn"
        onClick={handleClick}
        className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#F27D26] hover:bg-[#d66a1a] text-white font-bold text-sm shadow-md transition-all cursor-pointer hover:scale-102"
      >
        <Smartphone className="w-5 h-5 text-white" />
        <span>Download Android App (.apk)</span>
      </button>
    );
  }

  if (variant === 'card') {
    return (
      <div className="bg-[#E9F2EF] border border-[#D1E8E2] rounded-3xl p-6 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-[#1B4D4E] text-white flex items-center justify-center mx-auto shadow-xs">
          <Download className="w-6 h-6 text-amber-300" />
        </div>
        <h4 className="font-black text-base text-[#1B4D4E]">
          Install on Android Tablet
        </h4>
        <p className="text-xs text-[#4A4A4A] max-w-sm mx-auto">
          Get the standalone offline APK for elderly care centers and health clinics across India.
        </p>
        <button
          onClick={handleClick}
          className="px-5 py-2.5 rounded-xl bg-[#1B4D4E] hover:bg-[#153a3b] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer inline-flex items-center gap-2"
        >
          <Smartphone className="w-4 h-4" />
          <span>Get APK &amp; WebAPK</span>
        </button>
      </div>
    );
  }

  // Header default variant
  return (
    <button
      id="header-install-apk-btn"
      onClick={handleClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FDF3E1] hover:bg-[#faebd0] text-[#1B4D4E] border border-[#F27D26]/40 text-xs font-bold transition-all shadow-xs cursor-pointer"
      title="Download Android APK & Install App"
    >
      <Smartphone className="w-3.5 h-3.5 text-[#F27D26]" />
      <span className="hidden md:inline">Install APK</span>
      <span className="md:hidden">APK</span>
    </button>
  );
};
