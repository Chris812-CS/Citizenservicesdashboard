import { SuperAppHeader } from '../components/v3/SuperAppHeader';
import { PersonalizedGreeting } from '../components/v3/PersonalizedGreeting';
import { HeroCarousel } from '../components/v3/HeroCarousel';
import { CoreServiceCards } from '../components/v3/CoreServiceCards';
import { FooterUtilityList } from '../components/v3/FooterUtilityList';
import { CitizenSupportHub } from '../components/v3/CitizenSupportHub';
import { LaunchGuide } from '../components/v3/LaunchGuide';
import { DesktopSidebar } from '../components/v3/DesktopSidebar';
import { useLocation } from 'react-router';
import { useState } from 'react';
import jataNegara from '../../imports/image-8.png';

export function SuperApp() {
  const location = useLocation();
  const [language, setLanguage] = useState<'BM' | 'EN'>(location.state?.language || 'BM');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'BM' ? 'EN' : 'BM');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <DesktopSidebar 
        language={language} 
        isMobile 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      {/* Desktop Layout */}
      <div className="lg:flex lg:min-h-screen">
        {/* Desktop Sidebar - Only visible on large screens */}
        <div className="hidden lg:block">
          <DesktopSidebar language={language} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 lg:overflow-auto">
          {/* Mobile container with max width */}
          <div className="max-w-md mx-auto min-h-screen bg-[#F8F9FA] shadow-2xl lg:max-w-none lg:shadow-none relative">
            <SuperAppHeader language={language} onLanguageToggle={toggleLanguage} onMenuClick={() => setIsMobileMenuOpen(true)} />
            
            <div className="lg:max-w-7xl lg:mx-auto lg:px-8 lg:py-6">
              {/* Personalized Greeting */}
              <PersonalizedGreeting language={language} />

              {/* Hero Carousel - Auto-rotating */}
              <HeroCarousel language={language} />

              {/* Core Service Cards - Horizontal Row (mobile) / 3-column Grid (desktop) */}
              <CoreServiceCards language={language} />

              {/* Citizen Support Hub - New Section */}
              <CitizenSupportHub language={language} />

              {/* Launch Guide - Address & Quick Links */}
              <LaunchGuide language={language} />

              {/* Footer Utility List - Vertical (mobile) / Horizontal Grid (desktop) */}
              <FooterUtilityList language={language} />

              {/* Footer Branding - Mobile only */}
              <footer className="px-6 pb-20 lg:pb-8 pt-8 text-center">
                <div className="flex justify-center gap-2 mb-3 lg:hidden">
                  <div className="w-2 h-2 rounded-full bg-[#003399]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#CC0001]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#FFC72C]"></div>
                </div>
                <div className="text-xs text-slate-500 lg:hidden">
                  <p className="mb-1 font-semibold">
                    {language === 'BM' ? 'Kerajaan Malaysia' : 'Government of Malaysia'}
                  </p>
                  <p className="mb-4">
                    {language === 'BM' ? 'Aplikasi Super Kerajaan Malaysia' : 'Malaysian Government Super-App'}
                  </p>
                </div>
                
                {/* Absolute Bottom Label */}
                <div className="w-full mt-10 mb-4 pt-6 border-t border-slate-200 flex items-center justify-center gap-3">
                  <img src={jataNegara} alt="Jata Negara" className="h-10 w-auto object-contain" />
                  <p className="text-xs text-slate-400 font-medium">
                    Malaysia Government Platform | All Rights Reserved © 2026
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