import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Sparkles,
  Flower2,
  CalendarCheck,
  ShieldAlert,
  Store,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, switchDemoRole } = useAuth();
  const { cart, wishlist } = useStore();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Bangalore');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleRoleSwitch = (newRole: UserRole) => {
    switchDemoRole(newRole);
    setIsUserMenuOpen(false);
    // Guide navigation to respective dashboard if appropriate
    if (newRole === 'vendor') navigate('/vendor');
    else if (newRole === 'admin') navigate('/admin');
    else navigate('/customer');
  };

  const cartItemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-shadow shadow-sm">
      {/* Top micro announcement bar */}
      <div className="bg-[#17392C] text-[#FAF8F3] text-xs py-2 px-4 font-medium flex items-center justify-between border-b border-[#234536]/40">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Sparkles className="w-3.5 h-3.5 text-[#F3E2E3] animate-pulse" />
          <span>Complimentary Express Delivery on orders above ₹999 with code <strong className="text-white underline font-semibold">BLOOM10</strong></span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-300">
          <Link to="/track-order" className="hover:text-white transition-colors">Track Order</Link>
          <span className="text-slate-500">•</span>
          <Link to="/vendor/register" className="hover:text-white font-semibold text-[#F3E2E3] transition-colors">Partner With Us</Link>
          <span className="text-slate-500">•</span>
          <div className="flex items-center gap-1.5 bg-[#10281F] px-2.5 py-1 rounded-full text-[10px] border border-[#234536]">
            <span className="text-slate-400">Role:</span>
            <button
              type="button"
              onClick={() => handleRoleSwitch('customer')}
              className={`px-1.5 py-0.5 rounded transition-all ${user?.role === 'customer' ? 'bg-[#234536] text-white font-bold shadow-xs' : 'text-slate-300 hover:text-white'}`}
            >
              Cust
            </button>
            <button
              type="button"
              onClick={() => handleRoleSwitch('vendor')}
              className={`px-1.5 py-0.5 rounded transition-all ${user?.role === 'vendor' ? 'bg-amber-700 text-white font-bold shadow-xs' : 'text-slate-300 hover:text-white'}`}
            >
              Vendor
            </button>
            <button
              type="button"
              onClick={() => handleRoleSwitch('admin')}
              className={`px-1.5 py-0.5 rounded transition-all ${user?.role === 'admin' ? 'bg-purple-800 text-white font-bold shadow-xs' : 'text-slate-300 hover:text-white'}`}
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3 lg:gap-6">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-[#234536] flex items-center justify-center text-[#FAF8F3] shadow-md shadow-[#17392C]/10 group-hover:scale-105 transition-transform">
              <Flower2 className="w-6 h-6 text-[#F3E2E3]" />
            </div>
            <div>
              <span className="font-display text-2xl font-bold tracking-tight text-[#17392C] block leading-tight">
                FloraLens
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#747970] font-semibold block -mt-1">
                Flowers & Decor
              </span>
            </div>
          </Link>

          {/* City Selector */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8F3] border border-[#E8E5DE] text-xs text-[#242822]">
            <MapPin className="w-3.5 h-3.5 text-[#C7838B] flex-shrink-0" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent font-medium focus:outline-none cursor-pointer text-xs"
            >
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Chennai">Chennai</option>
            </select>
          </div>

          {/* Search bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-sm lg:max-w-md items-center relative"
          >
            <Search className="w-4 h-4 text-[#747970] absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search roses, lilies, birthday decor, mandaps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#E8E5DE] focus:outline-none focus:border-[#234536] focus:ring-2 focus:ring-[#DCE5D8] transition-all placeholder:text-[#747970]"
            />
          </form>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 text-xs font-semibold text-[#242822]">
            <Link to="/" className="hover:text-[#234536] transition-colors">
              Home
            </Link>
            <Link to="/flowers" className="hover:text-[#234536] transition-colors flex items-center gap-1">
              <Flower2 className="w-3.5 h-3.5 text-[#234536]" />
              <span>Shop Flowers</span>
            </Link>
            <Link to="/flowers?flowerType=Mixed" className="hover:text-[#234536] transition-colors">
              Bouquets & Gifts
            </Link>
            <Link to="/decorations" className="hover:text-[#234536] transition-colors flex items-center gap-1">
              <CalendarCheck className="w-3.5 h-3.5 text-[#C7838B]" />
              <span>Decorations</span>
            </Link>
            <div className="relative group/nav">
              <button
                type="button"
                className="hover:text-[#234536] transition-colors flex items-center gap-1 py-2 cursor-pointer"
              >
                <span>Shop by Occasion</span>
                <ChevronDown className="w-3 h-3 text-[#747970]" />
              </button>
              <div className="absolute top-full left-0 hidden group-hover/nav:block w-48 bg-white rounded-2xl shadow-elevated border border-[#E8E5DE] py-2 z-50 animate-fadeIn">
                <Link to="/flowers?search=birthday" className="block px-4 py-2 hover:bg-[#FAF8F3] text-xs text-[#242822]">
                  🎂 Birthdays
                </Link>
                <Link to="/flowers?search=anniversary" className="block px-4 py-2 hover:bg-[#FAF8F3] text-xs text-[#242822]">
                  💍 Anniversaries
                </Link>
                <Link to="/decorations?eventType=Wedding" className="block px-4 py-2 hover:bg-[#FAF8F3] text-xs text-[#242822]">
                  💐 Weddings & Mandaps
                </Link>
                <Link to="/decorations?eventType=Engagement" className="block px-4 py-2 hover:bg-[#FAF8F3] text-xs text-[#242822]">
                  ✨ Engagements & Roka
                </Link>
                <Link to="/flowers?flowerType=Roses" className="block px-4 py-2 hover:bg-[#FAF8F3] text-xs text-[#242822]">
                  🌹 Romantic Surprises
                </Link>
              </div>
            </div>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist */}
            <Link
              to="/customer/wishlist"
              className="relative p-2.5 rounded-full text-slate-600 hover:text-botanical-800 hover:bg-ivory-200/80 transition-colors"
              title="Saved items"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-terracotta-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-full text-slate-600 hover:text-botanical-800 hover:bg-ivory-200/80 transition-colors flex items-center gap-2"
              title="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-botanical-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
              {cart.total > 0 && (
                <span className="hidden sm:inline text-xs font-bold text-botanical-800">
                  ₹{cart.total.toLocaleString('en-IN')}
                </span>
              )}
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-full border border-slate-200 bg-white hover:bg-ivory-50 transition-all text-xs font-semibold text-slate-800 shadow-sm"
              >
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-botanical-100 text-botanical-800 flex items-center justify-center">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
                <span className="hidden sm:inline max-w-[100px] truncate">
                  {isAuthenticated ? user?.fullName.split(' ')[0] : 'Sign In'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fadeIn"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-3 border-b border-slate-100 bg-ivory-50/50">
                        <p className="text-xs font-bold text-slate-800">{user?.fullName}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                        <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-botanical-100 text-botanical-800">
                          Role: {user?.role}
                        </span>
                      </div>

                      <div className="py-1 text-xs">
                        {user?.role === 'customer' && (
                          <>
                            <Link
                              to="/customer"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="block px-4 py-2 hover:bg-ivory-100 text-slate-700"
                            >
                              Customer Dashboard
                            </Link>
                            <Link
                              to="/customer/orders"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="block px-4 py-2 hover:bg-ivory-100 text-slate-700"
                            >
                              My Flower Orders
                            </Link>
                            <Link
                              to="/customer/bookings"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="block px-4 py-2 hover:bg-ivory-100 text-slate-700"
                            >
                              My Event Bookings
                            </Link>
                            <Link
                              to="/customer/addresses"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="block px-4 py-2 hover:bg-ivory-100 text-slate-700"
                            >
                              Saved Addresses
                            </Link>
                          </>
                        )}

                        {user?.role === 'vendor' && (
                          <>
                            <Link
                              to="/vendor"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="block px-4 py-2 font-bold text-botanical-800 hover:bg-botanical-50"
                            >
                              Vendor Portal Overview
                            </Link>
                            <Link
                              to="/vendor/products"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="block px-4 py-2 hover:bg-ivory-100 text-slate-700"
                            >
                              Manage Flower Products
                            </Link>
                            <Link
                              to="/vendor/services"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="block px-4 py-2 hover:bg-ivory-100 text-slate-700"
                            >
                              Manage Decoration Services
                            </Link>
                            <Link
                              to="/vendor/orders"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="block px-4 py-2 hover:bg-ivory-100 text-slate-700"
                            >
                              Incoming Orders
                            </Link>
                            <Link
                              to="/vendor/bookings"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="block px-4 py-2 hover:bg-ivory-100 text-slate-700"
                            >
                              Booking Requests
                            </Link>
                          </>
                        )}

                        {user?.role === 'admin' && (
                          <>
                            <Link
                              to="/admin"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="block px-4 py-2 font-bold text-purple-800 hover:bg-purple-50"
                            >
                              Admin Dashboard
                            </Link>
                            <Link
                              to="/admin/vendors"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="block px-4 py-2 hover:bg-ivory-100 text-slate-700"
                            >
                              Vendor Applications
                            </Link>
                            <Link
                              to="/admin/moderation"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="block px-4 py-2 hover:bg-ivory-100 text-slate-700"
                            >
                              Content Moderation
                            </Link>
                            <Link
                              to="/admin/orders-bookings"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="block px-4 py-2 hover:bg-ivory-100 text-slate-700"
                            >
                              Platform Transactions
                            </Link>
                          </>
                        )}
                      </div>

                      {/* Demo Role Switcher Quick Bar */}
                      <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50">
                        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1.5">
                          Quick Switch Role (Evaluator Demo):
                        </span>
                        <div className="grid grid-cols-3 gap-1">
                          <button
                            type="button"
                            onClick={() => handleRoleSwitch('customer')}
                            className={`py-1 text-[11px] rounded font-semibold ${
                              user?.role === 'customer'
                                ? 'bg-emerald-700 text-white'
                                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            Customer
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRoleSwitch('vendor')}
                            className={`py-1 text-[11px] rounded font-semibold ${
                              user?.role === 'vendor'
                                ? 'bg-amber-700 text-white'
                                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            Vendor
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRoleSwitch('admin')}
                            className={`py-1 text-[11px] rounded font-semibold ${
                              user?.role === 'admin'
                                ? 'bg-purple-700 text-white'
                                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            Admin
                          </button>
                        </div>
                      </div>

                      <div className="pt-1 border-t border-slate-100">
                        <Link
                          to="/login"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-ivory-100 flex items-center gap-2"
                        >
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>Switch User / Login</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                            navigate('/');
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-3 text-xs space-y-2">
                      <Link
                        to="/login"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block w-full py-2 text-center rounded-lg bg-botanical-700 text-white font-semibold hover:bg-botanical-800 transition-colors shadow-xs"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block w-full py-2 text-center rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-ivory-100 transition-colors"
                      >
                        Create Account
                      </Link>
                      <div className="pt-2 border-t border-slate-100">
                        <Link
                          to="/vendor/register"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 text-xs font-semibold text-terracotta-600 hover:text-terracotta-700"
                        >
                          <Store className="w-4 h-4" />
                          <span>Partner with FloraLens</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 hover:text-botanical-900 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search flowers & event decorators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-2 rounded-full bg-white border border-slate-200 focus:outline-none focus:border-botanical-600"
            />
          </form>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          <nav className="flex flex-col space-y-2 text-sm font-semibold text-slate-800">
            <Link
              to="/flowers"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-ivory-100 flex items-center gap-2"
            >
              <Flower2 className="w-4 h-4 text-botanical-600" />
              <span>Shop Flowers</span>
            </Link>
            <Link
              to="/flowers?flowerType=Mixed"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-ivory-100 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#C7838B]" />
              <span>Bouquets & Floral Gifts</span>
            </Link>
            <Link
              to="/decorations"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-ivory-100 flex items-center gap-2"
            >
              <CalendarCheck className="w-4 h-4 text-[#C7838B]" />
              <span>Event Decorations</span>
            </Link>
            <Link
              to="/flowers?search=birthday"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-ivory-100 flex items-center gap-2 text-xs"
            >
              <span>🎂 Birthday Flowers & Decor</span>
            </Link>
            <Link
              to="/decorations?eventType=Wedding"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-ivory-100 flex items-center gap-2 text-xs"
            >
              <span>💐 Wedding & Mandap Styling</span>
            </Link>
            <Link
              to="/search?type=vendors"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-ivory-100 flex items-center gap-2"
            >
              <Store className="w-4 h-4 text-slate-500" />
              <span>Browse Local Vendors</span>
            </Link>
            <Link
              to="/track-order"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-ivory-100"
            >
              Track Order / Booking
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-ivory-100"
            >
              About FloraLens
            </Link>
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-botanical-50 text-botanical-800 font-bold hover:bg-botanical-100 flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Sign In / Demo Roles</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
