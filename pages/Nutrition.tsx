import React, { useState, useRef } from 'react';
import { analyzeMealImage } from '../services/geminiService';
import { Camera, Upload, AlertCircle, CheckCircle, Zap, Droplet, ChefHat, Scan } from 'lucide-react';

const Nutrition: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!imagePreview) return;
    setLoading(true);

    try {
      const base64Data = imagePreview.split(',')[1];
      const mimeType = imagePreview.split(';')[0].split(':')[1];
      const result = await analyzeMealImage(base64Data, mimeType);
      setAnalysis(result);
    } catch (error) {
      setAnalysis("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Nutrition Lab</h1>
           <p className="text-gray-400 text-lg">Analyze your Desi meals instantly with AI vision.</p>
        </div>
        <div className="flex space-x-3">
           <div className="glass-panel px-5 py-3 rounded-xl flex items-center space-x-3 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/10">
              <Droplet size={20} className="fill-blue-500/20" />
              <span className="font-bold text-sm">2.5L Water Goal</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Upload Card */}
        <div className="glass-panel rounded-3xl p-3 shadow-2xl flex flex-col h-full">
          <div className={`relative flex-1 bg-surface rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center transition-all overflow-hidden group min-h-[400px] ${!imagePreview ? 'hover:border-primary/40 hover:bg-white/5 cursor-pointer' : ''}`}>
             
             {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Meal" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8 backdrop-blur-[2px]">
                     <button 
                       onClick={() => { setImagePreview(null); setAnalysis(null); }}
                       className="bg-white text-black px-6 py-3 rounded-full font-bold shadow-xl hover:scale-105 transition-transform"
                     >
                        Retake Photo
                     </button>
                  </div>
                </>
             ) : (
                <div onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center text-center p-8">
                   <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform border border-primary/20">
                      <Camera size={40} />
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-2">Snap your Meal</h3>
                   <p className="text-gray-500 max-w-xs text-sm">Upload a photo of your Thali, Bowl, or Snack for instant macro breakdown.</p>
                </div>
             )}
             
             <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
          </div>

          <div className="p-4 pt-6">
             <button 
                onClick={handleAnalyze}
                disabled={!imagePreview || loading}
                className="w-full bg-primary hover:bg-blue-600 text-white disabled:bg-surface disabled:text-gray-600 font-black py-4 rounded-xl text-lg transition-all flex items-center justify-center shadow-lg shadow-primary/20"
             >
                {loading ? <Scan className="animate-spin mr-2" /> : <Zap className="mr-2" />}
                {loading ? "Analyzing Macros..." : "Rate My Meal"}
             </button>
          </div>
        </div>

        {/* Results Card */}
        <div className="glass-card rounded-3xl p-8 shadow-2xl flex flex-col relative overflow-hidden h-full min-h-[400px]">
          <h2 className="text-xl font-black text-white mb-6 flex items-center tracking-tight">
            <CheckCircle className="mr-3 text-secondary" size={24} /> 
            Coach's Verdict
          </h2>
          
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-50">
                <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs font-bold tracking-[0.3em] uppercase text-primary">Processing</p>
              </div>
            ) : analysis ? (
              <div className="space-y-6 animate-fade-in-up">
                <div className="glass-panel border-l-4 border-primary p-6 rounded-r-2xl bg-primary/5">
                  <p className="text-gray-200 whitespace-pre-line leading-relaxed font-medium text-sm md:text-base">
                    {analysis}
                  </p>
                </div>
                <div className="bg-surface p-5 rounded-xl border border-white/5 flex items-start gap-3">
                   <div className="bg-white/10 p-2 rounded-lg"><ChefHat size={16} className="text-gray-400"/></div>
                   <div>
                     <p className="text-gray-400 text-xs font-medium leading-relaxed">
                       AI analysis gives estimates based on visual data. Always cross-reference with package labels or a food scale for precision.
                     </p>
                   </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-700 space-y-4">
                <div className="p-6 bg-white/5 rounded-full">
                   <ChefHat size={48} className="opacity-50" />
                </div>
                <p className="font-medium text-gray-600">Waiting for your meal photo...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;