import { ChevronRight, Megaphone, CreditCard } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeroCarouselProps {
  language: 'BM' | 'EN';
}

export function HeroCarousel({ language }: HeroCarouselProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-rotate carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const slides = [
    {
      icon: <Megaphone className="w-5 h-5 text-white" />,
      title: language === 'BM' ? 'Inisiatif SARA 2026 Kini Bermula' : 'SARA Initiative 2026 Now Begins',
      description: language === 'BM' 
        ? 'Bantuan Rakyat untuk semua warganegara layak. Semak kelayakan anda sekarang.'
        : 'People\'s Aid for all eligible citizens. Check your eligibility now.',
      buttonText: language === 'BM' ? 'Lihat Butiran' : 'View Details',
    },
    {
      icon: <CreditCard className="w-5 h-5 text-white" />,
      title: language === 'BM' 
        ? 'Makluman: Dasar Penukaran Kad Pengenalan (IC) 2026'
        : 'Notice: Identity Card (IC) Replacement Policy 2026',
      description: language === 'BM'
        ? 'Tarikh akhir penukaran kepada MyKad Generasi 2. Semak kelayakan anda.'
        : 'Deadline for replacement to MyKad Generation 2. Check your eligibility.',
      buttonText: language === 'BM' ? 'Semak Syarat' : 'Check Requirements',
    },
  ];

  return (
    <div className="px-6 pb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="relative overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-full bg-gradient-to-br from-[#003399] to-[#0047BB] rounded-2xl p-5 shadow-lg"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-white/20 p-2.5 rounded-xl">{slide.icon}</div>
                <div className="flex-1">
                  <p className="text-xs text-white/80 font-semibold mb-1 uppercase tracking-wide">
                    {language === 'BM' ? 'Pengumuman' : 'Announcement'}
                  </p>
                  <h2 className="text-white font-bold text-base leading-snug">
                    {slide.title}
                  </h2>
                  <p className="text-white/90 text-xs mt-2">{slide.description}</p>
                </div>
              </div>

              <button className="w-full bg-white hover:bg-slate-50 text-[#003399] font-semibold text-sm py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                {slide.buttonText}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === activeSlide ? 'w-6 bg-[#003399]' : 'w-1.5 bg-slate-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
