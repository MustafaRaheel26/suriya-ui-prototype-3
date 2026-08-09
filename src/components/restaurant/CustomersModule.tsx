import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Star, Award, Heart } from 'lucide-react';

export const CustomersModule: React.FC = () => {
  const { customers } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Customer Directory</h1>
        <p className="text-xs text-slate-500 mt-1">Diner visit frequencies, total spend, loyalty points, and dietary notes.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
            <tr>
              <th className="p-3.5">Customer Name</th>
              <th className="p-3.5">Tier</th>
              <th className="p-3.5">Visits</th>
              <th className="p-3.5">Total Spent</th>
              <th className="p-3.5">Points</th>
              <th className="p-3.5">Dietary Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {customers.map(c => (
              <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="p-3.5 font-bold text-slate-900">
                  {c.name}
                  <span className="block text-[10px] text-slate-400 font-normal">{c.email}</span>
                </td>
                <td className="p-3.5">
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                    c.tier === 'Platinum' ? 'bg-purple-100 text-purple-800' :
                    c.tier === 'Gold' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {c.tier}
                  </span>
                </td>
                <td className="p-3.5 font-bold">{c.totalVisits} visits</td>
                <td className="p-3.5 font-bold text-emerald-700">${c.totalSpent.toFixed(2)}</td>
                <td className="p-3.5 font-bold text-sky-700">{c.loyaltyPoints} pts</td>
                <td className="p-3.5 text-slate-500 italic">{c.notes || 'None recorded'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
