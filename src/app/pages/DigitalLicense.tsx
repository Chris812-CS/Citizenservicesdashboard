import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ArrowLeft, Menu, MessageSquareText, FileCheck, ShieldAlert, BadgeCheck, QrCode, Bell } from "lucide-react";
import { DesktopSidebar } from "../components/v3/DesktopSidebar";
import image2 from "../../imports/image-2.png";
import userAvatar from "figma:asset/57e84f0ccfbd1f3c80ac24f0d773a7c3bb7404c5.png";

export function DigitalLicense() {
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
          <div className="max-w-md mx-auto min-h-screen bg-[#F8F9FA] shadow-2xl lg:max-w-none lg:shadow-none pb-20 relative">
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
                    {language === "BM" ? "Lesen Memandu Digital" : "Digital Driving License"}
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
              className="absolute top-[72px] left-4 z-30 p-2.5 bg-white text-[#003399] hover:bg-slate-50 rounded-full shadow-md border border-slate-100 transition-all"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="lg:max-w-2xl lg:mx-auto lg:px-8 lg:py-8 p-4 pt-8 md:pt-16">
              
              <div className="mb-6 pl-14 lg:pl-0">
                <h2 className="text-xl font-bold text-slate-800 mb-1">
                  {language === "BM" ? "Maklumat Lesen" : "License Information"}
                </h2>
                <p className="text-sm text-slate-500">
                  {language === "BM" 
                    ? "Papar dan tunjukkan lesen memandu digital anda apabila diminta oleh pihak berkuasa." 
                    : "View and present your digital driving license when requested by authorities."}
                </p>
              </div>

              {/* License Card */}
              <div className="w-full max-w-[340px] sm:max-w-[380px] mx-auto rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200 relative bg-white flex flex-col" style={{ height: "260px" }}>
                
                {/* Header Banner */}
                <div className="bg-[#003399] text-white py-2.5 px-3 md:px-4 flex items-center justify-between shadow-sm z-10 relative shrink-0 h-[56px] border-b-[3px] border-amber-400">
                  <div className="flex items-center gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Coat_of_arms_of_Malaysia.svg/500px-Coat_of_arms_of_Malaysia.svg.png" alt="Jata Negara" className="h-8 md:h-9 w-auto object-contain brightness-0 invert opacity-90" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    <div className="flex flex-col ml-0.5">
                      <h3 className="font-black text-[13px] md:text-sm tracking-[0.15em] leading-none">MALAYSIA</h3>
                      <h4 className="font-bold text-[10px] md:text-xs tracking-wide text-white/90 mt-0.5">LESEN MEMANDU</h4>
                    </div>
                  </div>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Jabatan_Pengangkutan_Jalan_Malaysia_logo.png" alt="JPJ" className="h-7 md:h-8 w-auto object-contain brightness-0 invert opacity-90" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </div>

                {/* Body Content */}
                <div className="relative p-4 bg-white overflow-hidden flex-1 flex flex-col justify-center">
                  
                  {/* Background Watermark/Pattern */}
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-[0.03] pointer-events-none w-[120px] h-[120px] flex items-center justify-center">
                    <ShieldAlert className="w-full h-full text-[#003399]" />
                  </div>

                  <div className="flex gap-3 relative z-10 items-stretch">
                    
                    {/* Left Column: Photo */}
                    <div className="shrink-0 w-[85px]">
                      <div className="w-full h-[110px] bg-slate-200 rounded border border-slate-200 shadow-sm overflow-hidden">
                        <img 
                          src={userAvatar}
                          alt="Portrait" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="flex-1 flex flex-col justify-between text-slate-900 overflow-hidden py-0.5">
                      
                      <div>
                        <p className="text-[9px] font-semibold text-slate-500 uppercase leading-none mb-0.5">Nama / Name</p>
                        <p className="text-xs font-bold leading-tight uppercase truncate" title="Hemalata A/P Vasudavan">Hemalata A/P Vasudavan</p>
                      </div>

                      <div>
                        <p className="text-[9px] font-semibold text-slate-500 uppercase leading-none mb-0.5">No. Kad Pengenalan / IC No.</p>
                        <p className="text-xs font-bold tracking-wider">790820-14-5782</p>
                      </div>

                      <div className="flex gap-1.5 justify-between">
                        <div className="w-8">
                          <p className="text-[8px] font-semibold text-slate-500 uppercase leading-none mb-0.5">Kelas</p>
                          <p className="text-lg font-black text-[#003399] leading-none">D</p>
                        </div>
                        
                        <div className="flex-1">
                          <p className="text-[8px] md:text-[9px] font-semibold text-slate-500 uppercase leading-none mb-0.5">Tarikh Mula</p>
                          <p className="text-[11px] md:text-xs font-bold">01/01/2020</p>
                        </div>
                        
                        <div className="flex-1">
                          <p className="text-[8px] md:text-[9px] font-semibold text-slate-500 uppercase leading-none mb-0.5">Tarikh Tamat</p>
                          <p className="text-[11px] md:text-xs font-bold">20/08/2027</p>
                        </div>
                      </div>

                      {/* Status Tag */}
                      <div className="mt-1 inline-flex self-start items-center gap-1 bg-green-100 border border-green-200 text-green-700 px-1.5 py-0.5 rounded shadow-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                        <span className="text-[8px] font-bold uppercase tracking-wider leading-none">
                          {language === "BM" ? "Aktif" : "Active"}
                        </span>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="bg-slate-50 py-1.5 px-4 border-t border-slate-100 flex justify-between items-center text-[9px] text-slate-500 shrink-0 h-[30px]">
                  <div className="flex items-center gap-1">
                    <BadgeCheck className="w-3 h-3 text-[#003399]" />
                    <span className="font-medium text-slate-600">Sah melalui sistem JPJ</span>
                  </div>
                  <span className="font-medium opacity-50">#629910-A</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                <button className="bg-white border-2 border-[#003399] text-[#003399] py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-colors">
                  {language === "BM" ? "Muat Turun PDF" : "Download PDF"}
                </button>
                <button className="bg-[#003399] text-white py-3 rounded-xl font-bold text-sm shadow-md hover:bg-[#002266] transition-colors flex flex-col items-center leading-tight">
                  <span>{language === "BM" ? "Perbaharui Lesen" : "Renew License"}</span>
                  <span className="text-[10px] font-normal opacity-80">Expiry: 20/08/2027</span>
                </button>
              </div>

            </div>

            {/* Chatbot Floating Button */}
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
