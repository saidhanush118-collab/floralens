import React, { useState } from 'react';
import { Calendar, Clock, Lock, CheckCircle2, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';

export const VendorAvailabilityPage: React.FC = () => {
  const { bookings, vendors } = useStore();
  const { user } = useAuth();

  const currentVendor =
    vendors.find((v) => v.userId === user?.id) ||
    vendors.find((v) => v.id === 'vendor-2') ||
    vendors[1] ||
    vendors[0];

  const vendorBookings = bookings.filter((b) => b.vendorId === currentVendor.id && b.status !== 'cancelled' && b.status !== 'rejected');

  const [blackoutDates, setBlackoutDates] = useState<string[]>(['2026-11-01', '2026-12-25']);
  const [newBlackoutDate, setNewBlackoutDate] = useState('');

  const handleAddBlackout = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBlackoutDate && !blackoutDates.includes(newBlackoutDate)) {
      setBlackoutDates([...blackoutDates, newBlackoutDate]);
      setNewBlackoutDate('');
    }
  };

  const handleRemoveBlackout = (d: string) => {
    setBlackoutDates(blackoutDates.filter((date) => date !== d));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
          Availability Calendar & Slot Engine
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Control active booking windows and blocked dates for <strong>{currentVendor.businessName}</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Confirmed Slot Schedule */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-botanical-700" />
              <span>Reserved & Locked Dates ({vendorBookings.length})</span>
            </h3>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Double-Booking Protected
            </span>
          </div>

          <p className="text-xs text-slate-500">
            The slots below have active client reservations. Bloomora’s database automatically disables customer selection for these conflicting time intervals.
          </p>

          <div className="space-y-3">
            {vendorBookings.map((bkg) => (
              <div
                key={bkg.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-botanical-100 text-botanical-800 flex items-center justify-center font-bold">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {new Date(bkg.eventDate).toLocaleDateString('en-IN', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-400" />
                      Slot: {bkg.timeSlot} • {bkg.eventType}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono text-[11px] text-slate-500 block">#{bkg.bookingReference}</span>
                  <span className="text-emerald-700 font-bold uppercase text-[10px]">
                    {bkg.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Blackout Dates Management */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
          <h3 className="font-display font-bold text-base text-slate-900">
            Manage Unavailable / Blackout Dates
          </h3>
          <p className="text-xs text-slate-500">
            Select dates when your decoration crew will be unavailable for holiday, maintenance, or private bookings.
          </p>

          <form onSubmit={handleAddBlackout} className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">Add Blackout Date</label>
            <div className="flex gap-2">
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={newBlackoutDate}
                onChange={(e) => setNewBlackoutDate(e.target.value)}
                className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-botanical-700 hover:bg-botanical-800 text-white font-semibold text-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Block Date</span>
              </button>
            </div>
          </form>

          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Currently Blocked ({blackoutDates.length}):
            </span>
            <div className="space-y-1.5">
              {blackoutDates.map((d) => (
                <div key={d} className="flex items-center justify-between p-2.5 rounded-xl bg-red-50/70 border border-red-100 text-xs">
                  <span className="font-semibold text-red-900">
                    {new Date(d).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveBlackout(d)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Remove blackout"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
