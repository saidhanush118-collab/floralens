import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowRight, Clock, MapPin, Truck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';

export const CustomerOrdersPage: React.FC = () => {
  const { orders } = useStore();
  const { user } = useAuth();

  const userOrders = orders.filter((o) => o.userId === user?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            My Flower Orders
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            View history, delivery timeline, and receipts for all bouquet orders.
          </p>
        </div>
        <Link
          to="/flowers"
          className="px-4 py-2.5 rounded-xl bg-botanical-700 hover:bg-botanical-800 text-white font-semibold text-xs shadow-sm self-start sm:self-auto"
        >
          Order Fresh Flowers
        </Link>
      </div>

      {userOrders.length > 0 ? (
        <div className="space-y-4">
          {userOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft hover:shadow-elevated transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-3 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono font-bold text-sm text-slate-900">#{order.orderNumber}</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-semibold text-botanical-700">
                    {order.vendorName}
                  </span>
                </div>

                {/* Items preview */}
                <div className="flex flex-wrap gap-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="inline-flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                    >
                      <img src={item.productImage} alt="" className="w-8 h-8 rounded-lg object-cover" />
                      <span className="font-medium text-slate-800 line-clamp-1 max-w-[180px]">{item.productName}</span>
                      <span className="text-slate-400 text-[11px]">x{item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate max-w-md">
                    Delivering to: {order.deliveryAddress.recipientName}, {order.deliveryAddress.city}
                  </span>
                </div>
              </div>

              {/* Status and Action */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-0 border-slate-100 gap-3">
                <div className="text-left md:text-right">
                  <span className="font-display font-bold text-base sm:text-lg text-slate-900 font-sans block">
                    ₹{order.totalAmount.toLocaleString('en-IN')}
                  </span>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mt-1 ${
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

                <Link
                  to={`/customer/orders/${order.id}`}
                  className="px-4 py-2 rounded-xl bg-ivory-100 hover:bg-ivory-200 border border-slate-200 text-xs font-bold text-botanical-800 flex items-center gap-1.5 transition-colors"
                >
                  <span>Track Order</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 bg-white rounded-3xl border border-slate-200 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-botanical-50 text-botanical-700 flex items-center justify-center mx-auto">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900">No Orders Yet</h3>
          <p className="text-xs text-slate-500">
            Surprise your loved ones with hand-arranged Dutch roses and exotic lilies.
          </p>
          <Link
            to="/flowers"
            className="inline-block px-5 py-2.5 rounded-full bg-botanical-700 text-white font-semibold text-xs shadow-sm"
          >
            Explore Fresh Flowers
          </Link>
        </div>
      )}
    </div>
  );
};
