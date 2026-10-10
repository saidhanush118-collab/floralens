import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Sparkles, Tag, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, clearCart, applyCoupon, removeCoupon, appliedCoupon } = useStore();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; error?: boolean } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      const res = applyCoupon(couponCode);
      setCouponMsg({ text: res.message, error: !res.success });
      if (res.success) setCouponCode('');
    }
  };

  const amountNeededForFreeDelivery = Math.max(0, 999 - cart.subtotal);

  if (cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-5">
        <div className="w-20 h-20 rounded-full bg-botanical-50 text-botanical-700 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-display text-2xl font-bold text-slate-900">Your Shopping Bag is Empty</h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          Discover our handcrafted flower bouquets, luxury floral gift boxes, and fresh farm stems.
        </p>
        <Link
          to="/flowers"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-botanical-700 hover:bg-botanical-800 text-white font-semibold text-xs shadow-md transition-all"
        >
          <span>Explore Fresh Flowers</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">Shopping Bag</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            You have <strong>{cart.items.length}</strong> unique flower arrangement{cart.items.length > 1 ? 's' : ''} in your cart.
          </p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs text-red-600 hover:text-red-700 font-semibold"
        >
          Clear Bag
        </button>
      </div>

      {/* Free Delivery Bar */}
      {amountNeededForFreeDelivery > 0 ? (
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
            Add <strong>₹{amountNeededForFreeDelivery.toLocaleString('en-IN')}</strong> more to unlock <strong>FREE Express Delivery</strong>!
          </span>
          <Link to="/flowers" className="font-bold underline text-amber-950">Add More</Link>
        </div>
      ) : (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs flex items-center gap-2 font-medium">
          <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Congratulations! You have qualified for <strong>FREE Express Delivery</strong>.</span>
        </div>
      )}

      {/* Grid: Items on Left, Order Summary on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-2xl object-cover bg-ivory-200 flex-shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-botanical-700 uppercase tracking-wider block">
                    {item.product.flowerType}
                  </span>
                  <Link
                    to={`/flowers/${item.product.id}`}
                    className="font-display font-semibold text-sm sm:text-base text-slate-900 hover:text-botanical-700 line-clamp-1"
                  >
                    {item.product.name}
                  </Link>
                  {item.variantName && (
                    <span className="text-xs text-slate-500 block">{item.variantName}</span>
                  )}
                  <span className="text-xs text-slate-400 block mt-0.5">
                    Sold by {item.product.vendorName}
                  </span>
                </div>
              </div>

              {/* Quantity Controls & Price */}
              <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 pt-3 sm:pt-0 border-t sm:border-0 border-slate-100">
                <div className="flex items-center border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm">
                  <button
                    type="button"
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold font-sans text-slate-800">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="font-display font-bold text-base text-slate-900 font-sans block">
                    ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-slate-400">₹{item.unitPrice} each</span>
                </div>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Link
              to="/flowers"
              className="inline-flex items-center gap-2 text-xs font-semibold text-botanical-700 hover:text-botanical-800"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping for More Blooms</span>
            </Link>
          </div>
        </div>

        {/* Order Summary on Right */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-soft space-y-6">
          <h3 className="font-display font-bold text-lg text-slate-900 pb-3 border-b border-slate-100">
            Order Summary
          </h3>

          {/* Coupon Input */}
          <div>
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">Promo Code or Coupon</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. BLOOM10"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 uppercase font-semibold focus:outline-none focus:ring-2 focus:ring-botanical-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-botanical-800 text-white font-semibold text-xs hover:bg-botanical-900"
                >
                  Apply
                </button>
              </div>
            </form>

            {couponMsg && (
              <p
                className={`text-xs mt-1.5 font-medium ${
                  couponMsg.error ? 'text-red-600' : 'text-emerald-700'
                }`}
              >
                {couponMsg.text}
              </p>
            )}

            {appliedCoupon && (
              <div className="mt-2 p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
                <span>Coupon <strong>{appliedCoupon.code}</strong> applied!</span>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-[11px] text-red-600 underline font-semibold ml-2"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Itemized Calculation */}
          <div className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-semibold text-slate-800">₹{cart.subtotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Delivery Fee</span>
              {cart.deliveryFee === 0 ? (
                <span className="font-bold text-emerald-700 uppercase">FREE</span>
              ) : (
                <span className="font-semibold text-slate-800">₹{cart.deliveryFee}</span>
              )}
            </div>

            <div className="flex justify-between">
              <span>Platform & Packaging Fee</span>
              <span className="font-semibold text-slate-800">₹{cart.platformFee}</span>
            </div>

            {cart.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Coupon Discount</span>
                <span>-₹{cart.discount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-sm">
              <span className="font-bold text-slate-900">Total Payable</span>
              <span className="font-display font-bold text-2xl text-botanical-900 font-sans">
                ₹{cart.total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Proceed to Checkout Button */}
          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 px-6 rounded-2xl bg-botanical-700 hover:bg-botanical-800 active:scale-95 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 justify-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Guaranteed Safe Checkout • UPI / Cards / NetBanking</span>
          </div>
        </div>
      </div>
    </div>
  );
};
