'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/programs', label: t.nav.programs },
    { href: '/schedule', label: t.nav.schedule },
    { href: '/rustfest', label: 'RUSTFEST' },
    { href: '/shop', label: t.nav.shop },
    { href: '/about', label: t.nav.about },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-lg font-black tracking-tighter uppercase">
          THE MASTER <span className="text-red-600">BMX</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="text-xs font-medium hover:text-red-500 transition-colors uppercase tracking-wide"
            >
              {link.label}
            </Link>
          ))}
          <Link 
            href="/programs#contact" 
            className="bg-white text-black px-3 py-1.5 text-xs font-bold hover:bg-red-600 hover:text-white transition-colors uppercase tracking-wide"
          >
            {t.nav.contact}
          </Link>
          <Link 
            href="/admin/dashboard" 
            className="bg-red-600 hover:bg-red-700 text-white px-2 py-1.5 text-xs font-bold uppercase tracking-wide rounded flex items-center gap-1"
            title="Admin Dashboard"
          >
            ⚙️ Admin
          </Link>
          <button 
            onClick={() => setLang(lang === 'th' ? 'en' : 'th')}
            className="border border-gray-600 px-2 py-1 text-xs font-bold uppercase tracking-wider hover:border-white transition-colors"
          >
            {lang === 'th' ? 'EN' : 'TH'}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button 
            onClick={() => setLang(lang === 'th' ? 'en' : 'th')}
            className="border border-gray-600 px-2 py-1 text-xs font-bold uppercase tracking-wider hover:border-white transition-colors"
          >
            {lang === 'th' ? 'EN' : 'TH'}
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-red-500 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black border-t border-gray-800">
          <nav className="flex flex-col py-4 px-4 gap-1">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium hover:text-red-500 transition-colors uppercase tracking-wide py-2 px-3 hover:bg-gray-900 rounded"
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/programs#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="bg-white text-black px-3 py-2 text-sm font-bold hover:bg-red-600 hover:text-white transition-colors uppercase tracking-wide rounded mt-2 text-center"
            >
              {t.nav.contact}
            </Link>
            <Link 
              href="/admin/dashboard" 
              onClick={() => setMobileMenuOpen(false)}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 text-sm font-bold uppercase tracking-wide rounded mt-2 text-center flex items-center justify-center gap-2"
            >
              ⚙️ Admin Dashboard
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
