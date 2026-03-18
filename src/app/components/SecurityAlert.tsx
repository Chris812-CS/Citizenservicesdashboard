import { Shield, ChevronRight } from 'lucide-react';

export function SecurityAlert() {
  return (
    <div className="mx-6 mb-6">
      <div className="bg-white border-2 border-[#003893] rounded-lg p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="bg-[#FFC72C] p-2.5 rounded-lg">
            <Shield className="w-5 h-5 text-[#003893]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="font-semibold text-[#003893]">Status Keselamatan</h3>
              <span className="bg-green-50 border border-green-600 text-green-700 text-xs px-2 py-0.5 rounded-md font-medium">
                Selamat
              </span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Semua sistem beroperasi dengan normal. Tiada ancaman keselamatan dikesan.
            </p>
          </div>
          <button className="text-[#003893] hover:text-[#CC0001] transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Decorative stripe pattern */}
      <div className="flex gap-1 mt-2 px-1">
        <div className="h-1 flex-1 bg-[#003893] rounded-full"></div>
        <div className="h-1 flex-1 bg-[#CC0001] rounded-full"></div>
        <div className="h-1 flex-1 bg-[#FFC72C] rounded-full"></div>
        <div className="h-1 flex-1 bg-white border border-slate-200 rounded-full"></div>
      </div>
    </div>
  );
}