import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  CookingPot,
  Receipt,
  Bot,
  Globe2,
  TrendingUp,
  Users,
  Shield,
  Star,
  Zap,
  LayoutGrid,
  ChevronRight,
  Play,
  Clock,
  Layers,
  Heart,
  Crown
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setMainView, setUserRole, setActiveRestaurantModule } = useApp();
  const [activePreviewTab, setActivePreviewTab] = useState<'pos' | 'kitchen' | 'owner'>('pos');
  const [locationsCount, setLocationsCount] = useState(3);
  const [avgRevenue, setAvgRevenue] = useState(75000);

  // ROI Calculator formula
  const calculatedSavings = Math.round((locationsCount * avgRevenue * 0.042) + (locationsCount * 3200));

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 selection:bg-teal-100 selection:text-teal-900 font-sans">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        {/* Soft Background Accent Orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-teal-50/60 via-teal-50/20 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Eyebrow Chip */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs text-xs font-semibold text-slate-700 mb-6 animate-in fade-in duration-300">
            <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-slate-500">SaaS 2.0 Sleek Interface</span>
            <span className="text-slate-300">|</span>
            <span className="text-teal-700 flex items-center gap-1">
              Fresh, Elegant & Minimal <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.12]">
            The serene operating system for modern gastronomy.
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Effortlessly run POS, Kitchen KDS, AI menu optimizations, multi-location networks, and digital ordering in one unified, tranquil platform.
          </p>

          {/* Primary CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                setUserRole('manager');
                setMainView('restaurant');
                setActiveRestaurantModule('POS');
              }}
              className="px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-teal-200/80 flex items-center gap-2 cursor-pointer group"
            >
              <span>Explore Live Demo App</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                setUserRole('owner');
                setMainView('owner');
              }}
              className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-xl text-sm border border-slate-200 transition-all shadow-2xs flex items-center gap-2 cursor-pointer"
            >
              <Crown className="w-4 h-4 text-teal-600" />
              <span>Multi-Location Owner View</span>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-slate-500 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>No hardware lock-in</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Instant 2-minute onboarding</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Built-in Gemini AI copilot</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive App Preview Section */}
      <section className="py-12 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-slate-900">Experience the Redesigned Interface</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Switch views below to preview the soft, airy aesthetic in action.</p>
            
            {/* View Switcher Tabs */}
            <div className="mt-5 inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200/80">
              <button
                onClick={() => setActivePreviewTab('pos')}
                className={`px-4 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                  activePreviewTab === 'pos' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Touch POS Screen
              </button>
              <button
                onClick={() => setActivePreviewTab('kitchen')}
                className={`px-4 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                  activePreviewTab === 'kitchen' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Kitchen KDS Display
              </button>
              <button
                onClick={() => setActivePreviewTab('owner')}
                className={`px-4 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                  activePreviewTab === 'owner' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Owner Network Analytics
              </button>
            </div>
          </div>

          {/* Interactive Mock Window */}
          <div className="bg-slate-900 rounded-2xl p-2 sm:p-4 shadow-2xl border border-slate-800 max-w-5xl mx-auto">
            {/* Window Topbar */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 text-xs text-slate-400 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-[11px] text-slate-500">app.aetherresto.io/{activePreviewTab}</span>
              </div>
              <span className="text-[10px] bg-slate-800 text-teal-400 px-2 py-0.5 rounded-full font-mono">LIVE PREVIEW</span>
            </div>

            {/* Preview Content */}
            <div className="bg-slate-50 rounded-xl p-4 sm:p-6 text-slate-800 min-h-[380px]">
              {activePreviewTab === 'pos' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="text-xs font-semibold text-slate-700">POS Menu • Lumina Coastal Bistro</span>
                      <span className="text-xs font-bold text-teal-600">Category: Mains</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                        <div className="text-xs font-bold text-slate-900">Wild-Caught Sea Bass</div>
                        <div className="text-[11px] text-slate-500">$36.00 • 18m prep</div>
                        <span className="inline-block mt-2 text-[9px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">Chef Special</span>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                        <div className="text-xs font-bold text-slate-900">Truffle Tagliatelle</div>
                        <div className="text-[11px] text-slate-500">$28.00 • 12m prep</div>
                        <span className="inline-block mt-2 text-[9px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">Fresh Pasta</span>
                      </div>
                    </div>
                  </div>

                  {/* Cart preview */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900 mb-2 border-b border-slate-100 pb-1">Current Order #104</div>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span>2x Truffle Burrata</span>
                          <span className="font-medium">$39.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>4x Botanical Spritz</span>
                          <span className="font-medium">$64.00</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-2 border-t border-slate-100">
                      <div className="flex justify-between text-xs font-bold text-slate-900 mb-2">
                        <span>Total Due</span>
                        <span>$111.76</span>
                      </div>
                      <button
                        onClick={() => {
                          setUserRole('manager');
                          setMainView('restaurant');
                          setActiveRestaurantModule('POS');
                        }}
                        className="w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        Launch Interactive POS →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activePreviewTab === 'kitchen' && (
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
                    <span className="text-xs font-bold text-slate-800">Kitchen Display (KDS) • 3 Active Tickets</span>
                    <span className="text-[11px] text-rose-600 font-semibold animate-pulse">● Live Kitchen Mode</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-rose-50/80 rounded-xl border border-rose-200">
                      <div className="flex justify-between text-xs font-bold text-rose-900">
                        <span>Table 04 (#101)</span>
                        <span className="text-rose-600">12m ago</span>
                      </div>
                      <p className="text-[11px] text-rose-800 mt-2">2x Pacific Sea Bass</p>
                      <p className="text-[10px] text-rose-600 italic">Note: Extra lemon on side</p>
                      <button className="mt-3 w-full py-1 bg-rose-600 text-white rounded text-[10px] font-bold">Mark Plating</button>
                    </div>

                    <div className="p-3 bg-sky-50/80 rounded-xl border border-sky-200">
                      <div className="flex justify-between text-xs font-bold text-sky-900">
                        <span>Table 08 (#102)</span>
                        <span className="text-sky-600">18m ago</span>
                      </div>
                      <p className="text-[11px] text-sky-800 mt-2">1x Truffle Tagliatelle</p>
                      <p className="text-[11px] text-sky-800">1x A5 Wagyu Carpaccio</p>
                      <button className="mt-3 w-full py-1 bg-sky-600 text-white rounded text-[10px] font-bold">Mark Ready</button>
                    </div>

                    <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200">
                      <div className="flex justify-between text-xs font-bold text-emerald-900">
                        <span>Takeaway (#103)</span>
                        <span className="text-emerald-600">25m ago</span>
                      </div>
                      <p className="text-[11px] text-emerald-800 mt-2">2x Truffle Tagliatelle</p>
                      <button className="mt-3 w-full py-1 bg-emerald-600 text-white rounded text-[10px] font-bold">Ready for Pickup</button>
                    </div>
                  </div>
                </div>
              )}

              {activePreviewTab === 'owner' && (
                <div>
                  <div className="flex justify-between items-center pb-3 mb-4 border-b border-slate-200">
                    <span className="text-xs font-bold text-slate-800">Multi-Location Revenue Stream • 3 Restaurants</span>
                    <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full">+21.4% YoY</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <div className="text-[10px] font-medium text-slate-400">Lumina Coastal Bistro</div>
                      <div className="text-lg font-bold text-slate-900">$84,250</div>
                      <div className="text-[10px] text-emerald-600 font-medium">1,420 Orders</div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <div className="text-[10px] font-medium text-slate-400">Aether Woodfire Pizza</div>
                      <div className="text-lg font-bold text-slate-900">$62,100</div>
                      <div className="text-[10px] text-emerald-600 font-medium">1,180 Orders</div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <div className="text-[10px] font-medium text-slate-400">Sora Omakase Lounge</div>
                      <div className="text-lg font-bold text-slate-900">$112,800</div>
                      <div className="text-[10px] text-emerald-600 font-medium">890 Orders</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setUserRole('owner');
                      setMainView('owner');
                    }}
                    className="w-full py-2 bg-sky-700 text-white text-xs font-medium rounded-xl hover:bg-sky-800 transition-colors cursor-pointer"
                  >
                    Open Owner Multi-Restaurant Dashboard →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Blocks Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-semibold text-slate-900">Crafted for perfection at every table.</h2>
          <p className="text-sm text-slate-500 mt-3">From high-turnover casual dining to fine-dining omakase, AetherResto adapts gracefully to your floor logic.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Receipt className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Touch POS & Smart Tables</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Fast, intuitive order entry with custom modifier groups, split check billing, and real-time visual table statuses.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <CookingPot className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Live Kitchen Display (KDS)</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Eliminate lost paper tickets with color-coded stage timing, dish prep instructions, and instant line synchronization.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">AI Gemini Menu & Inventory</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Automated food cost forecasting, low-stock reorder triggers, and smart AI recommendations for high-margin specials.
            </p>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">Interactive ROI Calculator</span>
          <h2 className="text-2xl font-semibold text-slate-900 mt-1">Estimate your annual profit increase</h2>
          
          <div className="mt-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm text-left grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <label className="text-xs font-semibold text-slate-700 flex justify-between">
                  <span>Number of Locations:</span>
                  <span className="font-bold text-sky-700">{locationsCount} restaurants</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={locationsCount}
                  onChange={(e) => setLocationsCount(Number(e.target.value))}
                  className="w-full mt-2 accent-sky-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 flex justify-between">
                  <span>Average Monthly Sales per Location:</span>
                  <span className="font-bold text-sky-700">${avgRevenue.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="20000"
                  max="250000"
                  step="5000"
                  value={avgRevenue}
                  onChange={(e) => setAvgRevenue(Number(e.target.value))}
                  className="w-full mt-2 accent-sky-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-sky-50/80 p-6 rounded-xl border border-sky-100 text-center">
              <div className="text-xs font-medium text-sky-800">Projected Annual Savings & Lift</div>
              <div className="text-3xl font-extrabold text-sky-900 mt-2">${calculatedSavings.toLocaleString()}</div>
              <p className="text-[11px] text-sky-700 mt-2 leading-relaxed">
                Calculated through food waste reduction, faster table turn times (+14%), and automated staff scheduling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-semibold text-slate-900">Simple, transparent pricing for growing brands</h2>
          <p className="text-sm text-slate-500 mt-2">All plans include standard updates, multi-device support, and 24/7 priority support.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Boutique / Starter</h3>
              <p className="text-xs text-slate-500 mt-1">Single location food trucks or cafes</p>
              <div className="mt-4 text-3xl font-bold text-slate-900">$49 <span className="text-xs font-normal text-slate-400">/mo</span></div>
              <ul className="mt-6 space-y-3 text-xs text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> 1 Restaurant Location</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Touch POS & Table Management</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Digital QR Menu Ordering</li>
              </ul>
            </div>
            <button
              onClick={() => setMainView('auth')}
              className="mt-8 w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs rounded-xl transition-colors cursor-pointer"
            >
              Start Free Trial
            </button>
          </div>

          {/* Growth - Highlighted */}
          <div className="bg-white p-6 rounded-2xl border-2 border-sky-500 shadow-md relative flex flex-col justify-between">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-sky-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
              Most Popular
            </span>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Growth Network</h3>
              <p className="text-xs text-slate-500 mt-1">Up to 5 restaurant locations</p>
              <div className="mt-4 text-3xl font-bold text-slate-900">$129 <span className="text-xs font-normal text-slate-400">/mo</span></div>
              <ul className="mt-6 space-y-3 text-xs text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Up to 5 Locations</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Kitchen KDS & Inventory POs</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Built-in Gemini AI Assistant</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Website Builder & CRM</li>
              </ul>
            </div>
            <button
              onClick={() => {
                setUserRole('owner');
                setMainView('owner');
              }}
              className="mt-8 w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-medium text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Explore Growth Demo
            </button>
          </div>

          {/* Enterprise */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Franchise & Enterprise</h3>
              <p className="text-xs text-slate-500 mt-1">Unlimited locations & custom API integration</p>
              <div className="mt-4 text-3xl font-bold text-slate-900">$299 <span className="text-xs font-normal text-slate-400">/mo</span></div>
              <ul className="mt-6 space-y-3 text-xs text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Unlimited Locations</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Dedicated Account Manager</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Custom ERP & Stripe Connect</li>
              </ul>
            </div>
            <button
              onClick={() => setMainView('auth')}
              className="mt-8 w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs rounded-xl transition-colors cursor-pointer"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-400">
          <p>© 2026 AetherResto SaaS. All rights reserved. Designed with soft minimal serenity.</p>
        </div>
      </footer>
    </div>
  );
};
