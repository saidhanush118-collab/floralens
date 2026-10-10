import React from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  CalendarCheck,
  Heart,
  MapPin,
  Clock,
  ArrowRight,
  User,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';

export const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { orders, bookings, wishlist, addresses } = useStore();

  const userOrders = orders.filter((o) => o.userId === user?.id || user?.role === 'customer');
  const userBookings = bookings.filter((b) => b.userId === user?.id || user?.role === 'customer');

  const recentOrder = userOrders[0];
  const upcomingBooking = userBookings[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-botanical-800 to-botanical-700 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'}
            alt=""
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/50 shadow-md"
          />
          <div>
            <span className="text-xs text-botanical-200 font-semibold uppercase tracking-wider">
              Customer Account
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold">
              Namaste, {user?.fullName.split(' ')[0]}!
            </h1>
            <p className="text-xs text-botanical-200 mt-0.5">
              {user?.city || 'Bangalore'} • {user?.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/customer/profile"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-sm transition-colors"
          >
            Edit Profile
          </Link>
          <Link
            to="/flowers"
            className="px-4 py-2 rounded-xl bg-white text-botanical-900 text-xs font-bold shadow-sm transition-all hover:bg-ivory-100"
          >
            Order Blooms
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link
          to="/customer/orders"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft hover:shadow-elevated transition-all flex items-center gap-4"
        >
          <div className="p-3 rounded-xl bg-botanical-50 text-botanical-700">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold font-sans text-slate-900 block leading-tight">
              {userOrders.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">Flower Orders</span>
          </div>
        </Link>

        <Link
          to="/customer/bookings"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft hover:shadow-elevated transition-all flex items-center gap-4"
        >
          <div className="p-3 rounded-xl bg-amber-50 text-amber-700">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold font-sans text-slate-900 block leading-tight">
              {userBookings.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">Event Bookings</span>
          </div>
        </Link>

        <Link
          to="/customer/wishlist"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft hover:shadow-elevated transition-all flex items-center gap-4"
        >
          <div className="p-3 rounded-xl bg-red-50 text-red-600">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold font-sans text-slate-900 block leading-tight">
              {wishlist.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">Saved Items</span>
          </div>
        </Link>

        <Link
          to="/customer/addresses"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft hover:shadow-elevated transition-all flex items-center gap-4"
        >
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold font-sans text-slate-900 block leading-tight">
              {addresses.length}
            </span>
            <span className="text-xs text-slate-500 font-medium">Saved Addresses</span>
          </div>
        </Link>
      </div>

      {/* Two-Column Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Latest Flower Order */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
              <Package className="w-4 h-4 text-botanical-700" />
              <span>Latest Flower Order</span>
            </h3>
            <Link to="/customer/orders" className="text-xs font-semibold text-botanical-700 hover:underline">
              View All
            </Link>
          </div>

          {recentOrder ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono font-bold text-slate-800">#{recentOrder.orderNumber}</span>
                  <span className="text-slate-400 block text-[11px]">
                    {new Date(recentOrder.createdAt).toLocaleDateString('en-IN')}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {recentOrder.status.replace(/_/g, ' ')}
                </span>
              </div>

              <div className="space-y-2">
                {recentOrder.items.slice(0, 2).map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-50">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img src={item.productImage} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <span className="font-medium text-slate-800 truncate">{item.productName}</span>
                    </div>
                    <span className="font-bold font-sans text-slate-900 flex-shrink-0">
                      ₹{item.subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-slate-500">Total: <strong>₹{recentOrder.totalAmount.toLocaleString('en-IN')}</strong></span>
                <Link
                  to={`/customer/orders/${recentOrder.id}`}
                  className="font-bold text-botanical-700 hover:text-botanical-800 flex items-center gap-1"
                >
                  <span>Track & View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400 space-y-2">
              <p>You haven't placed any flower orders yet.</p>
              <Link to="/flowers" className="inline-block font-semibold text-botanical-700 underline">
                Browse Fresh Flowers
              </Link>
            </div>
          )}
        </div>

        {/* Upcoming Event Booking */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-terracotta-600" />
              <span>Upcoming Event Decoration</span>
            </h3>
            <Link to="/customer/bookings" className="text-xs font-semibold text-botanical-700 hover:underline">
              View All
            </Link>
          </div>

          {upcomingBooking ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono font-bold text-slate-800">#{upcomingBooking.bookingReference}</span>
                  <span className="text-slate-400 block text-[11px]">{upcomingBooking.eventType}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                  {upcomingBooking.status.replace(/_/g, ' ')}
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-ivory-100 border border-slate-200">
                <img src={upcomingBooking.serviceImage} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-semibold text-xs text-slate-900 truncate">{upcomingBooking.serviceName}</h4>
                  <span className="text-[11px] text-slate-500 block">{upcomingBooking.packageName}</span>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-botanical-800 mt-1">
                    <Clock className="w-3 h-3 text-botanical-600" />
                    <span>{new Date(upcomingBooking.eventDate).toLocaleDateString('en-IN')} • {upcomingBooking.timeSlot}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-slate-500">Deposit: <strong>₹{upcomingBooking.totalAmount.toLocaleString('en-IN')}</strong></span>
                <Link
                  to={`/customer/bookings/${upcomingBooking.id}`}
                  className="font-bold text-botanical-700 hover:text-botanical-800 flex items-center gap-1"
                >
                  <span>View Venue & Timeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400 space-y-2">
              <p>No active event decorations booked.</p>
              <Link to="/decorations" className="inline-block font-semibold text-botanical-700 underline">
                Explore Event Stylists
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
