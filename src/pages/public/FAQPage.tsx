import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How fast can fresh flowers be delivered in my city?',
      a: 'In major metropolitan cities (Bangalore, Mumbai, Delhi NCR, Jaipur, Chennai), our express delivery delivers handpicked arrangements within 2 to 3 hours of order confirmation. You can enter your 6-digit postal pincode on any flower product page to verify instant arrival times.',
    },
    {
      q: 'How does event decoration booking work on FloraLens?',
      a: 'Select an event type (Birthday, Wedding, Anniversary, etc.), choose your preferred package tier, customize with optional add-ons, pick an available date and time slot, and enter the venue address. FloraLens checks our database to ensure the stylist has zero conflicting bookings for that slot. Once paid, the decorator confirms the appointment and arrives on venue to execute the setup.',
    },
    {
      q: 'What is the cancellation and refund policy for decorators?',
      a: 'Most decorators provide 100% full refunds if cancelled at least 48 to 72 hours before the scheduled event setup time. Each decoration listing clearly specifies the merchant’s exact notice requirements and refund timeline.',
    },
    {
      q: 'Can a decorator be booked by multiple customers for the same time slot?',
      a: 'Never. FloraLens utilizes strict double-booking constraints. The moment a booking deposit is completed, that vendor slot is exclusively locked for your event, preventing any scheduling conflicts.',
    },
    {
      q: 'What payment methods are supported in India?',
      a: 'We support all major Indian digital payment methods including Unified Payments Interface (UPI via Google Pay, PhonePe, Paytm, CRED), RuPay Debit/Credit cards, Visa, MasterCard, and Netbanking across top Indian banks.',
    },
    {
      q: 'How do I join as a flower shop or event decorator?',
      a: 'Click "Become a Vendor" in the navigation bar. Complete our quick partner onboarding application with your business details and portfolio links. Once approved by our moderation team, you can immediately publish catalogs and accept bookings.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <span className="text-xs font-bold text-botanical-700 uppercase tracking-wider bg-botanical-50 px-3 py-1 rounded-full border border-botanical-200">
          Knowledge Base
        </span>
        <h1 className="font-display text-3xl font-bold text-slate-900">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Everything you need to know about ordering flowers and booking event decorators on FloraLens.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-soft transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-slate-900 hover:text-botanical-800"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-botanical-700' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                  <p className="pt-3">{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
