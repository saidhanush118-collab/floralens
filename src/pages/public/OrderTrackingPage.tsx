import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Package, CalendarCheck, MapPin, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { StatusTimeline } from '../../components/common/StatusTimeline';

export const OrderTrackingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialRef = searchParams.get('ref') || '';

  const { orders, bookings } = useStore();
  const [searchRef, setSearchRef] = useState(initialRef);
  const [searched, setSearched] = useState(Boolean(initialRef));

  useEffect(() => {
    if (initialRef) {
      setSearchRef(initialRef);
      setSearched(true);
    }
  }, [initialRef]);

  const cleanRef = searchRef.trim().toUpperCase();
  const matchedOrder = orders.find((o) => o.orderNumber.toUpperCase() === cleanRef || o.id === searchRef.trim());
  const matchedBooking = bookings.find((b) => b.bookingReference.toUpperCase() === cleanRef || b.id === searchRef.trim());

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchRef.trim()) {
      setSearched(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-botanical-700 uppercase tracking-wider">
          Real-Time Tracker
        </span>
        <h1 className="font-display text-3xl font-bold text-slate-900">
          Track Flower Orders & Event Bookings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          Enter your unique Bloomora order number (e.g. <code>BLOOM-ORD-8821</code>) or booking reference (e.g. <code>BLOOM-BKG-4419</code>).
        </p>

        {/* Search input form */}
        <form onSubmit={handleSearch} className="max-w-lg mx-auto flex gap-2 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. BLOOM-ORD-8821 or BLOOM-BKG-4419"
              value={searchRef}
              onChange={(e) => setSearchRef(e.target.value)}
              className="w-full text-xs sm:text-sm pl-10 pr-4 py-3 rounded-2xl border border-slate-200 uppercase font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-botanical-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-botanical-700 hover:bg-botanical-800 text-white font-semibold text-xs transition-all shadow-sm"
          >
            Track
          </button>
        </form>
      </div>

      {/* Results View */}
      {searched && (
        <div className="space-y-6">
          {matchedOrder ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-botanical-700" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Flower Order</span>
                  </div>
                  <h2 className="font-mono font-bold text-xl text-slate-900 mt-0.5">
                    #{matchedOrder.orderNumber}
                  </h2>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-400 block">Placed On</span>
                  <span className="text-xs font-semibold text-slate-700">
                    {new Date(matchedOrder.createdAt).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="py-2">
                <StatusTimeline
                  type="order"
                  status={matchedOrder.status}
                  createdAt={matchedOrder.createdAt}
                  updatedAt={matchedOrder.updatedAt}
                />
              </div>

              {/* Items & Address Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 text-xs">
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Delivery Address</h4>
                  <div className="p-4 rounded-2xl bg-ivory-50 border border-slate-200 text-slate-600 space-y-1">
                    <p className="font-bold text-slate-900">{matchedOrder.deliveryAddress.recipientName}</p>
                    <p>{matchedOrder.deliveryAddress.flatHouse}, {matchedOrder.deliveryAddress.streetArea}</p>
                    <p>{matchedOrder.deliveryAddress.city}, {matchedOrder.deliveryAddress.state} — {matchedOrder.deliveryAddress.pincode}</p>
                    <p>Phone: {matchedOrder.deliveryAddress.phone}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Order Items ({matchedOrder.items.length})</h4>
                  <div className="space-y-2">
                    {matchedOrder.items.map((item) => (
                      <div key={item.id} className="p-3 rounded-xl bg-slate-50 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <img src={item.productImage} alt="" className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <span className="font-semibold text-slate-800 block line-clamp-1">{item.productName}</span>
                            <span className="text-[11px] text-slate-400">Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-bold font-sans text-slate-800">₹{item.subtotal.toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                    <span>Total Paid</span>
                    <span>₹{matchedOrder.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : matchedBooking ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <CalendarCheck className="w-5 h-5 text-terracotta-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Decoration Booking</span>
                  </div>
                  <h2 className="font-mono font-bold text-xl text-slate-900 mt-0.5">
                    #{matchedBooking.bookingReference}
                  </h2>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-400 block">Event Scheduled For</span>
                  <span className="text-sm font-bold text-botanical-800">
                    {new Date(matchedBooking.eventDate).toLocaleDateString('en-IN')} ({matchedBooking.timeSlot})
                  </span>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="py-2">
                <StatusTimeline
                  type="booking"
                  status={matchedBooking.status}
                  createdAt={matchedBooking.createdAt}
                  eventDate={matchedBooking.eventDate}
                  timeSlot={matchedBooking.timeSlot}
                />
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 text-xs">
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Event Venue Details</h4>
                  <div className="p-4 rounded-2xl bg-ivory-50 border border-slate-200 text-slate-600 space-y-1">
                    <p className="font-bold text-slate-900">{matchedBooking.venueAddress.recipientName}</p>
                    <p>{matchedBooking.venueAddress.flatHouse}, {matchedBooking.venueAddress.streetArea}</p>
                    <p>{matchedBooking.venueAddress.city}, {matchedBooking.venueAddress.state} — {matchedBooking.venueAddress.pincode}</p>
                    {matchedBooking.guestCount && <p>Guest Count: ~{matchedBooking.guestCount} attendees</p>}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Reserved Service Package</h4>
                  <div className="p-4 rounded-2xl bg-slate-50 space-y-2">
                    <div className="flex items-center gap-3">
                      <img src={matchedBooking.serviceImage} alt="" className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h5 className="font-semibold text-slate-900">{matchedBooking.serviceName}</h5>
                        <span className="text-[11px] text-slate-500">{matchedBooking.packageName}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                      <span>Total Booking Amount</span>
                      <span>₹{matchedBooking.totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center max-w-md mx-auto space-y-3">
              <Search className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-display font-semibold text-base text-slate-800">
                No Record Found
              </h3>
              <p className="text-xs text-slate-500">
                We couldn't locate any order or booking for <code>{searchRef}</code>. Please double-check your receipt reference number or sign in to your dashboard.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
