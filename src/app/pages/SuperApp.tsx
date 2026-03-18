import { SuperAppHeader } from '../components/v3/SuperAppHeader';
import { PersonalizedGreeting } from '../components/v3/PersonalizedGreeting';
import { HeroCarousel } from '../components/v3/HeroCarousel';
import { CoreServiceCards } from '../components/v3/CoreServiceCards';
import { FooterUtilityList } from '../components/v3/FooterUtilityList';
import { DesktopSidebar } from '../components/v3/DesktopSidebar';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export function SuperApp() {
  const [language, setLanguage] = useState<'BM' | 'EN'>('BM');

  const toggleLanguage = () => {
    setLanguage(language === 'BM' ? 'EN' : 'BM');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Desktop Layout */}
      <div className="lg:flex lg:min-h-screen">
        {/* Desktop Sidebar - Only visible on large screens */}
        <div className="hidden lg:block">
          <DesktopSidebar language={language} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 lg:overflow-auto">
          {/* Mobile container with max width */}
          <div className="max-w-md mx-auto min-h-screen bg-[#F8F9FA] shadow-2xl lg:max-w-none lg:shadow-none">
            <SuperAppHeader language={language} onLanguageToggle={toggleLanguage} />
            
            {/* Back Navigation - Mobile only */}
            <div className="px-6 pt-4 lg:hidden">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-sm text-[#003399] hover:text-[#002266] font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {language === 'BM' ? 'Kembali' : 'Back'}
              </Link>
            </div>

            {/* Desktop: Content wrapper with max-width */}
            <div className="lg:max-w-7xl lg:mx-auto lg:px-8 lg:py-6">
              {/* Personalized Greeting */}
              <PersonalizedGreeting language={language} />

              {/* Hero Carousel - Auto-rotating */}
              <HeroCarousel language={language} />

              {/* Core Service Cards - Horizontal Row (mobile) / 3-column Grid (desktop) */}
              <CoreServiceCards language={language} />

              {/* Footer Utility List - Vertical (mobile) / Horizontal Grid (desktop) */}
              <FooterUtilityList language={language} />

              {/* Footer Branding - Mobile only */}
              <footer className="px-6 pb-8 pt-4 text-center lg:hidden">
                <div className="flex justify-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#003399]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#CC0001]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#FFC72C]"></div>
                </div>
                <div className="text-xs text-slate-500">
                  <p className="mb-1 font-semibold">
                    {language === 'BM' ? 'Kerajaan Malaysia' : 'Government of Malaysia'}
                  </p>
                  <p>
                    {language === 'BM' ? 'Aplikasi Super Kerajaan Malaysia' : 'Malaysian Government Super-App'}
                  </p>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}