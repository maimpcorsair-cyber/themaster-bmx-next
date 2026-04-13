'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const events = [
  {
    id: 1,
    title: 'Kids Street BMX Workshop #3',
    date: '16 สิงหาคม 2568',
    location: 'Crazy Park @ Ratchaburi',
    cost: 'สมัครฟรี! ไม่มีค่าใช้จ่าย',
    image: '/rustfest_1.jpg',
    description: 'Workshop สำหรับเด็ก ฝึก BMX Street กับโค้ชมืออาชีพ',
  },
  {
    id: 2,
    title: 'RUSTFEST Mini Competition',
    date: 'ทุกเดือน',
    location: 'สเกตปาร์คทั่วกรุงเทพ',
    cost: 'ค่าสมัคร 200 บาท',
    image: '/rustfest_2.jpg',
    description: 'แข่งขัน Mini Pump Track + Time Trial',
  },
  {
    id: 3,
    title: 'Family Fun Day',
    date: 'ทุกเดือน',
    location: 'สเกตปาร์คพัทยา',
    cost: 'เข้าฟรี',
    image: '/rustfest_3.jpg',
    description: 'กิจกรรมครอบครัว ปั่นแต่งแฟนซี',
  },
  {
    id: 4,
    title: 'Progress Showcase',
    date: 'ทุก 3 เดือน',
    location: 'The Master BMX School',
    cost: 'เข้าฟรี',
    image: '/rustfest_4.jpg',
    description: 'เด็กโชว์ทักษะ รับ Certificate',
  },
];

const pastEvents = [
  { year: '2025', event: 'Kids Street BMX Workshop #1', month: 'มิถุนายน' },
  { year: '2025', event: 'Kids Street BMX Workshop #2', month: 'กรกฎาคม' },
];

export default function RustfestPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero */}
      <section className="py-24 px-6 bg-gradient-to-b from-red-600/20 via-black to-black">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">
            RUSTFEST 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
            {t.rustfest.title}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            {t.rustfest.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/programs#contact" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-all uppercase tracking-widest text-sm">
              {t.rustfest.register}
            </Link>
            <Link href="/shop" className="border-2 border-white hover:bg-white hover:text-black text-white font-bold py-3 px-6 rounded-full transition-all uppercase tracking-widest text-sm">
              {t.rustfest.viewShop}
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 uppercase tracking-tight border-b border-gray-800 pb-4">
            {t.rustfest.upcoming}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-black border border-gray-800 hover:border-red-600 transition-all overflow-hidden">
                <div className="relative aspect-video">
                  <Image 
                    src={event.image} 
                    alt={event.title} 
                    width={600}
                    height={400}
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {event.date}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-400 mb-3">{event.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>📍 {event.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-500 font-bold">{event.cost}</span>
                    <Link href="/programs#contact" className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-2 px-4 rounded-full transition-all">
                      {t.rustfest.register}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-16 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 uppercase tracking-tight border-b border-gray-800 pb-4">
            รูปแบบงาน
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-black border border-gray-800 p-6 text-center">
              <div className="text-5xl mb-4">🏁</div>
              <h3 className="font-bold text-lg mb-2">Mini Competition</h3>
              <p className="text-gray-500 text-sm">เสาร์ - แข่ง Pump Track, Time Trial, Trick Contest</p>
            </div>
            <div className="bg-black border border-gray-800 p-6 text-center">
              <div className="text-5xl mb-4">🎪</div>
              <h3 className="font-bold text-lg mb-2">Workshop</h3>
              <p className="text-gray-500 text-sm">Workshop สอนเทคนิค BMX ให้เด็กๆ</p>
            </div>
            <div className="bg-black border border-gray-800 p-6 text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-bold text-lg mb-2">Family Fun Day</h3>
              <p className="text-gray-500 text-sm">อาทิตย์ - กิจกรรมครอบครัว แต่งแฟนซี</p>
            </div>
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 uppercase tracking-tight border-b border-gray-800 pb-4">
            งานที่จัดแล้ว
          </h2>
          <div className="space-y-4">
            {pastEvents.map((e, i) => (
              <div key={i} className="bg-gray-950 border border-gray-800 p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold">{e.event}</h3>
                  <p className="text-gray-500 text-sm">{e.month} {e.year}</p>
                </div>
                <span className="text-green-500 text-sm">✓ เสร็จสิ้น</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-6 bg-gray-950 border-t border-gray-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">{t.rustfest.contact}</h2>
          <p className="text-gray-500 mb-6">ติดต่อเราได้เลย!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:088-934-5146" className="bg-white text-black font-bold py-3 px-6 hover:bg-gray-200 transition-colors">
              โทร 088-934-5146
            </a>
            <a href="https://line.me" target="_blank" className="bg-gray-800 text-white font-bold py-3 px-6 hover:bg-gray-700 transition-colors">
              แอดไลน์ @themasterbmx
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
