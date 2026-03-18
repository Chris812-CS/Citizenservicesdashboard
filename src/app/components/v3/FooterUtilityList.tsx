import { HelpCircle, Database, Bot, MessageSquare, ChevronRight } from 'lucide-react';

interface FooterUtilityListProps {
  language: 'BM' | 'EN';
}

export function FooterUtilityList({ language }: FooterUtilityListProps) {
  const items = [
    {
      icon: <HelpCircle className="w-5 h-5 text-[#003399]" />,
      labelBM: 'Help Desk',
      labelEN: 'Help Desk',
    },
    {
      icon: <Database className="w-5 h-5 text-[#003399]" />,
      labelBM: 'Sumber Data Terbuka',
      labelEN: 'Open Data Source',
    },
    {
      icon: <Bot className="w-5 h-5 text-[#003399]" />,
      labelBM: 'Chatbot AI',
      labelEN: 'Chatbot AI',
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-[#003399]" />,
      labelBM: 'Maklum Balas',
      labelEN: 'Feedback',
    },
  ];

  return (
    <div className="px-6 pb-6 lg:px-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Mobile: Vertical list / Desktop: Horizontal grid */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden lg:grid lg:grid-cols-4 lg:divide-x lg:divide-slate-100">
        {items.map((item, index) => (
          <button
            key={index}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0 lg:flex-col lg:justify-center lg:gap-3 lg:border-b-0 lg:py-6"
          >
            <div className="flex items-center gap-3 lg:flex-col lg:gap-2">
              <div className="bg-blue-50 p-2 rounded-lg">{item.icon}</div>
              <span className="text-sm font-semibold text-slate-800 lg:text-center lg:text-xs">
                {language === 'BM' ? item.labelBM : item.labelEN}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 lg:hidden" />
          </button>
        ))}
      </div>
    </div>
  );
}