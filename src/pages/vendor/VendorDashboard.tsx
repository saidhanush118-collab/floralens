import React from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  CalendarCheck,
  TrendingUp,
  Star,
  Plus,
  ArrowRight,
  Store,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';

export const VendorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { orders, bookings, products, services, vendors } = useStore();

  // Find vendor profile associated with current user or fallback to vendor-1 for demo
  const currentVendor =
    vendors.find((v) => v.userId === user?.id) ||
    vendors.find((v) => v.id === 'vendor-1') ||
    vendors[0];

  const vendorOrders = orders.filter((o) => o.vendorId === currentVendor.id);
  const vendorBookings = bookings.filter((b) => b.vendorId === currentVendor.id);
  const vendorProducts = products.filter((p) => p.vendorId === currentVendor.id);
  const vendorServices = services.filter((s) => s.vendorId === currentVendor.id);

  const pendingOrders = vendorOrders.filter((o) => ['confirmed', 'accepted_by_vendor'].includes(o.status));
  const pendingBookings = vendorBookings.filter((b) => ['confirmed', 'pending_approval'].includes(b.status));

  // Compute revenue (90% retained)
  const orderRevenue = vendorOrders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.subtotal * 0.9), 0);
  const bookingRevenue = vendorBookings
    .filter((b) => b.status !== 'cancelled' && b.status !== 'rejected')
    .reduce((sum, b) => sum + ((b.packagePrice + b.addonsTotal) * 0.88), 0);
  const totalNetEarnings = orderRevenue + bookingRevenue;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-botanical-900 to-botanical-800 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
        <div className="flex items-center gap-4">
          <img
            src={currentVendor.logoUrl}
            alt={currentVendor.businessName}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/40 shadow-md bg-white"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-blush-300 font-semibold uppercase tracking-wider">
                Vendor Partner Portal
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                {currentVendor.status}
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold mt-0.5">
              {currentVendor.businessName}
            </h1>
            <p className="text-xs text-botanical-200 mt-0.5">
              {currentVendor.city} • {currentVendor.vendorType.toUpperCase()} • Commission Rate: {currentVendor.commissionRate}%
            </p>
          </div>
        </div>

        {/* Quick Action CTAs */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/vendor/products"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-sm transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Flower Product</span>
          </Link>
          <Link
            to="/vendor/services"
            className="px-4 py-2.5 rounded-xl bg-white text-botanical-900 hover:bg-ivory-100 text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Decor Package</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Net Earnings</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="font-display text-2xl sm:text-3xl font-bold font-sans text-slate-900 block">
            ₹{Math.round(totalNetEarnings).toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-emerald-700 font-medium block mt-1">
            After platform fee (Weekly Payouts)
          </span>
        </div>

        <Link
          to="/vendor/orders"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft hover:shadow-elevated transition-all"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Flower Orders</span>
            <Package className="w-4 h-4 text-botanical-700" />
          </div>
          <span className="font-display text-2xl sm:text-3xl font-bold font-sans text-slate-900 block">
            {vendorOrders.length}
          </span>
          <span className="text-[11px] text-amber-600 font-medium block mt-1">
            {pendingOrders.length} Pending Fulfillment
          </span>
        </Link>

        <Link
          to="/vendor/bookings"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft hover:shadow-elevated transition-all"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Event Bookings</span>
            <CalendarCheck className="w-4 h-4 text-terracotta-600" />
          </div>
          <span className="font-display text-2xl sm:text-3xl font-bold font-sans text-slate-900 block">
            {vendorBookings.length}
          </span>
          <span className="text-[11px] text-amber-600 font-medium block mt-1">
            {pendingBookings.length} Require Setup Action
          </span>
        </Link>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Merchant Rating</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
          </div>
          <span className="font-display text-2xl sm:text-3xl font-bold font-sans text-slate-900 block">
            {currentVendor.rating} ★
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">
            Based on {currentVendor.reviewCount} customer reviews
          </span>
        </div>
      </div>

      {/* Two Column Section: Incoming Orders & Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Incoming Orders Panel */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
              <Package className="w-4 h-4 text-botanical-700" />
              <span>Incoming Flower Orders ({vendorOrders.length})</span>
            </h3>
            <Link to="/vendor/orders" className="text-xs font-semibold text-botanical-700 hover:underline">
              Manage All
            </Link>
          </div>

          {vendorOrders.length > 0 ? (
            <div className="space-y-3">
              {vendorOrders.slice(0, 3).map((o) => (
                <div key={o.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="font-mono font-bold text-slate-900">#{o.orderNumber}</span>
                    <span className="text-slate-500 block text-[11px]">
                      Customer: {o.customerName} ({o.deliveryAddress.city})
                    </span>
                    <span className="font-bold text-botanical-900 font-sans block mt-1">
                      ₹{o.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="text-right space-y-1">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                      {o.status.replace(/_/g, ' ')}
                    </span>
                    <Link
                      to="/vendor/orders"
                      className="block text-[11px] font-bold text-botanical-700 hover:underline"
                    >
                      Update Status &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              No flower orders currently placed with your shop.
            </div>
          )}
        </div>

        {/* Incoming Bookings Panel */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-terracotta-600" />
              <span>Decoration Bookings ({vendorBookings.length})</span>
            </h3>
            <Link to="/vendor/bookings" className="text-xs font-semibold text-botanical-700 hover:underline">
              Manage All
            </Link>
          </div>

          {vendorBookings.length > 0 ? (
            <div className="space-y-3">
              {vendorBookings.slice(0, 3).map((b) => (
                <div key={b.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="font-mono font-bold text-slate-900">#{b.bookingReference}</span>
                    <span className="text-slate-500 block text-[11px]">
                      {b.serviceName} • {b.eventType}
                    </span>
                    <span className="font-bold text-botanical-900 font-sans block mt-1">
                      Event: {new Date(b.eventDate).toLocaleDateString('en-IN')} ({b.timeSlot})
                    </span>
                  </div>

                  <div className="text-right space-y-1">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                      {b.status.replace(/_/g, ' ')}
                    </span>
                    <Link
                      to="/vendor/bookings"
                      className="block text-[11px] font-bold text-botanical-700 hover:underline"
                    >
                      Manage Booking &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              No event bookings currently registered for your team.
            </div>
          )}
        </div>
      </div>

      {/* Catalog Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/vendor/products"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft hover:shadow-elevated transition-all flex items-center justify-between"
        >
          <div>
            <h4 className="font-bold text-xs text-slate-900">Manage Flower Catalog</h4>
            <span className="text-xs text-slate-500">{vendorProducts.length} Active Products</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </Link>

        <Link
          to="/vendor/services"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft hover:shadow-elevated transition-all flex items-center justify-between"
        >
          <div>
            <h4 className="font-bold text-xs text-slate-900">Manage Decor Services</h4>
            <span className="text-xs text-slate-500">{vendorServices.length} Active Packages</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </Link>

        <Link
          to="/vendor/availability"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft hover:shadow-elevated transition-all flex items-center justify-between"
        >
          <div>
            <h4 className="font-bold text-xs text-slate-900">Calendar & Slot Availability</h4>
            <span className="text-xs text-slate-500">Configure Capacity & Blackouts</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </Link>
      </div>
    </div>
  );
};
