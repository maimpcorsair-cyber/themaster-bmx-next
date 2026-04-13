'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutPage() {
  const { t, lang } = useLanguage();

  const timeline = lang === 'th' ? [
    { year: '2018', event: 'ก่อตั้ง The Master BMX โดย โค้ชพี่เบียร์' },
    { year: '2019', event: 'เปิดสอนคอร์สแรกที่สเกตปาร์ครัชดาภิเษก' },
    { year: '2020', event: 'นักเรียนได้แชมป์ระดับประเทศครั้งแรก' },
    { year: '2021', event: 'ขยายสาขาสู่พัทยา' },
    { year: '2022', event: 'จัดตั้งทีม Academy เพื่อฝึกนักกีฬาขั้นสูง' },
    { year: '2023', event: 'เปิดตัว RUSTFEST - งานแข่งขันเด็กระดับภูมิภาค' },
    { year: '2024', event: 'นักเรียนตัวแทนทีมชาติไทยในรายการ Asia Cup' },
    { year: '2025', event: 'เปิดคอร์สออนไลน์และ Workshop ทั่วประเทศ' },
    { year: '2026', event: 'พร้อมสอนรุ่นใหม่และเตรียมนักกีฬาสู่โอลิมปิก!' },
  ] : [
    { year: '2018', event: 'Founded The Master BMX by Coach Beer' },
    { year: '2019', event: 'Opened first classes at Ratchada Skate Park' },
    { year: '2020', event: 'First student became national champion' },
    { year: '2021', event: 'Expanded to Pattaya branch' },
    { year: '2022', event: 'Established Academy team for advanced training' },
    { year: '2023', event: 'Launched RUSTFEST - Regional kids competition' },
    { year: '2024', event: 'Students represented Thailand in Asia Cup' },
    { year: '2025', event: 'Launched online courses and nationwide Workshops' },
    { year: '2026', event: 'Ready to train new generation and prepare athletes for Olympics!' },
  ];

  const values = lang === 'th' ? [
    { title: 'ความปลอดภัย', desc: 'สนามฝึกมาตรฐาน อุปกรณ์ครบ โค้ชที่ได้รับการฝึกอบรม', icon: '🛡️' },
    { title: 'ความสนุก', desc: 'เรียนรู้ผ่านเกมและกิจกรรมที่เด็กๆ ชอบ', icon: '🎮' },
    { title: 'พัฒนา', desc: 'เติบโตอย่างเป็นระบบ จากพื้นฐานสู่การแข่งขัน', icon: '📈' },
    { title: 'ทัศนคติ', desc: 'สอนนักกีฬาให้มีวินัย ความมุ่งมั่น และเคารพ', icon: '💪' },
  ] : [
    { title: 'Safety', desc: 'Standard training ground, complete equipment, trained coaches', icon: '🛡️' },
    { title: 'Fun', desc: 'Learn through games and activities kids love', icon: '🎮' },
    { title: 'Development', desc: 'Systematic growth from basics to competition', icon: '📈' },
    { title: 'Attitude', desc: 'Teach athletes discipline, determination, and respect', icon: '💪' },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero with Video Background */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <iframe 
            className="absolute top-1/2 left-1/2 w-[177.77vh] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
            src="https://www.youtube.com/embed/W6Kn4-b2XIM?autoplay=1&mute=1&loop=1&playlist=W6Kn4-b2XIM&controls=0&showinfo=0&modestbranding=1&iv_load_policy=3&disablekb=1&start=0&end=79"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6">
            {lang === 'th' ? 'เกี่ยวกับเรา' : 'About Us'}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {lang === 'th' 
              ? 'The Master BMX ก่อตั้งขึ้นเพื่อสร้างนักกีฬา BMX รุ่นใหม่ที่มีคุณภาพ เราไม่ได้สอนขี่จักรยาน เราสอนเด็กให้เป็นนักกีฬาตัวจริง'
              : 'The Master BMX was founded to create quality young BMX athletes. We do not teach riding bikes, we teach kids to become real athletes.'}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-8">
            {lang === 'th' ? 'เรื่องราวของเรา' : 'Our Story'}
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {lang === 'th' 
                ? 'เราเริ่มต้นจากความรักในกีฬา BMX และความต้องการเห็นเด็กไทยได้มีโอกาสเรียนรู้อย่างถูกต้องจากโค้ชที่มีประสบการณ์ ด้วยความมุ่งมั่นที่จะสร้างมาตรฐานการสอน BMX ที่ดีที่สุดในประเทศไทย เราจึงก่อตั้ง The Master BMX ขึ้นมา'
                : 'We started from a love for BMX sport and the desire to see Thai kids have the opportunity to learn correctly from experienced coaches. With determination to create the best BMX teaching standards in Thailand, we founded The Master BMX.'}
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              {lang === 'th' 
                ? 'ปัจจุบันเรามีนักเรียนกว่า 200 คน โค้ชจากทีมชาติ 3 คน และได้ส่งนักกีฬาตัวแทนประเทศไทยในรายการระดับเอเชียหลายรายการ'
                : 'Currently we have over 200 students, 3 coaches from the national team, and have sent athletes representing Thailand in several international Asian competitions.'}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-red-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl md:text-6xl font-black mb-2">200+</div>
              <div className="text-sm uppercase tracking-wider opacity-90">
                {lang === 'th' ? 'นักเรียน' : 'Students'}
              </div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-black mb-2">3</div>
              <div className="text-sm uppercase tracking-wider opacity-90">
                {lang === 'th' ? 'โค้ชทีมชาติ' : 'National Coaches'}
              </div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-black mb-2">3</div>
              <div className="text-sm uppercase tracking-wider opacity-90">
                {lang === 'th' ? 'สถานที่ฝึก' : 'Locations'}
              </div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-black mb-2">15+</div>
              <div className="text-sm uppercase tracking-wider opacity-90">
                {lang === 'th' ? 'แชมป์' : 'Championships'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-12 text-center">
            {lang === 'th' ? 'ค่านิยมของเรา' : 'Our Values'}
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div key={i} className="bg-black border border-gray-800 p-8 text-center hover:border-red-600 transition-colors">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-500">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-12 text-center">
            {lang === 'th' ? 'ไทม์ไลน์ความสำเร็จ' : 'Success Timeline'}
          </h2>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-6 items-start relative">
                <div className="w-24 flex-shrink-0 text-right">
                  <span className="text-red-500 font-black text-xl">{item.year}</span>
                </div>
                <div className="flex-1 relative">
                  <div className="absolute left-0 top-3 w-3 h-3 bg-red-600 rounded-full transform -translate-x-1/2" />
                  <div className="border-l-2 border-gray-800 ml-[-1px] pl-8 pb-8">
                    <p className="text-gray-300 text-lg">{item.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coaches Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-12 text-center">
            {lang === 'th' ? 'โค้ชผู้สอน' : 'Our Coaches'}
          </h2>
          
          {/* Coach 1 - Head Coach */}
          <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
            <div className="w-64 h-64 flex-shrink-0">
              <img 
                src="/coach_jo.jpg" 
                alt="Coach P'Jo - Head Coach" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-red-500 text-sm font-bold uppercase tracking-wider mb-1">หัวหน้าโค้ช</p>
              <h3 className="text-3xl font-black text-white mb-2">โค้ชพี่โจ้</h3>
              <p className="text-lg text-gray-400 mb-4">ทีมชาติไทย BMX</p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <span className="text-red-500">✓</span>
                  {lang === 'th' ? 'อดีตนักกีฬาทีมชาติไทย' : 'Former Thai National Team Athlete'}
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <span className="text-red-500">✓</span>
                  {lang === 'th' ? 'แชมป์ Asia Cup 5 สมัย' : '5-Time Asia Cup Champion'}
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <span className="text-red-500">✓</span>
                  {lang === 'th' ? 'ประสบการณ์สอน 15 ปี' : '15 Years Teaching Experience'}
                </li>
              </ul>
            </div>
          </div>
          
          {/* Coach 2 - Assistant Coach */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="w-64 h-64 flex-shrink-0">
              <img 
                src="/coach_2.jpg" 
                alt="Coach P'Beer - Assistant Coach" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-red-500 text-sm font-bold uppercase tracking-wider mb-1">โค้ชผู้ช่วย</p>
              <h3 className="text-3xl font-black text-white mb-2">โค้ชพี่เบียร์</h3>
              <p className="text-lg text-gray-400 mb-4">ทีมชาติไทย BMX</p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <span className="text-red-500">✓</span>
                  {lang === 'th' ? 'แชมป์ประเทศไทย 3 สมัย' : '3-Time Thailand Champion'}
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <span className="text-red-500">✓</span>
                  {lang === 'th' ? 'ประสบการณ์สอน 10 ปี' : '10 Years Teaching Experience'}
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <span className="text-red-500">✓</span>
                  {lang === 'th' ? 'ผู้ก่อตั้ง The Master BMX' : 'Founder of The Master BMX'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-t from-gray-900 to-black">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6">
            {lang === 'th' ? 'พร้อมเป็นนักกีฬาตัวจริง?' : 'Ready to Become Real Athletes?'}
          </h2>
          <p className="text-gray-500 mb-8 text-lg">
            {lang === 'th' 
              ? 'ให้เราเป็นส่วนหนึ่งในเส้นทาง BMX ของคุณ' 
              : 'Let us be part of your BMX journey'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:088-934-5146" className="bg-white text-black font-bold py-4 px-8 hover:bg-gray-200 transition-colors">
              088-934-5146
            </a>
            <a href="https://line.me/R/ti/p/@rushfest" target="_blank" className="bg-green-600 text-white font-bold py-4 px-8 hover:bg-green-700 transition-colors">
              LINE @rushfest
            </a>
            <a href="https://www.instagram.com/rushfestth" target="_blank" className="bg-gray-800 text-white font-bold py-4 px-8 hover:bg-gray-700 transition-colors">
              IG @rushfestth
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
