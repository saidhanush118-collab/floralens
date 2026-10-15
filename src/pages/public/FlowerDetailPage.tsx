import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  Check,
  Plus,
  Minus,
  MessageSquare,
  Store,
  ChevronRight,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { StarRating } from '../../components/common/StarRating';
import { FlowerProductCard } from '../../components/cards/FlowerProductCard';

export const FlowerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart, toggleWishlist, isWishlisted, reviews, addReview, vendors } = useStore();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id || p.slug === id);

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState<string>(() => {
    return product?.variants[0]?.id || '';
  });
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [addSuccessMessage, setAddSuccessMessage] = useState(false);

  // Review modal state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | FloraLens`;
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4 bg-brand-ivory">
        <h2 className="font-display font-serif text-2xl font-bold text-brand-forest">Flower Arrangement Not Found</h2>
        <p className="text-xs text-brand-muted">The requested floral product is unavailable or removed.</p>
        <Link
          to="/flowers"
          className="inline-block px-5 py-2.5 rounded-full bg-brand-forest text-white font-semibold text-xs shadow-sm hover:bg-brand-botanical transition-all"
        >
          Return to Flowers Shop
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted('flower', product.id);
  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];
  const unitPrice = selectedVariant ? selectedVariant.price : (product.salePrice ?? product.basePrice);
  const itemReviews = reviews.filter((r) => r.itemId === product.id);
  const vendor = vendors.find((v) => v.id === product.vendorId);
  const relatedProducts = products.filter((p) => p.id !== product.id && p.flowerType === product.flowerType).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant?.id, quantity);
    setAddSuccessMessage(true);
    setTimeout(() => setAddSuccessMessage(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant?.id, quantity);
    navigate('/checkout');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeChecked(true);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      addReview({
        vendorId: product.vendorId,
        itemType: 'flower',
        itemId: product.id,
        itemName: product.name,
        rating: newRating,
        comment: newComment.trim(),
      });
      setNewComment('');
      setShowReviewForm(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 bg-brand-ivory text-brand-text">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-brand-muted">
        <Link to="/" className="hover:text-brand-forest">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-brand-muted" />
        <Link to="/flowers" className="hover:text-brand-forest">Shop Flowers</Link>
        <ChevronRight className="w-3.5 h-3.5 text-brand-muted" />
        <span className="font-medium text-brand-forest truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Images Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-brand-border shadow-soft">
            <img
              src={product.images[selectedImageIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {product.salePrice && (
              <span className="absolute top-4 left-4 bg-brand-rose text-white font-bold text-xs px-3 py-1 rounded-full shadow-sm">
                SPECIAL OFFER
              </span>
            )}
            <button
              type="button"
              onClick={() => toggleWishlist('flower', product.id)}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all shadow-md ${
                wishlisted ? 'bg-red-50 text-red-500 ring-1 ring-red-200' : 'bg-white/80 hover:bg-white text-brand-muted'
              }`}
            >
              <Heart className={`w-5 h-5 ${wishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImageIdx === idx
                      ? 'border-brand-forest ring-2 ring-brand-sage'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Ordering Form */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-brand-forest font-semibold mb-1">
              <span>{product.flowerType}</span>
              <span>•</span>
              <span>Fresh Farm Harvest</span>
            </div>
            <h1 className="font-display font-serif text-2xl sm:text-3xl font-bold text-brand-forest leading-tight">
              {product.name}
            </h1>

            {/* Rating & Reviews summary */}
            <div className="flex items-center gap-3 mt-2">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} />
              <span className="text-xs text-brand-muted">•</span>
              <a href="#reviews" className="text-xs text-brand-forest hover:underline font-semibold">
                {itemReviews.length} customer reviews
              </a>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="p-4 rounded-2xl bg-white border border-brand-border flex items-baseline justify-between shadow-soft">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold text-brand-forest font-sans">
                ₹{unitPrice.toLocaleString('en-IN')}
              </span>
              {product.salePrice && (
                <span className="text-sm text-brand-muted line-through">
                  ₹{product.basePrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Inclusive of all taxes
            </span>
          </div>

          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-sans">
            {product.description}
          </p>

          {/* Variants Selection */}
          {product.variants.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-brand-text uppercase tracking-wider">
                Select Arrangement Size
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedVariantId(variant.id)}
                    className={`p-3 rounded-xl text-left border text-xs transition-all flex items-center justify-between ${
                      selectedVariant?.id === variant.id
                        ? 'border-brand-forest bg-brand-sage/60 text-brand-forest font-bold ring-1 ring-brand-forest'
                        : 'border-brand-border text-brand-text hover:border-brand-forest/60'
                    }`}
                  >
                    <span>{variant.name}</span>
                    <span className="font-sans font-bold">₹{variant.price.toLocaleString('en-IN')}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Controls */}
          <div className="flex items-center gap-4">
            <label className="text-xs font-bold text-brand-text uppercase tracking-wider">
              Quantity:
            </label>
            <div className="flex items-center border border-brand-border rounded-xl bg-white overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="p-2 text-brand-muted hover:text-brand-forest hover:bg-brand-ivory"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-4 text-xs font-bold font-sans text-brand-text">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(product.stockQuantity, q + 1))}
                disabled={quantity >= product.stockQuantity}
                aria-label="Increase quantity"
                className="p-2 text-brand-muted hover:text-brand-forest hover:bg-brand-ivory disabled:opacity-40"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            {product.stockQuantity <= 5 && (
              <span className="text-xs font-semibold text-amber-600">
                Only {product.stockQuantity} left in stock!
              </span>
            )}
          </div>

          {/* Pincode Availability Checker */}
          <div className="p-4 rounded-2xl bg-white border border-brand-border space-y-2 shadow-soft">
            <div className="flex items-center justify-between text-xs font-semibold text-brand-text">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-brand-forest" />
                Check Delivery at Your Pincode
              </span>
            </div>
            <form onSubmit={handleCheckPincode} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter 6-digit Pincode (e.g. 560038)"
                value={pincode}
                maxLength={6}
                onChange={(e) => {
                  setPincode(e.target.value);
                  setPincodeChecked(false);
                }}
                className="flex-1 text-xs px-3.5 py-2 rounded-xl border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-forest text-brand-text"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-brand-forest text-white font-semibold text-xs hover:bg-brand-botanical transition-all"
              >
                Check
              </button>
            </form>
            {pincodeChecked && (
              <p className="text-xs text-emerald-700 flex items-center gap-1 font-medium mt-1">
                <Check className="w-3.5 h-3.5" />
                Delivery Available! Estimated arrival within {product.estimatedDeliveryTime}.
              </p>
            )}
          </div>

          {/* Feedback Toast */}
          {addSuccessMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Added to your bag! Ready to checkout anytime.</span>
            </div>
          )}

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stockQuantity <= 0}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-brand-sage/60 hover:bg-brand-sage active:scale-95 text-brand-forest font-bold text-sm transition-all flex items-center justify-center gap-2 border border-brand-forest/20"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{product.stockQuantity > 0 ? 'Add to Bag' : 'Out of Stock'}</span>
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              disabled={product.stockQuantity <= 0}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-brand-forest hover:bg-brand-botanical active:scale-95 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Buy Now</span>
            </button>
          </div>

          {/* Freshness & Quality Guarantee */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-brand-border text-xs">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-brand-forest flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-brand-forest block">5-Day Freshness</span>
                <span className="text-brand-muted">{product.freshnessGuarantee}</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-brand-forest flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-brand-forest block">Quality Inspected</span>
                <span className="text-brand-muted">Conditioned with floral food & hydration pack</span>
              </div>
            </div>
          </div>

          {/* Florist Vendor Snapshot */}
          {vendor && (
            <div className="p-4 rounded-2xl bg-white border border-brand-border flex items-center justify-between shadow-soft">
              <div className="flex items-center gap-3">
                <img src={vendor.logoUrl} alt={vendor.businessName} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <h4 className="font-semibold text-xs text-brand-forest">{vendor.businessName}</h4>
                  <span className="text-[11px] text-brand-muted">{vendor.city} • {vendor.rating}★ ({vendor.reviewCount} reviews)</span>
                </div>
              </div>
              <Link
                to={`/vendor-profile/${vendor.id}`}
                className="text-xs font-bold text-brand-forest hover:underline flex items-center gap-1"
              >
                <Store className="w-3.5 h-3.5" />
                <span>Visit Florist</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <section id="reviews" className="pt-10 border-t border-brand-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display font-serif text-2xl font-bold text-brand-forest">
              Customer Reviews ({itemReviews.length})
            </h2>
            <p className="text-xs text-brand-muted mt-0.5">
              Verified experiences from FloraLens flower patrons
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-4 py-2.5 rounded-xl bg-brand-forest text-white font-semibold text-xs hover:bg-brand-botanical transition-colors flex items-center gap-2 self-start shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Review Form Drawer */}
        {showReviewForm && (
          <form
            onSubmit={handleSubmitReview}
            className="mb-8 p-6 rounded-2xl bg-white border border-brand-border shadow-soft space-y-4 max-w-xl"
          >
            <h3 className="font-display font-serif font-semibold text-sm text-brand-forest">Share Your Experience</h3>
            <div>
              <label className="block text-xs font-semibold text-brand-text mb-1">Your Rating</label>
              <StarRating rating={newRating} interactive onRate={(r) => setNewRating(r)} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-brand-text mb-1">Written Feedback</label>
              <textarea
                rows={3}
                required
                placeholder="How was the freshness, fragrance, and delivery experience?"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-forest text-brand-text"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-3.5 py-2 text-xs font-semibold text-brand-muted hover:text-brand-text"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-brand-forest text-white font-semibold text-xs shadow-sm hover:bg-brand-botanical transition-all"
              >
                Submit Review
              </button>
            </div>
          </form>
        )}

        {/* Reviews List */}
        {itemReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {itemReviews.map((rev) => (
              <div key={rev.id} className="p-5 rounded-2xl bg-white border border-brand-border shadow-soft space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={rev.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                      alt={rev.userName}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="font-bold text-xs text-brand-text">{rev.userName}</span>
                  </div>
                  <StarRating rating={rev.rating} size="sm" showNumber={false} />
                </div>
                <p className="text-xs text-brand-muted italic leading-relaxed">"{rev.comment}"</p>
                <div className="flex items-center justify-between text-[10px] text-brand-muted pt-1">
                  <span className="text-emerald-700 font-semibold">Verified Purchase</span>
                  <span>{new Date(rev.createdAt).toLocaleDateString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white text-center border border-brand-border max-w-md mx-auto shadow-soft">
            <p className="text-xs text-brand-muted">
              Be the first to review this flower arrangement! Click "Write a Review" above.
            </p>
          </div>
        )}
      </section>

      {/* RELATED FLOWERS */}
      {relatedProducts.length > 0 && (
        <section className="pt-10 border-t border-brand-border">
          <h2 className="font-display font-serif text-xl font-bold text-brand-forest mb-6">
            You May Also Admire
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <FlowerProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
