import React, { useState } from 'react';
import { Package, CheckCircle2, Clock, Truck, XCircle, MapPin } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { OrderStatus } from '../../types';

export const VendorOrdersPage: React.FC = () => {
  const { orders, updateOrderStatus, vendors } = useStore();
  const { user } = useAuth();

  const currentVendor =
    vendors.find((v) => v.userId === user?.id) ||
    vendors.find((v) => v.id === 'vendor-1') ||
    vendors[0];

  const vendorOrders = orders.filter((o) => o.vendorId === currentVendor.id);

  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'active' | 'completed'>('all');
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const filteredOrders = vendorOrders.filter((o) => {
    if (activeTab === 'pending') return ['confirmed', 'pending_payment'].includes(o.status);
    if (activeTab === 'active') return ['accepted_by_vendor', 'preparing', 'ready_for_dispatch', 'out_for_delivery'].includes(o.status);
    if (activeTab === 'completed') return ['delivered', 'cancelled'].includes(o.status);
    return true;
  });

  const handleUpdateStatus = (orderId: string, nextStatus: OrderStatus) => {
    updateOrderStatus(orderId, nextStatus);
  };

  const handleRejectOrder = (orderId: string) => {
    if (rejectReason.trim()) {
      updateOrderStatus(orderId, 'cancelled', rejectReason.trim());
      setRejectingId(null);
      setRejectReason('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
          Incoming Flower Orders
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Fulfill customer bouquets and update courier progress for <strong>{currentVendor.businessName}</strong>.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
            activeTab === 'all' ? 'border-botanical-700 text-botanical-800' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          All Orders ({vendorOrders.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('pending')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
            activeTab === 'pending' ? 'border-botanical-700 text-botanical-800' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          New Confirmed
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('active')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
            activeTab === 'active' ? 'border-botanical-700 text-botanical-800' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          In Preparation / Transit
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('completed')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
            activeTab === 'completed' ? 'border-botanical-700 text-botanical-800' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Delivered & Closed
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2 text-xs">
                <div>
                  <span className="font-mono font-bold text-sm text-slate-900">#{order.orderNumber}</span>
                  <span className="text-slate-400 mx-2">•</span>
                  <span className="text-slate-500">{new Date(order.createdAt).toLocaleString('en-IN')}</span>
                  <span className="text-slate-400 mx-2">•</span>
                  <span className="font-bold text-slate-800">{order.customerName}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-sm text-slate-900 font-sans">
                    ₹{order.totalAmount.toLocaleString('en-IN')}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                    {order.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              {/* Items & Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 text-[11px] uppercase font-bold block mb-1">
                    Arrangements to Prepare:
                  </span>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img src={item.productImage} alt="" className="w-8 h-8 rounded-lg object-cover" />
                          <div>
                            <span className="font-semibold text-slate-800 block line-clamp-1">{item.productName}</span>
                            <span className="text-[11px] text-slate-400">Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-bold font-sans">₹{item.subtotal}</span>
                      </div>
                    ))}
                  </div>

                  {order.deliveryInstructions && (
                    <p className="mt-2 text-slate-500 italic bg-ivory-50 p-2 rounded-lg border border-slate-200">
                      Note: "{order.deliveryInstructions}"
                    </p>
                  )}
                </div>

                <div>
                  <span className="text-slate-400 text-[11px] uppercase font-bold block mb-1">
                    Delivery Destination:
                  </span>
                  <div className="p-3 rounded-2xl bg-slate-50 text-slate-600 space-y-0.5">
                    <p className="font-semibold text-slate-900">{order.deliveryAddress.recipientName}</p>
                    <p>{order.deliveryAddress.flatHouse}, {order.deliveryAddress.streetArea}</p>
                    <p>{order.deliveryAddress.city} — {order.deliveryAddress.pincode}</p>
                    <p className="pt-1 text-slate-500">Phone: {order.deliveryAddress.phone}</p>
                  </div>
                </div>
              </div>

              {/* Status Transition Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-slate-400 text-[11px]">Advance Fulfillment Workflow:</span>

                <div className="flex flex-wrap items-center gap-2">
                  {order.status === 'confirmed' && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(order.id, 'accepted_by_vendor')}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors"
                      >
                        Accept Order
                      </button>
                      <button
                        type="button"
                        onClick={() => setRejectingId(order.id)}
                        className="px-3 py-1.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-semibold border border-red-200"
                      >
                        Decline
                      </button>
                    </>
                  )}

                  {order.status === 'accepted_by_vendor' && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(order.id, 'preparing')}
                      className="px-3.5 py-1.5 rounded-xl bg-botanical-700 hover:bg-botanical-800 text-white font-semibold"
                    >
                      Mark as Preparing Floral Stems
                    </button>
                  )}

                  {order.status === 'preparing' && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(order.id, 'ready_for_dispatch')}
                      className="px-3.5 py-1.5 rounded-xl bg-botanical-700 hover:bg-botanical-800 text-white font-semibold"
                    >
                      Ready for Dispatch
                    </button>
                  )}

                  {order.status === 'ready_for_dispatch' && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(order.id, 'out_for_delivery')}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold flex items-center gap-1.5"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Handover to Courier (Out for Delivery)</span>
                    </button>
                  )}

                  {order.status === 'out_for_delivery' && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(order.id, 'delivered')}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                    >
                      Confirm Delivered
                    </button>
                  )}

                  {order.status === 'delivered' && (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Order Completed & Delivered
                    </span>
                  )}
                </div>
              </div>

              {/* Decline Reason Modal */}
              {rejectingId === order.id && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-2 mt-2">
                  <span className="text-xs font-bold text-red-900 block">Provide Reason for Order Rejection:</span>
                  <input
                    type="text"
                    placeholder="e.g. Out of seasonal bloom inventory, address unreachable"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-red-200 focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleRejectOrder(order.id)}
                      className="px-3 py-1.5 rounded-lg bg-red-600 text-white font-bold text-xs"
                    >
                      Confirm Decline
                    </button>
                    <button
                      type="button"
                      onClick={() => setRejectingId(null)}
                      className="px-3 py-1.5 text-xs text-slate-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-12 bg-white rounded-3xl border border-slate-200 text-center text-xs text-slate-500">
            No orders found under this category.
          </div>
        )}
      </div>
    </div>
  );
};
