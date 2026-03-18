import { Shield, Bell, Bot } from 'lucide-react';

interface SuperAppHeaderProps {
  language: 'BM' | 'EN';
  onLanguageToggle: () => void;
}

export function SuperAppHeader({ language, onLanguageToggle }: SuperAppHeaderProps) {
  return (
    <header className="bg-white px-6 py-4 shadow-sm lg:shadow-none lg:border-b lg:border-slate-200" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="flex items-center justify-between">
        {/* Left: Logo & Title - Only show on mobile */}
        <div className="flex items-center gap-3 lg:hidden">
          <div className="w-10 h-10 bg-[#003399]/10 rounded-full flex items-center justify-center border-2 border-[#003399]/20">
            <Shield className="w-5 h-5 text-[#003399]" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide">Malaysia</p>
            <p className="font-bold text-sm text-[#003399]">
              {language === 'BM' ? 'Perkhidmatan Rakyat' : 'Citizen Services'}
            </p>
          </div>
        </div>

        {/* Desktop: Page Title */}
        <div className="hidden lg:block">
          <h1 className="text-xl font-bold text-[#003399]">
            {language === 'BM' ? 'Dashboard Utama' : 'Main Dashboard'}
          </h1>
        </div>

        {/* Right: Chatbot, Notification */}
        <div className="flex items-center gap-2">
          {/* Chatbot */}
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Chatbot">
            <Bot className="w-5 h-5 text-[#003399]" />
          </button>

          {/* Notification */}
          <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-[#003399]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>

      {/* Language Switcher - Pill Toggle */}
      <div className="mt-4 flex justify-center">
        <div className="inline-flex bg-slate-100 rounded-full p-1">
          <button
            onClick={() => language === 'EN' && onLanguageToggle()}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
              language === 'BM'
                ? 'bg-[#003399] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            BM
          </button>
          <button
            onClick={() => language === 'BM' && onLanguageToggle()}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
              language === 'EN'
                ? 'bg-[#003399] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}