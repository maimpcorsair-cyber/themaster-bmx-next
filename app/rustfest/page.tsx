'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const events = [
  {
    id: 1,
    title: 'RUSTFEST Mini Competition',
    date: 'ทุกเดือน',
    location: 'สเกตปาร์ครัชดาภิเษก',
    cost: '฿200',
    image: '/rustfest_1.jpg',
    description: 'แข่งขัน Mini Pump Track + Time Trial',
  },
  {
    id: 2,
    title: 'Kids Street BMX Workshop',
    date: 'ทุกเดือน',
    location: 'สเกตปาร์คบางแค',
    cost: '฿300',
    image: '/rustfest_5.jpg',
    description: 'Workshop ฝึก BMX Street กับโค้ชมืออาชีพ',
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
    image: '/rustfest_6.jpg',
    description: 'เด็กโชว์ทักษะ รับ Certificate',
  },
];

const categories = [
  { id: 'mini', nameTh: 'รุ่น Mini', nameEn: 'Mini', age: '6-8 ปี', descTh: 'สำหรับเด็กเล็ก', descEn: 'For young kids' },
  { id: 'jr', nameTh: 'รุ่น Junior', nameEn: 'Junior', age: '9-12 ปี', descTh: 'สำหรับเด็กโต', descEn: 'For older kids' },
  { id: 'open', nameTh: 'รุ่น Open', nameEn: 'Open', age: '13+ ปี', descTh: 'เปิดทุกวัย', descEn: 'All ages' },
];

const prizes = [
  { position: '🥇 อันดับ 1', amount: '฿5,000', points: '+50' },
  { position: '🥈 อันดับ 2', amount: '฿3,000', points: '+30' },
  { position: '🥉 อันดับ 3', amount: '฿2,000', points: '+20' },
  { position: '⭐ ทุกผู้เข้าแข่งขัน', amount: 'ของที่ระลึก', points: '+10' },
];

export default function RustfestPage() {
  const { t, lang } = useLanguage();
  const [showRegister, setShowRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    category: 'jr',
    phone: '',
    line: '',
    experience: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero */}
      <section className="py-16 px-6 bg-gradient-to-b from-red-600/20 via-black to-black">
        <div className="max-w-7xl mx-auto text-center">
          {/* RUSTFEST Logo */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            <Image 
              src="/rustfest_logo.jpg" 
              alt="RUSH FEST Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
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
            <button 
              onClick={() => setShowRegister(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all uppercase tracking-widest text-sm"
            >
              📝 {lang === 'th' ? 'ลงทะเบียนแข่งขัน' : 'Register to Compete'}
            </button>
            <Link href="/shop" className="border-2 border-white hover:bg-white hover:text-black text-white font-bold py-3 px-8 rounded-full transition-all uppercase tracking-widest text-sm">
              {t.rustfest.viewShop}
            </Link>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-8 text-center">
            {lang === 'th' ? '📅 งานที่จะจัด' : '📅 Upcoming Events'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event) => (
              <div key={event.id} className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-red-600 transition-all">
                <div className="aspect-video relative overflow-hidden">
                  <Image 
                    src={event.image} 
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-red-500 font-bold text-sm">{event.cost}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                  <p className="text-gray-500 text-sm mb-3">{event.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>📅 {event.date}</span>
                    <span>📍 {event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories & Prizes */}
      <section className="py-16 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Categories */}
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight mb-6">
                🏆 {lang === 'th' ? 'รุ่นที่แข่งขัน' : 'Competition Categories'}
              </h2>
              <div className="space-y-4">
                {categories.map((cat) => (
                  <div key={cat.id} className="bg-black p-6 rounded-xl border border-gray-800 flex items-center gap-4">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0">
                      {cat.age}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{lang === 'th' ? cat.nameTh : cat.nameEn}</h3>
                      <p className="text-gray-500 text-sm">{lang === 'th' ? cat.descTh : cat.descEn}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Prizes */}
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight mb-6">
                💎 {lang === 'th' ? 'เงินรางวัล & คะแนน' : 'Prizes & Points'}
              </h2>
              <div className="space-y-3">
                {prizes.map((prize, i) => (
                  <div key={i} className={`p-4 rounded-xl flex items-center justify-between ${i === 0 ? 'bg-gradient-to-r from-yellow-600/20 to-black border border-yellow-600' : 'bg-black border border-gray-800'}`}>
                    <span className="font-bold text-lg">{prize.position}</span>
                    <div className="text-right">
                      <span className="text-red-500 font-black text-lg block">{prize.amount}</span>
                      <span className="text-gray-500 text-sm">{prize.points} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ranking Info */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-black uppercase tracking-tight mb-6 text-center">
            📊 {lang === 'th' ? 'ระบบ Ranking คะแนนสะสม' : 'Ranking Points System'}
          </h2>
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold mb-4">🎯 {lang === 'th' ? 'วิธีเก็บคะแนน' : 'How to Earn Points'}</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>+50 pts - {lang === 'th' ? 'ชนะเลิศอันดับ 1' : 'Win 1st Place'}</li>
                  <li>+30 pts - {lang === 'th' ? 'อันดับ 2' : '2nd Place'}</li>
                  <li>+20 pts - {lang === 'th' ? 'อันดับ 3' : '3rd Place'}</li>
                  <li>+10 pts - {lang === 'th' ? 'ทุกผู้เข้าแข่งขัน' : 'Every Participant'}</li>
                  <li>+5 pts - {lang === 'th' ? 'เพื่อนชวนมาแข่ง' : 'Refer a Friend'}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">🏅 {lang === 'th' ? 'สิทธิพิเศษ' : 'Special Privileges'}</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>100+ pts - {lang === 'th' ? 'สิทธิ์กิจกรรมพิเศษ' : 'Special activity access'}</li>
                  <li>200+ pts - {lang === 'th' ? 'คอร์สเรียนฟรี 1 เดือน' : 'Free 1 month course'}</li>
                  <li>500+ pts - {lang === 'th' ? 'ชุดอุปกรณ์ ฿5,000' : 'Equipment ฿5,000'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-t from-red-900/20 to-black">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-4">
            {lang === 'th' ? 'พร้อมแข่งขันหรือยัง?' : 'Ready to Compete?'}
          </h2>
          <p className="text-gray-400 mb-8">
            {lang === 'th' 
              ? 'ลงทะเบียนวันนี้ รับของที่ระลึก + คะแนน Ranking!'
              : 'Register today, get souvenirs + Ranking points!'}
          </p>
          <button 
            onClick={() => setShowRegister(true)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-12 rounded-full transition-all uppercase tracking-widest text-lg"
          >
            📝 {lang === 'th' ? 'ลงทะเบียนแข่งขัน' : 'Register to Compete'}
          </button>
        </div>
      </section>

      {/* Register Modal */}
      {showRegister && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => { setShowRegister(false); setSubmitted(false); }} />
          <div className="relative bg-gray-900 rounded-2xl w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => { setShowRegister(false); setSubmitted(false); }}
              className="absolute top-4 right-4 text-gray-500 hover:text-white text-2xl"
            >
              ✕
            </button>
            
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-black mb-2">
                  {lang === 'th' ? 'ลงทะเบียนสำเร็จ!' : 'Registration Complete!'}
                </h3>
                <p className="text-gray-400 mb-6">
                  {lang === 'th' 
                    ? 'ขอบคุณที่สมัครแข่งขัน เราจะติดต่อกลับเร็วๆ นี้'
                    : 'Thank you for registering. We will contact you soon.'}
                </p>
                <a 
                  href="https://line.me/R/ti/p/@rushfest" 
                  target="_blank"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full inline-block"
                >
                  📱 เพิ่ม LINE @rushfest
                </a>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-black uppercase tracking-tight mb-6">
                  📝 {lang === 'th' ? 'ลงทะเบียนแข่งขัน' : 'Competition Registration'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">
                      {lang === 'th' ? 'ชื่อ-นามสกุล *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                      placeholder={lang === 'th' ? 'เช่น สมชาย ใจดี' : 'e.g. Somchai Jaidee'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">
                      {lang === 'th' ? 'อายุ *' : 'Age *'}
                    </label>
                    <input
                      type="number"
                      required
                      min="6"
                      max="50"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                      placeholder={lang === 'th' ? 'เช่น 10' : 'e.g. 10'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">
                      {lang === 'th' ? 'รุ่น *' : 'Category *'}
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {lang === 'th' ? `${cat.nameTh} (${cat.age})` : `${cat.nameEn} (${cat.age})`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">
                      {lang === 'th' ? 'เบอร์โทร *' : 'Phone *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                      placeholder="088-xxx-xxxx"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">
                      LINE ID
                    </label>
                    <input
                      type="text"
                      value={formData.line}
                      onChange={(e) => setFormData({ ...formData, line: e.target.value })}
                      className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                      placeholder="@rushfest"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg mt-6"
                  >
                    ✅ {lang === 'th' ? 'ยืนยันการลงทะเบียน' : 'Confirm Registration'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
