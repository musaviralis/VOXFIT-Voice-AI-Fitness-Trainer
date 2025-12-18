
import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Zap, Calendar, Mic, ArrowRight, Play, Flame, BarChart3, TrendingUp, Sparkles, BookOpen } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

const mockActivityData = [
  { day: 'M', val: 40 },
  { day: 'T', val: 70 },
  { day: 'W', val: 50 },
  { day: 'T', val: 90 },
  { day: 'F', val: 60 },
  { day: 'S', val: 80 },
  { day: 'S', val: 40 },
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const greeting = getGreeting();

  return (
    <div className="space-y-12 animate-fade-in pb-10">
      
      {/* 1. Header & Streak Badge */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-gray-500 font-bold tracking-[0.2em] uppercase text-xs mb-3 flex items-center gap-2">
             <span className="w-8 h-[1px] bg-cyan/50"></span>
             {t('dashboard.welcome')}
          </h2>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
            {greeting}, <span className="text-transparent bg-clip-text bg-gradient-vox animate-gradient">Athlete</span>
          </h1>
        </div>
        
        {/* Animated Streak Widget */}
        <div className="flex items-center space-x-4 glass-panel px-6 py-3 rounded-2xl border-white/10 hover:border-orange-500/30 transition-colors group cursor-pointer shadow-lg shadow-black/20">
          <div className="relative">
             <div className="absolute inset-0 bg-orange-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
             <Flame className="text-orange-500 fill-orange-500" size={28} />
          </div>
          <div>
             <span className="block text-white font-black text-xl leading-none">12</span>
             <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t('motivation.streak')}</span>
          </div>
        </div>
      </div>

      {/* 2. Hero Action Card (Magazine Style) */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/5 group shadow-2xl transition-all duration-500 hover:shadow-cyan/10">
        {/* Dynamic Backgrounds */}
        <div className="absolute inset-0 bg-[#050914] z-0"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-cyan/10 to-transparent rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none z-0 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none z-0"></div>
        
        <div className="relative z-10 p-8 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div className="space-y-8 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-white/5 text-white border border-white/10 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-cyan animate-pulse shadow-[0_0_8px_#4deeca]"></span>
              <span>{t('dashboard.objective')}</span>
            </div>
            
            <div>
              <h2 className="text-5xl md:text-6xl font-black text-white leading-[0.9] mb-4 tracking-tight">
                VOXFIT Protocol <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">Leg Day Focus</span>
              </h2>
              <div className="flex items-center gap-6 text-gray-400 text-sm font-medium">
                 <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-cyan"/>
                    <span>45 mins</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Activity size={16} className="text-red-500"/>
                    <span>High Intensity</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-secondary"/>
                    <span>+200 XP</span>
                 </div>
              </div>
            </div>
          </div>

          <Link 
            to="/voice" 
            className="relative group/btn overflow-hidden bg-white text-black hover:text-cyan transition-colors px-12 py-8 rounded-[2rem] font-black text-xl flex flex-col items-center justify-center shadow-[0_0_50px_-10px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gray-100 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out"></div>
            <Play className="mb-2 fill-current relative z-10" size={32} />
            <span className="relative z-10 uppercase tracking-wide text-xs">{t('actions.start_workout')}</span>
          </Link>
        </div>
      </div>

      {/* 3. Daily Drop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="col-span-1 md:col-span-2 glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
               <Sparkles size={120} className="text-cyan" />
            </div>
            <div>
               <div className="flex items-center gap-2 mb-4">
                  <span className="bg-cyan/10 text-cyan text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-cyan/20">VOXFIT Insight</span>
                  <span className="text-gray-500 text-xs">Today's Tip</span>
               </div>
               <h3 className="text-2xl font-bold text-white mb-2 leading-tight">"Consistency Beats Intensity"</h3>
               <p className="text-gray-400 text-sm leading-relaxed max-w-md">The secret to VOXFIT longevity isn't the hardest single session, but showing up every single time. Discipline is the only supplement that works 100% of the time.</p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-cyan transition-colors cursor-pointer">
               Read More <ArrowRight size={14} />
            </div>
         </div>

         <div className="glass-panel p-0 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-cyan/5 to-transparent"></div>
            <div className="p-6 w-full flex justify-between items-center z-10 border-b border-white/5">
               <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t('dashboard.load')}</span>
               <div className="flex items-center gap-1 text-secondary text-xs font-bold">
                  <TrendingUp size={12} /> +12%
               </div>
            </div>
            <div className="h-32 w-full mt-auto pt-4">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockActivityData}>
                  <defs>
                     <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4deeca" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#4deeca" stopOpacity={0}/>
                     </linearGradient>
                  </defs>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 10}} dy={-5} interval={0} />
                  <Area type="monotone" dataKey="val" stroke="#4deeca" strokeWidth={3} fill="url(#colorVal)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
