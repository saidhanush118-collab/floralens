import React, { useState } from 'react';
import { Plus, Edit3, Trash2, CalendarCheck, Clock, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { DecorationService } from '../../types';

export const VendorServicesPage: React.FC = () => {
  const { services, vendors, createService, updateService, deleteService } = useStore();
  const { user } = useAuth();

  const currentVendor =
    vendors.find((v) => v.userId === user?.id) ||
    vendors.find((v) => v.id === 'vendor-2') ||
    vendors[1] ||
    vendors[0];

  const vendorServices = services.filter((s) => s.vendorId === currentVendor.id);

  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<DecorationService | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [eventType, setEventType] = useState('Birthday');
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState(8500);
  const [setupDurationHours, setSetupDurationHours] = useState(3.0);
  const [minNoticeDays, setMinNoticeDays] = useState(2);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80');

  const handleOpenAdd = () => {
    setEditingService(null);
    setName('');
    setDescription('Artfully styled celebration setup executed by master decorators with fresh blooms.');
    setBasePrice(8500);
    setSetupDurationHours(3.0);
    setMinNoticeDays(2);
    setImageUrl('https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80');
    setShowModal(true);
  };

  const handleOpenEdit = (s: DecorationService) => {
    setEditingService(s);
    setName(s.name);
    setEventType(s.eventType);
    setDescription(s.description);
    setBasePrice(s.basePrice);
    setSetupDurationHours(s.setupDurationHours);
    setMinNoticeDays(s.minNoticeDays);
    setImageUrl(s.images[0]);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    if (editingService) {
      updateService(editingService.id, {
        name,
        eventType,
        description,
        basePrice,
        setupDurationHours,
        minNoticeDays,
        images: [imageUrl],
      });
    } else {
      createService({
        vendorId: currentVendor.id,
        vendorName: currentVendor.businessName,
        vendorCity: currentVendor.city,
        categoryId: 'cat-dec-birthday',
        categoryName: 'Birthday',
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description,
        eventType,
        basePrice,
        setupDurationHours,
        minNoticeDays,
        cancellationPolicy: 'Free cancellation up to 48 hours prior to event start',
        serviceAreas: [currentVendor.city],
        images: [imageUrl],
        packages: [
          {
            id: `pkg-${Date.now()}-1`,
            name: 'Essential Package',
            description: 'Core aesthetic setup with organic balloons, backdrop frame, and floral touches',
            price: basePrice,
            includedItems: ['Custom backdrop', 'Fresh floral accents', 'Warm lighting'],
            isPopular: true,
          },
        ],
        addons: [
          { id: `add-${Date.now()}-1`, name: 'Warm LED Fairy Lights (50m)', price: 1500 },
        ],
        availableSlots: ['09:00 - 12:00', '13:00 - 16:00', '17:00 - 20:00'],
        isActive: true,
        isFeatured: false,
      });
    }

    setShowModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Manage Decoration Packages
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Event offerings for <strong>{currentVendor.businessName}</strong>. Define package tiers, time slots, and prices.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-botanical-700 hover:bg-botanical-800 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Decoration Service</span>
        </button>
      </div>

      {showModal && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4 max-w-2xl"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-display font-bold text-base text-slate-900">
              {editingService ? 'Edit Decoration Service' : 'Add New Event Decoration Listing'}
            </h3>
            <button type="button" onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Service / Concept Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Celestial Lavender Birthday Arch"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Occasion / Event Type</label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none"
              >
                <option value="Birthday">Birthday</option>
                <option value="Wedding">Wedding</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Engagement">Engagement</option>
                <option value="Car Decor">Car Decor</option>
                <option value="Surprise">Surprise</option>
                <option value="Baby Shower">Baby Shower</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
            <textarea
              rows={2}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Starting Price (₹)</label>
              <input
                type="number"
                required
                value={basePrice}
                onChange={(e) => setBasePrice(parseInt(e.target.value, 10) || 0)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Setup Hours</label>
              <input
                type="number"
                step="0.5"
                required
                value={setupDurationHours}
                onChange={(e) => setSetupDurationHours(parseFloat(e.target.value) || 2)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Min Notice (Days)</label>
              <input
                type="number"
                min={1}
                required
                value={minNoticeDays}
                onChange={(e) => setMinNoticeDays(parseInt(e.target.value, 10) || 1)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Portfolio Photo URL</label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-botanical-700 text-white font-semibold text-xs shadow-sm"
            >
              {editingService ? 'Save Updates' : 'Publish Listing'}
            </button>
          </div>
        </form>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendorServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-soft flex flex-col justify-between"
          >
            <div>
              <div className="h-44 w-full relative overflow-hidden bg-ivory-200">
                <img src={service.images[0]} alt="" className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-botanical-800 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  {service.eventType}
                </span>
                <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-lg bg-black/60 text-white text-[10px] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-blush-300" />
                  <span>{service.setupDurationHours} hrs setup</span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-display font-semibold text-base text-slate-900 line-clamp-1">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">{service.description}</p>
                <div className="text-xs text-slate-600 font-semibold pt-1">
                  Starting from <span className="font-bold text-slate-900 font-sans">₹{service.basePrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400">{service.packages.length} Packages</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(service)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                  title="Edit"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Delete this decoration listing?')) {
                      deleteService(service.id);
                    }
                  }}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
