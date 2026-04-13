'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero - YouTube Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* YouTube Video as Background */}
        <div className="absolute inset-0 w-full h-full">
          <iframe 
            className="absolute top-1/2 left-1/2 w-[177.77vh] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
            src="https://www.youtube.com/embed/W6Kn4-b2XIM?autoplay=1&mute=1&loop=1&playlist=W6Kn4-b2XIM&controls=0&showinfo=0&modestbranding=1&iv_load_policy=3&disablekb=1&start=0&end=79"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
        
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-block bg-red-600 px-4 py-1 mb-6">
            <span className="text-xs font-bold uppercase tracking-widest">{t.hero.badge}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
            {t.hero.title}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl mx-auto">
            {t.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/programs" className="bg-white text-black font-bold py-4 px-10 hover:bg-red-600 hover:text-white transition-all text-sm uppercase tracking-widest">
              {t.hero.cta}
            </Link>
            <Link href="/rustfest" className="border-2 border-white text-white font-bold py-4 px-10 hover:bg-white hover:text-black transition-all text-sm uppercase tracking-widest">
              {t.hero.cta2}
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4">{t.programs.title}</h2>
          <p className="text-gray-500 text-lg mb-16 uppercase tracking-wide">{t.programs.subtitle}</p>
          
          <div className="grid md:grid-cols-3 gap-0">
            <div className="border border-gray-800 p-12 hover:border-red-600 transition-colors group">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{t.programs.little.age}</span>
              <h3 className="text-4xl font-black uppercase tracking-tight mt-2 mb-4 group-hover:text-red-500 transition-colors">{t.programs.little.name}</h3>
              <p className="text-gray-500 uppercase tracking-wide text-sm">{t.programs.little.desc}</p>
              <Link href="/programs" className="inline-block mt-8 text-sm font-bold uppercase tracking-widest border-b border-white pb-1 hover:border-red-500 hover:text-red-500 transition-colors">
                {t.programs.detail}
              </Link>
            </div>
            
            <div className="border border-gray-800 p-12 hover:border-red-600 transition-colors group">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{t.programs.junior.age}</span>
              <h3 className="text-4xl font-black uppercase tracking-tight mt-2 mb-4 group-hover:text-red-500 transition-colors">{t.programs.junior.name}</h3>
              <p className="text-gray-500 uppercase tracking-wide text-sm">{t.programs.junior.desc}</p>
              <Link href="/programs" className="inline-block mt-8 text-sm font-bold uppercase tracking-widest border-b border-white pb-1 hover:border-red-500 hover:text-red-500 transition-colors">
                {t.programs.detail}
              </Link>
            </div>
            
            <div className="border border-red-600 p-12 bg-red-600/5">
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest">{t.programs.competitor.age}</span>
              <h3 className="text-4xl font-black uppercase tracking-tight mt-2 mb-4 text-red-500">{t.programs.competitor.name}</h3>
              <p className="text-gray-500 uppercase tracking-wide text-sm">{t.programs.competitor.desc}</p>
              <Link href="/programs" className="inline-block mt-8 text-sm font-bold uppercase tracking-widest border-b border-red-500 text-red-500 pb-1">
                {t.programs.detail}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-32 px-6 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4">{t.locations.title}</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="border-l-4 border-black pl-8">
              <h3 className="text-2xl font-black uppercase">{t.locations.rush.name}</h3>
              <p className="text-gray-600 uppercase text-sm tracking-wide mt-1">{t.locations.rush.city}</p>
              <p className="font-bold mt-2">{t.locations.rush.days}</p>
            </div>
            <div className="border-l-4 border-black pl-8">
              <h3 className="text-2xl font-black uppercase">{t.locations.bang.name}</h3>
              <p className="text-gray-600 uppercase text-sm tracking-wide mt-1">{t.locations.bang.city}</p>
              <p className="font-bold mt-2">{t.locations.bang.days}</p>
            </div>
            <div className="border-l-4 border-black pl-8">
              <h3 className="text-2xl font-black uppercase">{t.locations.pattaya.name}</h3>
              <p className="text-gray-600 uppercase text-sm tracking-wide mt-1">{t.locations.pattaya.city}</p>
              <p className="font-bold mt-2">{t.locations.pattaya.days}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">{t.cta.title}</h2>
          <p className="text-gray-500 uppercase tracking-wide mb-10">{t.cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:088-934-5146" className="bg-red-600 text-white font-bold py-4 px-10 hover:bg-white hover:text-black transition-all text-sm uppercase tracking-widest">
              {t.cta.call}
            </a>
            <a href="https://line.me/R/ti/p/%40rushfest" target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white font-bold py-4 px-10 hover:bg-white hover:text-black transition-all text-sm uppercase tracking-widest">
              {t.cta.line}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
