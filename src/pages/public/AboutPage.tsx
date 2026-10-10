import React from 'react';
import { Link } from 'react-router-dom';
import { Flower2, Heart, ShieldCheck, Sparkles, Users, Award, MapPin } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-botanical-700 uppercase tracking-wider bg-botanical-50 px-3 py-1 rounded-full border border-botanical-200">
          Our Story
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
          About Bloomora
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
          Connecting India’s most skilled local florists and visionary event stylists to celebrate life’s unforgettable moments with botanical perfection.
        </p>
      </div>

      <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-elevated border-4 border-white">
        <img
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80"
          alt="Bloomora Florist Workshop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 sm:p-10 text-white">
          <p className="font-display text-lg sm:text-2xl font-bold italic">
            "Every celebration deserves to bloom."
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-botanical-50 text-botanical-800 flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="font-display text-xl font-bold text-slate-900">Our Mission</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            To democratize access to world-class floral design and bespoke party decoration. We eliminate the guesswork of hiring decorators and buying fresh flowers by providing transparent pricing in INR, verified portfolios, and guaranteed slot scheduling.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blush-50 text-terracotta-600 flex items-center justify-center font-bold">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="font-display text-xl font-bold text-slate-900">Empowering Local Artisans</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Local florists and wedding decorators are the cultural heartbeat of Indian celebrations. Bloomora equips them with modern e-commerce tools, availability engines, and secure digital payment processing to help their businesses flourish.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="bg-ivory-100/90 rounded-3xl p-8 sm:p-10 border border-slate-200 space-y-6">
        <h3 className="font-display text-2xl font-bold text-slate-900 text-center">
          The Bloomora Principles
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <ShieldCheck className="w-8 h-8 text-botanical-700 mx-auto" />
            <h4 className="font-bold text-sm text-slate-900">Verified Quality</h4>
            <p className="text-xs text-slate-500">Every florist and decorator undergoes rigorous portfolio review before publishing services.</p>
          </div>
          <div className="space-y-2">
            <Users className="w-8 h-8 text-botanical-700 mx-auto" />
            <h4 className="font-bold text-sm text-slate-900">Zero Overlaps</h4>
            <p className="text-xs text-slate-500">Our proprietary conflict resolution prevents double-booking for the same decorator slot.</p>
          </div>
          <div className="space-y-2">
            <Award className="w-8 h-8 text-botanical-700 mx-auto" />
            <h4 className="font-bold text-sm text-slate-900">Fair Ecosystem</h4>
            <p className="text-xs text-slate-500">Transparent flat rates, clear cancellation timelines, and fair 90% payout margins for merchants.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
