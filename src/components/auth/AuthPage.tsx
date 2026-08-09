import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UtensilsCrossed,
  Mail,
  Lock,
  User,
  Building2,
  Phone,
  ArrowRight,
  ShieldCheck,
  Crown,
  KeyRound,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { setMainView, setUserRole, setActiveRestaurantModule } = useApp();
  
  const [authTab, setAuthTab] = useState<'login' | 'signup' | 'forgot' | 'verify'>('login');
  
  // Form fields
  const [email, setEmail] = useState('owner@luminabistro.com');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Antoine Laurent');
  const [restaurantName, setRestaurantName] = useState('Lumina Bistro');
  const [verifyCode, setVerifyCode] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Quick Demo Logins
  const handleDemoLogin = (role: 'owner' | 'superadmin' | 'manager') => {
    if (role === 'owner') {
      setEmail('owner@aetherresto.io');
      setPassword('demo-owner-2026');
      setUserRole('owner');
      setMainView('owner');
    } else if (role === 'superadmin') {
      setEmail('admin@aetherresto.io');
      setPassword('demo-admin-2026');
      setUserRole('superadmin');
      setMainView('superadmin');
    } else {
      setEmail('gm@luminabistro.com');
      setPassword('demo-manager-2026');
      setUserRole('manager');
      setMainView('restaurant');
      setActiveRestaurantModule('Dashboard');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authTab === 'forgot') {
      setSuccessMsg('A password reset link has been dispatched to ' + email);
    } else if (authTab === 'verify') {
      setSuccessMsg('Account verified successfully! Redirecting...');
      setTimeout(() => {
        setUserRole('owner');
        setMainView('owner');
      }, 1000);
    } else if (authTab === 'signup') {
      setAuthTab('verify');
    } else {
      // Default login
      setUserRole('owner');
      setMainView('owner');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-8 space-y-6 relative overflow-hidden">
        
        {/* Soft Decorative Accent */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-sky-100 rounded-full blur-2xl pointer-events-none" />

        {/* Header Branding */}
        <div className="text-center">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-teal-500 text-white items-center justify-center shadow-md mb-3">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {authTab === 'login' && 'Welcome back'}
            {authTab === 'signup' && 'Create your restaurant SaaS workspace'}
            {authTab === 'forgot' && 'Reset your account password'}
            {authTab === 'verify' && 'Verify security code'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {authTab === 'login' && 'Sign in to access your multi-restaurant operations.'}
            {authTab === 'signup' && 'Start your 14-day full access trial. No credit card needed.'}
            {authTab === 'forgot' && 'Enter your email to receive recovery instructions.'}
            {authTab === 'verify' && 'We sent a 6-digit code to your email.'}
          </p>
        </div>

        {/* Auth Mode Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-medium">
          <button
            type="button"
            onClick={() => { setAuthTab('login'); setSuccessMsg(''); }}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              authTab === 'login' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setAuthTab('signup'); setSuccessMsg(''); }}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              authTab === 'signup' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Quick Demo Login Chips Box */}
        {authTab === 'login' && (
          <div className="bg-sky-50/70 p-3.5 rounded-xl border border-sky-100 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-sky-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>One-Click Demo Personas:</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('owner')}
                className="py-1.5 px-2 bg-white hover:bg-sky-100/60 border border-sky-200 text-[11px] font-medium text-sky-900 rounded-lg text-center transition-colors cursor-pointer"
              >
                👑 Owner
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('manager')}
                className="py-1.5 px-2 bg-white hover:bg-teal-100/60 border border-teal-200 text-[11px] font-medium text-teal-900 rounded-lg text-center transition-colors cursor-pointer"
              >
                🍽️ Manager
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('superadmin')}
                className="py-1.5 px-2 bg-white hover:bg-indigo-100/60 border border-indigo-200 text-[11px] font-medium text-indigo-900 rounded-lg text-center transition-colors cursor-pointer"
              >
                ⚡ Admin
              </button>
            </div>
          </div>
        )}

        {/* Alert Messages */}
        {successMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {authTab === 'signup' && (
            <>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Your Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Antoine Laurent"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Primary Restaurant Brand Name</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    placeholder="e.g. Lumina Coastal Bistro"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                </div>
              </div>
            </>
          )}

          {authTab !== 'verify' && (
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Work Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="owner@luminabistro.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>
            </div>
          )}

          {(authTab === 'login' || authTab === 'signup') && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-slate-700 font-semibold">Password</label>
                {authTab === 'login' && (
                  <button
                    type="button"
                    onClick={() => setAuthTab('forgot')}
                    className="text-[11px] text-sky-600 hover:text-sky-700 cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>
            </div>
          )}

          {authTab === 'verify' && (
            <div>
              <label className="block text-slate-700 font-semibold mb-1">6-Digit Verification Code</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  placeholder="8 4 9 2 0 1"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 tracking-widest font-mono text-center text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>
              {authTab === 'login' && 'Sign In to Dashboard'}
              {authTab === 'signup' && 'Create Restaurant Account'}
              {authTab === 'forgot' && 'Send Reset Link'}
              {authTab === 'verify' && 'Verify & Launch Dashboard'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Credentials Footer Info */}
        <div className="pt-4 border-t border-slate-100 text-center text-[11px] text-slate-400">
          <p>Standard Demo Password: <code className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">demo-owner-2026</code></p>
        </div>
      </div>
    </div>
  );
};
