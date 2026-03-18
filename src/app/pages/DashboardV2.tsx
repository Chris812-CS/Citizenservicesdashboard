import { DashboardHeaderV2 } from '../components/v2/DashboardHeaderV2';
import { SecurityIdentityStatus } from '../components/v2/SecurityIdentityStatus';
import { ValidityHub } from '../components/v2/ValidityHub';
import { QuickActions } from '../components/v2/QuickActions';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export function DashboardV2() {
  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Mobile container with max width */}
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl">
        {/* Back Button */}
        <div className="px-6 pt-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-[#003893] hover:text-[#002866] font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke V1
          </Link>
        </div>
        
        <DashboardHeaderV2 />
        <SecurityIdentityStatus />
        <ValidityHub />
        <QuickActions />
        
        {/* Footer with Malaysian government branding */}
        <footer className="mt-8 px-6 pb-8 text-center">
          <div className="flex justify-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-[#003893]"></div>
            <div className="w-2 h-2 rounded-full bg-[#CC0001]"></div>
            <div className="w-2 h-2 rounded-full bg-[#FFC72C]"></div>
          </div>
          <div className="text-xs text-slate-500">
            <p className="mb-1 font-semibold">Kerajaan Malaysia</p>
            <p>Malaysian Government • Malaysia MADANI</p>
          </div>
        </footer>
      </div>
    </div>
  );
}