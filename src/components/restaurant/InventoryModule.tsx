import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertCircle, CheckCircle2, RefreshCw, ShoppingCart } from 'lucide-react';

export const InventoryModule: React.FC = () => {
  const { inventory, updateInventoryQuantity } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Stock & Inventory Management</h1>
          <p className="text-xs text-slate-500 mt-1">Track ingredient levels, low-stock threshold triggers, and supplier costs.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
            <tr>
              <th className="p-3.5">Ingredient Name</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">Current Stock</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Unit Cost</th>
              <th className="p-3.5">Supplier</th>
              <th className="p-3.5 text-right">Quick Restock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {inventory.map(item => (
              <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="p-3.5 font-bold text-slate-900">{item.name}</td>
                <td className="p-3.5 text-slate-500">{item.category}</td>
                <td className="p-3.5 font-bold">
                  {item.quantity} {item.unit}
                </td>
                <td className="p-3.5">
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                    item.status === 'in-stock' ? 'bg-emerald-50 text-emerald-700' :
                    item.status === 'low-stock' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-3.5">${item.unitCost.toFixed(2)} / {item.unit}</td>
                <td className="p-3.5 text-slate-500">{item.supplier}</td>
                <td className="p-3.5 text-right">
                  <button
                    onClick={() => updateInventoryQuantity(item.id, item.quantity + 10)}
                    className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    + Add 10 {item.unit}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
