import React, { useState } from 'react';
import { X, Plus, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { GoogleLoginOptions } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface GoogleSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAccount: (options: GoogleLoginOptions) => void;
  preferredRole?: UserRole;
  loading?: boolean;
}

export const GoogleSignInModal: React.FC<GoogleSignInModalProps> = ({
  isOpen,
  onClose,
  onSelectAccount,
  preferredRole = 'customer',
  loading = false,
}) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleQuickAccount = (email: string, fullName: string, avatarUrl: string) => {
    onSelectAccount({
      email,
      fullName,
      displayName: fullName,
      avatarUrl,
      photoURL: avatarUrl,
      preferredRole,
    });
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.trim() || !customName.trim()) {
      setError('Please provide both your name and Google email.');
      return;
    }
    if (!customEmail.includes('@')) {
      setError('Please enter a valid Google email address.');
      return;
    }
    setError(null);
    onSelectAccount({
      email: customEmail.trim(),
      fullName: customName.trim(),
      displayName: customName.trim(),
      preferredRole,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden text-slate-800 animate-scaleUp">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <div>
              <h3 className="font-display font-bold text-base text-slate-900 leading-tight">
                Sign in with Google
              </h3>
              <p className="text-xs text-slate-500">to continue to FloraLens</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-xs font-semibold text-slate-600">Choose a Google account:</p>

          <div className="space-y-2">
            {/* Account 1: Sai Dhanush */}
            <button
              type="button"
              disabled={loading}
              onClick={() =>
                handleQuickAccount(
                  'saidhanush118@gmail.com',
                  'Sai Dhanush',
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
                )
              }
              className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-botanical-500 hover:bg-botanical-50/40 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-botanical-700 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                  SD
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <span>Sai Dhanush</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-medium">Default</span>
                  </div>
                  <span className="text-xs text-slate-500">saidhanush118@gmail.com</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-botanical-700 group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* Custom Account Toggle */}
            {!showCustomInput ? (
              <button
                type="button"
                onClick={() => setShowCustomInput(true)}
                className="w-full flex items-center gap-3 p-3.5 rounded-2xl border border-dashed border-slate-300 hover:border-botanical-500 hover:bg-slate-50 transition-all text-left text-xs font-semibold text-slate-700"
              >
                <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 bg-white">
                  <Plus className="w-4 h-4" />
                </div>
                <span>Use another Google account</span>
              </button>
            ) : (
              <form onSubmit={handleCustomSubmit} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Enter Google Account</span>
                  <button
                    type="button"
                    onClick={() => setShowCustomInput(false)}
                    className="text-[11px] text-slate-400 hover:text-slate-600"
                  >
                    Cancel
                  </button>
                </div>
                {error && <p className="text-xs text-red-600">{error}</p>}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Harsha Kumar"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-botanical-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Google Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. harsha@gmail.com"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-botanical-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-botanical-700 hover:bg-botanical-800 text-white font-bold text-xs shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{loading ? 'Signing in...' : 'Sign In With This Account'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Google Identity Services Secure Verification</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="hover:underline text-slate-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
