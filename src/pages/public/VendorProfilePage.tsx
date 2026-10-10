import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, MapPin, Phone, Mail, Award, Flower2, CalendarCheck, Star, MessageSquare } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { FlowerProductCard } from '../../components/cards/FlowerProductCard';
import { DecorationServiceCard } from '../../components/cards/DecorationServiceCard';
import { StarRating } from '../../components/common/StarRating';

export const VendorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { vendors, products, services, reviews } = useStore();

  const vendor = vendors.find((v) => v.id === id || v.slug === id);

  const [activeTab, setActiveTab] = useState<'all' | 'flowers' | 'decor' | 'reviews'>('all');

  if (!vendor) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-display text-2xl font-bold text-slate-800">Vendor Profile Not Found</h2>
        <p className="text-xs text-slate-500">The requested vendor is currently unavailable.</p>
        <Link to="/" className="inline-block px-5 py-2.5 rounded-full bg-botanical-700 text-white font-semibold text-xs">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  const vendorProducts = products.filter((p) => p.vendorId === vendor.id);
  const vendorServices = services.filter((s) => s.vendorId === vendor.id);
  const vendorReviews = reviews.filter((r) => r.vendorId === vendor.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Banner & Profile Header */}
      <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-soft">
        <div className="h-48 sm:h-64 w-full bg-botanical-900 relative">
          <img src={vendor.bannerUrl} alt={vendor.businessName} className="w-full h-full object-cover opacity-85" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="px-6 sm:px-10 pb-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
            <div className="flex items-end gap-5">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-white flex-shrink-0">
                <img src={vendor.logoUrl} alt={vendor.businessName} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                    {vendor.businessName}
                  </h1>
                  <span title="Bloomora Verified Partner">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-terracotta-500" />
                    {vendor.city}
                  </span>
                  <span>•</span>
                  <span className="capitalize">{vendor.vendorType} Partner</span>
                  {vendor.yearsOfExperience && (
                    <>
                      <span>•</span>
                      <span>{vendor.yearsOfExperience} Years in Service</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-ivory-100 p-3 rounded-2xl border border-slate-200 self-start sm:self-end">
              <div className="text-right">
                <div className="flex items-center gap-1 font-bold text-base text-slate-900">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{vendor.rating}</span>
                </div>
                <span className="text-[11px] text-slate-500">{vendor.reviewCount} customer reviews</span>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed mb-6">
            {vendor.description}
          </p>

          {/* Service Areas */}
          {vendor.serviceAreas.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-xs pt-4 border-t border-slate-100">
              <span className="font-semibold text-slate-700">Delivery & Service Areas:</span>
              {vendor.serviceAreas.map((area, i) => (
                <span key={i} className="bg-botanical-50 text-botanical-800 px-2.5 py-0.5 rounded-full font-medium">
                  {area}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`py-3 px-6 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'all'
              ? 'border-botanical-700 text-botanical-800'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          All Listings ({vendorProducts.length + vendorServices.length})
        </button>
        {vendorProducts.length > 0 && (
          <button
            type="button"
            onClick={() => setActiveTab('flowers')}
            className={`py-3 px-6 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'flowers'
                ? 'border-botanical-700 text-botanical-800'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Flower2 className="w-4 h-4 text-botanical-600" />
            <span>Flowers ({vendorProducts.length})</span>
          </button>
        )}
        {vendorServices.length > 0 && (
          <button
            type="button"
            onClick={() => setActiveTab('decor')}
            className={`py-3 px-6 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'decor'
                ? 'border-botanical-700 text-botanical-800'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <CalendarCheck className="w-4 h-4 text-terracotta-500" />
            <span>Event Decor ({vendorServices.length})</span>
          </button>
        )}
        <button
          type="button"
          onClick={() => setActiveTab('reviews')}
          className={`py-3 px-6 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'reviews'
              ? 'border-botanical-700 text-botanical-800'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-slate-400" />
          <span>Customer Reviews ({vendorReviews.length})</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'all' && (
          <div className="space-y-10">
            {vendorProducts.length > 0 && (
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-4">
                  Fresh Flowers Available from {vendor.businessName}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vendorProducts.map((p) => (
                    <FlowerProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}

            {vendorServices.length > 0 && (
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-4">
                  Event Decoration Services by {vendor.businessName}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vendorServices.map((s) => (
                    <DecorationServiceCard key={s.id} service={s} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'flowers' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendorProducts.map((p) => (
              <FlowerProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {activeTab === 'decor' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendorServices.map((s) => (
              <DecorationServiceCard key={s.id} service={s} />
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vendorReviews.map((rev) => (
              <div key={rev.id} className="p-5 rounded-2xl bg-white border border-slate-100 shadow-soft space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{rev.userName}</span>
                  <StarRating rating={rev.rating} size="sm" showNumber={false} />
                </div>
                <p className="text-xs text-slate-600 italic">"{rev.comment}"</p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span className="text-emerald-700 font-semibold">{rev.itemName}</span>
                  <span>{new Date(rev.createdAt).toLocaleDateString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
