import { useState, useRef, useEffect } from 'react';
import { Shield, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router';

type FeedbackState = 'idle' | 'success' | 'error';

export function OTPVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(60);
  const [feedbackState, setFeedbackState] = useState<FeedbackState>('idle');
  const [showTimeoutPopup, setShowTimeoutPopup] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setShowTimeoutPopup(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
  };

  const handleSubmit = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      // Demo: Accept '123456' as correct OTP
      if (otpValue === '123456') {
        setFeedbackState('success');
        setTimeout(() => {
          navigate('/super-app');
        }, 1500);
      } else {
        setFeedbackState('error');
        setTimeout(() => {
          setFeedbackState('idle');
        }, 3000);
      }
    }
  };

  const handleRequestNewCode = () => {
    setShowTimeoutPopup(false);
    setTimer(60);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const isTimedOut = timer === 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#003399] via-[#0047BB] to-[#003399]" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-md mx-auto min-h-screen flex flex-col shadow-2xl">
        {/* Header */}
        <div className="text-center pt-8 pb-6 px-4">
          {/* Jata Negara Placeholder */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
              <Shield className="w-10 h-10 text-[#FFC72C]" />
            </div>
          </div>
          
          <h1 className="text-white text-lg font-bold mb-2 tracking-wide px-4">
            SISTEM IDENTITI DIGITAL NASIONAL
          </h1>
          <div className="w-16 h-1 bg-[#FFC72C] mx-auto rounded-full"></div>
        </div>

        {/* Main Content Card */}
        <div className="flex-1 bg-white rounded-t-[32px] px-5 py-6 shadow-2xl">
          <div className="max-w-sm mx-auto">
            {/* Title */}
            <h2 className="text-xl font-bold text-[#003399] mb-2 text-center">
              Sahkan Identiti Anda
            </h2>
            <p className="text-xs text-slate-600 text-center mb-6 leading-relaxed">
              Kod 6-digit telah dihantar ke
              <span className="block mt-1 font-semibold text-slate-800">
                +6012-***5678
              </span>
            </p>

            {/* OTP Input Boxes */}
            <div className="flex justify-center gap-1.5 mb-5" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  placeholder={String(index + 1)}
                  disabled={isTimedOut}
                  className={`w-11 h-12 text-center text-xl font-bold border-2 rounded-xl transition-all duration-200 outline-none
                    focus:border-[#003399] focus:ring-2 focus:ring-[#003399]/20
                    ${isTimedOut ? 'bg-slate-100 border-slate-200 text-slate-400' : 'border-slate-300 text-slate-800'}
                    placeholder:text-slate-300 placeholder:text-base`}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={otp.join('').length !== 6 || isTimedOut}
              className="w-full bg-[#003399] hover:bg-[#002266] disabled:bg-slate-300 disabled:cursor-not-allowed 
                text-white font-bold py-3.5 rounded-xl transition-all duration-200 
                shadow-lg hover:shadow-xl disabled:shadow-none mb-3 text-base tracking-wider"
            >
              SAHKAN
            </button>

            {/* Feedback Messages */}
            {feedbackState === 'success' && (
              <div className="flex items-center justify-center gap-2 p-2.5 bg-green-50 rounded-lg border border-green-200 mb-3">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <p className="text-xs font-semibold text-green-700">
                  Correct! Redirecting...
                </p>
              </div>
            )}

            {feedbackState === 'error' && (
              <div className="flex items-center justify-center gap-2 p-2.5 bg-red-50 rounded-lg border border-red-200 mb-3">
                <XCircle className="w-4 h-4 text-red-600" />
                <p className="text-xs font-semibold text-red-700">
                  OTP is wrong. Please try again.
                </p>
              </div>
            )}

            {/* Timer Display */}
            <div className="text-center">
              <p className="text-xs text-slate-500">
                Kod akan tamat tempoh dalam{' '}
                <span className={`font-semibold ${timer <= 10 ? 'text-red-600' : 'text-[#003399]'}`}>
                  {timer}s
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeout Popup */}
      {showTimeoutPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-5">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center">
                <XCircle className="w-7 h-7 text-slate-600" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-[#003399] text-center mb-2">
              Kod Tamat Tempoh
            </h3>
            <p className="text-xs text-slate-600 text-center mb-5">
              Adakah anda mahu meminta kod baru?
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigate('/login')}
                className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-colors"
              >
                Tidak
              </button>
              <button
                onClick={handleRequestNewCode}
                className="px-3 py-2.5 bg-[#003399] hover:bg-[#002266] text-white font-semibold text-sm rounded-xl transition-colors"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}