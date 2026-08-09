import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, CheckCircle2 } from 'lucide-react';

export const SettingsModule: React.FC = () => {
  const { activeRestaurant } = useApp();
  const [taxRate, setTaxRate] = useState(activeRestaurant.taxRate);
  const [currency, setCurrency] = useState(activeRestaurant.currency);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Restaurant Configuration</h1>
        <p className="text-xs text-slate-500 mt-1">Configure sales tax rates, default currency, and POS receipt headers.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Restaurant Legal Name</label>
          <input
            type="text"
            defaultValue={activeRestaurant.name}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Sales Tax Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Default Currency Symbol</label>
            <input
              type="text"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Receipt Footer Note</label>
          <input
            type="text"
            defaultValue="Thank you for dining at Lumina Coastal Bistro! Visit luminabistro.com"
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
          />
        </div>

        {saved ? (
          <div className="p-2.5 bg-emerald-50 text-emerald-800 font-bold rounded-xl flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings Saved Successfully!</span>
          </div>
        ) : (
          <button
            type="submit"
            className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 cursor-pointer shadow-xs"
          >
            Save Restaurant Preferences
          </button>
        )}
      </form>
    </div>
  );
};
