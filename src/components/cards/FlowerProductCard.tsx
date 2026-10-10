import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Clock, Sparkles } from 'lucide-react';
import { FlowerProduct } from '../../types';
import { useStore } from '../../context/StoreContext';
import { StarRating } from '../common/StarRating';

interface FlowerProductCardProps {
  product: FlowerProduct;
}

export const FlowerProductCard: React.FC<FlowerProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wishlisted = isWishlisted('flower', product.id);

  const displayPrice = product.salePrice ?? product.basePrice;
  const hasDiscount = product.salePrice && product.salePrice < product.basePrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.basePrice - product.salePrice!) / product.basePrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist('flower', product.id);
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-soft hover:shadow-elevated transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <Link to={`/flowers/${product.id}`} className="relative block aspect-square overflow-hidden bg-ivory-200">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {hasDiscount && (
            <span className="bg-terracotta-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-botanical-800 text-blush-200 font-semibold text-[10px] px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              Bestseller
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

        {/* Quick Add Overlay on Desktop Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block z-10">
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={product.stockQuantity <= 0}
            className="w-full py-2.5 px-3 bg-botanical-800/90 hover:bg-botanical-800 text-white font-semibold text-xs rounded-xl backdrop-blur-md shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{product.stockQuantity > 0 ? 'Quick Add to Bag' : 'Out of Stock'}</span>
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
          <span className="font-medium text-botanical-700">{product.flowerType}</span>
          <span className="truncate max-w-[120px]">{product.vendorCity}</span>
        </div>

        <Link to={`/flowers/${product.id}`} className="block">
          <h3 className="font-display text-sm font-semibold text-slate-900 group-hover:text-botanical-700 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-1.5">
          <StarRating rating={product.rating} size="sm" reviewCount={product.reviewCount} />
        </div>

        {/* Delivery ETA */}
        <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-2">
          <Clock className="w-3 h-3 text-slate-400" />
          <span className="line-clamp-1">{product.estimatedDeliveryTime}</span>
        </div>

        {/* Price & Action */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-slate-900 font-sans">
                ₹{displayPrice.toLocaleString('en-IN')}
              </span>
              {hasDiscount && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{product.basePrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
              <span className="text-[10px] text-amber-600 font-semibold block">
                Only {product.stockQuantity} left!
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={product.stockQuantity <= 0}
            className="sm:hidden p-2 rounded-xl bg-botanical-100 text-botanical-800 hover:bg-botanical-200 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
