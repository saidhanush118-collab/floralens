import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Store,
  Users,
  Package,
  CalendarCheck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ArrowRight,
  Database,
  ArrowLeft,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { getBackendStatus } from '../../lib/supabase';

export const AdminDashboard: React.FC = () => {
  const { orders, bookings, vendors, vendorApplications, products, services, resetDemoData } = useStore();
  const backend = getBackendStatus();

  const totalFlowerGMV = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.totalAmount : 0), 0);
  const totalDecorGMV = bookings.reduce((sum, b) => sum + (b.status !== 'cancelled' && b.status !== 'rejected' ? b.totalAmount : 0), 0);
  const totalPlatformGMV = totalFlowerGMV + totalDecorGMV;

  const pendingApps = vendorApplications.filter((a) => a.status === 'pending');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back to Marketplace Home Navigation */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-botanical-800 hover:border-botanical-300 shadow-xs transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Marketplace Home</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-botanical-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-purple-300 font-semibold uppercase tracking-wider">
              Platform Administration
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-purple-500/20 text-purple-200 border border-purple-400/30">
              Operations Control
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold mt-1">
            FloraLens Marketplace Operations
          </h1>
          <p className="text-xs text-purple-200 mt-0.5">
            Real-time platform metrics, merchant approvals, content moderation, and revenue tracking.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all demo data back to clean initial factory state?')) {
                resetDemoData();
              }
            }}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs backdrop-blur-sm transition-colors flex items-center gap-1.5"
            title="Reset data for testing"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <Link
            to="/admin/vendors"
            className="px-4 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>Review Applications ({pendingApps.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Backend Diagnostics Pill */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-soft flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-botanical-700 flex-shrink-0" />
          <div>
            <strong className="text-slate-900 block font-semibold">Backend Engine Mode:</strong>
            <span className="text-slate-500">
              {backend.isSupabaseConfigured
                ? `PostgreSQL Connected: ${backend.supabaseUrl}`
                : 'Demo Mode: Full Client-Side Store Engine with LocalStorage Persistence & Strict Transaction Simulation'}
            </span>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase ${
            backend.isSupabaseConfigured
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-amber-50 text-amber-800 border border-amber-200'
          }`}
        >
          {backend.mode}
        </span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Gross Merchandise Value</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="font-display text-2xl sm:text-3xl font-bold font-sans text-slate-900 block">
            ₹{totalPlatformGMV.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Flowers: ₹{totalFlowerGMV.toLocaleString('en-IN')} • Decor: ₹{totalDecorGMV.toLocaleString('en-IN')}
          </span>
        </div>

        <Link
          to="/admin/vendors"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft hover:shadow-elevated transition-all"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Active Merchants</span>
            <Store className="w-4 h-4 text-purple-600" />
          </div>
          <span className="font-display text-2xl sm:text-3xl font-bold font-sans text-slate-900 block">
            {vendors.filter((v) => v.status === 'approved').length}
          </span>
          <span className="text-[11px] text-purple-700 font-semibold mt-1 block">
            {pendingApps.length} Applications Pending Review
          </span>
        </Link>

        <Link
          to="/admin/orders-bookings"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft hover:shadow-elevated transition-all"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Total Transactions</span>
            <Package className="w-4 h-4 text-botanical-700" />
          </div>
          <span className="font-display text-2xl sm:text-3xl font-bold font-sans text-slate-900 block">
            {orders.length + bookings.length}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {orders.length} Flower Orders • {bookings.length} Bookings
          </span>
        </Link>

        <Link
          to="/admin/moderation"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft hover:shadow-elevated transition-all"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Catalog Items</span>
            <ShieldCheck className="w-4 h-4 text-blue-600" />
          </div>
          <span className="font-display text-2xl sm:text-3xl font-bold font-sans text-slate-900 block">
            {products.length + services.length}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {products.length} Products • {services.length} Decor Listings
          </span>
        </Link>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Pending Vendor Applications */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
              <Store className="w-4 h-4 text-purple-700" />
              <span>Pending Vendor Applications ({pendingApps.length})</span>
            </h3>
            <Link to="/admin/vendors" className="text-xs font-semibold text-purple-700 hover:underline">
              Manage All
            </Link>
          </div>

          {pendingApps.length > 0 ? (
            <div className="space-y-3">
              {pendingApps.map((app) => (
                <div key={app.id} className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900">{app.businessName}</h4>
                    <span className="text-slate-500 text-[11px] block">
                      {app.city} • {app.vendorType.toUpperCase()} • {app.yearsExperience} yrs exp
                    </span>
                    <span className="text-slate-400 text-[10px] block mt-0.5">
                      Contact: {app.phone} • {app.email}
                    </span>
                  </div>

                  <Link
                    to="/admin/vendors"
                    className="px-3.5 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs shadow-xs"
                  >
                    Review &rarr;
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              No pending vendor applications awaiting review.
            </div>
          )}
        </div>

        {/* Quick Platform Controls */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-botanical-700" />
              <span>Operational Controls & Moderation</span>
            </h3>
          </div>

          <div className="space-y-2.5 text-xs">
            <Link
              to="/admin/vendors"
              className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 flex items-center justify-between transition-colors"
            >
              <div>
                <strong className="text-slate-900 block font-semibold">Vendor Approval Queue</strong>
                <span className="text-slate-500">Approve or decline merchant applications and verify licenses</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              to="/admin/moderation"
              className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 flex items-center justify-between transition-colors"
            >
              <div>
                <strong className="text-slate-900 block font-semibold">Listing Moderation</strong>
                <span className="text-slate-500">Toggle visibility of products, decor designs, and client reviews</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              to="/admin/orders-bookings"
              className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 flex items-center justify-between transition-colors"
            >
              <div>
                <strong className="text-slate-900 block font-semibold">Platform Financial Transactions</strong>
                <span className="text-slate-500">Monitor order disbursements, booking deposits, and refund requests</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
