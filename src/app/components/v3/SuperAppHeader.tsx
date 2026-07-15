import { Search, Bell, Bot, User, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { useState } from 'react';
import malaysiaFlag from 'figma:asset/27997a2c5b08901c406cf247be635e53e8214a03.png';
const okuVideoEmbed = 'https://drive.google.com/file/d/1UUCqiyhRmQ8XK27kZbo33kkcCqlF-b2h/preview';

interface SuperAppHeaderProps {
  language: 'BM' | 'EN';
  onLanguageToggle: () => void;
  onMenuClick?: () => void;
}

export function SuperAppHeader({ language, onLanguageToggle, onMenuClick }: SuperAppHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [okuOpen, setOkuOpen] = useState(false);

  const closeOku = () => {
    setOkuOpen(false);
  };

  return (
    <>
      {/* OKU Video Modal */}
      {okuOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.78)' }}
          onClick={closeOku}
        >
          <div
            className="relative bg-black rounded-2xl overflow-hidden shadow-2xl w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#003399]">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <circle cx="12" cy="3.5" r="1.75" />
                  <path d="M15.5 8.5H13V7h-2v1.5H8.5a1 1 0 0 0-.98 1.2l1 5a1 1 0 0 0 .98.8H11v4a1 1 0 0 0 2 0v-4h1.5a1 1 0 0 0 .98-.8l1-5a1 1 0 0 0-.98-1.2z" />
                </svg>
                <span className="text-white font-bold text-sm">
                  {language === 'BM' ? 'Kebolehcapaian' : 'Accessibility'}
                </span>
              </div>
              <button
                onClick={closeOku}
                className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Google Drive video embed */}
            <iframe
              src={okuVideoEmbed}
              className="w-full block"
              style={{ height: '65vh', border: 'none' }}
              allow="autoplay"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Main header */}
      <header
        className="bg-white px-4 md:px-6 py-4 shadow-sm lg:shadow-none lg:border-b lg:border-slate-200 sticky top-0 z-30"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

          {/* Left: Menu + Flag + Title */}
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              onClick={onMenuClick}
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="w-[40px] h-[20px] rounded-[2px] overflow-hidden flex-shrink-0 shadow-sm border border-slate-100 relative hidden md:flex">
              <img src={malaysiaFlag} alt="Malaysia Flag" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-sm md:text-lg font-bold text-[#003399] leading-tight">
                {language === 'BM' ? 'Portal Kerajaan Pintar Malaysia' : 'Smart Government Malaysia'}
              </h1>
              <p className="text-[10px] md:text-xs text-slate-500 hidden md:block">
                {language === 'BM' ? 'Smart Government Malaysia' : 'Portal Kerajaan Pintar Malaysia'}
              </p>
            </div>
          </div>

          {/* Middle: Search */}
          <div className="flex-1 max-w-xl lg:px-6">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder={language === 'BM' ? 'Cari perkhidmatan, bantuan, atau maklumat...' : 'Search services, help, or information...'}
                className="w-full bg-slate-100 border border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#003399]/20 transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center justify-end gap-2 md:gap-3">

            {/* Language toggle */}
            <div className="flex items-center bg-slate-100 rounded-full p-0.5 border border-slate-200 mr-1">
              <button
                onClick={() => language === 'EN' && onLanguageToggle()}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  language === 'BM' ? 'bg-white text-[#003399] shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                BM
              </button>
              <button
                onClick={() => language === 'BM' && onLanguageToggle()}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  language === 'EN' ? 'bg-white text-[#003399] shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                EN
              </button>
            </div>

            {/* OKU Accessibility */}
            <button
              onClick={() => setOkuOpen(true)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              title={language === 'BM' ? 'Kebolehcapaian' : 'Accessibility'}
              aria-label={language === 'BM' ? 'Kebolehcapaian' : 'Accessibility'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <circle cx="12" cy="3.5" r="1.75" />
                <path d="M15.5 8.5H13V7h-2v1.5H8.5a1 1 0 0 0-.98 1.2l1 5a1 1 0 0 0 .98.8H11v4a1 1 0 0 0 2 0v-4h1.5a1 1 0 0 0 .98-.8l1-5a1 1 0 0 0-.98-1.2z" />
              </svg>
            </button>

            {/* Chatbot */}
            <button
              onClick={() => navigate('/chatbot', { state: { language, from: location.pathname } })}
              className="p-2 bg-[#003399]/10 text-[#003399] hover:bg-[#003399]/20 rounded-full transition-colors"
              title="Chatbot"
            >
              <Bot className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>

            {/* Profile */}
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
              <User className="w-5 h-5" />
            </button>

          </div>
        </div>
      </header>
    </>
  );
}
