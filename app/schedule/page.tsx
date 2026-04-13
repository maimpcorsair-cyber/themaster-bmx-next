'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';

const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1WTgY5t1d0awDU1l9D5c1u9kKtvdxnLxbJDSHDWHD-4I/export?format=csv';

const defaultScheduleData = {
  th: {
    rush: {
      name: 'สเกตปาร์ครัชดาภิเษก',
      address: 'ซอยลาดพร้าว 71 แขวงลาดพร้าว เขตลาดพร้าว กรุงเทพฯ',
      mapUrl: 'https://maps.app.goo.gl/KvRJ8ZBi3s3DuW9X8',
      image: '/schedule_rush.jpg',
      sessions: [
        { day: 'จันทร์', time: '16:00 - 17:30', program: 'Little Rider', spots: 8 },
        { day: 'อังคาร', time: '16:00 - 17:30', program: 'Junior Rider', spots: 10 },
        { day: 'พุธ', time: '16:00 - 17:30', program: 'Little Rider', spots: 6 },
        { day: 'พฤหัสบดี', time: '16:00 - 17:30', program: 'Competitor', spots: 8 },
        { day: 'ศุกร์', time: '16:00 - 17:30', program: 'Junior Rider', spots: 10 },
      ],
    },
    bang: {
      name: 'สเกตปาร์คบางแค',
      address: 'ถนนบางแค แขวงบางแค เขตบางแค กรุงเทพฯ',
      mapUrl: 'https://maps.app.goo.gl/Xq8vX9Y7Z3bvwX7A9',
      image: '/schedule_bang.jpg',
      sessions: [
        { day: 'เสาร์', time: '09:00 - 10:30', program: 'Little Rider', spots: 8 },
        { day: 'เสาร์', time: '11:00 - 12:30', program: 'Junior Rider', spots: 10 },
        { day: 'เสาร์', time: '14:00 - 15:30', program: 'Competitor', spots: 8 },
        { day: 'อาทิตย์', time: '09:00 - 10:30', program: 'Little Rider', spots: 6 },
        { day: 'อาทิตย์', time: '11:00 - 12:30', program: 'Junior Rider', spots: 10 },
      ],
    },
    pattaya: {
      name: 'สเกตปาร์คพัทยา',
      address: 'พัทยา จ.ชลบุรี',
      mapUrl: 'https://maps.app.goo.gl/W4Z9vA4B6Y9mXwP2',
      image: '/schedule_pattaya.jpg',
      sessions: [
        { day: 'ทุกวัน', time: '09:00 - 12:00', program: 'Camp', spots: 15 },
      ],
    },
  },
  en: {
    rush: {
      name: 'Ratchada Skate Park',
      address: 'Soi Ladprao 71, Lat Phrao, Bangkok',
      mapUrl: 'https://maps.app.goo.gl/KvRJ8ZBi3s3DuW9X8',
      image: '/schedule_rush.jpg',
      sessions: [
        { day: 'Monday', time: '16:00 - 17:30', program: 'Little Rider', spots: 8 },
        { day: 'Tuesday', time: '16:00 - 17:30', program: 'Junior Rider', spots: 10 },
        { day: 'Wednesday', time: '16:00 - 17:30', program: 'Little Rider', spots: 6 },
        { day: 'Thursday', time: '16:00 - 17:30', program: 'Competitor', spots: 8 },
        { day: 'Friday', time: '16:00 - 17:30', program: 'Junior Rider', spots: 10 },
      ],
    },
    bang: {
      name: 'Bang Khae Skate Park',
      address: 'Bang Khae, Bangkok',
      mapUrl: 'https://maps.app.goo.gl/Xq8vX9Y7Z3bvwX7A9',
      image: '/schedule_bang.jpg',
      sessions: [
        { day: 'Saturday', time: '09:00 - 10:30', program: 'Little Rider', spots: 8 },
        { day: 'Saturday', time: '11:00 - 12:30', program: 'Junior Rider', spots: 10 },
        { day: 'Saturday', time: '14:00 - 15:30', program: 'Competitor', spots: 8 },
        { day: 'Sunday', time: '09:00 - 10:30', program: 'Little Rider', spots: 6 },
        { day: 'Sunday', time: '11:00 - 12:30', program: 'Junior Rider', spots: 10 },
      ],
    },
    pattaya: {
      name: 'Pattaya Skate Park',
      address: 'Pattaya, Chonburi',
      mapUrl: 'https://maps.app.goo.gl/W4Z9vA4B6Y9mXwP2',
      image: '/schedule_pattaya.jpg',
      sessions: [
        { day: 'Daily', time: '09:00 - 12:00', program: 'Camp', spots: 15 },
      ],
    },
  },
};

const programColors: { [key: string]: string } = {
  'Little Rider': 'bg-blue-600',
  'Junior Rider': 'bg-green-600',
  'Competitor': 'bg-red-600',
  'Camp': 'bg-purple-600',
};

interface Session {
  day: string;
  time: string;
  program: string;
  spots: number;
}

interface LocationData {
  name: string;
  address: string;
  mapUrl: string;
  image: string;
  sessions: Session[];
}

export default function SchedulePage() {
  const { t, lang } = useLanguage();
  const [scheduleData, setScheduleData] = useState(defaultScheduleData);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GOOGLE_SHEET_URL);
        const csvText = await response.text();
        
        // Parse CSV
        const lines = csvText.split('\n').filter(line => line.trim());
        
        if (lines.length > 1) {
          // Skip header row, parse data
          const rushSessions: Session[] = [];
          const bangSessions: Session[] = [];
          const pattayaSessions: Session[] = [];
          
          let rushName = defaultScheduleData.th.rush.name;
          let rushAddress = defaultScheduleData.th.rush.address;
          let rushMapUrl = defaultScheduleData.th.rush.mapUrl;
          
          let bangName = defaultScheduleData.th.bang.name;
          let bangAddress = defaultScheduleData.th.bang.address;
          let bangMapUrl = defaultScheduleData.th.bang.mapUrl;
          
          let pattayaName = defaultScheduleData.th.pattaya.name;
          let pattayaAddress = defaultScheduleData.th.pattaya.address;
          let pattayaMapUrl = defaultScheduleData.th.pattaya.mapUrl;
          
          for (let i = 1; i < lines.length; i++) {
            const cols = lines[i].split(',').map(col => col.trim().replace(/"/g, ''));
            
            if (cols.length >= 4) {
              const day = cols[0];
              const time = cols[1];
              const program = cols[2];
              const spots = parseInt(cols[3]) || 0;
              const location = cols[4]?.toLowerCase() || 'rush';
              
              const session = { day, time, program, spots };
              
              if (location.includes('bang') || location.includes('บางแค')) {
                bangSessions.push(session);
              } else if (location.includes('pattaya') || location.includes('พัทยา')) {
                pattayaSessions.push(session);
              } else {
                rushSessions.push(session);
              }
            }
          }
          
          // Build new data object
          const newData = {
            th: {
              rush: {
                name: rushName,
                address: rushAddress,
                mapUrl: rushMapUrl,
                image: defaultScheduleData.th.rush.image,
                sessions: rushSessions.length > 0 ? rushSessions : defaultScheduleData.th.rush.sessions,
              },
              bang: {
                name: bangName,
                address: bangAddress,
                mapUrl: bangMapUrl,
                image: defaultScheduleData.th.bang.image,
                sessions: bangSessions.length > 0 ? bangSessions : defaultScheduleData.th.bang.sessions,
              },
              pattaya: {
                name: pattayaName,
                address: pattayaAddress,
                mapUrl: pattayaMapUrl,
                image: defaultScheduleData.th.pattaya.image,
                sessions: pattayaSessions.length > 0 ? pattayaSessions : defaultScheduleData.th.pattaya.sessions,
              },
            },
            en: {
              rush: {
                ...defaultScheduleData.en.rush,
                sessions: rushSessions.length > 0 ? rushSessions.map(s => ({
                  ...s,
                  day: translateDayToEnglish(s.day),
                })) : defaultScheduleData.en.rush.sessions,
              },
              bang: {
                ...defaultScheduleData.en.bang,
                sessions: bangSessions.length > 0 ? bangSessions.map(s => ({
                  ...s,
                  day: translateDayToEnglish(s.day),
                })) : defaultScheduleData.en.bang.sessions,
              },
              pattaya: {
                ...defaultScheduleData.en.pattaya,
                sessions: pattayaSessions.length > 0 ? pattayaSessions.map(s => ({
                  ...s,
                  day: translateDayToEnglish(s.day),
                })) : defaultScheduleData.en.pattaya.sessions,
              },
            },
          };
          
          setScheduleData(newData);
          setLastUpdated(new Date().toLocaleTimeString('th-TH'));
        }
      } catch (error) {
        console.log('Failed to fetch from Google Sheets, using default data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    // Refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const translateDayToEnglish = (day: string): string => {
    const map: { [key: string]: string } = {
      'จันทร์': 'Monday',
      'อังคาร': 'Tuesday',
      'พุธ': 'Wednesday',
      'พฤหัสบดี': 'Thursday',
      'ศุกร์': 'Friday',
      'เสาร์': 'Saturday',
      'อาทิตย์': 'Sunday',
      'ทุกวัน': 'Daily',
    };
    return map[day] || day;
  };

  const data = scheduleData[lang];

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero */}
      <section className="py-16 px-6 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2">
            {lang === 'th' ? 'ตารางเรียน' : 'Class Schedule'}
          </h1>
          <p className="text-gray-500 text-lg">
            {lang === 'th' 
              ? 'เลือกเวลาและสถานที่ที่สะดวก' 
              : 'Choose your convenient time and location'}
          </p>
          {lastUpdated && (
            <p className="text-gray-600 text-xs mt-2">
              {lang === 'th' ? 'อัพเดทล่าสุด' : 'Last updated'}: {lastUpdated}
            </p>
          )}
        </div>
      </section>

      {/* Loading */}
      {loading && (
        <div className="py-8 px-6 text-center">
          <p className="text-gray-500">กำลังโหลดข้อมูล...</p>
        </div>
      )}

      {/* Schedule by Location */}
      {!loading && (
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto space-y-16">
            
            {/* Ratchada */}
            <div>
              <div className="mb-6 bg-gray-900 rounded-xl overflow-hidden">
                <div className="relative h-48 md:h-64">
                  <img 
                    src={data.rush.image} 
                    alt={data.rush.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-1">{data.rush.name}</h2>
                    <p className="text-gray-400 text-sm">{data.rush.address}</p>
                  </div>
                </div>
                <div className="p-4 flex gap-3">
                  <a 
                    href={data.rush.mapUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 bg-red-600 text-white px-4 py-3 text-sm font-bold uppercase tracking-wider hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    Google Maps
                  </a>
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(data.rush.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white text-black px-4 py-3 text-sm font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z"/>
                    </svg>
                    {lang === 'th' ? 'นำทาง' : 'Navigate'}
                  </a>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                        {lang === 'th' ? 'วัน' : 'Day'}
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                        {lang === 'th' ? 'เวลา' : 'Time'}
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                        {lang === 'th' ? 'โปรแกรม' : 'Program'}
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                        {lang === 'th' ? 'ที่ว่าง' : 'Spots'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.rush.sessions.map((session, i) => (
                      <tr key={i} className="border-b border-gray-800 hover:bg-gray-900 transition-colors">
                        <td className="py-4 px-4 font-bold">{session.day}</td>
                        <td className="py-4 px-4 text-gray-400">{session.time}</td>
                        <td className="py-4 px-4">
                          <span className={`${programColors[session.program] || 'bg-gray-600'} px-3 py-1 text-xs font-bold uppercase`}>
                            {session.program}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={session.spots > 5 ? 'text-green-500' : session.spots > 2 ? 'text-yellow-500' : 'text-red-500'}>
                            {session.spots} {lang === 'th' ? 'ที่' : 'spots'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bang Khae */}
            <div>
              <div className="mb-6 bg-gray-900 rounded-xl overflow-hidden">
                <div className="relative h-48 md:h-64">
                  <img 
                    src={data.bang.image} 
                    alt={data.bang.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-1">{data.bang.name}</h2>
                    <p className="text-gray-400 text-sm">{data.bang.address}</p>
                  </div>
                </div>
                <div className="p-4 flex gap-3">
                  <a 
                    href={data.bang.mapUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 bg-red-600 text-white px-4 py-3 text-sm font-bold uppercase tracking-wider hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    Google Maps
                  </a>
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(data.bang.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white text-black px-4 py-3 text-sm font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z"/>
                    </svg>
                    {lang === 'th' ? 'นำทาง' : 'Navigate'}
                  </a>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                        {lang === 'th' ? 'วัน' : 'Day'}
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                        {lang === 'th' ? 'เวลา' : 'Time'}
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                        {lang === 'th' ? 'โปรแกรม' : 'Program'}
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                        {lang === 'th' ? 'ที่ว่าง' : 'Spots'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.bang.sessions.map((session, i) => (
                      <tr key={i} className="border-b border-gray-800 hover:bg-gray-900 transition-colors">
                        <td className="py-4 px-4 font-bold">{session.day}</td>
                        <td className="py-4 px-4 text-gray-400">{session.time}</td>
                        <td className="py-4 px-4">
                          <span className={`${programColors[session.program] || 'bg-gray-600'} px-3 py-1 text-xs font-bold uppercase`}>
                            {session.program}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={session.spots > 5 ? 'text-green-500' : session.spots > 2 ? 'text-yellow-500' : 'text-red-500'}>
                            {session.spots} {lang === 'th' ? 'ที่' : 'spots'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pattaya */}
            <div>
              <div className="mb-6 bg-gray-900 rounded-xl overflow-hidden">
                <div className="relative h-48 md:h-64">
                  <img 
                    src={data.pattaya.image} 
                    alt={data.pattaya.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-1">{data.pattaya.name}</h2>
                    <p className="text-gray-400 text-sm">{data.pattaya.address}</p>
                  </div>
                </div>
                <div className="p-4 flex gap-3">
                  <a 
                    href={data.pattaya.mapUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 bg-red-600 text-white px-4 py-3 text-sm font-bold uppercase tracking-wider hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    Google Maps
                  </a>
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(data.pattaya.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white text-black px-4 py-3 text-sm font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z"/>
                    </svg>
                    {lang === 'th' ? 'นำทาง' : 'Navigate'}
                  </a>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                        {lang === 'th' ? 'วัน' : 'Day'}
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                        {lang === 'th' ? 'เวลา' : 'Time'}
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                        {lang === 'th' ? 'โปรแกรม' : 'Program'}
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                        {lang === 'th' ? 'ที่ว่าง' : 'Spots'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.pattaya.sessions.map((session, i) => (
                      <tr key={i} className="border-b border-gray-800 hover:bg-gray-900 transition-colors">
                        <td className="py-4 px-4 font-bold">{session.day}</td>
                        <td className="py-4 px-4 text-gray-400">{session.time}</td>
                        <td className="py-4 px-4">
                          <span className={`${programColors[session.program] || 'bg-gray-600'} px-3 py-1 text-xs font-bold uppercase`}>
                            {session.program}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={session.spots > 5 ? 'text-green-500' : session.spots > 2 ? 'text-yellow-500' : 'text-red-500'}>
                            {session.spots} {lang === 'th' ? 'ที่' : 'spots'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Program Legend */}
      <section className="py-12 px-6 bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg font-bold mb-6 uppercase tracking-tight">
            {lang === 'th' ? 'ประเภทโปรแกรม' : 'Program Types'}
          </h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-blue-600"></span>
              <span className="text-sm">Little Rider (4-6 ปี)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-green-600"></span>
              <span className="text-sm">Junior Rider (7-12 ปี)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-red-600"></span>
              <span className="text-sm">Competitor (13+ ปี)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-purple-600"></span>
              <span className="text-sm">{lang === 'th' ? 'Camp รายเดือน' : 'Monthly Camp'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-6 bg-black border-t border-gray-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-black mb-4">
            {lang === 'th' ? 'สนใจจองคอร์ส?' : 'Interested in Booking?'}
          </h2>
          <p className="text-gray-500 mb-6">
            {lang === 'th' 
              ? 'ติดต่อเราผ่าน LINE เพื่อจองคอร์สและทดลองเรียนฟรี 1 ครั้ง' 
              : 'Contact us via LINE to book a class and get a free trial session'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:088-934-5146" className="bg-white text-black font-bold py-3 px-6 hover:bg-gray-200 transition-colors">
              088-934-5146
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
