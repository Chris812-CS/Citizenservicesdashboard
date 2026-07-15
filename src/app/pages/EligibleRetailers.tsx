import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  ArrowLeft,
  Search,
  MapPin,
  X,
  ScanLine,
  MessageSquareText,
  Filter,
  Menu,
  Bell,
} from "lucide-react";
import { DesktopSidebar } from "../components/v3/DesktopSidebar";
import saraLogo from "figma:asset/daff2dc35fdeb845ccd7082b493147e6d71344f2.png";

const MALAYSIAN_STATES = [
  "Semua Negeri",
  "Johor",
  "Kedah",
  "Kelantan",
  "Melaka",
  "Negeri Sembilan",
  "Pahang",
  "Perak",
  "Perlis",
  "Pulau Pinang",
  "Sabah",
  "Sarawak",
  "Selangor",
  "Terengganu",
  "W.P. Kuala Lumpur",
  "W.P. Labuan",
  "W.P. Putrajaya",
];

const MOCK_RETAILERS = [
  { id: 1, name: "99 Speedmart", state: "Selangor", address: "Klang, Selangor", type: "Rangkaian Peruncitan" },
  { id: 2, name: "Mydin", state: "W.P. Kuala Lumpur", address: "Jalan Masjid India, KL", type: "Pasaraya Besar" },
  { id: 3, name: "NSK Trade City", state: "Selangor", address: "Kuchai Lama, KL", type: "Pasar Borong" },
  { id: 4, name: "Giant Hypermarket", state: "Johor", address: "Plentong, Johor Bahru", type: "Pasaraya Besar" },
  { id: 5, name: "Econsave", state: "Penang", address: "Butterworth, Penang", type: "Pasaraya" },
  { id: 6, name: "KK Super Mart", state: "Selangor", address: "Petaling Jaya, Selangor", type: "Kedai Serbaneka" },
  { id: 7, name: "Tesco / Lotus's", state: "Pulau Pinang", address: "Tanjung Pinang", type: "Pasaraya Besar" },
  { id: 8, name: "Pasaraya CS", state: "Negeri Sembilan", address: "Nilai, Negeri Sembilan", type: "Pasaraya" },
  { id: 9, name: "FamilyMart", state: "W.P. Kuala Lumpur", address: "KL Sentral", type: "Kedai Serbaneka" },
];

export function EligibleRetailers() {
  const location = useLocation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<"BM" | "EN">(
    location.state?.language || "BM",
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("Semua Negeri");
  const [isFiltered, setIsFiltered] = useState(false);
  const [displayedRetailers, setDisplayedRetailers] = useState(MOCK_RETAILERS);

  const handleSearch = () => {
    let filtered = MOCK_RETAILERS;
    if (searchQuery) {
      filtered = filtered.filter((r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedState !== "Semua Negeri") {
      filtered = filtered.filter((r) => r.state === selectedState);
    }
    setDisplayedRetailers(filtered);
    setIsFiltered(true);
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedState("Semua Negeri");
    setDisplayedRetailers(MOCK_RETAILERS);
    setIsFiltered(false);
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
                    {language === "BM"
                      ? "Peruncit Layak"
                      : "Eligible Retailers"}
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
              className="absolute top-20 left-4 z-30 p-2.5 bg-black/10 hover:bg-black/20 text-slate-800 rounded-full backdrop-blur-sm transition-all shadow-sm"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="lg:max-w-3xl lg:mx-auto lg:px-8 lg:py-6 p-4">
              
              {/* Logo Header */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6 flex justify-center items-center">
                <img src={saraLogo} alt="Sumbangan Asas Rahmah" className="h-24 object-contain" />
              </div>

              {/* Scan Barcode Button (Mobile Only) */}
              <div className="lg:hidden mb-6">
                <button 
                  className="w-full bg-[#003399] text-white py-4 rounded-2xl shadow-md font-semibold flex items-center justify-center gap-3 hover:bg-[#002266] transition-colors active:scale-95"
                  onClick={() => alert("Scan functionality would open camera here.")}
                >
                  <ScanLine className="w-6 h-6" />
                  {language === "BM" ? "Imbas Kod Bar Item" : "Scan Item Barcode"}
                </button>
              </div>

              {/* Search and Filter Area */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-6">
                <h2 className="font-semibold text-slate-800 mb-4">
                  {language === "BM" ? "Cari Peruncit" : "Find Retailer"}
                </h2>
                
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder={language === "BM" ? "Masukkan nama kedai..." : "Enter store name..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#003399]/50 focus:border-[#003399]"
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#003399]/50 focus:border-[#003399]"
                    >
                      {MALAYSIAN_STATES.map((state) => (
                        <option key={state} value={state}>
                          {state === "Semua Negeri" && language === "EN" ? "All States" : state}
                        </option>
                      ))}
                    </select>
                    <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleReset}
                      className="flex-1 py-3 text-[#003399] bg-[#003399]/10 hover:bg-[#003399]/20 font-semibold rounded-xl transition-colors text-sm"
                    >
                      {language === "BM" ? "Set Semula" : "Reset"}
                    </button>
                    <button
                      onClick={handleSearch}
                      className="flex-[2] py-3 text-white bg-[#003399] hover:bg-[#002266] font-semibold rounded-xl transition-colors text-sm shadow-sm"
                    >
                      {language === "BM" ? "Cari" : "Search"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Results List */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-800">
                    {language === "BM" ? "Senarai Peruncit" : "Retailer List"}
                  </h3>
                  <span className="text-xs font-medium text-slate-500 bg-slate-200 px-2.5 py-1 rounded-full">
                    {displayedRetailers.length} {language === "BM" ? "Ditemui" : "Found"}
                  </span>
                </div>

                {displayedRetailers.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {displayedRetailers.map((retailer) => (
                      <div key={retailer.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#003399]/10 text-[#003399] flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800 text-sm">{retailer.name}</h4>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{retailer.address}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                              {retailer.type}
                            </span>
                            <span className="text-[10px] font-medium bg-[#003399]/10 text-[#003399] px-2 py-0.5 rounded">
                              {retailer.state}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-10 text-center flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-3">
                      <Search className="w-8 h-8" />
                    </div>
                    <p className="text-slate-600 font-medium">
                      {language === "BM" ? "Tiada peruncit ditemui." : "No retailers found."}
                    </p>
                    <p className="text-slate-400 text-sm mt-1">
                      {language === "BM" ? "Sila cuba kata kunci atau negeri lain." : "Please try another keyword or state."}
                    </p>
                  </div>
                )}
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
