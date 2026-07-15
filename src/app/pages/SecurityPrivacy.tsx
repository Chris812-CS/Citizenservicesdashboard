import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  ArrowLeft, Menu, Bell, Shield, Fingerprint, Lock,
  Smartphone, MonitorX, LogOut, History, ShieldAlert,
  AlertTriangle, Database, EyeOff, Mail, Wallet,
  MapPin, MessageSquareText, ChevronRight,
  BadgeCheck, CreditCard, User, KeyRound, ShieldCheck
} from "lucide-react";
import { DesktopSidebar } from "../components/v3/DesktopSidebar";

export function SecurityPrivacy() {
  const location = useLocation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<"BM" | "EN">(location.state?.language || "BM");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggles State
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [stepUpAuthEnabled, setStepUpAuthEnabled] = useState(false);
  const [fraudAlertsEnabled, setFraudAlertsEnabled] = useState(true);
  const [dataJPJ, setDataJPJ] = useState(true);
  const [dataKKM, setDataKKM] = useState(true);
  const [dataLHDN, setDataLHDN] = useState(false);
  const [privacyModeEnabled, setPrivacyModeEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);
  const [trustedRetailersOnly, setTrustedRetailersOnly] = useState(true);
  const [dailyLimit, setDailyLimit] = useState(1000);

  // Mock Data
  const activeSessions = [
    { id: 1, device: "iPhone 15", location: "Putrajaya", time: "Sedang Aktif / Active Now", current: true },
    { id: 2, device: "Chrome - Windows 11", location: "Kuala Lumpur", time: "2 Jam lepas / 2 Hours ago", current: false }
  ];

  const loginHistory = [
    { id: 1, date: "03-Apr-2026", time: "09:41 AM", status: "Success", location: "Putrajaya" },
    { id: 2, date: "01-Apr-2026", time: "14:20 PM", status: "Failed", location: "Unknown" },
    { id: 3, date: "28-Mar-2026", time: "08:15 AM", status: "Success", location: "Kuala Lumpur" },
  ];

  // Reusable Toggle Component
  const ToggleSwitch = ({ checked, onChange, label, description }: any) => (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
      <div className="pr-4">
        <p className="font-bold text-slate-800 text-sm">{label}</p>
        {description && <p className="text-xs text-slate-500 mt-0.5 leading-snug">{description}</p>}
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors shrink-0 ${
          checked ? 'bg-[#003399]' : 'bg-slate-300'
        }`}
        aria-checked={checked}
        role="switch"
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

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
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                  <h1 className="font-semibold text-lg text-slate-800 ml-1 lg:ml-0 truncate">
                    {language === "BM" ? "Keselamatan & Privasi" : "Security & Privacy"}
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
                  </button>
                </div>
              </div>
            </header>

            {/* Back Button (Floating) */}
            <div className="absolute top-20 left-4 z-30">
              <button
                onClick={() => navigate("/super-app", { state: { language } })}
                className="p-2.5 bg-white text-[#003399] hover:bg-slate-50 rounded-full shadow-md border border-slate-100 transition-all flex items-center justify-center"
                aria-label="Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="lg:max-w-3xl lg:mx-auto lg:px-8 lg:py-6 p-4 pt-16 mt-4">
              
              <div className="flex flex-col items-center">

                {/* 0. Verified Account Identity */}
                <div className="w-full max-w-[360px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
                  {/* Card header */}
                  <div className="bg-gradient-to-r from-[#003399] to-[#004DB8] px-5 py-4 flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-xl">
                      <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-white text-sm">
                        {language === "BM" ? "Akaun Disahkan" : "Verified Account"}
                      </h2>
                      <p className="text-blue-200 text-[10px]">
                        {language === "BM" ? "Status pengesahan identiti anda" : "Your identity verification status"}
                      </p>
                    </div>
                  </div>

                  {/* Profile row */}
                  <div className="px-5 pt-4 pb-3 flex items-center gap-3 border-b border-slate-100">
                    <div className="w-12 h-12 rounded-full bg-[#003399]/10 flex items-center justify-center shrink-0">
                      <User className="w-6 h-6 text-[#003399]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-800 text-sm truncate">Hemalata A/P Vasudavan</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <BadgeCheck className="w-3.5 h-3.5 text-[#003399]" />
                        <span className="text-[10px] font-semibold text-[#003399]">
                          {language === "BM" ? "Identiti Disahkan" : "Identity Verified"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Verification items */}
                  <div className="px-5 py-3 space-y-0">

                    {/* IC Verification */}
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0 border border-green-100">
                          <CreditCard className="w-4.5 h-4.5 text-green-600" style={{ width: '18px', height: '18px' }} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">
                            {language === "BM" ? "Kad Pengenalan (MyKAD)" : "National ID (MyKAD)"}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5 font-mono tracking-wide">790820-14-5782</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-green-100 border border-green-200 text-green-700 px-2.5 py-1 rounded-full shrink-0">
                        <BadgeCheck className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase">
                          {language === "BM" ? "Sah" : "Verified"}
                        </span>
                      </div>
                    </div>

                    {/* Email Verification */}
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                          <Mail className="w-4.5 h-4.5 text-[#003399]" style={{ width: '18px', height: '18px' }} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">
                            {language === "BM" ? "Alamat E-mel" : "Email Address"}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5">hemalata@mydigital.gov.my</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-blue-100 border border-blue-200 text-[#003399] px-2.5 py-1 rounded-full shrink-0">
                        <BadgeCheck className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase">
                          {language === "BM" ? "Sah" : "Verified"}
                        </span>
                      </div>
                    </div>

                    {/* Email as Auth Method */}
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center shrink-0 border border-amber-100">
                          <KeyRound className="w-4.5 h-4.5 text-amber-600" style={{ width: '18px', height: '18px' }} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">
                            {language === "BM" ? "Pengesahan E-mel (2FA)" : "Email Authentication (2FA)"}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            {language === "BM" ? "OTP dihantar ke e-mel berdaftar" : "OTP sent to registered email"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-100 border border-amber-200 text-amber-700 px-2.5 py-1 rounded-full shrink-0">
                        <ShieldCheck className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase">
                          {language === "BM" ? "Aktif" : "Active"}
                        </span>
                      </div>
                    </div>

                    {/* Phone Verification */}
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center shrink-0 border border-purple-100">
                          <Smartphone className="w-4.5 h-4.5 text-purple-600" style={{ width: '18px', height: '18px' }} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">
                            {language === "BM" ? "Nombor Telefon" : "Phone Number"}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5">+60 12-XXX XXXX</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-green-100 border border-green-200 text-green-700 px-2.5 py-1 rounded-full shrink-0">
                        <BadgeCheck className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase">
                          {language === "BM" ? "Sah" : "Verified"}
                        </span>
                      </div>
                    </div>

                    {/* Biometric Verification */}
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                          <Fingerprint className="w-4.5 h-4.5 text-teal-600" style={{ width: '18px', height: '18px' }} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">
                            {language === "BM" ? "Pengesahan Biometrik" : "Biometric Verification"}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            {language === "BM" ? "FaceID / Cap Jari berdaftar" : "FaceID / Fingerprint registered"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-teal-100 border border-teal-200 text-teal-700 px-2.5 py-1 rounded-full shrink-0">
                        <BadgeCheck className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase">
                          {language === "BM" ? "Sah" : "Verified"}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Overall trust score footer */}
                  <div className="mx-5 mb-4 bg-[#003399]/5 border border-[#003399]/10 rounded-xl px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#003399]" />
                      <span className="text-xs font-bold text-[#003399]">
                        {language === "BM" ? "Tahap Kepercayaan Akaun" : "Account Trust Level"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map((i) => (
                          <div key={i} className="w-4 h-1.5 rounded-full bg-[#003399]" />
                        ))}
                      </div>
                      <span className="text-xs font-black text-[#003399]">5/5</span>
                    </div>
                  </div>
                </div>

                {/* 1. Authentication & Access Control */}
                <div className="w-full max-w-[360px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
                  <div className="bg-slate-50 px-5 py-4 border-b border-slate-100 flex items-center gap-3">
                    <div className="bg-[#003399]/10 p-2 rounded-lg text-[#003399]">
                      <Fingerprint className="w-5 h-5" />
                    </div>
                    <h2 className="font-bold text-slate-800 text-sm">
                      {language === "BM" ? "1. Pengesahan & Akses" : "1. Authentication & Access Control"}
                    </h2>
                  </div>
                  <div className="px-5 py-2">
                    <ToggleSwitch
                      label={language === "BM" ? "Log Masuk Biometrik" : "Biometric Login"}
                      description={language === "BM" ? "Gunakan FaceID/Cap Jari untuk akses pantas." : "Use FaceID/Fingerprint for seamless entry."}
                      checked={biometricEnabled}
                      onChange={() => setBiometricEnabled(!biometricEnabled)}
                    />
                    <ToggleSwitch
                      label={language === "BM" ? "Pengesahan Dua Langkah" : "Step-Up Authentication"}
                      description={language === "BM" ? "Perlukan PIN 6-digit untuk transaksi bernilai tinggi." : "Require a 6-digit PIN for high-value transactions."}
                      checked={stepUpAuthEnabled}
                      onChange={() => setStepUpAuthEnabled(!stepUpAuthEnabled)}
                    />
                    <button className="w-full py-4 flex items-center justify-between text-left group">
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{language === "BM" ? "Tukar PIN Transaksi" : "Change Transaction PIN"}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{language === "BM" ? "Tetapkan semula kod kelulusan." : "Reset the code used for financial approvals."}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#003399]" />
                    </button>
                  </div>
                </div>

                {/* 2. Device & Session Monitoring */}
                <div className="w-full max-w-[360px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
                  <div className="bg-slate-50 px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#003399]/10 p-2 rounded-lg text-[#003399]">
                        <MonitorX className="w-5 h-5" />
                      </div>
                      <h2 className="font-bold text-slate-800 text-sm">
                        {language === "BM" ? "2. Pemantauan Peranti" : "2. Device & Session Monitoring"}
                      </h2>
                    </div>
                    <button className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100">
                      {language === "BM" ? "Log Keluar Semua" : "Logout All"}
                    </button>
                  </div>
                  
                  <div className="p-5">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                      {language === "BM" ? "Sesi Aktif" : "Active Sessions"}
                    </p>
                    <div className="space-y-3 mb-6">
                      {activeSessions.map((session) => (
                        <div key={session.id} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div className="flex items-center gap-3">
                            <Smartphone className={`w-6 h-6 ${session.current ? 'text-[#003399]' : 'text-slate-400'}`} />
                            <div>
                              <p className="font-bold text-slate-800 text-xs">{session.device}</p>
                              <p className="text-[10px] text-slate-500 mt-0.5">{session.location} • {session.time}</p>
                            </div>
                          </div>
                          {!session.current && (
                            <button className="p-2 text-red-500 hover:bg-red-50 rounded-full" aria-label="Revoke">
                              <LogOut className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                      {language === "BM" ? "Log Sejarah Masuk" : "Login History"}
                    </p>
                    <div className="space-y-0">
                      {loginHistory.map((log, idx) => (
                        <div key={log.id} className={`py-3 flex items-center justify-between ${idx !== loginHistory.length - 1 ? 'border-b border-slate-100' : ''}`}>
                          <div className="flex items-start gap-2">
                            <History className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs font-bold text-slate-800">{log.date} at {log.time}</p>
                              <p className="text-[10px] text-slate-500">{log.location}</p>
                            </div>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-1 rounded ${log.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {log.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Account Protection (Kill Switch) */}
                <div className="w-full max-w-[360px] bg-red-50 rounded-2xl shadow-sm border border-red-200 overflow-hidden mb-6 relative">
                  <div className="px-5 py-4 border-b border-red-200 flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-lg text-red-600">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <h2 className="font-bold text-red-800 text-sm">
                      {language === "BM" ? "3. Perlindungan Akaun" : "3. Account Protection"}
                    </h2>
                  </div>
                  <div className="p-5 space-y-4">
                    <p className="text-xs text-red-700 font-medium">
                      {language === "BM" 
                        ? "Gunakan fungsi ini jika telefon atau kad fizikal MyKAD anda hilang atau dicuri." 
                        : "Use these tools if your phone or physical MyKAD is lost or stolen."}
                    </p>
                    
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold shadow-md transition-colors flex items-center justify-center gap-2 uppercase tracking-wide">
                      <AlertTriangle className="w-5 h-5" />
                      {language === "BM" ? "Bekukan Akaun Segera" : "Freeze Account Instantly"}
                    </button>

                    <div className="pt-2">
                      <ToggleSwitch
                        label={language === "BM" ? "Amaran Penipuan" : "Fraud Alert Notifications"}
                        description={language === "BM" ? "Terima notifikasi untuk aktiviti mencurigakan." : "Receive instant push notifications for unusual activity."}
                        checked={fraudAlertsEnabled}
                        onChange={() => setFraudAlertsEnabled(!fraudAlertsEnabled)}
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Privacy & Data Governance */}
                <div className="w-full max-w-[360px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
                  <div className="bg-slate-50 px-5 py-4 border-b border-slate-100 flex items-center gap-3">
                    <div className="bg-[#003399]/10 p-2 rounded-lg text-[#003399]">
                      <EyeOff className="w-5 h-5" />
                    </div>
                    <h2 className="font-bold text-slate-800 text-sm">
                      {language === "BM" ? "4. Privasi & Data" : "4. Privacy & Data Governance"}
                    </h2>
                  </div>
                  <div className="p-5 space-y-2">
                    <ToggleSwitch
                      label={language === "BM" ? "Mod Privasi" : "Privacy Mode"}
                      description={language === "BM" ? "Sembunyikan baki dompet dan no IC di halaman utama." : "Obscure sensitive data on the main dashboard."}
                      checked={privacyModeEnabled}
                      onChange={() => setPrivacyModeEnabled(!privacyModeEnabled)}
                    />
                    
                    <div className="py-3">
                      <p className="font-bold text-slate-800 text-sm mb-3">
                        {language === "BM" ? "Kebenaran Perkongsian Data" : "Data Sharing Permissions"}
                      </p>
                      <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-xs text-slate-700">JPJ (Pengangkutan)</p>
                          <input type="checkbox" checked={dataJPJ} onChange={() => setDataJPJ(!dataJPJ)} className="accent-[#003399] w-4 h-4" />
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-xs text-slate-700">KKM (Kesihatan)</p>
                          <input type="checkbox" checked={dataKKM} onChange={() => setDataKKM(!dataKKM)} className="accent-[#003399] w-4 h-4" />
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-xs text-slate-700">LHDN (Cukai)</p>
                          <input type="checkbox" checked={dataLHDN} onChange={() => setDataLHDN(!dataLHDN)} className="accent-[#003399] w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <ToggleSwitch
                      label={language === "BM" ? "Notifikasi Pemasaran" : "Marketing Preferences"}
                      description={language === "BM" ? "Terima info perkhidmatan pihak ketiga." : "Receive third-party service notifications."}
                      checked={marketingEnabled}
                      onChange={() => setMarketingEnabled(!marketingEnabled)}
                    />
                  </div>
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
