'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function DownloadPage() {
  const { lang } = useLanguage();
  const [apkUrl, setApkUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get latest release APK URL from GitHub
    fetch('https://api.github.com/repos/maimpcorsair-cyber/themaster-bmx-next/releases/latest')
      .then(res => res.json())
      .then(data => {
        if (data.assets) {
          const apk = data.assets.find((a: any) => a.name.endsWith('.apk'));
          if (apk) setApkUrl(apk.browser_download_url);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero */}
      <section className="py-16 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">📱</div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            {lang === 'th' ? 'ดาวน์โหลดแอพ The Master BMX' : 'Download The Master BMX App'}
          </h1>
          <p className="text-gray-400 text-lg">
            {lang === 'th' 
              ? 'แอพ Android สำหรับโรงเรียน BMX ของคุณ'
              : 'Android app for The Master BMX School'}
          </p>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Android APK Download Card */}
          <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-700 rounded-2xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-6xl">🤖</div>
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                  APK
                </div>
                <h2 className="text-2xl font-black mb-2">
                  {lang === 'th' ? 'ดาวน์โหลดแอพ Android' : 'Download Android App'}
                </h2>
                <p className="text-gray-400 text-sm">
                  {lang === 'th' 
                    ? 'ติดตั้งแอพได้เลย ไม่ต้องผ่าน Play Store'
                    : 'Install directly - no Play Store needed'}
                </p>
              </div>
              {loading ? (
                <div className="animate-pulse text-green-500">กำลังโหลด...</div>
              ) : apkUrl ? (
                <a
                  href={apkUrl}
                  download
                  className="bg-green-600 hover:bg-green-700 text-white font-black py-4 px-8 rounded-xl text-lg transition-colors flex items-center gap-3"
                >
                  <span className="text-2xl">⬇️</span>
                  {lang === 'th' ? 'ดาวน์โหลด APK' : 'Download APK'}
                </a>
              ) : (
                <div className="bg-gray-700 text-gray-400 font-bold py-4 px-8 rounded-xl">
                  {lang === 'th' ? 'ยังไม่มี APK' : 'No APK available'}
                </div>
              )}
            </div>
          </div>

          {/* How to Install */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span>📋</span>
              {lang === 'th' ? 'วิธีติดตั้ง (Android)' : 'How to Install (Android)'}
            </h3>
            <ol className="space-y-4">
              {lang === 'th' ? (
                <>
                  <li className="flex gap-4 items-start">
                    <span className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</span>
                    <span className="pt-1">กดปุ่ม <strong>ดาวน์โหลด APK</strong> ด้านบน</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</span>
                    <span className="pt-1">เปิดไฟล์ <strong>.apk</strong> ที่ดาวน์โหลดมา</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</span>
                    <span className="pt-1">ถ้าขึ้นเตือน ให้ไป <strong>การตั้งค่า → ความปลอดภัย</strong> → เปิด "แหล่งที่ไม่รู้จัก"</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</span>
                    <span className="pt-1">กด <strong>ติดตั้ง</strong> แล้วรอจนเสร็จ</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="bg-green-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">✓</span>
                    <span className="pt-1">เปิดแอพ <strong>The Master BMX</strong> ได้เลย!</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex gap-4 items-start">
                    <span className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</span>
                    <span className="pt-1">Tap the <strong>Download APK</strong> button above</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</span>
                    <span className="pt-1">Open the downloaded <strong>.apk</strong> file</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</span>
                    <span className="pt-1">If warned, go to <strong>Settings → Security</strong> → enable "Unknown sources"</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</span>
                    <span className="pt-1">Tap <strong>Install</strong> and wait</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="bg-green-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">✓</span>
                    <span className="pt-1">Open <strong>The Master BMX</strong> app!</span>
                  </li>
                </>
              )}
            </ol>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-6 bg-gray-950 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            {lang === 'th' ? '✨ สิ่งที่คุณจะได้' : '✨ What You Get'}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-black border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-bold mb-2">{lang === 'th' ? 'เร็วเหมือนแอพจริง' : 'Fast like Native'}</h3>
              <p className="text-gray-500 text-sm">{lang === 'th' ? 'เปิดใช้งานได้ทันที' : 'Opens instantly'}</p>
            </div>
            <div className="bg-black border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">🔔</div>
              <h3 className="font-bold mb-2">{lang === 'th' ? 'แจ้งเตือนได้' : 'Push Notifications'}</h3>
              <p className="text-gray-500 text-sm">{lang === 'th' ? 'รับข่าวสารใหม่ได้ตลอด' : 'Get news and updates'}</p>
            </div>
            <div className="bg-black border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-bold mb-2">{lang === 'th' ? 'อยู่บนหน้าจอหลัก' : 'On Home Screen'}</h3>
              <p className="text-gray-500 text-sm">{lang === 'th' ? 'เปิดได้เลยไม่ต้องเปิดเบราว์เซอร์' : 'Open directly, no browser'}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}