import {
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
  NotificationItem
} from '../types';

export const INITIAL_RESTAURANTS: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'Lumina Coastal Bistro',
    tagline: 'Modern Mediterranean & Fresh Seafood',
    address: '420 Ocean Boulevard, Suite 100',
    city: 'San Francisco',
    country: 'United States',
    zip: '94102',
    phone: '+1 (415) 889-2041',
    email: 'hello@luminabistro.com',
    logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
    rating: 4.9,
    monthlyRevenue: 84250,
    totalOrders: 1420,
    currency: '$',
    taxRate: 8.5,
    createdAt: '2024-01-15'
  },
  {
    id: 'rest-2',
    name: 'Aether Woodfire Pizza & Wine',
    tagline: 'Artisanal Neapolitan & Natural Wines',
    address: '712 Market Street',
    city: 'Seattle',
    country: 'United States',
    zip: '98101',
    phone: '+1 (206) 554-1920',
    email: 'contact@aetherwoodfire.com',
    logoUrl: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=200&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80',
    status: 'active',
    rating: 4.8,
    monthlyRevenue: 62100,
    totalOrders: 1180,
    currency: '$',
    taxRate: 9.0,
    createdAt: '2024-03-20'
  },
  {
    id: 'rest-3',
    name: 'Sora Omakase & Cocktail Lounge',
    tagline: 'Contemporary Japanese Cuisine',
    address: '108 Grand Avenue',
    city: 'New York',
    country: 'United States',
    zip: '10013',
    phone: '+1 (212) 902-3310',
    email: 'reservations@sorasushi.com',
    logoUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=200&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    status: 'busy',
    rating: 4.95,
    monthlyRevenue: 112800,
    totalOrders: 890,
    currency: '$',
    taxRate: 8.875,
    createdAt: '2023-11-05'
  }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'm-1',
    restaurantId: 'rest-1',
    name: 'Truffle Burrata & Heirloom Tomatoes',
    description: 'Creamy Puglia burrata, balsamic reduction, basil oil, toasted sourdough crisps',
    category: 'Appetizers',
    price: 19.50,
    costPrice: 5.20,
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb12765?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    isChefSpecial: true,
    tags: ['Vegetarian', 'Gluten-Free Option', 'Chef Choice'],
    calories: 420,
    preparationTimeMinutes: 8
  },
  {
    id: 'm-2',
    restaurantId: 'rest-1',
    name: 'Wild-Caught Pacific Sea Bass',
    description: 'Pan-seared bass with saffron risotto, charred asparagus, and lemon herb emulsion',
    category: 'Mains',
    price: 36.00,
    costPrice: 11.40,
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    isChefSpecial: true,
    tags: ['Seafood', 'Gluten-Free', 'High Protein'],
    calories: 580,
    preparationTimeMinutes: 18
  },
  {
    id: 'm-3',
    restaurantId: 'rest-1',
    name: 'Woodfire Truffle Tagliatelle',
    description: 'Handmade fresh pasta, black winter truffle butter, aged Parmigiano Reggiano',
    category: 'Pizzas & Pastas',
    price: 28.00,
    costPrice: 7.10,
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281288?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    tags: ['Fresh Pasta', 'Vegetarian'],
    calories: 650,
    preparationTimeMinutes: 12
  },
  {
    id: 'm-4',
    restaurantId: 'rest-1',
    name: 'Pistachio Tart Tartin & Gelato',
    description: 'Caramelized green apples, bronte pistachio crumble, Madagascar vanilla bean gelato',
    category: 'Desserts',
    price: 14.00,
    costPrice: 3.20,
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    tags: ['Dessert', 'Nuts'],
    calories: 390,
    preparationTimeMinutes: 6
  },
  {
    id: 'm-5',
    restaurantId: 'rest-1',
    name: 'Smoked Lavender Botanical Spritz',
    description: 'Artisanal gin, infused lavender nectar, sparkling elderflower water, rosemary flame',
    category: 'Beverages',
    price: 16.00,
    costPrice: 2.80,
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    tags: ['Signature Cocktail', 'Low-ABV'],
    calories: 140,
    preparationTimeMinutes: 3
  },
  {
    id: 'm-6',
    restaurantId: 'rest-1',
    name: 'A5 Wagyu Beef Carpaccio',
    description: 'Miyazaki Wagyu, caperberries, black garlic aioli, micro arugula, crispy shallots',
    category: 'Specials',
    price: 42.00,
    costPrice: 16.50,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80',
    isAvailable: true,
    isChefSpecial: true,
    tags: ['Signature', 'Limited Availability'],
    calories: 320,
    preparationTimeMinutes: 10
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: '#101',
    restaurantId: 'rest-1',
    tableNumber: 'Table 04',
    customerName: 'Eleanor Vance',
    customerPhone: '+1 (415) 230-9981',
    type: 'dine-in',
    status: 'preparing',
    items: [
      { id: 'item-1', menuItemId: 'm-1', name: 'Truffle Burrata & Heirloom Tomatoes', price: 19.50, quantity: 1 },
      { id: 'item-2', menuItemId: 'm-2', name: 'Wild-Caught Pacific Sea Bass', price: 36.00, quantity: 2, notes: 'Extra lemon on side' },
      { id: 'item-3', menuItemId: 'm-5', name: 'Smoked Lavender Botanical Spritz', price: 16.00, quantity: 2 }
    ],
    subtotal: 127.50,
    tax: 10.84,
    discount: 0,
    total: 138.34,
    paymentMethod: 'card',
    paymentStatus: 'paid',
    createdAt: '12 mins ago',
    timeElapsedMinutes: 12
  },
  {
    id: 'ord-102',
    orderNumber: '#102',
    restaurantId: 'rest-1',
    tableNumber: 'Table 08',
    customerName: 'Marcus Sterling',
    customerPhone: '+1 (415) 881-3044',
    type: 'dine-in',
    status: 'plating',
    items: [
      { id: 'item-4', menuItemId: 'm-3', name: 'Woodfire Truffle Tagliatelle', price: 28.00, quantity: 1 },
      { id: 'item-5', menuItemId: 'm-6', name: 'A5 Wagyu Beef Carpaccio', price: 42.00, quantity: 1 }
    ],
    subtotal: 70.00,
    tax: 5.95,
    discount: 0,
    total: 75.95,
    paymentMethod: 'card',
    paymentStatus: 'paid',
    createdAt: '18 mins ago',
    timeElapsedMinutes: 18
  },
  {
    id: 'ord-103',
    orderNumber: '#103',
    restaurantId: 'rest-1',
    type: 'takeaway',
    customerName: 'Sophia Lin',
    customerPhone: '+1 (415) 772-9102',
    status: 'ready',
    items: [
      { id: 'item-6', menuItemId: 'm-3', name: 'Woodfire Truffle Tagliatelle', price: 28.00, quantity: 2 },
      { id: 'item-7', menuItemId: 'm-4', name: 'Pistachio Tart Tartin & Gelato', price: 14.00, quantity: 1 }
    ],
    subtotal: 70.00,
    tax: 5.95,
    discount: 5.00,
    total: 70.95,
    paymentMethod: 'apple-pay',
    paymentStatus: 'paid',
    createdAt: '25 mins ago',
    timeElapsedMinutes: 25
  },
  {
    id: 'ord-104',
    orderNumber: '#104',
    restaurantId: 'rest-1',
    tableNumber: 'Table 12',
    customerName: 'Julian Hayes',
    customerPhone: '+1 (415) 901-4452',
    type: 'dine-in',
    status: 'new',
    items: [
      { id: 'item-8', menuItemId: 'm-1', name: 'Truffle Burrata & Heirloom Tomatoes', price: 19.50, quantity: 2 },
      { id: 'item-9', menuItemId: 'm-5', name: 'Smoked Lavender Botanical Spritz', price: 16.00, quantity: 4 }
    ],
    subtotal: 103.00,
    tax: 8.76,
    discount: 0,
    total: 111.76,
    paymentMethod: 'card',
    paymentStatus: 'pending',
    createdAt: '3 mins ago',
    timeElapsedMinutes: 3
  }
];

export const INITIAL_TABLES: TableItem[] = [
  { id: 't-1', restaurantId: 'rest-1', tableNumber: 'Table 01', capacity: 2, status: 'available', section: 'Main Hall' },
  { id: 't-2', restaurantId: 'rest-1', tableNumber: 'Table 02', capacity: 2, status: 'available', section: 'Main Hall' },
  { id: 't-3', restaurantId: 'rest-1', tableNumber: 'Table 04', capacity: 4, status: 'occupied', section: 'Main Hall', currentOrderId: 'ord-101', currentBill: 138.34 },
  { id: 't-4', restaurantId: 'rest-1', tableNumber: 'Table 08', capacity: 6, status: 'occupied', section: 'Patio & Terrace', currentOrderId: 'ord-102', currentBill: 75.95 },
  { id: 't-5', restaurantId: 'rest-1', tableNumber: 'Table 12', capacity: 4, status: 'occupied', section: 'Patio & Terrace', currentOrderId: 'ord-104', currentBill: 111.76 },
  { id: 't-6', restaurantId: 'rest-1', tableNumber: 'VIP 01', capacity: 8, status: 'reserved', section: 'VIP Lounge', reservedForName: 'Senator Reynolds', reservedTime: '07:30 PM' },
  { id: 't-7', restaurantId: 'rest-1', tableNumber: 'VIP 02', capacity: 6, status: 'cleaning', section: 'VIP Lounge' },
  { id: 't-8', restaurantId: 'rest-1', tableNumber: 'Bar 01', capacity: 1, status: 'available', section: 'Bar Area' },
  { id: 't-9', restaurantId: 'rest-1', tableNumber: 'Bar 02', capacity: 1, status: 'available', section: 'Bar Area' }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 'inv-1', restaurantId: 'rest-1', name: 'Fresh Truffle Paste (Black)', category: 'Produce', quantity: 1.2, unit: 'kg', minThreshold: 2.0, unitCost: 180.00, supplier: 'Truffle World Italy', lastRestocked: '2026-08-01', status: 'low-stock' },
  { id: 'inv-2', restaurantId: 'rest-1', name: 'Puglia Fresh Burrata Cheese', category: 'Dairy', quantity: 24, unit: 'units', minThreshold: 10, unitCost: 4.50, supplier: 'Artisan Dairy Co.', lastRestocked: '2026-08-07', status: 'in-stock' },
  { id: 'inv-3', restaurantId: 'rest-1', name: 'Pacific Sea Bass Fillets', category: 'Meat & Poultry', quantity: 15, unit: 'lbs', minThreshold: 20, unitCost: 18.50, supplier: 'Pacific Blue Ocean', lastRestocked: '2026-08-08', status: 'low-stock' },
  { id: 'inv-4', restaurantId: 'rest-1', name: 'Artisanal Durum Semolina Flour', category: 'Dry Goods', quantity: 80, unit: 'kg', minThreshold: 25, unitCost: 1.80, supplier: 'Golden Grains Imports', lastRestocked: '2026-07-28', status: 'in-stock' },
  { id: 'inv-5', restaurantId: 'rest-1', name: 'A5 Miyazaki Wagyu Striploin', category: 'Meat & Poultry', quantity: 0, unit: 'lbs', minThreshold: 5, unitCost: 95.00, supplier: 'Japan Prime Beef', lastRestocked: '2026-08-02', status: 'out-of-stock' },
  { id: 'inv-6', restaurantId: 'rest-1', name: 'Organic Heirloom Tomatoes', category: 'Produce', quantity: 35, unit: 'lbs', minThreshold: 15, unitCost: 2.40, supplier: 'Green Valley Organic Farms', lastRestocked: '2026-08-08', status: 'in-stock' }
];

export const INITIAL_STAFF: StaffMember[] = [
  { id: 'st-1', restaurantId: 'rest-1', name: 'Chef Antoine Laurent', role: 'Head Chef', email: 'antoine@luminabistro.com', phone: '+1 (415) 302-1102', status: 'on-shift', shiftHoursThisWeek: 38, hourlyRate: 42.00, avatarUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80' },
  { id: 'st-2', restaurantId: 'rest-1', name: 'Claire Dupont', role: 'General Manager', email: 'claire@luminabistro.com', phone: '+1 (415) 441-9820', status: 'on-shift', shiftHoursThisWeek: 40, hourlyRate: 38.00, avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
  { id: 'st-3', restaurantId: 'rest-1', name: 'Mateo Ross', role: 'Sous Chef', email: 'mateo@luminabistro.com', phone: '+1 (415) 882-1093', status: 'on-shift', shiftHoursThisWeek: 32, hourlyRate: 28.00, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
  { id: 'st-4', restaurantId: 'rest-1', name: 'Elena Rostova', role: 'Lead Server', email: 'elena@luminabistro.com', phone: '+1 (415) 601-3320', status: 'active', shiftHoursThisWeek: 26, hourlyRate: 22.00, avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80' }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  { id: 'c-1', restaurantId: 'rest-1', name: 'Eleanor Vance', email: 'eleanor.vance@architect.io', phone: '+1 (415) 230-9981', totalVisits: 14, totalSpent: 1840.50, loyaltyPoints: 1840, tier: 'Platinum', favoriteDishes: ['Truffle Burrata', 'Pacific Sea Bass'], lastVisit: 'Today', notes: 'Prefers quiet corner table, allergic to shellfish' },
  { id: 'c-2', restaurantId: 'rest-1', name: 'Marcus Sterling', email: 'm.sterling@venture.com', phone: '+1 (415) 881-3044', totalVisits: 9, totalSpent: 1220.00, loyaltyPoints: 1220, tier: 'Gold', favoriteDishes: ['A5 Wagyu Carpaccio'], lastVisit: 'Today', notes: 'Loves Pinot Noir recommendations' },
  { id: 'c-3', restaurantId: 'rest-1', name: 'Sophia Lin', email: 'sophia.lin@design.co', phone: '+1 (415) 772-9102', totalVisits: 5, totalSpent: 420.00, loyaltyPoints: 420, tier: 'Silver', favoriteDishes: ['Woodfire Tagliatelle'], lastVisit: 'Yesterday' }
];

export const INITIAL_LOYALTY_REWARDS: LoyaltyReward[] = [
  { id: 'l-1', title: 'Complimentary Artisanal Dessert', pointsRequired: 500, description: 'Choose any chef special dessert with your meal', discountValue: 'Free Item ($14 value)', category: 'Free Item', activeCount: 42 },
  { id: 'l-2', title: '15% Off Total Dining Bill', pointsRequired: 1000, description: 'Valid for dine-in tables up to 4 guests', discountValue: '15% Off', category: 'Percentage Off', activeCount: 18 },
  { id: 'l-3', title: 'Chef Omakase Starter & Champagne Pairing', pointsRequired: 2000, description: 'Exclusive VIP appetizer course with two glasses of Vintage Champagne', discountValue: 'VIP Perk ($65 value)', category: 'Free Item', activeCount: 9 }
];

export const INITIAL_PROMOTIONS: Promotion[] = [
  { id: 'p-1', code: 'SUMMERLUMINA15', title: 'Sunset Dining 15% Off', discountType: 'percentage', discountValue: 15, startDate: '2026-08-01', endDate: '2026-08-31', usageCount: 88, status: 'active' },
  { id: 'p-2', code: 'HAPPYHOUR20', title: 'Botanical Cocktails $20 Off $80', discountType: 'fixed', discountValue: 20, startDate: '2026-08-05', endDate: '2026-08-25', usageCount: 44, status: 'active' }
];

export const INITIAL_CAMPAIGNS: MarketingCampaign[] = [
  { id: 'cam-1', name: 'August Truffle & Wine Pairing Night', channel: 'Email', audience: 'Gold & Platinum VIPs (142 users)', sentCount: 142, openRate: '68.4%', status: 'active', lastSent: '2 days ago' },
  { id: 'cam-2', name: 'Weekend Lunch Special 10% Discount', channel: 'SMS', audience: 'All Local Diners (520 contacts)', sentCount: 520, openRate: '94.1%', status: 'completed', lastSent: '5 days ago' }
];

export const INITIAL_WEBSITE_CONFIG: WebsiteConfig = {
  heroTitle: 'A Culinary Journey Inspired by the Coastal Sun',
  heroSubtitle: 'Experience hand-crafted seasonal gastronomy, woodfired flavors, and rare natural wines in San Francisco.',
  heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
  aboutText: 'Lumina Coastal Bistro brings the vibrant, fresh spirit of Mediterranean coasts to Northern California. Executive Chef Antoine Laurent creates daily tasting menus around locally sourced organic farms and sustainable ocean catches.',
  openingHours: 'Mon - Sun: 11:30 AM - 10:30 PM | Bar open until Midnight',
  contactEmail: 'hello@luminabistro.com',
  contactPhone: '+1 (415) 889-2041',
  themeColor: '#0d9488',
  showOnlineReservation: true,
  showMenu: true,
  heroStyle: 'luxury-dark',
  fontStyle: 'editorial',
  announcementText: '✨ Michelin Recommended 2026 — Now accepting reservations for Autumn Tasting Experience',
  showAnnouncement: true,
  chefName: 'Chef Antoine Laurent',
  chefTitle: 'Executive Chef & Founder',
  chefImage: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80',
  logoImage: '',
  instagramUrl: 'https://instagram.com/luminabistro',
  facebookUrl: 'https://facebook.com/luminabistro',
  tripAdvisorUrl: 'https://tripadvisor.com/luminabistro',
  customDomain: 'luminabistro.com',
  showGallery: true,
  showReviews: true,
  showChefStory: true,
  showMap: true,
  sectionOrder: ['hero', 'menu', 'story', 'gallery', 'reviews', 'contact'],
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: 'n-1', title: 'Low Stock Alert', message: 'Fresh Truffle Paste is below safety minimum threshold (1.2 kg remaining).', time: '10m ago', type: 'inventory', isRead: false },
  { id: 'n-2', title: 'High Value Table Order', message: 'Table 04 placed an order for $138.34 with A5 Wagyu Carpaccio.', time: '25m ago', type: 'order', isRead: false },
  { id: 'n-3', title: 'Weekly Payout Processed', message: 'Stripe payout of $18,420.00 transferred to Lumina Bistro Chase Bank.', time: '2h ago', type: 'billing', isRead: true },
  { id: 'n-4', title: 'System Security Audit', message: 'All 3 restaurant locations verified with SSL & POS hardware encryption.', time: '1d ago', type: 'system', isRead: true }
];
