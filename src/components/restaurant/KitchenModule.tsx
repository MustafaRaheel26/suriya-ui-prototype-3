import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';
import { CookingPot, Clock, CheckCircle2, Volume2, VolumeX, AlertCircle } from 'lucide-react';

export const KitchenModule: React.FC = () => {
  const { orders, updateOrderStatus } = useApp();
  const [soundEnabled, setSoundEnabled] = useState(true);

  const activeKitchenOrders = orders.filter(o => o.status === 'new' || o.status === 'preparing' || o.status === 'plating');

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="flex justify-between items-center bg-slate-900 text-white p-5 rounded-2xl shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
            <CookingPot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Kitchen Display System (KDS)</h1>
            <p className="text-xs text-slate-400">Live ticket queue, stage timers, and line coordination.</p>
          </div>
        </div>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          <span>{soundEnabled ? 'Chime Alert ON' : 'Chime Muted'}</span>
        </button>
      </div>

      {/* Ticket Queue Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Stage 1: New / Pending */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
            <span>● Incoming / New ({orders.filter(o => o.status === 'new').length})</span>
          </div>
          <div className="space-y-3">
            {orders.filter(o => o.status === 'new').map(order => (
              <div key={order.id} className="p-4 bg-amber-50/80 border-2 border-amber-300 rounded-2xl shadow-2xs space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-amber-950">
                  <span>{order.tableNumber || order.type} ({order.orderNumber})</span>
                  <span className="flex items-center gap-1 text-amber-700"><Clock className="w-3.5 h-3.5" /> 3m</span>
                </div>
                <div className="divide-y divide-amber-200/60 text-xs">
                  {order.items.map((it, i) => (
                    <div key={i} className="py-1 flex justify-between font-medium text-amber-900">
                      <span>{it.quantity}x {it.name}</span>
                      {it.notes && <span className="text-[10px] text-amber-700 italic">{it.notes}</span>}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => updateOrderStatus(order.id, 'preparing')}
                  className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Start Preparing →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Stage 2: Cooking / Prep */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2 text-xs font-bold text-sky-700 uppercase tracking-wider">
            <span>● Cooking in Progress ({orders.filter(o => o.status === 'preparing').length})</span>
          </div>
          <div className="space-y-3">
            {orders.filter(o => o.status === 'preparing').map(order => (
              <div key={order.id} className="p-4 bg-sky-50/80 border-2 border-sky-300 rounded-2xl shadow-2xs space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-sky-950">
                  <span>{order.tableNumber || order.type} ({order.orderNumber})</span>
                  <span className="flex items-center gap-1 text-sky-700"><Clock className="w-3.5 h-3.5" /> 12m</span>
                </div>
                <div className="divide-y divide-sky-200/60 text-xs">
                  {order.items.map((it, i) => (
                    <div key={i} className="py-1 flex justify-between font-medium text-sky-900">
                      <span>{it.quantity}x {it.name}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => updateOrderStatus(order.id, 'plating')}
                  className="w-full py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Move to Plating Pass →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Stage 3: Ready / Plated */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <span>● Plated & Pass Ready ({orders.filter(o => o.status === 'plating' || o.status === 'ready').length})</span>
          </div>
          <div className="space-y-3">
            {orders.filter(o => o.status === 'plating' || o.status === 'ready').map(order => (
              <div key={order.id} className="p-4 bg-emerald-50/80 border-2 border-emerald-300 rounded-2xl shadow-2xs space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-emerald-950">
                  <span>{order.tableNumber || order.type} ({order.orderNumber})</span>
                  <span className="flex items-center gap-1 text-emerald-700"><CheckCircle2 className="w-3.5 h-3.5" /> Ready</span>
                </div>
                <div className="divide-y divide-emerald-200/60 text-xs">
                  {order.items.map((it, i) => (
                    <div key={i} className="py-1 flex justify-between font-medium text-emerald-900">
                      <span>{it.quantity}x {it.name}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => updateOrderStatus(order.id, 'delivered')}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Mark Served / Delivered ✓
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
