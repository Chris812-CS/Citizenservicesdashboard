import { Bell, Briefcase, MessageCircle, Database } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  titleMalay: string;
  color: string;
  bgColor: string;
  onClick?: () => void;
}

function ServiceCard({ icon, title, titleMalay, color, bgColor, onClick }: ServiceCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white border-2 border-slate-200 hover:border-[#003893] rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center gap-2 h-full"
    >
      <div className={`${bgColor} p-3 rounded-lg`}>
        {icon}
      </div>
      <div className="text-center">
        <span className="text-slate-800 font-semibold text-xs block leading-tight">
          {titleMalay}
        </span>
        <span className="text-slate-500 text-[10px] block mt-0.5">
          {title}
        </span>
      </div>
    </button>
  );
}

export function ServiceGrid() {
  const services = [
    {
      icon: <Briefcase className="w-6 h-6 text-[#CC0001]" />,
      title: 'Common Services',
      titleMalay: 'Perkhidmatan',
      color: 'text-[#CC0001]',
      bgColor: 'bg-red-50',
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-[#FFC72C]" />,
      title: 'AI Chatbot',
      titleMalay: 'Chatbot AI',
      color: 'text-[#FFC72C]',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: <Database className="w-6 h-6 text-[#003893]" />,
      title: 'Open Data',
      titleMalay: 'Data Terbuka',
      color: 'text-[#003893]',
      bgColor: 'bg-blue-50',
    },
  ];

  return (
    <div className="px-6">
      <h2 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Perkhidmatan Utama</h2>
      <div className="grid grid-cols-3 gap-3" style={{ gridAutoRows: '1fr' }}>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            titleMalay={service.titleMalay}
            color={service.color}
            bgColor={service.bgColor}
            onClick={() => console.log(`${service.title} clicked`)}
          />
        ))}
      </div>
    </div>
  );
}