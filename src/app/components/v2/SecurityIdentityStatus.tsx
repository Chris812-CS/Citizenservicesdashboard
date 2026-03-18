import { CheckCircle, Shield } from 'lucide-react';

export function SecurityIdentityStatus() {
  return (
    <div className="px-6 py-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="bg-white rounded-2xl p-5 shadow-md border-2 border-green-100">
        <div className="flex items-start gap-4">
          <div className="bg-green-50 p-3 rounded-xl">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-[#003893] text-base">
                Status Keselamatan & Identiti
              </h3>
            </div>
            <p className="text-sm text-slate-600 mb-2">
              Security & Identity Status
            </p>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="bg-green-100 border border-green-600 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
                DISAHKAN / VALIDATED
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
