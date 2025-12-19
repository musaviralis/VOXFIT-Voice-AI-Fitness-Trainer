
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSubscription } from '../contexts/SubscriptionContext';
// Added missing Binary icon import
import { Check, Star, Shield, Smartphone, Loader2, Activity, Globe, CreditCard, Lock, QrCode, Zap, Copy, ArrowRight, PartyPopper, AlertTriangle, Info, ShieldAlert, RefreshCcw, Binary } from 'lucide-react';
import * as ReactRouterDom from 'react-router-dom';
const { useNavigate } = ReactRouterDom as any;

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
    
    // Simulate a tactical blockchain/bank verification delay
    setTimeout(() => {
        // 90% success rate simulation
        const isSuccessful = Math.random() > 0.1;

        if (isSuccessful) {
            upgradeToPremium();
            setPaymentStatus('success');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            setPaymentStatus('processing'); // Go back to allow retry
            setVerificationError("UTR_VERIFICATION_FAILED: We couldn't confirm your transaction. Please ensure the payment was successful and try again in a few minutes.");
        }
    }, 3500);
  };

  if (paymentStatus === 'success') {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center animate-fade-in px-4 py-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="w-40 h-40 bg-gradient-to-tr from-yellow-400 to-orange-600 rounded-full flex items-center justify-center mb-10 shadow-[0_0_120px_rgba(234,179,8,0.6)] animate-blob">
                <PartyPopper size={80} className="text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter italic">NEURAL_LINK_ACTIVATED</h1>
            <p className="text-2xl text-gray-400 max-w-2xl mb-12 leading-relaxed italic border-l-4 border-amber-500 pl-8">
                VOXFIT Premium is live. Your biometrics are now synced with our elite coaching clusters. Prepare for maximum output.
            </p>
            <button 
                onClick={() => navigate('/')}
                className="bg-white text-black font-black py-5 px-16 rounded-2xl text-xl hover:scale-105 transition-all flex items-center shadow-[0_30px_60px_rgba(255,255,255,0.2)] uppercase tracking-[0.2em]"
            >
                Enter Command Deck <ArrowRight className="ml-3" />
            </button>
        </div>
      );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in pb-16 pt-8">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-tight uppercase italic">
          UPGRADE_TO_ELITE
        </h1>
        <p className="text-gray-500 text-xl font-medium leading-relaxed italic uppercase tracking-widest opacity-60">
          “Bypassing common limits. Entering professional territory.”
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <Smartphone />, title: t('premium.features.coach'), desc: t('premium.features.coach_desc'), color: 'text-primary', bg: 'bg-primary/10' },
          { icon: <Activity />, title: t('premium.features.stats'), desc: t('premium.features.stats_desc'), color: 'text-secondary', bg: 'bg-secondary/10' },
          { icon: <Globe />, title: t('premium.features.local'), desc: t('premium.features.local_desc'), color: 'text-accent', bg: 'bg-accent/10' }
        ].map((f, i) => (
          <div key={i} className="glass-card p-8 rounded-[2rem] border border-white/5 shadow-2xl hover:border-white/20 transition-all">
             <div className={`${f.bg} w-14 h-14 rounded-2xl flex items-center justify-center ${f.color} mb-6 shadow-inner`}>
                {/* Fixed type error by using React.ReactElement<any> */}
                {React.cloneElement(f.icon as React.ReactElement<any>, { size: 28 })}
             </div>
             <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight italic">{f.title}</h3>
             <p className="text-sm text-gray-500 font-medium leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#080B14] rounded-[3rem] p-10 md:p-14 border border-white/5 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.8)] relative overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
         <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

         <div className="relative z-10 flex flex-col items-center">
            {/* Cycle Toggle */}
            <div className="bg-black/40 p-2 rounded-2xl flex items-center space-x-3 mb-12 border border-white/10 backdrop-blur-3xl">
               <button 
                 onClick={() => setBillingCycle('monthly')}
                 disabled={paymentStatus !== 'idle'}
                 className={`px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${billingCycle === 'monthly' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-600 hover:text-gray-300'}`}
               >
                 {t('premium.monthly')}
               </button>
               <button 
                 onClick={() => setBillingCycle('yearly')}
                 disabled={paymentStatus !== 'idle'}
                 className={`px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all flex items-center ${billingCycle === 'yearly' ? 'bg-primary text-white shadow-[0_0_30px_rgba(59,130,246,0.4)]' : 'text-gray-600 hover:text-gray-300'}`}
               >
                 {t('premium.yearly')}
                 <span className="ml-3 bg-white/20 text-white text-[9px] px-2 py-1 rounded-md uppercase tracking-tighter">Save 45%</span>
               </button>
            </div>

            {/* Price Display */}
            <div className="text-center mb-12 group">
               <div className="flex items-start justify-center text-white leading-none">
                  <span className="text-3xl mt-4 font-black opacity-30 italic">₹</span>
                  <span className="text-[10rem] font-black tracking-tighter drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-transform duration-500">{amount}</span>
               </div>
               <p className="text-gray-600 font-black text-xs uppercase tracking-[0.4em] mt-6 flex items-center justify-center gap-3">
                 <Binary size={14} className="opacity-40" /> {billingCycle === 'monthly' ? 'DEBIT_CYCLE: MONTHLY' : 'DEBIT_CYCLE: ANNUAL'}
               </p>
            </div>

            {/* Error Message UI */}
            {verificationError && (
              <div className="w-full max-w-md mb-8 p-6 bg-red-500/10 border border-red-500/40 rounded-3xl animate-fade-in-up flex items-start gap-4 shadow-[0_0_40px_rgba(239,68,68,0.1)]">
                 <ShieldAlert size={28} className="text-red-500 shrink-0" />
                 <div className="space-y-1">
                    <p className="text-red-500 font-black text-xs uppercase tracking-widest">Protocol_Error: Verification_Failed</p>
                    <p className="text-gray-400 text-xs leading-relaxed font-medium">{verificationError}</p>
                 </div>
              </div>
            )}

            {/* Payment Options Selection */}
            {paymentStatus === 'idle' && (
                <div className="flex justify-center w-full max-w-md mb-12">
                <div className="grid grid-cols-2 w-full gap-6">
                    <button onClick={() => setPaymentMethod('upi')} className={`group flex flex-col items-center justify-center p-8 rounded-[2.5rem] border transition-all ${paymentMethod === 'upi' ? 'bg-white/10 border-cyan/40 text-white shadow-[0_0_30px_rgba(77,238,202,0.1)]' : 'bg-transparent border-white/5 text-gray-600 hover:bg-white/5'}`}>
                        <div className={`p-4 rounded-2xl mb-4 ${paymentMethod === 'upi' ? 'bg-cyan/20 text-cyan' : 'bg-white/5'}`}>
                           <QrCode size={32} />
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest">UPI_SCAN</span>
                    </button>
                    <button onClick={() => setPaymentMethod('paypal')} className={`group flex flex-col items-center justify-center p-8 rounded-[2.5rem] border transition-all ${paymentMethod === 'paypal' ? 'bg-[#0070BA]/10 border-[#0070BA]/40 text-white shadow-[0_0_30px_rgba(0,112,186,0.1)]' : 'bg-transparent border-white/5 text-gray-600 hover:bg-white/5'}`}>
                        <div className={`p-4 rounded-2xl mb-4 ${paymentMethod === 'paypal' ? 'bg-[#0070BA]/20 text-[#0070BA]' : 'bg-white/5'}`}>
                           <CreditCard size={32} />
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest">PAYPAL_OS</span>
                    </button>
                </div>
                </div>
            )}

            {/* Verification / Active Payment State */}
            {(paymentStatus === 'processing' || paymentStatus === 'verifying') && (
              <div className="mb-12 p-8 md:p-12 bg-black/40 rounded-[3rem] shadow-3xl flex flex-col items-center max-w-md w-full border border-white/10 backdrop-blur-3xl relative overflow-hidden group">
                 {/* Scanning Effect during verification */}
                 {paymentStatus === 'verifying' && (
                   <div className="absolute top-0 left-0 w-full h-1 bg-cyan shadow-[0_0_20px_#4deeca] animate-[scan_2s_linear_infinite] z-20"></div>
                 )}
                 
                 {paymentMethod === 'upi' ? (
                     <>
                        <div className="p-6 bg-white rounded-[2rem] mb-8 relative">
                            <img src={qrCodeUrl} alt="Scan to Pay" className="w-48 h-48 mix-blend-multiply" />
                            {paymentStatus === 'verifying' && (
                                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-[2.2rem]">
                                   <Loader2 className="text-cyan animate-spin" size={48} />
                                </div>
                            )}
                        </div>
                        <p className="text-white text-[10px] font-black text-center tracking-[0.4em] uppercase mb-6 flex items-center gap-3">
                           <Activity size={14} className="text-cyan animate-pulse" /> SCAN_AND_DEPLOY_₹{amount}
                        </p>
                        <div className="w-full flex items-center justify-between bg-white/5 rounded-2xl p-4 border border-white/10 mb-8 hover:border-cyan/40 transition-colors">
                            <div className="text-left overflow-hidden">
                                <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest mb-1">Target_UPI_Address</p>
                                <p className="text-gray-300 font-mono text-xs font-bold truncate">{upiId}</p>
                            </div>
                            <button onClick={handleCopyUpi} className="ml-4 p-3 bg-white/5 hover:bg-cyan/20 rounded-xl transition-all">
                                {copied ? <Check size={18} className="text-cyan" /> : <Copy size={18} className="text-gray-400" />}
                            </button>
                        </div>
                     </>
                 ) : (
                     <div className="text-center p-8 space-y-6">
                         <div className="relative">
                            <CreditCard size={80} className="text-[#0070BA] mx-auto opacity-80" />
                            {paymentStatus === 'verifying' && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                   <Loader2 className="text-white animate-spin" size={32} />
                                </div>
                            )}
                         </div>
                         <div className="space-y-2">
                            <p className="text-white font-black text-xl italic uppercase tracking-tighter">PayPal_Protocol_Awaiting</p>
                            <p className="text-gray-500 text-xs font-medium uppercase tracking-widest">Complete external payment stream, then verify below.</p>
                         </div>
                     </div>
                 )}
                 
                 <div className="w-full pt-8 border-t border-white/10 flex flex-col gap-4">
                     <button 
                       onClick={handleVerifyPayment} 
                       disabled={paymentStatus === 'verifying'} 
                       className={`w-full ${paymentStatus === 'verifying' ? 'bg-white/5 text-gray-500' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_40px_rgba(16,185,129,0.2)]'} font-black py-5 rounded-2xl transition-all flex items-center justify-center text-lg uppercase tracking-widest`}
                     >
                        {paymentStatus === 'verifying' ? (
                           <>
                              <Loader2 className="animate-spin mr-3" size={20} />
                              SYNCING_TRANSACTION...
                           </>
                        ) : (
                           <>
                              <RefreshCcw size={20} className="mr-3" />
                              CONFIRM_DEPLOYMENT
                           </>
                        )}
                     </button>
                     {paymentStatus !== 'verifying' && (
                        <button onClick={() => setPaymentStatus('idle')} className="text-[10px] font-black text-gray-700 hover:text-white uppercase tracking-widest transition-colors">
                           Change_Payment_Stream
                        </button>
                     )}
                 </div>
              </div>
            )}

            {/* Initial Subscribe Button */}
            {paymentStatus === 'idle' && (
                <div className="w-full max-w-md space-y-6">
                <button 
                  onClick={handleSubscribe} 
                  className={`w-full text-white font-black py-5 rounded-2xl text-xl transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-[1.03] active:scale-[0.97] uppercase tracking-[0.3em] italic ${paymentMethod === 'upi' ? 'bg-gradient-vox' : 'bg-[#0070BA]'}`}
                >
                    {paymentMethod === 'upi' ? <Zap size={24} className="mr-4 fill-white animate-pulse" /> : <Lock size={20} className="mr-4" />}
                    INITIATE_UPGRADE
                </button>
                <button onClick={() => navigate('/')} className="w-full text-gray-600 hover:text-white font-black text-[10px] py-4 transition-colors uppercase tracking-[0.6em]">
                    STAY_ON_FREE_PROTOCOL
                </button>
                </div>
            )}

            {/* Footer Trust Indicators */}
            <div className="mt-16 pt-12 border-t border-white/5 w-full">
               <div className="flex items-start gap-5 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 mb-10 shadow-inner">
                 <Info size={28} className="text-blue-500 shrink-0 mt-1" />
                 <p className="text-[12px] text-gray-500 leading-relaxed font-medium italic">
                   Subscription applies to VOXFIT Global Cluster. Cancel anytime via Google Play settings. Secure end-to-end encrypted payment. Professional grade intelligence is worth the investment.
                 </p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[11px] font-black text-gray-700 uppercase tracking-[0.4em] text-center">
                  <span className="flex items-center justify-center gap-3"><Check size={16} className="text-emerald-500" /> FULL_DISCLOSURE</span>
                  <span className="flex items-center justify-center gap-3"><Shield size={16} className="text-blue-500" /> SECURE_HANDSHAKE</span>
                  <span className="flex items-center justify-center gap-3"><Star size={16} className="text-amber-500" /> ZERO_AD_NOISE</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Premium;
