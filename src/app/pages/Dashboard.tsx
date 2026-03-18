import { DashboardHeader } from '../components/DashboardHeader';
import { UserGreeting } from '../components/UserGreeting';
import { SecurityAlert } from '../components/SecurityAlert';
import { ServiceGrid } from '../components/ServiceGrid';
import { Link } from 'react-router';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Mobile container with max width */}
      <div className="max-w-md mx-auto min-h-screen bg-slate-50">
        <DashboardHeader />
        <UserGreeting />
        <SecurityAlert />
        <ServiceGrid />
        
        {/* Navigation Links */}
        <div className="px-6 mt-6 space-y-3">
          <Link 
            to="/v2" 
            className="block w-full bg-[#003893] hover:bg-[#002866] text-white text-center font-semibold py-3 rounded-lg transition-colors shadow-md"
          >
            Lihat Dashboard V2 / View Dashboard V2
          </Link>
          
          <Link 
            to="/super-app" 
            className="block w-full bg-[#003399] hover:bg-[#002266] text-white text-center font-semibold py-3 rounded-lg transition-colors shadow-md"
          >
            Buka Super-App / Open Super-App
          </Link>

          <Link 
            to="/login" 
            className="block w-full bg-[#FFC72C] hover:bg-[#E6B429] text-[#003399] text-center font-semibold py-3 rounded-lg transition-colors shadow-md"
          >
            Log Masuk / Login
          </Link>
        </div>
        
        {/* Footer with Malaysian government branding */}
        <footer className="mt-12 px-6 pb-6 text-center">
          <div className="text-xs text-slate-500">
            <p className="mb-1">Kerajaan Malaysia</p>
            <p>Malaysian Government</p>
          </div>
        </footer>
      </div>
    </div>
  );
}