import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  MapPin,
  Plus,
  Truck,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Lock,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { PaymentModal } from '../../components/common/PaymentModal';
import { CustomerAddress, PaymentMethod } from '../../types';

export const CheckoutPage: React.FC = () => {
  const { cart, addresses, addAddress, createFlowerOrder } = useStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Selected address state
  const [selectedAddressId, setSelectedAddressId] = useState<string>(() => {
    const def = addresses.find((a) => a.isDefault);
    return def ? def.id : addresses[0]?.id || '';
  });

  // New Address Toggle
  const [showAddAddress, setShowAddAddress] = useState(addresses.length === 0);
  const [newRecipient, setNewRecipient] = useState(user?.fullName || 'Ananya Sharma');
  const [newPhone, setNewPhone] = useState(user?.phone || '+91 98765 43210');
  const [newFlat, setNewFlat] = useState('Apt 402, Magnolia Orchards');
  const [newStreet, setNewStreet] = useState('12th Main, Indiranagar');
  const [newLandmark, setNewLandmark] = useState('Near Corner House');
  const [newCity, setNewCity] = useState('Bangalore');
  const [newState, setNewState] = useState('Karnataka');
  const [newPincode, setNewPincode] = useState('560038');
  const [newAddressType, setNewAddressType] = useState<'home' | 'work' | 'other'>('home');

  // Delivery instructions
  const [instructions, setInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Payment Modal
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  if (cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-display text-2xl font-bold text-slate-900">Your bag is empty</h2>
        <p className="text-xs text-slate-500">Please add floral items before proceeding to checkout.</p>
        <Link
          to="/flowers"
          className="inline-block px-6 py-2.5 rounded-full bg-botanical-700 text-white font-semibold text-xs"
        >
          Explore Flowers
        </Link>
      </div>
    );
  }

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecipient || !newPhone || !newFlat || !newStreet || !newPincode) {
      setCheckoutError('Please provide complete delivery address details.');
      return;
    }

    const created = addAddress({
      recipientName: newRecipient,
      phone: newPhone,
      flatHouse: newFlat,
      streetArea: newStreet,
      landmark: newLandmark,
      city: newCity,
      state: newState,
      pincode: newPincode,
      isDefault: addresses.length === 0,
      addressType: newAddressType,
    });

    setSelectedAddressId(created.id);
    setShowAddAddress(false);
    setCheckoutError(null);
  };

  const handleInitiatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError(null);

    if (!selectedAddress && !showAddAddress) {
      setCheckoutError('Please select or add a delivery address.');
      return;
    }

    // Trigger Razorpay sandbox modal
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = async ({ method }: { reference: string; method: PaymentMethod }) => {
    setIsPaymentModalOpen(false);

    let finalAddress = selectedAddress;
    if (showAddAddress) {
      finalAddress = addAddress({
        recipientName: newRecipient,
        phone: newPhone,
        flatHouse: newFlat,
        streetArea: newStreet,
        landmark: newLandmark,
        city: newCity,
        state: newState,
        pincode: newPincode,
        isDefault: false,
        addressType: newAddressType,
      });
    }

    if (!finalAddress) {
      setCheckoutError('Invalid delivery address.');
      return;
    }

    const result = await createFlowerOrder(finalAddress, method, instructions);
    if (result.success && result.order) {
      navigate(`/customer/orders/${result.order.id}`);
    } else {
      setCheckoutError(result.error || 'Failed to place order.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">Secure Checkout</h1>
          <p className="text-xs text-slate-500 mt-0.5">Fast, encrypted Indian checkout with order tracking</p>
        </div>
        <Link
          to="/cart"
          className="text-xs font-semibold text-botanical-700 hover:underline flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cart</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Address & Payment Selection */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Delivery Address */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-soft space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-botanical-700" />
                <span>1. Delivery Address</span>
              </h2>
              <button
                type="button"
                onClick={() => setShowAddAddress(!showAddAddress)}
                className="text-xs font-bold text-botanical-700 hover:text-botanical-800 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showAddAddress ? 'Select Existing Address' : 'Add New Address'}</span>
              </button>
            </div>

            {/* Existing Addresses Cards */}
            {!showAddAddress && addresses.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addresses.map((addr) => {
                  const isSelected = selectedAddressId === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-botanical-700 bg-botanical-50/60 ring-1 ring-botanical-700 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-xs text-slate-900">{addr.recipientName}</span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {addr.addressType}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {addr.flatHouse}, {addr.streetArea}
                        {addr.landmark ? `, ${addr.landmark}` : ''}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {addr.city}, {addr.state} — <strong>{addr.pincode}</strong>
                      </p>
                      <p className="text-xs text-slate-500 mt-1">Phone: {addr.phone}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Add New Address Form */}
            {showAddAddress && (
              <form onSubmit={handleAddNewAddress} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Recipient Name</label>
                    <input
                      type="text"
                      required
                      value={newRecipient}
                      onChange={(e) => setNewRecipient(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Mobile Phone Number</label>
                    <input
                      type="text"
                      required
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Flat / House / Apartment</label>
                  <input
                    type="text"
                    required
                    value={newFlat}
                    onChange={(e) => setNewFlat(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Street Address / Locality</label>
                  <input
                    type="text"
                    required
                    value={newStreet}
                    onChange={(e) => setNewStreet(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Landmark</label>
                    <input
                      type="text"
                      value={newLandmark}
                      onChange={(e) => setNewLandmark(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={newPincode}
                      onChange={(e) => setNewPincode(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-botanical-800 text-white font-semibold text-xs"
                  >
                    Save Address
                  </button>
                  {addresses.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowAddAddress(false)}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}

            {/* Delivery Instructions */}
            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Special Delivery Instructions (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Ring doorbell, leave with security guard, don't mention price on box"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-botanical-500"
              />
            </div>
          </div>

          {/* Section 2: Payment Method Choice */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-soft space-y-4">
            <h2 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-botanical-700" />
              <span>2. Payment Preference</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  paymentMethod === 'upi'
                    ? 'border-botanical-700 bg-botanical-50/70 shadow-sm ring-1 ring-botanical-700'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-slate-900">UPI Instant</span>
                  <input
                    type="radio"
                    name="pm"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="text-botanical-700"
                  />
                </div>
                <span className="text-[11px] text-slate-500">Google Pay, PhonePe, Paytm, QR</span>
              </label>

              <label
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  paymentMethod === 'card'
                    ? 'border-botanical-700 bg-botanical-50/70 shadow-sm ring-1 ring-botanical-700'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-slate-900">Credit / Debit Card</span>
                  <input
                    type="radio"
                    name="pm"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="text-botanical-700"
                  />
                </div>
                <span className="text-[11px] text-slate-500">RuPay, Visa, MasterCard</span>
              </label>

              <label
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  paymentMethod === 'netbanking'
                    ? 'border-botanical-700 bg-botanical-50/70 shadow-sm ring-1 ring-botanical-700'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-slate-900">Net Banking</span>
                  <input
                    type="radio"
                    name="pm"
                    checked={paymentMethod === 'netbanking'}
                    onChange={() => setPaymentMethod('netbanking')}
                    className="text-botanical-700"
                  />
                </div>
                <span className="text-[11px] text-slate-500">HDFC, SBI, ICICI & all Indian banks</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Order Summary & Place Order Button */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-soft space-y-6">
          <h3 className="font-display font-bold text-lg text-slate-900 pb-3 border-b border-slate-100">
            Review Items ({cart.items.length})
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img src={item.product.images[0]} alt="" className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="font-semibold text-slate-900 block truncate">{item.product.name}</span>
                    <span className="text-slate-400 text-[11px]">Qty: {item.quantity}</span>
                  </div>
                </div>
                <span className="font-bold font-sans text-slate-800 flex-shrink-0">
                  ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing calculations */}
          <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
            <div className="flex justify-between">
              <span>Items Total</span>
              <span className="font-semibold text-slate-800">₹{cart.subtotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              {cart.deliveryFee === 0 ? (
                <span className="font-bold text-emerald-700 uppercase">FREE</span>
              ) : (
                <span className="font-semibold text-slate-800">₹{cart.deliveryFee}</span>
              )}
            </div>

            <div className="flex justify-between">
              <span>Platform Fee</span>
              <span className="font-semibold text-slate-800">₹{cart.platformFee}</span>
            </div>

            {cart.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Coupon Discount</span>
                <span>-₹{cart.discount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-sm">
              <span className="font-bold text-slate-900">Total Amount</span>
              <span className="font-display font-bold text-2xl text-botanical-900 font-sans">
                ₹{cart.total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Error Message */}
          {checkoutError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{checkoutError}</span>
            </div>
          )}

          {/* Checkout CTA */}
          <button
            type="button"
            onClick={handleInitiatePayment}
            className="w-full py-4 px-6 rounded-2xl bg-botanical-700 hover:bg-botanical-800 active:scale-95 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>Pay & Place Order (₹{cart.total.toLocaleString('en-IN')})</span>
          </button>

          <div className="p-3 rounded-xl bg-ivory-100 border border-slate-200 text-slate-600 text-[11px] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Truck className="w-3.5 h-3.5 text-botanical-700" />
              <span>Express Metro Delivery</span>
            </div>
            <p>Conditioned temperature-safe packaging. Live tracking link sent after confirmation.</p>
          </div>
        </div>
      </div>

      {/* Payment Sandbox Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={cart.total}
        orderDescription={`Flower Order (${cart.items.length} arrangements)`}
        onSuccess={handlePaymentSuccess}
        onFailure={(err) => {
          setIsPaymentModalOpen(false);
          setCheckoutError(err);
        }}
      />
    </div>
  );
};
