import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown, X, CalendarCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { DecorationServiceCard } from '../../components/cards/DecorationServiceCard';

export const DecorationServicesPage: React.FC = () => {
  const { services, vendors } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchKeyword, setSearchKeyword] = useState(searchParams.get('q') || '');
  const [selectedEventType, setSelectedEventType] = useState(searchParams.get('eventType') || 'All');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || 'All');
  const [selectedVendor, setSelectedVendor] = useState('All');
  const [maxPrice, setMaxPrice] = useState<number>(80000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const eventTypes = ['All', 'Birthday', 'Wedding', 'Anniversary', 'Engagement', 'Car Decor', 'Baby Shower', 'Surprise'];
  const cities = ['All', 'Bangalore', 'Mumbai', 'Delhi NCR', 'Jaipur', 'Chennai'];

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      if (!service.isActive) return false;

      if (searchKeyword.trim()) {
        const q = searchKeyword.toLowerCase();
        const matchesName = service.name.toLowerCase().includes(q);
        const matchesDesc = service.description.toLowerCase().includes(q);
        const matchesType = service.eventType.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesType) return false;
      }

      if (selectedEventType !== 'All' && service.eventType.toLowerCase() !== selectedEventType.toLowerCase()) {
        return false;
      }

      if (selectedCity !== 'All' && service.vendorCity.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      if (selectedVendor !== 'All' && service.vendorId !== selectedVendor) {
        return false;
      }

      if (service.basePrice > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.isFeatured ? 1 : -1;
    });
  }, [services, searchKeyword, selectedEventType, selectedCity, selectedVendor, maxPrice, sortBy]);

  const resetFilters = () => {
    setSearchKeyword('');
    setSelectedEventType('All');
    setSelectedCity('All');
    setSelectedVendor('All');
    setMaxPrice(80000);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-botanical-900 via-botanical-800 to-botanical-950 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-md">
        <div className="relative z-10 max-w-xl space-y-2">
          <span className="text-xs font-semibold text-blush-300 uppercase tracking-wider">
            Verified Event Decorators
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold">
            Bespoke Event Decoration Services
          </h1>
          <p className="text-xs sm:text-sm text-botanical-200 leading-relaxed">
            Reserve certified event stylists for grand mandaps, milestone birthdays, romantic cabanas, and family celebrations across India.
          </p>
        </div>
      </div>

      {/* Control Strip */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-soft">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search wedding mandap, balloon arch, cabana, car decor..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-botanical-500"
          />
          {searchKeyword && (
            <button
              onClick={() => setSearchKeyword('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 justify-between md:justify-end">
          <button
            type="button"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-ivory-50"
          >
            <SlidersHorizontal className="w-4 h-4 text-botanical-700" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer py-1"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated Stylists</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid & Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar Filters */}
        <aside
          className={`lg:block ${
            showMobileFilters ? 'block' : 'hidden'
          } bg-white rounded-2xl p-6 border border-slate-200 shadow-soft space-y-6`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-display font-semibold text-slate-900 text-sm flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-botanical-700" />
              <span>Event Filters</span>
            </h3>
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs text-terracotta-600 hover:text-terracotta-700 font-semibold"
            >
              Reset All
            </button>
          </div>

          {/* Event Occasion */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Event Occasion
            </label>
            <div className="space-y-1.5">
              {eventTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedEventType(type)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedEventType === type
                      ? 'bg-botanical-100 text-botanical-900 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{type}</span>
                  {selectedEventType === type && <span className="w-1.5 h-1.5 rounded-full bg-botanical-700" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              <span>Max Starting Budget</span>
              <span className="font-sans text-botanical-700 font-bold">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="4000"
              max="80000"
              step="2000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
              className="w-full accent-botanical-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>₹4,000</span>
              <span>₹80,000</span>
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Event City
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none"
            >
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Decorator Agency */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Stylist Vendor
            </label>
            <select
              value={selectedVendor}
              onChange={(e) => setSelectedVendor(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none"
            >
              <option value="All">All Decorators</option>
              {vendors
                .filter((v) => v.vendorType === 'decorator' || v.vendorType === 'hybrid')
                .map((v) => (
                  <option key={v.id} value={v.id}>{v.businessName}</option>
                ))}
            </select>
          </div>
        </aside>

        {/* Services Grid Area */}
        <main className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-slate-500 font-medium">
              Showing <strong className="text-slate-800">{filteredServices.length}</strong> decoration services & packages
            </p>
          </div>

          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <DecorationServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-soft max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-botanical-50 text-botanical-700 flex items-center justify-center mx-auto">
                <CalendarCheck className="w-8 h-8" />
              </div>
              <h3 className="font-display font-semibold text-lg text-slate-900">
                No Decor Services Found
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                No active decoration setups match your current search and budget criteria. Try resetting filters.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-full bg-botanical-700 text-white font-semibold text-xs shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
