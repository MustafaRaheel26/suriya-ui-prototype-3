import React from 'react';
import { useApp } from '../../context/AppContext';
import { Tag, Plus, CheckCircle2 } from 'lucide-react';

export const PromotionsModule: React.FC = () => {
  const { promotions } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Promotions & Discount Codes</h1>
          <p className="text-xs text-slate-500 mt-1">Manage promo codes, happy hour pricing rules, and flash campaigns.</p>
        </div>
        <button className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 cursor-pointer">
          + Create Promo Code
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
            <tr>
              <th className="p-3.5">Promo Code</th>
              <th className="p-3.5">Campaign Title</th>
              <th className="p-3.5">Discount Value</th>
              <th className="p-3.5">Validity Dates</th>
              <th className="p-3.5">Redemptions</th>
              <th className="p-3.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {promotions.map(p => (
              <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="p-3.5 font-mono font-bold text-sky-800">{p.code}</td>
                <td className="p-3.5 font-semibold text-slate-900">{p.title}</td>
                <td className="p-3.5 font-bold text-emerald-700">
                  {p.discountType === 'percentage' ? `${p.discountValue}% Off` : `$${p.discountValue} Off`}
                </td>
                <td className="p-3.5 text-slate-500">{p.startDate} to {p.endDate}</td>
                <td className="p-3.5 font-bold">{p.usageCount} times</td>
                <td className="p-3.5">
                  <span className="px-2.5 py-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded-full capitalize">
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
