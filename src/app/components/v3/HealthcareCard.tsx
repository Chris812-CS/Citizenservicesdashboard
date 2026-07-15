import {
  Heart,
  Calendar,
  MapPin,
  Check,
  Activity,
} from "lucide-react";

interface HealthcareCardProps {
  language: "BM" | "EN";
}

export function HealthcareCard({
  language,
}: HealthcareCardProps) {
  return (
    <div
      className="min-w-[260px] lg:min-w-0 bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
      style={{ height: "310px" }}
    >
      {/* Top Section: Teal Gradient with Health Info */}
      <div
        className="px-5 pt-5 pb-4 relative flex flex-col justify-between shrink-0"
        style={{
          // Linear gradient from Navy to Indigo/Purple
          background:
            "linear-gradient(135deg, #003366 0%, #1A237E 100%)",
          height: "160px",
        }}
      >
        {/* Header with Icon and Title */}
        <div className="flex items-start gap-3 relative z-10">
          <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-sm leading-tight">
                MySejahtera
              </h3>
              {/* Verified Badge */}
              <div className="bg-[#10B981] rounded-full px-2 py-0.5 flex items-center gap-1">
                <Check
                  className="w-2.5 h-2.5 text-white"
                  strokeWidth={3}
                />
                <span className="text-[9px] font-bold text-white tracking-wide">
                  {language === "BM" ? "Disahkan" : "Verified"}
                </span>
              </div>
            </div>
            <p className="text-[9px] text-white/80 mt-0.5">
              {language === "BM" ? "Kesihatan" : "Health"}
            </p>
          </div>
        </div>

        {/* Next Appointment in Header */}
        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-2.5 border border-white/20 mt-2">
          <div className="flex items-start gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-white mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[9px] text-white/70 mb-0">
                {language === "BM"
                  ? "Temujanji Seterusnya"
                  : "Next Appointment"}
              </p>
              <p className="text-xs font-bold text-white leading-tight mt-0.5">
                15 Apr 2026, 10:00 AM
              </p>
              <p className="text-[9px] text-white/70 mt-0.5">
                {language === "BM"
                  ? "Hospital Kuala Lumpur"
                  : "Kuala Lumpur Hospital"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider with pill notch ── */}
      <div className="relative bg-white h-4 shrink-0">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-4 rounded-full"
          style={{ backgroundColor: "#002D2D" }}
        />
      </div>

      {/* Bottom Section: Action Buttons */}
      <div className="bg-white px-5 pb-5 pt-1 flex-1 flex flex-col justify-center gap-3">
        {/* Three Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button className="bg-white hover:bg-gray-50 border-2 border-[#003399] text-[#003399] font-semibold text-xs py-2.5 px-2 rounded-xl transition-colors flex items-center justify-center gap-1">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">
              {language === "BM" ? "Hospital" : "Hospital"}
            </span>
          </button>
          <button className="bg-[#003399] hover:bg-[#002266] text-white font-semibold text-xs py-2.5 px-2 rounded-xl transition-colors flex items-center justify-center gap-1">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">
              {language === "BM" ? "Tempah" : "Book"}
            </span>
          </button>
          <button className="col-span-2 bg-white hover:bg-gray-50 border-2 border-[#003399] text-[#003399] font-semibold text-xs py-2.5 px-2 rounded-xl transition-colors flex items-center justify-center gap-1.5">
            <Activity className="w-4 h-4 flex-shrink-0" />
            <span>
              {language === "BM"
                ? "Penjejak Penyakit"
                : "Disease Tracker"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}