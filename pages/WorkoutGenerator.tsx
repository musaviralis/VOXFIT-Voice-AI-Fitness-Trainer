
import React, { useState } from 'react';
import { generateWorkoutRoutine } from '../services/geminiService';
import { FitnessGoal, ExperienceLevel, WorkoutPlan } from '../types';
import { Dumbbell, Loader2, Save, Play, Flame, HeartPulse, Youtube, Sliders, Check, ChevronDown, Activity, Clock, ExternalLink, Trophy, BicepsFlexed, Heart, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WorkoutGenerator: React.FC = () => {
  const { language, t } = useLanguage();
  const [goal, setGoal] = useState<FitnessGoal>(FitnessGoal.HYPERTROPHY);
  const [level, setLevel] = useState<ExperienceLevel>(ExperienceLevel.INTERMEDIATE);
  const [days, setDays] = useState<number>(4);
  const [equipment, setEquipment] = useState<string>("Full Gym");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setPlan(null);
    try {
      const result = await generateWorkoutRoutine(goal, level, days, equipment, language);
      setPlan(result);
    } catch (e) {
      alert("Failed to generate plan. Please check API key.");
    } finally {
      setLoading(false);
    }
  };

  const getGoalIcon = (g: FitnessGoal) => {
    if (g.includes('Hypertrophy')) return <BicepsFlexed size={18} />;
    if (g.includes('Strength')) return <Trophy size={18} />;
    if (g.includes('Fat')) return <Flame size={18} />;
    return <Heart size={18} />;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-fade-in pb-12">
      <div className="flex flex-col gap-2 border-l-4 border-primary pl-6 py-2">
        <h1 className="text-5xl font-black text-white tracking-tighter uppercase">VOXFIT <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Protocol</span></h1>
        <p className="text-gray-400 text-lg max-w-2xl font-medium">AI-designed hyper-specific routines tailored to your physiology.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Controls Panel */}
        <div className="lg:col-span-4 space-y-8">
          <div className="glass-panel p-8 rounded-[2rem] sticky top-24 shadow-2xl border-t border-white/10">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <Sliders className="text-primary" size={14} /> Configuration
            </h2>
            
            <div className="space-y-8">
              {/* Goal Selector */}
              <div>
                <label className="block text-sm font-bold text-white mb-4">Training Goal</label>
                <div className="grid grid-cols-1 gap-3">
                   {Object.values(FitnessGoal).map(g => (
                      <button
                        key={g}
                        onClick={() => setGoal(g)}
                        className={`w-full text-left px-4 py-4 rounded-xl text-sm font-bold transition-all border group relative overflow-hidden flex items-center gap-3 ${
                           goal === g 
                           ? 'bg-white/10 text-white border-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                           : 'bg-surface/50 text-gray-400 border-white/5 hover:bg-white/5 hover:border-white/10'
                        }`}
                      >
                         <div className={`p-2 rounded-lg ${goal === g ? 'bg-primary text-white' : 'bg-white/5 text-gray-500'}`}>
                            {getGoalIcon(g)}
                         </div>
                         <span className="relative z-10 flex-1">
                           {g.split('(')[0]}
                         </span>
                         {goal === g && <Check size={16} className="text-primary" />}
                      </button>
                   ))}
                </div>
              </div>

              {/* Level Selector */}
              <div>
                <label className="block text-sm font-bold text-white mb-4">Experience Level</label>
                <div className="flex bg-surface/50 p-1.5 rounded-xl border border-white/5">
                   {Object.values(ExperienceLevel).map(l => (
                      <button
                        key={l}
                        onClick={() => setLevel(l)}
                        className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all text-center uppercase tracking-wide ${
                           level === l 
                           ? 'bg-white text-black shadow-md' 
                           : 'text-gray-500 hover:text-gray-300'
                        }`}
                      >
                        {l.split(' ')[0]}
                      </button>
                   ))}
                </div>
              </div>

              {/* Frequency Slider */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="block text-sm font-bold text-white">Frequency</label>
                  <span className="text-primary font-mono text-xl font-bold">{days} <span className="text-xs text-gray-500 font-sans font-medium uppercase tracking-wider">Days/Week</span></span>
                </div>
                <div className="relative h-2 bg-surface rounded-full overflow-hidden">
                   <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-blue-400 rounded-full" style={{width: `${((days-2)/4)*100}%`}}></div>
                   <input 
                    type="range" min="2" max="6" step="1" value={days}
                    onChange={(e) => setDays(parseInt(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Equipment Input */}
              <div>
                 <label className="block text-sm font-bold text-white mb-4">Equipment Available</label>
                 <div className="relative group">
                    <input 
                        type="text" value={equipment} onChange={(e) => setEquipment(e.target.value)}
                        className="w-full bg-surface/50 border border-white/10 text-white rounded-xl px-4 py-4 focus:ring-1 focus:ring-primary focus:border-primary outline-none font-medium transition-all group-hover:border-white/20"
                    />
                    <Dumbbell className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-primary transition-colors" size={18} />
                 </div>
              </div>

              <button 
                onClick={handleGenerate} disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-blue-600 hover:to-blue-500 text-white font-black py-5 rounded-2xl transition-all shadow-[0_10px_30px_-10px_rgba(59,130,246,0.5)] hover:shadow-[0_15px_35px_-10px_rgba(59,130,246,0.6)] hover:-translate-y-1 flex items-center justify-center text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? <Loader2 className="animate-spin mr-2" /> : <Zap className="mr-2 fill-white" />}
                {loading ? 'Forging Plan...' : 'Generate Program'}
              </button>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-8">
          {plan ? (
            <div className="space-y-8 animate-fade-in-up">
              {/* Plan Header */}
              <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group">
                 <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
                 <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
                 <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
                 
                 <div className="relative z-10 p-10 md:p-12">
                   <div className="flex justify-between items-start mb-6">
                      <span className="bg-primary/20 text-primary border border-primary/20 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-md">
                        AI Generated Protocol
                      </span>
                      <Activity className="text-gray-500" />
                   </div>
                   <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1] mb-6 tracking-tight">{plan.title}</h2>
                   <p className="text-gray-400 text-lg leading-relaxed max-w-2xl border-l-2 border-primary/50 pl-6">{plan.description}</p>
                 </div>
              </div>

              {/* Days Grid */}
              <div className="space-y-6">
                {plan.days.map((day, idx) => (
                  <div key={idx} className="glass-card rounded-[2rem] overflow-hidden hover:border-white/10 transition-all group relative">
                    {/* Day Header */}
                    <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between bg-gradient-to-r from-white/5 to-transparent gap-6">
                      <div className="flex items-center gap-5">
                         <div className="relative">
                            <div className="w-12 h-12 rounded-2xl bg-surface border border-white/10 flex items-center justify-center font-black text-xl text-white shadow-lg z-10 relative">
                              {idx + 1}
                            </div>
                            <div className="absolute inset-0 bg-primary/20 blur-lg"></div>
                         </div>
                         <div>
                           <h3 className="text-2xl font-bold text-white mb-1">{day.dayName}</h3>
                           <span className="text-primary text-xs font-bold uppercase tracking-[0.15em]">{day.focus}</span>
                         </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/5 text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                           <Clock size={14} className="text-primary"/> 45-60 Min
                         </div>
                      </div>
                    </div>

                    <div className="p-8 space-y-10">
                      {/* Warmup Section */}
                      <div>
                         <h4 className="flex items-center gap-2 text-xs font-bold text-orange-500 uppercase tracking-widest mb-4">
                           <Flame size={14} /> Warm Up Activation
                         </h4>
                         <div className="bg-orange-500/5 border border-orange-500/10 rounded-2xl p-6 text-gray-300 text-sm leading-relaxed">
                           {day.warmup}
                         </div>
                      </div>

                      {/* Exercises List */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Main Lifts & Accessories</h4>
                        {day.exercises.map((ex, i) => (
                          <div key={i} className="group/ex p-5 rounded-2xl bg-surface/50 border border-white/5 hover:border-primary/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/5 hover:shadow-lg">
                             <div className="flex-1 space-y-2">
                                <div className="flex flex-wrap items-center gap-3">
                                   <span className="font-bold text-white text-lg tracking-tight group-hover/ex:text-primary transition-colors">{ex.name}</span>
                                   <a 
                                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(ex.name + " proper form")}`} 
                                      target="_blank" 
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-gray-400 text-[10px] font-bold uppercase tracking-wide hover:bg-red-500/20 hover:text-red-400 transition-all border border-white/5 hover:border-red-500/20"
                                   >
                                      <Youtube size={12} /> Demo
                                   </a>
                                </div>
                                <p className="text-sm text-gray-500 font-medium">{ex.notes}</p>
                             </div>
                             
                             <div className="flex items-center gap-3">
                                <div className="flex flex-col items-center bg-black/20 rounded-xl px-5 py-2 border border-white/5 min-w-[80px]">
                                   <span className="text-[9px] text-gray-600 uppercase font-black tracking-wider">Sets</span>
                                   <span className="text-white font-mono font-bold text-lg">{ex.sets}</span>
                                </div>
                                <div className="text-gray-700 font-thin text-2xl">/</div>
                                <div className="flex flex-col items-center bg-black/20 rounded-xl px-5 py-2 border border-white/5 min-w-[80px]">
                                   <span className="text-[9px] text-gray-600 uppercase font-black tracking-wider">Reps</span>
                                   <span className="text-secondary font-mono font-bold text-lg">{ex.reps}</span>
                                </div>
                             </div>
                          </div>
                        ))}
                      </div>

                      {/* Cooldown Section */}
                       <div className="border-t border-white/5 pt-6 flex items-start gap-4">
                          <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><HeartPulse size={20} /></div>
                          <div>
                            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Recovery Protocol</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">{day.cooldown}</p>
                          </div>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[600px] flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-white/5 rounded-[2.5rem] bg-white/[0.02] group">
              <div className="w-32 h-32 bg-surface rounded-full flex items-center justify-center mb-8 shadow-2xl border border-white/5 group-hover:scale-110 transition-transform duration-500">
                <Dumbbell className="text-gray-600 group-hover:text-primary transition-colors" size={48} />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Ready to Forge?</h3>
              <p className="text-gray-500 text-lg max-w-md mx-auto leading-relaxed">Select your parameters on the left to generate a hyper-personalized workout protocol tailored to your goals.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutGenerator;
