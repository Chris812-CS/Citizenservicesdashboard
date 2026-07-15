import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  ArrowLeft,
  Wallet,
  Store,
  Calendar,
  Receipt,
  Menu,
  ChevronRight,
  MessageSquareText,
  MessageSquare,
  Bell,
} from "lucide-react";
import { DesktopSidebar } from "../components/v3/DesktopSidebar";

export function SaraBalance() {
  const location = useLocation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<"BM" | "EN">(
    location.state?.language || "BM",
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const transactions = [
    {
      id: "TRX-8829104",
      date: "2026-03-28T14:30:00",
      store: "NSK Kuchai Lama",
      amount: 5.5,
      status: "success",
    },
    {
      id: "TRX-8829032",
      date: "2026-03-25T10:15:00",
      store: "99 Speedmart",
      amount: 4.36,
      status: "success",
    },
    {
      id: "TRX-8828991",
      date: "2026-03-21T18:45:00",
      store: "Mydin",
      amount: 2.5,
      status: "success",
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(
      language === "BM" ? "ms-MY" : "en-US",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      },
    );
  };

  return (
    <div
      className="min-h-screen bg-[#F8F9FA]"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
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

        <div className="flex-1 lg:overflow-auto">
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
                    {language === "BM"
                      ? "Baki & Sejarah Transaksi"
                      : "Balance & Transaction History"}
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
              {/* Balance Card */}
              <div className="bg-gradient-to-br from-[#003399] to-[#005522] rounded-2xl p-6 text-white mb-6 shadow-lg relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="bg-white/20 p-3 rounded-full mb-3 backdrop-blur-sm">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white/80 text-sm font-medium mb-1">
                    {language === "BM"
                      ? "Baki Semasa Dompet SARA"
                      : "Current SARA Wallet Balance"}
                  </p>
                  <div className="flex items-start justify-center gap-1">
                    <span className="text-xl font-semibold mt-1">
                      RM
                    </span>
                    <span className="text-5xl font-bold tracking-tight">
                      87.64
                    </span>
                  </div>
                  <p className="text-white/60 text-xs mt-3">
                    {language === "BM"
                      ? "Dikemaskini: 02 Apr 2026, 10:30 AM"
                      : "Updated: 02 Apr 2026, 10:30 AM"}
                  </p>
                </div>
              </div>

              {/* Transactions List */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <h2 className="font-semibold text-slate-800">
                    {language === "BM"
                      ? "Sejarah Pembelian"
                      : "Purchase History"}
                  </h2>
                  <span className="text-xs font-medium bg-[#003399]/10 text-[#003399] px-2.5 py-1 rounded-full">
                    {language === "BM"
                      ? "Jumlah Dibelanjakan: RM 12.36"
                      : "Total Spent: RM 12.36"}
                  </span>
                </div>

                <div className="divide-y divide-slate-100">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-[#003399]/10 group-hover:text-[#003399] transition-colors">
                            <Store className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 text-sm">
                              {tx.store}
                            </p>
                            <p className="text-xs text-slate-500 font-medium">
                              {tx.id}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#CC0001]">
                            -RM {tx.amount.toFixed(2)}
                          </p>
                          <p className="text-xs text-emerald-600 font-medium">
                            {language === "BM"
                              ? "Berjaya"
                              : "Success"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pl-13">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(tx.date)}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-[#003399] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          {language === "BM"
                            ? "Lihat Resit"
                            : "View Receipt"}
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-slate-100">
                  <button className="w-full py-2.5 flex items-center justify-center gap-2 text-sm font-semibold text-[#003399] hover:bg-slate-50 rounded-xl transition-colors border border-slate-200">
                    <Receipt className="w-4 h-4" />
                    {language === "BM"
                      ? "Muat Turun Penyata"
                      : "Download Statement"}
                  </button>
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