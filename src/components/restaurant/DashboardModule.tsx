import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  DollarSign,
  ShoppingBag,
  Clock,
  TrendingUp,
  Users,
  CookingPot,
  ArrowUpRight,
  Plus,
  Utensils,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const DashboardModule: React.FC = () => {
  const { activeRestaurant, orders, setActiveRestaurantModule, updateOrderStatus } = useApp();

  const totalRevenueToday = orders
    .filter(o => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingKitchenCount = orders.filter(o => o.status === 'preparing' || o.status === 'new').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner / Restaurant Info */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={activeRestaurant.logoUrl}
            alt={activeRestaurant.name}
            className="w-12 h-12 rounded-xl object-cover border border-slate-200"
          />
          <div>
            <h1 className="text-xl font-bold text-slate-900">{activeRestaurant.name}</h1>
            <p className="text-xs text-slate-500 font-medium">
              📍 {activeRestaurant.address}, {activeRestaurant.city} • Rating {activeRestaurant.rating} ★
            </p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveRestaurantModule('POS')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New POS Order</span>
          </button>

          <button
            onClick={() => setActiveRestaurantModule('Kitchen')}
            className="px-4 py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200/80 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <CookingPot className="w-4 h-4 text-teal-600" />
            <span>Open KDS ({pendingKitchenCount})</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-medium">Shift Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">${totalRevenueToday.toFixed(2)}</div>
          <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full w-fit">
            <TrendingUp className="w-3 h-3 text-teal-600" />
            <span>+14.2% vs yesterday</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-medium">Orders Processed</span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{orders.length} orders</div>
          <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full w-fit">
            <span>{orders.filter(o => o.status === 'delivered').length} completed</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-medium">Active Kitchen Queue</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <CookingPot className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{pendingKitchenCount} tickets</div>
          <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full w-fit">
            <Clock className="w-3 h-3" />
            <span>Avg prep time: 14m</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-medium">Table Occupancy</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">68% occupied</div>
          <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full w-fit">
            <span>Main Hall & Patio</span>
          </div>
        </div>

      </div>

      {/* Main Section: Recent Live Orders & Gemini AI Insight Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Live Orders List (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">Recent Live Orders</h3>
            <button
              onClick={() => setActiveRestaurantModule('Orders')}
              className="text-xs font-semibold text-teal-600 hover:text-teal-700 cursor-pointer flex items-center gap-1"
            >
              <span>View All Orders</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {orders.slice(0, 5).map(o => (
              <div key={o.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 font-mono font-bold text-slate-700 flex items-center justify-center text-[11px]">
                    {o.orderNumber}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">
                      {o.customerName} <span className="text-slate-400 font-normal">({o.tableNumber || o.type})</span>
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {o.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-bold text-slate-900">${o.total.toFixed(2)}</div>
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full capitalize mt-0.5 ${
                    o.status === 'preparing' ? 'bg-amber-100 text-amber-800' :
                    o.status === 'ready' ? 'bg-emerald-100 text-emerald-800' :
                    o.status === 'delivered' ? 'bg-slate-100 text-slate-700' : 'bg-sky-100 text-sky-800'
                  }`}>
                    {o.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight Sidebar Card */}
        <div className="bg-gradient-to-br from-teal-50/80 via-white to-teal-50/30 border border-teal-100 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4 text-teal-600 animate-pulse" />
              <span>Gemini AI Copilot Daily Tip</span>
            </div>
            <h4 className="text-base font-bold text-slate-900 leading-snug">
              "High demand detected for Truffle Burrata!"
            </h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Based on historical Sunday evening trends, sea bass orders increase by 35% after 7:00 PM. Recommend prep team pre-portion 12 additional fillets now.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-teal-100/80">
            <button
              onClick={() => setActiveRestaurantModule('AI Assistant')}
              className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-xs shadow-teal-200"
            >
              Open AI Assistant →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
