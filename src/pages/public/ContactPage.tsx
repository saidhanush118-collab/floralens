import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSent(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <span className="text-xs font-bold text-botanical-700 uppercase tracking-wider bg-botanical-50 px-3 py-1 rounded-full border border-botanical-200">
          We’re Here to Help
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
          Contact Bloomora Support
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Have an urgent wedding decor question or custom bouquet request? Our team is available 7 days a week.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info */}
        <div className="lg:col-span-5 bg-botanical-900 text-white rounded-3xl p-8 space-y-6">
          <h3 className="font-display text-xl font-bold text-blush-200">Get In Touch</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Our concierge team assists with venue coordination, delivery timelines, custom florist arrangements, and payment queries.
          </p>

          <div className="space-y-4 text-xs text-slate-300 pt-2">
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-terracotta-400 mt-0.5" />
              <div>
                <strong className="text-white block">Helpline</strong>
                <span>+91 (080) 4123-9000 (Mon–Sun 8 AM to 10 PM IST)</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-terracotta-400 mt-0.5" />
              <div>
                <strong className="text-white block">Email Inquiries</strong>
                <span>care@bloomora.in • support@bloomora.in</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-terracotta-400 mt-0.5" />
              <div>
                <strong className="text-white block">Head Office</strong>
                <span>Bloomora Technologies Pvt Ltd, 12th Main, HAL 2nd Stage, Indiranagar, Bangalore 560038</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-soft">
          {sent ? (
            <div className="text-center py-10 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-display font-bold text-xl text-slate-900">Message Received</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Thank you for reaching out. A Bloomora concierge specialist will respond to <strong>{email}</strong> within 2 business hours.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-4 px-5 py-2.5 rounded-xl bg-botanical-700 text-white font-semibold text-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Inquiring about wedding decor in Bangalore"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your event, delivery address, or questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-botanical-700 hover:bg-botanical-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
