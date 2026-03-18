import { useState } from 'react';
import { Shield, User, Lock, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router';

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      // Demo: Navigate to OTP verification
      navigate('/otp');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#003399] via-[#0047BB] to-[#003399]" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        {/* Header */}
        <div className="text-center pt-12 pb-8 px-6">
          {/* Jata Negara Placeholder */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
              <Shield className="w-12 h-12 text-[#FFC72C]" />
            </div>
          </div>
          
          <h1 className="text-white text-xl font-bold mb-2 tracking-wide">
            SISTEM IDENTITI DIGITAL NASIONAL
          </h1>
          <p className="text-white/80 text-sm">National Digital Identity System</p>
          <div className="w-16 h-1 bg-[#FFC72C] mx-auto rounded-full mt-4"></div>
        </div>

        {/* Main Content Card */}
        <div className="flex-1 bg-white rounded-t-[32px] px-6 py-8 shadow-2xl">
          <div className="max-w-sm mx-auto">
            {/* Title */}
            <h2 className="text-2xl font-bold text-[#003399] mb-2 text-center">
              Log Masuk
            </h2>
            <p className="text-sm text-slate-600 text-center mb-8">
              Akses perkhidmatan kerajaan dengan selamat
            </p>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Username/ID Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nama Pengguna / ID
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan nama pengguna"
                    className="w-full pl-11 pr-4 py-3.5 border-2 border-slate-200 rounded-xl text-sm 
                      focus:border-[#003399] focus:outline-none focus:ring-4 focus:ring-[#003399]/20 
                      transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Kata Laluan / Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata laluan"
                    className="w-full pl-11 pr-4 py-3.5 border-2 border-slate-200 rounded-xl text-sm 
                      focus:border-[#003399] focus:outline-none focus:ring-4 focus:ring-[#003399]/20 
                      transition-all"
                    required
                  />
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-[#003399] hover:bg-[#002266] text-white font-bold py-4 
                  rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl 
                  text-lg tracking-wider flex items-center justify-center gap-2 mt-6"
              >
                LOG MASUK
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-8 space-y-3">
              <div className="h-px bg-slate-200"></div>
              
              <div className="flex flex-col items-center gap-3">
                <Link
                  to="#"
                  className="text-sm text-[#003399] hover:text-[#002266] font-semibold hover:underline transition-colors"
                >
                  Lupa Kata Laluan?
                </Link>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">Pengguna baru?</span>
                  <Link
                    to="#"
                    className="text-sm text-[#003399] hover:text-[#002266] font-semibold hover:underline transition-colors"
                  >
                    Daftar Akaun Baru
                  </Link>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="flex justify-center gap-2 mt-12">
              <div className="w-2 h-2 rounded-full bg-[#003399]"></div>
              <div className="w-2 h-2 rounded-full bg-[#CC0001]"></div>
              <div className="w-2 h-2 rounded-full bg-[#FFC72C]"></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-6 px-6">
          <p className="text-xs text-white/60">
            © 2026 Kerajaan Malaysia. Hak Cipta Terpelihara.
          </p>
        </div>
      </div>
    </div>
  );
}
