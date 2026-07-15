import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ArrowLeft, Menu, Bell, AlertTriangle, User, Hash, Clock, MapPin, CreditCard, Car, MessageSquareText } from "lucide-react";
import { DesktopSidebar } from "../components/v3/DesktopSidebar";

export function SummonsCheck() {
  const location = useLocation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<"BM" | "EN">(location.state?.language || "BM");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mocked Saman Data
  const summonsList = [
    {
      id: "s1",
      vehicle: "BPW 7445",
      idNumber: "AD123456789",
      dateTime: "12-Feb-2024, 14:30",
      location: "Lebuhraya PLUS KM 255.4 (Arah Selatan)",
      amount: "RM 300.00"
    },
    {
      id: "s2",
      vehicle: "VBC 1234",
      idNumber: "PDRM987654321",
      dateTime: "05-Jan-2024, 08:15",
      location: "Jalan Ampang, Kuala Lumpur",
      amount: "RM 150.00"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA]" style={{ fontFamily: "Poppins, sans-serif" }}>
      <DesktopSidebar
        language={language}
        isMobile
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      
      <div className="lg:flex lg:min-h-screen">
        <div className="hidden lg:block">
          <DesktopSidebar language={language} />
        </div>

        <div className="flex-1 lg:overflow-auto relative">
          <div className="max-w-md mx-auto min-h-screen bg-[#F8F9FA] shadow-2xl lg:max-w-none lg:shadow-none pb-24 relative">
            {/* Header */}
            <header className="bg-white sticky top-0 z-40 border-b border-slate-200">
              <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="lg:hidden p-2 -ml-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                    aria-label="Menu"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                  <h1 className="font-semibold text-lg text-slate-800 ml-1 lg:ml-0 truncate">
                    {language === "BM" ? "Semakan Saman" : "Summons Check"}
                  </h1>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setLanguage(language === "BM" ? "EN" : "BM")}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-[#003399] font-bold text-xs hover:bg-slate-200 transition-colors"
                  >
                    {language}
                  </button>
                  <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                  </button>
                </div>
              </div>
            </header>

            {/* Floating Back Button */}
            <button
              onClick={() => navigate("/super-app", { state: { language } })}
              className="absolute top-20 left-4 z-30 p-2.5 bg-white text-[#003399] hover:bg-slate-50 rounded-full shadow-md border border-slate-100 transition-all"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="lg:max-w-3xl lg:mx-auto lg:px-8 lg:py-6 p-4 pt-16 mt-4">
              
              <div className="mb-6 flex flex-col items-center">
                
                {/* User Identity Profile Card */}
                <div className="w-full max-w-[340px] bg-[#003399] text-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-6 relative">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <User className="w-24 h-24" />
                  </div>
                  <div className="p-5 relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 bg-white/20 rounded-full backdrop-blur-sm">
                        <User className="w-6 h-6" />
                      </div>
                      <h2 className="font-semibold text-lg tracking-wide">
                        {language === "BM" ? "Maklumat Pemilik" : "Owner Details"}
                      </h2>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-blue-200 mb-0.5">
                          {language === "BM" ? "Nama" : "Name"}
                        </p>
                        <p className="font-bold text-lg leading-tight uppercase">HEMALATA A/P VASUDAVAN</p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-200 mb-0.5">
                          {language === "BM" ? "No. Kad Pengenalan" : "Identity No. (IC Number)"}
                        </p>
                        <p className="font-bold text-lg tracking-wider">790820-14-5782</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Title */}
                <div className="w-full max-w-[340px] mb-4 flex items-center justify-between">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    {language === "BM" ? "Rekod Saman" : "Summons Records"}
                  </h3>
                  <span className="bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full text-xs font-bold">
                    2 {language === "BM" ? "Saman" : "Summons"}
                  </span>
                </div>

                {/* Summons List */}
                <div className="w-full max-w-[340px] space-y-4">
                  {summonsList.map((saman) => (
                    <div key={saman.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                      <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-slate-500" />
                          <span className="font-bold text-slate-800 tracking-wider">{saman.vehicle}</span>
                        </div>
                        <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-md border border-red-100 uppercase">
                          {language === "BM" ? "Belum Bayar" : "Unpaid"}
                        </span>
                      </div>
                      
                      <div className="p-4 space-y-3">
                        <div className="flex items-start gap-3">
                          <Hash className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-slate-500 font-medium">
                              {language === "BM" ? "No. Saman / Notis" : "Summons / Notice No."}
                            </p>
                            <p className="text-sm font-semibold text-slate-800">{saman.idNumber}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Clock className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-slate-500 font-medium">
                              {language === "BM" ? "Tarikh & Masa" : "Date & Time"}
                            </p>
                            <p className="text-sm font-medium text-slate-800">{saman.dateTime}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-slate-500 font-medium">
                              {language === "BM" ? "Lokasi" : "Location"}
                            </p>
                            <p className="text-sm font-medium text-slate-800 leading-snug">{saman.location}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-[#003399]" />
                          <span className="text-xs text-slate-500 font-medium">
                            {language === "BM" ? "Jumlah Bayaran" : "Payment Amount"}
                          </span>
                        </div>
                        <span className="font-bold text-lg text-slate-800">{saman.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Floating Chatbot Button */}
            <button
              onClick={() => navigate("/chatbot", { state: { language, from: location.pathname } })}
              className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 bg-[#003399] text-white p-4 rounded-full shadow-xl hover:bg-[#002266] transition-transform hover:scale-105 z-50 flex items-center justify-center group"
              aria-label="AI Chatbot"
            >
              <MessageSquareText className="w-6 h-6" />
              <div className="absolute right-full mr-4 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {language === "BM" ? "Tanya Chatbot AI" : "Ask AI Chatbot"}
              </div>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}