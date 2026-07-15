import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ArrowLeft, Menu, Bell, ShieldCheck, Car, Calendar, FileText, ChevronRight, Activity, MessageSquareText } from "lucide-react";
import { DesktopSidebar } from "../components/v3/DesktopSidebar";

export function RoadTax() {
  const location = useLocation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<"BM" | "EN">(location.state?.language || "BM");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                    {language === "BM" ? "Pembaharuan Cukai Jalan" : "Road Tax Renewal"}
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

            <div className="lg:max-w-3xl lg:mx-auto lg:px-8 lg:py-6 p-4">
              
              <div className="mb-6 flex flex-col items-center mt-12">
                {/* Visual Representation of Road Tax */}
                <div className="w-full max-w-[340px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white mb-6">
                  <div className="bg-[#003399] py-3 px-4 flex justify-between items-center text-white">
                    <div className="font-semibold text-sm">
                      {language === "BM" ? "LKM Digital (Cukai Jalan)" : "Digital LKM (Road Tax)"}
                    </div>
                    <Car className="w-5 h-5 opacity-80" />
                  </div>
                  
                  {/* HTML/CSS Representation of Road Tax */}
                  <div className="p-4 bg-slate-50 flex justify-center">
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-slate-300 shadow-md bg-gradient-to-br from-blue-50 via-cyan-50 to-pink-50 p-4 flex flex-col font-mono text-[10px] leading-tight text-slate-800">
                      {/* Holographic overlay simulation */}
                      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.9),_transparent_60%)] pointer-events-none"></div>
                      <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(0,0,0,0.02)_2px,rgba(0,0,0,0.02)_4px)] pointer-events-none"></div>

                      {/* Header */}
                      <div className="flex justify-between items-start mb-3 relative z-10 border-b border-slate-300 pb-2">
                        <div className="font-bold text-xs uppercase tracking-widest text-slate-700">MALAYSIA</div>
                        <div className="text-right">
                          <div className="font-bold uppercase text-[11px] text-slate-800">Cukai Jalan</div>
                          <div className="text-[8px] uppercase text-slate-600 mt-0.5">Lesen Kenderaan Motor</div>
                        </div>
                      </div>

                      {/* Main Content Grid */}
                      <div className="flex-1 grid grid-cols-2 gap-x-2 gap-y-3 relative z-10">
                        <div className="flex flex-col justify-center">
                          <div className="text-slate-500 text-[8px] uppercase mb-0.5">No. Pendaftaran</div>
                          <div className="font-bold text-[17px] text-black tracking-wider">BPW 7445</div>
                        </div>
                        <div className="flex flex-col justify-center items-end text-right">
                          <div className="text-slate-500 text-[8px] uppercase mb-0.5">Tarikh Tamat</div>
                          <div className="font-bold text-[17px] text-black">03.01.2025</div>
                        </div>
                        
                        <div className="flex flex-col justify-center">
                          <div className="text-slate-500 text-[8px] uppercase mb-0.5">Keupayaan Enjin</div>
                          <div className="font-bold text-sm">1496 SP</div>
                        </div>
                        <div className="flex flex-col justify-center items-end text-right">
                          <div className="text-slate-500 text-[8px] uppercase mb-0.5">Bayaran</div>
                          <div className="font-bold text-sm">RM 90.00</div>
                        </div>

                        <div className="flex flex-col justify-center">
                          <div className="text-slate-500 text-[8px] uppercase mb-0.5">Buatan</div>
                          <div className="font-bold text-xs truncate w-full">HONDA CITY</div>
                        </div>
                        <div className="flex flex-col justify-center items-end text-right">
                          <div className="text-slate-500 text-[8px] uppercase mb-0.5">Kelas Kegunaan</div>
                          <div className="font-bold text-[10px]">PERSENDIRIAN</div>
                        </div>
                      </div>

                      {/* Footer Barcode/Details */}
                      <div className="mt-2 pt-2 border-t border-slate-300 relative z-10 flex justify-between items-end">
                        <div className="flex items-center gap-1 opacity-60">
                           <div className="h-6 w-24 bg-[repeating-linear-gradient(90deg,#000,#000_2px,transparent_2px,transparent_4px,#000_4px,#000_5px,transparent_5px,transparent_8px)]"></div>
                        </div>
                        <div className="text-[7px] text-right text-slate-500">
                          Cetak: 02/01/2024<br/>
                          ID: LKM-9821445A
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 border-t border-slate-100 bg-white">
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-1">
                          {language === "BM" ? "No. Pendaftaran Kenderaan" : "Vehicle Registration No."}
                        </p>
                        <h2 className="text-2xl font-bold text-slate-800 tracking-wider">BPW 7445</h2>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 px-2.5 py-1 rounded-full text-xs font-semibold border border-red-100">
                          <Activity className="w-3.5 h-3.5" />
                          {language === "BM" ? "Tamat Tempoh" : "Expired"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Card */}
                <div className="w-full max-w-[340px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
                  <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#003399]" />
                    <h3 className="font-semibold text-slate-800">
                      {language === "BM" ? "Maklumat Kenderaan & Insurans" : "Vehicle & Insurance Info"}
                    </h3>
                  </div>
                  
                  <div className="p-5 space-y-4">
                    {/* Insurance Info */}
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-2 bg-blue-50 text-[#003399] rounded-lg">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-0.5">
                          {language === "BM" ? "Syarikat Insurans" : "Insurance Company"}
                        </p>
                        <p className="text-sm font-semibold text-slate-800 leading-tight">
                          ZURICH GENERAL INSURANCE MALAYSIA BERHAD
                        </p>
                      </div>
                    </div>

                    <hr className="border-slate-100" />

                    {/* Validity Dates */}
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-2 bg-blue-50 text-[#003399] rounded-lg">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div className="w-full">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <p className="text-xs text-slate-500 font-medium mb-0.5">
                              {language === "BM" ? "Tarikh Mula" : "Start Date"}
                            </p>
                            <p className="text-sm font-semibold text-slate-800">03 JAN 2024</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-xs text-red-500 font-medium mb-0.5">
                              {language === "BM" ? "Tarikh Tamat" : "Expiry Date"}
                            </p>
                            <p className="text-sm font-bold text-red-600">03 JAN 2025</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="w-full max-w-[340px]">
                  <button 
                    className="w-full bg-[#003399] hover:bg-[#002266] text-white py-4 rounded-xl font-bold shadow-md shadow-blue-900/20 transition-all flex items-center justify-center gap-2"
                    onClick={() => alert(language === "BM" ? "Membuka portal pembayaran..." : "Opening payment portal...")}
                  >
                    <span>{language === "BM" ? "Perbaharui Cukai Jalan" : "Renew Road Tax"}</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-3 px-4">
                    {language === "BM" 
                      ? "Pastikan insurans kenderaan anda telah diperbaharui sebelum membuat pembaharuan cukai jalan." 
                      : "Please ensure your vehicle insurance has been renewed before renewing your road tax."}
                  </p>
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
