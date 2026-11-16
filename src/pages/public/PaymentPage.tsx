import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Lock, ArrowLeft, CheckCircle2, ArrowRight, Wallet, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { PaymentModal } from '../../components/common/PaymentModal';

export const PaymentPage: React.FC = () => {
  const { cart, orders } = useStore();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recentOrders = orders.filter((o) => o.userId === user?.id).slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 animate-fadeIn">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-botanical-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-Bit SSL Encrypted Payment Gateway</span>
        </span>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-botanical-800 via-botanical-700 to-botanical-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-soft">
        <div className="relative z-10 space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-blush-200" />
            <span>Secure Checkout & Payment Portal</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
            FloraLens Payment Center
          </h1>
          <p className="text-xs text-botanical-100 leading-relaxed">
            Verified session for <strong className="text-white">{user?.fullName}</strong> ({user?.email}). Manage floral order payments, digital UPI receipts, and Razorpay transactions safely.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Cart Payment Card */}
        <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-botanical-50 text-botanical-700 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-slate-800 text-sm">Active Cart Checkout</h2>
                <p className="text-xs text-slate-500">
                  {cart.items.length > 0 ? `${cart.items.length} items waiting for payment` : 'No unpaid items in cart'}
                </p>
              </div>
            </div>
            {cart.items.length > 0 && (
              <span className="font-mono font-bold text-lg text-botanical-800">
                ₹{cart.total.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {cart.items.length > 0 ? (
            <div className="space-y-4">
              <div className="space-y-2">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50">
                    <div className="flex items-center gap-2">
                      <img src={item.product.images[0]} alt="" className="w-8 h-8 rounded-lg object-cover" />
                      <span className="font-medium text-slate-700">{item.product.name} (x{item.quantity})</span>
                    </div>
                    <span className="font-semibold text-slate-800">₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 py-3 px-5 rounded-2xl bg-botanical-700 hover:bg-botanical-800 text-white font-bold text-xs shadow-soft flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
                >
                  <Lock className="w-4 h-4 text-emerald-300" />
                  <span>Pay Now (₹{cart.total.toLocaleString('en-IN')})</span>
                </button>
                <Link
                  to="/checkout"
                  className="py-3 px-5 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs text-center transition-colors"
                >
                  Edit Delivery Address
                </Link>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 mx-auto flex items-center justify-center">
                <Wallet className="w-6 h-6" />
              </div>
              <p className="text-xs text-slate-500">Your shopping cart is currently empty.</p>
              <Link
                to="/flowers"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-botanical-700 text-white font-bold text-xs hover:bg-botanical-800 shadow-xs"
              >
                <span>Browse Bouquets</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Security & Quick Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Accepted Payment Methods</h3>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>Credit / Debit Cards (Visa, Mastercard, RuPay)</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>Net Banking (All Indian Scheduled Banks)</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Cash on Delivery (COD Verified)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Recent Receipts</h3>
              <Link to="/customer/orders" className="text-[11px] font-bold text-botanical-700 hover:underline">
                View All
              </Link>
            </div>
            {recentOrders.length > 0 ? (
              <div className="space-y-2 text-xs">
                {recentOrders.map((o) => (
                  <div key={o.id} className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
                    <div>
                      <p className="font-mono font-bold text-slate-800">#{o.orderNumber}</p>
                      <p className="text-[10px] text-slate-400">{new Date(o.createdAt).toLocaleDateString('en-IN')}</p>
                    </div>
                    <span className="font-mono font-semibold text-emerald-700">₹{o.totalAmount}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 italic">No previous orders found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Payment Processing Modal */}
      {isModalOpen && cart.items.length > 0 && (
        <PaymentModal
          isOpen={isModalOpen}
          amount={cart.total}
          orderDescription={`FloraLens Floral Order - ₹${cart.total.toLocaleString('en-IN')}`}
          onClose={() => setIsModalOpen(false)}
          onSuccess={(details) => {
            setIsModalOpen(false);
            navigate('/checkout', { state: { autoPay: true, paymentMethod: details.method } });
          }}
        />
      )}
    </div>
  );
};
