'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { db, collection, addDoc, getDocs } from '@/lib/firebase';
import { initFirebase } from '@/lib/firebase';

const programs = [
  {
    id: 'little',
    age: '4-6 ปี',
    name: 'Little Rider',
    desc: 'เริ่มต้นเรียนรู้การทรงตัว + ความสนุก',
    features: [
      'สอนทรงตัวบนจักรยาน',
      'ฝึกเบรกอย่างปลอดภัย',
      'เกมส์และกิจกรรมสนุกๆ',
      'ฝึกในสนามที่ปลอดภัย',
    ],
    equipment: [
      { icon: '🚲', text: 'จักรยาน BMX 12-14 นิ้ว' },
      { icon: '🪖', text: 'หมวกกันน็อคมาตรฐาน' },
      { icon: '🧤', text: 'ถุงมือเด็ก' },
      { icon: '🦺', text: 'เสื้อผ้ากีฬาที่พร้อมเคลื่อนไหว' },
    ],
    price: 1500,
    popular: false,
  },
  {
    id: 'junior',
    age: '7-12 ปี',
    name: 'Junior Rider',
    desc: 'พัฒนาทักษะ + เทคนิคต่างๆ',
    features: [
      'ฝึก Bunny Hop',
      'เทคนิคการบังคับ',
      'ฝึกใน Pump Track',
      'เตรียมแข่งขัน',
    ],
    equipment: [
      { icon: '🚲', text: 'จักรยาน BMX 16-18 นิ้ว' },
      { icon: '🪖', text: 'หมวกกันน็อคมาตรฐาน' },
      { icon: '🧤', text: 'ถุงมือกีฬา' },
      { icon: '🦾', text: 'เสื่อเข่า/แขน (แนะนำ)' },
    ],
    price: 2000,
    popular: true,
  },
  {
    id: 'competitor',
    age: '13+ ปี',
    name: 'Competitor',
    desc: 'ฝึกแข่งขันระดับทีมชาติ',
    features: [
      'ฝึกแข่งขันทุกสัปดาห์',
      'เทคนิคขั้นสูง',
      'ร่วมทีม Academy',
      'เข้าร่วม RUSTFEST',
    ],
    equipment: [
      { icon: '🚲', text: 'จักรยาน BMX แข่งขัน 20 นิ้ว' },
      { icon: '🪖', text: 'หมวก Full Face' },
      { icon: '🦾', text: 'ชุดเสื่อเข่า/แขน/ข้อมือ' },
      { icon: '👕', text: 'ชุดแข่ง/ราธเสื้อ Team' },
    ],
    price: 2500,
    popular: false,
  },
];

const coaches = [
  {
    name: 'โค้ชพี่เต๋า',
    titleKey: 'headCoach' as const,
    brandKey: 'nationalTeam' as const,
    image: '/coach.jpg',
    achievements: ['อดีตนักกีฬาทีมชาติไทย', 'แชมป์ Asia Cup 5 สมัย', 'ประสบการณ์สอน 15 ปี'],
    videoId: 'W6Kn4-b2XIM',
  },
  {
    name: 'โค้ชพี่บอส',
    titleKey: 'assistant' as const,
    brandKey: 'nationalTeam' as const,
    image: '/coach_race1.jpg',
    achievements: ['แชมป์ประเทศไทย 3 สมัย', 'ประสบการณ์สอน 10 ปี', 'ผู้ก่อตั้ง The Master BMX'],
    videoId: '9B0RpT90SnQ',
  },
];

interface ScheduleItem {
  day: string;
  time: string;
  location: string;
  spots: string;
}

export default function ProgramsPage() {
  const { t, lang } = useLanguage();
  const [selectedProgram, setSelectedProgram] = useState<typeof programs[0] | null>(null);
  const [showRegister, setShowRegister] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    age: '',
    phone: '',
    line: '',
    program: '',
    schedule: '',
    note: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [scheduleData, setScheduleData] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    initFirebase();
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'schedule'));
      if (!snapshot.empty) {
        setScheduleData(snapshot.docs.map(doc => doc.data() as ScheduleItem));
      } else {
        // Default schedule
        setScheduleData([
          { day: 'จันทร์', time: '15:00-16:30', location: 'รัชดา', spots: '10' },
          { day: 'อังคาร', time: '15:00-16:30', location: 'รัชดา', spots: '10' },
          { day: 'พุธ', time: '15:00-16:30', location: 'รัชดา', spots: '10' },
          { day: 'พฤหัสบดี', time: '15:00-16:30', location: 'รัชดา', spots: '10' },
          { day: 'ศุกร์', time: '15:00-16:30', location: 'รัชดา', spots: '10' },
          { day: 'เสาร์', time: '09:00-10:30', location: 'บางแค', spots: '10' },
          { day: 'เสาร์', time: '10:30-12:00', location: 'บางแค', spots: '12' },
          { day: 'อาทิตย์', time: '09:00-10:30', location: 'บางแค', spots: '10' },
          { day: 'อาทิตย์', time: '10:30-12:00', location: 'บางแค', spots: '12' },
        ]);
      }
    } catch (error) {
      console.log('Error fetching schedule');
    }
  };

  const openRegister = (program: typeof programs[0]) => {
    setSelectedProgram(program);
    setFormData({
      ...formData,
      program: program.name,
    });
    setShowRegister(true);
    setSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'course_registrations'), {
        ...formData,
        price: selectedProgram?.price,
        createdAt: new Date().toISOString(),
        status: 'new',
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
      alert('เกิดข้อผิดพลาด');
    } finally {
      setSubmitting(false);
    }
  };

  const getProgramSchedule = (programId: string) => {
    return scheduleData.filter(s => {
      if (programId === 'little') return ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์'].includes(s.day);
      if (programId === 'junior') return ['เสาร์', 'อาทิตย์'].includes(s.day);
      if (programId === 'competitor') return ['เสาร์', 'อาทิตย์'].includes(s.day);
      return true;
    });
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero */}
      <section className="py-16 px-6 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2">{t.programs.title}</h1>
          <p className="text-gray-500 text-lg">{t.programs.subtitle}</p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((program) => (
              <div 
                key={program.id}
                className={`bg-black border ${program.popular ? 'border-red-600' : 'border-gray-800'} transition-all p-6 flex flex-col`}
              >
                {program.popular && (
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 self-start mb-3">
                    ยอดนิยม
                  </span>
                )}
                <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">{program.age}</span>
                <h3 className={`text-xl font-bold mt-2 mb-2 ${program.popular ? 'text-red-500' : ''}`}>{program.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{program.desc}</p>
                
                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {program.features.map((feature, i) => (
                    <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-green-500">✓</span> {feature}
                    </li>
                  ))}
                </ul>

                {/* Equipment */}
                <div className="border-t border-gray-800 pt-4 mb-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                    {lang === 'th' ? 'อุปกรณ์ที่ใช้' : 'Equipment Used'}
                  </p>
                  <ul className="space-y-2">
                    {program.equipment.map((item, i) => (
                      <li key={i} className="text-gray-400 text-sm flex items-center gap-2">
                        <span>{item.icon}</span> {item.text}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Register - Click to open modal */}
                <div 
                  onClick={() => openRegister(program)}
                  className="mt-auto pt-4 border-t border-gray-800 cursor-pointer hover:bg-gray-900 rounded-b-xl -mx-6 px-6 pb-6 transition-colors"
                >
                  <p className={`text-2xl font-black ${program.popular ? 'text-red-500' : ''}`}>
                    ฿{program.price.toLocaleString()}
                    <span className="text-sm font-normal text-gray-500">/{t.programs.perMonth}</span>
                  </p>
                  <div className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded mt-3 text-center transition-colors">
                    ลงทะเบียนเรียน
                  </div>
                  <p className="text-center text-gray-500 text-xs mt-2">กดเพื่อเลือกเวลาและชำระเงิน</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Note */}
      <section className="py-8 px-6 bg-gray-950 border-y border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg mb-1">{lang === 'th' ? 'มีอุปกรณ์ให้ยืมใช้ฟรี!' : 'Free Equipment Rental Available!'}</h3>
              <p className="text-gray-500 text-sm">
                {lang === 'th' 
                  ? 'นักเรียนใหม่สามารถยืมจักรยานและอุปกรณ์ได้ 1 เดือนแรก' 
                  : 'New students can rent bike and equipment for free for the first month'}
              </p>
            </div>
            <a href="https://line.me/R/ti/p/@rushfest" target="_blank" className="bg-green-600 text-white font-bold py-3 px-6 hover:bg-green-700 transition-colors whitespace-nowrap">
              {lang === 'th' ? 'สอบถามเพิ่มเติม' : 'Inquire More'}
            </a>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-12 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg font-bold mb-6 border-b border-gray-800 pb-4 uppercase tracking-tight">{t.locations.title}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Ratchada */}
            <div className="bg-gray-900 rounded-xl overflow-hidden">
              <div className="relative h-40">
                <img 
                  src="/schedule_rush.jpg" 
                  alt="สเกตปาร์ครัชดาภิเษก"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-black text-lg">สเกตปาร์ครัชดาภิเษก</h3>
                  <p className="text-gray-400 text-xs">Bangkok</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-white text-sm font-medium mb-3">จันทร์ - ศุกร์</p>
                <a 
                  href="https://maps.app.goo.gl/KvRJ8ZBi3s3DuW9X8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-2 text-sm font-bold rounded transition-colors"
                >
                  Google Maps
                </a>
              </div>
            </div>

            {/* Bang Khae */}
            <div className="bg-gray-900 rounded-xl overflow-hidden">
              <div className="relative h-40">
                <img 
                  src="/schedule_bang.jpg" 
                  alt="สเกตปาร์คบางแค"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-black text-lg">สเกตปาร์คบางแค</h3>
                  <p className="text-gray-400 text-xs">Bangkok</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-white text-sm font-medium mb-3">เสาร์ - อาทิตย์</p>
                <a 
                  href="https://maps.app.goo.gl/Xq8vX9Y7Z3bvwX7A9" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-2 text-sm font-bold rounded transition-colors"
                >
                  Google Maps
                </a>
              </div>
            </div>

            {/* Pattaya */}
            <div className="bg-gray-900 rounded-xl overflow-hidden">
              <div className="relative h-40">
                <img 
                  src="/schedule_pattaya.jpg" 
                  alt="สเกตปาร์คพัทยา"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-black text-lg">สเกตปาร์คพัทยา</h3>
                  <p className="text-gray-400 text-xs">Chonburi</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-white text-sm font-medium mb-3">ทุกวัน (Camp)</p>
                <a 
                  href="https://maps.app.goo.gl/W4Z9vA4B6Y9mXwP2" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-2 text-sm font-bold rounded transition-colors"
                >
                  Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coaches */}
      <section className="py-12 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg font-bold mb-6 border-b border-gray-800 pb-4 uppercase tracking-tight">{t.coaches.title}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {coaches.map((coach, i) => (
              <div key={i} className="bg-black border border-gray-800 p-6">
                <div className="flex gap-6">
                  <div className="w-32 h-32 flex-shrink-0">
                    <Image 
                      src={coach.image} 
                      alt={coach.name} 
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{t.coaches[coach.titleKey]}</p>
                    <h3 className="text-xl font-bold mb-1">{coach.name}</h3>
                    <p className="text-white text-sm mb-3">{t.coaches[coach.brandKey]}</p>
                    <ul className="space-y-1">
                      {coach.achievements.map((a, j) => (
                        <li key={j} className="text-gray-400 text-sm">• {a}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 aspect-video bg-gray-900 rounded overflow-hidden">
                  <iframe 
                    src={`https://www.youtube.com/embed/${coach.videoId}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-12 px-6 bg-black border-t border-gray-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-3">{t.cta.title}</h2>
          <p className="text-gray-500 mb-6">{t.cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:088-934-5146" className="bg-white text-black font-bold py-3 px-6 hover:bg-gray-200 transition-colors">
              {t.cta.call}
            </a>
            <a href="https://line.me/R/ti/p/@rushfest" target="_blank" className="bg-green-600 text-white font-bold py-3 px-6 hover:bg-green-700 transition-colors">
              LINE @rushfest
            </a>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {showRegister && selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => { setShowRegister(false); setSubmitted(false); }} />
          <div className="relative bg-gray-900 rounded-2xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => { setShowRegister(false); setSubmitted(false); }}
              className="absolute top-4 right-4 text-gray-500 hover:text-white text-2xl"
            >
              ✕
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-black mb-2">ลงทะเบียนสำเร็จ!</h3>
                <p className="text-gray-400 mb-6">
                  ขอบคุณที่สมัคร {selectedProgram.name} เราจะติดต่อกลับเร็วๆ นี้
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
                {/* Program Info */}
                <div className="bg-black rounded-xl p-4 mb-6 border border-gray-800">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs text-gray-500 uppercase">{selectedProgram.age}</span>
                      <h3 className="text-xl font-bold text-red-500">{selectedProgram.name}</h3>
                      <p className="text-gray-400 text-sm">{selectedProgram.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black">฿{selectedProgram.price.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">/เดือน</p>
                    </div>
                  </div>
                </div>

                {/* Schedule for this program */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-400 mb-3 uppercase">📅 ตารางเรียน</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {getProgramSchedule(selectedProgram.id).map((s, i) => (
                      <div key={i} className="bg-black border border-gray-800 rounded p-2 text-center">
                        <p className="text-white font-bold text-sm">{s.day}</p>
                        <p className="text-gray-500 text-xs">{s.time}</p>
                        <p className="text-gray-500 text-xs">{s.location}</p>
                        <p className="text-green-500 text-xs font-bold">ว่าง {s.spots} ที่</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coach */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-400 mb-3 uppercase">🏆 โค้ชผู้สอน</h4>
                  <div className="flex gap-4">
                    {coaches.map((coach, i) => (
                      <div key={i} className="flex items-center gap-2 bg-black border border-gray-800 rounded p-2">
                        <img src={coach.image} alt={coach.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="text-white text-sm font-bold">{coach.name}</p>
                          <p className="text-gray-500 text-xs">{t.coaches[coach.titleKey]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form */}
                <h4 className="text-lg font-bold mb-4">📝 ลงทะเบียนเรียน</h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-400 mb-2">ชื่อผู้ปกครอง *</label>
                      <input
                        type="text"
                        required
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                        placeholder="เช่น สมชาย ใจดี"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-400 mb-2">ชื่อนักเรียน *</label>
                      <input
                        type="text"
                        required
                        value={formData.studentName}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                        placeholder="เช่น สมศรี ใจดี"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-400 mb-2">อายุนักเรียน *</label>
                      <input
                        type="number"
                        required
                        min="4"
                        max="50"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                        placeholder="เช่น 8"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-400 mb-2">เบอร์โทร *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                        placeholder="088-xxx-xxxx"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">LINE ID</label>
                    <input
                      type="text"
                      value={formData.line}
                      onChange={(e) => setFormData({ ...formData, line: e.target.value })}
                      className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                      placeholder="@rushfest"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">เลือกตารางเรียน *</label>
                    <select
                      required
                      value={formData.schedule}
                      onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                      className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                    >
                      <option value="">เลือกวันและเวลา...</option>
                      {getProgramSchedule(selectedProgram.id).map((s, i) => (
                        <option key={i} value={`${s.day} ${s.time} (${s.location})`}>
                          {s.day} {s.time} - {s.location} (ว่าง {s.spots} ที่)
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">หมายเหตุ</label>
                    <textarea
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 h-20"
                      placeholder="แพ้อาหาร, ต้องการยืมจักรยาน, ฯลฯ"
                    />
                  </div>

                  {/* Payment Summary */}
                  <div className="bg-red-600/20 border border-red-600 rounded-xl p-4 mt-6">
                    <h4 className="text-sm font-bold text-red-500 mb-3 uppercase">💳 สรุปการชำระเงิน</h4>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-400">คอร์ส {selectedProgram.name}</span>
                      <span className="font-bold">฿{selectedProgram.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-700">
                      <span className="text-white font-bold">รวม</span>
                      <span className="text-xl font-black text-red-500">฿{selectedProgram.price.toLocaleString()}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-400">ช่องทางชำระเงิน:</p>
                      <div className="flex gap-2">
                        <div className="flex-1 bg-black border border-gray-700 rounded p-2 text-center">
                          <p className="text-white font-bold text-xs">PromptPay</p>
                          <p className="text-gray-500 text-xs">QR Code</p>
                        </div>
                        <div className="flex-1 bg-black border border-gray-700 rounded p-2 text-center">
                          <p className="text-white font-bold text-xs">LINE Pay</p>
                          <p className="text-gray-500 text-xs">@rushfest</p>
                        </div>
                        <div className="flex-1 bg-black border border-gray-700 rounded p-2 text-center">
                          <p className="text-white font-bold text-xs">เงินสด</p>
                          <p className="text-gray-500 text-xs">ที่สนาม</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full font-bold py-4 rounded-lg mt-6 ${
                      submitting ? 'bg-gray-600 text-gray-300' : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                  >
                    {submitting ? '⏳ กำลังบันทึก...' : '✅ ยืนยันลงทะเบียน'}
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
