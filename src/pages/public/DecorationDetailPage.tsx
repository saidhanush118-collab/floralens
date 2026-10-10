import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  User,
  Phone,
  Home,
  MessageSquare,
  Store,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { StarRating } from '../../components/common/StarRating';
import { PaymentModal } from '../../components/common/PaymentModal';
import { CustomerAddress, PaymentMethod } from '../../types';

export const DecorationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    services,
    vendors,
    isSlotAvailable,
    createDecorationBooking,
    toggleWishlist,
    isWishlisted,
    reviews,
    addReview,
    addresses,
  } = useStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  const service = services.find((s) => s.id === id || s.slug === id);

  // Form states
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedPackageId, setSelectedPackageId] = useState<string>(() => service?.packages[0]?.id || '');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  
  // Date calculation default: minNoticeDays ahead
  const minDate = new Date(Date.now() + 86400000 * (service?.minNoticeDays || 2))
    .toISOString()
    .split('T')[0];
  const [eventDate, setEventDate] = useState<string>(minDate);
  const [timeSlot, setTimeSlot] = useState<string>(() => service?.availableSlots[0] || '10:00 - 13:00');

  // Venue Address State
  const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
  const [recipientName, setRecipientName] = useState(user?.fullName || defaultAddr?.recipientName || 'Ananya Sharma');
  const [phone, setPhone] = useState(user?.phone || defaultAddr?.phone || '+91 98765 43210');
  const [flatHouse, setFlatHouse] = useState(defaultAddr?.flatHouse || 'Apt 402, Magnolia Orchards');
  const [streetArea, setStreetArea] = useState(defaultAddr?.streetArea || '12th Main, Indiranagar');
  const [landmark, setLandmark] = useState(defaultAddr?.landmark || 'Near Corner House');
  const [city, setCity] = useState(service?.vendorCity || 'Bangalore');
  const [pincode, setPincode] = useState(defaultAddr?.pincode || '560038');
  const [guestCount, setGuestCount] = useState<string>('25');
  const [customizationNotes, setCustomizationNotes] = useState('');

  // Payment Modal & Booking submission
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  // Review Form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  if (!service) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-display text-2xl font-bold text-slate-800">Decoration Service Not Found</h2>
        <p className="text-xs text-slate-500">The requested event decoration listing is unavailable or removed.</p>
        <Link
          to="/decorations"
          className="inline-block px-5 py-2.5 rounded-full bg-botanical-700 text-white font-semibold text-xs"
        >
          Return to Decor Catalog
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted('decoration', service.id);
  const vendor = vendors.find((v) => v.id === service.vendorId);
  const selectedPackage = service.packages.find((p) => p.id === selectedPackageId) || service.packages[0];

  // Pricing calculations
  const packagePrice = selectedPackage?.price || service.basePrice;
  const addonsTotal = service.addons
    .filter((a) => selectedAddonIds.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);
  const platformFee = 99;
  const totalAmount = packagePrice + addonsTotal + platformFee;

  // Real-time slot availability check
  const isAvailable = isSlotAvailable(service.vendorId, eventDate, timeSlot);

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const handleOpenPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError(null);

    // Validate date
    if (!eventDate || eventDate < minDate) {
      setBookingError(`This decorator requires at least ${service.minNoticeDays} days advance notice.`);
      return;
    }

    // Validate slot
    if (!isAvailable) {
      setBookingError(
        `The slot ${timeSlot} on ${eventDate} is already reserved by another customer. Please select another slot or date.`
      );
      return;
    }

    if (!recipientName || !phone || !flatHouse || !streetArea || !pincode) {
      setBookingError('Please fill in all venue address fields.');
      return;
    }

    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = async ({
    method,
  }: {
    reference: string;
    method: PaymentMethod;
  }) => {
    setIsPaymentModalOpen(false);

    const venueAddress: CustomerAddress = {
      id: `addr-${Date.now()}`,
      userId: user?.id || 'guest',
      recipientName,
      phone,
      flatHouse,
      streetArea,
      landmark,
      city,
      state: 'Karnataka',
      pincode,
      isDefault: false,
      addressType: 'other',
    };

    const result = await createDecorationBooking({
      service,
      packageId: selectedPackage.id,
      eventDate,
      timeSlot,
      venueAddress,
      guestCount: guestCount ? parseInt(guestCount, 10) : undefined,
      customizationNotes,
      selectedAddonIds,
      paymentMethod: method,
    });

    if (result.success && result.booking) {
      navigate(`/customer/bookings/${result.booking.id}`);
    } else {
      setBookingError(result.error || 'Failed to confirm booking.');
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      addReview({
        vendorId: service.vendorId,
        itemType: 'decoration',
        itemId: service.id,
        itemName: service.name,
        rating: newRating,
        comment: newComment.trim(),
      });
      setNewComment('');
      setShowReviewForm(false);
    }
  };

  const itemReviews = reviews.filter((r) => r.itemId === service.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-botanical-800">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/decorations" className="hover:text-botanical-800">Event Decor</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-medium text-slate-800 truncate max-w-xs">{service.name}</span>
      </nav>

      {/* Hero Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Photos & Vendor Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-ivory-200 border border-slate-100 shadow-soft">
            <img
              src={service.images[selectedImageIdx] || service.images[0]}
              alt={service.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-botanical-800/90 text-white font-semibold text-xs px-3 py-1 rounded-full backdrop-blur-md">
                {service.eventType}
              </span>
            </div>
            <button
              type="button"
              onClick={() => toggleWishlist('decoration', service.id)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all shadow-md ${
                wishlisted ? 'bg-red-50 text-red-500' : 'bg-white/80 hover:bg-white text-slate-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${wishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs flex items-center gap-2">
              <Clock className="w-4 h-4 text-blush-300" />
              <span>{service.setupDurationHours} Hours Setup Time on Venue</span>
            </div>
          </div>

          {/* Thumbnails */}
          {service.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {service.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-24 h-16 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImageIdx === idx
                      ? 'border-botanical-700 ring-2 ring-botanical-200'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Service Title & Info */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-botanical-800">
                <span>{service.vendorName}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>• {service.vendorCity}</span>
              </div>
              <StarRating rating={service.rating} reviewCount={service.reviewCount} />
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              {service.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Cancellation Policy Alert */}
          <div className="p-4 rounded-2xl bg-ivory-100 border border-slate-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900">Cancellation & Refund Policy</h4>
              <p className="text-xs text-slate-600 mt-0.5">{service.cancellationPolicy}</p>
            </div>
          </div>

          {/* Vendor Profile Card */}
          {vendor && (
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <img src={vendor.logoUrl} alt={vendor.businessName} className="w-12 h-12 rounded-2xl object-cover" />
                <div>
                  <h4 className="font-semibold text-sm text-slate-900">{vendor.businessName}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{vendor.description}</p>
                  <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
                    {vendor.yearsOfExperience} Years Experience • {vendor.reviewCount} Reviews
                  </span>
                </div>
              </div>
              <Link
                to={`/vendor-profile/${vendor.id}`}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <Store className="w-3.5 h-3.5 text-slate-500" />
                <span>Portfolio</span>
              </Link>
            </div>
          )}
        </div>

        {/* Right: Booking Form & Real-time Conflict Engine */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-elevated space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-botanical-700 bg-botanical-50 px-2.5 py-1 rounded-full">
                Step-by-step Booking
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Min {service.minNoticeDays} Days Notice
              </span>
            </div>
            <h2 className="font-display text-xl font-bold text-slate-900 mt-2">
              Reserve Event Stylist
            </h2>
          </div>

          <form onSubmit={handleOpenPayment} className="space-y-6">
            {/* Step 1: Package Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                1. Select Package
              </label>
              <div className="space-y-2">
                {service.packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`w-full p-4 rounded-2xl text-left border transition-all ${
                      selectedPackage?.id === pkg.id
                        ? 'border-botanical-700 bg-botanical-50/70 shadow-sm ring-1 ring-botanical-700'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-slate-900">{pkg.name}</span>
                      <span className="font-sans font-bold text-sm text-botanical-900">
                        ₹{pkg.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">{pkg.description}</p>
                    {pkg.includedItems.length > 0 && (
                      <div className="space-y-1 pt-2 border-t border-slate-200/60">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Included items:
                        </span>
                        <ul className="text-[11px] text-slate-600 space-y-0.5">
                          {pkg.includedItems.map((item, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Date & Slot Picker with Conflict Prevention */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                2. Event Date & Time Slot
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Event Date</label>
                  <input
                    type="date"
                    required
                    min={minDate}
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-botanical-500 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Preferred Time Window</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-botanical-500"
                  >
                    {service.availableSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Slot Availability Indicator */}
              <div
                className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs ${
                  isAvailable
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}
              >
                {isAvailable ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="font-medium">
                      Slot is available on {new Date(eventDate).toLocaleDateString('en-IN')}. Ready to reserve.
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span className="font-semibold">
                      This decorator already has a confirmed booking for {timeSlot} on {eventDate}. Please choose an alternate slot.
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Step 3: Optional Add-ons */}
            {service.addons.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  3. Optional Add-ons
                </label>
                <div className="space-y-2">
                  {service.addons.map((addon) => {
                    const isChecked = selectedAddonIds.includes(addon.id);
                    return (
                      <label
                        key={addon.id}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer text-xs transition-colors ${
                          isChecked
                            ? 'border-botanical-700 bg-botanical-50/50'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleAddon(addon.id)}
                            className="rounded text-botanical-700 focus:ring-botanical-500 w-4 h-4"
                          />
                          <div>
                            <span className="font-semibold text-slate-900 block">{addon.name}</span>
                            {addon.description && (
                              <span className="text-[11px] text-slate-500">{addon.description}</span>
                            )}
                          </div>
                        </div>
                        <span className="font-sans font-bold text-slate-800 ml-2">
                          +₹{addon.price.toLocaleString('en-IN')}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Venue Address & Guest Count */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                4. Venue & Contact Details
              </label>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] text-slate-500 mb-0.5">Contact Name</label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-0.5">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-0.5">Venue Flat / House / Banquet Hall</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Banquet Hall A, Royal Orchid Hotel"
                  value={flatHouse}
                  onChange={(e) => setFlatHouse(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-0.5">Street Address & Area</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 100 Feet Rd, Indiranagar"
                  value={streetArea}
                  onChange={(e) => setStreetArea(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-500 mb-0.5">Landmark</label>
                  <input
                    type="text"
                    placeholder="Near metro"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-0.5">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-0.5">Pincode</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] text-slate-500 mb-0.5">Expected Guests</label>
                  <input
                    type="number"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-0.5">Color / Theme Preference</label>
                  <input
                    type="text"
                    placeholder="e.g. Pastel pink, gold"
                    value={customizationNotes}
                    onChange={(e) => setCustomizationNotes(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Price Summary Breakdown */}
            <div className="p-4 rounded-2xl bg-ivory-100 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>{selectedPackage.name}</span>
                <span className="font-semibold">₹{packagePrice.toLocaleString('en-IN')}</span>
              </div>
              {addonsTotal > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Selected Add-ons ({selectedAddonIds.length})</span>
                  <span className="font-semibold">+₹{addonsTotal.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Platform Booking Guarantee Fee</span>
                <span className="font-semibold">+₹{platformFee}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                <span className="font-bold text-slate-900 text-sm">Total Payable</span>
                <span className="font-display font-bold text-xl text-botanical-900 font-sans">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Error banner */}
            {bookingError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{bookingError}</span>
              </div>
            )}

            {/* Confirm & Book CTA */}
            <button
              type="submit"
              disabled={!isAvailable}
              className="w-full py-4 px-6 rounded-2xl bg-botanical-700 hover:bg-botanical-800 disabled:bg-slate-300 disabled:cursor-not-allowed active:scale-95 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Confirm & Pay Deposit (₹{totalAmount.toLocaleString('en-IN')})</span>
            </button>
          </form>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="pt-10 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Verified Reviews & Event Stories ({itemReviews.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Read real client experiences from verified bookings
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-4 py-2.5 rounded-xl bg-botanical-700 text-white font-semibold text-xs hover:bg-botanical-800 transition-colors flex items-center gap-2 self-start"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Write a Review</span>
          </button>
        </div>

        {showReviewForm && (
          <form
            onSubmit={handleSubmitReview}
            className="mb-8 p-6 rounded-2xl bg-white border border-slate-200 shadow-soft space-y-4 max-w-xl"
          >
            <h3 className="font-display font-semibold text-sm text-slate-900">Share Your Event Feedback</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Your Rating</label>
              <StarRating rating={newRating} interactive onRate={(r) => setNewRating(r)} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Written Review</label>
              <textarea
                rows={3}
                required
                placeholder="How was the punctuality, design accuracy, and setup quality?"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-botanical-500"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-botanical-700 text-white font-semibold text-xs shadow-sm"
              >
                Submit Review
              </button>
            </div>
          </form>
        )}

        {itemReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {itemReviews.map((rev) => (
              <div key={rev.id} className="p-5 rounded-2xl bg-white border border-slate-100 shadow-soft space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={rev.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                      alt={rev.userName}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="font-bold text-xs text-slate-900">{rev.userName}</span>
                  </div>
                  <StarRating rating={rev.rating} size="sm" showNumber={false} />
                </div>
                <p className="text-xs text-slate-600 italic leading-relaxed">"{rev.comment}"</p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span className="text-emerald-700 font-semibold">Verified Booking</span>
                  <span>{new Date(rev.createdAt).toLocaleDateString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-ivory-50 text-center border border-slate-200/60 max-w-md mx-auto">
            <p className="text-xs text-slate-500">
              No reviews yet for this decoration package. Be the first to share your experience!
            </p>
          </div>
        )}
      </section>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={totalAmount}
        orderDescription={`Booking Deposit: ${service.name} (${selectedPackage.name}) on ${eventDate}`}
        onSuccess={handlePaymentSuccess}
        onFailure={(err) => {
          setIsPaymentModalOpen(false);
          setBookingError(err);
        }}
      />
    </div>
  );
};
