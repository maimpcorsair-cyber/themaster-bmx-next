'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

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
    name: 'โค้ชพี่โจ้',
    titleKey: 'headCoach' as const,
    brandKey: 'nationalTeam' as const,
    image: '/coach.jpg',
    achievements: ['อดีตนักกีฬาทีมชาติไทย', 'แชมป์ Asia Cup 5 สมัย', 'ประสบการณ์สอน 15 ปี'],
    videoId: 'W6Kn4-b2XIM',
  },
  {
    name: 'โค้ชพี่เบียร์',
    titleKey: 'assistant' as const,
    brandKey: 'nationalTeam' as const,
    image: '/coach_race1.jpg',
    achievements: ['แชมป์ประเทศไทย 3 สมัย', 'ประสบการณ์สอน 10 ปี', 'ผู้ก่อตั้ง The Master BMX'],
    videoId: '9B0RpT90SnQ',
  },
];

export default function ProgramsPage() {
  const { t, lang } = useLanguage();

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
                className={`bg-black border ${program.popular ? 'border-red-600' : 'border-gray-800'} hover:${program.popular ? '' : 'border-white'} transition-all p-6 flex flex-col`}
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

                {/* Price */}
                <div className="mt-auto pt-4 border-t border-gray-800">
                  <p className={`text-2xl font-bold ${program.popular ? 'text-red-500' : ''}`}>
                    ฿{program.price.toLocaleString()}
                    <span className="text-sm font-normal text-gray-500">/{t.programs.perMonth}</span>
                  </p>
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
    </div>
  );
}
