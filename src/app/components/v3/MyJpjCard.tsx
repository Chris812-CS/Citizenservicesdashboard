import {
  Car,
  AlertTriangle,
  ChevronRight,
  FileText,
  ShieldCheck,
  CalendarDays,
} from "lucide-react";
import { useNavigate } from "react-router";

interface MyJpjCardProps {
  language: "BM" | "EN";
}

const PRIMARY_LICENSE = {
  class: "D",
  expiryDate: "20/08/2027",
  isExpired: false,
};

export function MyJpjCard({ language }: MyJpjCardProps) {
  const navigate = useNavigate();
  const license = PRIMARY_LICENSE;

  const validBg = license.isExpired
    ? "bg-red-400/25 border-red-300/40 text-red-200"
    : "bg-emerald-400/25 border-emerald-300/40 text-emerald-200";

  const dotColor = license.isExpired ? "#ef4444" : "#34d399";

  return (
    <div
      className="min-w-[260px] lg:min-w-0 rounded-2xl overflow-hidden shadow-lg border border-slate-100 flex flex-col"
      style={{ fontFamily: "Poppins, sans-serif" , height: "310px"}}
    >
      {/* ── Top gradient band — Royal Blue → Gold ── */}
      <button
        onClick={() => navigate("/digital-license", { state: { language } })}
        className="relative px-5 pt-5 pb-6 flex flex-col justify-between shrink-0 text-left hover:brightness-110 transition-all cursor-pointer block w-full"
        style={{
          background: "linear-gradient(135deg, #003399 0%)",
          height: '160px',
        }}
      >
        {/* Header row */}
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
              <Car className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3
                className="font-black text-white leading-tight tracking-wider"
                style={{
                  fontSize: "14px",
                  letterSpacing: "0.08em",
                }}
              >
                MyJPJ
              </h3>
              <p
                className="text-white/60 mt-0.5"
                style={{ fontSize: "9px" }}
              >
                {language === "BM"
                  ? "Portal Kenderaan & Lesen"
                  : "Vehicle & License Portal"}
              </p>
            </div>
          </div>

          <span
            className="flex items-center gap-1 bg-white/15 border border-white/20 text-white/90 rounded-full px-2.5 py-0.5"
            style={{ fontSize: "9px" }}
          >
            <ShieldCheck className="w-3 h-3 text-amber-300" />
            <span className="font-semibold">
              {language === "BM" ? "Kenderaan" : "Vehicle"}
            </span>
          </span>
        </div>

        {/* ── License info ── */}
        <div className="relative z-10">
          {/* Label + Kelas chip + status badge — all on one row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <p
                className="text-white/60 font-medium tracking-wide uppercase"
                style={{ fontSize: "9px" }}
              >
                {language === "BM"
                  ? "Lesen Memandu"
                  : "Driver License"}
              </p>

              <p
                className="text-white font-semibold leading-tight"
                style={{ fontSize: "13px" }}
              >
                Kelas {license.class}
              </p>
            </div>
            <span
              className={`flex items-center gap-1.5 border rounded-full px-2.5 py-0.5 ${validBg}`}
              style={{ fontSize: "10px" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: dotColor }}
              />
              <span className="font-bold uppercase tracking-wide">
                {license.isExpired
                  ? "EXPIRED"
                  : language === "BM"
                    ? "SAH"
                    : "VALID"}
              </span>
            </span>
          </div>

          {/* Validity date — smaller, secondary row */}
          <div className="flex items-center gap-1.5">
            <CalendarDays className="w-3 h-3 text-white/35" />
            <span
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              {language === "BM" ? "Sah Laku" : "Validity"}:{" "}
              <span className="font-semibold text-white/80">
                {license.expiryDate}
              </span>
            </span>
          </div>
        </div>
      </button>

      {/* ── Divider with pill notch ── */}
      <div className="relative bg-white h-4 shrink-0">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-4 rounded-full"
          style={{
            background:
              "linear-gradient(#996600 70%)",
          }}
        />
      </div>

      {/* ── White body ── */}
      <div className="bg-white px-4 pb-5 -mt-1 flex-1 flex flex-col justify-center gap-3">
        {/* Road Tax row */}
        <button
          onClick={() => navigate("/road-tax", { state: { language } })}
          className="flex items-center justify-between bg-red-50 border border-red-100 rounded-xl px-3 py-2.5 w-full transition-colors hover:bg-red-100 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
            <div className="text-left">
              <p
                className="text-slate-400 leading-none mb-0.5"
                style={{ fontSize: "9px" }}
              >
                {language === "BM" ? "Cukai Jalan" : "Road Tax"}
              </p>
              <p
                className="text-slate-800 font-semibold leading-none"
                style={{ fontSize: "11px" }}
              >
                Expiry:{" "}
                <span className="text-red-600">03/01/2025</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span
              className="flex items-center gap-1 bg-red-100 border border-red-200 text-red-700 rounded-full px-2 py-0.5 flex-shrink-0"
              style={{ fontSize: "9px" }}
            >
              <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
              <span className="font-bold uppercase">
                {language === "BM" ? "TAMAT" : "EXPIRED"}
              </span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
          </div>
        </button>

        {/* ── Summons inline box ── */}
        <button
          className="flex items-center justify-between bg-red-50 border border-red-100 rounded-xl px-3 py-2.5 w-full transition-colors hover:bg-red-100 cursor-pointer"
          onClick={() => navigate("/summons-check", { state: { language } })}
          aria-label={
            language === "BM"
              ? "Lihat dan Bayar Saman"
              : "View and Pay Summons"
          }
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
            <div className="text-left">
              <p
                className="font-bold text-red-700 leading-tight"
                style={{ fontSize: "11px" }}
              >
                {language === "BM"
                  ? "2 Saman Belum Bayar"
                  : "2 Unpaid Summons"}
              </p>
              <p
                className="text-[#003399] font-semibold leading-tight mt-0.5"
                style={{ fontSize: "10px" }}
              >
                {language === "BM"
                  ? "Lihat & Bayar Saman"
                  : "View & Pay Summons"}
              </p>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
        </button>
      </div>
    </div>
  );
}