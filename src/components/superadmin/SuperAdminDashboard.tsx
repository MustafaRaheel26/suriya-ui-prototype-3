import React, { useState } from 'react';
import { useApp, SuperAdminSection } from '../../context/AppContext';
import {
  ShieldCheck,
  Users,
  Building2,
  BarChart3,
  Sliders,
  DollarSign,
  Activity,
  Server,
  Zap,
  Globe,
  Search,
  CheckCircle2,
  Lock,
  RefreshCw,
  Bell
} from 'lucide-react';

export const SuperAdminDashboard: React.FC = () => {
  const {
    activeSuperAdminSection,
    setActiveSuperAdminSection,
    restaurants,
    setMainView,
    setUserRole
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 flex flex-col md:flex-row font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-white p-4 shrink-0">
        <div className="mb-6 px-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            <span className="text-[10px] font-bold text-teal-300 uppercase tracking-widest">Super Admin Console</span>
          </div>
          <h2 className="text-sm font-bold text-slate-100 mt-1">Platform Control Room</h2>
        </div>

        <nav className="space-y-1 text-xs">
          {[
            { id: 'Summary Metrics' as SuperAdminSection, label: 'Summary Metrics', icon: Activity },
            { id: 'Users Management' as SuperAdminSection, label: 'Users & Tenants', icon: Users },
            { id: 'Restaurants Management' as SuperAdminSection, label: 'Global Restaurants', icon: Building2 },
            { id: 'Analytics Panels' as SuperAdminSection, label: 'Platform Infrastructure', icon: Server },
            { id: 'System Settings' as SuperAdminSection, label: 'System Flags & API', icon: Sliders }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeSuperAdminSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSuperAdminSection(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-teal-600 text-white font-semibold shadow-xs shadow-teal-900/50'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-6xl mx-auto w-full">
        
        {/* SECTION 1: SUMMARY METRICS */}
        {activeSuperAdminSection === 'Summary Metrics' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Platform Performance & MRR</h1>
              <p className="text-xs text-slate-500 mt-1">Real-time health, recurring revenues, and active platform metrics.</p>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="text-xs font-medium text-slate-400">Monthly Recurring (MRR)</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">$48,250.00</div>
                <span className="inline-block mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">+24.5% MoM</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="text-xs font-medium text-slate-400">Active Tenant Brands</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">142 Brands</div>
                <span className="inline-block mt-2 text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">380 Locations</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="text-xs font-medium text-slate-400">Global Orders / Month</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">182,400</div>
                <span className="inline-block mt-2 text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">$4.2M Volume</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="text-xs font-medium text-slate-400">Cloud System Health</div>
                <div className="text-2xl font-bold text-emerald-600 mt-1">99.99%</div>
                <span className="inline-block mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Latency 14ms</span>
              </div>
            </div>

            {/* System Status Panel */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Cloud Microservices Status</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <span className="font-semibold text-emerald-900">POS Sync Pipeline</span>
                  <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">Operational</span>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <span className="font-semibold text-emerald-900">Gemini AI Service</span>
                  <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">Operational</span>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <span className="font-semibold text-emerald-900">Stripe Payment Gateway</span>
                  <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">Operational</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: USERS MANAGEMENT */}
        {activeSuperAdminSection === 'Users Management' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Users & SaaS Tenants</h1>
              <p className="text-xs text-slate-500 mt-1">Manage tenant owner accounts, role overrides, and billing status.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs divide-y divide-slate-100 text-xs">
              {[
                { name: 'Antoine Laurent', brand: 'Lumina Coastal Bistro', plan: 'Growth Network', email: 'antoine@luminabistro.com', status: 'Verified' },
                { name: 'Marco Rossi', brand: 'Aether Woodfire Pizza', plan: 'Growth Network', email: 'marco@aetherwoodfire.com', status: 'Verified' },
                { name: 'Kenji Sato', brand: 'Sora Omakase Lounge', plan: 'Enterprise Plan', email: 'kenji@sorasushi.com', status: 'Verified' },
                { name: 'Sarah Jenkins', brand: 'Zenith Organic Cafe', plan: 'Starter Plan', email: 'sarah@zenithcafe.com', status: 'Trial Active' }
              ].map((u, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-900">{u.name}</h4>
                    <p className="text-slate-500 text-[11px]">{u.brand} • {u.plan}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-500 text-[11px] hidden sm:inline">{u.email}</span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full">{u.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: RESTAURANTS MANAGEMENT */}
        {activeSuperAdminSection === 'Restaurants Management' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Global Restaurants Registry</h1>
              <p className="text-xs text-slate-500 mt-1">All registered restaurant locations provisioned on the platform.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {restaurants.map(r => (
                <div key={r.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs text-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <img src={r.logoUrl} alt="" className="w-8 h-8 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-bold text-slate-900">{r.name}</h4>
                      <p className="text-[10px] text-slate-400">{r.city}, {r.country}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex justify-between font-medium text-slate-700">
                    <span>Revenue: ${r.monthlyRevenue.toLocaleString()}</span>
                    <span className="text-emerald-600 font-bold">{r.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: ANALYTICS PANELS */}
        {activeSuperAdminSection === 'Analytics Panels' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Infrastructure & Database Metrics</h1>
              <p className="text-xs text-slate-500 mt-1">Server workloads, API query counts, and cloud response latencies.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <h4 className="font-bold text-slate-900">Database Storage & IOPs</h4>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-2 w-1/4 rounded-full" />
                </div>
                <p className="text-slate-500 text-[11px]">2.4 GB of 100 GB provisioned Firestore/SQL storage used.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <h4 className="font-bold text-slate-900">Gemini AI Token Rate Limits</h4>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-2 w-1/3 rounded-full" />
                </div>
                <p className="text-slate-500 text-[11px]">34,200 tokens used today across 142 active tenants.</p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: SYSTEM SETTINGS */}
        {activeSuperAdminSection === 'System Settings' && (
          <div className="space-y-6 max-w-xl">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">System Feature Flags</h1>
              <p className="text-xs text-slate-500 mt-1">Global platform feature toggles and emergency maintenance switches.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-900 block">Enable Gemini AI Copilot Module</span>
                  <span className="text-slate-500 text-[11px]">Allow restaurant managers to generate menu insights</span>
                </div>
                <input type="checkbox" defaultChecked className="accent-indigo-600 w-4 h-4 cursor-pointer" />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div>
                  <span className="font-semibold text-slate-900 block">Enable Online QR Ordering</span>
                  <span className="text-slate-500 text-[11px]">Allow table customer QR web order checkout</span>
                </div>
                <input type="checkbox" defaultChecked className="accent-indigo-600 w-4 h-4 cursor-pointer" />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div>
                  <span className="font-semibold text-rose-700 block">Platform Maintenance Mode</span>
                  <span className="text-slate-500 text-[11px]">Temporarily pause tenant POS updates</span>
                </div>
                <input type="checkbox" className="accent-rose-600 w-4 h-4 cursor-pointer" />
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
