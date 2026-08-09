import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UtensilsCrossed,
  Crown,
  ShieldCheck,
  Building2,
  Bell,
  ChevronDown,
  Sparkles,
  User,
  LogOut,
  ExternalLink,
  CheckCircle2,
  LayoutDashboard
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    mainView,
    setMainView,
    userRole,
    setUserRole,
    restaurants,
    activeRestaurantId,
    setActiveRestaurantId,
    activeRestaurant,
    notifications,
    markAllNotificationsRead,
    markNotificationRead
  } = useApp();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showRestMenu, setShowRestMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleRoleSelect = (role: 'owner' | 'superadmin' | 'manager' | 'guest') => {
    setUserRole(role);
    setShowRoleMenu(false);
    if (role === 'owner') setMainView('owner');
    else if (role === 'superadmin') setMainView('superadmin');
    else if (role === 'manager') setMainView('restaurant');
    else if (role === 'guest') setMainView('landing');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (userRole === 'owner') setMainView('owner');
              else if (userRole === 'superadmin') setMainView('superadmin');
              else if (userRole === 'manager') setMainView('restaurant');
              else setMainView('landing');
            }}
            className="flex items-center gap-2.5 text-slate-900 group cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold shadow-sm shadow-teal-200 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-semibold text-base tracking-tight text-slate-900 flex items-center gap-1.5 italic">
                AetherResto <span className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200/60 not-italic">SaaS 2.0</span>
              </span>
              <span className="text-[11px] text-slate-500 hidden sm:inline">Operating System for Gastronomy</span>
            </div>
          </button>

          {/* Quick View Nav Chips */}
          <nav className="hidden md:flex items-center gap-1 ml-4 pl-4 border-l border-slate-200">
            <button
              onClick={() => setMainView('landing')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                mainView === 'landing' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Landing Page
            </button>
            
            <button
              onClick={() => {
                setUserRole('owner');
                setMainView('owner');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                mainView === 'owner' ? 'bg-teal-50 text-teal-700 font-semibold border border-teal-200/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-teal-600" />
              Owner Portal
            </button>

            <button
              onClick={() => {
                setUserRole('manager');
                setMainView('restaurant');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                mainView === 'restaurant' ? 'bg-teal-50 text-teal-700 font-semibold border border-teal-200/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-teal-600" />
              Restaurant Modules
            </button>

            <button
              onClick={() => {
                setUserRole('superadmin');
                setMainView('superadmin');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                mainView === 'superadmin' ? 'bg-teal-50 text-teal-700 font-semibold border border-teal-200/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              Super Admin
            </button>
          </nav>
        </div>

        {/* Right Section: Restaurant Switcher (when in restaurant view) + Persona Selector + Notifications + Profile */}
        <div className="flex items-center gap-3">
          
          {/* Restaurant Selector Dropdown */}
          {mainView === 'restaurant' && (
            <div className="relative">
              <button
                onClick={() => setShowRestMenu(!showRestMenu)}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-800 transition-all cursor-pointer"
              >
                <img
                  src={activeRestaurant.logoUrl}
                  alt={activeRestaurant.name}
                  className="w-5 h-5 rounded-md object-cover border border-slate-200"
                />
                <span className="max-w-[130px] truncate font-semibold">{activeRestaurant.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showRestMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Switch Active Location
                  </div>
                  {restaurants.map(r => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setActiveRestaurantId(r.id);
                        setShowRestMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                        r.id === activeRestaurantId ? 'bg-teal-50 text-teal-900 font-medium' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <img src={r.logoUrl} alt="" className="w-6 h-6 rounded-md object-cover" />
                        <div className="truncate">
                          <p className="text-xs font-medium truncate">{r.name}</p>
                          <p className="text-[10px] text-slate-400">{r.city}</p>
                        </div>
                      </div>
                      {r.id === activeRestaurantId && (
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100/70 transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-3 z-50 animate-in fade-in duration-150">
                <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-semibold text-slate-900">Notifications</h4>
                    {unreadCount > 0 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-orange-100 text-orange-600 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] font-medium text-teal-600 hover:text-teal-700 cursor-pointer"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-3 text-xs transition-colors cursor-pointer ${
                        n.isRead ? 'bg-white text-slate-600' : 'bg-teal-50/40 text-slate-900 font-medium'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-slate-800">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Persona Switcher Badge Button */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 transition-all shadow-2xs cursor-pointer"
            >
              <div className="w-6 h-6 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs">
                {userRole === 'owner' ? '👑' : userRole === 'superadmin' ? '⚡' : userRole === 'manager' ? '🍽️' : '👤'}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[11px] font-semibold text-slate-800 capitalize leading-tight">
                  {userRole === 'owner' ? 'Owner Persona' : userRole === 'superadmin' ? 'Super Admin' : userRole === 'manager' ? 'Restaurant GM' : 'Guest Visitor'}
                </span>
                <span className="text-[9px] text-slate-400">Click to switch</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 animate-in fade-in duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Demo Role / View
                </div>
                
                <button
                  onClick={() => handleRoleSelect('owner')}
                  className="w-full text-left px-3 py-2 flex items-center gap-2.5 hover:bg-sky-50/80 text-xs font-medium text-slate-800 cursor-pointer"
                >
                  <span className="text-base">👑</span>
                  <div>
                    <div className="font-semibold text-sky-900">Multi-Resto Owner</div>
                    <div className="text-[10px] text-slate-500">Manage 3 restaurants & billing</div>
                  </div>
                </button>

                <button
                  onClick={() => handleRoleSelect('manager')}
                  className="w-full text-left px-3 py-2 flex items-center gap-2.5 hover:bg-teal-50/80 text-xs font-medium text-slate-800 cursor-pointer"
                >
                  <span className="text-base">🍽️</span>
                  <div>
                    <div className="font-semibold text-teal-900">Restaurant Manager</div>
                    <div className="text-[10px] text-slate-500">POS, Kitchen KDS, Orders & Menu</div>
                  </div>
                </button>

                <button
                  onClick={() => handleRoleSelect('superadmin')}
                  className="w-full text-left px-3 py-2 flex items-center gap-2.5 hover:bg-indigo-50/80 text-xs font-medium text-slate-800 cursor-pointer"
                >
                  <span className="text-base">⚡</span>
                  <div>
                    <div className="font-semibold text-indigo-900">Super Admin</div>
                    <div className="text-[10px] text-slate-500">Platform tenants, uptime & MRR</div>
                  </div>
                </button>

                <div className="my-1 border-t border-slate-100"></div>

                <button
                  onClick={() => {
                    setMainView('auth');
                    setShowRoleMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-slate-50 text-xs font-medium text-slate-600 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-slate-400" />
                  Sign Out / Auth Screen
                </button>
              </div>
            )}
          </div>

          {/* Quick Login / Auth Action */}
          {mainView === 'landing' && (
            <button
              onClick={() => setMainView('auth')}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-medium hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
