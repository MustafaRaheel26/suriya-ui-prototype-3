import React from 'react';
import { useApp } from '../../context/AppContext';
import { HeartHandshake, Gift, MessageSquare, Send } from 'lucide-react';

export const CrmModule: React.FC = () => {
  const { customers } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">CRM & Relationship Tracking</h1>
        <p className="text-xs text-slate-500 mt-1">Automate birthday greetings, VIP invitations, and guest follow-up triggers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Gift className="w-4 h-4 text-amber-500" />
            <span>Automated Birthday & Anniversary Triggers</span>
          </h3>
          <p className="text-xs text-slate-500">Sends a personalized $20 dining gift voucher 3 days prior to guest's recorded birthday.</p>
          <div className="pt-2 flex justify-between items-center text-xs">
            <span className="font-semibold text-emerald-700">Trigger Active (98% Delivery Rate)</span>
            <button className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-semibold cursor-pointer">Configure</button>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-sky-500" />
            <span>Post-Dining SMS Sentiment Check</span>
          </h3>
          <p className="text-xs text-slate-500">Sends a polite text 2 hours after check closure asking for dining feedback.</p>
          <div className="pt-2 flex justify-between items-center text-xs">
            <span className="font-semibold text-sky-700">Average Rating 4.9 / 5.0</span>
            <button className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-semibold cursor-pointer">View Feedback</button>
          </div>
        </div>
      </div>
    </div>
  );
};
