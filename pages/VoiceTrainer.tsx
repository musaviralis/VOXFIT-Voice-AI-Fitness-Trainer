import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Activity, Zap, Play, Dumbbell, Heart, Wind, AlertCircle, Waves, Pause, SkipForward, Square, CheckCircle2, Volume2 } from 'lucide-react';
import { connectToLiveTrainer } from '../services/geminiService';
import { float32ToInt16, base64ToUint8Array, pcmToAudioBuffer, arrayBufferToBase64 } from '../services/audioUtils';
import { useLanguage } from '../contexts/LanguageContext';

const VoiceTrainer: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const { t, language } = useLanguage();
  const [status, setStatus] = useState(t('voice.status.tap'));
  const [audioLevel, setAudioLevel] = useState(0);
  const [safetyTip, setSafetyTip] = useState('');
  const [lastCommand, setLastCommand] = useState<{ action: string, timestamp: number } | null>(null);

  // Audio Context Refs
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);
  
  // Tracking transcription for complexity analysis
  const currentTranscriptionRef = useRef<string>('');

  useEffect(() => {
    if (!isConnected) {
      setStatus(t('voice.status.tap'));
    }
    const tips = [
      t('safety.stop_if_pain'),
      t('safety.hydrate'),
      t('motivation.consistency'),
      t('motivation.keep_going')
    ];
    setSafetyTip(tips[0]);
    
    const interval = setInterval(() => {
      setSafetyTip(tips[Math.floor(Math.random() * tips.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, [language, t, isConnected]);

  useEffect(() => {
    if (lastCommand) {
      const timer = setTimeout(() => setLastCommand(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [lastCommand]);

  const calculateSpeechRate = (text: string): number => {
    if (!text) return 1.0;
    const formKeywords = ['chest', 'heels', 'back', 'form', 'breath', 'slow', 'shoulder', 'straight', 'hips', 'posture'];
    const lowercase = text.toLowerCase();
    const hasFormGuidance = formKeywords.some(kw => lowercase.includes(kw));
    const isShortCommand = text.length < 30 && !hasFormGuidance;
    if (isShortCommand) return 1.1; 
    if (hasFormGuidance || text.length > 50) return 0.95; 
    return 1.0;
  };

  const startSession = async () => {
    setStatus(t('voice.status.connecting'));
    currentTranscriptionRef.current = '';
    
    inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = connectToLiveTrainer(language, {
        onOpen: () => {
          setStatus(t('voice.status.listening'));
          setIsConnected(true);

          if (inputAudioContextRef.current) {
            const source = inputAudioContextRef.current.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              let sum = 0;
              for(let i=0; i<inputData.length; i++) sum += inputData[i] * inputData[i];
              const rms = Math.sqrt(sum / inputData.length);
              setAudioLevel(rms * 10); 

              const pcmInt16 = float32ToInt16(inputData);
              const base64Data = arrayBufferToBase64(pcmInt16.buffer);

              sessionPromise.then(session => {
                session.sendRealtimeInput({
                  media: { mimeType: 'audio/pcm;rate=16000', data: base64Data }
                });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContextRef.current.destination);
          }
        },
        onMessage: async (message) => {
           if (message.serverContent?.outputTranscription) {
              currentTranscriptionRef.current += message.serverContent.outputTranscription.text;
           }

           const modelTurn = message.serverContent?.modelTurn;
           if (modelTurn?.parts?.[0]?.inlineData?.data) {
             const base64Audio = modelTurn.parts[0].inlineData.data;
             const pcmData = base64ToUint8Array(base64Audio);
             
             if (outputAudioContextRef.current) {
               setStatus(t('voice.status.speaking'));
               const audioBuffer = pcmToAudioBuffer(pcmData, outputAudioContextRef.current);
               const source = outputAudioContextRef.current.createBufferSource();
               const rate = calculateSpeechRate(currentTranscriptionRef.current);
               source.playbackRate.value = rate;
               source.buffer = audioBuffer;
               source.connect(outputAudioContextRef.current.destination);
               source.onended = () => setStatus(t('voice.status.listening'));
               
               const currentTime = outputAudioContextRef.current.currentTime;
               const startTime = Math.max(currentTime, nextStartTimeRef.current);
               source.start(startTime);
               nextStartTimeRef.current = startTime + audioBuffer.duration / rate;
             }
           }

           if (message.serverContent?.turnComplete) {
              currentTranscriptionRef.current = '';
           }

           if (message.toolCall) {
              for (const fc of message.toolCall.functionCalls) {
                if (fc.name === 'controlWorkout') {
                  const action = fc.args.action;
                  setLastCommand({ action, timestamp: Date.now() });
                  
                  sessionPromise.then(session => {
                    session.sendToolResponse({
                      functionResponses: {
                        id: fc.id,
                        name: fc.name,
                        response: { result: 'ok' }
                      }
                    });
                  });
                }
              }
           }

           if (message.serverContent?.interrupted) {
              nextStartTimeRef.current = 0;
           }
        },
        onClose: () => disconnect(),
        onError: (err) => {
          console.error(err);
          setStatus(t('voice.status.error'));
          disconnect();
        }
      });
    } catch (error) {
      console.error(error);
      setStatus(t('status.no_internet'));
      disconnect();
    }
  };

  const disconnect = () => {
    setIsConnected(false);
    setStatus(t('voice.status.tap'));
    setLastCommand(null);
    currentTranscriptionRef.current = '';
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    inputAudioContextRef.current?.close();
    outputAudioContextRef.current?.close();
    nextStartTimeRef.current = 0;
  };

  useEffect(() => { return () => disconnect(); }, []);

  const ProtocolCard: React.FC<{ title: string; subtitle: string; icon: React.ReactNode; color: string }> = ({ title, subtitle, icon, color }) => (
    <div className="glass-card p-6 rounded-2xl flex items-center space-x-5 transition-all cursor-pointer group hover:bg-white/5 border border-white/5">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-100 group-hover:scale-110 transition-transform`}>
        {/* Fix: use any for props during cloneElement to satisfy compiler */}
        {React.cloneElement(icon as React.ReactElement<any>, { className: `${color}`, size: 24 })}
      </div>
      <div>
        <h3 className="font-bold text-white text-base">{title}</h3>
        <p className="text-gray-500 text-xs font-medium tracking-wide">{subtitle}</p>
      </div>
      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
        <Play size={16} className="text-gray-400" />
      </div>
    </div>
  );

  const getCommandFeedback = (action: string) => {
    switch(action) {
      case 'next_set': return { icon: <SkipForward size={24} />, text: 'Command: Next Set', color: 'bg-primary' };
      case 'next_exercise': return { icon: <Dumbbell size={24} />, text: 'Command: Next Exercise', color: 'bg-accent' };
      case 'pause': return { icon: <Pause size={24} />, text: 'Command: Paused', color: 'bg-amber-500' };
      case 'resume': return { icon: <Play size={24} />, text: 'Command: Resumed', color: 'bg-secondary' };
      case 'finish': return { icon: <Square size={24} />, text: 'Command: Finished', color: 'bg-red-500' };
      default: return { icon: <Activity size={24} />, text: 'Voice Command Detected', color: 'bg-gray-500' };
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-140px)] animate-fade-in relative max-w-5xl mx-auto py-8">
      
      {/* Dynamic Aura Background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
           <div 
             className={`w-[700px] h-[700px] rounded-full blur-[180px] transition-all duration-700 ease-out ${isConnected ? 'bg-primary/30' : 'bg-transparent'}`}
             style={{ transform: `scale(${1 + audioLevel * 0.5})`, opacity: isConnected ? 0.3 + (audioLevel * 0.4) : 0 }}
           ></div>
      </div>

      {/* Header HUD */}
      <div className="text-center z-10 w-full px-4 mb-10 space-y-6">
        <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">VOX_SESSION</h1>
        
        <div className="flex flex-col items-center gap-6">
           {/* Connection Pill */}
           <div className={`inline-flex items-center space-x-4 px-6 py-2.5 rounded-full border backdrop-blur-xl transition-all duration-500 ${
             isConnected ? 'bg-primary/20 border-primary/40 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-surface border-white/10'
           }`}>
             <div className="relative">
                <span className={`block w-3 h-3 rounded-full ${isConnected ? 'bg-cyan' : 'bg-gray-600'}`}></span>
                {isConnected && <span className="absolute inset-0 rounded-full bg-cyan animate-ping opacity-75"></span>}
             </div>
             <span className={`text-[11px] font-black uppercase tracking-[0.2em] ${isConnected ? 'text-white' : 'text-gray-500'}`}>
               {status}
             </span>
           </div>
           
           {/* Voice Command Overlay - High Prominence */}
           {lastCommand && (
             <div className={`flex items-center space-x-4 px-8 py-5 rounded-[2rem] animate-fade-in-up shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/20 ${getCommandFeedback(lastCommand.action).color} text-white`}>
                <div className="p-3 bg-white/20 rounded-2xl">
                   {getCommandFeedback(lastCommand.action).icon}
                </div>
                <div className="text-left">
                   <p className="font-black uppercase tracking-widest text-lg leading-tight">{getCommandFeedback(lastCommand.action).text}</p>
                   <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest mt-1 flex items-center gap-1">
                      <Volume2 size={10} /> Voice Confirmed
                   </p>
                </div>
                <CheckCircle2 size={32} className="ml-4 opacity-50" />
             </div>
           )}

           {/* Hands-free tip */}
           {!lastCommand && isConnected && (
             <div className="flex items-center gap-3 text-cyan text-[10px] font-black uppercase tracking-[0.2em] animate-pulse bg-cyan/10 px-6 py-2 rounded-full border border-cyan/20">
               <Mic size={14} /> Hands-free Active: Say "Next Set" or "Pause"
             </div>
           )}
           
           {!lastCommand && !isConnected && (
            <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest animate-fade-in bg-white/5 px-4 py-2 rounded-lg border border-white/5">
              <AlertCircle size={12} className="text-accent" />
              <span>{safetyTip}</span>
            </div>
           )}
        </div>
      </div>

      {/* Primary Interaction Interaction */}
      <div className="w-full flex-1 flex flex-col items-center justify-center z-10 space-y-20">
        
        {/* The VOX Orb */}
        <button
          onClick={isConnected ? disconnect : startSession}
          className="relative group focus:outline-none"
        >
          <div className={`absolute inset-0 rounded-full blur-[60px] transition-all duration-700 ${
            isConnected ? 'bg-primary/50 scale-150' : 'bg-transparent scale-100'
          }`}></div>

          <div className={`relative w-56 h-56 rounded-full flex items-center justify-center transition-all duration-500 border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] ${
            isConnected 
              ? 'bg-gradient-vox scale-110 border-white/30' 
              : 'bg-gradient-to-b from-surface to-black hover:scale-105 group-hover:border-primary/50'
          }`}>
             {isConnected ? (
                <div className="flex flex-col items-center animate-fade-in">
                   <Waves size={64} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-pulse" />
                   <span className="text-white/80 font-black text-[10px] tracking-[0.3em] uppercase mt-4">Streaming_Active</span>
                </div>
             ) : (
                <div className="flex flex-col items-center">
                   <div className="p-6 bg-white/5 rounded-full mb-4 group-hover:bg-primary/10 transition-colors">
                      <Mic size={56} className="text-white drop-shadow-lg group-hover:text-cyan transition-colors" />
                   </div>
                   <span className="text-gray-500 font-black text-[10px] tracking-[0.3em] uppercase group-hover:text-white transition-colors">Deploy_VOX</span>
                </div>
             )}
          </div>
          
          {/* Audio Visualization Ring */}
          {isConnected && (
            <div 
              className="absolute inset-0 border-4 border-cyan/40 rounded-full opacity-50"
              style={{ transform: `scale(${1.2 + audioLevel * 0.2})`, transition: 'transform 0.1s ease-out' }}
            ></div>
          )}
        </button>

        {/* Protocols Dashboard */}
        <div className={`w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ${
          isConnected ? 'opacity-10 pointer-events-none blur-md scale-95' : 'opacity-100 scale-100'
        }`}>
          <ProtocolCard title={t('voice.protocols.warmup')} subtitle={t('guidance.get_ready')} icon={<Zap />} color="text-yellow-500" />
          <ProtocolCard title={t('voice.protocols.squats')} subtitle={t('actions.start_workout')} icon={<Dumbbell />} color="text-primary" />
          <ProtocolCard title={t('voice.protocols.cardio')} subtitle={t('motivation.keep_going')} icon={<Heart />} color="text-red-500" />
          <ProtocolCard title={t('voice.protocols.bench')} subtitle={t('guidance.breathe')} icon={<Dumbbell />} color="text-accent" />
          <ProtocolCard title="Push Ups" subtitle="Start Workout" icon={<Activity />} color="text-secondary" />
          <ProtocolCard title={t('voice.protocols.cooldown')} subtitle={t('guidance.rest')} icon={<Wind />} color="text-cyan-500" />
        </div>
      </div>
      
      {/* Footer Meta */}
      <div className="z-10 pt-10 opacity-30 flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.5em] text-gray-500">
         <span>Signal_Encryption: AES_256</span>
         <span className="w-1 h-1 rounded-full bg-gray-800"></span>
         <span>Live_Bypassing_Neural_Inhibitors</span>
      </div>
    </div>
  );
};

export default VoiceTrainer;