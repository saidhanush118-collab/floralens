import React, { useState } from 'react';
import { MapPin, Plus, Trash2, Edit3, CheckCircle2, Home, Briefcase } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { CustomerAddress } from '../../types';

export const CustomerAddressesPage: React.FC = () => {
  const { addresses, addAddress, deleteAddress, setDefaultAddress, updateAddress } = useStore();
  const { user } = useAuth();

  const userAddresses = addresses.filter((a) => a.userId === user?.id);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [recipientName, setRecipientName] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [flatHouse, setFlatHouse] = useState('');
  const [streetArea, setStreetArea] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('Bangalore');
  const [state, setState] = useState('Karnataka');
  const [pincode, setPincode] = useState('');
  const [addressType, setAddressType] = useState<'home' | 'work' | 'other'>('home');
  const [isDefault, setIsDefault] = useState(false);

  const handleEdit = (addr: CustomerAddress) => {
    setEditingId(addr.id);
    setRecipientName(addr.recipientName);
    setPhone(addr.phone);
    setFlatHouse(addr.flatHouse);
    setStreetArea(addr.streetArea);
    setLandmark(addr.landmark || '');
    setCity(addr.city);
    setState(addr.state);
    setPincode(addr.pincode);
    setAddressType(addr.addressType);
    setIsDefault(addr.isDefault);
    setShowForm(true);
  };

  const handleResetForm = () => {
    setEditingId(null);
    setRecipientName('');
    setPhone('+91 ');
    setFlatHouse('');
    setStreetArea('');
    setLandmark('');
    setPincode('');
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName || !phone || !flatHouse || !streetArea || !pincode) return;

    if (editingId) {
      updateAddress({
        id: editingId,
        userId: user?.id || 'guest',
        recipientName,
        phone,
        flatHouse,
        streetArea,
        landmark,
        city,
        state,
        pincode,
        addressType,
        isDefault,
      });
    } else {
      addAddress({
        recipientName,
        phone,
        flatHouse,
        streetArea,
        landmark,
        city,
        state,
        pincode,
        addressType,
        isDefault,
      });
    }

    handleResetForm();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            My Delivery Addresses
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your residences, offices, and event locations across India.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            handleResetForm();
            setShowForm(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-botanical-700 hover:bg-botanical-800 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Address</span>
        </button>
      </div>

      {/* Form Drawer / Modal */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4 max-w-2xl"
        >
          <h3 className="font-display font-bold text-base text-slate-900">
            {editingId ? 'Edit Address' : 'Add New Delivery Address'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Recipient Name</label>
              <input
                type="text"
                required
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Phone</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Flat / House / Floor / Building</label>
            <input
              type="text"
              required
              value={flatHouse}
              onChange={(e) => setFlatHouse(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Street Address & Locality</label>
            <input
              type="text"
              required
              value={streetArea}
              onChange={(e) => setStreetArea(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Landmark</label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none"
              >
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Pincode</label>
              <input
                type="text"
                required
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <div className="flex items-center gap-2">
              {(['home', 'work', 'other'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setAddressType(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize border ${
                    addressType === t
                      ? 'border-botanical-700 bg-botanical-50 text-botanical-900 font-bold'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="rounded text-botanical-700"
              />
              <span>Set as Default Address</span>
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleResetForm}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-botanical-700 text-white font-semibold text-xs shadow-sm"
            >
              {editingId ? 'Save Changes' : 'Save Address'}
            </button>
          </div>
        </form>
      )}

      {/* Address List */}
      {userAddresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userAddresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-6 rounded-3xl bg-white border transition-all flex flex-col justify-between ${
                addr.isDefault
                  ? 'border-botanical-700 ring-2 ring-botanical-200 shadow-soft'
                  : 'border-slate-200 shadow-soft'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    {addr.addressType === 'home' ? (
                      <Home className="w-3.5 h-3.5 text-botanical-700" />
                    ) : (
                      <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                    )}
                    {addr.recipientName}
                  </span>
                  {addr.isDefault && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-botanical-100 text-botanical-900">
                      Default
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {addr.flatHouse}, {addr.streetArea}
                  {addr.landmark ? `, ${addr.landmark}` : ''}
                </p>
                <p className="text-xs text-slate-500">
                  {addr.city}, {addr.state} — <strong>{addr.pincode}</strong>
                </p>
                <p className="text-xs text-slate-500">Phone: {addr.phone}</p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                {!addr.isDefault ? (
                  <button
                    type="button"
                    onClick={() => setDefaultAddress(addr.id)}
                    className="font-bold text-botanical-700 hover:underline"
                  >
                    Set as Default
                  </button>
                ) : (
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Default Address
                  </span>
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(addr)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                    title="Edit"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteAddress(addr.id)}
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
      ) : (
        <div className="p-16 bg-white rounded-3xl border border-slate-200 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-botanical-50 text-botanical-700 flex items-center justify-center mx-auto">
            <MapPin className="w-8 h-8" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900">No Saved Addresses</h3>
          <p className="text-xs text-slate-500">
            You don't have any saved delivery locations yet. Add an address to speed up checkout for flowers and event decor!
          </p>
          <button
            type="button"
            onClick={() => {
              handleResetForm();
              setShowForm(true);
            }}
            className="inline-block px-5 py-2.5 rounded-full bg-botanical-700 hover:bg-botanical-800 text-white font-semibold text-xs shadow-sm transition-colors"
          >
            Add First Address
          </button>
        </div>
      )}
    </div>
  );
};
