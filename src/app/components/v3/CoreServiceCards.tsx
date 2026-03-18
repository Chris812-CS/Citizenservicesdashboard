import { Wallet, Car, Heart, TrendingUp, AlertTriangle, Shield } from 'lucide-react';

interface CoreServiceCardsProps {
  language: 'BM' | 'EN';
}

export function CoreServiceCards({ language }: CoreServiceCardsProps) {
  return (
    <div className="px-6 pb-5 lg:px-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Mobile: Horizontal scrollable row / Desktop: 3-column grid */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide lg:grid lg:grid-cols-3 lg:overflow-visible">
        {/* Card 1: SARA Wallet */}
        <div className="min-w-[260px] lg:min-w-0 bg-white rounded-2xl p-5 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-green-50 p-2 rounded-lg">
              <Wallet className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-[#003399] text-sm">
                {language === 'BM' ? 'Dompet SARA' : 'SARA Wallet'}
              </h3>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-xs text-slate-500 mb-1">
              {language === 'BM' ? 'Baki Semasa' : 'Current Balance'}
            </p>
            <p className="text-4xl font-bold text-green-600">RM100.00</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span className="font-semibold">
              {language === 'BM' ? 'Aktif' : 'Active'}
            </span>
          </div>
        </div>

        {/* Card 2: JPJ Vehicle */}
        <div className="min-w-[260px] lg:min-w-0 bg-white rounded-2xl p-5 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-blue-50 p-2 rounded-lg">
              <Car className="w-5 h-5 text-[#003399]" />
            </div>
            <div>
              <h3 className="font-bold text-[#003399] text-sm">
                {language === 'BM' ? 'Kenderaan' : 'Vehicle'}
              </h3>
            </div>
          </div>

          <div className="mb-4">
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-3 border-2 border-slate-900 mb-3">
              <p className="text-center font-bold text-xl text-white tracking-widest">
                VAB 1234
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg border border-red-200">
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <p className="text-xs font-bold text-red-700">
              {language === 'BM' ? '2 Saman Belum Bayar' : '2 Unpaid Summons'}
            </p>
          </div>
        </div>

        {/* Card 3: Health */}
        <div className="min-w-[260px] lg:min-w-0 bg-white rounded-2xl p-5 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-red-50 p-2 rounded-lg">
              <Heart className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-bold text-[#003399] text-sm">
                {language === 'BM' ? 'Kesihatan' : 'Health'}
              </h3>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-200">
              <Shield className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <p className="text-xs text-green-600 font-medium">MySejahtera</p>
                <p className="text-sm font-bold text-green-700">
                  {language === 'BM' ? 'Risiko Rendah' : 'Low Risk'}
                </p>
              </div>
            </div>
          </div>

          <button className="w-full bg-[#003399] hover:bg-[#002266] text-white font-semibold text-xs py-2 rounded-xl transition-colors">
            {language === 'BM' ? 'Cari Hospital' : 'Find Hospital'}
          </button>
        </div>
      </div>
    </div>
  );
}