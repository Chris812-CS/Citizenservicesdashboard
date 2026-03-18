import { RefreshCw, Calendar, FileSearch, AlertCircle } from 'lucide-react';

interface QuickActionCardProps {
  icon: React.ReactNode;
  title: string;
  titleEn: string;
  color: string;
  bgColor: string;
  onClick?: () => void;
}

function QuickActionCard({ icon, title, titleEn, color, bgColor, onClick }: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white border-2 border-slate-200 hover:border-[#003893] hover:shadow-lg rounded-xl p-4 transition-all duration-200 flex flex-col items-center justify-center gap-2"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <div className={`${bgColor} p-3 rounded-lg`}>
        {icon}
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-slate-800 leading-tight">{title}</p>
        <p className="text-xs text-slate-500 mt-0.5">{titleEn}</p>
      </div>
    </button>
  );
}

export function QuickActions() {
  const actions = [
    {
      icon: <RefreshCw className="w-5 h-5 text-[#003893]" />,
      title: 'Lanjut Lesen',
      titleEn: 'Renew License',
      color: 'text-[#003893]',
      bgColor: 'bg-blue-50',
    },
    {
      icon: <Calendar className="w-5 h-5 text-[#CC0001]" />,
      title: 'Temujanji Pasport',
      titleEn: 'Passport Appointment',
      color: 'text-[#CC0001]',
      bgColor: 'bg-red-50',
    },
    {
      icon: <FileSearch className="w-5 h-5 text-[#FFC72C]" />,
      title: 'Semak Dokumen',
      titleEn: 'Check Documents',
      color: 'text-[#FFC72C]',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-[#003893]" />,
      title: 'Lapor Hilang',
      titleEn: 'Report Lost',
      color: 'text-[#003893]',
      bgColor: 'bg-blue-50',
    },
  ];

  return (
    <div className="px-6 py-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <h2 className="font-bold text-[#003893] text-base mb-3">
        Tindakan Pantas / Quick Actions
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <QuickActionCard
            key={index}
            icon={action.icon}
            title={action.title}
            titleEn={action.titleEn}
            color={action.color}
            bgColor={action.bgColor}
            onClick={() => console.log(`${action.title} clicked`)}
          />
        ))}
      </div>
    </div>
  );
}
