
import React, { useState, useEffect, useRef } from 'react';
import { createCoachChat } from '../services/geminiService';
import { ChatMessage } from '../types';
import { GenerateContentResponse } from "@google/genai";
import { Send, User, Bot, Loader, Sparkles, MoreHorizontal, MessageSquare } from 'lucide-react';

const CoachChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Namaste! I'm your VOXFIT Coach. Ready to transform? Tell me about your goals, diet, or what you're struggling with today.",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<any>(null);

  useEffect(() => {
    if (!chatSessionRef.current) {
      chatSessionRef.current = createCoachChat();
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Fix: sendMessageStream must take a { message } parameter object
      const result = await chatSessionRef.current.sendMessageStream({ message: userMsg.text });
      let fullResponse = '';
      const botMsgId = (Date.now() + 1).toString();
      
      setMessages(prev => [...prev, {
        id: botMsgId,
        role: 'model',
        text: '',
        timestamp: Date.now()
      }]);

      for await (const chunk of result) {
        // Fix: Explicitly treat chunk as GenerateContentResponse and use .text property
        const c = chunk as GenerateContentResponse;
        fullResponse += c.text;
        setMessages(prev => prev.map(msg => msg.id === botMsgId ? { ...msg, text: fullResponse } : msg));
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "Network issue. Check your connection.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col max-w-5xl mx-auto animate-fade-in pb-4">
      <div className="flex-none mb-6 flex items-center justify-between">
        <div>
           <h1 className="text-4xl font-black text-white tracking tight flex items-center gap-3">
             Concierge Coach <span className="bg-gradient-to-tr from-primary to-accent p-1.5 rounded-lg"><Sparkles className="text-white fill-white" size={16}/></span>
           </h1>
           <p className="text-gray-400 text-sm font-medium mt-1">24/7 AI Guidance & Support</p>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
           <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Online</span>
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl relative border border-white/5 backdrop-blur-2xl">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-hide relative z-10">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-end gap-4 animate-fade-in-up ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-white/10 ${
                msg.role === 'user' ? 'bg-gradient-to-br from-primary to-blue-600 text-white' : 'bg-surface text-secondary'
              }`}>
                {msg.role === 'user' ? <User size={18} /> : <Bot size={20} />}
              </div>
              
              <div className={`max-w-[85%] md:max-w-[70%] rounded-3xl px-7 py-5 shadow-lg backdrop-blur-sm ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-r from-primary/90 to-blue-600/90 text-white rounded-br-none shadow-primary/20 border border-white/10' 
                  : 'bg-white/5 text-gray-200 border border-white/5 rounded-bl-none hover:bg-white/10 transition-colors'
              }`}>
                <p className="whitespace-pre-wrap leading-relaxed text-[15px] font-medium">{msg.text}</p>
                <div className={`text-[10px] mt-2 font-bold uppercase tracking-widest opacity-40 ${msg.role === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                   {msg.role === 'model' ? 'VOXFIT AI' : 'You'}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
             <div className="flex items-end gap-4 animate-fade-in">
              <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-secondary border border-white/10">
                 <Bot size={20} />
              </div>
              <div className="bg-white/5 border border-white/5 rounded-3xl rounded-bl-none px-6 py-5 flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Floating Input Area */}
        <div className="p-6 relative z-20">
          <div className="flex items-center gap-2 relative bg-[#0f1218] rounded-2xl border border-white/10 p-2 focus-within:border-primary/50 transition-all shadow-2xl focus-within:shadow-primary/10 focus-within:ring-1 focus-within:ring-primary/20">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              disabled={isTyping}
              className="w-full bg-transparent text-white rounded-xl pl-4 py-4 outline-none disabled:opacity-50 placeholder:text-gray-600 font-medium text-base"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="p-4 bg-primary hover:bg-blue-600 text-white rounded-xl transition-all disabled:opacity-50 disabled:bg-surface disabled:text-gray-600 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 active:scale-95"
            >
              {isTyping ? <Loader className="animate-spin" size={20} /> : <Send size={20} className="ml-0.5" />}
            </button>
          </div>
          <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-4">
             AI can make mistakes. Always consult a professional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoachChat;
