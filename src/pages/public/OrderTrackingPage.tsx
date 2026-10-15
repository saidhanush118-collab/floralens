import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Package, CalendarCheck, MapPin, CheckCircle2, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { StatusTimeline } from '../../components/common/StatusTimeline';

export const OrderTrackingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialRef = searchParams.get('ref') || '';

  const { orders, bookings } = useStore();
  const [searchRef, setSearchRef] = useState(initialRef);
  const [searched, setSearched] = useState(Boolean(initialRef));

  useEffect(() => {
    document.title = 'Track Order & Booking | FloraLens';
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-brand-ivory text-brand-text">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-brand-forest uppercase tracking-wider bg-brand-sage/60 px-3.5 py-1 rounded-full border border-brand-forest/20">
          Real-Time Tracker
        </span>
        <h1 className="font-display font-serif text-3xl sm:text-4xl font-bold text-brand-forest">
          Track Flower Orders & Event Bookings
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
          Enter your unique FloraLens order number (e.g. <code>BLOOM-ORD-8821</code>) or booking reference (e.g. <code>BLOOM-BKG-4419</code>).
        </p>

        {/* Search input form */}
        <form onSubmit={handleSearch} className="max-w-lg mx-auto flex gap-2 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. BLOOM-ORD-8821 or BLOOM-BKG-4419"
              value={searchRef}
              onChange={(e) => setSearchRef(e.target.value)}
              className="w-full text-xs sm:text-sm pl-10 pr-4 py-3 rounded-2xl border border-brand-border uppercase font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-brand-forest text-brand-text"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-brand-forest hover:bg-brand-botanical text-white font-semibold text-xs transition-all shadow-sm active:scale-95"
          >
            Track
          </button>
        </form>
      </div>

      {/* Results View */}
      {searched && (
        <div className="space-y-6">
          {matchedOrder ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-soft space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-brand-border/60 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-brand-forest" />
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">Flower Order</span>
                  </div>
                  <h2 className="font-mono font-bold text-xl text-brand-forest mt-0.5">
                    #{matchedOrder.orderNumber}
                  </h2>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-brand-muted block">Placed On</span>
                  <span className="text-xs font-semibold text-brand-text">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-brand-border/60 text-xs">
                <div>
                  <h4 className="font-bold text-brand-forest mb-2">Delivery Address</h4>
                  <div className="p-4 rounded-2xl bg-brand-ivory border border-brand-border text-brand-text space-y-1">
                    <p className="font-bold text-brand-forest">{matchedOrder.deliveryAddress.recipientName}</p>
                    <p>{matchedOrder.deliveryAddress.flatHouse}, {matchedOrder.deliveryAddress.streetArea}</p>
                    <p>{matchedOrder.deliveryAddress.city}, {matchedOrder.deliveryAddress.state} — {matchedOrder.deliveryAddress.pincode}</p>
                    <p>Phone: {matchedOrder.deliveryAddress.phone}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-brand-forest mb-2">Order Items ({matchedOrder.items.length})</h4>
                  <div className="space-y-2">
                    {matchedOrder.items.map((item) => (
                      <div key={item.id} className="p-3 rounded-xl bg-brand-ivory flex items-center justify-between gap-3 border border-brand-border/60">
                        <div className="flex items-center gap-2.5">
                          <img src={item.productImage} alt="" className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <span className="font-semibold text-brand-text block line-clamp-1">{item.productName}</span>
                            <span className="text-[11px] text-brand-muted">Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-bold font-sans text-brand-text">₹{item.subtotal.toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-brand-border flex justify-between font-bold text-sm text-brand-forest">
                    <span>Total Paid</span>
                    <span>₹{matchedOrder.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : matchedBooking ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-soft space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-brand-border/60 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <CalendarCheck className="w-5 h-5 text-brand-rose" />
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">Event Decoration Booking</span>
                  </div>
                  <h2 className="font-mono font-bold text-xl text-brand-forest mt-0.5">
                    #{matchedBooking.bookingReference}
                  </h2>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-brand-muted block">Booked On</span>
                  <span className="text-xs font-semibold text-brand-text">
                    {new Date(matchedBooking.createdAt).toLocaleString('en-IN')}
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

              {/* Event Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-brand-border/60 text-xs">
                <div>
                  <h4 className="font-bold text-brand-forest mb-2">Venue Address</h4>
                  <div className="p-4 rounded-2xl bg-brand-ivory border border-brand-border text-brand-text space-y-1">
                    <p className="font-bold text-brand-forest">{matchedBooking.venueAddress.recipientName}</p>
                    <p>{matchedBooking.venueAddress.flatHouse}, {matchedBooking.venueAddress.streetArea}</p>
                    <p>{matchedBooking.venueAddress.city}, {matchedBooking.venueAddress.state} — {matchedBooking.venueAddress.pincode}</p>
                    <p>Contact: {matchedBooking.venueAddress.phone}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-brand-forest mb-2">Event Specifications</h4>
                  <div className="p-4 rounded-2xl bg-brand-ivory border border-brand-border space-y-2">
                    <div className="flex justify-between">
                      <span className="text-brand-muted">Event Date:</span>
                      <strong className="text-brand-forest">{matchedBooking.eventDate}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-muted">Reserved Slot:</span>
                      <strong className="text-brand-forest">{matchedBooking.timeSlot}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-muted">Package:</span>
                      <strong className="text-brand-text">{matchedBooking.packageName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-muted">Stylist:</span>
                      <strong className="text-brand-forest">{matchedBooking.vendorName}</strong>
                    </div>
                    <div className="pt-2 border-t border-brand-border flex justify-between font-bold text-sm text-brand-forest">
                      <span>Total Booking Amount</span>
                      <span>₹{matchedBooking.totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-white border border-brand-border text-center max-w-md mx-auto space-y-3 shadow-soft">
              <Package className="w-10 h-10 text-brand-muted mx-auto" />
              <h3 className="font-display font-serif font-bold text-base text-brand-forest">No Records Found</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                We couldn't locate an order or booking matching <code>"{searchRef}"</code>. Please check for typos or log in to view your complete order history.
              </p>
              <Link
                to="/customer/orders"
                className="inline-block px-5 py-2 rounded-xl bg-brand-forest text-white font-semibold text-xs shadow-sm hover:bg-brand-botanical transition-all"
              >
                View My Account Orders
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
