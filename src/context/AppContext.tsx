import React, { createContext, useContext, useState } from 'react';
import {
  UserRole,
  Restaurant,
  Order,
  MenuItem,
  StaffMember,
  TableItem,
  InventoryItem,
  Customer,
  LoyaltyReward,
  Promotion,
  MarketingCampaign,
  WebsiteConfig,
  NotificationItem,
  AiChatMessage
} from '../types';
import {
  INITIAL_RESTAURANTS,
  INITIAL_MENU_ITEMS,
  INITIAL_ORDERS,
  INITIAL_TABLES,
  INITIAL_INVENTORY,
  INITIAL_STAFF,
  INITIAL_CUSTOMERS,
  INITIAL_LOYALTY_REWARDS,
  INITIAL_PROMOTIONS,
  INITIAL_CAMPAIGNS,
  INITIAL_WEBSITE_CONFIG,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

export type MainView = 'landing' | 'auth' | 'owner' | 'superadmin' | 'restaurant';

export type RestaurantModule =
  | 'Dashboard'
  | 'Orders'
  | 'POS'
  | 'Menu'
  | 'Kitchen'
  | 'Inventory'
  | 'Tables'
  | 'QR Ordering'
  | 'Customers'
  | 'CRM'
  | 'Loyalty'
  | 'Promotions'
  | 'Marketing'
  | 'Analytics'
  | 'Website Builder'
  | 'AI Assistant'
  | 'Settings';

export type OwnerSection =
  | 'My Restaurants'
  | 'Network Analytics'
  | 'Billing & Subscription'
  | 'Team Members'
  | 'Account Settings'
  | 'Notifications'
  | 'Support';

export type SuperAdminSection =
  | 'Summary Metrics'
  | 'Users Management'
  | 'Restaurants Management'
  | 'Analytics Panels'
  | 'System Settings';

interface AppContextType {
  // Views & Roles
  mainView: MainView;
  setMainView: (view: MainView) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeRestaurantId: string;
  setActiveRestaurantId: (id: string) => void;
  activeRestaurant: Restaurant;
  
  // Navigation tabs
  activeRestaurantModule: RestaurantModule;
  setActiveRestaurantModule: (mod: RestaurantModule) => void;
  activeOwnerSection: OwnerSection;
  setActiveOwnerSection: (sec: OwnerSection) => void;
  activeSuperAdminSection: SuperAdminSection;
  setActiveSuperAdminSection: (sec: SuperAdminSection) => void;

  // Data Collections
  restaurants: Restaurant[];
  orders: Order[];
  menuItems: MenuItem[];
  tables: TableItem[];
  inventory: InventoryItem[];
  staff: StaffMember[];
  customers: Customer[];
  loyaltyRewards: LoyaltyReward[];
  promotions: Promotion[];
  campaigns: MarketingCampaign[];
  websiteConfig: WebsiteConfig;
  notifications: NotificationItem[];
  aiMessages: AiChatMessage[];

  // Action Methods
  addRestaurant: (newRest: Omit<Restaurant, 'id' | 'createdAt' | 'monthlyRevenue' | 'totalOrders' | 'rating'>) => void;
  updateRestaurantStatus: (id: string, status: Restaurant['status']) => void;
  
  // Orders & POS
  createPosOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'timeElapsedMinutes'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  
  // Menu
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  toggleMenuItemAvailability: (itemId: string) => void;

  // Tables
  updateTableStatus: (tableId: string, status: TableItem['status']) => void;

  // Inventory
  updateInventoryQuantity: (itemId: string, newQty: number) => void;

  // Website Config
  updateWebsiteConfig: (updates: Partial<WebsiteConfig>) => void;

  // AI Chat
  sendAiMessage: (prompt: string) => void;

  // Notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mainView, setMainView] = useState<MainView>('landing');
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [activeRestaurantId, setActiveRestaurantId] = useState<string>('rest-1');

  // Navigation state
  const [activeRestaurantModule, setActiveRestaurantModule] = useState<RestaurantModule>('Dashboard');
  const [activeOwnerSection, setActiveOwnerSection] = useState<OwnerSection>('My Restaurants');
  const [activeSuperAdminSection, setActiveSuperAdminSection] = useState<SuperAdminSection>('Summary Metrics');

  // Core Data
  const [restaurants, setRestaurants] = useState<Restaurant[]>(INITIAL_RESTAURANTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [tables, setTables] = useState<TableItem[]>(INITIAL_TABLES);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [staff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [customers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [loyaltyRewards] = useState<LoyaltyReward[]>(INITIAL_LOYALTY_REWARDS);
  const [promotions] = useState<Promotion[]>(INITIAL_PROMOTIONS);
  const [campaigns] = useState<MarketingCampaign[]>(INITIAL_CAMPAIGNS);
  const [websiteConfig, setWebsiteConfig] = useState<WebsiteConfig>(INITIAL_WEBSITE_CONFIG);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // AI Assistant Chat Messages
  const [aiMessages, setAiMessages] = useState<AiChatMessage[]>([
    {
      id: 'ai-1',
      sender: 'assistant',
      text: 'Good afternoon, Antoine! I analyzed Lumina Coastal Bistro\'s performance today. Sales are up 18% compared to last Sunday, driven by the Truffle Burrata and Smoked Lavender Spritz. Fresh Truffle Paste is low in stock (1.2 kg). Would you like me to generate an automated reorder purchase order?',
      timestamp: '14:20'
    }
  ]);

  const activeRestaurant = restaurants.find(r => r.id === activeRestaurantId) || restaurants[0];

  // Action implementations
  const addRestaurant = (newRest: Omit<Restaurant, 'id' | 'createdAt' | 'monthlyRevenue' | 'totalOrders' | 'rating'>) => {
    const created: Restaurant = {
      ...newRest,
      id: `rest-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      monthlyRevenue: 0,
      totalOrders: 0,
      rating: 5.0
    };
    setRestaurants(prev => [created, ...prev]);
    setActiveRestaurantId(created.id);
  };

  const updateRestaurantStatus = (id: string, status: Restaurant['status']) => {
    setRestaurants(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const createPosOrder = (newOrderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'timeElapsedMinutes'>) => {
    const nextNum = orders.length + 105;
    const newOrd: Order = {
      ...newOrderData,
      id: `ord-${Date.now()}`,
      orderNumber: `#${nextNum}`,
      createdAt: 'Just now',
      timeElapsedMinutes: 0
    };

    setOrders(prev => [newOrd, ...prev]);

    // Add a notification for high value orders
    if (newOrd.total > 100) {
      setNotifications(prev => [
        {
          id: `n-${Date.now()}`,
          title: 'New High-Value Order',
          message: `${newOrd.orderNumber} placed for $${newOrd.total.toFixed(2)} (${newOrd.items.length} items).`,
          time: 'Just now',
          type: 'order',
          isRead: false
        },
        ...prev
      ]);
    }
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const createdItem: MenuItem = {
      ...item,
      id: `m-${Date.now()}`
    };
    setMenuItems(prev => [...prev, createdItem]);
  };

  const toggleMenuItemAvailability = (itemId: string) => {
    setMenuItems(prev => prev.map(m => m.id === itemId ? { ...m, isAvailable: !m.isAvailable } : m));
  };

  const updateTableStatus = (tableId: string, status: TableItem['status']) => {
    setTables(prev => prev.map(t => t.id === tableId ? { ...t, status } : t));
  };

  const updateInventoryQuantity = (itemId: string, newQty: number) => {
    setInventory(prev => prev.map(inv => {
      if (inv.id === itemId) {
        const newStatus = newQty === 0 ? 'out-of-stock' : newQty <= inv.minThreshold ? 'low-stock' : 'in-stock';
        return { ...inv, quantity: newQty, status: newStatus };
      }
      return inv;
    }));
  };

  const updateWebsiteConfig = (updates: Partial<WebsiteConfig>) => {
    setWebsiteConfig(prev => ({ ...prev, ...updates }));
  };

  const sendAiMessage = (prompt: string) => {
    const userMsg: AiChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAiMessages(prev => [...prev, userMsg]);

    // Smart contextual response generation
    setTimeout(() => {
      let replyText = "";
      const lower = prompt.toLowerCase();

      if (lower.includes('reorder') || lower.includes('inventory') || lower.includes('waste')) {
        replyText = "I checked supplier price trends. Reordering 5 kg Fresh Truffle Paste from 'Truffle World Italy' at $180/kg will arrive in 48 hours. Shall I place the PO or send an alert to your kitchen manager?";
      } else if (lower.includes('special') || lower.includes('margin') || lower.includes('menu')) {
        replyText = "Based on sales velocity, pairing Wild-Caught Pacific Sea Bass with a local Chardonnay yields a 78% gross margin. I can push this auto-generated recommendation directly to your POS screen and digital QR menus!";
      } else if (lower.includes('instagram') || lower.includes('marketing') || lower.includes('promo')) {
        replyText = "Here is a drafted Instagram caption:\n✨ 'Golden hour meets coastal flavors at Lumina. Enjoy our signature Truffle Burrata paired with handcrafted botanical spritzes on the patio tonight. Reserve your table via bio link.'\nWould you like me to schedule an automated SMS alert to your 142 VIP customers?";
      } else {
        replyText = `Understood. Analyzing parameters for "${prompt}" across your active restaurants. I've updated your real-time analytics forecast showing a +14.2% projected lift in diner retention over the weekend.`;
      }

      const botReply: AiChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setAiMessages(prev => [...prev, botReply]);
    }, 800);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <AppContext.Provider
      value={{
        mainView,
        setMainView,
        userRole,
        setUserRole,
        activeRestaurantId,
        setActiveRestaurantId,
        activeRestaurant,

        activeRestaurantModule,
        setActiveRestaurantModule,
        activeOwnerSection,
        setActiveOwnerSection,
        activeSuperAdminSection,
        setActiveSuperAdminSection,

        restaurants,
        orders,
        menuItems,
        tables,
        inventory,
        staff,
        customers,
        loyaltyRewards,
        promotions,
        campaigns,
        websiteConfig,
        notifications,
        aiMessages,

        addRestaurant,
        updateRestaurantStatus,
        createPosOrder,
        updateOrderStatus,
        addMenuItem,
        toggleMenuItemAvailability,
        updateTableStatus,
        updateInventoryQuantity,
        updateWebsiteConfig,
        sendAiMessage,
        markNotificationRead,
        markAllNotificationsRead
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
