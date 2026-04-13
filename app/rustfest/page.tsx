'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const categories = [
  { id: 'mini', nameTh: 'รุ่น Mini', nameEn: 'Mini', age: '6-8 ปี', descTh: 'สำหรับเด็กเล็ก', descEn: 'For young kids' },
  { id: 'jr', nameTh: 'รุ่น Junior', nameEn: 'Junior', age: '9-12 ปี', descTh: 'สำหรับเด็กโต', descEn: 'For older kids' },
  { id: 'open', nameTh: 'รุ่น Open', nameEn: 'Open', age: '13+ ปี', descTh: 'เปิดทุกวัย', descEn: 'All ages' },
];

const rules = [
  { icon: '🏁', titleTh: 'Time Trial', descTh: 'แข่งขันจับเวลา 1 รอบ ดีที่สุด', titleEn: 'Time Trial', descEn: 'Best time in 1 lap' },
  { icon: '🛝', titleTh: 'Pump Track', descTh: 'แข่งขันผ่านชุดสิ่งกีดขวาง', titleEn: 'Pump Track', descEn: 'Race through obstacles' },
  { icon: '👨‍⚖️', titleTh: 'สไตล์', descTh: 'ผู้ตัดสินให้คะแนนจากการแสดง', titleEn: 'Style', descEn: 'Judges score performance' },
  { icon: '🏆', titleTh: 'คะแนน', descTh: 'รวมคะแนนจากทุกรายการ', titleEn: 'Points', descEn: 'Points from all events' },
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
    // In real app, send to Firebase or backend
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero */}
      <section className="py-24 px-6 bg-gradient-to-b from-red-600/20 via-black to-black">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">
            RUSTFEST 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
            {lang === 'th' ? 'งานแข่งขัน BMX' : 'BMX Competition'}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            {lang === 'th' 
              ? 'สมัครแข่งขัน BMX ในงาน RUSTFEST รับของที่ระลึก + คะแนน Ranking'
              : 'Register for BMX competition at RUSTFEST, get souvenirs + Ranking points'}
          </p>
          <button 
            onClick={() => setShowRegister(true)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all uppercase tracking-widest text-sm"
          >
            {lang === 'th' ? '📝 ลงทะเบียนแข่งขัน' : '📝 Register to Compete'}
          </button>
        </div>
      </section>

      {/* Event Info */}
      <section className="py-16 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black p-8 rounded-xl border border-gray-800 text-center">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-bold mb-2">{lang === 'th' ? 'วันที่' : 'Date'}</h3>
              <p className="text-gray-400">{lang === 'th' ? 'ทุกเดือน' : 'Every month'}</p>
              <p className="text-red-500 font-bold">{lang === 'th' ? 'เสาร์-อาทิตย์' : 'Sat-Sun'}</p>
            </div>
            <div className="bg-black p-8 rounded-xl border border-gray-800 text-center">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-bold mb-2">{lang === 'th' ? 'สถานที่' : 'Location'}</h3>
              <p className="text-gray-400">{lang === 'th' ? 'สเกตปาร์ครัชดาภิเษก' : 'Ratchada Skate Park'}</p>
              <p className="text-red-500 font-bold">The Master BMX</p>
            </div>
            <div className="bg-black p-8 rounded-xl border border-gray-800 text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">{lang === 'th' ? 'ค่าสมัคร' : 'Entry Fee'}</h3>
              <p className="text-gray-400">{lang === 'th' ? 'ราคาพิเศษ' : 'Special Price'}</p>
              <p className="text-red-500 font-bold text-2xl">฿200</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-8 text-center">
            {lang === 'th' ? '🏆 รุ่นที่แข่งขัน' : '🏆 Competition Categories'}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-gray-900 border border-gray-800 p-8 rounded-xl text-center hover:border-red-600 transition-colors">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4">
                  {cat.age}
                </div>
                <h3 className="text-xl font-bold mb-2">{lang === 'th' ? cat.nameTh : cat.nameEn}</h3>
                <p className="text-gray-500 text-sm">{lang === 'th' ? cat.descTh : cat.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="py-16 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-8 text-center">
            {lang === 'th' ? '📋 กติกาการแข่งขัน' : '📋 Competition Rules'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rules.map((rule, i) => (
              <div key={i} className="bg-black p-6 rounded-xl border border-gray-800">
                <div className="text-3xl mb-3">{rule.icon}</div>
                <h3 className="font-bold text-lg mb-1">{lang === 'th' ? rule.titleTh : rule.titleEn}</h3>
                <p className="text-gray-500 text-sm">{lang === 'th' ? rule.descTh : rule.descEn}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-black/50 p-6 rounded-xl border border-gray-800">
            <h4 className="font-bold mb-3">{lang === 'th' ? '⚠️ ข้อกำหนด' : '⚠️ Requirements'}</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>• {lang === 'th' ? 'ต้องมีหมวกกันน็อค (มีให้ยืม)' : 'Must have helmet (available to borrow)'}</li>
              <li>• {lang === 'th' ? 'ต้องมีถุงมือ (มีให้ยืม)' : 'Must have gloves (available to borrow)'}</li>
              <li>• {lang === 'th' ? 'เสื้อผ้ากีฬาที่สะดวก' : 'Wear comfortable sports clothes'}</li>
              <li>• {lang === 'th' ? 'พร้อมแข่ง 15 นาทีก่อนเริ่ม' : 'Ready to compete 15 min before start'}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-8 text-center">
            {lang === 'th' ? '💎 เงินรางวัล & คะแนน' : '💎 Prizes & Points'}
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {prizes.map((prize, i) => (
              <div key={i} className={`p-6 rounded-xl text-center ${i === 0 ? 'bg-gradient-to-b from-yellow-600/20 to-black border border-yellow-600' : 'bg-gray-900 border border-gray-800'}`}>
                <div className="text-2xl font-black mb-2">{prize.position}</div>
                <div className="text-2xl font-bold text-red-500 mb-1">{prize.amount}</div>
                <div className="text-gray-500 text-sm">{prize.points} {lang === 'th' ? 'คะแนน' : 'pts'}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ranking */}
      <section className="py-16 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-8 text-center">
            {lang === 'th' ? '📊 Ranking คะแนนสะสม' : '📊 Ranking Points System'}
          </h2>
          <div className="bg-black p-8 rounded-xl border border-gray-800">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">{lang === 'th' ? '🎯 วิธีเก็บคะแนน' : '🎯 How to Earn Points'}</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-3">
                    <span className="text-red-500 font-bold">+50</span>
                    {lang === 'th' ? 'ชนะเลิศอันดับ 1' : 'Win 1st Place'}
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-red-500 font-bold">+30</span>
                    {lang === 'th' ? 'อันดับ 2' : '2nd Place'}
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-red-500 font-bold">+20</span>
                    {lang === 'th' ? 'อันดับ 3' : '3rd Place'}
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-red-500 font-bold">+10</span>
                    {lang === 'th' ? 'ทุกผู้เข้าแข่งขัน' : 'Every Participant'}
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-red-500 font-bold">+5</span>
                    {lang === 'th' ? 'เพื่อนชวนมาแข่ง' : 'Refer a Friend'}
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">{lang === 'th' ? '🏅 สิทธิพิเศษ' : '🏅 Special Privileges'}</h3>
                <ul className="space-y-3 text-gray-400">
                  <li>• {lang === 'th' ? 'คะแนนสะสม 100+ = สิทธิ์กิจกรรมพิเศษ' : '100+ pts = Special activity access'}</li>
                  <li>• {lang === 'th' ? 'คะแนนสะสม 200+ = คอร์สเรียนฟรี 1 เดือน' : '200+ pts = Free 1 month course'}</li>
                  <li>• {lang === 'th' ? 'คะแนนสะสม 500+ = ชุดอุปกรณ์มูลค่า 5,000 บาท' : '500+ pts = Equipment set worth 5,000 baht'}</li>
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
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">
                      {lang === 'th' ? 'ประสบการณ์' : 'Experience'}
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                    >
                      <option value="">{lang === 'th' ? 'เลือก...' : 'Select...'}</option>
                      <option value="beginner">{lang === 'th' ? 'มือใหม่' : 'Beginner'}</option>
                      <option value="intermediate">{lang === 'th' ? 'พอมีประสบการณ์' : 'Intermediate'}</option>
                      <option value="advanced">{lang === 'th' ? 'แข่งมาก่อน' : 'Advanced'}</option>
                    </select>
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
