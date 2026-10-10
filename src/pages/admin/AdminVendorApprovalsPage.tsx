import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Store, CheckCircle2, XCircle, AlertCircle, Phone, Mail, MapPin, Globe, ArrowLeft } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminVendorApprovalsPage: React.FC = () => {
  const { vendorApplications, approveVendorApplication, rejectVendorApplication, vendors, updateVendorProfile } = useStore();

  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
  const [rejectingAppId, setRejectingAppId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const pendingApps = vendorApplications.filter((a) => a.status === 'pending');
  const approvedVendors = vendors.filter((v) => v.status === 'approved');

  const handleApprove = (appId: string) => {
    approveVendorApplication(appId);
  };

  const handleReject = (appId: string) => {
    if (rejectReason.trim()) {
      rejectVendorApplication(appId, rejectReason.trim());
      setRejectingAppId(null);
      setRejectReason('');
    }
  };

  const handleToggleVendorSuspension = (vendorId: string, currentActive: boolean) => {
    updateVendorProfile(vendorId, { isActive: !currentActive });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back to Admin Dashboard */}
      <div>
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-purple-800 hover:border-purple-300 shadow-xs transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Admin Dashboard</span>
        </Link>
      </div>

      <div className="pb-4 border-b border-slate-200">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
          Vendor Applications & Merchant Approvals
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Review onboarding credentials for florists and decorators wanting to publish listings on Bloomora.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('pending')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
            activeTab === 'pending'
              ? 'border-purple-700 text-purple-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Pending Applications ({pendingApps.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('approved')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
            activeTab === 'approved'
              ? 'border-purple-700 text-purple-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Active Verified Merchants ({approvedVendors.length})
        </button>
      </div>

      {/* Content */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          {pendingApps.length > 0 ? (
            pendingApps.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div>
                    <h3 className="font-display font-bold text-base text-slate-900">{app.businessName}</h3>
                    <span className="text-xs text-slate-500 capitalize">{app.vendorType} Partner</span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                    Awaiting Review
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
                  <div className="space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Location & Exp:</span>
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-terracotta-500" />
                      <span>{app.city}</span>
                    </p>
                    <p>{app.yearsExperience} Years Industry Experience</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Contact Coordinates:</span>
                    <p className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{app.phone}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{app.email}</span>
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Portfolio Proof:</span>
                    {app.portfolioLinks.map((link, i) => (
                      <a
                        key={i}
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-purple-700 hover:underline flex items-center gap-1 truncate block font-medium"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>{link}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Approval Controls */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setRejectingAppId(app.id)}
                    className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-semibold border border-red-200 transition-colors"
                  >
                    Decline Application
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApprove(app.id)}
                    className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold shadow-sm transition-all"
                  >
                    Approve & Issue Merchant Storefront
                  </button>
                </div>

                {rejectingAppId === app.id && (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-2 mt-2">
                    <span className="text-xs font-bold text-red-900 block">Decline Reason for Applicant:</span>
                    <input
                      type="text"
                      placeholder="e.g. Incomplete portfolio evidence, invalid telephone"
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-red-200 focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleReject(app.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-600 text-white font-bold text-xs"
                      >
                        Confirm Decline
                      </button>
                      <button
                        type="button"
                        onClick={() => setRejectingAppId(null)}
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
              No pending vendor applications awaiting review.
            </div>
          )}
        </div>
      )}

      {activeTab === 'approved' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {approvedVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <img src={vendor.logoUrl} alt="" className="w-12 h-12 rounded-2xl object-cover bg-ivory-200" />
                  <div>
                    <h4 className="font-display font-bold text-sm text-slate-900">{vendor.businessName}</h4>
                    <span className="text-xs text-slate-500 block">{vendor.city} • {vendor.vendorType}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2">{vendor.description}</p>
                <div className="mt-2 text-xs text-slate-500">
                  Rating: <strong>{vendor.rating}★</strong> ({vendor.reviewCount} reviews) • Commission: {vendor.commissionRate}%
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    vendor.isActive
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'bg-red-50 text-red-800'
                  }`}
                >
                  {vendor.isActive ? 'Active' : 'Suspended'}
                </span>

                <button
                  type="button"
                  onClick={() => handleToggleVendorSuspension(vendor.id, vendor.isActive)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                    vendor.isActive
                      ? 'border-red-200 text-red-700 hover:bg-red-50'
                      : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  {vendor.isActive ? 'Suspend Vendor' : 'Reactivate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
