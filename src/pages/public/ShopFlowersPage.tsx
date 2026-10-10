import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown, X, Flower2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { FlowerProductCard } from '../../components/cards/FlowerProductCard';

export const ShopFlowersPage: React.FC = () => {
  const { products, vendors } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state initialized from query params
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get('q') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('flowerType') || 'All');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || 'All');
  const [selectedVendor, setSelectedVendor] = useState('All');
  const [minRating, setMinRating] = useState<number>(0);
  const [priceSort, setPriceSort] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(() => {
    const p = searchParams.get('maxPrice');
    return p ? parseInt(p, 10) : 6000;
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const flowerTypes = ['All', 'Roses', 'Lilies', 'Orchids', 'Carnations', 'Mixed'];
  const cities = ['All', 'Bangalore', 'Mumbai', 'Delhi NCR', 'Jaipur', 'Chennai'];

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product.isActive) return false;

      // Keyword match
      if (searchKeyword.trim()) {
        const query = searchKeyword.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesFlower = product.flowerType.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesFlower) return false;
      }

      // Flower Type
      if (selectedType !== 'All' && product.flowerType.toLowerCase() !== selectedType.toLowerCase()) {
        return false;
      }

      // City
      if (selectedCity !== 'All' && product.vendorCity.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      // Vendor
      if (selectedVendor !== 'All' && product.vendorId !== selectedVendor) {
        return false;
      }

      // Price
      const effectivePrice = product.salePrice ?? product.basePrice;
      if (effectivePrice > maxPrice) {
        return false;
      }

      // Rating
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice ?? a.basePrice;
      const priceB = b.salePrice ?? b.basePrice;
      if (priceSort === 'price-asc') return priceA - priceB;
      if (priceSort === 'price-desc') return priceB - priceA;
      if (priceSort === 'rating') return b.rating - a.rating;
      return b.isFeatured ? 1 : -1;
    });
  }, [products, searchKeyword, selectedType, selectedCity, selectedVendor, maxPrice, minRating, priceSort]);

  const resetFilters = () => {
    setSearchKeyword('');
    setSelectedType('All');
    setSelectedCity('All');
    setSelectedVendor('All');
    setMaxPrice(6000);
    setMinRating(0);
    setPriceSort('featured');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-botanical-800 to-botanical-700 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-md">
        <div className="relative z-10 max-w-xl space-y-2">
          <span className="text-xs font-semibold text-blush-200 uppercase tracking-wider">
            Daily Farm Harvest
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold">
            Fresh Flower Bouquets & Gifts
          </h1>
          <p className="text-xs sm:text-sm text-botanical-100 leading-relaxed">
            Handcrafted with freshly cut Dutch roses, fragrant Asiatic lilies, exotic orchids and carnations. Sourced directly from local farms.
          </p>
        </div>
      </div>

      {/* Control Strip */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-soft">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search flower name, type, or occasion..."
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

        {/* Filter Toggle Mobile & Sort */}
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
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value as any)}
              className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer py-1"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid & Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside
          className={`lg:block ${
            showMobileFilters ? 'block' : 'hidden'
          } bg-white rounded-2xl p-6 border border-slate-200 shadow-soft space-y-6`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-display font-semibold text-slate-900 text-sm flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-botanical-700" />
              <span>Filters</span>
            </h3>
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs text-terracotta-600 hover:text-terracotta-700 font-semibold"
            >
              Reset All
            </button>
          </div>

          {/* Flower Type */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Flower Type
            </label>
            <div className="space-y-1.5">
              {flowerTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedType === type
                      ? 'bg-botanical-100 text-botanical-900 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{type}</span>
                  {selectedType === type && <span className="w-1.5 h-1.5 rounded-full bg-botanical-700" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              <span>Max Price</span>
              <span className="font-sans text-botanical-700 font-bold">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="800"
              max="6000"
              step="200"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
              className="w-full accent-botanical-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>₹800</span>
              <span>₹6,000</span>
            </div>
          </div>

          {/* Delivery City */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              City
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

          {/* Florist Vendor */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Florist Shop
            </label>
            <select
              value={selectedVendor}
              onChange={(e) => setSelectedVendor(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none"
            >
              <option value="All">All Florists</option>
              {vendors
                .filter((v) => v.vendorType === 'florist' || v.vendorType === 'hybrid')
                .map((v) => (
                  <option key={v.id} value={v.id}>{v.businessName}</option>
                ))}
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Minimum Rating
            </label>
            <div className="flex gap-2">
              {[0, 4.0, 4.5, 4.8].map((rat) => (
                <button
                  key={rat}
                  type="button"
                  onClick={() => setMinRating(rat)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border ${
                    minRating === rat
                      ? 'border-botanical-600 bg-botanical-50 text-botanical-800'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {rat === 0 ? 'All' : `${rat}★+`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-slate-500 font-medium">
              Showing <strong className="text-slate-800">{filteredProducts.length}</strong> fresh flower arrangements
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <FlowerProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-soft max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-botanical-50 text-botanical-700 flex items-center justify-center mx-auto">
                <Flower2 className="w-8 h-8" />
              </div>
              <h3 className="font-display font-semibold text-lg text-slate-900">
                No Flowers Found
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                No active flower products match your current search and filter criteria. Try adjusting the price slider or resetting filters.
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
