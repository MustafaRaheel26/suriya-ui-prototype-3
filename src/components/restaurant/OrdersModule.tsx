import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';
import { Search, Filter, Clock, CheckCircle2, XCircle, ArrowRight, Phone, DollarSign } from 'lucide-react';

export const OrdersModule: React.FC = () => {
  const { orders, updateOrderStatus } = useApp();
  const [statusFilter, setStatusFilter] = useState<'all' | Order['status']>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = orders.filter(o => {
    const matchesSearch = o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.tableNumber && o.tableNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Orders Management</h1>
          <p className="text-xs text-slate-500 mt-1">Track live kitchen tickets, takeaway orders, and status progressions.</p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by order #, customer name, or table..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          />
        </div>

        <div className="flex gap-1 overflow-x-auto pb-1">
          {(['all', 'new', 'preparing', 'plating', 'ready', 'delivered', 'cancelled'] as const).map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-2 text-xs font-medium rounded-xl capitalize whitespace-nowrap cursor-pointer transition-all ${
                statusFilter === st
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Grid + Detail Drawer layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Orders List */}
        <div className={`${selectedOrder ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-3`}>
          {filtered.map(order => (
            <div
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className={`p-4 bg-white rounded-2xl border transition-all cursor-pointer ${
                selectedOrder?.id === order.id ? 'border-sky-500 shadow-md ring-2 ring-sky-100' : 'border-slate-200/80 shadow-2xs hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-sm bg-slate-100 text-slate-900 px-2.5 py-1 rounded-lg">
                    {order.orderNumber}
                  </span>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-xs">{order.customerName}</h4>
                    <p className="text-[11px] text-slate-400">
                      {order.tableNumber || order.type} • {order.createdAt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">${order.total.toFixed(2)}</span>
                  <select
                    value={order.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                    className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer"
                  >
                    <option value="new">New</option>
                    <option value="preparing">Preparing</option>
                    <option value="plating">Plating</option>
                    <option value="ready">Ready</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Items Summary */}
              <div className="pt-2 text-xs text-slate-600 flex flex-wrap gap-2">
                {order.items.map((it, idx) => (
                  <span key={idx} className="bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md text-[11px]">
                    {it.quantity}x {it.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Order Detail Drawer */}
        {selectedOrder && (
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-lg space-y-4 text-xs h-fit sticky top-20">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Order {selectedOrder.orderNumber}</h3>
                <p className="text-slate-400 text-[11px]">{selectedOrder.createdAt} • {selectedOrder.type}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">✕</button>
            </div>

            <div>
              <p className="font-semibold text-slate-700">Customer Details:</p>
              <p className="text-slate-900 font-bold">{selectedOrder.customerName}</p>
              <p className="text-slate-500">{selectedOrder.customerPhone || 'No phone provided'}</p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-slate-700">Ordered Dishes:</p>
              <div className="divide-y divide-slate-100">
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="py-2 flex justify-between">
                    <div>
                      <span className="font-medium text-slate-900">{item.quantity}x {item.name}</span>
                      {item.notes && <p className="text-[10px] text-amber-600 italic">Note: {item.notes}</p>}
                    </div>
                    <span className="font-bold text-slate-800">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1 text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${selectedOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${selectedOrder.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 text-sm pt-1 border-t border-slate-100">
                <span>Total Amount</span>
                <span>${selectedOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
