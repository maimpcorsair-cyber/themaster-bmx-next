'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function DownloadApp() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [dismissed, setDismissed] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  // Don't show if already dismissed or not installable
  if (!isInstallable || dismissed) return null;

  return (
    <div className="fixed top-20 right-4 z-50 bg-gray-900 border border-gray-700 rounded-xl p-4 shadow-2xl max-w-sm">
      <button 
        onClick={() => setDismissed(true)}
        className="absolute top-2 right-2 text-gray-500 hover:text-white"
      >
        ✕
      </button>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-2xl">
          🚲
        </div>
        <div>
          <h3 className="text-white font-bold">ติดตั้งแอพ The Master BMX</h3>
          <p className="text-gray-400 text-xs">ดูเว็บแบบแอพบนมือถือของคุณ</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleInstall}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors"
        >
          📱 ติดตั้งเลย
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="px-4 py-2 text-gray-400 hover:text-white text-sm"
        >
          ไม่ต้อง
        </button>
      </div>
    </div>
  );
}