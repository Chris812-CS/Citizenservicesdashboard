import { LayoutDashboard, Wallet, Car, Heart, Settings, Shield } from 'lucide-react';
import { useState } from 'react';

interface DesktopSidebarProps {
  language: 'BM' | 'EN';
}

export function DesktopSidebar({ language }: DesktopSidebarProps) {
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    {
      id: 'dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      labelBM: 'Dashboard',
      labelEN: 'Dashboard',
    },
    {
      id: 'sara',
      icon: <Wallet className="w-5 h-5" />,
      labelBM: 'Dompet SARA',
      labelEN: 'SARA Wallet',
    },
    {
      id: 'jpj',
      icon: <Car className="w-5 h-5" />,
      labelBM: 'JPJ & Kenderaan',
      labelEN: 'JPJ & Vehicle',
    },
    {
      id: 'health',
      icon: <Heart className="w-5 h-5" />,
      labelBM: 'Kesihatan',
      labelEN: 'Health',
    },
    {
      id: 'settings',
      icon: <Settings className="w-5 h-5" />,
      labelBM: 'Tetapan',
      labelEN: 'Settings',
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Logo/Brand */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-2">
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
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeItem === item.id
                    ? 'bg-[#003399] text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span className="font-semibold text-sm">
                  {language === 'BM' ? item.labelBM : item.labelEN}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Branding */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex justify-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-[#003399]"></div>
          <div className="w-2 h-2 rounded-full bg-[#CC0001]"></div>
          <div className="w-2 h-2 rounded-full bg-[#FFC72C]"></div>
        </div>
        <p className="text-xs text-slate-500 text-center">
          {language === 'BM' ? 'Kerajaan Malaysia' : 'Government of Malaysia'}
        </p>
      </div>
    </aside>
  );
}
