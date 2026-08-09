import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bot, Send, Sparkles, TrendingUp, Lightbulb, ChefHat, RefreshCw } from 'lucide-react';

export const AiAssistantModule: React.FC = () => {
  const { aiMessages, sendAiMessage } = useApp();
  const [inputPrompt, setInputPrompt] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;
    sendAiMessage(inputPrompt);
    setInputPrompt('');
  };

  const handleChipClick = (prompt: string) => {
    sendAiMessage(prompt);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 rounded-2xl shadow-md">
        <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center font-bold">
          <Bot className="w-6 h-6 text-sky-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Gemini AI Restaurant Copilot</h1>
          <p className="text-xs text-slate-300">Smart menu optimizations, waste reduction forecasting, and social marketing assistant.</p>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex flex-wrap gap-2 text-xs">
        {[
          "Analyze inventory reorder POs for Fresh Truffle Paste",
          "Suggest high-margin weekend chef specials",
          "Draft an Instagram caption for Happy Hour",
          "Forecast peak dining demand for next Friday"
        ].map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleChipClick(chip)}
            className="px-3 py-1.5 bg-white hover:bg-sky-50 border border-slate-200 text-slate-700 font-medium rounded-xl transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{chip}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages Thread */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 sm:p-6 space-y-4 min-h-[380px] max-h-[500px] overflow-y-auto">
        {aiMessages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 text-xs ${
              msg.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white shrink-0 ${
              msg.sender === 'user' ? 'bg-slate-900' : 'bg-gradient-to-tr from-sky-600 to-teal-500'
            }`}>
              {msg.sender === 'user' ? 'U' : <Bot className="w-4 h-4" />}
            </div>

            <div className={`p-3.5 rounded-2xl max-w-lg leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-slate-900 text-white rounded-tr-none'
                : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/60'
            }`}>
              <div className="flex justify-between items-center mb-1 text-[10px] text-slate-400">
                <span className="font-bold">{msg.sender === 'user' ? 'You' : 'Gemini AI'}</span>
                <span>{msg.timestamp}</span>
              </div>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          placeholder="Ask Gemini AI for menu ideas, cost analysis, or marketing copy..."
          className="flex-1 p-3 bg-white border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
        />
        <button
          type="submit"
          className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
