import {
  Ticket,
  ChevronRight,
  MessageSquareMore,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router";

interface CitizenSupportHubProps {
  language: "BM" | "EN";
}

export function CitizenSupportHub({
  language,
}: CitizenSupportHubProps) {
  const navigate = useNavigate();

  return (
    <div
      className="mt-8 mb-4 px-4 lg:px-0"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-[#003399]">
            {language === "BM"
              ? "Bantuan Rakyat (Sokongan)"
              : "Citizen Support Hub"}
          </h2>
          <p className="text-sm text-slate-500">
            {language === "BM"
              ? "Pusat bantuan sehenti anda"
              : "Your one-stop support center"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ticket Tracking Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group flex flex-col">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-full -mr-10 -mt-10 opacity-50"></div>

          <div className="flex-1">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center border border-orange-100 shrink-0">
                  <Ticket className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-[#003399] text-base leading-tight">
                    {language === "BM"
                      ? "Status Tiket Sokongan"
                      : "Support Ticket Status"}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium flex items-start gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span className="leading-tight">
                      {language === "BM"
                        ? "Maklum balas dalam masa 24 jam."
                        : "Feedback within 24 hours."}
                    </span>
                  </p>
                </div>
              </div>
              <span className="bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full text-[10px] font-bold border border-orange-200 text-center leading-tight whitespace-nowrap ml-2">
                {language === "BM" ? (
                  <>
                    1 Tiket<br />Aktif
                  </>
                ) : (
                  <>
                    1 Active<br />Ticket
                  </>
                )}
              </span>
            </div>

            <div className="space-y-3 mt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 font-medium">
                  TK-20260329-001
                </span>
                <span className="text-[#003399] font-bold text-sm tracking-tight">
                  {language === "BM"
                    ? "Sedang Diproses"
                    : "In Progress"}
                </span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-orange-500 h-2.5 rounded-full w-[45%]"></div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 w-full">
            <button 
              onClick={() => navigate('/feedback', { state: { language, tab: 'support' } })}
              className="w-full bg-white hover:bg-slate-50 text-[#003399] border border-slate-200 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 group-hover:border-[#003399]/30"
            >
              {language === "BM"
                ? "Lihat Semua Tiket"
                : "View All Tickets"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AI Assistant Integration Card */}
        <div
          className="bg-gradient-to-br from-[#003399] to-[#004DB8] text-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer flex flex-col"
          onClick={() => navigate("/chatbot", { state: { language } })}
        >
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-[#FFC72C]/20 rounded-full blur-xl pointer-events-none"></div>

          <div className="flex-1 relative z-10">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 backdrop-blur-sm shadow-inner shrink-0">
                <MessageSquareMore className="w-6 h-6 text-white" />
              </div>
              <div className="mt-0.5">
                <h3 className="font-bold text-lg mt-3 flex items-center gap-2 leading-none">
                  {language === "BM" ? "Tanya MyAI" : "Ask MyAI"}
                  <span className="bg-[#FFC72C] text-[#003399] text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Beta
                  </span>
                </h3>
              </div>
            </div>
          </div>

                          <p className="text-blue-100 text-sm leading-relaxed mt-2 pr-4">
                  {language === "BM"
                    ? "Dapatkan jawapan segera untuk soalan lazim mengenai perkhidmatan kerajaan."
                    : "Get instant answers for frequently asked questions about government services."}
                </p>

          <div className="mt-auto pt-6 w-full relative z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/chatbot", { state: { language } });
              }}
              className="w-full bg-white text-[#003399] hover:bg-blue-50 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              {language === "BM"
                ? "Hubungi Kami / Tanya AI"
                : "Contact Us / Ask AI"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}