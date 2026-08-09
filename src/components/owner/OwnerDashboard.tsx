import React, { useState } from 'react';
import { useApp, OwnerSection } from '../../context/AppContext';
import { Restaurant } from '../../types';
import {
  Building2,
  TrendingUp,
  CreditCard,
  Users,
  Settings,
  Bell,
  HelpCircle,
  Plus,
  Search,
  Filter,
  DollarSign,
  ShoppingBag,
  Star,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
  ChevronRight,
  Shield,
  Send,
  Download
} from 'lucide-react';

export const OwnerDashboard: React.FC = () => {
  const {
    activeOwnerSection,
    setActiveOwnerSection,
    restaurants,
    addRestaurant,
    updateRestaurantStatus,
    setActiveRestaurantId,
    setMainView,
    setUserRole,
    notifications,
    markNotificationRead,
    markAllNotificationsRead
  } = useApp();

  // Search & Filters for My Restaurants
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'busy' | 'closed'>('all');

  // Modal State for Add Restaurant
  const [showAddModal, setShowAddModal] = useState(false);
  const [formName, setFormName] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formCountry, setFormCountry] = useState('United States');
  const [formZip, setFormZip] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formLogo, setFormLogo] = useState('');

  // Support Ticket state
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMsg, setTicketMsg] = useState('');
  const [ticketSent, setTicketSent] = useState(false);

  // Filtered restaurants
  const filteredRestaurants = restaurants.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || r.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateRestaurantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return;

    addRestaurant({
      name: formName,
      tagline: formTagline || 'Artisanal Dining Experience',
      address: formAddress || '123 Gourmet Way',
      city: formCity || 'San Francisco',
      country: formCountry,
      zip: formZip || '94103',
      phone: formPhone || '+1 (415) 555-0199',
      email: formEmail || `contact@${formName.toLowerCase().replace(/\s+/g, '')}.com`,
      logoUrl: formLogo || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80',
      status: 'active',
      currency: '$',
      taxRate: 8.5
    });

    setShowAddModal(false);
    // Reset form
    setFormName('');
    setFormTagline('');
    setFormAddress('');
    setFormCity('');
    setFormZip('');
    setFormPhone('');
    setFormEmail('');
    setFormLogo('');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 flex flex-col md:flex-row font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-4 shrink-0">
        <div className="mb-6 px-2">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Multi-Location Network</div>
          <h2 className="text-sm font-bold text-slate-900 mt-0.5">Owner Control Hub</h2>
        </div>

        <nav className="space-y-1 text-xs">
          {[
            { id: 'My Restaurants' as OwnerSection, label: 'My Restaurants', icon: Building2, count: restaurants.length },
            { id: 'Network Analytics' as OwnerSection, label: 'Network Analytics', icon: TrendingUp },
            { id: 'Billing & Subscription' as OwnerSection, label: 'Billing & Subscription', icon: CreditCard },
            { id: 'Team Members' as OwnerSection, label: 'Team Members', icon: Users },
            { id: 'Account Settings' as OwnerSection, label: 'Account Settings', icon: Settings },
            { id: 'Notifications' as OwnerSection, label: 'Notifications', icon: Bell, count: notifications.filter(n => !n.isRead).length },
            { id: 'Support' as OwnerSection, label: 'Support & Help', icon: HelpCircle }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeOwnerSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveOwnerSection(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-teal-50 text-teal-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content View Area */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-6xl mx-auto w-full">
        
        {/* SECTION 1: MY RESTAURANTS */}
        {activeOwnerSection === 'My Restaurants' && (
          <div className="space-y-6">
            
            {/* Header + Add Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">My Restaurants</h1>
                <p className="text-xs text-slate-500 mt-1">Manage, monitor, and configure all active dining locations in your network.</p>
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add Restaurant Location</span>
              </button>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search restaurants by name or city..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>

              <div className="flex gap-2">
                {(['all', 'active', 'busy', 'closed'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-2 text-xs font-medium rounded-xl capitalize transition-all cursor-pointer ${
                      statusFilter === status
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Restaurant Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Cover / Header Banner */}
                    <div className="h-28 relative overflow-hidden bg-slate-100">
                      {restaurant.coverUrl ? (
                        <img src={restaurant.coverUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-sky-500 to-teal-500" />
                      )}
                      <span className={`absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full backdrop-blur-md shadow-xs ${
                        restaurant.status === 'active' ? 'bg-emerald-500/90 text-white' :
                        restaurant.status === 'busy' ? 'bg-amber-500/90 text-white' : 'bg-slate-700/90 text-white'
                      }`}>
                        {restaurant.status}
                      </span>
                    </div>

                    {/* Logo & Content Info */}
                    <div className="p-5 pt-0 relative">
                      <img
                        src={restaurant.logoUrl}
                        alt={restaurant.name}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md -mt-7 mb-3 bg-white"
                      />

                      <h3 className="text-base font-semibold text-slate-900 leading-snug">{restaurant.name}</h3>
                      <p className="text-xs text-slate-500 italic mt-0.5 line-clamp-1">{restaurant.tagline}</p>
                      
                      <p className="text-xs text-slate-600 mt-2 font-medium">
                        📍 {restaurant.address}, {restaurant.city}
                      </p>

                      {/* Key Restaurant Metrics */}
                      <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-slate-50 p-2 rounded-xl">
                          <span className="text-[10px] text-slate-400 block font-medium">Monthly Revenue</span>
                          <span className="text-sm font-bold text-slate-900">${restaurant.monthlyRevenue.toLocaleString()}</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-xl">
                          <span className="text-[10px] text-slate-400 block font-medium">Monthly Orders</span>
                          <span className="text-sm font-bold text-slate-900">{restaurant.totalOrders.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        setActiveRestaurantId(restaurant.id);
                        setUserRole('manager');
                        setMainView('restaurant');
                      }}
                      className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <span>Open Modules</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <select
                      value={restaurant.status}
                      onChange={(e) => updateRestaurantStatus(restaurant.id, e.target.value as Restaurant['status'])}
                      className="px-2 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 cursor-pointer focus:outline-none"
                    >
                      <option value="active">Active</option>
                      <option value="busy">Busy</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: NETWORK ANALYTICS */}
        {activeOwnerSection === 'Network Analytics' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Network Analytics</h1>
              <p className="text-xs text-slate-500 mt-1">Aggregated financial performance across all restaurant locations.</p>
            </div>

            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="text-xs font-medium text-slate-400">Total Network Revenue</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">$259,150.00</div>
                <span className="inline-block mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">+18.4% vs last month</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="text-xs font-medium text-slate-400">Total Orders Processed</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">3,490</div>
                <span className="inline-block mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">+12.1% growth</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="text-xs font-medium text-slate-400">Avg Ticket Size</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">$74.25</div>
                <span className="inline-block mt-2 text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">Optimal Margin</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="text-xs font-medium text-slate-400">Active Locations</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">{restaurants.length}</div>
                <span className="inline-block mt-2 text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">100% Uptime</span>
              </div>
            </div>

            {/* Performance Breakdown Table */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Location Revenue Comparison</h3>
              <div className="space-y-4">
                {restaurants.map((r) => {
                  const percent = Math.round((r.monthlyRevenue / 120000) * 100);
                  return (
                    <div key={r.id} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium text-slate-700">
                        <span>{r.name} ({r.city})</span>
                        <span className="font-bold">${r.monthlyRevenue.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-sky-500 to-teal-500 h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: BILLING & SUBSCRIPTION */}
        {activeOwnerSection === 'Billing & Subscription' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Billing & Subscription</h1>
              <p className="text-xs text-slate-500 mt-1">Manage SaaS subscription tier, payment methods, and invoice records.</p>
            </div>

            {/* Active Plan Panel */}
            <div className="bg-gradient-to-tr from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="px-3 py-1 bg-sky-500/20 text-sky-300 border border-sky-400/30 text-[10px] font-bold rounded-full uppercase tracking-wider">
                  Growth Network Plan
                </span>
                <h3 className="text-xl font-bold mt-2">Up to 5 Restaurant Locations</h3>
                <p className="text-xs text-slate-300 mt-1">$129.00 / month • Next renewal on September 1, 2026</p>
              </div>

              <div className="flex gap-3">
                <button className="px-4 py-2 bg-white text-slate-900 rounded-xl text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer">
                  Upgrade to Enterprise
                </button>
              </div>
            </div>

            {/* Invoices List */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Past Invoices</h3>
              <div className="divide-y divide-slate-100 text-xs">
                {[
                  { id: 'INV-2026-08', date: 'Aug 1, 2026', amount: '$129.00', status: 'Paid' },
                  { id: 'INV-2026-07', date: 'Jul 1, 2026', amount: '$129.00', status: 'Paid' },
                  { id: 'INV-2026-06', date: 'Jun 1, 2026', amount: '$129.00', status: 'Paid' }
                ].map((inv) => (
                  <div key={inv.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-800">{inv.id}</p>
                      <p className="text-[10px] text-slate-400">{inv.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-slate-900">{inv.amount}</span>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full">
                        {inv.status}
                      </span>
                      <button className="text-slate-400 hover:text-slate-700 cursor-pointer">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: TEAM MEMBERS */}
        {activeOwnerSection === 'Team Members' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Team Members & Permissions</h1>
                <p className="text-xs text-slate-500 mt-1">Manage general managers, head chefs, and staff accounts.</p>
              </div>
              <button className="px-4 py-2 bg-slate-900 text-white text-xs font-medium rounded-xl hover:bg-slate-800 cursor-pointer">
                + Invite Team Member
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs divide-y divide-slate-100">
              {[
                { name: 'Antoine Laurent', role: 'Owner & Executive Chef', location: 'Lumina Coastal Bistro', email: 'antoine@luminabistro.com', status: 'Active' },
                { name: 'Claire Dupont', role: 'General Manager', location: 'Lumina Coastal Bistro', email: 'claire@luminabistro.com', status: 'Active' },
                { name: 'Marco Rossi', role: 'General Manager', location: 'Aether Woodfire Pizza', email: 'marco@aetherwoodfire.com', status: 'Active' },
                { name: 'Kenji Sato', role: 'Head Chef & GM', location: 'Sora Omakase Lounge', email: 'kenji@sorasushi.com', status: 'Active' }
              ].map((member, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-xs">
                      {member.name[0]}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{member.name}</h4>
                      <p className="text-slate-500 text-[11px]">{member.role} • {member.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-500 text-[11px] hidden sm:inline">{member.email}</span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full">
                      {member.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 5: ACCOUNT SETTINGS */}
        {activeOwnerSection === 'Account Settings' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Account Settings</h1>
              <p className="text-xs text-slate-500 mt-1">Configure profile preferences, security, and notification settings.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Owner Profile Name</label>
                <input
                  type="text"
                  defaultValue="Antoine Laurent"
                  className="w-full max-w-md p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Primary Email Address</label>
                <input
                  type="email"
                  defaultValue="antoine@luminabistro.com"
                  className="w-full max-w-md p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button className="px-4 py-2 bg-slate-900 text-white font-medium rounded-xl text-xs hover:bg-slate-800 cursor-pointer">
                  Save Account Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 6: NOTIFICATIONS */}
        {activeOwnerSection === 'Notifications' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Notifications & Alerts</h1>
                <p className="text-xs text-slate-500 mt-1">Real-time alerts across all your restaurant locations.</p>
              </div>
              <button
                onClick={markAllNotificationsRead}
                className="text-xs font-semibold text-sky-600 hover:text-sky-700 cursor-pointer"
              >
                Mark All as Read
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs divide-y divide-slate-100">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  className={`p-4 flex items-start gap-3 cursor-pointer transition-colors ${
                    n.isRead ? 'bg-white' : 'bg-sky-50/40'
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                  <div className="flex-1 text-xs">
                    <div className="flex justify-between font-semibold text-slate-900">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                    </div>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 7: SUPPORT */}
        {activeOwnerSection === 'Support' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Support & Concierge</h1>
              <p className="text-xs text-slate-500 mt-1">Submit tickets or chat with our 24/7 hospitality technical team.</p>
            </div>

            {ticketSent ? (
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Support Ticket Dispatched</span>
                </div>
                <p>Ticket #SUP-8821 has been assigned to a senior support engineer. We will respond within 15 minutes.</p>
                <button
                  onClick={() => setTicketSent(false)}
                  className="mt-2 text-xs font-semibold text-emerald-700 underline cursor-pointer"
                >
                  Submit Another Ticket
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setTicketSent(true);
                }}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 text-xs"
              >
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    placeholder="e.g. POS printer Bluetooth configuration question"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Issue Details</label>
                  <textarea
                    rows={4}
                    required
                    value={ticketMsg}
                    onChange={(e) => setTicketMsg(e.target.value)}
                    placeholder="Describe what you need assistance with..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-slate-900 text-white font-medium rounded-xl text-xs hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Ticket</span>
                </button>
              </form>
            )}
          </div>
        )}

      </main>

      {/* ADD RESTAURANT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4 relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Add New Restaurant Location</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRestaurantSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Restaurant Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Aether Bakery & Espresso"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tagline / Concept</label>
                <input
                  type="text"
                  value={formTagline}
                  onChange={(e) => setFormTagline(e.target.value)}
                  placeholder="e.g. Specialty Coffee & French Pastries"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    value={formAddress}
                    onChange={(e) => setFormAddress(e.target.value)}
                    placeholder="e.g. 500 Pine St"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    placeholder="e.g. San Francisco"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={formCountry}
                    onChange={(e) => setFormCountry(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ZIP Code</label>
                  <input
                    type="text"
                    value={formZip}
                    onChange={(e) => setFormZip(e.target.value)}
                    placeholder="94103"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+1 (415)..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Logo Image URL</label>
                <input
                  type="url"
                  value={formLogo}
                  onChange={(e) => setFormLogo(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 cursor-pointer shadow-xs"
                >
                  Create Restaurant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
