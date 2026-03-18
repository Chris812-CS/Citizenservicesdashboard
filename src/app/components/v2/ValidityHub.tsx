import { CreditCard, FileText, AlertTriangle, CheckCircle } from 'lucide-react';

interface DocumentCardProps {
  icon: React.ReactNode;
  title: string;
  titleEn: string;
  details: {
    label: string;
    value: string;
  }[];
  expiryDate: Date;
  progress: number;
  status: 'valid' | 'expiring' | 'expired';
}

function DocumentCard({ icon, title, titleEn, details, expiryDate, progress, status }: DocumentCardProps) {
  const daysUntilExpiry = Math.ceil((expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  const statusColors = {
    valid: 'border-green-200 bg-green-50/50',
    expiring: 'border-amber-300 bg-amber-50/50',
    expired: 'border-red-300 bg-red-50/50',
  };

  const progressColors = {
    valid: 'bg-green-500',
    expiring: 'bg-amber-500',
    expired: 'bg-red-500',
  };

  const badgeColors = {
    valid: 'bg-green-100 text-green-700 border-green-300',
    expiring: 'bg-amber-100 text-amber-700 border-amber-300',
    expired: 'bg-red-100 text-red-700 border-red-300',
  };

  return (
    <div className={`bg-white rounded-2xl p-5 shadow-md border-2 ${statusColors[status]} min-w-[280px] flex-shrink-0`} style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-[#003893]/10 p-2.5 rounded-lg">
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-[#003893] text-sm">{title}</h3>
            <p className="text-xs text-slate-500">{titleEn}</p>
          </div>
        </div>
        {status === 'expiring' && <AlertTriangle className="w-5 h-5 text-amber-600" />}
        {status === 'expired' && <AlertTriangle className="w-5 h-5 text-red-600" />}
        {status === 'valid' && <CheckCircle className="w-5 h-5 text-green-600" />}
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        {details.map((detail, index) => (
          <div key={index}>
            <p className="text-xs text-slate-500">{detail.label}</p>
            <p className="text-sm font-semibold text-slate-800">{detail.value}</p>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-slate-600">Sah Laku / Validity</span>
          <span className="text-xs font-semibold text-slate-800">
            {daysUntilExpiry > 0 ? `${daysUntilExpiry} hari` : 'Tamat Tempoh'}
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${progressColors[status]} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Tamat: {expiryDate.toLocaleDateString('ms-MY')}
        </p>
      </div>

      {/* Action Button */}
      <button className="w-full bg-[#003893] hover:bg-[#002866] text-white text-sm font-semibold py-2.5 rounded-lg transition-colors">
        Perbaharui / Renew
      </button>
    </div>
  );
}

export function ValidityHub() {
  // Calculate expiry status
  const getExpiryStatus = (expiryDate: Date): 'valid' | 'expiring' | 'expired' => {
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) return 'expired';
    if (daysUntilExpiry <= 180) return 'expiring'; // 6 months
    return 'valid';
  };

  const getProgress = (expiryDate: Date): number => {
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const totalDays = 365 * 5; // Assume 5 year validity
    const progress = Math.max(0, Math.min(100, (daysUntilExpiry / totalDays) * 100));
    return progress;
  };

  const drivingLicenseExpiry = new Date('2026-08-15');
  const passportExpiry = new Date('2025-05-20'); // Within 6 months for demo

  const documents = [
    {
      icon: <CreditCard className="w-5 h-5 text-[#003893]" />,
      title: 'Lesen Memandu',
      titleEn: 'Driving License',
      details: [
        { label: 'Nama / Name', value: 'Ahmad bin Abdullah' },
        { label: 'Kelas / Class', value: 'D, DA' },
        { label: 'No. Lesen', value: 'D123456789' },
      ],
      expiryDate: drivingLicenseExpiry,
      progress: getProgress(drivingLicenseExpiry),
      status: getExpiryStatus(drivingLicenseExpiry),
    },
    {
      icon: <FileText className="w-5 h-5 text-[#003893]" />,
      title: 'Pasport',
      titleEn: 'Passport',
      details: [
        { label: 'No. Pasport', value: 'A12345678' },
        { label: 'Tempat Dikeluarkan', value: 'Kuala Lumpur' },
        { label: 'Jenis / Type', value: 'Biasa / Ordinary' },
      ],
      expiryDate: passportExpiry,
      progress: getProgress(passportExpiry),
      status: getExpiryStatus(passportExpiry),
    },
  ];

  return (
    <div className="py-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="px-6 mb-3">
        <h2 className="font-bold text-[#003893] text-base mb-1">
          Status Sah Laku & Tamat Tempoh
        </h2>
        <p className="text-xs text-slate-600">Validity & Expiration Status</p>
      </div>

      {/* Horizontal Scroll */}
      <div className="overflow-x-auto scrollbar-hide px-6">
        <div className="flex gap-4">
          {documents.map((doc, index) => (
            <DocumentCard key={index} {...doc} />
          ))}
        </div>
      </div>
    </div>
  );
}
