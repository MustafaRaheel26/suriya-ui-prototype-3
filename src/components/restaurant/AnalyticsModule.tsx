import React from 'react';
import { useApp } from '../../context/AppContext';
import { TrendingUp, DollarSign, Calendar, Clock, BarChart2 } from 'lucide-react';

export const AnalyticsModule: React.FC = () => {
  const { activeRestaurant, orders } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Financial & Sales Analytics</h1>
        <p className="text-xs text-slate-500 mt-1">Deep breakdown of sales volume, peak dining hours, and category gross margins.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-xs text-slate-400 font-medium">Monthly Gross Volume</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">${activeRestaurant.monthlyRevenue.toLocaleString()}</div>
          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 font-bold rounded-full mt-2 inline-block">+18.5% MoM</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-xs text-slate-400 font-medium">Total Orders Executed</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{activeRestaurant.totalOrders.toLocaleString()}</div>
          <span className="text-[10px] text-sky-700 bg-sky-50 px-2 py-0.5 font-bold rounded-full mt-2 inline-block">100% Fulfilled</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-xs text-slate-400 font-medium">Peak Hour Demand</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">07:30 PM - 09:00 PM</div>
          <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 font-bold rounded-full mt-2 inline-block">Fridays & Saturdays</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">Category Revenue Distribution</h3>
        <div className="space-y-3 text-xs">
          {[
            { name: 'Mains & Sea Bass', revenue: '$34,200', pct: '40%' },
            { name: 'Artisanal Pizzas & Pastas', revenue: '$23,100', pct: '28%' },
            { name: 'Appetizers & Burrata', revenue: '$14,800', pct: '18%' },
            { name: 'Botanical Cocktails & Wines', revenue: '$12,150', pct: '14%' }
          ].map((cat, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between font-semibold text-slate-700">
                <span>{cat.name}</span>
                <span>{cat.revenue} ({cat.pct})</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-sky-600 h-2 rounded-full" style={{ width: cat.pct }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
