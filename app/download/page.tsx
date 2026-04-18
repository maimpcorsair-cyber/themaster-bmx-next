'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function DownloadPage() {
  const { lang, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleInstall = async () => {
    // Trigger PWA install prompt
    const promptEvent = (window as any).deferredPrompt;
    if (promptEvent) {
      promptEvent.prompt();
      await promptEvent.userChoice;
      (window as any).deferredPrompt = null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero */}
      <section className="py-16 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">🚲</div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            {lang === 'th' ? 'ดาวน์โหลดแอพ The Master BMX' : 'Download The Master BMX App'}
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            {lang === 'th' 
              ? 'ติดตั้งบนมือถือของคุณ ดูเหมือนแอพจริง ใช้งานได้ทุกที่!'
              : 'Install on your mobile - looks like a real app, works everywhere!'}
          </p>
        </div>
      </section>

      {/* Download Methods */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Android Banner */}
          <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-700 rounded-2xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-6xl">📱</div>
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {lang === 'th' ? 'Android' : 'Android'}
                </div>
                <h2 className="text-2xl font-black mb-2">
                  {lang === 'th' ? 'ติดตั้งบน Android' : 'Install on Android'}
                </h2>
                <p className="text-gray-400 text-sm mb-4">
                  {lang === 'th' 
                    ? 'Chrome บน Android รองรับ PWA ได้ทันที ไม่ต้องดาวน์โหลดจาก Play Store'
                    : 'Chrome on Android supports PWA immediately - no Play Store needed'}
                </p>
              </div>
              <button
                onClick={handleInstall}
                className="bg-green-600 hover:bg-green-700 text-white font-black py-4 px-8 rounded-xl text-lg transition-colors flex items-center gap-3"
              >
                <span className="text-2xl">⬇️</span>
                {lang === 'th' ? 'ติดตั้งเลย' : 'Install Now'}
              </button>
            </div>
          </div>

          {/* iOS Banner */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 rounded-2xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-6xl">🍎</div>
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block bg-gray-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                  iOS / iPhone
                </div>
                <h2 className="text-2xl font-black mb-2">
                  {lang === 'th' ? 'ติดตั้งบน iPhone' : 'Install on iPhone'}
                </h2>
                <p className="text-gray-400 text-sm mb-4">
                  {lang === 'th'
                    ? 'กดปุ่มแชร์ → "เพิ่มที่หน้าจอหลัก" บน Safari'
                    : 'Tap share button → "Add to Home Screen" on Safari'}
                </p>
              </div>
              <div className="bg-white text-black font-black py-4 px-8 rounded-xl text-lg flex items-center gap-3">
                <span className="text-2xl">📲</span>
                {lang === 'th' ? 'ดูคำแนะนำด้านล่าง' : 'See guide below'}
              </div>
            </div>
          </div>

          {/* iOS Instructions */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span>📋</span>
              {lang === 'th' ? 'วิธีติดตั้งบน iPhone (Safari)' : 'How to Install on iPhone (Safari)'}
            </h3>
            <ol className="space-y-4">
              {lang === 'th' ? (
                <>
                  <li className="flex gap-4 items-start">
                    <span className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</span>
                    <span className="pt-1">เปิดเว็บใน <strong>Safari</strong> แล้วไปที่ themaster-bmx-zhnd.vercel.app</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</span>
                    <span className="pt-1">กดปุ่ม <strong>แชร์</strong> <span className="text-2xl">⬆️</span> ด้านล่างของหน้าจอ</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</span>
                    <span className="pt-1">เลื่อนขึ้น เลือก <strong>"เพิ่มที่หน้าจอหลัก"</strong></span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</span>
                    <span className="pt-1">กด <strong>เพิ่ม</strong> มุมบนขวา</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="bg-green-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">✓</span>
                    <span className="pt-1">เสร็จ! Icon จะอยู่ที่หน้าจอหลักของคุณ</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex gap-4 items-start">
                    <span className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</span>
                    <span className="pt-1">Open the website in <strong>Safari</strong> and go to themaster-bmx-zhnd.vercel.app</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</span>
                    <span className="pt-1">Tap the <strong>Share</strong> <span className="text-2xl">⬆️</span> button at the bottom</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</span>
                    <span className="pt-1">Scroll up and tap <strong>"Add to Home Screen"</strong></span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</span>
                    <span className="pt-1">Tap <strong>Add</strong> in top right corner</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="bg-green-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">✓</span>
                    <span className="pt-1">Done! Icon will be on your home screen</span>
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
              <p className="text-gray-500 text-sm">{lang === 'th' ? 'เปิดใช้งานได้ทันที ไม่ต้องรอ' : 'Opens instantly, no waiting'}</p>
            </div>
            <div className="bg-black border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">📴</div>
              <h3 className="font-bold mb-2">{lang === 'th' ? 'ใช้ออฟไลน์ได้' : 'Works Offline'}</h3>
              <p className="text-gray-500 text-sm">{lang === 'th' ? 'ดูข้อมูลได้แม้ไม่มีเน็ต' : 'View info even without internet'}</p>
            </div>
            <div className="bg-black border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">🔔</div>
              <h3 className="font-bold mb-2">{lang === 'th' ? 'แจ้งเตือนได้' : 'Push Notifications'}</h3>
              <p className="text-gray-500 text-sm">{lang === 'th' ? 'รับข่าวสารใหม่ได้ตลอด' : 'Get news and updates always'}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}