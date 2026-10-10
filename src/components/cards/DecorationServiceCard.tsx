import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, Clock, CheckCircle2, MapPin } from 'lucide-react';
import { DecorationService } from '../../types';
import { useStore } from '../../context/StoreContext';
import { StarRating } from '../common/StarRating';

interface DecorationServiceCardProps {
  service: DecorationService;
}

export const DecorationServiceCard: React.FC<DecorationServiceCardProps> = ({ service }) => {
  const { toggleWishlist, isWishlisted } = useStore();
  const wishlisted = isWishlisted('decoration', service.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist('decoration', service.id);
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-soft hover:shadow-elevated transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <Link to={`/decorations/${service.id}`} className="relative block aspect-[4/3] overflow-hidden bg-ivory-200">
        <img
          src={service.images[0]}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="bg-botanical-800/90 backdrop-blur-md text-ivory-100 font-semibold text-[10px] px-2.5 py-0.5 rounded-full shadow-sm">
            {service.eventType}
          </span>
          {service.isFeatured && (
            <span className="bg-terracotta-500 text-white font-semibold text-[10px] px-2 py-0.5 rounded-full shadow-sm">
              Popular Choice
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            wishlisted
              ? 'bg-red-50 text-red-500 fill-red-500 shadow-md'
              : 'bg-white/80 hover:bg-white text-slate-600 hover:text-red-500 shadow-sm'
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        {/* Setup Duration pill */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-blush-300" />
          <span>{service.setupDurationHours} hrs setup time</span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Vendor Header */}
        <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-1">
          <span className="font-semibold text-botanical-800 line-clamp-1">{service.vendorName}</span>
          <span title="Verified Decorator">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
          </span>
        </div>

        <Link to={`/decorations/${service.id}`} className="block">
          <h3 className="font-display text-base font-semibold text-slate-900 group-hover:text-botanical-700 transition-colors line-clamp-1">
            {service.name}
          </h3>
        </Link>

        {/* Location & Rating */}
        <div className="flex items-center justify-between mt-2 text-xs">
          <div className="flex items-center gap-1 text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-terracotta-500" />
            <span>{service.vendorCity}</span>
          </div>
          <StarRating rating={service.rating} size="sm" reviewCount={service.reviewCount} />
        </div>

        {/* Packages count & slots preview */}
        <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>{service.packages.length} curated packages</span>
          <span>Min {service.minNoticeDays} days notice</span>
        </div>

        {/* Price & Action */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-medium">Starting from</span>
            <span className="text-base font-bold text-slate-900 font-sans">
              ₹{service.basePrice.toLocaleString('en-IN')}
            </span>
          </div>

          <Link
            to={`/decorations/${service.id}`}
            className="px-3.5 py-2 rounded-xl bg-botanical-700 hover:bg-botanical-800 active:scale-95 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Check Slots</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
