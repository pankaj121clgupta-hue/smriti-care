import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import {
  Smartphone,
  Download,
  Terminal,
  QrCode,
  CheckCircle,
  Copy,
  ExternalLink,
  X,
  Sparkles,
  WifiOff,
  ShieldCheck,
  Layers
} from 'lucide-react';

export const ApkDownloadModal: React.FC = () => {
  const { isApkModalOpen, setIsApkModalOpen } = useApp();
  const { isInstallable, isInstalled, isAndroid, isIOS, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'install' | 'apk' | 'cli' | 'qr'>('install');
  const [copied, setCopied] = useState<string | null>(null);

  if (!isApkModalOpen) return null;

  const appUrl = 'https://ais-pre-5ysmzqqgc5nrnarjbbndn5-279946971588.asia-east1.run.app';
  const pwaBuilderUrl = `https://www.pwabuilder.com/reportcard?site=${encodeURIComponent(appUrl)}`;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const bubblewrapCommand = `# 1. Install Google's official Bubblewrap CLI\nnpm i -g @bubblewrap/cli\n\n# 2. Initialize native Android project from SmritiCare PWA\nbubblewrap init --manifest="${appUrl}/manifest.webmanifest"\n\n# 3. Compile signed Release APK / AAB\nbubblewrap build`;

  return (
    <div
      id="apk-download-modal"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="bg-[#FDFBF7] rounded-[32px] max-w-2xl w-full p-5 sm:p-7 border border-[#E5E2D9] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#E5E2D9] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1B4D4E] flex items-center justify-center text-white shrink-0 shadow-xs">
              <Smartphone className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-[#1B4D4E]">
                  Install SmritiCare Android App (.apk)
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E9F2EF] text-[#2D5A27] border border-[#D1E8E2]">
                  v1.2 Native &amp; PWA
                </span>
              </div>
              <p className="text-xs text-[#4A4A4A] mt-0.5">
                Offline-capable cognitive care platform for Android tablets &amp; phones across India
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsApkModalOpen(false)}
            className="p-2 rounded-xl text-[#4A4A4A] hover:text-[#1A1A1A] hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F0F7F4] border border-[#D1E8E2] rounded-2xl my-4 shrink-0 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('install')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'install'
                ? 'bg-[#1B4D4E] text-white shadow-xs'
                : 'text-[#1B4D4E] hover:bg-white/80'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>1-Tap Install (WebAPK)</span>
          </button>
          <button
            onClick={() => setActiveTab('apk')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'apk'
                ? 'bg-[#1B4D4E] text-white shadow-xs'
                : 'text-[#1B4D4E] hover:bg-white/80'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download APK Package</span>
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'qr'
                ? 'bg-[#1B4D4E] text-white shadow-xs'
                : 'text-[#1B4D4E] hover:bg-white/80'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Scan QR for Tablet</span>
          </button>
          <button
            onClick={() => setActiveTab('cli')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'cli'
                ? 'bg-[#1B4D4E] text-white shadow-xs'
                : 'text-[#1B4D4E] hover:bg-white/80'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>CLI / Bubblewrap</span>
          </button>
        </div>

        {/* Tab Content (Scrollable) */}
        <div className="overflow-y-auto space-y-4 pr-1 text-sm text-[#1A1A1A] flex-1">
          {/* TAB 1: 1-Tap Direct WebAPK Installation */}
          {activeTab === 'install' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-[24px] border border-[#E5E2D9] shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-[#1B4D4E] text-base">
                      Instant Android WebAPK Installation
                    </h4>
                    <p className="text-xs text-[#4A4A4A] mt-1 leading-relaxed">
                      Android devices (Chrome, Samsung Internet, Edge) automatically compile and install a real system APK called a <strong>WebAPK</strong> with dedicated app launcher icons, full-screen standalone mode, and background offline caching.
                    </p>
                  </div>
                  <span className="p-2 rounded-xl bg-[#E9F2EF] text-[#2D5A27] shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </span>
                </div>

                {isInstalled ? (
                  <div className="p-3.5 rounded-xl bg-[#F0F7F4] border border-[#D1E8E2] text-xs font-bold text-[#2D5A27] flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>SmritiCare is already installed and running in Standalone App mode!</span>
                  </div>
                ) : isInstallable ? (
                  <button
                    onClick={async () => {
                      await install();
                    }}
                    className="w-full py-3 px-5 rounded-2xl bg-[#1B4D4E] hover:bg-[#153a3b] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-amber-300" />
                    <span>Install SmritiCare App Now (1-Tap WebAPK)</span>
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-[#FDF3E1] border border-[#F27D26]/30 text-xs text-[#1A1A1A] space-y-2">
                      <p className="font-bold text-[#F27D26]">
                        To install on your Android tablet or phone:
                      </p>
                      <ol className="list-decimal pl-4 space-y-1 text-xs text-[#4A4A4A]">
                        <li>Open this URL in <strong>Google Chrome</strong> or <strong>Samsung Internet</strong> on your Android device.</li>
                        <li>Tap the <strong>three dots (⋮)</strong> menu in the upper right.</li>
                        <li>Select <strong>&quot;Install App&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.</li>
                        <li>Android will compile the WebAPK and install it directly to your launcher!</li>
                      </ol>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={appUrl}
                        className="w-full text-xs font-mono p-2.5 rounded-xl bg-white border border-[#E5E2D9] text-[#1B4D4E]"
                      />
                      <button
                        onClick={() => handleCopy(appUrl, 'url')}
                        className="px-3 py-2.5 rounded-xl bg-[#1B4D4E] text-white text-xs font-bold shrink-0 flex items-center gap-1 cursor-pointer"
                      >
                        {copied === 'url' ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied === 'url' ? 'Copied' : 'Copy URL'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Offline Capabilities Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-[#E5E2D9] text-center">
                  <WifiOff className="w-5 h-5 text-[#1B4D4E] mx-auto mb-1.5" />
                  <h5 className="font-bold text-xs text-[#1B4D4E]">100% Offline Ready</h5>
                  <p className="text-[11px] text-[#4A4A4A] mt-0.5">Service worker caches cognitive games for zero connectivity</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#E5E2D9] text-center">
                  <Smartphone className="w-5 h-5 text-[#2D5A27] mx-auto mb-1.5" />
                  <h5 className="font-bold text-xs text-[#2D5A27]">Full-Screen App</h5>
                  <p className="text-[11px] text-[#4A4A4A] mt-0.5">No browser address bar or confusing tabs for seniors</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#E5E2D9] text-center">
                  <Layers className="w-5 h-5 text-[#F27D26] mx-auto mb-1.5" />
                  <h5 className="font-bold text-xs text-[#F27D26]">Auto-Updating</h5>
                  <p className="text-[11px] text-[#4A4A4A] mt-0.5">Background updates sync whenever mobile network reconnects</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Direct Download APK via PWABuilder */}
          {activeTab === 'apk' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-[24px] border border-[#E5E2D9] shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-[#1B4D4E] text-base">
                      Download Pre-Packaged APK (.apk / .aab)
                    </h4>
                    <p className="text-xs text-[#4A4A4A] mt-1 leading-relaxed">
                      Use the official Google &amp; Microsoft PWABuilder engine to generate a standalone Android APK installer directly from our registered manifest and service worker.
                    </p>
                  </div>
                  <span className="p-2 rounded-xl bg-[#FDF3E1] text-[#F27D26] shrink-0">
                    <Download className="w-6 h-6" />
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#F0F7F4] border border-[#D1E8E2] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1B4D4E]">PWA Manifest Status:</span>
                    <span className="text-xs font-bold text-[#2D5A27] flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Compliant &amp; Registered
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#4A4A4A]">Package ID:</span>
                    <span className="font-mono font-semibold text-[#1A1A1A]">com.smriticare.india</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#4A4A4A]">Target Architecture:</span>
                    <span className="font-semibold text-[#1A1A1A]">Android 8.0+ (Oreo, Pie, 10, 11, 12, 13, 14, 15)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={pwaBuilderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-5 rounded-2xl bg-[#1B4D4E] hover:bg-[#153a3b] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer text-center"
                  >
                    <span>Generate &amp; Download APK on PWABuilder</span>
                    <ExternalLink className="w-4 h-4 text-amber-300" />
                  </a>
                  <p className="text-[11px] text-center text-[#4A4A4A] mt-2">
                    Clicking opens PWABuilder with the live URL pre-loaded. Click <strong>&quot;Package for Android&quot;</strong> to download the compiled `.apk`.
                  </p>
                </div>
              </div>

              {/* Sideloading Instructions */}
              <div className="bg-white p-4 rounded-2xl border border-[#E5E2D9] text-xs text-[#4A4A4A] space-y-2">
                <strong className="text-[#1B4D4E] font-bold block text-sm">
                  How to Install the Downloaded APK on Android:
                </strong>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Download the `.apk` file onto your Android device or transfer it via USB.</li>
                  <li>Tap the downloaded file in your notification bar or Files app.</li>
                  <li>If prompted, toggle &quot;Allow installation from this source&quot; in Android Settings.</li>
                  <li>Tap <strong>Install</strong>. SmritiCare will be available on your home screen!</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: Scan QR for Tablet */}
          {activeTab === 'qr' && (
            <div className="space-y-4 text-center">
              <div className="bg-white p-6 rounded-[24px] border border-[#E5E2D9] shadow-xs inline-block mx-auto max-w-sm w-full">
                <h4 className="font-bold text-[#1B4D4E] text-base mb-1">
                  Scan to Install on Tablet or Phone
                </h4>
                <p className="text-xs text-[#4A4A4A] mb-4">
                  Point your tablet camera or Google Lens at this code to open and install SmritiCare:
                </p>

                {/* Real Dynamic QR Code image using reliable fast API */}
                <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#E5E2D9] inline-block shadow-inner mb-4">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                      appUrl
                    )}&color=1B4D4E&bgcolor=FDFBF7`}
                    alt="Scan QR code to install SmritiCare Android App"
                    className="w-48 h-48 mx-auto rounded-lg"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={appUrl}
                    className="w-full text-xs font-mono p-2 rounded-xl bg-[#F0F7F4] border border-[#D1E8E2] text-[#1B4D4E]"
                  />
                  <button
                    onClick={() => handleCopy(appUrl, 'qr-url')}
                    className="px-3 py-2 rounded-xl bg-[#1B4D4E] text-white text-xs font-bold shrink-0 cursor-pointer"
                  >
                    {copied === 'qr-url' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CLI / Bubblewrap for Developers */}
          {activeTab === 'cli' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-[24px] border border-[#E5E2D9] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-[#1B4D4E] text-base">
                      Google Bubblewrap CLI (Command Line APK Build)
                    </h4>
                    <p className="text-xs text-[#4A4A4A] mt-0.5">
                      For developers and deployment administrators compiling signed APKs using JDK &amp; Android SDK.
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(bubblewrapCommand, 'cli')}
                    className="px-3 py-1.5 rounded-xl bg-[#E9F2EF] hover:bg-[#d8ece5] text-[#1B4D4E] border border-[#D1E8E2] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    {copied === 'cli' ? <CheckCircle className="w-3.5 h-3.5 text-[#2D5A27]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied === 'cli' ? 'Copied Commands' : 'Copy Commands'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-[#0f2b2c] text-emerald-300 font-mono text-xs overflow-x-auto shadow-inner leading-relaxed">
                  <pre>{bubblewrapCommand}</pre>
                </div>

                <div className="text-xs text-[#4A4A4A] space-y-1.5 pt-1">
                  <p>
                    <strong>Output:</strong> Generates <code className="bg-[#F0F7F4] text-[#1B4D4E] px-1.5 py-0.5 rounded font-mono">app-release-signed.apk</code> ready for direct ADB installation (<code className="bg-[#F0F7F4] text-[#1B4D4E] px-1.5 py-0.5 rounded font-mono">adb install app-release-signed.apk</code>) or Google Play Store internal testing.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#E5E2D9] flex items-center justify-between shrink-0 mt-3 text-xs text-[#4A4A4A]">
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Zero-data local storage &bull; SQLite/IndexedDB on-device
          </span>
          <button
            onClick={() => setIsApkModalOpen(false)}
            className="px-5 py-2 rounded-xl bg-white hover:bg-[#FDFBF7] text-[#1B4D4E] border border-[#E5E2D9] font-bold transition-colors cursor-pointer shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
