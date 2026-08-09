export type UserRole = 'owner' | 'superadmin' | 'manager' | 'staff' | 'guest';

export interface Restaurant {
  id: string;
  name: string;
  tagline?: string;
  address: string;
  city: string;
  country: string;
  zip: string;
  phone: string;
  email: string;
  logoUrl: string;
  coverUrl?: string;
  status: 'active' | 'busy' | 'closed' | 'maintenance';
  rating: number;
  monthlyRevenue: number;
  totalOrders: number;
  currency: string;
  taxRate: number;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
  options?: string[];
}

export interface Order {
  id: string;
  orderNumber: string;
  restaurantId: string;
  tableNumber?: string;
  customerName: string;
  customerPhone?: string;
  type: 'dine-in' | 'takeaway' | 'delivery' | 'qr-order';
  status: 'new' | 'preparing' | 'plating' | 'ready' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod?: 'cash' | 'card' | 'qr-code' | 'apple-pay';
  paymentStatus: 'paid' | 'pending' | 'refunded';
  createdAt: string;
  timeElapsedMinutes: number;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  category: 'Appetizers' | 'Mains' | 'Pizzas & Pastas' | 'Desserts' | 'Beverages' | 'Specials';
  price: number;
  costPrice: number;
  imageUrl: string;
  isAvailable: boolean;
  isChefSpecial?: boolean;
  tags: string[];
  calories?: number;
  preparationTimeMinutes: number;
}

export interface StaffMember {
  id: string;
  restaurantId: string;
  name: string;
  role: 'General Manager' | 'Head Chef' | 'Sous Chef' | 'Lead Server' | 'Bartender' | 'Cashier';
  email: string;
  phone: string;
  status: 'active' | 'on-shift' | 'off-shift';
  shiftHoursThisWeek: number;
  hourlyRate: number;
  avatarUrl: string;
}

export interface TableItem {
  id: string;
  restaurantId: string;
  tableNumber: string;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved' | 'cleaning';
  section: 'Main Hall' | 'Patio & Terrace' | 'VIP Lounge' | 'Bar Area';
  currentOrderId?: string;
  currentBill?: number;
  reservedForName?: string;
  reservedTime?: string;
}

export interface InventoryItem {
  id: string;
  restaurantId: string;
  name: string;
  category: 'Produce' | 'Meat & Poultry' | 'Dairy' | 'Dry Goods' | 'Beverages' | 'Packaging';
  quantity: number;
  unit: 'kg' | 'lbs' | 'liters' | 'units' | 'boxes';
  minThreshold: number;
  unitCost: number;
  supplier: string;
  lastRestocked: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface Customer {
  id: string;
  restaurantId: string;
  name: string;
  email: string;
  phone: string;
  totalVisits: number;
  totalSpent: number;
  loyaltyPoints: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  favoriteDishes: string[];
  lastVisit: string;
  notes?: string;
}

export interface LoyaltyReward {
  id: string;
  title: string;
  pointsRequired: number;
  description: string;
  discountValue: string;
  category: 'Free Item' | 'Percentage Off' | 'Flat Discount';
  activeCount: number;
}

export interface Promotion {
  id: string;
  code: string;
  title: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  startDate: string;
  endDate: string;
  usageCount: number;
  status: 'active' | 'scheduled' | 'expired';
}

export interface MarketingCampaign {
  id: string;
  name: string;
  channel: 'SMS' | 'Email' | 'Instagram' | 'Push Notification';
  audience: string;
  sentCount: number;
  openRate: string;
  status: 'active' | 'completed' | 'draft';
  lastSent: string;
}

export interface WebsiteConfig {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  aboutText: string;
  openingHours: string;
  contactEmail: string;
  contactPhone: string;
  themeColor: string;
  showOnlineReservation: boolean;
  showMenu: boolean;
  heroStyle?: 'luxury-dark' | 'warm-minimal' | 'split-image';
  fontStyle?: 'serif' | 'sans' | 'editorial';
  announcementText?: string;
  showAnnouncement?: boolean;
  chefName?: string;
  chefTitle?: string;
  chefImage?: string;
  logoImage?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  tripAdvisorUrl?: string;
  customDomain?: string;
  showGallery?: boolean;
  showReviews?: boolean;
  showChefStory?: boolean;
  showMap?: boolean;
  sectionOrder?: string[];
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionButton?: {
    label: string;
    actionType: string;
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'order' | 'inventory' | 'billing' | 'system';
  isRead: boolean;
}
