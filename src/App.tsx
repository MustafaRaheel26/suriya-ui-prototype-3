import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { LandingPage } from './components/landing/LandingPage';
import { AuthPage } from './components/auth/AuthPage';
import { OwnerDashboard } from './components/owner/OwnerDashboard';
import { SuperAdminDashboard } from './components/superadmin/SuperAdminDashboard';
import { RestaurantView } from './components/restaurant/RestaurantView';

function AppContent() {
  const { mainView } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-sky-100 selection:text-sky-900">
      <Navbar />
      {mainView === 'landing' && <LandingPage />}
      {mainView === 'auth' && <AuthPage />}
      {mainView === 'owner' && <OwnerDashboard />}
      {mainView === 'superadmin' && <SuperAdminDashboard />}
      {mainView === 'restaurant' && <RestaurantView />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
