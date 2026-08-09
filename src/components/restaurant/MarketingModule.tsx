import React from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, MessageSquare, Send, Plus } from 'lucide-react';

export const MarketingModule: React.FC = () => {
  const { campaigns } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Marketing & Broadcast Campaigns</h1>
          <p className="text-xs text-slate-500 mt-1">Send SMS alerts, newsletter blasts, and social media announcements.</p>
        </div>
        <button className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 cursor-pointer">
          + Launch Broadcast
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map(cam => (
          <div key={cam.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900 text-sm">{cam.name}</span>
              <span className="px-2.5 py-1 text-[10px] font-bold bg-sky-50 text-sky-800 rounded-full">{cam.channel}</span>
            </div>
            <p className="text-slate-500">Audience: <strong className="text-slate-800">{cam.audience}</strong></p>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 block">Messages Sent</span>
                <span className="font-bold text-slate-900">{cam.sentCount}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Open Rate</span>
                <span className="font-bold text-emerald-600">{cam.openRate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
