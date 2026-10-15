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
  HeartHandshake,
  Star,
  Store,
  Gift,
  Heart,
  PartyPopper,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { FlowerProductCard } from '../../components/cards/FlowerProductCard';
import { DecorationServiceCard } from '../../components/cards/DecorationServiceCard';
import { StarRating } from '../../components/common/StarRating';

interface OccasionCard {
  title: string;
  subtitle: string;
  flowerLink: string;
  decorLink: string;
  imageUrl: string;
  tag: string;
  icon: React.ReactNode;
}

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

  // Phase 3.6 - Supported Occasions with live routing
  const occasions: OccasionCard[] = [
    {
      title: 'Birthdays',
      subtitle: 'Vibrant celebratory blooms & balloon arches',
      flowerLink: '/flowers?category=cat-bouquets',
      decorLink: '/decorations?eventType=Birthday',
      imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80',
      tag: 'Festive',
      icon: <PartyPopper className="w-3.5 h-3.5 text-brand-rose" />,
    },
    {
      title: 'Anniversaries',
      subtitle: 'Velvety crimson roses & intimate cabanas',
      flowerLink: '/flowers?category=cat-roses',
      decorLink: '/decorations?eventType=Anniversary',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
      tag: 'Romantic',
      icon: <Heart className="w-3.5 h-3.5 text-brand-rose" />,
    },
    {
      title: 'Weddings',
      subtitle: 'Grand mandaps, stage floral arches & garlands',
      flowerLink: '/flowers?category=cat-orchids',
      decorLink: '/decorations?eventType=Wedding',
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      tag: 'Grand',
      icon: <Sparkles className="w-3.5 h-3.5 text-amber-500" />,
    },
    {
      title: 'Engagements',
      subtitle: 'Floral ring frames & pastel backdrop styling',
      flowerLink: '/flowers?category=cat-lilies',
      decorLink: '/decorations?eventType=Engagement',
      imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
      tag: 'Ceremonial',
      icon: <Sparkles className="w-3.5 h-3.5 text-brand-forest" />,
    },
    {
      title: 'Celebrations',
      subtitle: 'Housewarmings, baby showers & joyful milestones',
      flowerLink: '/flowers',
      decorLink: '/decorations?eventType=Birthday',
      imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=600&q=80',
      tag: 'Joyful',
      icon: <Gift className="w-3.5 h-3.5 text-brand-forest" />,
    },
    {
      title: 'Romantic Surprises',
      subtitle: 'Midnight terrace candle setups & flower hampers',
      flowerLink: '/flowers?category=cat-roses',
      decorLink: '/decorations?eventType=Surprise',
      imageUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80',
      tag: 'Intimate',
      icon: <Heart className="w-3.5 h-3.5 text-red-500" />,
    },
    {
      title: 'Everyday Gifting',
      subtitle: 'Artisanal blooms with chocolates & handwritten cards',
      flowerLink: '/flowers?category=cat-gifts',
      decorLink: '/flowers',
      imageUrl: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80',
      tag: 'Warmth',
      icon: <Flower2 className="w-3.5 h-3.5 text-brand-rose" />,
    },
  ];

  return (
    <div className="space-y-20 pb-20 overflow-hidden bg-brand-ivory text-brand-text">
      {/* HERO SECTION (Phase 3.3) */}
      <section className="relative min-h-[640px] pt-12 pb-20 flex items-center bg-gradient-to-b from-brand-ivory via-brand-blush/30 to-white border-b border-brand-border/60">
        {/* Soft botanical ambiance glow */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-brand-sage/40 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-brand-blush/50 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-sage/60 border border-brand-forest/20 text-brand-forest text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-brand-forest" />
                <span>India’s Unified Floral & Event Decor Marketplace</span>
              </div>

              {/* Exact Master Prompt Headline & Subtext */}
              <h1 className="font-display font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-forest tracking-tight leading-[1.12]">
                Every Moment <br />
                <span className="italic font-normal text-brand-botanical">Deserves to</span> Bloom.
              </h1>

              <p className="text-brand-muted text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
                Discover beautiful flowers, thoughtful floral gifts, and unforgettable decorations for life's most meaningful moments.
              </p>

              {/* Exact Master Prompt CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/flowers"
                  className="px-6 py-3.5 rounded-full bg-brand-forest hover:bg-brand-botanical active:scale-95 text-white font-semibold text-sm shadow-md shadow-brand-forest/20 transition-all flex items-center gap-2"
                >
                  <Flower2 className="w-4 h-4 text-brand-blush" />
                  <span>Shop Flowers</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/decorations"
                  className="px-6 py-3.5 rounded-full bg-white hover:bg-brand-ivory border border-brand-border text-brand-text font-semibold text-sm shadow-sm transition-all flex items-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4 text-brand-rose" />
                  <span>Explore Decorations</span>
                </Link>
              </div>

              {/* Real Value Badges (Phase 3.9 - No Fabricated Metrics) */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-brand-muted border-t border-brand-border/80 max-w-lg mx-auto lg:mx-0">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-forest" />
                  <span className="font-medium text-brand-text">100% Farm-Fresh Stems</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-forest" />
                  <span className="font-medium text-brand-text">Double-Booking Guard</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-forest" />
                  <span className="font-medium text-brand-text">Transparent INR Pricing</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Search Panel */}
            <div className="lg:col-span-5">
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-elevated border border-brand-border relative">
                <div className="absolute -top-3 right-6 bg-brand-forest text-brand-ivory text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-sm">
                  Instant Availability Finder
                </div>

                {/* Tabs */}
                <div className="flex rounded-2xl bg-brand-ivory p-1 mb-6 border border-brand-border/60">
                  <button
                    type="button"
                    onClick={() => setActiveSearchTab('flower')}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      activeSearchTab === 'flower'
                        ? 'bg-white text-brand-forest shadow-sm'
                        : 'text-brand-muted hover:text-brand-text'
                    }`}
                  >
                    <Flower2 className="w-4 h-4 text-brand-forest" />
                    <span>Find Flowers</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSearchTab('decor')}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      activeSearchTab === 'decor'
                        ? 'bg-white text-brand-forest shadow-sm'
                        : 'text-brand-muted hover:text-brand-text'
                    }`}
                  >
                    <CalendarCheck className="w-4 h-4 text-brand-rose" />
                    <span>Book Decorator</span>
                  </button>
                </div>

                {/* Search Form */}
                <form onSubmit={handleHeroSearch} className="space-y-4">
                  {activeSearchTab === 'flower' ? (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-brand-text mb-1">
                          Flower Variety
                        </label>
                        <select
                          value={searchFlowerType}
                          onChange={(e) => setSearchFlowerType(e.target.value)}
                          className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-brand-border bg-white text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-forest"
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
                          <label className="block text-xs font-semibold text-brand-text mb-1">
                            Delivery City
                          </label>
                          <select
                            value={searchCity}
                            onChange={(e) => setSearchCity(e.target.value)}
                            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-brand-border bg-white text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-forest"
                          >
                            <option value="Bangalore">Bangalore</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Delhi NCR">Delhi NCR</option>
                            <option value="Jaipur">Jaipur</option>
                            <option value="Chennai">Chennai</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-brand-text mb-1">
                            Max Budget
                          </label>
                          <select
                            value={maxBudget}
                            onChange={(e) => setMaxBudget(e.target.value)}
                            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-brand-border bg-white text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-forest"
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
                        <label className="block text-xs font-semibold text-brand-text mb-1">
                          Occasion / Event Type
                        </label>
                        <select
                          value={searchEventType}
                          onChange={(e) => setSearchEventType(e.target.value)}
                          className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-brand-border bg-white text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-forest"
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
                          <label className="block text-xs font-semibold text-brand-text mb-1">
                            Event City
                          </label>
                          <select
                            value={searchCity}
                            onChange={(e) => setSearchCity(e.target.value)}
                            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-brand-border bg-white text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-forest"
                          >
                            <option value="Bangalore">Bangalore</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Delhi NCR">Delhi NCR</option>
                            <option value="Jaipur">Jaipur</option>
                            <option value="Chennai">Chennai</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-brand-text mb-1">
                            Event Date
                          </label>
                          <input
                            type="date"
                            defaultValue={new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]}
                            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-brand-border bg-white text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-forest"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-brand-forest hover:bg-brand-botanical active:scale-95 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-4"
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

      {/* SHOP BY CATEGORY (Phase 3.4) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-bold text-brand-forest tracking-wider uppercase">Artisanal Florals</span>
            <h2 className="font-display font-serif text-2xl sm:text-3xl font-bold text-brand-forest mt-1">
              Explore Flower Collections
            </h2>
          </div>
          <Link
            to="/flowers"
            className="text-xs sm:text-sm font-semibold text-brand-forest hover:text-brand-botanical flex items-center gap-1 group"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {flowerCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/flowers?category=${cat.id}`}
              className="group relative rounded-2xl overflow-hidden bg-white border border-brand-border shadow-soft hover:shadow-elevated transition-all p-3 text-center flex flex-col items-center"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 bg-brand-ivory border border-brand-border/60">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="font-display font-serif text-xs sm:text-sm font-semibold text-brand-text group-hover:text-brand-forest transition-colors">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS & BESTSELLERS (Phase 3.5) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-bold text-brand-forest tracking-wider uppercase">Handcrafted Bestsellers</span>
            <h2 className="font-display font-serif text-2xl sm:text-3xl font-bold text-brand-forest mt-1">
              Trending Bouquets & Floral Boxes
            </h2>
          </div>
          <Link
            to="/flowers"
            className="text-xs sm:text-sm font-semibold text-brand-forest hover:text-brand-botanical flex items-center gap-1 group"
          >
            <span>Browse Complete Shop</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredFlowers.map((flower) => (
            <FlowerProductCard key={flower.id} product={flower} />
          ))}
        </div>
      </section>

      {/* SHOP BY OCCASION SECTION (Phase 3.6 - Master Prompt Requirement) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-forest tracking-wider uppercase">Curated Celebrations</span>
          <h2 className="font-display font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-forest mt-1">
            Shop by Occasion
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted mt-2">
            Every celebration has a unique emotion. Explore floral arrangements and decor designed specifically for life's milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {occasions.map((occ) => (
            <div
              key={occ.title}
              className="group bg-white rounded-2xl overflow-hidden border border-brand-border shadow-soft hover:shadow-elevated transition-all flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden relative bg-brand-ivory">
                <img
                  src={occ.imageUrl}
                  alt={occ.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-brand-forest text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                  {occ.icon}
                  <span>{occ.tag}</span>
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-serif text-base font-semibold text-brand-forest group-hover:text-brand-botanical transition-colors">
                    {occ.title}
                  </h3>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    {occ.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs font-semibold">
                  <Link
                    to={occ.flowerLink}
                    className="text-brand-forest hover:text-brand-botanical hover:underline flex items-center gap-1"
                  >
                    <span>Bouquets</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  <span className="text-brand-border">•</span>

                  <Link
                    to={occ.decorLink}
                    className="text-brand-rose hover:text-brand-forest hover:underline flex items-center gap-1"
                  >
                    <span>Event Decor</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DECORATION SERVICES & CATEGORIES (Phase 3.7) */}
      <section className="bg-brand-forest py-16 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
            <div>
              <span className="text-xs font-bold text-brand-blush tracking-wider uppercase">Artisan Event Stylists</span>
              <h2 className="font-display font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Event Decoration Services
              </h2>
            </div>
            <Link
              to="/decorations"
              className="text-xs sm:text-sm font-semibold text-brand-blush hover:text-white flex items-center gap-1 group"
            >
              <span>Explore All Decor Services</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {decorCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/decorations?category=${cat.id}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-brand-botanical border border-brand-forest/60 shadow-lg"
              >
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-85"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-3.5">
                  <h4 className="font-display font-serif text-xs sm:text-sm font-semibold text-white group-hover:text-brand-blush transition-colors">
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
            <span className="text-xs font-bold text-brand-forest tracking-wider uppercase">Book With Confidence</span>
            <h2 className="font-display font-serif text-2xl sm:text-3xl font-bold text-brand-forest mt-1">
              Top-Rated Event Decoration Setups
            </h2>
          </div>
          <Link
            to="/decorations"
            className="text-xs sm:text-sm font-semibold text-brand-forest hover:text-brand-botanical flex items-center gap-1 group"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service) => (
            <DecorationServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* BRAND STORY SECTION (Phase 3.8 - Master Prompt Requirement) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-sage/30 rounded-3xl p-8 sm:p-12 lg:p-16 border border-brand-border/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold text-brand-forest tracking-wider uppercase">Our Philosophy</span>
              <h2 className="font-display font-serif text-2xl sm:text-4xl font-bold text-brand-forest leading-snug">
                The FloraLens Story: Crafted for Life’s Most Cherished Moments
              </h2>
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed font-sans">
                Flowers and decorations are more than aesthetic details — they mark life's beginnings, expressions of gratitude, reunions, and celebrations. FloraLens was born from a simple conviction: finding fresh, premium flowers and reliable decorators should be straightforward, transparent, and joyful.
              </p>
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed font-sans">
                By uniting local master florists and vetted event decorators on one platform, we eliminate intermediaries, guarantee dawn-harvested stems, and protect your bookings with an automated conflict-free calendar engine.
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Link
                  to="/flowers"
                  className="px-5 py-2.5 rounded-full bg-brand-forest hover:bg-brand-botanical text-white text-xs font-semibold shadow-sm transition-all"
                >
                  Explore Flowers
                </Link>
                <Link
                  to="/decorations"
                  className="px-5 py-2.5 rounded-full bg-white hover:bg-brand-ivory border border-brand-border text-brand-forest text-xs font-semibold shadow-sm transition-all"
                >
                  Explore Decorators
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elevated border-2 border-white bg-brand-ivory">
                <img
                  src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80"
                  alt="FloraLens Artisanal Floral Arrangement"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR LOCAL VENDORS */}
      {vendors && vendors.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-brand-forest tracking-wider uppercase">Local Artisans</span>
            <h2 className="font-display font-serif text-2xl sm:text-3xl font-bold text-brand-forest mt-1">
              Meet Our Verified Local Vendors
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted mt-2">
              Every vendor on FloraLens undergoes strict verification of portfolio, reviews, and setup reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vendors.slice(0, 3).map((vendor) => (
              <Link
                key={vendor.id}
                to={`/vendor-profile/${vendor.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-brand-border shadow-soft hover:shadow-elevated transition-all flex flex-col"
              >
                <div className="h-32 w-full overflow-hidden relative bg-brand-forest">
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
                    <h4 className="font-display font-serif font-semibold text-brand-text group-hover:text-brand-forest transition-colors">
                      {vendor.businessName}
                    </h4>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{vendor.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-brand-muted line-clamp-2 mb-3">
                    {vendor.description}
                  </p>

                  <div className="mt-auto pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-muted">
                    <span className="font-medium text-brand-forest">{vendor.city}</span>
                    <span className="text-[11px] text-brand-muted">{vendor.reviewCount} reviews</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* HOW IT WORKS */}
      <section className="bg-brand-sage/20 py-16 border-y border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-brand-forest tracking-wider uppercase">Seamless Process</span>
            <h2 className="font-display font-serif text-2xl sm:text-3xl font-bold text-brand-forest mt-1">
              How FloraLens Works
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted mt-2">
              From fresh farm stems to lavish event stages, enjoy a stress-free celebration in 4 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 text-center shadow-soft border border-brand-border relative">
              <div className="w-12 h-12 rounded-2xl bg-brand-sage/60 text-brand-forest font-bold text-lg flex items-center justify-center mx-auto mb-4 font-display font-serif">
                1
              </div>
              <h4 className="font-display font-serif font-semibold text-brand-forest text-sm mb-1">Discover & Compare</h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                Browse hand-arranged bouquets or designer decoration themes with transparent prices in INR.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-soft border border-brand-border relative">
              <div className="w-12 h-12 rounded-2xl bg-brand-sage/60 text-brand-forest font-bold text-lg flex items-center justify-center mx-auto mb-4 font-display font-serif">
                2
              </div>
              <h4 className="font-display font-serif font-semibold text-brand-forest text-sm mb-1">Pick Date & Venue</h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                Select your delivery address or reserve an open decorator slot with real-time double-booking protection.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-soft border border-brand-border relative">
              <div className="w-12 h-12 rounded-2xl bg-brand-sage/60 text-brand-forest font-bold text-lg flex items-center justify-center mx-auto mb-4 font-display font-serif">
                3
              </div>
              <h4 className="font-display font-serif font-semibold text-brand-forest text-sm mb-1">Secure Checkout</h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                Pay securely with UPI, RuPay, Cards or Netbanking with instant order verification and tracking reference.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-soft border border-brand-border relative">
              <div className="w-12 h-12 rounded-2xl bg-brand-sage/60 text-brand-forest font-bold text-lg flex items-center justify-center mx-auto mb-4 font-display font-serif">
                4
              </div>
              <h4 className="font-display font-serif font-semibold text-brand-forest text-sm mb-1">Celebrate in Bloom</h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                Receive prompt doorstep delivery or welcome our skilled crew for on-time decoration setup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE FLORALENS (Phase 3.9 - Trust Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-brand-forest tracking-wider uppercase">Uncompromising Quality</span>
              <h2 className="font-display font-serif text-3xl sm:text-4xl font-bold text-brand-forest mt-1 leading-tight">
                Why Patrons Choose FloraLens For Life’s Precious Milestones
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-brand-border shadow-sm">
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 flex-shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-brand-forest">Farm-Direct Morning Harvest</h4>
                  <p className="text-xs text-brand-muted mt-0.5">
                    No wilted warehouse inventory. Our partner florists harvest stems at dawn for peak petal vitality and longer vase life.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-brand-border shadow-sm">
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-brand-forest">Double-Booking Slot Constraint Engine</h4>
                  <p className="text-xs text-brand-muted mt-0.5">
                    Our database prevents overlapping event bookings. When your wedding or anniversary slot is confirmed, it is locked exclusively for you.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-brand-border shadow-sm">
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 flex-shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-brand-forest">Transparent Pricing in INR (₹)</h4>
                  <p className="text-xs text-brand-muted mt-0.5">
                    No hidden surprises. Complete breakdown of packages, custom add-ons, and delivery upfront.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-elevated border-4 border-white bg-brand-ivory">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
                alt="Event Decoration Setup"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-brand-border max-w-xs flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-forest text-brand-ivory flex items-center justify-center font-bold text-xl font-display font-serif">
                ₹0
              </div>
              <div>
                <h5 className="font-semibold text-xs text-brand-forest">Free Express Delivery</h5>
                <p className="text-[11px] text-brand-muted">On all flower orders above ₹999 with code BLOOM10</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VERIFIED REVIEWS (Phase 3.10 - Genuine Database Reviews Only) */}
      {reviews && reviews.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-brand-forest tracking-wider uppercase">Genuine Experiences</span>
            <h2 className="font-display font-serif text-2xl sm:text-3xl font-bold text-brand-forest mt-1">
              Feedback From Real Celebrations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.slice(0, 4).map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-5 border border-brand-border shadow-soft flex flex-col justify-between"
              >
                <div>
                  <StarRating rating={rev.rating} size="sm" showNumber={false} />
                  <p className="text-xs text-brand-muted mt-3 italic leading-relaxed line-clamp-4">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-brand-border/60 flex items-center gap-3">
                  <img
                    src={rev.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt={rev.userName}
                    className="w-8 h-8 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-brand-text truncate">{rev.userName}</h5>
                    <span className="text-[10px] text-emerald-700 font-medium block">
                      Verified Purchase • {rev.itemName}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* VENDOR PARTNER CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-forest via-brand-botanical to-brand-forest rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-elevated">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="bg-white/10 text-brand-blush text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block">
              For Florists & Decorators
            </span>
            <h2 className="font-display font-serif text-2xl sm:text-4xl font-bold leading-tight">
              Grow Your Business With India’s Premier Floral Marketplace
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              Connect directly with customers looking for wedding mandaps, party decor, and fresh bouquets in your city. Retain full transparency and automated slot management.
            </p>
            <div className="pt-2">
              <Link
                to="/vendor/register"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-brand-forest hover:bg-brand-ivory font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <Store className="w-4 h-4 text-brand-forest" />
                <span>Apply as a Vendor Partner</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
