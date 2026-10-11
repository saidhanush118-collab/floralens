import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flower2, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-botanical-700 flex items-center justify-center text-white shadow-md">
              <Flower2 className="w-6 h-6 text-blush-200" />
            </div>
            <span className="font-display text-2xl font-bold text-botanical-900">FloraLens</span>
          </Link>
          <h1 className="font-display text-2xl font-bold text-slate-900">Reset Your Password</h1>
          <p className="text-xs text-slate-500">Enter your registered email to receive a password reset link</p>
        </div>

        <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-soft space-y-5">
          {submitted ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-base text-slate-900">Reset Instructions Sent</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If an account exists with <strong>{email}</strong>, a secure password reset link has been dispatched to your inbox.
              </p>
              <div className="pt-2">
                <Link
                  to="/login"
                  className="inline-block px-5 py-2.5 rounded-xl bg-botanical-700 text-white font-semibold text-xs"
                >
                  Return to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs sm:text-sm pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-botanical-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-botanical-700 hover:bg-botanical-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                Send Password Reset Link
              </button>
            </form>
          )}

          <div className="pt-3 border-t border-slate-100 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
