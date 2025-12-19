import React, { useState, useEffect } from 'react';
import * as ReactRouterDom from 'react-router-dom';
const { Link, useNavigate } = ReactRouterDom as any;
import { 
  Activity, Zap, Calendar, Mic, ArrowRight, Play, Flame, 
  Sparkles, Target, Trophy, Info, 
  Dumbbell, HeartPulse, BrainCircuit, Droplets,
  Clock, ShieldCheck, ChevronRight, Waves, 
  ShieldAlert, FastForward, Binary, Cpu, Fingerprint, 
  Hexagon, Crosshair, ListTodo, Rocket, X, Workflow,
  FileText, Shield
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
  const navigate = useNavigate();
  const [mantra, setMantra] = useState<string>("Bypassing Neural Inhibitors...");
  const [strategy, setStrategy] = useState<string>("Analyzing biometric baseline...");
  const [intel, setIntel] = useState<string>("SYNCING_BIOMETRICS...");
  const [isLoading, setIsLoading] = useState(true);
  const [isBooting, setIsBooting] = useState(true);
  const [systemProgress, setSystemProgress] = useState(0);
  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false);
  const [isBriefingModalOpen, setIsBriefingModalOpen] = useState(false);

  useEffect(() => {
    // High-end boot sequence
    const bootTimer = setTimeout(() => setIsBooting(false), 2500);
    const progressInterval = setInterval(() => {
      setSystemProgress(prev => (prev >= 100 ? 100 : prev + 1.8));
    }, 20);

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
            contents: "Summarize a 4-week 'Neural Projection' for an athlete starting Day 1. Focus on CNS adaptation and foundation building in 2 punchy sentences. Tonality: Elite, Disciplined Coach.",
            config: { 
              thinkingConfig: { thinkingBudget: 2000 },
              temperature: 0.8
            }
          })
        ]);

        setMantra(flashRes.text || "Pehla kadam asli jeet hai. Today you conquer the comfort zone.");
        setStrategy(proRes.text || "Projection: Initial 28-day window dedicated to CNS recalibration and mitochondrial biogenesis. Lay the foundation.");
        setIntel("READY_FOR_DEPLOYMENT");
      } catch (e) {
        setMantra("Abhi nahi toh kabhi nahi. Day 1 starts now.");
        setStrategy("Emergency Briefing: Focus on movement quality and neural mapping for the first 7 days.");
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
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in pb-32 relative max-w-full overflow-x-hidden">
      
      {/* TACTICAL DATA FEED */}
      <div className="w-full h-12 glass-panel border-y border-white/5 flex items-center overflow-hidden bg-black/90 relative z-40">
         <div className="flex animate-[shimmer_50s_linear_infinite] gap-24 items-center px-6">
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center gap-12 text-[10px] font-black text-gray-500 uppercase tracking-[0.5em] whitespace-nowrap">
                 <span className="text-cyan flex items-center gap-2"><Workflow size={14} /> SYSTEM: VOX_PRO_V2</span>
                 <span className="w-1.5 h-1.5 rounded-full bg-gray-800"></span>
                 <span className="text-primary flex items-center gap-2"><Binary size={14} /> STATUS: {intel}</span>
                 <span className="w-1.5 h-1.5 rounded-full bg-gray-800"></span>
                 <span className="text-secondary flex items-center gap-2"><Crosshair size={14} /> TARGET: PEAK_PERFORMANCE</span>
              </div>
            ))}
         </div>
      </div>

      {/* HERO COMMAND CENTER */}
      <header className="grid grid-cols-1 2xl:grid-cols-12 gap-12 p-6 md:p-12 glass-panel rounded-[3rem] md:rounded-[5rem] relative overflow-hidden group border border-white/10 shadow-2xl bg-gradient-to-br from-surface via-background to-[#020308]">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
        
        <div className="2xl:col-span-8 flex flex-col justify-between space-y-12 relative z-10">
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-cyan/10 border border-cyan/30 backdrop-blur-3xl shadow-[0_0_40px_rgba(77,238,202,0.15)]">
                  <div className="w-2 h-2 rounded-full bg-cyan animate-ping shadow-[0_0_10px_#4deeca]"></div>
                  <span className="text-[10px] md:text-[12px] font-black text-white uppercase tracking-[0.4em]">PHASE: GENESIS_INIT</span>
              </div>
            </div>
            
            <h1 className="text-[5rem] md:text-[12rem] font-black text-white tracking-tighter leading-[0.8] italic uppercase">
              DEPLOY_<br/>
              <span className="text-transparent bg-clip-text bg-gradient-vox">MISSION</span>
            </h1>

            <div className="flex flex-col sm:flex-row gap-6">
              {/* THE ONE PLACE BUTTON */}
              <button 
                onClick={() => setIsMissionModalOpen(true)}
                className="group/btn relative flex items-center gap-6 bg-white text-black py-8 px-14 rounded-[2.5rem] font-black text-2xl uppercase tracking-[0.4em] overflow-hidden hover:scale-105 active:scale-95 transition-all shadow-[0_40px_80px_-20px_rgba(255,255,255,0.4)]"
              >
                 <div className="absolute inset-0 bg-gradient-vox opacity-0 group-hover/btn:opacity-10 transition-opacity"></div>
                 <Rocket size={36} className="text-primary group-hover/btn:animate-bounce" />
                 START_DAILY_MISSION
              </button>

              <button 
                onClick={() => setIsBriefingModalOpen(true)}
                className="group/brief relative flex items-center gap-4 bg-white/5 border border-white/10 text-white py-8 px-10 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] overflow-hidden hover:bg-white/10 transition-all"
              >
                <FileText size={20} className="text-cyan group-hover/brief:scale-110 transition-transform" />
                READ_TACTICAL_BRIEF
              </button>
            </div>
          </div>

          <div className="glass-panel p-6 md:p-8 rounded-[2.5rem] border-primary/20 bg-primary/5 max-w-3xl relative overflow-hidden">
             <div className="flex items-center gap-4 mb-4">
                <ShieldAlert size={20} className="text-primary" />
                <span className="text-[11px] font-black text-primary uppercase tracking-widest">Neural core Projection</span>
             </div>
             <p className={`text-gray-100 font-medium italic text-lg md:text-xl transition-all duration-1000 ${isLoading ? 'opacity-20 blur-sm' : 'opacity-100'}`}>
                "{strategy}"
             </p>
          </div>
        </div>

        {/* HUD SIDEBAR */}
        <div className="2xl:col-span-4 flex flex-col gap-8 relative z-10">
           <div className="glass-panel p-8 md:p-12 rounded-[3rem] border-cyan/40 bg-cyan/5 shadow-[0_0_100px_-20px_rgba(77,238,202,0.3)] flex flex-col items-center text-center">
              <p className="text-[12px] font-black text-cyan uppercase tracking-[0.6em] mb-6">Mission_Streak</p>
              <span className="text-[8rem] font-black text-white tracking-tighter leading-none">01</span>
              <span className="text-2xl font-black text-cyan/40 tracking-tighter italic mt-2">GENESIS_DAY</span>
           </div>

           <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Uptime', val: '00:02:14', icon: <Clock /> },
                { label: 'Integrity', val: '100%', icon: <ShieldCheck /> },
              ].map((h, i) => (
                <div key={i} className="glass-panel p-6 rounded-[2rem] border-white/5 flex flex-col justify-between hover:bg-white/5 transition-all">
                   <div className="text-primary mb-3 bg-primary/10 w-fit p-2 rounded-xl">{React.cloneElement(h.icon as React.ReactElement<any>, { size: 20 })}</div>
                   <div>
                      <p className="text-white font-black text-xl tracking-tighter">{h.val}</p>
                      <p className="text-[8px] text-gray-600 font-bold uppercase tracking-widest mt-1">{h.label}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </header>

      {/* TACTICAL BRIEFING MODAL - "HIDDEN" CONTENT */}
      {isBriefingModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 md:p-12 animate-fade-in">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setIsBriefingModalOpen(false)}></div>
          <div className="relative w-full max-w-3xl glass-panel rounded-[3rem] md:rounded-[4rem] border-cyan/20 shadow-3xl overflow-hidden flex flex-col bg-background max-h-[90vh]">
            <div className="p-10 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Fixed: replaced non-existent ShieldInfo icon with Shield */}
                <Shield size={32} className="text-cyan" />
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Day_1_Initialization</h2>
              </div>
              <button onClick={() => setIsBriefingModalOpen(false)} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 transition-all">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-10 md:p-14 overflow-y-auto scrollbar-hide space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-cyan font-black text-[10px] uppercase tracking-[0.4em]">
                  <Crosshair size={14} /> SUBJECT: NEURAL_PROJECTION
                </div>
                <p className="text-gray-300 text-lg leading-relaxed font-medium italic border-l-4 border-cyan/40 pl-6">
                  "Listen closely. You are standing at Day 1. The visual mirror confirms nothing, but the internal machinery is about to undergo a hostile takeover. For the next four weeks, forget hypertrophy. Forget aesthetics. Your primary objective is Systemic Re-wiring."
                </p>
              </div>

              <div className="space-y-8">
                {[
                  { week: 'WEEK 1', title: 'Neuromuscular Calibration', desc: 'Your muscles are dormant hardware. We are teaching the CNS to stop inhibiting force. Precision over load.' },
                  { week: 'WEEK 2', title: 'Metabolic Expansion', desc: 'Mitochondrial Biogenesis. We trigger the PGC-1α pathway to grow more power plants in your cells.' },
                  { week: 'WEEK 3', title: 'Synaptic Facilitation', desc: 'Resistance at the synapse decreases. Signals travel faster. Phantom strength emerges.' },
                  { week: 'WEEK 4', title: 'Structural Integrity Check', desc: 'Homeostasis disrupted and reset at a higher baseline. graduation from Learning to Train to Training to Win.' }
                ].map((w, i) => (
                  <div key={i} className="bg-white/5 p-8 rounded-[2rem] border border-white/5 hover:border-cyan/30 transition-all group">
                    <span className="text-[10px] font-black text-cyan uppercase tracking-widest">{w.week}</span>
                    <h3 className="text-2xl font-black text-white uppercase mt-1 group-hover:text-cyan transition-colors">{w.title}</h3>
                    <p className="text-gray-500 text-sm mt-3 leading-relaxed">{w.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-10 border-t border-white/10 text-center">
                <p className="text-gray-400 text-sm font-bold italic">
                  "In 28 days, you will be a completely different organism under the hood. Execute."
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MISSION CONTROL MODAL */}
      {isMissionModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 md:p-12 animate-fade-in">
           <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl" onClick={() => setIsMissionModalOpen(false)}></div>
           
           <div className="relative w-full max-w-4xl glass-panel rounded-[4rem] border-white/10 shadow-3xl overflow-hidden flex flex-col bg-background">
              <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
              
              <div className="p-10 border-b border-white/5 flex items-center justify-between relative z-10">
                 <div className="flex items-center gap-6">
                    <div className="p-4 bg-primary/20 rounded-[2rem] text-primary">
                       <ListTodo size={32} />
                    </div>
                    <div>
                       <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">Mission_Control</h2>
                       <p className="text-gray-500 font-bold text-xs uppercase tracking-[0.4em]">Centrailized Task Deployment</p>
                    </div>
                 </div>
                 <button onClick={() => setIsMissionModalOpen(false)} className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 transition-all">
                    <X size={24} />
                 </button>
              </div>

              <div className="p-10 md:p-16 space-y-6 overflow-y-auto relative z-10">
                 {[
                   { label: 'Voice Training', path: '/voice', icon: <Mic />, color: 'border-cyan', desc: 'Deploy hands-free AI coaching session.' },
                   { label: 'Nutrition Sync', path: '/nutrition', icon: <Droplets />, color: 'border-primary', desc: 'Log and analyze your metabolic intake.' },
                   { label: 'Coach Intel', path: '/coach', icon: <BrainCircuit />, color: 'border-accent', desc: 'Direct neural link for tactical guidance.' }
                 ].map((task, i) => (
                   <button 
                     key={i} 
                     onClick={() => { setIsMissionModalOpen(false); navigate(task.path); }}
                     className={`w-full flex items-center gap-8 p-10 rounded-[3rem] glass-card border-l-[12px] ${task.color} bg-black/40 hover:scale-[1.02] transition-all group/task`}
                   >
                      <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-white group-hover/task:bg-white/10 transition-all">
                         {React.cloneElement(task.icon as React.ReactElement<any>, { size: 36 })}
                      </div>
                      <div className="flex-1 text-left">
                         <h3 className="text-3xl font-black text-white tracking-tighter leading-none mb-2 uppercase">{task.label}</h3>
                         <p className="text-gray-500 text-sm font-medium">{task.desc}</p>
                      </div>
                      <ArrowRight size={28} className="text-gray-700 group-hover/task:text-white transition-colors" />
                   </button>
                 ))}
              </div>

              <div className="p-10 bg-black/60 border-t border-white/5 flex items-center justify-between relative z-10">
                 <p className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em]">System_Status: Optimal</p>
                 <div className="flex gap-2">
                    {[1,2,3,4,5].map(i => <div key={i} className={`w-8 h-1.5 rounded-full ${i <= 3 ? 'bg-cyan' : 'bg-white/5'}`}></div>)}
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* PERSISTENCE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
         <div className="glass-panel p-10 rounded-[4rem] border-white/5 flex flex-col h-full group relative overflow-hidden bg-[#060810] shadow-2xl">
            <div className="flex items-center justify-between mb-12 relative z-10">
               <div className="space-y-3">
                  <h4 className="text-white font-black text-3xl tracking-tighter">Persistence_Log</h4>
                  <p className="text-[11px] text-gray-600 font-bold uppercase tracking-[0.4em] italic flex items-center gap-3">
                    <FastForward size={16} className="text-cyan animate-pulse" /> GENESIS_STREAM
                  </p>
               </div>
               <Calendar size={28} className="text-cyan opacity-30" />
            </div>

            <div className="grid grid-cols-7 gap-3 relative z-10 flex-1 content-start">
               {heatmapData.map((d, i) => (
                  <div key={i} className={`aspect-square rounded-xl transition-all duration-1000 border-2 ${d.intensity === 0 ? 'bg-white/[0.02] border-white/5' : 'bg-cyan border-cyan animate-pulse scale-110'}`}>
                     {d.intensity > 0 && <div className="w-full h-full flex items-center justify-center"><Flame size={16} className="text-black fill-black" /></div>}
                  </div>
               ))}
            </div>
         </div>

         <div className="glass-panel p-10 rounded-[4rem] border-white/5 space-y-12 group relative overflow-hidden bg-gradient-to-b from-[#0A0E1A] via-[#03050C] to-background shadow-2xl">
            <h4 className="text-white font-black text-[12px] uppercase tracking-[0.6em] flex items-center gap-4 relative z-10">
               <Activity size={24} className="text-primary" /> Live_Biokinetic_Sync
            </h4>
            <div className="space-y-10 relative z-10">
               {[
                  { label: 'Neural_Adaptation', val: 98, color: 'text-cyan', bg: 'bg-cyan' },
                  { label: 'Power_Reserves', val: 100, color: 'text-accent', bg: 'bg-accent' },
               ].map((g, i) => (
                  <div key={i} className="space-y-6">
                     <div className="flex justify-between items-end">
                        <span className="text-[12px] font-black uppercase tracking-[0.4em] text-gray-600">{g.label}</span>
                        <span className={`${g.color} font-mono font-bold text-xl tracking-tighter`}>{g.val}%</span>
                     </div>
                     <div className="w-full h-3.5 bg-white/5 rounded-full overflow-hidden border border-white/10 p-[4px]">
                        <div className={`h-full rounded-full ${g.bg} transition-all duration-1000 ease-out`} style={{ width: `${g.val}%` }}></div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="grid grid-cols-1 gap-8 h-full">
            <Link to="/nutrition" className="glass-panel p-10 rounded-[4rem] border-white/5 hover:border-cyan/70 transition-all flex items-center justify-between overflow-hidden relative shadow-3xl">
               <div className="flex items-center gap-8 relative z-10">
                  <div className="w-20 h-20 bg-cyan/10 rounded-[2.5rem] flex items-center justify-center text-cyan border border-cyan/40">
                     <Droplets size={36} />
                  </div>
                  <div>
                     <h5 className="text-white font-black text-2xl tracking-tighter leading-none">Fuel_Core</h5>
                     <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.4em] mt-3">Macro_Log_Active</p>
                  </div>
               </div>
               <ChevronRight size={24} className="text-gray-800" />
            </Link>

            <Link to="/coach" className="glass-panel p-10 rounded-[4rem] border-white/5 hover:border-accent/70 transition-all flex items-center justify-between overflow-hidden relative shadow-3xl">
               <div className="flex items-center gap-8 relative z-10">
                  <div className="w-20 h-20 bg-accent/10 rounded-[2.5rem] flex items-center justify-center text-accent border border-accent/40">
                     <BrainCircuit size={36} />
                  </div>
                  <div>
                     <h5 className="text-white font-black text-2xl tracking-tighter leading-none">AI_Consult</h5>
                     <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.4em] mt-3">Neural_Intel_Link</p>
                  </div>
               </div>
               <ChevronRight size={24} className="text-gray-800" />
            </Link>
         </div>
      </div>

      <footer className="flex flex-col md:flex-row items-center justify-between gap-12 text-[10px] font-black text-gray-900 uppercase tracking-[0.6em] px-10 pt-16 border-t border-white/5">
         <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 text-center">
            <span>VOXFIT_NEURAL_STATION_V2.5</span>
            <span className="w-3 h-3 rounded-full bg-gray-950 hidden md:block"></span>
            <span>BUILD: ALPHA_UNIT_77</span>
         </div>
         <div className="flex items-center gap-6 bg-white/5 px-8 py-4 rounded-full border border-white/10 backdrop-blur-3xl">
            <div className="w-3 h-3 rounded-full bg-secondary animate-pulse shadow-[0_0_20px_#10b981]"></div>
            <span className="text-gray-600">Neural_Sync: Stable</span>
         </div>
      </footer>

    </div>
  );
};

export default Dashboard;