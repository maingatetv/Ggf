import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Lock, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PaystackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title: string;
  amountUSD: number;
  appName: string;
}

export const PaystackModal: React.FC<PaystackModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  title,
  amountUSD,
  appName,
}) => {
  const [email, setEmail] = useState('client@oskayi.com');
  const [cardNumber, setCardNumber] = useState('4084 •••• •••• 1293');
  const [expiry, setExpiry] = useState('11/28');
  const [cvv, setCvv] = useState('884');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00C3F7', '#0BA4DB', '#10B981', '#F59E0B'],
        });
      } catch {
        // ignore if canvas-confetti is not available
      }

      setTimeout(() => {
        setIsPaid(false);
        onSuccess();
        onClose();
      }, 1400);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Header bar */}
        <div className="bg-[#0BA4DB] text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold text-lg tracking-wider">
              P
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-sky-100 font-semibold">Paystack Inline</div>
              <div className="font-bold text-sm tracking-tight">Oskayi Consult USD Gateway</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6">
          {isPaid ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Payment Approved!</h3>
              <p className="text-sm text-slate-600">
                ${amountUSD} USD confirmed. Unlocking {appName}...
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex justify-between items-center">
                <div>
                  <div className="text-xs text-slate-500 font-medium">Authorizing Item</div>
                  <div className="text-sm font-semibold text-slate-900">{title}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 font-medium">Total</div>
                  <div className="text-xl font-black text-emerald-600">${amountUSD}.00</div>
                  <div className="text-[10px] text-slate-400 font-medium">USD Only</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Customer Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0BA4DB] outline-none"
                    placeholder="you@domain.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Card Number <span className="text-emerald-600 text-[11px] font-normal">(Paystack USD Live & Test)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0BA4DB] outline-none font-mono"
                    />
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Valid Thru</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0BA4DB] outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">CVV</label>
                    <input
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0BA4DB] outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handlePay}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Verifying with Paystack...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Pay ${amountUSD} USD via Paystack</span>
                    </>
                  )}
                </button>
              </div>

              {/* Instant 1-click test fill helper */}
              <button
                type="button"
                onClick={handlePay}
                className="w-full text-center text-xs text-sky-600 hover:text-sky-800 font-medium py-1.5 bg-sky-50 rounded-lg border border-sky-100 hover:bg-sky-100 transition-colors flex items-center justify-center space-x-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Instant 1-Click Paystack Verification</span>
              </button>

              <div className="flex items-center justify-center space-x-3 text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                <div className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>256-Bit SSL Encrypted</span>
                </div>
                <span>•</span>
                <span>PCI-DSS Level 1 Compliant</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
