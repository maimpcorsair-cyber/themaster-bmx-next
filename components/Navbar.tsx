'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-tighter uppercase">
          THE MASTER <span className="text-red-600">BMX</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-xs font-medium hover:text-red-500 transition-colors uppercase tracking-wide">{t.nav.home}</Link>
          <Link href="/programs" className="text-xs font-medium hover:text-red-500 transition-colors uppercase tracking-wide">{t.nav.programs}</Link>
          <Link href="/schedule" className="text-xs font-medium hover:text-red-500 transition-colors uppercase tracking-wide">{t.nav.schedule}</Link>
          <Link href="/rustfest" className="text-xs font-medium hover:text-red-500 transition-colors uppercase tracking-wide">RUSTFEST</Link>
          <Link href="/shop" className="text-xs font-medium hover:text-red-500 transition-colors uppercase tracking-wide">{t.nav.shop}</Link>
          <Link href="/about" className="text-xs font-medium hover:text-red-500 transition-colors uppercase tracking-wide">{t.nav.about}</Link>
          <Link href="/programs#contact" className="bg-white text-black px-4 py-2 text-xs font-bold hover:bg-red-600 hover:text-white transition-colors uppercase tracking-wide">
            {t.nav.contact}
          </Link>
        </nav>
        <button 
          onClick={() => setLang(lang === 'th' ? 'en' : 'th')}
          className="border border-gray-600 px-3 py-1 text-xs font-bold uppercase tracking-wider hover:border-white transition-colors"
        >
          {lang === 'th' ? 'EN' : 'TH'}
        </button>
      </div>
    </header>
  );
}
