import React from 'react';
import { useApp } from '../../context/AppContext';
import { RestaurantModule } from '../../context/AppContext';

import { DashboardModule } from './DashboardModule';
import { OrdersModule } from './OrdersModule';
import { PosModule } from './PosModule';
import { MenuModule } from './MenuModule';
import { KitchenModule } from './KitchenModule';
import { InventoryModule } from './InventoryModule';
import { TablesModule } from './TablesModule';
import { QrOrderingModule } from './QrOrderingModule';
import { CustomersModule } from './CustomersModule';
import { CrmModule } from './CrmModule';
import { LoyaltyModule } from './LoyaltyModule';
import { PromotionsModule } from './PromotionsModule';
import { MarketingModule } from './MarketingModule';
import { AnalyticsModule } from './AnalyticsModule';
import { WebsiteBuilderModule } from './WebsiteBuilderModule';
import { AiAssistantModule } from './AiAssistantModule';
import { SettingsModule } from './SettingsModule';

import {
  LayoutDashboard,
  ShoppingBag,
  CreditCard,
  UtensilsCrossed,
  CookingPot,
  Boxes,
  Grid,
  QrCode,
  Users,
  HeartHandshake,
  Award,
  Tag,
  Megaphone,
  BarChart3,
  Globe,
  Bot,
  Settings
} from 'lucide-react';

export const RestaurantView: React.FC = () => {
  const { activeRestaurantModule, setActiveRestaurantModule, activeRestaurant, orders } = useApp();

  const MODULE_SECTIONS: { title: string; items: { id: RestaurantModule; label: string; icon: React.ComponentType<any>; badge?: number; spark?: boolean }[] }[] = [
    {
      title: 'Operational',
      items: [
        { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'Orders', label: 'Orders', icon: ShoppingBag, badge: orders.filter(o => o.status === 'preparing' || o.status === 'new').length },
        { id: 'POS', label: 'Point of Sale (POS)', icon: CreditCard },
        { id: 'Menu', label: 'Menu & Catalog', icon: UtensilsCrossed },
      ]
    },
    {
      title: 'Management',
      items: [
        { id: 'Kitchen', label: 'Kitchen (KDS)', icon: CookingPot },
        { id: 'Inventory', label: 'Inventory', icon: Boxes },
        { id: 'Tables', label: 'Tables & Floor', icon: Grid },
        { id: 'QR Ordering', label: 'QR Ordering', icon: QrCode },
        { id: 'Customers', label: 'Customers', icon: Users },
      ]
    },
    {
      title: 'Growth & Tools',
      items: [
        { id: 'AI Assistant', label: 'AI Assistant ✨', icon: Bot, spark: true },
        { id: 'CRM', label: 'CRM & Relations', icon: HeartHandshake },
        { id: 'Loyalty', label: 'Loyalty Rewards', icon: Award },
        { id: 'Promotions', label: 'Promotions', icon: Tag },
        { id: 'Marketing', label: 'Marketing', icon: Megaphone },
        { id: 'Analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'Website Builder', label: 'Website Builder', icon: Globe },
        { id: 'Settings', label: 'Settings', icon: Settings },
      ]
    }
  ];

  const renderActiveModule = () => {
    switch (activeRestaurantModule) {
      case 'Dashboard': return <DashboardModule />;
      case 'Orders': return <OrdersModule />;
      case 'POS': return <PosModule />;
      case 'Menu': return <MenuModule />;
      case 'Kitchen': return <KitchenModule />;
      case 'Inventory': return <InventoryModule />;
      case 'Tables': return <TablesModule />;
      case 'QR Ordering': return <QrOrderingModule />;
      case 'Customers': return <CustomersModule />;
      case 'CRM': return <CrmModule />;
      case 'Loyalty': return <LoyaltyModule />;
      case 'Promotions': return <PromotionsModule />;
      case 'Marketing': return <MarketingModule />;
      case 'Analytics': return <AnalyticsModule />;
      case 'Website Builder': return <WebsiteBuilderModule />;
      case 'AI Assistant': return <AiAssistantModule />;
      case 'Settings': return <SettingsModule />;
      default: return <DashboardModule />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 flex flex-col md:flex-row font-sans">
      
      {/* Left Sidebar Module Nav */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-4 shrink-0 max-h-screen md:sticky md:top-16 overflow-y-auto custom-scrollbar">
        <div className="mb-4 pb-3 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-sm shadow-xs shadow-teal-200">
            {activeRestaurant.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <h2 className="text-xs font-semibold text-slate-900 truncate">{activeRestaurant.name}</h2>
            <p className="text-[10px] text-teal-600 font-medium capitalize">● {activeRestaurant.status} mode</p>
          </div>
        </div>

        <nav className="space-y-4 text-xs">
          {MODULE_SECTIONS.map((sec, idx) => (
            <div key={idx}>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 px-2">
                {sec.title}
              </div>
              <div className="space-y-0.5">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeRestaurantModule === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveRestaurantModule(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                        isActive
                          ? 'bg-teal-50 text-teal-700 font-semibold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                        <span className={`truncate ${item.spark ? 'italic font-medium' : ''}`}>{item.label}</span>
                      </div>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                          isActive ? 'bg-teal-600 text-white' : 'bg-orange-100 text-orange-600'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Module Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-6xl mx-auto w-full">
        {renderActiveModule()}
      </main>

    </div>
  );
};
