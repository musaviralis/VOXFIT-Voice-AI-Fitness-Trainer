import React, { useState } from 'react';
// Fix: Use namespace import and cast to any to resolve "no exported member" errors
import * as ReactRouterDom from 'react-router-dom';
const { NavLink, Link } = ReactRouterDom as any;
import { Dumbbell, LayoutDashboard, Utensils, MessageSquare, Menu, X, Activity, Clapperboard, Mic, Globe, Crown, Zap, ChevronRight, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { LANGUAGES } from '../services/translations';
import { SupportedLanguage } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const VoxLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="voxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4deeca" />
        <stop offset="50%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
    {/* Sound Waves Left */}
    <rect x="15" y="42" width="6" height="16" rx="3" fill="url(#voxGradient)" opacity="0.6" />
    <rect x="25" y="32" width="6" height="36" rx="3" fill="url(#voxGradient)" opacity="0.8" />
    
    {/* Microphone Body */}
    <rect x="38" y="20" width="24" height="45" rx="12" stroke="url(#voxGradient)" strokeWidth="6" />
    <path d="M35 55C35 62.1797 40.8203 68 48 68V68C55.1797 68 61 62.1797 61 55" stroke="url(#voxGradient)" strokeWidth="5" strokeLinecap="round" />
    <path d="M48 68V78M40 78H56" stroke="url(#voxGradient)" strokeWidth="5" strokeLinecap="round" />
    
    {/* Sound Waves Right */}
    <rect x="69" y="32" width="6" height="36" rx="3" fill="url(#voxGradient)" opacity="0.8" />
    <rect x="79" y="42" width="6" height="16" rx="3" fill="url(#voxGradient)" opacity="0.6" />
  </svg>
);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { isPremium } = useSubscription();

  const navItems = [
    { name: t('nav.dashboard'), path: '/', icon: <LayoutDashboard size={20} /> },
    { name: t('nav.voice'), path: '/voice', icon: <Mic size={20} /> },
    { name: t('nav.workouts'), path: '/workouts', icon: <Dumbbell size={20} /> },
    { name: t('nav.nutrition'), path: '/nutrition', icon: <Utensils size={20} /> },
    { name: t('nav.creator'), path: '/creator', icon: <Clapperboard size={20} /> },
    { name: t('nav.coach'), path: '/coach', icon: <MessageSquare size={20} /> },
  ];

  const toggleLanguage = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsLangMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex text-gray-200 font-sans selection:bg-primary/30 selection:text-white overflow-hidden relative">
      
      {/* Global Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-40"></div>
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-cyan/5 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] animate-blob" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px] animate-blob" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-80 h-screen z-30 sticky top-0 glass-panel border-r border-white/5 shadow-2xl backdrop-blur-xl">
        <div className="p-8 pb-4">
          <div className="flex items-center space-x-4 mb-10 group cursor-pointer">
            <div className="relative">
               <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <VoxLogo className="w-12 h-12 relative z-10 drop-shadow-lg" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-white leading-none">VOX<span className="text-primary group-hover:text-cyan transition-colors duration-500">FIT</span></h1>
              <span className="text-[8px] text-gray-400 font-bold tracking-[0.1em] uppercase">Train Smarter. Stay Consistent.</span>
            </div>
          </div>
          
          {/* Gamification Widget */}
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
                {isPremium ? <Star size={40} className="text-amber-500 rotate-12" /> : <Crown size={40} className="rotate-12" />}
             </div>
             <div className="relative z-10">
                <div className="flex justify-between items-center mb-2">
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Current Level</span>
                   <span className="text-xs font-black text-amber-500">LVL 12</span>
                </div>
                <h3 className="text-white font-bold text-sm mb-3">VOX Disciple</h3>
                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                   <div className="h-full bg-gradient-vox w-[65%] rounded-full relative">
                      <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                   </div>
                </div>
                <div className="mt-2 text-[10px] text-gray-500 font-medium text-right">240 XP to Level 13</div>
             </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }: any) =>
                `flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? 'text-white bg-white/5 border-l-4 border-cyan shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {({ isActive }: any) => (
                <>
                  <div className="flex items-center space-x-4 relative z-10">
                    <span className={`${isActive ? 'text-cyan scale-110' : 'text-gray-500 group-hover:text-gray-300'} transition-all duration-300`}>
                      {item.icon}
                    </span>
                    <span className={`text-sm font-bold tracking-wide ${isActive ? 'text-white' : ''}`}>{item.name}</span>
                  </div>
                  {isActive && <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-cyan/5 to-transparent pointer-events-none"></div>}
                </>
              )}
            </NavLink>
          ))}
          
          {/* Premium Link in Nav */}
          {isPremium ? (
             <div className="flex items-center justify-between px-5 py-4 rounded-xl mt-6 border border-amber-500/30 bg-amber-500/10">
               <div className="flex items-center space-x-4">
                 <div className="bg-amber-500 p-1 rounded-full text-black">
                    <Star size={14} fill="black" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-xs font-black tracking-wide text-amber-500 uppercase">Premium Member</span>
                    <span className="text-[10px] text-amber-500/70">Elite Status Active</span>
                 </div>
               </div>
             </div>
          ) : (
            <NavLink
              to="/premium"
              className={({ isActive }: any) =>
                `flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden mt-6 border border-amber-500/20 hover:border-amber-500/50 ${
                  isActive
                    ? 'bg-amber-500/10'
                    : 'hover:bg-amber-500/5'
                }`
              }
            >
              <div className="flex items-center space-x-4 relative z-10">
                <span className="text-amber-500 p-1 bg-amber-500/10 rounded-lg">
                  <Crown size={18} />
                </span>
                <span className="text-sm font-bold tracking-wide text-amber-500">{t('nav.premium')}</span>
              </div>
              <div className="bg-amber-500 text-black text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wide">PRO</div>
            </NavLink>
          )}
        </nav>

        {/* Language & Footer */}
        <div className="p-6 mt-auto">
           <div className="relative">
             <button 
               onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
               className="w-full flex items-center justify-between bg-black/20 border border-white/5 p-3 rounded-xl hover:border-cyan/30 transition-all group backdrop-blur-sm"
             >
               <div className="flex items-center space-x-3 text-sm text-gray-300 group-hover:text-white">
                  <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-cyan/20 transition-colors">
                     <Globe size={14} className="text-gray-400 group-hover:text-cyan transition-colors" />
                  </div>
                  <span className="font-bold">{LANGUAGES[language].nativeName}</span>
               </div>
               <ChevronRight size={14} className={`text-gray-600 transition-transform ${isLangMenuOpen ? 'rotate-90' : ''}`} />
             </button>
             
             {isLangMenuOpen && (
               <div className="absolute bottom-full left-0 w-full mb-3 bg-[#0f1218]/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 animate-fade-in-up">
                 {Object.entries(LANGUAGES).map(([code, lang]) => (
                   <button
                     key={code}
                     onClick={() => toggleLanguage(code as SupportedLanguage)}
                     className={`w-full text-left px-4 py-3 text-xs font-bold transition-colors border-b border-white/5 last:border-0 ${language === code ? 'text-cyan bg-cyan/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                   >
                     {lang.nativeName}
                   </button>
                 ))}
               </div>
             )}
           </div>
           <div className="mt-4 text-center">
              <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">VOXFIT AI • v2.1</span>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative h-screen overflow-hidden z-10">
        
        {/* Mobile Header */}
        <header className="md:hidden absolute top-0 left-0 right-0 z-50 px-4 py-4">
           <div className="glass-panel rounded-2xl p-4 flex justify-between items-center shadow-2xl border-white/10">
              <div className="flex items-center space-x-3">
                <VoxLogo className="w-8 h-8" />
                <h1 className="text-lg font-black text-white tracking-tight leading-none">VOX<span className="text-cyan">FIT</span></h1>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                  className="p-2 text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
           </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-28 px-6 pb-6 animate-fade-in flex flex-col">
            <nav className="space-y-3 flex-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }: any) =>
                    `flex items-center justify-between px-6 py-5 rounded-2xl border transition-all ${
                      isActive 
                      ? 'bg-cyan/10 border-cyan/30 text-white shadow-lg' 
                      : 'bg-surface border-white/5 text-gray-400'
                    }`
                  }
                >
                  {({ isActive }: any) => (
                    <>
                      <div className="flex items-center space-x-4">
                        {item.icon}
                        <span className="font-bold text-lg">{item.name}</span>
                      </div>
                      {isActive && <div className="w-2 h-2 rounded-full bg-cyan shadow-[0_0_10px_#4deeca]"></div>}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        )}

        {/* Content Scroll Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden md:p-10 pt-28 pb-10 px-6 scrollbar-hide relative z-10">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;