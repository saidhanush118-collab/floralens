import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flower2,
  CalendarCheck,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Truck,
  HeartHandshake,
  Star,
  Store,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { FlowerProductCard } from '../../components/cards/FlowerProductCard';
import { DecorationServiceCard } from '../../components/cards/DecorationServiceCard';
import { StarRating } from '../../components/common/StarRating';

export const HomePage: React.FC = () => {
  const { products, services, categories, reviews, vendors } = useStore();
  const navigate = useNavigate();

  // Hero Search Panel State
  const [activeSearchTab, setActiveSearchTab] = useState<'flower' | 'decor'>('flower');
  const [searchFlowerType, setSearchFlowerType] = useState('All');
  const [searchEventType, setSearchEventType] = useState('All');
  const [searchCity, setSearchCity] = useState('Bangalore');
  const [maxBudget, setMaxBudget] = useState('5000');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeSearchTab === 'flower') {
      const query = new URLSearchParams();
      if (searchFlowerType !== 'All') query.set('flowerType', searchFlowerType);
      if (searchCity) query.set('city', searchCity);
      if (maxBudget) query.set('maxPrice', maxBudget);
      navigate(`/flowers?${query.toString()}`);
    } else {
      const query = new URLSearchParams();
      if (searchEventType !== 'All') query.set('eventType', searchEventType);
      if (searchCity) query.set('city', searchCity);
      navigate(`/decorations?${query.toString()}`);
    }
  };

  const featuredFlowers = products.filter((p) => p.isFeatured || p.rating >= 4.9).slice(0, 4);
  const featuredServices = services.filter((s) => s.isFeatured || s.rating >= 4.9).slice(0, 4);
  const flowerCategories = categories.filter((c) => c.type === 'flower');
  const decorCategories = categories.filter((c) => c.type === 'decoration');

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[640px] pt-12 pb-20 flex items-center bg-gradient-to-b from-ivory-200/90 via-blush-50/40 to-ivory-100">
        {/* Decorative background blobs */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-botanical-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blush-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-botanical-100/80 border border-botanical-200 text-botanical-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-botanical-600" />
                <span>India’s First Unified Floral & Event Decor Marketplace</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-botanical-950 tracking-tight leading-[1.12]">
                Every Celebration <br />
                <span className="italic font-normal text-botanical-700">Deserves to</span> Bloom.
              </h1>

              <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
                Handpicked farm-fresh bouquets delivered in 2 hours, and vetted local decorators for unforgettable birthdays, weddings, anniversaries & celebrations.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/flowers"
                  className="px-6 py-3.5 rounded-full bg-botanical-700 hover:bg-botanical-800 active:scale-95 text-white font-semibold text-sm shadow-md shadow-botanical-900/10 transition-all flex items-center gap-2"
                >
                  <Flower2 className="w-4 h-4 text-blush-200" />
                  <span>Shop Fresh Flowers</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/decorations"
                  className="px-6 py-3.5 rounded-full bg-white hover:bg-ivory-50 border border-slate-300 text-slate-800 font-semibold text-sm shadow-sm transition-all flex items-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4 text-terracotta-500" />
                  <span>Book Event Decorators</span>
                </Link>
              </div>

              {/* Trust Micro-Metrics */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-8 text-xs text-slate-500 border-t border-slate-200/60 max-w-lg mx-auto lg:mx-0">
                <div>
                  <span className="block font-bold text-slate-800 text-base">5,000+</span>
                  <span>Happy Celebrations</span>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div>
                  <span className="block font-bold text-slate-800 text-base">100%</span>
                  <span>Fresh Farm Blooms</span>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div>
                  <span className="block font-bold text-slate-800 text-base">4.9 / 5</span>
                  <span>Verified Rating</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Search Panel */}
            <div className="lg:col-span-5">
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-elevated border border-botanical-100 relative">
                <div className="absolute -top-3 right-6 bg-terracotta-500 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-sm">
                  Instant Availability Finder
                </div>

                {/* Tabs */}
                <div className="flex rounded-2xl bg-ivory-200/80 p-1 mb-6">
                  <button
                    type="button"
                    onClick={() => setActiveSearchTab('flower')}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      activeSearchTab === 'flower'
                        ? 'bg-white text-botanical-800 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Flower2 className="w-4 h-4 text-botanical-600" />
                    <span>Find Flowers</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSearchTab('decor')}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      activeSearchTab === 'decor'
                        ? 'bg-white text-botanical-800 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <CalendarCheck className="w-4 h-4 text-terracotta-500" />
                    <span>Book Decorator</span>
                  </button>
                </div>

                {/* Search Form */}
                <form onSubmit={handleHeroSearch} className="space-y-4">
                  {activeSearchTab === 'flower' ? (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Flower Variety
                        </label>
                        <select
                          value={searchFlowerType}
                          onChange={(e) => setSearchFlowerType(e.target.value)}
                          className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-botanical-500"
                        >
                          <option value="All">All Varieties (Roses, Lilies, Orchids...)</option>
                          <option value="Roses">Dutch Roses</option>
                          <option value="Lilies">Casablanca Lilies</option>
                          <option value="Orchids">Exotic Orchids</option>
                          <option value="Mixed">Mixed Bouquets</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Delivery City
                          </label>
                          <select
                            value={searchCity}
                            onChange={(e) => setSearchCity(e.target.value)}
                            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-botanical-500"
                          >
                            <option value="Bangalore">Bangalore</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Delhi NCR">Delhi NCR</option>
                            <option value="Jaipur">Jaipur</option>
                            <option value="Chennai">Chennai</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Max Budget
                          </label>
                          <select
                            value={maxBudget}
                            onChange={(e) => setMaxBudget(e.target.value)}
                            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-botanical-500"
                          >
                            <option value="1500">Under ₹1,500</option>
                            <option value="2500">Under ₹2,500</option>
                            <option value="5000">Under ₹5,000</option>
                            <option value="10000">Luxury (Any)</option>
                          </select>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Occasion / Event Type
                        </label>
                        <select
                          value={searchEventType}
                          onChange={(e) => setSearchEventType(e.target.value)}
                          className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-botanical-500"
                        >
                          <option value="All">All Occasions</option>
                          <option value="Birthday">Birthday Celebrations</option>
                          <option value="Wedding">Weddings & Mandaps</option>
                          <option value="Anniversary">Romantic Anniversaries</option>
                          <option value="Engagement">Engagements & Roka</option>
                          <option value="Car Decor">Wedding Car Decor</option>
                          <option value="Surprise">Room / Terrace Surprise</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Event City
                          </label>
                          <select
                            value={searchCity}
                            onChange={(e) => setSearchCity(e.target.value)}
                            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-botanical-500"
                          >
                            <option value="Bangalore">Bangalore</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Delhi NCR">Delhi NCR</option>
                            <option value="Jaipur">Jaipur</option>
                            <option value="Chennai">Chennai</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Event Date
                          </label>
                          <input
                            type="date"
                            defaultValue={new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]}
                            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-botanical-500"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-botanical-800 hover:bg-botanical-900 active:scale-95 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search Verified Listings</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLOWER CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-bold text-botanical-600 tracking-wider uppercase">Artisanal Florals</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Explore Flower Collections
            </h2>
          </div>
          <Link
            to="/flowers"
            className="text-xs sm:text-sm font-semibold text-botanical-700 hover:text-botanical-900 flex items-center gap-1"
          >
            <span>View All Flowers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {flowerCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/flowers?category=${cat.id}`}
              className="group relative rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-soft hover:shadow-elevated transition-all p-3 text-center flex flex-col items-center"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 bg-ivory-200">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="font-display text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-botanical-700 transition-colors">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED FLOWERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-bold text-botanical-600 tracking-wider uppercase">Bestsellers</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Trending Bouquets & Floral Boxes
            </h2>
          </div>
          <Link
            to="/flowers"
            className="text-xs sm:text-sm font-semibold text-botanical-700 hover:text-botanical-900 flex items-center gap-1"
          >
            <span>Browse Complete Shop</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredFlowers.map((flower) => (
            <FlowerProductCard key={flower.id} product={flower} />
          ))}
        </div>
      </section>

      {/* DECORATION CATEGORIES SECTION */}
      <section className="bg-botanical-900 py-16 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
            <div>
              <span className="text-xs font-bold text-blush-300 tracking-wider uppercase">Professional Decorators</span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                Event Decoration Services
              </h2>
            </div>
            <Link
              to="/decorations"
              className="text-xs sm:text-sm font-semibold text-blush-200 hover:text-white flex items-center gap-1"
            >
              <span>Explore All Decor Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {decorCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/decorations?category=${cat.id}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-botanical-800 border border-botanical-700/60 shadow-lg"
              >
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-85"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-3.5">
                  <h4 className="font-display text-xs sm:text-sm font-semibold text-white group-hover:text-blush-200 transition-colors">
                    {cat.name}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR EVENT PACKAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-bold text-botanical-600 tracking-wider uppercase">Book With Confidence</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Top-Rated Event Decoration Setups
            </h2>
          </div>
          <Link
            to="/decorations"
            className="text-xs sm:text-sm font-semibold text-botanical-700 hover:text-botanical-900 flex items-center gap-1"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service) => (
            <DecorationServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* POPULAR DECORATORS & FLORISTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-botanical-600 tracking-wider uppercase">Local Artisans</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Meet Our Verified Local Vendors
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Every vendor on Bloomora undergoes strict verification of portfolio, reviews, and setup reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vendors.slice(0, 3).map((vendor) => (
            <Link
              key={vendor.id}
              to={`/vendor-profile/${vendor.id}`}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-soft hover:shadow-elevated transition-all flex flex-col"
            >
              <div className="h-32 w-full overflow-hidden relative bg-botanical-800">
                <img
                  src={vendor.bannerUrl}
                  alt={vendor.businessName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize">
                  {vendor.vendorType}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col -mt-8 relative">
                <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-md bg-white mb-3">
                  <img src={vendor.logoUrl} alt={vendor.businessName} className="w-full h-full object-cover" />
                </div>

                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-display font-semibold text-slate-900 group-hover:text-botanical-700 transition-colors">
                    {vendor.businessName}
                  </h4>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{vendor.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                  {vendor.description}
                </p>

                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-medium text-botanical-700">{vendor.city}</span>
                  <span className="text-[11px] text-slate-400">{vendor.reviewCount} reviews</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-ivory-200/60 py-16 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-botanical-600 tracking-wider uppercase">Seamless Process</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              How Bloomora Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              From fresh farm stems to lavish event stages, enjoy a stress-free celebration in 4 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 text-center shadow-soft border border-slate-100 relative">
              <div className="w-12 h-12 rounded-2xl bg-botanical-100 text-botanical-800 font-bold text-lg flex items-center justify-center mx-auto mb-4 font-display">
                1
              </div>
              <h4 className="font-display font-semibold text-slate-900 text-sm mb-1">Discover & Compare</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Browse hand-arranged bouquets or designer decoration themes with transparent prices in INR.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-soft border border-slate-100 relative">
              <div className="w-12 h-12 rounded-2xl bg-botanical-100 text-botanical-800 font-bold text-lg flex items-center justify-center mx-auto mb-4 font-display">
                2
              </div>
              <h4 className="font-display font-semibold text-slate-900 text-sm mb-1">Pick Date & Venue</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Select your delivery address or reserve an open decorator slot with real-time double-booking protection.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-soft border border-slate-100 relative">
              <div className="w-12 h-12 rounded-2xl bg-botanical-100 text-botanical-800 font-bold text-lg flex items-center justify-center mx-auto mb-4 font-display">
                3
              </div>
              <h4 className="font-display font-semibold text-slate-900 text-sm mb-1">Secure Payment</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pay seamlessly with UPI, Cards or Netbanking with instant order verification and tracking reference.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-soft border border-slate-100 relative">
              <div className="w-12 h-12 rounded-2xl bg-botanical-100 text-botanical-800 font-bold text-lg flex items-center justify-center mx-auto mb-4 font-display">
                4
              </div>
              <h4 className="font-display font-semibold text-slate-900 text-sm mb-1">Celebrate in Bloom</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Receive prompt doorstep delivery or welcome our skilled crew for on-time decoration setup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE BLOOMORA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-botanical-600 tracking-wider uppercase">Uncompromising Quality</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-1 leading-tight">
                Why Thousands Choose Bloomora For Life’s Precious Milestones
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 flex-shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-900">Farm-Direct Morning Harvest</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    No wilted warehouse inventory. Our partner florists harvest stems at dawn for peak petal vitality and longer vase life.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-900">Double-Booking Slot Constraint Engine</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Our database prevents overlapping event bookings. When your wedding or anniversary slot is confirmed, it is locked exclusively for you.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 flex-shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-900">Transparent Pricing in INR (₹)</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    No hidden last-minute surprises. Complete breakdown of packages, custom add-ons, and delivery upfront.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-elevated border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
                alt="Event Decoration Setup"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 max-w-xs flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-botanical-100 text-botanical-800 flex items-center justify-center font-bold text-xl font-display">
                ₹0
              </div>
              <div>
                <h5 className="font-semibold text-xs text-slate-900">Free Express Delivery</h5>
                <p className="text-[11px] text-slate-500">On all flower orders above ₹999 with code BLOOM10</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VERIFIED REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-botanical-600 tracking-wider uppercase">Real Celebrations</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Loved By Celebrators Across India
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.slice(0, 4).map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-soft flex flex-col justify-between"
            >
              <div>
                <StarRating rating={rev.rating} size="sm" showNumber={false} />
                <p className="text-xs text-slate-600 mt-3 italic leading-relaxed line-clamp-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={rev.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                  alt={rev.userName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <h5 className="text-xs font-bold text-slate-900 truncate">{rev.userName}</h5>
                  <span className="text-[10px] text-emerald-700 font-medium block">
                    Verified Purchase • {rev.itemName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VENDOR PARTNER CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-botanical-800 via-botanical-700 to-botanical-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-elevated">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="bg-white/10 text-blush-200 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block">
              For Florists & Decorators
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold leading-tight">
              Grow Your Business With India’s Premier Floral Marketplace
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Reach thousands of customers looking for wedding mandaps, party decor, and fresh bouquets in your city. Keep 90% of your earnings with instant weekly payouts.
            </p>
            <div className="pt-2">
              <Link
                to="/vendor/register"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-botanical-900 hover:bg-ivory-100 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <Store className="w-4 h-4 text-botanical-700" />
                <span>Apply as a Vendor Partner</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
