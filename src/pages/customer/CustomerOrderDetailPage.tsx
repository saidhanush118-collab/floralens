import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, ArrowLeft, MapPin, Phone, ShieldCheck, Truck, XCircle, Store } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { StatusTimeline } from '../../components/common/StatusTimeline';

export const CustomerOrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrderById, updateOrderStatus } = useStore();
  const { user } = useAuth();

  const order = getOrderById(id || '');

  // Ensure customer can only view their own order
  if (!order || (user?.role === 'customer' && order.userId !== user?.id)) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-display text-2xl font-bold text-slate-800">Order Not Found</h2>
        <p className="text-xs text-slate-500">We could not find the specified order record for your account.</p>
        <Link
          to="/customer/orders"
          className="inline-block px-5 py-2.5 rounded-full bg-botanical-700 text-white font-semibold text-xs"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const canCancel = ['confirmed', 'pending_payment'].includes(order.status);

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      updateOrderStatus(order.id, 'cancelled', 'Cancelled by customer before dispatch');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="space-y-1">
          <Link
            to="/customer/orders"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Orders</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl font-bold text-slate-900">
              Order #{order.orderNumber}
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                order.status === 'delivered'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : order.status === 'cancelled'
                  ? 'bg-red-50 text-red-800 border border-red-200'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}
            >
              {order.status.replace(/_/g, ' ')}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Placed on {new Date(order.createdAt).toLocaleString('en-IN')} • Payment via {order.paymentMethod?.toUpperCase()} ({order.paymentReference})
          </p>
        </div>

        {canCancel && (
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs border border-red-200 transition-colors self-start sm:self-auto flex items-center gap-1.5"
          >
            <XCircle className="w-4 h-4" />
            <span>Cancel Order</span>
          </button>
        )}
      </div>

      {/* Timeline Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
        <h3 className="font-display font-bold text-base text-slate-900">Delivery Status Timeline</h3>
        <StatusTimeline
          type="order"
          status={order.status}
          createdAt={order.createdAt}
          updatedAt={order.updatedAt}
        />
        {order.rejectionReason && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs">
            <strong>Cancellation Note:</strong> {order.rejectionReason}
          </div>
        )}
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Items & Delivery Instructions */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900">
              Ordered Flower Arrangements ({order.items.length})
            </h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="p-3.5 rounded-2xl bg-slate-50 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={item.productImage} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <Link to={`/flowers/${item.productId}`} className="font-semibold text-xs text-slate-900 hover:text-botanical-700 block truncate">
                        {item.productName}
                      </Link>
                      {item.variantName && (
                        <span className="text-[11px] text-slate-500 block">{item.variantName}</span>
                      )}
                      <span className="text-[11px] text-slate-400">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-display font-bold text-sm text-slate-900 font-sans flex-shrink-0">
                    ₹{item.subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {order.deliveryInstructions && (
              <div className="p-3.5 rounded-2xl bg-ivory-100 border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-slate-800 block">Delivery Note for Courier:</span>
                <p className="text-slate-600 italic">"{order.deliveryInstructions}"</p>
              </div>
            )}
          </div>

          {/* Vendor Details */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-botanical-100 text-botanical-800 flex items-center justify-center font-bold">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900">{order.vendorName}</h4>
                <span className="text-[11px] text-slate-500">Local Florist Partner</span>
              </div>
            </div>
            <Link
              to={`/vendor-profile/${order.vendorId}`}
              className="text-xs font-bold text-botanical-700 hover:underline"
            >
              View Shop
            </Link>
          </div>
        </div>

        {/* Right: Address & Bill Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-botanical-700" />
              <span>Destination Address</span>
            </h3>
            <div className="text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-900">{order.deliveryAddress.recipientName}</p>
              <p>{order.deliveryAddress.flatHouse}, {order.deliveryAddress.streetArea}</p>
              {order.deliveryAddress.landmark && <p>Landmark: {order.deliveryAddress.landmark}</p>}
              <p>{order.deliveryAddress.city}, {order.deliveryAddress.state} — <strong>{order.deliveryAddress.pincode}</strong></p>
              <p className="pt-1 text-slate-500">Contact: {order.deliveryAddress.phone}</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900">Payment Breakdown</h3>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-slate-800">₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Express Delivery</span>
                <span>{order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span>₹{order.platformFee}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount</span>
                  <span>-₹{order.discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                <span>Total Paid</span>
                <span className="font-sans text-base">₹{order.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 text-[11px] text-emerald-700 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Paid via {order.paymentMethod?.toUpperCase()} (Payment Verified)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
