import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Clock, Sparkles, Check } from 'lucide-react';
import { FlowerProduct } from '../../types';
import { useStore } from '../../context/StoreContext';
import { StarRating } from '../common/StarRating';

interface FlowerProductCardProps {
  product: FlowerProduct;
}

export const FlowerProductCard: React.FC<FlowerProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wishlisted = isWishlisted('flower', product.id);
  const [justAdded, setJustAdded] = useState(false);

  const displayPrice = product.salePrice ?? product.basePrice;
  const hasDiscount = product.salePrice && product.salePrice < product.basePrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.basePrice - product.salePrice!) / product.basePrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stockQuantity <= 0) return;
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist('flower', product.id);
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-brand-border shadow-soft hover:shadow-elevated transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <Link to={`/flowers/${product.id}`} className="relative block aspect-square overflow-hidden bg-brand-ivory">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {hasDiscount && (
            <span className="bg-brand-rose text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-brand-forest text-brand-blush font-semibold text-[10px] px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
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
              ? 'bg-red-50 text-red-500 fill-red-500 shadow-md ring-1 ring-red-200'
              : 'bg-white/80 hover:bg-white text-brand-muted hover:text-red-500 shadow-sm'
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
            className={`w-full py-2.5 px-3 font-semibold text-xs rounded-xl backdrop-blur-md shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 ${
              justAdded
                ? 'bg-emerald-700 text-white'
                : product.stockQuantity > 0
                ? 'bg-brand-forest/90 hover:bg-brand-forest text-white'
                : 'bg-slate-400 text-white cursor-not-allowed'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{product.stockQuantity > 0 ? 'Quick Add to Bag' : 'Out of Stock'}</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between text-[11px] text-brand-muted mb-1">
          <span className="font-semibold text-brand-forest">{product.flowerType}</span>
          <span className="truncate max-w-[120px]">{product.vendorCity}</span>
        </div>

        <Link to={`/flowers/${product.id}`} className="block">
          <h3 className="font-display font-serif text-sm font-semibold text-brand-text group-hover:text-brand-forest transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-1.5">
          <StarRating rating={product.rating} size="sm" reviewCount={product.reviewCount} />
        </div>

        {/* Delivery ETA */}
        <div className="flex items-center gap-1 text-[11px] text-brand-muted mt-2">
          <Clock className="w-3 h-3 text-brand-muted" />
          <span className="line-clamp-1">{product.estimatedDeliveryTime}</span>
        </div>

        {/* Price & Action */}
        <div className="mt-auto pt-3 border-t border-brand-border/60 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-brand-text font-sans">
                ₹{displayPrice.toLocaleString('en-IN')}
              </span>
              {hasDiscount && (
                <span className="text-xs text-brand-muted line-through">
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
            aria-label="Add to cart"
            className={`sm:hidden p-2 rounded-xl transition-colors ${
              justAdded
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-brand-sage/60 text-brand-forest hover:bg-brand-sage'
            }`}
          >
            {justAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
