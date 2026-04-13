'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'th' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: any;
}

const translations = {
  th: {
    nav: {
      home: 'หน้าแรก',
      programs: 'คอร์สเรียน',
      schedule: 'ตารางเรียน',
      rustfest: 'RUSTFEST',
      shop: 'ร้านค้า',
      about: 'เกี่ยวกับ',
      contact: 'ติดต่อ',
    },
    hero: {
      badge: 'เปิดรับสมัครแล้ว',
      title: 'ปั่น BMX ยังไงให้ได้เยผู้ชาย',
      subtitle: 'เราไม่ได้สอนขี่จักรยาน เราสอนเด็กให้เป็นนักกีฬา',
      cta: 'ลงทะเบียนเรียน',
      cta2: 'RUSTFEST',
    },
    programs: {
      title: 'คอร์สเรียน',
      subtitle: 'เลือกสายที่เหมาะกับลูกคุณ',
      little: { 
        age: '4-6 ปี', 
        name: 'Little Rider', 
        desc: 'เริ่มต้นเรียนรู้การทรงตัว + ความสนุก',
        bullet1: 'สอนทรงตัวบนจักรยาน',
        bullet2: 'ฝึกเบรกอย่างปลอดภัย',
        bullet3: 'เกมส์และกิจกรรมสนุกๆ',
        bullet4: 'ฝึกในสนามที่ปลอดภัย',
      },
      junior: { 
        age: '7-12 ปี', 
        name: 'Junior Rider', 
        desc: 'พัฒนาทักษะ + เทคนิคต่างๆ',
        bullet1: 'ฝึก Bunny Hop',
        bullet2: 'เทคนิคการบังคับ',
        bullet3: 'ฝึกใน Pump Track',
        bullet4: 'เตรียมแข่งขัน',
      },
      competitor: { 
        age: '13+ ปี', 
        name: 'Competitor', 
        desc: 'ฝึกแข่งขันระดับทีมชาติ',
        bullet1: 'ฝึกแข่งขันทุกสัปดาห์',
        bullet2: 'เทคนิคขั้นสูง',
        bullet3: 'ร่วมทีม Academy',
        bullet4: 'เข้าร่วม RUSTFEST',
      },
      detail: 'ดูรายละเอียด',
      popular: 'ยอดนิยม',
      perMonth: '/เดือน',
    },
    locations: {
      title: 'สถานที่สอน',
      rush: { name: 'สเกตปาร์ครัชดาภิเษก', city: 'กรุงเทพฯ', days: 'จันทร์ - ศุกร์' },
      bang: { name: 'สเกตปาร์คบางแค', city: 'กรุงเทพฯ', days: 'เสาร์ - อาทิตย์' },
      pattaya: { name: 'สเกตปาร์คพัทยา', city: 'ชลบุรี', days: 'Camp รายเดือน' },
    },
    cta: {
      title: 'พร้อมเริ่มต้นแล้วหรือยัง?',
      subtitle: 'รับทดลองเรียนฟรี 1 ครั้ง',
      call: 'โทร 088-934-5146',
      line: 'แอดไลน์ @rushfest',
    },
    footer: {
      rights: '© 2026 The Master BMX.',
      instagram: 'Instagram',
    },
    social: {
      instagram: '@rushfestth',
      line: '@rushfest',
    },
    shop: {
      title: 'ร้านจักรยาน',
      subtitle: 'จักรยานคุณภาพ + อุปกรณ์ความปลอดภัย',
      complete: 'COMPLETE BIKES',
      safety: 'SAFETY GEAR',
      payment: 'วิธีการชำระเงิน',
      addCart: 'เพิ่มตะกร้า',
      inStock: 'IN STOCK',
    },
    rustfest: {
      title: 'งาน BMX สุดมันส์',
      subtitle: 'แข่งขัน Mini Competition + Workshop + Fun Day ทุกเดือน',
      upcoming: 'งานที่จะจัด',
      register: 'สมัครแข่งขัน',
      viewShop: 'ดูร้านค้า',
      contact: 'สนใจร่วมงาน?',
    },
    coaches: {
      title: 'โค้ชผู้สอน',
      headCoach: 'หัวหน้าโค้ช',
      assistant: 'โค้ชผู้ช่วย',
      nationalTeam: 'ทีมชาติไทย BMX',
      profile: 'Profile Video',
      achievements: 'ผลงาน',
    },
  },
  en: {
    nav: {
      home: 'Home',
      programs: 'Programs',
      schedule: 'Schedule',
      rustfest: 'RUSTFEST',
      shop: 'Shop',
      about: 'About',
      contact: 'Contact',
    },
    hero: {
      badge: 'Now Enrolling',
      title: 'Just Ride BMX',
      subtitle: "We don't teach riding bikes. We teach kids to become athletes.",
      cta: 'Register Now',
      cta2: 'RUSTFEST',
    },
    programs: {
      title: 'Programs',
      subtitle: 'Choose the right path for your child',
      little: { 
        age: '4-6 years', 
        name: 'Little Rider', 
        desc: 'Start learning balance + fun',
        bullet1: 'Learn to balance on bike',
        bullet2: 'Safe braking techniques',
        bullet3: 'Fun games & activities',
        bullet4: 'Train in safe environment',
      },
      junior: { 
        age: '7-12 years', 
        name: 'Junior Rider', 
        desc: 'Develop skills + techniques',
        bullet1: 'Practice Bunny Hop',
        bullet2: 'Control techniques',
        bullet3: 'Pump Track training',
        bullet4: 'Competition preparation',
      },
      competitor: { 
        age: '13+ years', 
        name: 'Competitor', 
        desc: 'Train for national competition',
        bullet1: 'Weekly competition training',
        bullet2: 'Advanced techniques',
        bullet3: 'Join Academy team',
        bullet4: 'Participate in RUSTFEST',
      },
      detail: 'View Details',
      popular: 'POPULAR',
      perMonth: '/month',
    },
    locations: {
      title: 'Training Locations',
      rush: { name: 'Ratchada Skate Park', city: 'Bangkok', days: 'Mon - Fri' },
      bang: { name: 'Bang Khae Skate Park', city: 'Bangkok', days: 'Sat - Sun' },
      pattaya: { name: 'Pattaya Skate Park', city: 'Chonburi', days: 'Monthly Camp' },
    },
    cta: {
      title: 'Ready to Start?',
      subtitle: 'Free trial class 1 session',
      call: 'Call 088-934-5146',
      line: 'Line @rushfest',
    },
    footer: {
      rights: '© 2026 The Master BMX.',
      instagram: 'Instagram',
    },
    social: {
      instagram: '@rushfestth',
      line: '@rushfest',
    },
    shop: {
      title: 'Bike Shop',
      subtitle: 'Quality Bikes + Safety Gear',
      complete: 'COMPLETE BIKES',
      safety: 'SAFETY GEAR',
      payment: 'Payment Methods',
      addCart: 'Add to Cart',
      inStock: 'IN STOCK',
    },
    rustfest: {
      title: 'BMX Festival',
      subtitle: 'Mini Competition + Workshop + Fun Day every month',
      upcoming: 'Upcoming Events',
      register: 'Register Now',
      viewShop: 'View Shop',
      contact: 'Interested?',
    },
    coaches: {
      title: 'Coaches',
      headCoach: 'Head Coach',
      assistant: 'Assistant Coach',
      nationalTeam: 'Thailand National BMX Team',
      profile: 'Profile Video',
      achievements: 'Achievements',
    },
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('th');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Language;
    if (saved) setLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
