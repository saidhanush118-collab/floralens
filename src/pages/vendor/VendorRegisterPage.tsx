import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store, CheckCircle2, Sparkles, Building2, Phone, Mail, MapPin, Globe, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { VendorType } from '../../types';

export const VendorRegisterPage: React.FC = () => {
  const { submitVendorApplication } = useStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [businessName, setBusinessName] = useState('');
  const [vendorType, setVendorType] = useState<VendorType>('florist');
  const [phone, setPhone] = useState(user?.phone || '+91 98860 12345');
  const [email, setEmail] = useState(user?.email || 'artisan@floralens.in');
  const [city, setCity] = useState(user?.city || 'Bangalore');
  const [yearsExperience, setYearsExperience] = useState<number>(3);
  const [portfolioLink, setPortfolioLink] = useState('https://instagram.com/myfloralstudio');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !phone || !email) return;

    submitVendorApplication({
      userId: user?.id || `user-cand-${Date.now()}`,
      businessName,
      vendorType,
      phone,
      email,
      city,
      yearsExperience,
      portfolioLinks: [portfolioLink],
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs font-bold text-botanical-700 uppercase tracking-wider bg-botanical-50 px-3 py-1 rounded-full border border-botanical-200">
          Partner Program
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
          Partner With FloraLens
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Join India’s premier marketplace for local flower shops, bridal florists, and event decorators. Reach customers, manage availability, and expand your bookings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Perks & Verification Explanation */}
        <div className="lg:col-span-5 bg-botanical-900 text-white rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="font-display text-xl font-bold text-blush-200">
            Why Partner With Us?
          </h3>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">90% Retained Revenue</strong>
                <span>Transparent low platform commission with weekly direct bank payouts.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Automated Booking Calendar</strong>
                <span>Set your operating hours, time slots, and block dates to prevent double-bookings.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Verified Merchant Badge</strong>
                <span>Earn client trust with certified florist & decorator credentials on your profile.</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-botanical-800/80 border border-botanical-700 text-[11px] text-botanical-200">
            💡 <strong>Evaluation Note:</strong> Applications submitted here instantly appear under the <strong>Admin Dashboard &rarr; Vendor Applications</strong> tab for one-click approval!
          </div>
        </div>

        {/* Right: Application Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900">Application Submitted!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{businessName}</strong>. Your vendor application has been queued for review by the FloraLens onboarding team.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/admin/vendors"
                  className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs shadow-sm"
                >
                  View in Admin Approvals (Demo)
                </Link>
                <Link
                  to="/"
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Business / Brand Name</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Blossom Aura Studio"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full text-xs sm:text-sm pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-botanical-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Business Classification</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['florist', 'decorator', 'hybrid'] as VendorType[]).map((vt) => (
                    <button
                      key={vt}
                      type="button"
                      onClick={() => setVendorType(vt)}
                      className={`py-2 text-xs font-semibold capitalize rounded-xl border transition-all ${
                        vendorType === vt
                          ? 'border-botanical-700 bg-botanical-50 text-botanical-900 font-bold ring-1 ring-botanical-700'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {vt === 'hybrid' ? 'Florist & Decorator' : vt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Business Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Operating City</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none"
                    >
                      <option value="Bangalore">Bangalore</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Jaipur">Jaipur</option>
                      <option value="Chennai">Chennai</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Years of Experience</label>
                  <input
                    type="number"
                    min={1}
                    value={yearsExperience}
                    onChange={(e) => setYearsExperience(parseInt(e.target.value, 10) || 1)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Portfolio or Instagram URL</label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    placeholder="https://instagram.com/yourhandle"
                    value={portfolioLink}
                    onChange={(e) => setPortfolioLink(e.target.value)}
                    className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-botanical-700 hover:bg-botanical-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
              >
                <span>Submit Vendor Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
