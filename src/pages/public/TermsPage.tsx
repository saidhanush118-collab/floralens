import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-900">Terms of Service</h1>
        <p className="text-xs text-slate-500 mt-1">Effective Date: October 2026 • Bloomora Marketplace</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-soft space-y-6 text-xs text-slate-600 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-display text-base font-bold text-slate-900">1. Marketplace Platform Agreement</h2>
          <p>
            Bloomora connects buyers with independent third-party florists and event decoration stylists. By placing an order or reserving a decoration slot, you agree to these Terms and the merchant's stated fulfillment policy.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-base font-bold text-slate-900">2. Pricing, Currency & Platform Fees</h2>
          <p>
            All prices on Bloomora are displayed in Indian Rupees (INR ₹). Transparent platform and packaging fees are disclosed prior to final checkout. Merchants agree to honor listed package prices.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-base font-bold text-slate-900">3. Booking Reservations & Double-Booking Protection</h2>
          <p>
            Date picker selection on the frontend does not constitute a guaranteed reservation until transaction authorization and server confirmation. Bloomora’s database ensures confirmed bookings are locked and prevents conflicting overlapping time intervals.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-base font-bold text-slate-900">4. Cancellations & Refunds</h2>
          <p>
            Customer cancellations are honored according to the merchant’s stated cancellation notice window (e.g. 48 hours). Refunds are credited back to the original source payment instrument within 5 to 7 Indian banking business days.
          </p>
        </section>
      </div>
    </div>
  );
};
