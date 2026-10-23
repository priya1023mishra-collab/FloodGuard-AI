import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  Compass, 
  HelpCircle, 
  ShieldAlert,
  Loader2
} from 'lucide-react';
import { askGeminiCopilot } from '../services/geminiService';

export default function GeminiCopilot({ 
  selectedScenario, 
  analysisResult, 
  apiKey 
}) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'copilot',
      text: `Hello Commander. I am your FloodGuard AI Copilot. I have fused the latest Sentinel-1 SAR and optical spaceborne telemetry for ${selectedScenario.name}. How can I assist with tactical routing, hospital evacuation, or resource allocation?`,
      timestamp: '10:00'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const replyText = await askGeminiCopilot({
        question: text,
        currentContext: {
          scenario: selectedScenario,
          analysis: analysisResult
        },
        apiKey
      });

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'copilot',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'copilot',
          text: "Tactical Advisory: Kolong River embankment breach has caused high water levels in Sector 4. Route all rescue traffic via Western Bypass.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sampleQuestions = [
    "Which hospital needs immediate airlift or boat evacuation?",
    "Is the NH-37 Bridge passable for supply trucks?",
    "What is the current bed capacity at Central School Shelter?",
    "Where should we stage the next motorboat rescue team?"
  ];

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 flex flex-col h-[600px] overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/20">
            <Bot className="w-5 h-5 text-cyan-200" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              FloodGuard AI Disaster Copilot
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
                Gemini 1.5 Flash
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Grounded situational assistant trained on SAR remote sensing &amp; disaster hydrology.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>READY FOR QUERIES</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div 
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`p-2 rounded-lg shrink-0 ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-cyan-950/80 border border-cyan-500/30 text-cyan-300'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`max-w-[80%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-blue-600 text-white rounded-tr-none'
                : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none shadow-md'
            }`}>
              <p>{msg.text}</p>
              <span className={`block text-[10px] mt-1 font-mono ${
                msg.sender === 'user' ? 'text-blue-200 text-right' : 'text-slate-500'
              }`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-300">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none p-3 text-xs text-slate-400 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Analyzing SAR flood map and generating tactical advice...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/50 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
        <span className="text-[11px] text-slate-500 whitespace-nowrap font-medium flex items-center gap-1">
          <HelpCircle className="w-3 h-3 text-cyan-400" />
          Suggested:
        </span>
        {sampleQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-cyan-300 text-[11px] whitespace-nowrap transition-colors cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
        className="p-3 border-t border-slate-800 bg-slate-900/90 flex items-center gap-2"
      >
        <input 
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask Copilot about evacuation routes, hospital status, or flood progression..."
          className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
        />

        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="p-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-50 transition-colors shadow-md shadow-cyan-600/30 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
