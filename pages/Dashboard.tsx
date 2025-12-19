
import React, { useState, useEffect } from 'react';
import * as ReactRouterDom from 'react-router-dom';
const { Link } = ReactRouterDom as any;
import { 
  Activity, Zap, Calendar, Mic, ArrowRight, Play, Flame, 
  TrendingUp, Sparkles, Target, Trophy, Info, 
  Dumbbell, HeartPulse, BrainCircuit, Droplets,
  Clock, ShieldCheck, ChevronRight, Gauge, BarChart3, ScanSearch,
  Sword, Radio, BatteryMedium, Cpu, Fingerprint, Waves, 
  ShieldAlert, FastForward, Binary, Terminal, Hexagon, Crosshair,
  TrendingDown, Eye, Layers, Search, Workflow
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { GoogleGenAI } from "@google/genai";

// Heatmap: Day 1 is the genesis point
const heatmapData = Array.from({ length: 28 }, (_, i) => ({
  day: i + 1,
  intensity: i === 0 ? 5 : 0, 
}));

const Dashboard: React.FC = () => {
  const { t, language } = useLanguage();
  const [mantra, setMantra] = useState<string>("Bypassing Neural Inhibitors...");
  const [strategy, setStrategy] = useState<string>("Analyzing biometric baseline...");
  const [intel, setIntel] = useState<string>("SYNCING_BIOMETRICS...");
  const [isLoading, setIsLoading] = useState(true);
  const [isBooting, setIsBooting] = useState(true);
  const [systemProgress, setSystemProgress] = useState(0);

  useEffect(() => {
    // High-end boot sequence
    const bootTimer = setTimeout(() => setIsBooting(false), 3000);
    const progressInterval = setInterval(() => {
      setSystemProgress(prev => (prev >= 100 ? 100 : prev + 1.4));
    }, 25);

    const fetchAIData = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Parallel intelligence fetching
        const [flashRes, proRes] = await Promise.all([
          ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: "Generate an intense 1-sentence fitness mantra for 'Day 1' of an Indian athlete. Use a mix of English and Hindi. Focus on 'Pehla Kadam' and the courage to start.",
            config: { temperature: 1.0 }
          }),
          ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: "Analyze a fitness journey starting at Day 1. Provide a short 'Neural Projection' for the next 4 weeks. Focus on CNS adaptation, mitochondrial biogenesis, and building a foundation. Use a tactical, elite coaching tone.",
            config: { 
              thinkingConfig: { thinkingBudget: 5000 },
              temperature: 0.8
            }
          })
        ]);

        setMantra(flashRes.text || "Pehla kadam asli jeet hai. Today you conquer the comfort zone.");
        setStrategy(proRes.text || "Projection: Day 1-7 involves heavy neural mapping. Hypertrophy threshold reached by Day 21.");
        setIntel("READY_FOR_DEPLOYMENT");
      } catch (e) {
        setMantra("Abhi nahi toh kabhi nahi. Day 1 starts now.");
        setStrategy("Emergency Briefing: Compound movements prioritized for baseline metabolic activation.");
        setIntel("LOCAL_CACHE_STABLE");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAIData();

    return () => {
      clearTimeout(bootTimer);
      clearInterval(progressInterval);
    };
  }, [language]);

  if (isBooting) {
    return (
      <div className="h-screen fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center space-y-12 overflow-hidden">
        {/* CRT Scanline & Glitch layers */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(77,238,202,0.03),rgba(59,130,246,0.02),rgba(139,92,246,0.03))] bg-[length:100%_3px,4px_100%] pointer-events-none z-10"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        <div className="relative z-20 flex flex-col items-center px-6">
          <div className="relative w-32 h-32 md:w-48 md:h-48 mb-12 md:mb-16">
             <div className="absolute inset-0 border-[6px] border-white/5 rounded-full animate-ping opacity-10"></div>
             <div className="absolute inset-0 border-[6px] border-cyan/10 rounded-full animate-spin-slow"></div>
             <div className="absolute inset-4 border-[4px] border-primary/20 rounded-full animate-reverse-spin"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <Fingerprint size={64} className="text-cyan animate-pulse md:w-20 md:h-20" />
             </div>
             {/* Scanning bar */}
             <div className="absolute top-0 left-0 w-full h-1 bg-cyan shadow-[0_0_20px_#4deeca] animate-[scan_2s_linear_infinite]"></div>
          </div>
          
          <div className="space-y-8 text-center max-w-lg w-full">
            <div className="flex flex-col items-center">
               <h2 className="text-4xl md:text-6xl font-black text-white tracking-[0.4em] md:tracking-[0.6em] uppercase italic drop-shadow-[0_0_25px_#4deeca] -mr-[0.4em] md:-mr-[0.6em] mb-2">VOX_OS</h2>
               <span className="text-[8px] md:text-[10px] text-primary font-black uppercase tracking-[0.6em] md:tracking-[0.8em] -mr-[0.6em] md:-mr-[0.8em] opacity-60">Neural Fitness Intelligence</span>
            </div>
            
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden p-[1px] border border-white/10">
              <div className="h-full bg-gradient-vox shadow-[0_0_25px_#4deeca] transition-all duration-300 ease-out" style={{ width: `${systemProgress}%` }}></div>
            </div>
            
            <div className="flex justify-between items-center w-full px-2">
               <span className="text-[8px] md:text-[9px] font-black text-cyan uppercase tracking-widest animate-pulse">Syncing Biometric Link...</span>
               <span className="text-white font-mono font-bold text-sm tracking-tighter">{Math.floor(systemProgress)}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in pb-32 relative max-w-full overflow-x-hidden">
      
      {/* 0. TACTICAL DATA FEED */}
      <div className="w-full h-12 glass-panel border-y border-white/5 flex items-center overflow-hidden bg-black/90 relative z-40">
         <div className="flex animate-[shimmer_50s_linear_infinite] gap-24 items-center px-6">
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center gap-12 text-[10px] font-black text-gray-500 uppercase tracking-[0.5em] whitespace-nowrap">
                 <span className="text-cyan flex items-center gap-2"><Workflow size={14} /> SYSTEM: VOX_PRO_V2</span>
                 <span className="w-1.5 h-1.5 rounded-full bg-gray-800"></span>
                 <span className="text-primary flex items-center gap-2"><Binary size={14} /> STATUS: {intel}</span>
                 <span className="w-1.5 h-1.5 rounded-full bg-gray-800"></span>
                 <span className="text-secondary flex items-center gap-2"><Crosshair size={14} /> TARGET: PEAK_PERFORMANCE</span>
                 <span className="w-1.5 h-1.5 rounded-full bg-gray-800"></span>
                 <span className="text-accent flex items-center gap-2"><Cpu size={14} /> LOAD: 14.4%_NOMINAL</span>
              </div>
            ))}
         </div>
      </div>

      {/* 1. HERO COMMAND CENTER */}
      <header className="grid grid-cols-1 2xl:grid-cols-12 gap-12 p-6 md:p-12 glass-panel rounded-[3rem] md:rounded-[5rem] relative overflow-hidden group border border-white/10 shadow-[0_100px_200px_-50px_rgba(0,0,0,1)] bg-gradient-to-br from-surface via-background to-[#020308]">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
        <div className="absolute -top-[30%] -right-[15%] w-[70%] h-[70%] bg-primary/5 rounded-full blur-[180px] animate-pulse"></div>
        
        {/* Mission Identification */}
        <div className="2xl:col-span-8 flex flex-col justify-between space-y-12 md:space-y-16 relative z-10">
          <div className="space-y-8 md:space-y-10">
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <div className="flex items-center gap-3 px-6 md:px-8 py-2 md:py-3 rounded-full bg-cyan/10 border border-cyan/30 backdrop-blur-3xl shadow-[0_0_40px_rgba(77,238,202,0.15)] group-hover:border-cyan/50 transition-all">
                  <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-cyan animate-ping shadow-[0_0_10px_#4deeca]"></div>
                  <span className="text-[10px] md:text-[12px] font-black text-white uppercase tracking-[0.4em] md:tracking-[0.5em]">Active_Phase: Day_01_Initiation</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] md:text-[12px] font-bold text-gray-600 uppercase tracking-[0.2em] md:tracking-[0.3em] px-4 md:px-6 border-l border-white/10">
                 <Radio size={14} className="text-primary animate-pulse md:w-4 md:h-4" /> 
                 <span>Auth: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
            
            <h1 className="text-[5rem] md:text-[10rem] 2xl:text-[15rem] font-black text-white tracking-tighter leading-[0.8] md:leading-[0.7] italic transition-all group-hover:tracking-normal duration-1000 break-words">
              MISSION_<br/>
              <span className="text-transparent bg-clip-text bg-gradient-vox drop-shadow-[0_0_60px_rgba(77,238,202,0.5)]">START_01</span>
            </h1>
          </div>

          {/* Neural Projection (Powered by Gemini 3 Pro) */}
          <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border-primary/20 bg-primary/5 max-w-4xl relative overflow-hidden group/forecast hover:bg-primary/10 transition-all shadow-2xl">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <BrainCircuit size={60} className="text-primary group-hover/forecast:rotate-12 transition-transform duration-700 md:w-20 md:h-20" />
             </div>
             <div className="flex items-center gap-4 md:gap-5 mb-6 md:mb-8">
                <div className="p-2 md:p-3 bg-primary/20 rounded-2xl text-primary shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <ShieldAlert size={20} className="md:w-6 md:h-6" />
                </div>
                <div className="space-y-1">
                   <span className="text-[11px] md:text-[13px] font-black text-primary uppercase tracking-[0.4em]">Neural Core Projection</span>
                   <span className="block text-[8px] md:text-[9px] text-gray-600 font-bold uppercase tracking-widest">Powered by Gemini_3_Pro</span>
                </div>
             </div>
             <p className={`text-gray-100 font-medium leading-relaxed italic text-lg md:text-2xl transition-all duration-1000 ${isLoading ? 'opacity-20 blur-lg scale-95' : 'opacity-100 scale-100'}`}>
                "{strategy}"
             </p>
             <div className="mt-8 flex gap-2">
                {[1,2,3,4,5,6].map(i => <div key={i} className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-primary animate-[shimmer_3s_infinite]" style={{animationDelay: `${i*0.2}s`}}></div>
                </div>)}
             </div>
          </div>
        </div>

        {/* Tactical Telemetry Hub */}
        <div className="2xl:col-span-4 flex flex-col justify-between gap-8 md:gap-10 relative z-10">
           
           {/* GENESIS STREAK COUNTER - DAY 1 FOCUS */}
           <div className="glass-panel p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] border-cyan/40 bg-cyan/5 shadow-[0_0_100px_-20px_rgba(77,238,202,0.3)] relative overflow-hidden group/streak cursor-pointer hover:bg-cyan/10 transition-all border-2">
              <div className="absolute -top-10 -right-10">
                 <Hexagon size={180} className="text-cyan opacity-5 animate-spin-slow md:w-[240px] md:h-[240px]" />
              </div>
              <div className="relative z-10 flex flex-col items-center text-center">
                 <p className="text-[12px] md:text-[14px] font-black text-cyan uppercase tracking-[0.4em] md:tracking-[0.6em] mb-4 md:mb-6">Mission_Streak</p>
                 <div className="relative">
                    <span className="text-[7rem] md:text-[11rem] font-black text-white tracking-tighter leading-none drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">01</span>
                    <div className="absolute -inset-8 border-[1px] border-cyan/20 rounded-full animate-ping pointer-events-none"></div>
                 </div>
                 <span className="text-2xl md:text-4xl font-black text-cyan/40 tracking-tighter -mt-2 md:-mt-4 italic">GENESIS_DAY</span>
                 
                 <div className="mt-8 md:mt-12 w-full space-y-4 md:space-y-6">
                    <div className="flex justify-between text-[10px] md:text-[11px] font-black text-gray-500 uppercase tracking-widest">
                       <span>Compliance Matrix</span>
                       <span className="text-cyan">3.3% Logged</span>
                    </div>
                    <div className="w-full h-3 md:h-4 bg-white/5 rounded-full overflow-hidden border border-white/10 p-[2px] md:p-[3px]">
                       <div className="h-full bg-gradient-to-r from-cyan via-primary to-accent w-[3.3%] rounded-full shadow-[0_0_25px_#4deeca]"></div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4 md:gap-8">
              {[
                { label: 'Neural Uptime', val: '00:02:14', icon: <Clock size={20} /> },
                { label: 'Output Potential', val: 'Elite', icon: <Zap size={20} /> },
                { label: 'Metabolic Sync', val: 'READY', icon: <Waves size={20} /> },
                { label: 'System Integrity', val: '100%', icon: <ShieldCheck size={20} /> },
              ].map((h, i) => (
                <div key={i} className="glass-panel p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] flex flex-col justify-between border-white/5 hover:border-cyan/30 transition-all hover:-translate-y-2 hover:bg-white/5 shadow-xl">
                   {/* Fix: use any for props during cloneElement to satisfy compiler */}
                   <div className="text-primary mb-3 md:mb-4 p-2 md:p-3 bg-primary/10 w-fit rounded-xl md:rounded-2xl shadow-inner">{React.cloneElement(h.icon as React.ReactElement<any>, { className: 'w-5 h-5 md:w-6 md:h-6'})}</div>
                   <div>
                      <p className="text-white font-black text-xl md:text-3xl tracking-tighter leading-none">{h.val}</p>
                      <p className="text-[8px] md:text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-2 md:mt-3 italic">{h.label}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </header>

      {/* 2. OPERATIONAL PROTOCOL GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         
         {/* Protocol Deployment Hero */}
         <div className="lg:col-span-8 relative group">
            <div className="absolute -inset-4 bg-gradient-vox rounded-[5rem] blur-[100px] opacity-10 group-hover:opacity-20 transition-all duration-1000"></div>
            <div className="relative h-full rounded-[4rem] md:rounded-[5rem] overflow-hidden glass-panel border border-white/10 shadow-2xl flex flex-col xl:flex-row">
               
               {/* Visual Biometrics Panel */}
               <div className="w-full xl:w-[420px] bg-black/80 p-10 md:p-14 flex flex-col items-center justify-between border-b xl:border-b-0 xl:border-r border-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-pattern opacity-15"></div>
                  
                  <div className="relative z-10 text-center space-y-12 md:space-y-16 w-full">
                    <div className="relative mx-auto w-48 h-48 md:w-64 md:h-64 group-hover:scale-105 transition-transform duration-1000">
                       <svg viewBox="0 0 100 100" className="w-full h-full">
                          <circle cx="50" cy="50" r="48" className="stroke-white/5 fill-none" strokeWidth="0.5" strokeDasharray="6 3" />
                          <circle cx="50" cy="50" r="44" className="stroke-cyan/5 fill-none" strokeWidth="10" />
                          <circle cx="50" cy="50" r="44" className="stroke-cyan/40 fill-none animate-pulse" strokeWidth="1" strokeDasharray="20 10" />
                          <path d="M50 6 A44 44 0 0 1 94 50" className="stroke-cyan fill-none" strokeWidth="5" strokeLinecap="round" />
                          <path d="M50 94 A44 44 0 0 1 6 50" className="stroke-primary fill-none opacity-40" strokeWidth="2" strokeDasharray="5 5" />
                       </svg>
                       <div className="absolute inset-0 flex items-center justify-center">
                          <Activity size={48} className="text-cyan animate-pulse drop-shadow-[0_0_20px_#4deeca] md:w-16 md:h-16" />
                       </div>
                    </div>

                    <div className="space-y-6 md:space-y-8">
                       <div className="space-y-2 md:space-y-3">
                          <p className="text-[10px] md:text-[12px] font-black text-gray-600 uppercase tracking-[0.4em] md:tracking-[0.6em]">Biokinetic_Load</p>
                          <p className="text-3xl md:text-5xl font-black text-white italic tracking-tighter">OPTIMAL_STATE</p>
                       </div>
                       <div className="flex gap-3 md:gap-4 justify-center">
                          {[1,2,3,4,5,6].map(i => <div key={i} className={`w-4 h-4 md:w-5 md:h-5 rounded-lg ${i === 1 ? 'bg-cyan shadow-[0_0_30px_#4deeca]' : 'bg-white/5 border border-white/10'}`}></div>)}
                       </div>
                    </div>
                  </div>

                  {/* Real-time Waveform */}
                  <div className="relative z-10 w-full mt-12 md:mt-16 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl">
                     <div className="flex justify-between items-center mb-6 md:mb-8">
                        <p className="text-[10px] md:text-[12px] font-black text-cyan uppercase tracking-widest flex items-center gap-2 md:gap-3">
                           <Waves size={14} className="md:w-5 md:h-5" /> Telemetry_Amplitude
                        </p>
                        <span className="text-[9px] font-mono text-gray-700 animate-pulse">LIVE_FEED</span>
                     </div>
                     <div className="h-12 md:h-16 flex items-end gap-1.5 md:gap-2 px-1">
                        {Array.from({ length: 24 }).map((_, i) => (
                           <div key={i} className="flex-1 bg-cyan/20 rounded-t-sm animate-[shimmer_2s_infinite_ease-in-out]" style={{ height: `${20 + Math.random() * 80}%`, animationDelay: `${i * 0.08}s` }}></div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Tactical Protocol Description */}
               <div className="flex-1 p-10 md:p-24 flex flex-col justify-between relative bg-gradient-to-br from-transparent via-primary/5 to-transparent">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-24 opacity-5 pointer-events-none group-hover:opacity-15 transition-all duration-700">
                     <Dumbbell size={200} className="text-white md:w-[450px] md:h-[450px]" />
                  </div>

                  <div className="space-y-12 md:space-y-16 relative z-10">
                    <div className="inline-flex items-center gap-4 md:gap-5 bg-accent/20 border border-accent/40 px-6 md:px-10 py-3 md:py-4 rounded-full shadow-[0_0_50px_rgba(139,92,246,0.15)]">
                       <Sparkles size={18} className="text-accent animate-pulse md:w-6 md:h-6" />
                       <span className="text-[11px] md:text-[14px] font-black text-accent uppercase tracking-[0.4em] md:tracking-[0.5em]">Protocol: GENESIS_ACTIVE</span>
                    </div>
                    
                    <div className="space-y-8 md:space-y-10">
                       <h2 className="text-6xl md:text-[11rem] font-black text-white tracking-tighter leading-[0.75] uppercase italic transition-transform group-hover:translate-x-6 duration-700 break-words">
                          GENESIS<br/>
                          <span className="text-gray-800">SEQUENCE</span>
                       </h2>
                       <p className="text-gray-400 text-lg md:text-3xl font-medium max-w-3xl leading-relaxed border-l-[4px] md:border-l-[8px] border-cyan/40 pl-6 md:pl-12 italic">
                          "Success is not final; failure is not fatal: it is the courage to continue that counts." Today you set the baseline.
                       </p>
                    </div>
                  </div>

                  <div className="mt-16 md:mt-24 flex flex-col md:flex-row gap-8 md:gap-12 relative z-10">
                     <Link 
                       to="/voice"
                       className="flex-[2] bg-white text-black py-8 md:py-10 rounded-[2.5rem] md:rounded-[3.5rem] font-black text-xl md:text-3xl uppercase tracking-[0.4em] md:tracking-[0.6em] flex items-center justify-center gap-6 md:gap-8 hover:scale-[1.05] active:scale-[0.95] transition-all shadow-[0_50px_120px_-30px_rgba(255,255,255,0.4)] group/btn overflow-hidden relative"
                     >
                        <div className="absolute inset-0 bg-gradient-vox opacity-0 group-hover/btn:opacity-10 transition-opacity"></div>
                        <Play size={24} fill="black" className="md:w-10 md:h-10" /> Engage_VOX
                     </Link>
                     <button className="flex-1 px-10 py-8 md:py-10 rounded-[2.5rem] md:rounded-[3.5rem] bg-white/5 border border-white/10 text-white font-black text-[11px] md:text-[14px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-4 md:gap-6">
                        <Info size={20} className="md:w-7 md:h-7" /> Intel_Brief
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {/* AI Insights Sidebar */}
         <div className="lg:col-span-4 glass-panel p-10 md:p-16 rounded-[4rem] md:rounded-[5rem] border-white/5 relative overflow-hidden flex flex-col justify-center min-h-[450px] md:min-h-[550px] group border-accent/20 bg-[#04060E] shadow-3xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.3),transparent_80%)]"></div>
            <div className="absolute top-0 right-0 p-20 opacity-5 group-hover:opacity-15 transition-all duration-1000 rotate-[15deg]">
               <BrainCircuit size={200} className="text-accent md:w-80 md:h-80" />
            </div>
            
            <div className="relative z-10 space-y-12 md:space-y-16">
               <div className="flex items-center gap-6 md:gap-8">
                  <div className="p-4 md:p-6 bg-accent/20 rounded-[2rem] md:rounded-[2.5rem] text-accent shadow-[0_0_60px_rgba(139,92,246,0.6)] animate-pulse border border-accent/30">
                     <Sparkles size={32} className="md:w-12 md:h-12" />
                  </div>
                  <div className="space-y-1 md:space-y-2">
                     <span className="block text-[12px] md:text-[14px] font-black text-accent uppercase tracking-[0.4em] md:tracking-[0.6em]">Neural_Link: Elite</span>
                     <span className="text-[9px] md:text-[11px] text-gray-700 font-bold uppercase tracking-widest italic">Mission_Protocol_Active</span>
                  </div>
               </div>
               
               <h3 className={`text-3xl md:text-6xl font-black text-white italic leading-[1.2] md:leading-[1.15] transition-all duration-1000 ${isLoading ? 'opacity-20 blur-2xl scale-90' : 'opacity-100 scale-100'}`}>
                  "{mantra}"
               </h3>

               <div className="pt-10 md:pt-16 space-y-8 md:space-y-12">
                  <div className="flex justify-between items-center text-[11px] md:text-[13px] font-black text-gray-600 uppercase tracking-widest">
                     <span>Neural_Bandwidth</span>
                     <span className="text-accent animate-pulse">100% Synced</span>
                  </div>
                  <div className="flex gap-3 md:gap-4">
                     {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
                        <div key={i} className="h-2.5 md:h-3 flex-1 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-accent animate-[shimmer_2s_infinite_linear]" style={{animationDelay: `${i*0.08}s`}}></div>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-black/80 border border-white/5 flex items-center gap-4 md:gap-6 group-hover:border-accent/50 transition-all shadow-2xl">
                  <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-accent animate-ping shadow-[0_0_15px_#8b5cf6]"></div>
                  <p className="text-[10px] md:text-[12px] font-bold text-gray-500 uppercase tracking-widest leading-relaxed">Forecast: 94% Consistency Probability</p>
               </div>
            </div>
         </div>

      </section>

      {/* 3. PERSISTENCE GRID & GAUGES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
         
         {/* GENESIS MATRIX (Heatmap) */}
         <div className="glass-panel p-10 md:p-16 rounded-[4rem] md:rounded-[5rem] border-white/5 flex flex-col h-full group relative overflow-hidden bg-[#060810] shadow-2xl border-t-cyan/10">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="flex items-center justify-between mb-12 md:mb-16 relative z-10">
               <div className="space-y-3 md:space-y-4">
                  <h4 className="text-white font-black text-3xl md:text-5xl tracking-tighter">Persistence_Log</h4>
                  <p className="text-[11px] md:text-[13px] text-gray-600 font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] italic flex items-center gap-3 md:gap-4">
                    <FastForward size={16} className="text-cyan animate-pulse md:w-5 md:h-5" /> GENESIS_STREAM
                  </p>
               </div>
               <Calendar size={28} className="text-cyan opacity-30 group-hover:opacity-100 transition-opacity duration-500 md:w-9 md:h-9" />
            </div>

            <div className="grid grid-cols-7 gap-3 md:gap-5 relative z-10 flex-1 content-start">
               {heatmapData.map((d, i) => (
                  <div 
                    key={i} 
                    className={`aspect-square rounded-xl md:rounded-[1.25rem] transition-all duration-1000 border-2 ${
                      d.intensity === 0 ? 'bg-white/[0.02] border-white/5' : 
                      'bg-cyan shadow-[0_0_50px_#4deeca] border-cyan animate-pulse scale-110'
                    }`}
                  >
                     {d.intensity > 0 && <div className="w-full h-full flex items-center justify-center"><Flame size={16} className="text-black fill-black md:w-5 md:h-5" /></div>}
                  </div>
               ))}
            </div>

            <div className="mt-12 md:mt-16 pt-12 md:pt-16 border-t border-white/10 relative z-10">
               <div className="grid grid-cols-2 gap-12 md:gap-16">
                  <div className="text-left">
                     <p className="text-[11px] md:text-[13px] text-gray-700 font-bold uppercase tracking-widest mb-2 md:mb-4">Total_Vol</p>
                     <p className="text-white font-black text-4xl md:text-6xl">0.0<span className="text-sm md:text-lg text-gray-700 ml-2 md:ml-4 font-mono">t</span></p>
                  </div>
                  <div className="text-right">
                     <p className="text-[11px] md:text-[13px] text-gray-700 font-bold uppercase tracking-widest mb-2 md:mb-4">Integrity</p>
                     <p className="text-cyan font-black text-4xl md:text-6xl">100<span className="text-sm md:text-lg text-gray-700 ml-2 md:ml-4 font-mono">%</span></p>
                  </div>
               </div>
            </div>
         </div>

         {/* BIO-TELEMETRY HUD */}
         <div className="glass-panel p-10 md:p-16 rounded-[4rem] md:rounded-[5rem] border-white/5 space-y-12 md:space-y-16 group relative overflow-hidden bg-gradient-to-b from-[#0A0E1A] via-[#03050C] to-background shadow-2xl border-t-primary/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.25),transparent_75%)]"></div>
            <h4 className="text-white font-black text-[12px] md:text-[14px] uppercase tracking-[0.4em] md:tracking-[0.6em] flex items-center gap-4 md:gap-6 relative z-10">
               <Activity size={24} className="text-primary drop-shadow-[0_0_10px_#3b82f6] md:w-8 md:h-8" /> Live_Biokinetic_Sync
            </h4>
            
            <div className="space-y-10 md:space-y-14 relative z-10">
               {[
                  { label: 'Neural_Adaptation', val: 98, color: 'text-cyan', bg: 'bg-cyan' },
                  { label: 'Power_Reserves', val: 100, color: 'text-accent', bg: 'bg-accent' },
                  { label: 'Metabolic_Prime', val: 96, color: 'text-secondary', bg: 'bg-secondary' }
               ].map((g, i) => (
                  <div key={i} className="space-y-6 md:space-y-8">
                     <div className="flex justify-between items-end">
                        <span className="text-[12px] md:text-[14px] font-black uppercase tracking-[0.4em] text-gray-600">{g.label}</span>
                        <span className={`${g.color} font-mono font-bold text-xl md:text-2xl tracking-tighter`}>{g.val}%</span>
                     </div>
                     <div className="w-full h-3.5 md:h-4 bg-white/5 rounded-full overflow-hidden border border-white/10 p-[4px] md:p-[5px] shadow-inner">
                        <div 
                          className={`h-full rounded-full ${g.bg} transition-all duration-1000 ease-out shadow-[0_0_25px_currentColor]`} 
                          style={{ width: `${g.val}%`, transitionDelay: `${i * 0.35}s` }}
                        ></div>
                     </div>
                  </div>
               ))}
            </div>

            <div className="pt-12 md:pt-16 flex justify-center relative z-10">
               <div className="px-10 py-5 rounded-[2.5rem] md:rounded-[3rem] bg-white/5 border border-white/10 flex items-center gap-5 md:gap-6 group-hover:bg-white/10 transition-all shadow-2xl backdrop-blur-3xl">
                  <ShieldCheck size={24} className="text-emerald-500 md:w-7 md:h-7" />
                  <span className="text-[10px] md:text-[12px] font-black text-gray-500 uppercase tracking-[0.2em] md:tracking-[0.3em]">Integrity_Check: PASSED</span>
               </div>
            </div>
         </div>

         {/* QUICK ACTION TILES */}
         <div className="grid grid-cols-1 gap-8 md:gap-12 h-full">
            <Link to="/nutrition" className="glass-panel p-10 md:p-14 rounded-[4rem] md:rounded-[5rem] border-white/5 hover:border-cyan/70 transition-all group flex items-center justify-between overflow-hidden relative shadow-3xl border-t-cyan/10">
               <div className="absolute inset-0 bg-gradient-to-r from-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
               <div className="flex items-center gap-8 md:gap-12 relative z-10">
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-cyan/10 rounded-[2.5rem] md:rounded-[3rem] flex items-center justify-center text-cyan group-hover:scale-110 group-hover:rotate-[8deg] transition-all border border-cyan/40 shadow-[0_0_50px_rgba(77,238,202,0.4)]">
                     <Droplets size={36} className="md:w-[52px] md:h-[52px]" />
                  </div>
                  <div>
                     <h5 className="text-white font-black text-2xl md:text-4xl tracking-tighter leading-none">Fuel_Core</h5>
                     <p className="text-[10px] md:text-[12px] text-gray-600 font-bold uppercase tracking-[0.4em] mt-3 md:mt-4 italic">Macro_Log_Active</p>
                  </div>
               </div>
               <div className="p-4 md:p-6 bg-white/5 rounded-full group-hover:bg-cyan group-hover:text-black transition-all shadow-2xl border border-white/10 group-hover:border-cyan">
                  <ChevronRight size={24} className="md:w-8 md:h-8" />
               </div>
            </Link>

            <Link to="/coach" className="glass-panel p-10 md:p-14 rounded-[4rem] md:rounded-[5rem] border-white/5 hover:border-accent/70 transition-all group flex items-center justify-between overflow-hidden relative shadow-3xl border-t-accent/10">
               <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
               <div className="flex items-center gap-8 md:gap-12 relative z-10">
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-accent/10 rounded-[2.5rem] md:rounded-[3rem] flex items-center justify-center text-accent group-hover:scale-110 group-hover:rotate-[-8deg] transition-all border border-accent/40 shadow-[0_0_50px_rgba(139,92,246,0.4)]">
                     <BrainCircuit size={36} className="md:w-[52px] md:h-[52px]" />
                  </div>
                  <div>
                     <h5 className="text-white font-black text-2xl md:text-4xl tracking-tighter leading-none">AI_Consult</h5>
                     <p className="text-[10px] md:text-[12px] text-gray-600 font-bold uppercase tracking-[0.4em] mt-3 md:mt-4 italic">Neural_Intel_Link</p>
                  </div>
               </div>
               <div className="p-4 md:p-6 bg-white/5 rounded-full group-hover:bg-accent group-hover:text-black transition-all shadow-2xl border border-white/10 group-hover:border-accent">
                  <ChevronRight size={24} className="md:w-8 md:h-8" />
               </div>
            </Link>

            <div className="glass-panel p-10 md:p-14 rounded-[4rem] md:rounded-[5rem] border-white/5 flex items-center justify-between overflow-hidden relative opacity-20 cursor-not-allowed grayscale shadow-2xl">
               <div className="flex items-center gap-8 md:gap-12 relative z-10">
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-amber-500/10 rounded-[2.5rem] md:rounded-[3rem] flex items-center justify-center text-amber-500 border border-amber-500/20">
                     <Trophy size={36} className="md:w-[52px] md:h-[52px]" />
                  </div>
                  <div>
                     <h5 className="text-white font-black text-2xl md:text-4xl tracking-tighter italic leading-none">Hall_of_Valour</h5>
                     <p className="text-[10px] md:text-[12px] text-gray-700 font-bold uppercase tracking-[0.4em] mt-3 md:mt-4">Locked: Genesis_Check_Pending</p>
                  </div>
               </div>
               <ShieldCheck size={24} className="text-gray-900 md:w-8 md:h-8" />
            </div>
         </div>

      </div>

      {/* 4. SYSTEM TELEMETRY FOOTER */}
      <footer className="flex flex-col md:flex-row items-center justify-between gap-12 text-[10px] md:text-[12px] font-black text-gray-900 uppercase tracking-[0.6em] md:tracking-[1em] px-10 md:px-20 pt-16 md:pt-24 border-t border-white/5">
         <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <span className="hover:text-cyan cursor-default transition-all duration-300">VOXFIT_NEURAL_STATION_V2.5</span>
            <span className="w-3 md:w-4 h-3 md:h-4 rounded-full bg-gray-950 hidden md:block"></span>
            <span className="hover:text-primary cursor-default transition-all duration-300">BUILD: ALPHA_UNIT_77</span>
         </div>
         <div className="flex items-center gap-6 md:gap-8 bg-white/5 px-8 md:px-12 py-4 md:py-5 rounded-full border border-white/10 backdrop-blur-3xl shadow-3xl">
            <div className="w-3 md:w-4 h-3 md:h-4 rounded-full bg-secondary animate-pulse shadow-[0_0_20px_#10b981]"></div>
            <span className="text-gray-600">Neural_Sync: Stable</span>
         </div>
      </footer>

      {/* Floating HUD elements for premium feel */}
      <div className="fixed bottom-10 left-10 z-50 pointer-events-none hidden 2xl:block opacity-20">
         <div className="font-mono text-[9px] text-cyan space-y-1">
            <p>LATENCY: 12ms</p>
            <p>PACKET_LOSS: 0.00%</p>
            <p>JITTER: 1.2ms</p>
         </div>
      </div>
      
      <div className="fixed top-1/2 right-10 -translate-y-1/2 z-50 pointer-events-none hidden 2xl:block opacity-20">
         <div className="font-mono text-[9px] text-primary rotate-90 space-x-10 flex">
            <span>X_COORD: 44.122</span>
            <span>Y_COORD: 19.982</span>
            <span>Z_COORD: 104.221</span>
         </div>
      </div>

    </div>
  );
};

export default Dashboard;
