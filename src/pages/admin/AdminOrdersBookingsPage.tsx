import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, CalendarCheck, Search, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminOrdersBookingsPage: React.FC = () => {
  const { orders, bookings } = useStore();

  const [activeTab, setActiveTab] = useState<'all' | 'orders' | 'bookings'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allTransactions = [
    ...orders.map((o) => ({
      id: o.id,
      ref: o.orderNumber,
      type: 'flower' as const,
      customer: o.customerName,
      vendor: o.vendorName,
      amount: o.totalAmount,
      status: o.status,
      date: o.createdAt,
      paymentRef: o.paymentReference,
    })),
    ...bookings.map((b) => ({
      id: b.id,
      ref: b.bookingReference,
      type: 'decoration' as const,
      customer: b.customerName,
      vendor: b.vendorName,
      amount: b.totalAmount,
      status: b.status,
      date: b.createdAt,
      paymentRef: b.paymentReference,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filtered = allTransactions.filter((t) => {
    if (activeTab === 'orders' && t.type !== 'flower') return false;
    if (activeTab === 'bookings' && t.type !== 'decoration') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.ref.toLowerCase().includes(q) ||
        t.customer.toLowerCase().includes(q) ||
        t.vendor.toLowerCase().includes(q) ||
        (t.paymentRef && t.paymentRef.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back to Admin Dashboard */}
      <div>
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-purple-800 hover:border-purple-300 shadow-xs transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Admin Dashboard</span>
        </Link>
      </div>

      <div className="pb-4 border-b border-slate-200">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
          Platform Transactions & Fulfillment Audit
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Real-time oversight of all flower orders and event decoration bookings.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex border-b sm:border-0 border-slate-200 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`py-2 px-3.5 text-xs font-bold rounded-xl transition-colors ${
              activeTab === 'all' ? 'bg-purple-700 text-white' : 'bg-white border border-slate-200 text-slate-700'
            }`}
          >
            All Transactions ({allTransactions.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`py-2 px-3.5 text-xs font-bold rounded-xl transition-colors ${
              activeTab === 'orders' ? 'bg-purple-700 text-white' : 'bg-white border border-slate-200 text-slate-700'
            }`}
          >
            Flower Orders ({orders.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`py-2 px-3.5 text-xs font-bold rounded-xl transition-colors ${
              activeTab === 'bookings' ? 'bg-purple-700 text-white' : 'bg-white border border-slate-200 text-slate-700'
            }`}
          >
            Decor Bookings ({bookings.length})
          </button>
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search ref, customer, vendor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase">
                <th className="py-3.5 px-6">Reference</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Vendor</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Payment Ref</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-6 font-mono font-bold text-slate-900">#{t.ref}</td>
                  <td className="py-3.5 px-4">
                    <span className="flex items-center gap-1 capitalize font-medium text-slate-700">
                      {t.type === 'flower' ? (
                        <Package className="w-3.5 h-3.5 text-botanical-700" />
                      ) : (
                        <CalendarCheck className="w-3.5 h-3.5 text-terracotta-500" />
                      )}
                      {t.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{t.customer}</td>
                  <td className="py-3.5 px-4 text-slate-600">{t.vendor}</td>
                  <td className="py-3.5 px-4 font-bold font-sans text-slate-900">
                    ₹{t.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        t.status === 'delivered' || t.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-800'
                          : t.status === 'cancelled' || t.status === 'rejected'
                          ? 'bg-red-50 text-red-800'
                          : 'bg-amber-50 text-amber-800'
                      }`}
                    >
                      {t.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right font-mono text-slate-500 text-[11px]">
                    {t.paymentRef || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
