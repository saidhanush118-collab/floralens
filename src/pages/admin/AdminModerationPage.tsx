import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Flower2, CalendarCheck, MessageSquare, Trash2, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { StarRating } from '../../components/common/StarRating';

export const AdminModerationPage: React.FC = () => {
  const { products, services, reviews, toggleProductStatus, toggleServiceStatus, deleteReview } = useStore();

  const [activeTab, setActiveTab] = useState<'products' | 'services' | 'reviews'>('products');

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
          Catalog & Content Moderation
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Moderate marketplace product listings, decoration packages, and customer reviews.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('products')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'products' ? 'border-purple-700 text-purple-800' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Flower2 className="w-4 h-4 text-botanical-600" />
          <span>Flower Products ({products.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('services')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'services' ? 'border-purple-700 text-purple-800' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CalendarCheck className="w-4 h-4 text-terracotta-500" />
          <span>Decor Services ({services.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('reviews')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'reviews' ? 'border-purple-700 text-purple-800' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-slate-400" />
          <span>Customer Reviews ({reviews.length})</span>
        </button>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase">
                  <th className="py-3.5 px-6">Product</th>
                  <th className="py-3.5 px-4">Vendor</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Moderation Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt="" className="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <span className="font-semibold text-slate-900 block">{p.name}</span>
                          <span className="text-[11px] text-slate-400">{p.flowerType}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">{p.vendorName}</td>
                    <td className="py-3.5 px-4 font-bold font-sans">₹{(p.salePrice ?? p.basePrice).toLocaleString('en-IN')}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${p.isActive ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
                        {p.isActive ? 'Published' : 'Hidden'}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <button
                        type="button"
                        onClick={() => toggleProductStatus(p.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                          p.isActive
                            ? 'border-red-200 text-red-700 hover:bg-red-50'
                            : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                        }`}
                      >
                        {p.isActive ? 'Hide Listing' : 'Publish Listing'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Services Tab */}
      {activeTab === 'services' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase">
                  <th className="py-3.5 px-6">Service</th>
                  <th className="py-3.5 px-4">Vendor</th>
                  <th className="py-3.5 px-4">Starting Price</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Moderation Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {services.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <img src={s.images[0]} alt="" className="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <span className="font-semibold text-slate-900 block">{s.name}</span>
                          <span className="text-[11px] text-slate-400">{s.eventType}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">{s.vendorName}</td>
                    <td className="py-3.5 px-4 font-bold font-sans">₹{s.basePrice.toLocaleString('en-IN')}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${s.isActive ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
                        {s.isActive ? 'Published' : 'Hidden'}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <button
                        type="button"
                        onClick={() => toggleServiceStatus(s.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                          s.isActive
                            ? 'border-red-200 text-red-700 hover:bg-red-50'
                            : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                        }`}
                      >
                        {s.isActive ? 'Hide Listing' : 'Publish Listing'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <div className="space-y-3">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft flex items-start justify-between gap-4 text-xs"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{rev.userName}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">Reviewed {rev.itemName} ({rev.vendorName})</span>
                  <span className="text-slate-400">•</span>
                  <StarRating rating={rev.rating} size="sm" showNumber={false} />
                </div>
                <p className="text-slate-600 italic">"{rev.comment}"</p>
                <span className="text-[10px] text-slate-400 block">
                  Posted on {new Date(rev.createdAt).toLocaleDateString('en-IN')}
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Delete this review for violation of content policies?')) {
                    deleteReview(rev.id);
                  }
                }}
                className="px-3 py-1.5 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 text-xs font-semibold flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
