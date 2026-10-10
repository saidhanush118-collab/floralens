import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-900">Privacy Policy</h1>
        <p className="text-xs text-slate-500 mt-1">Last Updated: October 2026 • Bloomora Technologies Pvt Ltd</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-soft space-y-6 text-xs text-slate-600 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-display text-base font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            Bloomora collects personal data necessary to execute flower orders and event decoration bookings, including customer names, delivery addresses, venue addresses, contact telephone numbers, and email communications.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-base font-bold text-slate-900">2. Payment Security & Processing</h2>
          <p>
            We process digital payments via PCI-DSS compliant Indian payment gateways (such as Razorpay). Bloomora never stores raw debit/credit card numbers, CVVs, or UPI PINs on our servers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-base font-bold text-slate-900">3. Vendor Data Sharing</h2>
          <p>
            When you confirm a decoration booking or flower order, only the relevant merchant receives your delivery/venue coordinates and contact number to facilitate setup and dispatch. Unrelated third parties never gain access to your private data.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-base font-bold text-slate-900">4. Your Data Rights</h2>
          <p>
            Customers have the right to inspect, update, or request deletion of their personal profiles and saved addresses at any time through their Customer Profile settings or by emailing care@bloomora.in.
          </p>
        </section>
      </div>
    </div>
  );
};
