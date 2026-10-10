import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CalendarCheck, ArrowLeft, MapPin, Clock, ShieldCheck, XCircle, Store, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { StatusTimeline } from '../../components/common/StatusTimeline';

export const CustomerBookingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getBookingById, updateBookingStatus } = useStore();

  const booking = getBookingById(id || '');

  if (!booking) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-display text-2xl font-bold text-slate-800">Booking Record Not Found</h2>
        <p className="text-xs text-slate-500">We could not locate this decoration booking.</p>
        <Link
          to="/customer/bookings"
          className="inline-block px-5 py-2.5 rounded-full bg-botanical-700 text-white font-semibold text-xs"
        >
          Back to Bookings
        </Link>
      </div>
    );
  }

  const canCancel = ['confirmed', 'pending_approval', 'pending_payment'].includes(booking.status);

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel this event decoration booking?')) {
      updateBookingStatus(booking.id, 'cancelled', 'Cancelled by customer as per cancellation notice policy');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="space-y-1">
          <Link
            to="/customer/bookings"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Bookings</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl font-bold text-slate-900">
              Booking #{booking.bookingReference}
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                booking.status === 'completed'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : booking.status === 'cancelled' || booking.status === 'rejected'
                  ? 'bg-red-50 text-red-800 border border-red-200'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}
            >
              {booking.status.replace(/_/g, ' ')}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Event Scheduled: <strong>{new Date(booking.eventDate).toLocaleDateString('en-IN')} ({booking.timeSlot})</strong> • {booking.eventType}
          </p>
        </div>

        {canCancel && (
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs border border-red-200 transition-colors self-start sm:self-auto flex items-center gap-1.5"
          >
            <XCircle className="w-4 h-4" />
            <span>Cancel Booking</span>
          </button>
        )}
      </div>

      {/* Timeline Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
        <h3 className="font-display font-bold text-base text-slate-900">Booking Execution Timeline</h3>
        <StatusTimeline
          type="booking"
          status={booking.status}
          createdAt={booking.createdAt}
          eventDate={booking.eventDate}
          timeSlot={booking.timeSlot}
        />
        {booking.rejectionReason && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs">
            <strong>Vendor Response:</strong> {booking.rejectionReason}
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Package, Addons & Venue */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900">Reserved Package</h3>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-ivory-100 border border-slate-200">
              <img src={booking.serviceImage} alt="" className="w-20 h-20 rounded-2xl object-cover flex-shrink-0" />
              <div>
                <Link to={`/decorations/${booking.serviceId}`} className="font-display font-bold text-base text-slate-900 hover:text-botanical-700 block">
                  {booking.serviceName}
                </Link>
                <span className="text-xs text-botanical-800 font-semibold block mt-0.5">{booking.packageName}</span>
                <span className="text-xs text-slate-500 font-sans font-bold block mt-1">
                  ₹{booking.packagePrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Selected Addons */}
            {booking.selectedAddons.length > 0 && (
              <div className="pt-2 space-y-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Customized Add-ons ({booking.selectedAddons.length}):
                </span>
                <div className="space-y-1.5">
                  {booking.selectedAddons.map((addon, i) => (
                    <div key={i} className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-slate-50">
                      <span className="font-medium text-slate-700">{addon.name}</span>
                      <span className="font-bold text-slate-900 font-sans">+₹{addon.price.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {booking.customizationNotes && (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-slate-800 block">Theme & Customization Notes:</span>
                <p className="text-slate-600 italic">"{booking.customizationNotes}"</p>
              </div>
            )}
          </div>

          {/* Stylist Details */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-botanical-100 text-botanical-800 flex items-center justify-center font-bold">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900">{booking.vendorName}</h4>
                <span className="text-[11px] text-slate-500">Verified Event Stylist</span>
              </div>
            </div>
            <Link
              to={`/vendor-profile/${booking.vendorId}`}
              className="text-xs font-bold text-botanical-700 hover:underline"
            >
              View Portfolio
            </Link>
          </div>
        </div>

        {/* Right: Venue Address & Price Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-botanical-700" />
              <span>Event Venue Coordinates</span>
            </h3>
            <div className="text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-900">{booking.venueAddress.recipientName}</p>
              <p>{booking.venueAddress.flatHouse}, {booking.venueAddress.streetArea}</p>
              {booking.venueAddress.landmark && <p>Landmark: {booking.venueAddress.landmark}</p>}
              <p>{booking.venueAddress.city}, {booking.venueAddress.state} — <strong>{booking.venueAddress.pincode}</strong></p>
              {booking.guestCount && <p className="pt-1">Expected Attendees: ~{booking.guestCount} guests</p>}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900">Total Price Breakdown</h3>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Base Package</span>
                <span className="font-semibold text-slate-800">₹{booking.packagePrice.toLocaleString('en-IN')}</span>
              </div>
              {booking.addonsTotal > 0 && (
                <div className="flex justify-between">
                  <span>Selected Add-ons Total</span>
                  <span className="font-semibold text-slate-800">₹{booking.addonsTotal.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Platform Guarantee Fee</span>
                <span>₹{booking.platformFee}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                <span>Total Amount Paid</span>
                <span className="font-sans text-base">₹{booking.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 text-[11px] text-emerald-700 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Payment Captured • Slot Exclusively Reserved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
