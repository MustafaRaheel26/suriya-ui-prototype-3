import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Gift, Sparkles, Plus } from 'lucide-react';

export const LoyaltyModule: React.FC = () => {
  const { loyaltyRewards } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Loyalty Rewards Program</h1>
          <p className="text-xs text-slate-500 mt-1">Configure point earning multipliers, tiered perks, and reward redemptions.</p>
        </div>
        <button className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 cursor-pointer">
          + Create Reward Perk
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loyaltyRewards.map(reward => (
          <div key={reward.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full">
                {reward.pointsRequired} Points Required
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">{reward.activeCount} redeemed</span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">{reward.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{reward.description}</p>
            <div className="pt-2 border-t border-slate-100 text-xs font-bold text-emerald-700">
              Value: {reward.discountValue}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
