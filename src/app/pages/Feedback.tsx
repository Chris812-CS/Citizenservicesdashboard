import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { DesktopSidebar } from "../components/v3/DesktopSidebar";
import { SuperAppHeader } from "../components/v3/SuperAppHeader";
import {
  ArrowLeft,
  Ticket,
  AlertCircle,
  CheckCircle,
  Upload,
  Star,
  Frown,
  Meh,
  Smile,
  ChevronRight,
  Check,
  Bot,
  Bell,
  PlusCircle,
  X,
  ShieldAlert,
  Eye,
  Clock,
  Users,
  Database,
  FileText,
  ChevronDown,
  BadgeCheck,
  Lock,
  Trash2,
  Download,
} from "lucide-react";

type TabType = "support" | "policy";

export function Feedback() {
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLanguage] = useState<"BM" | "EN">(
    location.state?.language || "EN",
  );

  const [activeTab, setActiveTab] = useState<TabType>(
    location.state?.tab || "support",
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [jitDismissed, setJitDismissed] = useState(false);
  const [transparencyOpen, setTransparencyOpen] = useState(false);

  // Support Form State
  const [supportCategory, setSupportCategory] = useState("");
  const [supportDescription, setSupportDescription] =
    useState("");
  const [imageUploaded, setImageUploaded] = useState(false);

  // Policy Feedback State
  const [sentiment, setSentiment] = useState<number | null>(
    null,
  );
  const [clarityRating, setClarityRating] = useState<number>(0);
  const [vehicleType, setVehicleType] = useState("");
  const [impactExplanation, setImpactExplanation] =
    useState("");
  const [showAppealSuccess, setShowAppealSuccess] =
    useState(false);

  const t = {
    title: language === "BM" ? "Maklum Balas" : "Feedback",
    supportTab:
      language === "BM" ? "Sokongan App" : "App Support",
    policyTab:
      language === "BM" ? "Dasar Awam" : "Public Policy",

    // Support Section
    activeTickets:
      language === "BM"
        ? "Tiket Aktif Anda"
        : "Your Active Tickets",
    resolved: language === "BM" ? "Selesai" : "Resolved",
    pending: language === "BM" ? "Dalam Proses" : "In Progress",
    newTicket:
      language === "BM"
        ? "Cipta Tiket Baru"
        : "Create New Ticket",
    category:
      language === "BM" ? "Kategori Masalah" : "Issue Category",
    catWallet:
      language === "BM"
        ? "Dompet / Pembayaran"
        : "Wallet / Payment",
    catIdentity:
      language === "BM"
        ? "Identiti / MyKAD"
        : "Identity / MyKAD",
    catBug:
      language === "BM"
        ? "Masalah Teknikal / Pepijat"
        : "Technical Issue / Bug",
    uploadImage:
      language === "BM"
        ? "Muat Naik Tangkapan Skrin"
        : "Upload Screenshot",
    uploadDesc:
      language === "BM"
        ? "Tekan untuk memilih gambar (Pilihan)"
        : "Tap to select an image (Optional)",
    describeIssue:
      language === "BM"
        ? "Terangkan Masalah Anda"
        : "Describe Your Issue",
    submitTicket:
      language === "BM" ? "Hantar Tiket" : "Submit Ticket",

    // Policy Section
    policyAnnouncements:
      language === "BM"
        ? "Pengumuman Dasar Terkini"
        : "Recent Policy Announcements",
    fuelSubsidy:
      language === "BM"
        ? "Penyelarasan Subsidi Petrol: 300L ke 200L"
        : "Fuel Subsidy Realignment: 300L to 200L",
    fuelDate:
      language === "BM"
        ? "Berkuatkuasa: 1 Mei 2026"
        : "Effective: May 1, 2026",
    sentimentQuestion:
      language === "BM"
        ? "Apakah pandangan anda tentang dasar ini?"
        : "What is your view on this policy?",
    highlyDisagree:
      language === "BM"
        ? "Sangat Tidak Bersetuju"
        : "Highly Disagree",
    highlyAgree:
      language === "BM" ? "Sangat Bersetuju" : "Highly Agree",
    clarityQuestion:
      language === "BM"
        ? "Penilaian Kejelasan Dasar (1-5 Bintang)"
        : "Policy Clarity Rating (1-5 Stars)",
    vehicleType:
      language === "BM"
        ? "Jenis Kenderaan Utama Anda"
        : "Your Primary Vehicle Type",
    carUnder2L:
      language === "BM" ? "Kereta (< 2.0L)" : "Car (< 2.0L)",
    carOver2L:
      language === "BM" ? "Kereta (> 2.0L)" : "Car (> 2.0L)",
    motorcycle: language === "BM" ? "Motosikal" : "Motorcycle",
    impactLabel:
      language === "BM"
        ? "Bagaimana perubahan ini mempengaruhi kos sara hidup anda?"
        : "How does this change affect your cost of living?",
    submitFeedback:
      language === "BM"
        ? "Hantar Maklum Balas"
        : "Submit Feedback",
    appealButton:
      language === "BM"
        ? "Mohon Pengecualian Kuota (E-Hailing/Logistik)"
        : "Apply for Quota Waiver (E-Hailing/Logistics)",
  };

  const sentimentIcons = [
    {
      value: 1,
      icon: <Frown className="w-8 h-8" />,
      color: "text-red-500",
      bg: "bg-red-50",
    },
    {
      value: 2,
      icon: <Frown className="w-8 h-8 opacity-70" />,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      value: 3,
      icon: <Meh className="w-8 h-8" />,
      color: "text-yellow-500",
      bg: "bg-yellow-50",
    },
    {
      value: 4,
      icon: <Smile className="w-8 h-8 opacity-70" />,
      color: "text-lime-500",
      bg: "bg-lime-50",
    },
    {
      value: 5,
      icon: <Smile className="w-8 h-8" />,
      color: "text-green-500",
      bg: "bg-green-50",
    },
  ];

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
          <div className="max-w-md mx-auto min-h-screen bg-slate-50 shadow-2xl lg:max-w-none lg:shadow-none relative flex flex-col">
            <SuperAppHeader
              language={language}
              onLanguageToggle={() => setLanguage(language === "BM" ? "EN" : "BM")}
              onMenuClick={() => setIsMobileMenuOpen(true)}
            />

            {/* Back Navigation Bar */}
            <div className="bg-[#003399] px-4 py-3 flex items-center text-white lg:hidden">
              <button
                onClick={() => navigate(-1)}
                className="p-1 -ml-1 mr-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="font-bold text-sm">{t.title}</h2>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:flex items-center gap-3 p-6 lg:max-w-5xl lg:mx-auto w-full">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-600"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-[#003399]">
                  {t.title}
                </h1>
              </div>
            </div>

            <div className="lg:max-w-5xl lg:mx-auto w-full flex flex-col flex-1">
              {/* Tabs */}
              <div className="flex p-4 gap-2 bg-white border-b border-slate-200">
          <button
            onClick={() => setActiveTab("support")}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-colors text-center ${
              activeTab === "support"
                ? "bg-[#003399] text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {t.supportTab}
          </button>
          <button
            onClick={() => setActiveTab("policy")}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-colors text-center ${
              activeTab === "policy"
                ? "bg-[#003399] text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {t.policyTab}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-8">
          {/* --- TAB 1: SUPPORT TICKETS --- */}
          {activeTab === "support" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              {/* Active Tickets Dashboard */}
              <section>
                <h2 className="text-lg font-bold text-[#003399] mb-4 flex items-center gap-2">
                  <Ticket className="w-5 h-5" />
                  {t.activeTickets}
                </h2>

                <div className="space-y-4">
                  {/* Ticket 1: Pending */}
                  <div className="bg-white border-2 border-slate-100 rounded-2xl p-4 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-orange-400"></div>
                    <div className="flex justify-between items-start mb-2 pl-2">
                      <div>
                        <span className="text-xs font-bold text-slate-500">
                          TK-20260329-001
                        </span>
                        <h3 className="font-bold text-slate-800 text-base mt-1">
                          MyKAD Verification Failed
                        </h3>
                      </div>
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap border border-orange-200">
                        {t.pending}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 pl-2 mb-3 line-clamp-2">
                      I tried verifying my digital identity but
                      the camera wouldn't focus properly.
                    </p>
                    <div className="pl-2 flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                      We are reviewing your submission.
                    </div>
                  </div>

                  {/* Ticket 2: Resolved */}
                  <div className="bg-white border-2 border-slate-100 rounded-2xl p-4 shadow-sm relative overflow-hidden opacity-75">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-green-500"></div>
                    <div className="flex justify-between items-start mb-2 pl-2">
                      <div>
                        <span className="text-xs font-bold text-slate-500">
                          TK-20260215-089
                        </span>
                        <h3 className="font-bold text-slate-800 text-base mt-1">
                          SARA Balance Not Updating
                        </h3>
                      </div>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap border border-green-200">
                        {t.resolved}
                      </span>
                    </div>
                    <div className="pl-2 flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Issue fixed in latest update.
                    </div>
                  </div>
                </div>
              </section>

              {/* New Ticket Form Toggle */}
              {!showNewTicketForm ? (
                <button
                  onClick={() => setShowNewTicketForm(true)}
                  className="w-full bg-white border-2 border-[#003399] text-[#003399] hover:bg-blue-50 font-bold py-4 rounded-xl transition-colors shadow-sm text-base flex justify-center items-center gap-2 mt-6"
                >
                  <PlusCircle className="w-5 h-5" />
                  {t.newTicket}
                </button>
              ) : (
                <section className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-bold text-slate-800">
                      {t.newTicket}
                    </h2>
                    <button
                      onClick={() =>
                        setShowNewTicketForm(false)
                      }
                      className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-5">
                    {/* Category Dropdown */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        {t.category}
                      </label>
                      <select
                        value={supportCategory}
                        onChange={(e) =>
                          setSupportCategory(e.target.value)
                        }
                        className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:border-[#003399] font-medium"
                      >
                        <option value="" disabled>
                          Select Category
                        </option>
                        <option value="wallet">
                          {t.catWallet}
                        </option>
                        <option value="identity">
                          {t.catIdentity}
                        </option>
                        <option value="bug">{t.catBug}</option>
                      </select>
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        {t.uploadImage}
                      </label>
                      <div
                        onClick={() =>
                          setImageUploaded(!imageUploaded)
                        }
                        className={`w-full border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                          imageUploaded
                            ? "border-green-500 bg-green-50"
                            : "border-slate-300 bg-white hover:bg-slate-50"
                        }`}
                      >
                        {imageUploaded ? (
                          <div className="flex flex-col items-center gap-2 text-green-600">
                            <CheckCircle className="w-8 h-8" />
                            <span className="font-bold text-sm">
                              Screenshot_2026.png
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-slate-500">
                            <Upload className="w-8 h-8 text-slate-400" />
                            <span className="text-sm">
                              {t.uploadDesc}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        {t.describeIssue}
                      </label>
                      <textarea
                        value={supportDescription}
                        onChange={(e) =>
                          setSupportDescription(e.target.value)
                        }
                        className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-base min-h-[120px] focus:outline-none focus:border-[#003399] resize-none"
                        placeholder="e.g. The app crashed when I tried to view my road tax."
                      ></textarea>
                    </div>

                    <button className="w-full bg-[#003399] hover:bg-[#002266] text-white font-bold py-4 rounded-xl transition-colors shadow-md text-base">
                      {t.submitTicket}
                    </button>
                  </div>
                </section>
              )}
            </div>
          )}

          {/* --- TAB 2: PUBLIC POLICY --- */}
          {activeTab === "policy" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <section>
                <h2 className="text-lg font-bold text-[#003399] mb-4">
                  {t.policyAnnouncements}
                </h2>

                {/* Announcement Card */}
                <div className="bg-gradient-to-br from-[#003399] to-[#004DB8] text-white rounded-2xl p-5 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                  <span className="bg-[#FFC72C] text-[#003399] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 inline-block">
                    In Review
                  </span>
                  <h3 className="text-xl font-bold leading-tight mb-2">
                    {t.fuelSubsidy}
                  </h3>
                  <p className="text-white/80 text-sm font-medium">
                    {t.fuelDate}
                  </p>
                </div>

                {/* ── JIT Privacy Notice ── */}
                {!jitDismissed && (
                  <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl overflow-hidden">
                    <div className="flex items-start gap-3 p-4">
                      <div className="bg-amber-100 p-2 rounded-lg shrink-0">
                        <ShieldAlert className="w-4 h-4 text-amber-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-amber-800 mb-1">
                          {language === "BM"
                            ? "Notis Privasi — Makluman Tepat Masa"
                            : "Just-in-Time Privacy Notice"}
                        </p>
                        <p className="text-[11px] text-amber-700 leading-relaxed">
                          {language === "BM"
                            ? "Maklum balas anda terhadap dasar ini akan direkodkan bersama jenis kenderaan dan lokasi umum anda bagi tujuan analisis dasar awam. Data tidak akan dikongsi dengan pihak ketiga tanpa kebenaran anda."
                            : "Your feedback on this policy will be recorded alongside your vehicle type and general location for public policy analysis purposes. Data will not be shared with third parties without your consent."}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => setTransparencyOpen(true)}
                            className="text-[11px] font-bold text-amber-800 underline underline-offset-2"
                          >
                            {language === "BM" ? "Lihat Papan Ketelusan" : "View Transparency Dashboard"}
                          </button>
                          <span className="text-amber-400">·</span>
                          <button
                            onClick={() => setJitDismissed(true)}
                            className="text-[11px] font-bold text-amber-800 underline underline-offset-2"
                          >
                            {language === "BM" ? "Faham, Tutup" : "Got it, Dismiss"}
                          </button>
                        </div>
                      </div>
                      <button onClick={() => setJitDismissed(true)} className="shrink-0 text-amber-400 hover:text-amber-600 p-0.5">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Transparency Dashboard ── */}
                <div className="mt-4 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  {/* Header toggle */}
                  <button
                    onClick={() => setTransparencyOpen(!transparencyOpen)}
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-[#003399]/10 p-2 rounded-lg">
                        <Eye className="w-4 h-4 text-[#003399]" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-slate-800">
                          {language === "BM" ? "Papan Ketelusan Data" : "Data Transparency Dashboard"}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {language === "BM" ? "Lihat bagaimana data anda digunakan" : "See how your data is being used"}
                        </p>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${transparencyOpen ? "rotate-180" : ""}`} />
                  </button>

                  {transparencyOpen && (
                    <div className="border-t border-slate-100 px-5 pb-5 pt-4 space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">

                      {/* Data collected */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Database className="w-4 h-4 text-[#003399]" />
                          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                            {language === "BM" ? "Data Yang Dikumpul" : "Data Collected"}
                          </p>
                        </div>
                        <div className="space-y-2">
                          {[
                            { label: language === "BM" ? "Maklum balas sentimen (pilihan anda)" : "Sentiment feedback (your choice)", icon: <BadgeCheck className="w-3.5 h-3.5 text-green-500" /> },
                            { label: language === "BM" ? "Jenis kenderaan (yang anda pilih)" : "Vehicle type (as selected by you)", icon: <BadgeCheck className="w-3.5 h-3.5 text-green-500" /> },
                            { label: language === "BM" ? "Penilaian kejelasan dasar (1–5 bintang)" : "Policy clarity rating (1–5 stars)", icon: <BadgeCheck className="w-3.5 h-3.5 text-green-500" /> },
                            { label: language === "BM" ? "Cap masa penghantaran" : "Submission timestamp", icon: <BadgeCheck className="w-3.5 h-3.5 text-green-500" /> },
                          ].map((item, i) => (
                            <div key={i} className="flex items-start gap-2.5 bg-slate-50 rounded-lg px-3 py-2.5">
                              {item.icon}
                              <span className="text-xs text-slate-700">{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Who can access */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Users className="w-4 h-4 text-[#003399]" />
                          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                            {language === "BM" ? "Pihak Yang Mempunyai Akses" : "Who Has Access"}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { name: language === "BM" ? "Unit Dasar KDN" : "KDN Policy Unit", level: language === "BM" ? "Data Agregat" : "Aggregate Only" },
                            { name: language === "BM" ? "JPM Analitik" : "JPM Analytics", level: language === "BM" ? "Tanpa Nama" : "Anonymised" },
                            { name: language === "BM" ? "Pihak Ketiga" : "Third Parties", level: language === "BM" ? "Tiada Akses" : "No Access" },
                          ].map((party, i) => (
                            <div key={i} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                              <p className="text-[11px] font-bold text-slate-800">{party.name}</p>
                              <span className={`text-[10px] font-semibold mt-1 inline-block px-2 py-0.5 rounded-full ${party.level === (language === "BM" ? "Tiada Akses" : "No Access") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                                {party.level}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Retention period */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="w-4 h-4 text-[#003399]" />
                          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                            {language === "BM" ? "Tempoh Penyimpanan Data" : "Data Retention Period"}
                          </p>
                        </div>
                        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex items-center justify-between">
                          <p className="text-xs text-slate-700">
                            {language === "BM" ? "Data maklum balas dasar awam" : "Public policy feedback data"}
                          </p>
                          <span className="text-xs font-bold text-[#003399] bg-blue-100 px-3 py-1 rounded-full">
                            {language === "BM" ? "2 Tahun" : "2 Years"}
                          </span>
                        </div>
                      </div>

                      {/* Your rights */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Lock className="w-4 h-4 text-[#003399]" />
                          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                            {language === "BM" ? "Hak Anda Di Bawah PDPA" : "Your Rights Under PDPA"}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { icon: <Eye className="w-3.5 h-3.5" />, label: language === "BM" ? "Akses Data" : "Access Data" },
                            { icon: <FileText className="w-3.5 h-3.5" />, label: language === "BM" ? "Betulkan Data" : "Correct Data" },
                            { icon: <Trash2 className="w-3.5 h-3.5" />, label: language === "BM" ? "Padam Data" : "Delete Data" },
                            { icon: <Download className="w-3.5 h-3.5" />, label: language === "BM" ? "Muat Turun" : "Download" },
                          ].map((right, i) => (
                            <button key={i} className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2.5 hover:border-[#003399] hover:bg-blue-50 transition-colors group">
                              <span className="text-slate-400 group-hover:text-[#003399]">{right.icon}</span>
                              <span className="text-[11px] font-semibold text-slate-700 group-hover:text-[#003399]">{right.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Legal basis footer */}
                      <div className="bg-slate-50 rounded-xl px-4 py-3 flex items-start gap-2 border border-slate-100">
                        <BadgeCheck className="w-4 h-4 text-[#003399] shrink-0 mt-0.5" />
                        <p className="text-[10px] text-slate-600 leading-relaxed">
                          {language === "BM"
                            ? "Pengumpulan data ini adalah berdasarkan kepentingan awam di bawah Akta Perlindungan Data Peribadi 2010 (PDPA) Malaysia. Rujuk "
                            : "This data collection is based on public interest under Malaysia's Personal Data Protection Act 2010 (PDPA). Refer to "}
                          <a href="https://malaysia.gov.my" target="_blank" rel="noopener noreferrer" className="font-bold text-[#003399] underline">
                            malaysia.gov.my
                          </a>
                          {language === "BM" ? " untuk maklumat lanjut." : " for more information."}
                        </p>
                      </div>

                    </div>
                  )}
                </div>
              </section>

              <section className="bg-white border-2 border-slate-100 rounded-2xl p-5 shadow-sm space-y-8">
                {/* Sentiment Selection */}
                <div>
                  <label className="block font-bold text-slate-800 text-base mb-4 text-center">
                    {t.sentimentQuestion}
                  </label>
                  <div className="flex justify-between items-center px-2">
                    {sentimentIcons.map((item) => (
                      <button
                        key={item.value}
                        onClick={() => setSentiment(item.value)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all ${
                          sentiment === item.value
                            ? `${item.bg} scale-110 shadow-sm border-2 border-current ${item.color}`
                            : "text-slate-400 hover:bg-slate-50 border-2 border-transparent"
                        }`}
                      >
                        {item.icon}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between px-2 mt-2 text-xs font-bold text-slate-400">
                    <span>{t.highlyDisagree}</span>
                    <span>{t.highlyAgree}</span>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Clarity Rating */}
                <div>
                  <label className="block font-bold text-slate-800 text-base mb-4 text-center">
                    {t.clarityQuestion}
                  </label>
                  <div className="flex justify-center gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setClarityRating(star)}
                        className={`p-2 transition-transform ${clarityRating >= star ? "scale-110" : ""}`}
                      >
                        <Star
                          className={`w-10 h-10 ${
                            clarityRating >= star
                              ? "fill-[#FFC72C] text-[#FFC72C]"
                              : "fill-slate-100 text-slate-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Structured Impact Assessment */}
                <div className="space-y-5">
                  <div>
                    <label className="block font-bold text-slate-800 text-base mb-3">
                      {t.vehicleType}
                    </label>
                    <div className="space-y-3">
                      {[
                        {
                          id: "car_under_2",
                          label: t.carUnder2L,
                        },
                        {
                          id: "car_over_2",
                          label: t.carOver2L,
                        },
                        {
                          id: "motorcycle",
                          label: t.motorcycle,
                        },
                      ].map((v) => (
                        <label
                          key={v.id}
                          className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                            vehicleType === v.id
                              ? "border-[#003399] bg-blue-50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              vehicleType === v.id
                                ? "border-[#003399]"
                                : "border-slate-400"
                            }`}
                          >
                            {vehicleType === v.id && (
                              <div className="w-2.5 h-2.5 rounded-full bg-[#003399]" />
                            )}
                          </div>
                          <span className="font-semibold text-slate-700">
                            {v.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 text-base mb-2">
                      {t.impactLabel}
                    </label>
                    <textarea
                      value={impactExplanation}
                      onChange={(e) =>
                        setImpactExplanation(e.target.value)
                      }
                      className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-base min-h-[120px] focus:outline-none focus:border-[#003399] resize-none"
                      placeholder="Share your feedback here..."
                    ></textarea>
                  </div>

                  <button className="w-full bg-[#003399] hover:bg-[#002266] text-white font-bold py-4 rounded-xl transition-colors shadow-md text-base">
                    {t.submitFeedback}
                  </button>
                </div>
              </section>
            </div>
          )}
        </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}