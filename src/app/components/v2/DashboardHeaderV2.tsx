import { Shield, Bell, Bot } from 'lucide-react';

export function DashboardHeaderV2() {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Selamat Pagi' : currentHour < 18 ? 'Selamat Petang' : 'Selamat Malam';

  return (
    <header className="bg-gradient-to-r from-[#003893] to-[#0047AB] text-white px-6 py-6 rounded-b-3xl shadow-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* Jata Negara Placeholder */}
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
            <Shield className="w-6 h-6 text-[#FFC72C]" />
          </div>
          <div>
            <p className="text-xs text-white/80">KERAJAAN MALAYSIA</p>
            <p className="font-bold text-sm">Malaysia MADANI</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Chatbot Helpdesk">
            <Bot className="w-6 h-6 text-white" />
          </button>
          
          <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Bell className="w-6 h-6 text-white" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#CC0001] rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>

      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold mb-1">{greeting},</h1>
        <p className="text-lg text-white/90">Ahmad bin Abdullah</p>
      </div>
    </header>
  );
}