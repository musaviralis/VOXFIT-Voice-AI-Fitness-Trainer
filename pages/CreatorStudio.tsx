
import React, { useState } from 'react';
import { generateContentIdeas, generateSocialImage } from '../services/geminiService';
import { ContentIdea } from '../types';
import { Clapperboard, Sparkles, Image as ImageIcon, Loader2, Share2, Copy, Check } from 'lucide-react';

const CreatorStudio: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('Instagram Reels');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [generatingImageId, setGeneratingImageId] = useState<number | null>(null);
  const [generatedImages, setGeneratedImages] = useState<Record<number, string>>({});
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setIdeas([]);
    setGeneratedImages({});
    try {
      const result = await generateContentIdeas(topic, platform);
      setIdeas(result);
    } catch (e) {
      alert("Failed to generate content ideas. Check API key.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateImage = async (index: number, prompt: string) => {
    setGeneratingImageId(index);
    try {
      const base64 = await generateSocialImage(prompt);
      if (base64) {
        setGeneratedImages(prev => ({ ...prev, [index]: base64 }));
      } else {
        alert("Failed to generate image.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGeneratingImageId(null);
    }
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fade-in pb-12">
      <div className="flex flex-col gap-2 border-l-4 border-accent pl-6 py-2">
        <h1 className="text-5xl font-black text-white tracking-tighter uppercase">VOX <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">Creator</span></h1>
        <p className="text-gray-400 text-lg font-medium">Generate viral hooks, scripts, and cinematic visuals tailored for Indian fitness audiences.</p>
      </div>

      {/* Input Section */}
      <div className="glass-panel rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
           <Clapperboard size={120} />
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-end relative z-10">
          <div className="flex-1 w-full space-y-3">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Topic or Struggle</label>
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. How to grow stubborn calves, Deadlift mistakes..."
              className="w-full bg-black/40 border border-white/10 text-white rounded-2xl p-5 focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all font-medium text-lg placeholder:text-gray-600"
            />
          </div>
          <div className="w-full md:w-80 space-y-3">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Platform</label>
            <div className="relative">
              <select 
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-black/40 border border-white/10 text-white rounded-2xl p-5 focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all font-medium appearance-none text-lg"
              >
                <option>Instagram Reels</option>
                <option>YouTube Shorts</option>
                <option>TikTok</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <Share2 size={18} />
              </div>
            </div>
          </div>
          <button 
            onClick={handleGenerate}
            disabled={loading || !topic}
            className="w-full md:w-auto bg-gradient-to-r from-accent to-purple-600 hover:to-purple-500 text-white font-black py-5 px-10 rounded-2xl transition-all shadow-[0_10px_30px_-10px_rgba(139,92,246,0.5)] hover:shadow-[0_15px_35px_-10px_rgba(139,92,246,0.6)] hover:-translate-y-1 flex items-center justify-center disabled:opacity-50 min-w-[160px]"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles className="mr-2 fill-white" />}
            Generate
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 gap-12">
        {ideas.map((idea, idx) => (
          <div key={idx} className="glass-card rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 bg-[#050914]">
             <div className="bg-gradient-to-r from-white/5 to-transparent p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <Clapperboard size={20} />
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight">{idea.title}</h3>
                </div>
                <span className="text-[10px] font-bold bg-white/5 text-gray-300 px-4 py-2 rounded-full border border-white/10 uppercase tracking-widest">{platform}</span>
             </div>

             <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Text Content */}
                <div className="space-y-10">
                  <div className="group relative">
                    <div className="flex justify-between items-center mb-4">
                       <h4 className="text-accent font-bold text-xs uppercase tracking-widest flex items-center"><Share2 size={14} className="mr-2"/> The Hook (3s)</h4>
                       <button onClick={() => copyToClipboard(idea.hook, idx)} className="text-gray-500 hover:text-white transition-colors">
                          {copiedId === idx ? <Check size={14} className="text-green-500"/> : <Copy size={14}/>}
                       </button>
                    </div>
                    <div className="bg-surface/50 p-6 rounded-2xl border-l-4 border-accent relative">
                      <p className="text-xl font-black text-white leading-snug">"{idea.hook}"</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-4">Script Outline</h4>
                    <div className="bg-surface/30 p-6 rounded-2xl border border-white/5">
                      <p className="text-gray-300 whitespace-pre-line leading-relaxed text-sm font-medium">{idea.script}</p>
                    </div>
                  </div>

                  <div>
                     <h4 className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-4">Optimized Caption</h4>
                     <div className="bg-black/40 p-5 rounded-2xl text-xs text-gray-400 font-mono border border-white/5 leading-relaxed">
                        {idea.caption}
                     </div>
                  </div>
                </div>

                {/* Visuals */}
                <div className="space-y-8">
                   <div>
                     <h4 className="text-purple-400 font-bold text-xs uppercase tracking-widest mb-4 flex items-center"><ImageIcon size={14} className="mr-2"/> AI Visual Direction</h4>
                     <div className="bg-purple-500/5 p-6 rounded-2xl text-sm text-gray-400 italic border border-purple-500/10 leading-relaxed">
                        "{idea.visualPrompt}"
                     </div>
                   </div>
                   
                   <div className="relative w-full aspect-[9/16] md:aspect-video bg-black rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center group shadow-2xl">
                      {generatedImages[idx] ? (
                        <>
                           <img src={generatedImages[idx]} alt="Generated content visual" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                              <button className="w-full py-3 bg-white text-black font-bold rounded-xl shadow-lg">Download Asset</button>
                           </div>
                        </>
                      ) : (
                        <div className="text-center p-8">
                           <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6 text-gray-700 border border-white/5">
                              <ImageIcon size={40} />
                           </div>
                           <p className="text-gray-500 text-sm font-medium mb-6">Generate a cinematic placeholder for your reel cover.</p>
                           <button 
                             onClick={() => handleGenerateImage(idx, idea.visualPrompt)}
                             disabled={generatingImageId === idx}
                             className="bg-white/5 hover:bg-white/10 text-white font-bold py-3 px-6 rounded-xl border border-white/10 flex items-center justify-center mx-auto transition-all"
                           >
                              {generatingImageId === idx ? <Loader2 className="animate-spin mr-2" size={16} /> : <Sparkles className="mr-2 text-purple-400" size={16} />}
                              Generate Visual
                           </button>
                        </div>
                      )}
                   </div>
                </div>
             </div>
          </div>
        ))}

        {ideas.length === 0 && !loading && (
          <div className="text-center py-32 border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.01]">
             <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
                <Clapperboard size={32} className="text-gray-600" />
             </div>
             <h3 className="text-white font-bold text-xl mb-2">Start Creating</h3>
             <p className="text-gray-500 text-base font-medium">Enter a fitness topic above to generate viral content scripts.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorStudio;
