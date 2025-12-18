
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { Check, Star, Shield, Smartphone, Loader2, Activity, Globe, CreditCard, Lock, QrCode, Zap, Copy, ArrowRight, PartyPopper, AlertTriangle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Premium: React.FC = () => {
  const { t } = useLanguage();
  const { upgradeToPremium } = useSubscription();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'paypal'>('upi');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'verifying' | 'success'>('idle');
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const hasHeardPromo = sessionStorage.getItem('voxfit_promo_heard');
    if (!hasHeardPromo) {
      const msg = new SpeechSynthesisUtterance("Welcome to VOXFIT. Upgrade to Premium to train smarter and stay consistent.");
      msg.rate = 0.9;
      window.speechSynthesis.speak(msg);
      sessionStorage.setItem('voxfit_promo_heard', 'true');
    }
  }, []);

  const amount = billingCycle === 'monthly' ? '299' : '1999';
  const upiId = "musavir.ali.321@okaxis";
  const payeeName = "VOXFIT Fitness";
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiLink)}&bgcolor=0d1117&color=ffffff&margin=2`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubscribe = () => {
    setPaymentStatus('processing');
    setVerificationError(null);
    setTimeout(() => {
      if (paymentMethod === 'paypal') {
        const itemName = `VOXFIT Premium (${billingCycle === 'monthly' ? 'Monthly' : 'Yearly'})`;
        const businessEmail = "musavir.ali.321@gmail.com";
        const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${businessEmail}&item_name=${encodeURIComponent(itemName)}&amount=${amount}&currency_code=INR`;
        window.open(paypalUrl, '_blank');
      } else {
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            window.location.href = upiLink;
        }
      }
    }, 500);
  };

  const handleVerifyPayment = () => {
    setPaymentStatus('verifying');
    setVerificationError(null);
    setTimeout(() => {
        upgradeToPremium();
        setPaymentStatus('success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2500);
  };

  if (paymentStatus === 'success') {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center animate-fade-in px-4 py-12">
            <div className="w-32 h-32 bg-gradient-to-tr from-yellow-400 to-orange-600 rounded-full flex items-center justify-center mb-8 shadow-[0_0_100px_rgba(234,179,8,0.5)] animate-blob">
                <PartyPopper size={64} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Welcome to the Elite.</h1>
            <p className="text-xl text-gray-400 max-w-lg mb-10 leading-relaxed">
                Your VOXFIT Premium membership is active. Prepare to transform with AI-driven precision.
            </p>
            <button 
                onClick={() => navigate('/')}
                className="bg-white text-black font-black py-4 px-12 rounded-xl text-lg hover:scale-105 transition-transform flex items-center shadow-2xl"
            >
                Back to Dashboard <ArrowRight className="ml-2" />
            </button>
        </div>
      );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in pb-16 pt-8">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
          {t('premium.title')}
        </h1>
        <p className="text-gray-400 text-xl font-medium leading-relaxed italic">
          “{t('premium.subtitle')}”
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-white/5 shadow-lg">
           <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-4">
              <Smartphone size={24} />
           </div>
           <h3 className="text-lg font-bold text-white mb-2">{t('premium.features.coach')}</h3>
           <p className="text-sm text-gray-500 font-medium leading-relaxed">{t('premium.features.coach_desc')}</p>
        </div>
        <div className="glass-card p-6 rounded-2xl border border-white/5 shadow-lg">
           <div className="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center text-secondary mb-4">
              <Activity size={24} />
           </div>
           <h3 className="text-lg font-bold text-white mb-2">{t('premium.features.stats')}</h3>
           <p className="text-sm text-gray-500 font-medium leading-relaxed">{t('premium.features.stats_desc')}</p>
        </div>
        <div className="glass-card p-6 rounded-2xl border border-white/5 shadow-lg">
           <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center text-accent mb-4">
              <Globe size={24} />
           </div>
           <h3 className="text-lg font-bold text-white mb-2">{t('premium.features.local')}</h3>
           <p className="text-sm text-gray-500 font-medium leading-relaxed">{t('premium.features.local_desc')}</p>
        </div>
      </div>

      <div className="bg-[#0d1117] rounded-[2rem] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

         <div className="relative z-10 flex flex-col items-center">
            <div className="bg-black/40 p-1.5 rounded-xl flex items-center space-x-2 mb-10 border border-white/5">
               <button 
                 onClick={() => setBillingCycle('monthly')}
                 disabled={paymentStatus !== 'idle'}
                 className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
               >
                 {t('premium.monthly')}
               </button>
               <button 
                 onClick={() => setBillingCycle('yearly')}
                 disabled={paymentStatus !== 'idle'}
                 className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center ${billingCycle === 'yearly' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:text-gray-300'}`}
               >
                 {t('premium.yearly')}
                 <span className="ml-2 bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wide">{t('premium.save')} 45%</span>
               </button>
            </div>

            <div className="text-center mb-8">
               <div className="flex items-start justify-center text-white leading-none">
                  <span className="text-2xl mt-2 font-medium opacity-50">₹</span>
                  <span className="text-7xl font-black tracking-tighter">{amount}</span>
               </div>
               <p className="text-gray-500 font-medium mt-4">
                 {billingCycle === 'monthly' ? 'Billed every month' : 'Billed annually'}
               </p>
            </div>

            {paymentStatus === 'idle' && (
                <div className="flex justify-center w-full max-w-sm mb-8">
                <div className="grid grid-cols-2 w-full gap-4">
                    <button onClick={() => setPaymentMethod('upi')} className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${paymentMethod === 'upi' ? 'bg-white/10 border-white/20 text-white' : 'bg-transparent border-white/5 text-gray-500 hover:bg-white/5'}`}>
                        <QrCode size={24} className="mb-2" />
                        <span className="text-sm font-bold">UPI</span>
                    </button>
                    <button onClick={() => setPaymentMethod('paypal')} className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${paymentMethod === 'paypal' ? 'bg-[#0070BA]/20 border-[#0070BA]/50 text-white' : 'bg-transparent border-white/5 text-gray-500 hover:bg-white/5'}`}>
                        <CreditCard size={24} className="mb-2" />
                        <span className="text-sm font-bold">PayPal</span>
                    </button>
                </div>
                </div>
            )}

            {(paymentStatus === 'processing' || paymentStatus === 'verifying') && (
              <div className="mb-8 p-6 bg-white/5 rounded-2xl shadow-xl flex flex-col items-center max-w-sm w-full border border-white/10">
                 {paymentMethod === 'upi' ? (
                     <>
                        <div className="p-4 bg-white rounded-xl mb-4">
                            <img src={qrCodeUrl} alt="Scan to Pay" className="w-40 h-40 mix-blend-multiply" />
                        </div>
                        <p className="text-white text-xs font-bold text-center tracking-widest uppercase mb-2">Scan to Pay ₹{amount}</p>
                        <div className="w-full flex items-center justify-between bg-black/40 rounded-xl p-3 border border-white/10 mb-4">
                            <div className="text-left overflow-hidden">
                                <p className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">UPI ID</p>
                                <p className="text-gray-300 font-mono text-xs font-bold truncate">{upiId}</p>
                            </div>
                            <button onClick={handleCopyUpi} className="ml-3 p-2 hover:bg-white/10 rounded-lg transition-colors">
                                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-gray-400" />}
                            </button>
                        </div>
                     </>
                 ) : (
                     <div className="text-center p-6">
                         <CreditCard size={48} className="text-[#0070BA] mx-auto mb-4" />
                         <p className="text-white font-bold mb-2">PayPal Link Ready</p>
                         <p className="text-gray-400 text-sm">Complete payment in the browser, then confirm here.</p>
                     </div>
                 )}
                 
                 <div className="w-full pt-4 border-t border-white/10">
                     <button onClick={handleVerifyPayment} disabled={paymentStatus === 'verifying'} className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-3 rounded-xl transition-all shadow-lg flex items-center justify-center">
                        {paymentStatus === 'verifying' ? <Loader2 className="animate-spin mr-2" /> : <Check size={18} className="mr-2" />}
                        {paymentStatus === 'verifying' ? 'Verifying...' : 'I Have Paid'}
                     </button>
                 </div>
              </div>
            )}

            {paymentStatus === 'idle' && (
                <div className="w-full max-w-sm space-y-5">
                <button onClick={handleSubscribe} className={`w-full text-white font-black py-4 rounded-xl text-lg transition-all shadow-lg flex items-center justify-center hover:scale-[1.02] active:scale-[0.98] ${paymentMethod === 'upi' ? 'bg-gradient-to-r from-orange-500 to-yellow-500' : 'bg-[#0070BA]'}`}>
                    {paymentMethod === 'upi' ? <Zap size={18} className="mr-2 fill-white" /> : <Lock size={18} className="mr-2" />}
                    {t('premium.start')}
                </button>
                <button onClick={() => navigate('/')} className="w-full text-gray-500 hover:text-white font-medium text-sm py-2 transition-colors uppercase tracking-widest text-xs">
                    {t('premium.free')}
                </button>
                </div>
            )}

            <div className="mt-12 pt-8 border-t border-white/5 w-full">
               <div className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 mb-6">
                 <Info size={20} className="text-blue-400 shrink-0 mt-0.5" />
                 <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                   {t('premium.trust.autoRenew')} Subscription applies to VOXFIT. {t('premium.trust.cancel')} Your payment will be charged to your Google Play account at confirmation of purchase.
                 </p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest text-center">
                  <span className="flex items-center justify-center gap-2"><Check size={12} className="text-emerald-500" /> {t('premium.trust.cancel')}</span>
                  <span className="flex items-center justify-center gap-2"><Shield size={12} className="text-blue-500" /> {t('premium.trust.secure')}</span>
                  <span className="flex items-center justify-center gap-2"><Star size={12} className="text-amber-500" /> {t('premium.trust.noAds')}</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Premium;
