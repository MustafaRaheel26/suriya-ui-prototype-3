import React from 'react';
import { useApp } from '../../context/AppContext';
import { TableItem } from '../../types';
import { Users, Clock, CheckCircle2, DollarSign } from 'lucide-react';

export const TablesModule: React.FC = () => {
  const { tables, updateTableStatus } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Floor Plan & Table Status</h1>
          <p className="text-xs text-slate-500 mt-1">Live visual table seating layout across Main Hall, Terrace, and VIP lounges.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables.map(table => (
          <div
            key={table.id}
            className={`p-5 rounded-2xl border transition-all ${
              table.status === 'occupied' ? 'bg-sky-50/80 border-sky-300' :
              table.status === 'reserved' ? 'bg-amber-50/80 border-amber-300' :
              table.status === 'cleaning' ? 'bg-purple-50/80 border-purple-300' :
              'bg-white border-slate-200/80'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">{table.tableNumber}</h3>
                <p className="text-xs text-slate-500">{table.section} • {table.capacity} Seats</p>
              </div>
              <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full ${
                table.status === 'occupied' ? 'bg-sky-600 text-white' :
                table.status === 'reserved' ? 'bg-amber-600 text-white' :
                table.status === 'cleaning' ? 'bg-purple-600 text-white' :
                'bg-emerald-100 text-emerald-800'
              }`}>
                {table.status}
              </span>
            </div>

            {table.status === 'occupied' && (
              <div className="my-3 text-xs font-semibold text-sky-900 border-t border-sky-200/80 pt-2 flex justify-between">
                <span>Active Bill:</span>
                <span>${table.currentBill?.toFixed(2)}</span>
              </div>
            )}

            {table.status === 'reserved' && (
              <div className="my-3 text-xs text-amber-900 border-t border-amber-200/80 pt-2">
                <p className="font-bold">{table.reservedForName}</p>
                <p className="text-[10px] text-amber-700">Reserved for {table.reservedTime}</p>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-200/60 flex gap-2">
              <select
                value={table.status}
                onChange={(e) => updateTableStatus(table.id, e.target.value as TableItem['status'])}
                className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 cursor-pointer"
              >
                <option value="available">Mark Available</option>
                <option value="occupied">Mark Occupied</option>
                <option value="reserved">Mark Reserved</option>
                <option value="cleaning">Mark Cleaning</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
