import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, Sparkles, Users, Award, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = 'About FloraLens | Floral & Event Decoration Marketplace';
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 bg-brand-ivory text-brand-text">
      {/* Hero */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-brand-forest uppercase tracking-wider bg-brand-sage/60 px-3.5 py-1 rounded-full border border-brand-forest/20">
          Our Story
        </span>
        <h1 className="font-display font-serif text-3xl sm:text-5xl font-bold text-brand-forest">
          About FloraLens
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-sans">
          Connecting India’s most skilled local florists and visionary event stylists to celebrate life’s unforgettable moments with botanical elegance.
        </p>
      </div>

      <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-elevated border-4 border-white">
        <img
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80"
          alt="FloraLens Florist Workshop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 sm:p-10 text-white">
          <p className="font-display font-serif text-lg sm:text-3xl font-bold italic">
            "Every moment deserves to bloom."
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-brand-border shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-sage/60 text-brand-forest flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="font-display font-serif text-xl font-bold text-brand-forest">Our Mission</h2>
          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
            To make world-class floral design and bespoke party decoration transparent and accessible. We eliminate the guesswork of hiring decorators and buying fresh flowers by providing upfront pricing in INR, verified portfolios, and conflict-free calendar slot scheduling.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-brand-border shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-blush/60 text-brand-rose flex items-center justify-center font-bold">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="font-display font-serif text-xl font-bold text-brand-forest">Empowering Local Artisans</h2>
          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
            Local florists and wedding decorators are the cultural heartbeat of Indian celebrations. FloraLens equips them with modern e-commerce tools, automated slot availability checks, and reliable digital payment processing to help their businesses flourish.
          </p>
        </div>
      </div>

      {/* Principles */}
      <div className="bg-brand-sage/20 rounded-3xl p-8 sm:p-10 border border-brand-border space-y-6">
        <h3 className="font-display font-serif text-2xl font-bold text-brand-forest text-center">
          The FloraLens Principles
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <ShieldCheck className="w-8 h-8 text-brand-forest mx-auto" />
            <h4 className="font-bold text-sm text-brand-text">Verified Quality</h4>
            <p className="text-xs text-brand-muted">Every florist and decorator undergoes rigorous portfolio review before publishing services.</p>
          </div>
          <div className="space-y-2">
            <Users className="w-8 h-8 text-brand-forest mx-auto" />
            <h4 className="font-bold text-sm text-brand-text">Zero Overlaps</h4>
            <p className="text-xs text-brand-muted">Our conflict resolution engine locks confirmed slots to prevent double-booking on event dates.</p>
          </div>
          <div className="space-y-2">
            <Award className="w-8 h-8 text-brand-forest mx-auto" />
            <h4 className="font-bold text-sm text-brand-text">Transparent Pricing</h4>
            <p className="text-xs text-brand-muted">Clear flat rates in Indian Rupees (₹), transparent delivery costs, and fair merchant payouts.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <Link
          to="/flowers"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-forest hover:bg-brand-botanical text-white font-semibold text-xs shadow-md transition-all active:scale-95"
        >
          <span>Explore Fresh Flowers</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
