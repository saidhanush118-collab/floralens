import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, ArrowRight, Clock, MapPin } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';

export const CustomerBookingsPage: React.FC = () => {
  const { bookings } = useStore();
  const { user } = useAuth();

  const userBookings = bookings.filter((b) => b.userId === user?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            My Event Decoration Bookings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track confirmed stylist reservations, venue preparations, and timeline details.
          </p>
        </div>
        <Link
          to="/decorations"
          className="px-4 py-2.5 rounded-xl bg-botanical-700 hover:bg-botanical-800 text-white font-semibold text-xs shadow-sm self-start sm:self-auto"
        >
          Book New Decoration
        </Link>
      </div>

      {userBookings.length > 0 ? (
        <div className="space-y-4">
          {userBookings.map((bkg) => (
            <div
              key={bkg.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft hover:shadow-elevated transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <img
                  src={bkg.serviceImage}
                  alt={bkg.serviceName}
                  className="w-20 h-20 rounded-2xl object-cover bg-ivory-200 flex-shrink-0"
                />
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-sm text-slate-900">#{bkg.bookingReference}</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-semibold text-botanical-800">{bkg.eventType}</span>
                  </div>

                  <h3 className="font-display font-semibold text-base text-slate-900 truncate">
                    {bkg.serviceName}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Package: {bkg.packageName} • Stylist: {bkg.vendorName}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
                    <span className="flex items-center gap-1 font-semibold text-botanical-800">
                      <Clock className="w-3.5 h-3.5 text-botanical-600" />
                      {new Date(bkg.eventDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })} ({bkg.timeSlot})
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-500 truncate max-w-xs">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {bkg.venueAddress.city}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status and Action */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-0 border-slate-100 gap-3">
                <div className="text-left md:text-right">
                  <span className="font-display font-bold text-base sm:text-lg text-slate-900 font-sans block">
                    ₹{bkg.totalAmount.toLocaleString('en-IN')}
                  </span>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mt-1 ${
                      bkg.status === 'completed'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : bkg.status === 'cancelled' || bkg.status === 'rejected'
                        ? 'bg-red-50 text-red-800 border border-red-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {bkg.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <Link
                  to={`/customer/bookings/${bkg.id}`}
                  className="px-4 py-2 rounded-xl bg-ivory-100 hover:bg-ivory-200 border border-slate-200 text-xs font-bold text-botanical-800 flex items-center gap-1.5 transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 bg-white rounded-3xl border border-slate-200 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-botanical-50 text-botanical-700 flex items-center justify-center mx-auto">
            <CalendarCheck className="w-8 h-8" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900">No Bookings Yet</h3>
          <p className="text-xs text-slate-500">
            Book trusted wedding mandaps, birthday balloon backdrops, and romantic dinner setups.
          </p>
          <Link
            to="/decorations"
            className="inline-block px-5 py-2.5 rounded-full bg-botanical-700 text-white font-semibold text-xs shadow-sm"
          >
            Explore Event Decorators
          </Link>
        </div>
      )}
    </div>
  );
};
