import React, { useState } from 'react';
import { CalendarCheck, CheckCircle2, Clock, MapPin, XCircle, User, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { BookingStatus } from '../../types';

export const VendorBookingsPage: React.FC = () => {
  const { bookings, updateBookingStatus, vendors } = useStore();
  const { user } = useAuth();

  const currentVendor =
    vendors.find((v) => v.userId === user?.id) ||
    vendors.find((v) => v.id === 'vendor-2') ||
    vendors[1] ||
    vendors[0];

  const vendorBookings = bookings.filter((b) => b.vendorId === currentVendor.id);

  const [activeTab, setActiveTab] = useState<'all' | 'confirmed' | 'progress' | 'completed'>('all');
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const filteredBookings = vendorBookings.filter((b) => {
    if (activeTab === 'confirmed') return ['confirmed', 'pending_approval', 'pending_payment'].includes(b.status);
    if (activeTab === 'progress') return ['accepted_by_vendor', 'preparing', 'setup_in_progress'].includes(b.status);
    if (activeTab === 'completed') return ['completed', 'cancelled', 'rejected'].includes(b.status);
    return true;
  });

  const handleUpdateStatus = (bookingId: string, nextStatus: BookingStatus) => {
    updateBookingStatus(bookingId, nextStatus);
  };

  const handleRejectBooking = (bookingId: string) => {
    if (rejectReason.trim()) {
      updateBookingStatus(bookingId, 'rejected', rejectReason.trim());
      setRejectingId(null);
      setRejectReason('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
          Event Decoration Bookings
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage event appointments, venue setups, and crew timeline for <strong>{currentVendor.businessName}</strong>.
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
          All Bookings ({vendorBookings.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('confirmed')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
            activeTab === 'confirmed' ? 'border-botanical-700 text-botanical-800' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          New Confirmed
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('progress')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
            activeTab === 'progress' ? 'border-botanical-700 text-botanical-800' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Setup In Progress
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('completed')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
            activeTab === 'completed' ? 'border-botanical-700 text-botanical-800' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Completed / Closed
        </button>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((bkg) => (
            <div
              key={bkg.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2 text-xs">
                <div>
                  <span className="font-mono font-bold text-sm text-slate-900">#{bkg.bookingReference}</span>
                  <span className="text-slate-400 mx-2">•</span>
                  <span className="font-semibold text-botanical-800">{bkg.eventType}</span>
                  <span className="text-slate-400 mx-2">•</span>
                  <span className="font-bold text-slate-900">
                    Event Date: {new Date(bkg.eventDate).toLocaleDateString('en-IN')} ({bkg.timeSlot})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-sm text-slate-900 font-sans">
                    ₹{bkg.totalAmount.toLocaleString('en-IN')}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {bkg.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              {/* Service & Venue Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-ivory-50 border border-slate-200">
                    <img src={bkg.serviceImage} alt="" className="w-14 h-14 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-slate-900">{bkg.serviceName}</h4>
                      <span className="text-slate-500 text-[11px] block">{bkg.packageName}</span>
                      {bkg.selectedAddons.length > 0 && (
                        <span className="text-[10px] text-botanical-700 font-semibold block mt-0.5">
                          + {bkg.selectedAddons.map((a) => a.name).join(', ')}
                        </span>
                      )}
                    </div>
                  </div>

                  {bkg.customizationNotes && (
                    <p className="mt-2 text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 italic">
                      Client Notes: "{bkg.customizationNotes}"
                    </p>
                  )}
                </div>

                <div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 text-slate-600 space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Venue Coordinates:</span>
                    <p className="font-bold text-slate-900">{bkg.venueAddress.recipientName}</p>
                    <p>{bkg.venueAddress.flatHouse}, {bkg.venueAddress.streetArea}</p>
                    <p>{bkg.venueAddress.city} — {bkg.venueAddress.pincode}</p>
                    <p className="text-slate-500">Phone: {bkg.venueAddress.phone}</p>
                    {bkg.guestCount && <p className="text-slate-500">Attendees: ~{bkg.guestCount}</p>}
                  </div>
                </div>
              </div>

              {/* Status Actions */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-slate-400 text-[11px]">Workflow Actions:</span>

                <div className="flex flex-wrap items-center gap-2">
                  {bkg.status === 'confirmed' && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(bkg.id, 'accepted_by_vendor')}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors"
                      >
                        Accept Appointment
                      </button>
                      <button
                        type="button"
                        onClick={() => setRejectingId(bkg.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-semibold border border-red-200"
                      >
                        Decline
                      </button>
                    </>
                  )}

                  {bkg.status === 'accepted_by_vendor' && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(bkg.id, 'preparing')}
                      className="px-3.5 py-1.5 rounded-xl bg-botanical-700 hover:bg-botanical-800 text-white font-semibold"
                    >
                      Preparing Floral & Props Inventory
                    </button>
                  )}

                  {bkg.status === 'preparing' && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(bkg.id, 'setup_in_progress')}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold flex items-center gap-1.5"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Crew On Venue (Setup In Progress)</span>
                    </button>
                  )}

                  {bkg.status === 'setup_in_progress' && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(bkg.id, 'completed')}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                    >
                      Mark Setup Complete & Handover
                    </button>
                  )}

                  {bkg.status === 'completed' && (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Celebration Setup Completed
                    </span>
                  )}
                </div>
              </div>

              {/* Decline Reason Modal */}
              {rejectingId === bkg.id && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-2 mt-2">
                  <span className="text-xs font-bold text-red-900 block">Provide Reason for Declining Booking:</span>
                  <input
                    type="text"
                    placeholder="e.g. Venue beyond operating radius, private booking conflict"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-red-200 focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleRejectBooking(bkg.id)}
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
            No bookings under this status.
          </div>
        )}
      </div>
    </div>
  );
};
