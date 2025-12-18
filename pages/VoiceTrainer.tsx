import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Activity, Zap, Play, Dumbbell, Heart, Wind, AlertCircle, Waves, Pause, SkipForward, Square } from 'lucide-react';
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

  // Update status when language changes if not connected
  useEffect(() => {
    if (!isConnected) {
      setStatus(t('voice.status.tap'));
    }
    // Rotate safety tips
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

  // Clear command feedback after 3 seconds
  useEffect(() => {
    if (lastCommand) {
      const timer = setTimeout(() => setLastCommand(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [lastCommand]);

  const calculateSpeechRate = (text: string): number => {
    if (!text) return 1.0;
    
    // Heuristics for "complexity"
    // 1. Technical/Form Keywords warrant slower speech
    const formKeywords = ['chest', 'heels', 'back', 'form', 'breath', 'slow', 'shoulder', 'straight', 'hips', 'form', 'posture'];
    const lowercase = text.toLowerCase();
    const hasFormGuidance = formKeywords.some(kw => lowercase.includes(kw));
    
    // 2. Length of instruction
    // Short prompts (< 30 chars) are usually commands like "Next set" or "Paused"
    const isShortCommand = text.length < 30 && !hasFormGuidance;

    if (isShortCommand) return 1.15; // 15% faster for snappy commands
    if (hasFormGuidance || text.length > 50) return 0.92; // ~8% slower for clarity during form cues
    
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
           // Handle Transcription for rate logic
           if (message.serverContent?.outputTranscription) {
              currentTranscriptionRef.current += message.serverContent.outputTranscription.text;
           }

           // Handle Audio
           const modelTurn = message.serverContent?.modelTurn;
           if (modelTurn?.parts?.[0]?.inlineData?.data) {
             const base64Audio = modelTurn.parts[0].inlineData.data;
             const pcmData = base64ToUint8Array(base64Audio);
             
             if (outputAudioContextRef.current) {
               setStatus(t('voice.status.speaking'));
               const audioBuffer = pcmToAudioBuffer(pcmData, outputAudioContextRef.current);
               const source = outputAudioContextRef.current.createBufferSource();
               
               // Dynamic Rate Adjustment Logic
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

           // Turn Management
           if (message.serverContent?.turnComplete) {
              currentTranscriptionRef.current = '';
           }

           // Handle Tool Calls (Voice Commands)
           if (message.toolCall) {
              const responses = message.toolCall.functionCalls.map((fc: any) => {
                if (fc.name === 'controlWorkout') {
                  const action = fc.args.action;
                  setLastCommand({ action, timestamp: Date.now() });
                  
                  return {
                    id: fc.id,
                    name: fc.name,
                    response: { result: 'ok' }
                  };
                }
                return { id: fc.id, name: fc.name, response: { result: 'unknown tool' } };
              });

              sessionPromise.then(session => {
                session.sendToolResponse({ functionResponses: responses });
              });
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
    <div className="glass-card p-6 rounded-2xl flex items-center space-x-5 transition-all cursor-pointer group hover:bg-white/5">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-100 group-hover:scale-110 transition-transform`}>
        {React.cloneElement(icon as React.ReactElement, { className: `${color}`, size: 24 })}
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
      case 'next_set': return { icon: <SkipForward size={20} />, text: 'Next Set', color: 'bg-primary' };
      case 'next_exercise': return { icon: <Dumbbell size={20} />, text: 'Next Exercise', color: 'bg-accent' };
      case 'pause': return { icon: <Pause size={20} />, text: 'Paused', color: 'bg-yellow-500' };
      case 'resume': return { icon: <Play size={20} />, text: 'Resumed', color: 'bg-green-500' };
      case 'finish': return { icon: <Square size={20} />, text: 'Finished', color: 'bg-red-500' };
      default: return { icon: <Activity size={20} />, text: 'Command', color: 'bg-gray-500' };
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-140px)] animate-fade-in relative max-w-5xl mx-auto py-8">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
           <div 
             className={`w-[600px] h-[600px] rounded-full blur-[150px] transition-all duration-700 ease-out ${isConnected ? 'bg-primary/20' : 'bg-transparent'}`}
             style={{ transform: `scale(${1 + audioLevel})`, opacity: isConnected ? 0.4 + (audioLevel * 0.3) : 0 }}
           ></div>
      </div>

      {/* Header */}
      <div className="text-center z-10 w-full px-4 mb-10">
        <h1 className="text-5xl font-black text-white mb-4 tracking-tighter">{t('voice.title')}</h1>
        
        <div className="flex flex-col items-center gap-4">
           {/* Status Pill */}
           <div className={`inline-flex items-center space-x-3 px-5 py-2 rounded-full border backdrop-blur-md transition-all duration-500 ${
             isConnected ? 'bg-primary/10 border-primary/30' : 'bg-surface border-white/10'
           }`}>
             <div className="relative">
                <span className={`block w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-primary' : 'bg-gray-500'}`}></span>
                {isConnected && <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75"></span>}
             </div>
             <span className={`text-xs font-bold uppercase tracking-[0.15em] ${isConnected ? 'text-white' : 'text-gray-400'}`}>
               {status}
             </span>
           </div>
           
           {/* Command Feedback Overlay */}
           {lastCommand && (
             <div className={`flex items-center space-x-2 px-6 py-3 rounded-xl animate-fade-in-up shadow-2xl ${getCommandFeedback(lastCommand.action).color} text-white`}>
                {getCommandFeedback(lastCommand.action).icon}
                <span className="font-bold uppercase tracking-wider text-sm">{getCommandFeedback(lastCommand.action).text}</span>
             </div>
           )}

           {/* Dynamic Tip (Hide when command feedback is visible for cleaner UI) */}
           {!lastCommand && (
            <div className="flex items-center gap-2 text-gray-400 text-xs font-medium animate-fade-in bg-black/40 px-4 py-2 rounded-lg border border-white/5">
              {isConnected ? <Zap size={12} className="text-yellow-500" /> : <AlertCircle size={12} className="text-accent" />}
              <span>{safetyTip}</span>
            </div>
           )}
        </div>
      </div>

      {/* Main Interaction Area */}
      <div className="w-full flex-1 flex flex-col items-center justify-center z-10 space-y-16">
        
        {/* Central Orb Button */}
        <button
          onClick={isConnected ? disconnect : startSession}
          className="relative group focus:outline-none"
        >
          {/* Outer Glow Ring */}
          <div className={`absolute inset-0 rounded-full blur-2xl transition-all duration-700 ${
            isConnected ? 'bg-primary/40 scale-125' : 'bg-transparent scale-100'
          }`}></div>

          <div className={`relative w-48 h-48 rounded-full flex items-center justify-center transition-all duration-500 border border-white/10 shadow-2xl ${
            isConnected 
              ? 'bg-gradient-to-b from-red-500 to-red-600 scale-110' 
              : 'bg-gradient-to-b from-surface to-black hover:scale-105 group-hover:border-primary/50'
          }`}>
             {isConnected ? (
                <div className="flex flex-col items-center animate-fade-in">
                   <Waves size={48} className="text-white drop-shadow-md animate-pulse" />
                </div>
             ) : (
                <div className="flex flex-col items-center">
                   <Mic size={48} className="text-white drop-shadow-md mb-3 group-hover:text-primary transition-colors" />
                   <span className="text-gray-400 font-bold text-xs tracking-widest uppercase group-hover:text-white transition-colors">{t('voice_prompts.speak_now')}</span>
                </div>
             )}
          </div>
        </button>

        {/* Protocols Grid */}
        <div className={`w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-700 ${
          isConnected ? 'opacity-20 pointer-events-none blur-sm scale-95' : 'opacity-100 scale-100'
        }`}>
          <ProtocolCard title={t('voice.protocols.warmup')} subtitle={t('guidance.get_ready')} icon={<Zap />} color="text-yellow-500" />
          <ProtocolCard title={t('voice.protocols.squats')} subtitle={t('actions.start_workout')} icon={<Dumbbell />} color="text-primary" />
          <ProtocolCard title={t('voice.protocols.cardio')} subtitle={t('motivation.keep_going')} icon={<Heart />} color="text-red-500" />
          <ProtocolCard title={t('voice.protocols.bench')} subtitle={t('guidance.breathe')} icon={<Dumbbell />} color="text-accent" />
          <ProtocolCard title="Push Ups" subtitle="Start Workout" icon={<Activity />} color="text-secondary" />
          <ProtocolCard title={t('voice.protocols.cooldown')} subtitle={t('guidance.rest')} icon={<Wind />} color="text-cyan-500" />
        </div>
      </div>
    </div>
  );
};

export default VoiceTrainer;