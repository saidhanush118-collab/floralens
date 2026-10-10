import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Flower2, CalendarCheck, Store, ArrowRight, Star } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { FlowerProductCard } from '../../components/cards/FlowerProductCard';
import { DecorationServiceCard } from '../../components/cards/DecorationServiceCard';

export const SearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const initialType = searchParams.get('type') || 'all';

  const { products, services, vendors } = useStore();
  const [activeTab, setActiveTab] = useState<string>(initialType);
  const [searchInput, setSearchInput] = useState(query);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim(), type: activeTab });
    }
  };

  const matchedFlowers = useMemo(() => {
    if (!query) return products.filter((p) => p.isActive);
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.isActive &&
        (p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.flowerType.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.vendorCity.toLowerCase().includes(q))
    );
  }, [products, query]);

  const matchedServices = useMemo(() => {
    if (!query) return services.filter((s) => s.isActive);
    const q = query.toLowerCase();
    return services.filter(
      (s) =>
        s.isActive &&
        (s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.eventType.toLowerCase().includes(q) ||
          s.categoryName.toLowerCase().includes(q) ||
          s.vendorCity.toLowerCase().includes(q))
    );
  }, [services, query]);

  const matchedVendors = useMemo(() => {
    if (!query) return vendors.filter((v) => v.isActive);
    const q = query.toLowerCase();
    return vendors.filter(
      (v) =>
        v.isActive &&
        (v.businessName.toLowerCase().includes(q) ||
          v.city.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.vendorType.toLowerCase().includes(q))
    );
  }, [vendors, query]);

  const totalResults = matchedFlowers.length + matchedServices.length + matchedVendors.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Search Bar */}
      <div className="space-y-4">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
          {query ? (
            <>
              Search Results for <span className="text-botanical-700 font-serif italic">"{query}"</span>
            </>
          ) : (
            'Explore All Marketplace Listings'
          )}
        </h1>
        <p className="text-xs text-slate-500">
          Found <strong>{totalResults}</strong> matching results across flowers, event decor, and local vendors.
        </p>

        <form onSubmit={handleSearchSubmit} className="max-w-xl relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search roses, lilies, birthday decor, mandaps, cities..."
            className="w-full text-xs sm:text-sm pl-10 pr-24 py-3 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-botanical-500 shadow-sm"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-xl bg-botanical-700 text-white text-xs font-semibold"
          >
            Search
          </button>
        </form>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'all'
              ? 'border-botanical-700 text-botanical-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          All Results ({totalResults})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('flowers')}
          className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'flowers'
              ? 'border-botanical-700 text-botanical-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Flower2 className="w-4 h-4 text-botanical-600" />
          <span>Flowers ({matchedFlowers.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('decor')}
          className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'decor'
              ? 'border-botanical-700 text-botanical-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CalendarCheck className="w-4 h-4 text-terracotta-500" />
          <span>Event Decor ({matchedServices.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('vendors')}
          className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'vendors'
              ? 'border-botanical-700 text-botanical-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Store className="w-4 h-4 text-slate-500" />
          <span>Vendors ({matchedVendors.length})</span>
        </button>
      </div>

      {/* Results Content */}
      <div className="space-y-12">
        {(activeTab === 'all' || activeTab === 'flowers') && matchedFlowers.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
                <Flower2 className="w-5 h-5 text-botanical-600" />
                <span>Flowers ({matchedFlowers.length})</span>
              </h2>
              {activeTab === 'all' && (
                <button
                  type="button"
                  onClick={() => setActiveTab('flowers')}
                  className="text-xs font-semibold text-botanical-700 hover:underline"
                >
                  View All Flowers
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {matchedFlowers.slice(0, activeTab === 'all' ? 4 : undefined).map((p) => (
                <FlowerProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'decor') && matchedServices.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-terracotta-500" />
                <span>Event Decoration Services ({matchedServices.length})</span>
              </h2>
              {activeTab === 'all' && (
                <button
                  type="button"
                  onClick={() => setActiveTab('decor')}
                  className="text-xs font-semibold text-botanical-700 hover:underline"
                >
                  View All Decor Services
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {matchedServices.slice(0, activeTab === 'all' ? 4 : undefined).map((s) => (
                <DecorationServiceCard key={s.id} service={s} />
              ))}
            </div>
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'vendors') && matchedVendors.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
                <Store className="w-5 h-5 text-slate-600" />
                <span>Local Vendors ({matchedVendors.length})</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedVendors.map((v) => (
                <Link
                  key={v.id}
                  to={`/vendor-profile/${v.id}`}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft hover:shadow-elevated transition-all flex items-center gap-4"
                >
                  <img src={v.logoUrl} alt={v.businessName} className="w-14 h-14 rounded-2xl object-cover" />
                  <div className="min-w-0">
                    <h4 className="font-display font-semibold text-sm text-slate-900 truncate">
                      {v.businessName}
                    </h4>
                    <span className="text-xs text-slate-500 block">{v.city} • {v.vendorType}</span>
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{v.rating}</span>
                      <span className="text-[11px] text-slate-400 font-normal">({v.reviewCount})</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {totalResults === 0 && (
          <div className="p-12 bg-white rounded-3xl border border-slate-200 text-center max-w-md mx-auto space-y-4">
            <Search className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-display font-bold text-base text-slate-800">No Matching Results</h3>
            <p className="text-xs text-slate-500">
              We couldn't find any listings matching "{query}". Try checking your spelling or searching for general terms like "Roses", "Mandap", or "Birthday".
            </p>
            <Link
              to="/flowers"
              className="inline-block px-5 py-2.5 rounded-full bg-botanical-700 text-white font-semibold text-xs"
            >
              Browse All Flowers
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
