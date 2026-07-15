import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Wallet,
  CreditCard,
  Car,
  AlertTriangle,
  CalendarDays,
  ShieldCheck,
  MessageSquareMore,
  Database,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router";

interface LaunchGuideProps {
  language: "BM" | "EN";
}

const quickLinks = [
  {
    icon: <Wallet className="w-3.5 h-3.5" />,
    labelBM: "Baki SARA",
    labelEN: "SARA Balance",
    route: "/sara-balance",
  },
  {
    icon: <CreditCard className="w-3.5 h-3.5" />,
    labelBM: "Lesen Memandu Digital",
    labelEN: "Digital Driving License",
    route: "/digital-license",
  },
  {
    icon: <Car className="w-3.5 h-3.5" />,
    labelBM: "Pembaharuan Cukai Jalan",
    labelEN: "Road Tax Renewal",
    route: "/road-tax",
  },
  {
    icon: <AlertTriangle className="w-3.5 h-3.5" />,
    labelBM: "Semakan Saman",
    labelEN: "Summons Check",
    route: "/summons-check",
  },
  {
    icon: <CalendarDays className="w-3.5 h-3.5" />,
    labelBM: "Tempahan Janji Temu",
    labelEN: "Appointment Booking",
    route: "/appointment-booking",
  },
  {
    icon: <ShieldCheck className="w-3.5 h-3.5" />,
    labelBM: "Keselamatan & Privasi",
    labelEN: "Security & Privacy",
    route: "/security-privacy",
  },
  {
    icon: <MessageSquareMore className="w-3.5 h-3.5" />,
    labelBM: "Maklum Balas & Dasar",
    labelEN: "Feedback & Policy",
    route: "/feedback",
  },
  {
    icon: <Database className="w-3.5 h-3.5" />,
    labelBM: "Sumber Data Terbuka",
    labelEN: "Open Data Source",
    route: "/data-source",
  },
];

export function LaunchGuide({ language }: LaunchGuideProps) {
  const navigate = useNavigate();

  return (
    <div
      className="mx-4 mb-6 lg:mx-0 rounded-2xl overflow-hidden border border-slate-200 shadow-sm"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* Header bar */}
      <div className="bg-[#003399] px-5 py-3 flex items-center gap-2">
        <Globe className="w-4 h-4 text-[#FFC72C]" />
        <span className="text-white font-bold text-sm tracking-wide">
          {language === "BM" ? "Panduan Pelancaran" : "Launch Guide"}
        </span>
      </div>

      <div className="bg-white grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">

        {/* Left — Address & Contact */}
        <div className="p-5">
          {/* Branding */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#003399] flex items-center justify-center shrink-0">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-[#003399] text-base tracking-wide">
              MyGovernment
            </span>
          </div>

          <p className="text-xs font-bold text-slate-800 mb-1">
            National Digital Department (JDN)
          </p>

          {/* Address */}
          <div className="flex items-start gap-2 mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#003399] mt-0.5 shrink-0" />
            <p className="text-xs text-slate-600 leading-relaxed">
              Bangunan MKN Embassy Techzone<br />
              No. 3200 Jalan Teknokrat 2,<br />
              63000 Cyberjaya,<br />
              Sepang, Selangor
            </p>
          </div>

          {/* GPS */}
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-xs text-slate-500">2.938013, 101.654384</span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 mb-2">
            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-xs text-slate-600 font-medium">603-8000 8000</span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-xs text-[#003399]">mygovernment@malaysia.gov.my</span>
          </div>

          {/* Website */}
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <a
              href="https://malaysia.gov.my"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#003399] hover:underline"
            >
              https://malaysia.gov.my
            </a>
          </div>
        </div>

        {/* Right — Quick Links (app features) */}
        <div className="p-5">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
            {language === "BM" ? "Pautan Pantas" : "Quick Links"}
          </p>
          <ul className="space-y-1.5">
            {quickLinks.map((link) => (
              <li key={link.route}>
                <button
                  onClick={() => navigate(link.route, { state: { language } })}
                  className="w-full flex items-center justify-between gap-2 group hover:text-[#003399] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#003399] opacity-60 group-hover:opacity-100 transition-opacity">
                      {link.icon}
                    </span>
                    <span className="text-xs text-slate-600 group-hover:text-[#003399] transition-colors text-left">
                      {language === "BM" ? link.labelBM : link.labelEN}
                    </span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-[#003399] shrink-0 transition-colors" />
                </button>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
