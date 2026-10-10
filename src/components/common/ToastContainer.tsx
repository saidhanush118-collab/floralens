import React from 'react';
import { Link } from 'react-router-dom';
import { X, CheckCircle, Bell, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ToastContainer: React.FC = () => {
  const { notifications, markNotificationRead } = useStore();

  // Show only unread notifications (latest 3)
  const activeToasts = notifications.filter((n) => !n.isRead).slice(0, 3);

  if (activeToasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {activeToasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-white border border-botanical-100 shadow-xl rounded-xl p-3.5 flex items-start gap-3 transition-all transform animate-slideUp"
        >
          <div className="p-2 rounded-lg bg-botanical-50 text-botanical-700 flex-shrink-0 mt-0.5">
            {toast.type === 'order' || toast.type === 'booking' ? (
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            ) : (
              <Bell className="w-4 h-4 text-botanical-600" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-bold text-slate-800">{toast.title}</h5>
            <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{toast.message}</p>
            {toast.linkUrl && (
              <Link
                to={toast.linkUrl}
                onClick={() => markNotificationRead(toast.id)}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-botanical-700 hover:text-botanical-800 mt-1.5"
              >
                <span>View Details</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>

          <button
            type="button"
            onClick={() => markNotificationRead(toast.id)}
            className="text-slate-400 hover:text-slate-600 p-1 flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
