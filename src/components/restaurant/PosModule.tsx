import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MenuItem, OrderItem } from '../../types';
import { Search, ShoppingBag, Trash2, CreditCard, DollarSign, QrCode, CheckCircle2 } from 'lucide-react';

export const PosModule: React.FC = () => {
  const { menuItems, activeRestaurant, createPosOrder, tables } = useApp();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>('Table 01');
  const [customerName, setCustomerName] = useState('Walk-in Guest');
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'apple-pay' | 'qr-code'>('card');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const categories = ['All', 'Appetizers', 'Mains', 'Pizzas & Pastas', 'Desserts', 'Beverages', 'Specials'];

  const filteredItems = menuItems.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.menuItemId === item.id);
      if (existing) {
        return prev.map(i => i.menuItemId === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id: `ci-${Date.now()}`, menuItemId: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * (activeRestaurant.taxRate / 100);
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cart.length === 0) return;

    createPosOrder({
      restaurantId: activeRestaurant.id,
      tableNumber: orderType === 'dine-in' ? selectedTable : undefined,
      customerName: customerName || 'Walk-in Guest',
      type: orderType,
      status: 'preparing',
      items: cart,
      subtotal,
      tax,
      discount: 0,
      total,
      paymentMethod,
      paymentStatus: 'paid'
    });

    setOrderSuccess(true);
    setTimeout(() => {
      setCart([]);
      setOrderSuccess(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Touch Point of Sale (POS)</h1>
          <p className="text-xs text-slate-500 mt-1">Speedy table checkout, modifiers, and instant kitchen ticket generation.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Menu Selection Catalog */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Search + Categories */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Quick search dishes..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredItems.map(item => (
              <button
                key={item.id}
                onClick={() => addToCart(item)}
                className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <img src={item.imageUrl} alt="" className="w-full h-24 object-cover rounded-xl mb-2" />
                  <h4 className="font-bold text-slate-900 text-xs line-clamp-1 group-hover:text-sky-700">{item.name}</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{item.description}</p>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-xs">${item.price.toFixed(2)}</span>
                  <span className="w-6 h-6 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-xs group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    +
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Col: Active Cart & Checkout Panel */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-md flex flex-col justify-between space-y-4">
          <div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-sky-600" />
                <span>Current Order Ticket</span>
              </h3>
              <span className="text-xs font-semibold text-slate-400">{cart.length} items</span>
            </div>

            {/* Order Settings Form */}
            <div className="grid grid-cols-2 gap-2 my-3 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">Order Type</label>
                <select
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value as any)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 cursor-pointer"
                >
                  <option value="dine-in">Dine-In</option>
                  <option value="takeaway">Takeaway</option>
                </select>
              </div>

              {orderType === 'dine-in' && (
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Table</label>
                  <select
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 cursor-pointer"
                  >
                    {tables.map(t => (
                      <option key={t.id} value={t.tableNumber}>{t.tableNumber}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Cart Items List */}
            <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 text-xs pr-1">
              {cart.length === 0 ? (
                <p className="text-center text-slate-400 py-8 italic">Cart is empty. Click items to add.</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="py-2.5 flex justify-between items-center">
                    <div className="flex-1 pr-2">
                      <p className="font-semibold text-slate-800">{item.name}</p>
                      <p className="text-[10px] text-slate-400">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{item.quantity}x</span>
                      <button onClick={() => removeFromCart(item.id)} className="text-rose-500 hover:text-rose-700 cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Checkout Footer Calculation */}
          <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Tax ({activeRestaurant.taxRate}%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-slate-900 text-base pt-1 border-t border-slate-100">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {orderSuccess ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-center font-bold text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Order Dispatched to Kitchen!</span>
              </div>
            ) : (
              <button
                disabled={cart.length === 0}
                onClick={handleCheckout}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-xs"
              >
                Complete Payment & Charge (${total.toFixed(2)})
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
