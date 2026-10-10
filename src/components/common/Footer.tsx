import React from 'react';
import { Link } from 'react-router-dom';
import { Flower2, Heart, ShieldCheck, Truck, Clock, Sparkles, Phone, Mail, MapPin } from 'lucide-react';
import { getBackendStatus } from '../../lib/supabase';

export const Footer: React.FC = () => {
  const backend = getBackendStatus();

  return (
    <footer className="bg-botanical-900 text-slate-300 pt-16 pb-12 border-t border-botanical-800">
      {/* Trust Highlights Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-botanical-800/80">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-botanical-800/80 border border-botanical-700 flex items-center justify-center text-blush-300 flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Farm-Fresh Stems</h4>
              <p className="text-xs text-slate-400 mt-0.5">Sourced at 5 AM daily with 5-day vase life guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-botanical-800/80 border border-botanical-700 flex items-center justify-center text-blush-300 flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Express 2-Hour Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">Prompt same-day delivery across top metro cities</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-botanical-800/80 border border-botanical-700 flex items-center justify-center text-blush-300 flex-shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Verified Event Decorators</h4>
              <p className="text-xs text-slate-400 mt-0.5">Vetted stylists, guaranteed on-time setup & zero stress</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-botanical-800/80 border border-botanical-700 flex items-center justify-center text-blush-300 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">100% Secure Checkout</h4>
              <p className="text-xs text-slate-400 mt-0.5">Encrypted UPI, RuPay, Netbanking & Cards</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-botanical-700 flex items-center justify-center text-ivory-100 shadow-md">
                <Flower2 className="w-6 h-6 text-blush-200" />
              </div>
              <div>
                <span className="font-display text-2xl font-bold tracking-tight text-white block">
                  Bloomora
                </span>
                <span className="text-[10px] tracking-wider uppercase text-botanical-300 font-semibold block -mt-1">
                  Every Celebration Deserves to Bloom
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Bloomora connects discerning customers with local florist artisans and professional event stylists. Discover freshly harvested flower bouquets and book bespoke party decorations across India.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-terracotta-400 flex-shrink-0" />
                <span>Headquarters: Indiranagar, Bangalore, Karnataka 560038</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-terracotta-400 flex-shrink-0" />
                <span>+91 (080) 4123-9000 (Mon–Sun 8 AM to 10 PM IST)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-terracotta-400 flex-shrink-0" />
                <span>care@bloomora.in</span>
              </div>
            </div>

            {/* Backend Integration status honest pill */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-botanical-800/80 border border-botanical-700 text-[11px]">
                <span className={`w-2 h-2 rounded-full ${backend.isSupabaseConfigured ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
                <span className="text-slate-300">
                  {backend.isSupabaseConfigured
                    ? 'Connected to Live Supabase PostgreSQL'
                    : 'Interactive Full-Stack Demo Mode (Local Storage Synced)'}
                </span>
              </div>
            </div>
          </div>

          {/* Flowers Categories */}
          <div>
            <h5 className="font-display text-sm font-semibold text-white tracking-wide mb-4">
              Fresh Flowers
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/flowers?flowerType=Roses" className="hover:text-blush-300 transition-colors">Dutch Roses</Link>
              </li>
              <li>
                <Link to="/flowers?flowerType=Lilies" className="hover:text-blush-300 transition-colors">Casablanca Lilies</Link>
              </li>
              <li>
                <Link to="/flowers?flowerType=Orchids" className="hover:text-blush-300 transition-colors">Exotic Orchids</Link>
              </li>
              <li>
                <Link to="/flowers?flowerType=Mixed" className="hover:text-blush-300 transition-colors">Mixed Floral Bouquets</Link>
              </li>
              <li>
                <Link to="/flowers?category=cat-baskets" className="hover:text-blush-300 transition-colors">Woven Flower Baskets</Link>
              </li>
              <li>
                <Link to="/flowers?category=cat-gifts" className="hover:text-blush-300 transition-colors">Flowers & Belgian Truffles</Link>
              </li>
            </ul>
          </div>

          {/* Event Decorations */}
          <div>
            <h5 className="font-display text-sm font-semibold text-white tracking-wide mb-4">
              Event Decorations
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/decorations?eventType=Birthday" className="hover:text-blush-300 transition-colors">Birthday Balloon Arches</Link>
              </li>
              <li>
                <Link to="/decorations?eventType=Wedding" className="hover:text-blush-300 transition-colors">Grand Wedding Mandaps</Link>
              </li>
              <li>
                <Link to="/decorations?eventType=Anniversary" className="hover:text-blush-300 transition-colors">Romantic Cabana Dinners</Link>
              </li>
              <li>
                <Link to="/decorations?eventType=Engagement" className="hover:text-blush-300 transition-colors">Engagement & Roka Rings</Link>
              </li>
              <li>
                <Link to="/decorations?eventType=Car Decor" className="hover:text-blush-300 transition-colors">Wedding Car Decor</Link>
              </li>
              <li>
                <Link to="/decorations?eventType=Surprise" className="hover:text-blush-300 transition-colors">Midnight Room Surprises</Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h5 className="font-display text-sm font-semibold text-white tracking-wide mb-4">
              Help & Information
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/track-order" className="hover:text-blush-300 transition-colors font-semibold text-blush-200">
                  Track Order / Booking
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blush-300 transition-colors">About Bloomora</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blush-300 transition-colors">Contact Support</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-blush-300 transition-colors">Frequently Asked Questions</Link>
              </li>
              <li>
                <Link to="/vendor/register" className="hover:text-blush-300 transition-colors text-amber-300 font-semibold">
                  Join as Vendor Partner
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blush-300 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blush-300 transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Payment Badges */}
        <div className="mt-12 pt-8 border-t border-botanical-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Bloomora Technologies Pvt. Ltd. All rights reserved.</p>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400">Supported Payments:</span>
            <span className="bg-botanical-800 px-2 py-0.5 rounded text-[10px] font-bold text-slate-200 border border-botanical-700">UPI</span>
            <span className="bg-botanical-800 px-2 py-0.5 rounded text-[10px] font-bold text-slate-200 border border-botanical-700">RuPay</span>
            <span className="bg-botanical-800 px-2 py-0.5 rounded text-[10px] font-bold text-slate-200 border border-botanical-700">Visa / MC</span>
            <span className="bg-botanical-800 px-2 py-0.5 rounded text-[10px] font-bold text-slate-200 border border-botanical-700">NetBanking</span>
          </div>

          <p className="flex items-center gap-1 text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-terracotta-400 fill-terracotta-400" />
            <span>for Indian Celebrations</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
