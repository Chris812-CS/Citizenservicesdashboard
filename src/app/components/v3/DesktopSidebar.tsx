import { LayoutDashboard, Wallet, Car, Heart, Settings, Shield, ChevronDown, ChevronUp, History, Store, IdCard, FileText, AlertTriangle, Key, Calendar, Activity, MapPin, Lock, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import malaysiaFlag from 'figma:asset/27997a2c5b08901c406cf247be635e53e8214a03.png';

interface DesktopSidebarProps {
  language: 'BM' | 'EN';
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

export function DesktopSidebar({ language, isOpen, onClose, isMobile }: DesktopSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('dashboard');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    if (location.pathname === '/super-app') {
      setActiveItem('dashboard');
    } else if (location.pathname === '/sara-balance' || location.pathname === '/eligible-retailers') {
      setActiveItem('sara');
      if (!expandedItems.includes('sara')) {
        setExpandedItems(prev => [...prev, 'sara']);
      }
    } else if (location.pathname === '/digital-license' || location.pathname === '/road-tax' || location.pathname === '/summons-check') {
      setActiveItem('jpj');
      if (!expandedItems.includes('jpj')) {
        setExpandedItems(prev => [...prev, 'jpj']);
      }
    } else if (location.pathname === '/appointment-booking') {
      setActiveItem('health');
      if (!expandedItems.includes('health')) {
        setExpandedItems(prev => [...prev, 'health']);
      }
    } else if (location.pathname === '/security-privacy') {
      setActiveItem('settings');
      if (!expandedItems.includes('settings')) {
        setExpandedItems(prev => [...prev, 'settings']);
      }
    }
  }, [location.pathname]);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const menuItems = [
    {
      id: 'dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      labelBM: 'Dashboard',
      labelEN: 'Dashboard',
      submenus: []
    },
    {
      id: 'sara',
      icon: <Wallet className="w-5 h-5" />,
      labelBM: 'Dompet SARA',
      labelEN: 'SARA Wallet',
      submenus: [
        { id: 'sara-1', icon: <History className="w-4 h-4" />, labelBM: 'Baki & Sejarah Transaksi', labelEN: 'Balance & Transaction History' },
        { id: 'sara-2', icon: <Store className="w-4 h-4" />, labelBM: 'Peruncit Layak', labelEN: 'Eligible Retailers' }
      ]
    },
    {
      id: 'jpj',
      icon: <Car className="w-5 h-5" />,
      labelBM: 'JPJ & Kenderaan',
      labelEN: 'JPJ & Vehicle',
      submenus: [
        { id: 'jpj-1', icon: <IdCard className="w-4 h-4" />, labelBM: 'Lesen Digital', labelEN: 'Digital License' },
        { id: 'jpj-2', icon: <FileText className="w-4 h-4" />, labelBM: 'Pembaharuan Cukai Jalan', labelEN: 'Road Tax Renewal' },
        { id: 'jpj-3', icon: <AlertTriangle className="w-4 h-4" />, labelBM: 'Semakan Saman', labelEN: 'Summons Check (Saman)' }
      ]
    },
    {
      id: 'health',
      icon: <Heart className="w-5 h-5" />,
      labelBM: 'Kesihatan',
      labelEN: 'Health',
      submenus: [
        { id: 'health-1', icon: <Calendar className="w-4 h-4" />, labelBM: 'Tempahan Temujanji', labelEN: 'Appointment Booking' }
      ]
    },
    {
      id: 'settings',
      icon: <Settings className="w-5 h-5" />,
      labelBM: 'Tetapan',
      labelEN: 'Settings',
      submenus: [
        { id: 'settings-1', icon: <Lock className="w-4 h-4" />, labelBM: 'Keselamatan & Privasi', labelEN: 'Security & Privacy' }
      ]
    },
  ];

  const sidebarContent = (
    <aside className={`${isMobile ? 'w-64 bg-white h-full flex flex-col shadow-2xl relative' : 'w-64 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Logo/Brand */}
      <div className="p-6 border-b border-slate-200 relative">
        {isMobile && onClose && (
          <button onClick={onClose} className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        )}
        <div className="flex items-center gap-3 mb-2">
          {/* Malaysia Flag (1:2 aspect ratio) */}
          <div className="w-[40px] h-[20px] rounded-[2px] overflow-hidden flex-shrink-0 shadow-sm border border-slate-100 flex relative">
            <img src={malaysiaFlag} alt="Malaysia Flag" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Malaysia</p>
            <p className="font-bold text-sm text-[#003399]">
              {language === 'BM' ? 'Perkhidmatan Rakyat' : 'Citizen Services'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isExpanded = expandedItems.includes(item.id);
            const hasSubmenus = item.submenus && item.submenus.length > 0;
            const isActive = activeItem === item.id;
            
            return (
            <li key={item.id}>
              <button
                onClick={() => {
                  setActiveItem(item.id);
                  if (item.id === 'dashboard') {
                    navigate('/super-app', { state: { language } });
                  } else if (hasSubmenus) {
                    toggleExpand(item.id);
                  }
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[#003399] text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-semibold text-sm">
                    {language === 'BM' ? item.labelBM : item.labelEN}
                  </span>
                </div>
                {hasSubmenus && (
                  isExpanded ? <ChevronUp className="w-4 h-4 opacity-70" /> : <ChevronDown className="w-4 h-4 opacity-70" />
                )}
              </button>
              
              {/* Submenus */}
              {hasSubmenus && isExpanded && (
                <ul className="mt-1 mb-2 space-y-1 pl-10 pr-2">
                  {item.submenus!.map((sub: any) => {
                    const isSubActive = (location.pathname === '/sara-balance' && sub.id === 'sara-1') || (location.pathname === '/eligible-retailers' && sub.id === 'sara-2') || (location.pathname === '/digital-license' && sub.id === 'jpj-1') || (location.pathname === '/road-tax' && sub.id === 'jpj-2') || (location.pathname === '/summons-check' && sub.id === 'jpj-3') || (location.pathname === '/appointment-booking' && sub.id === 'health-1') || (location.pathname === '/security-privacy' && sub.id === 'settings-1');
                    return (
                    <li key={sub.id}>
                      <button 
                        onClick={() => {
                          if (sub.id === 'sara-1') {
                            navigate('/sara-balance', { state: { language } });
                          } else if (sub.id === 'sara-2') {
                            navigate('/eligible-retailers', { state: { language } });
                          } else if (sub.id === 'jpj-1') {
                            navigate('/digital-license', { state: { language } });
                          } else if (sub.id === 'jpj-2') {
                            navigate('/road-tax', { state: { language } });
                          } else if (sub.id === 'jpj-3') {
                            navigate('/summons-check', { state: { language } });
                          } else if (sub.id === 'health-1') {
                            navigate('/appointment-booking', { state: { language } });
                          } else if (sub.id === 'settings-1') {
                            navigate('/security-privacy', { state: { language } });
                          }
                          if (isMobile && onClose) {
                            onClose();
                          }
                        }}
                        className={`w-full flex items-center gap-3 py-2 px-3 text-sm rounded-lg transition-colors ${
                          isSubActive ? 'bg-[#003399]/10 text-[#003399] font-semibold' : 'text-slate-600 hover:bg-slate-100 hover:text-[#003399]'
                        }`}
                      >
                        {sub.icon && <span className="opacity-70">{sub.icon}</span>}
                        <span className="font-medium text-left">{language === 'BM' ? sub.labelBM : sub.labelEN}</span>
                      </button>
                    </li>
                  )})}
                </ul>
              )}
            </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Branding */}
      <div className="p-6 border-t-2 border-slate-100 bg-slate-50">
        <div className="flex justify-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-[#003399]"></div>
          <div className="w-2 h-2 rounded-full bg-[#CC0001]"></div>
          <div className="w-2 h-2 rounded-full bg-[#FFC72C]"></div>
        </div>
        <p className="text-xs text-slate-500 text-center font-medium">
          {language === 'BM' ? 'Kerajaan Malaysia' : 'Government of Malaysia'}
        </p>
      </div>
    </aside>
  );

  if (isMobile) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex lg:hidden">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onClose}
        />
        {/* Sidebar Drawer */}
        <div className="relative flex-1 w-full max-w-xs transition-transform transform">
          {sidebarContent}
        </div>
      </div>
    );
  }

  return sidebarContent;
}
