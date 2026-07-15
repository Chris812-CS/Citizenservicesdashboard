import { Wallet, CalendarDays, TrendingUp, ChevronRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router';

interface SaraWalletCardProps {
  language: 'BM' | 'EN';
}

export function SaraWalletCard({ language }: SaraWalletCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="min-w-[280px] lg:min-w-0 rounded-2xl overflow-hidden shadow-lg border border-slate-100 flex flex-col bg-white"
      style={{ fontFamily: 'Poppins, sans-serif' , height: "310px"}}
    >
      {/* ── Top gradient band ── */}
      <div
        className="relative px-5 pt-5 pb-6 flex flex-col justify-between shrink-0"
        style={{
          background: 'linear-gradient(135deg, #003399 0%, #005522 100%)',
          height: '160px',
        }}
      >
        {/* Decorative circles */}
        <span
          className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }}
        />
        <span
          className="absolute bottom-0 left-1/2 w-48 h-16 rounded-full opacity-10 -translate-x-1/2 translate-y-1/2"
          style={{ background: 'radial-gradient(ellipse, #ffffff 0%, transparent 70%)' }}
        />

        {/* Header row */}
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm leading-tight">
                {language === 'BM' ? 'Dompet SARA' : 'SARA Wallet'}
              </h3>
              <p className="text-white/70 mt-0.5" style={{ fontSize: '9px' }}>
                {language === 'BM'
                  ? 'Program: SARA Untuk Semua 2026'
                  : 'Program: SARA For All 2026'}
              </p>
            </div>
          </div>

          {/* Active badge */}
          <span className="flex items-center gap-1 bg-emerald-400/25 border border-emerald-300/40 text-emerald-200 rounded-full px-2.5 py-0.5" style={{ fontSize: '10px' }}>
            <TrendingUp className="w-3 h-3" />
            <span className="font-semibold">{language === 'BM' ? 'Aktif' : 'Active'}</span>
          </span>
        </div>

        {/* Balance */}
        <div className="relative z-10">
          <p className="text-white/60 mb-1" style={{ fontSize: '10px' }}>
            {language === 'BM' ? 'Baki Semasa' : 'Current Balance'}
          </p>
          <div className="flex items-end gap-1.5">
            <span className="text-white/80 font-semibold text-base self-end mb-1">RM</span>
            <span
              className="font-bold text-white leading-none"
              style={{ fontSize: '29px', letterSpacing: '-1px' }}
            >
              87.64
            </span>
          </div>
        </div>
      </div>

      {/* ── Divider with pill notch ── */}
      <div className="relative bg-white h-4 shrink-0">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-4 rounded-full"
          style={{ background: 'linear-gradient(135deg, #003399 0%, #005522 100%)' }}
        />
      </div>

      {/* ── Bottom white body ── */}
      <div className="bg-white px-5 -mt-1 pt-5 flex-1 flex flex-col justify-start">
        {/* Info chips row */}
        <div className="flex gap- flex-wrap">
          <span className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-700 rounded-full px-3 py-1" style={{ fontSize: '12px' }}>
            <Sparkles className="w-3 h-3 text-blue-500" />
            <span className="font-medium">SARA 2026</span>
          </span>
          <span className="flex items-center gap-1.5 bg-green-50 border border-green-100 text-green-700 rounded-full px-3 py-1" style={{ fontSize: '12px' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="font-medium">{language === 'BM' ? 'Aktif' : 'Active'}</span>
          </span>
        </div>

        {/* Validity row + CTA */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
            <div>
              <p className="text-slate-400" style={{ fontSize: '9px' }}>
                {language === 'BM' ? 'Sah Laku Sehingga' : 'Valid Until'}
              </p>
              <p className="text-slate-500 font-semibold" style={{ fontSize: '11px' }}>
                31/12/2026
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/sara-balance', { state: { language } })}
            className="flex items-center gap-1 text-white rounded-xl px-3 py-1.5 transition-all active:scale-95 hover:opacity-90 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #003399 0%, #005522 100%)',
              fontSize: '10px',
            }}
          >
            <span className="font-semibold">{language === 'BM' ? 'Guna' : 'Use'}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}