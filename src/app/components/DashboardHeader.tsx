import { Bell, Menu } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="bg-[#003893] text-white px-6 py-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Menu className="w-6 h-6 text-white" />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
          <Bell className="w-6 h-6 text-white" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#CC0001] rounded-full border-2 border-white"></span>
        </button>
      </div>
      <h1 className="text-sm font-medium text-white/80">MyGOV</h1>
      <p className="text-xl font-semibold">Perkhidmatan Rakyat</p>
    </header>
  );
}