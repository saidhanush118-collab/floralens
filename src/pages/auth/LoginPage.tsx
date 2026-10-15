import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Flower2,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Store,
  Users,
  Shield,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const { login, loginWithGoogle, switchDemoRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const from = (location.state as any)?.from?.pathname || '/customer';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCustomLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!email || !email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!password || !password.trim()) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      const res = await login(email.trim(), password.trim(), selectedRole);

      if (!res.success) {
        setErrorMessage(res.error || 'Authentication failed. Please verify your credentials.');
        return;
      }

      showToast(`Welcome back! Logged in as ${res.user?.fullName || selectedRole.toUpperCase()}`);

      setTimeout(() => {
        const targetRole = res.user?.role || selectedRole;
        if (targetRole === 'vendor') navigate('/vendor');
        else if (targetRole === 'admin') navigate('/admin');
        else navigate(from || '/customer');
      }, 400);
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    const res = await loginWithGoogle(selectedRole);
    setGoogleLoading(false);

    if (res.success) {
      showToast(res.message || 'Google account verified! Redirecting...');
      setTimeout(() => {
        if (selectedRole === 'vendor') navigate('/vendor');
        else if (selectedRole === 'admin') navigate('/admin');
        else navigate(from || '/customer');
      }, 500);
    }
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    switchDemoRole(role);
    showToast(`Switched to Demo ${role.toUpperCase()} account`);
    setTimeout(() => {
      if (role === 'vendor') navigate('/vendor');
      else if (role === 'admin') navigate('/admin');
      else navigate('/customer');
    }, 300);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10 bg-gradient-to-b from-ivory-100 via-white to-ivory-50">
      <div className="w-full max-w-md space-y-6">
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-botanical-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to FloraLens Store</span>
          </Link>
          <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Secure Portal
          </span>
        </div>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-1 group">
            <div className="w-12 h-12 rounded-2xl bg-botanical-700 flex items-center justify-center text-white shadow-lg shadow-botanical-900/15 group-hover:scale-105 transition-transform">
              <Flower2 className="w-7 h-7 text-blush-200" />
            </div>
            <div className="text-left">
              <span className="font-display text-2xl font-bold tracking-tight text-botanical-900 block leading-tight">
                FloraLens
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block -mt-0.5">
                Flower & Decor Marketplace
              </span>
            </div>
          </Link>
          <h1 className="font-display text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-xs text-slate-500">Sign in to your FloraLens account to track orders, manage bookings, and profile</p>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fadeIn shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-start gap-2.5 animate-fadeIn shadow-sm">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1 w-full">
              <span>{errorMessage}</span>
              {errorMessage.includes('No account found') && (
                <div className="text-[11px] font-normal text-red-700">
                  Don't have an account yet?{' '}
                  <Link to="/register" className="font-bold underline text-red-900">
                    Register here &rarr;
                  </Link>
                </div>
              )}
              {errorMessage.includes('Database connection unavailable') && (
                <div className="text-[11px] font-normal text-red-700 pt-1">
                  Tip: Ensure both API and web are running (`npm run dev`). If connecting from a new IP or network, verify MongoDB Atlas Network Access is enabled.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Demo Access Bar */}
        <div className="bg-gradient-to-r from-ivory-100 to-botanical-50/50 rounded-2xl p-4 border border-botanical-200/70 space-y-2.5 shadow-xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-botanical-900 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-botanical-600" />
              One-Click Instant Demo Login:
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('customer')}
              className="py-2.5 px-2 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-800 font-semibold text-xs rounded-xl shadow-xs transition-all text-center group"
            >
              <span className="block text-[10px] text-emerald-700 font-bold uppercase flex items-center justify-center gap-1">
                <Users className="w-3 h-3" /> Customer
              </span>
              <span className="font-bold text-slate-900 group-hover:text-emerald-800">Ananya</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('vendor')}
              className="py-2.5 px-2 bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-slate-800 font-semibold text-xs rounded-xl shadow-xs transition-all text-center group"
            >
              <span className="block text-[10px] text-amber-700 font-bold uppercase flex items-center justify-center gap-1">
                <Store className="w-3 h-3" /> Vendor
              </span>
              <span className="font-bold text-slate-900 group-hover:text-amber-800">Petal & Stem</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin')}
              className="py-2.5 px-2 bg-white hover:bg-purple-50 border border-slate-200 hover:border-purple-300 text-slate-800 font-semibold text-xs rounded-xl shadow-xs transition-all text-center group"
            >
              <span className="block text-[10px] text-purple-700 font-bold uppercase flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" /> Admin
              </span>
              <span className="font-bold text-slate-900 group-hover:text-purple-800">Operations</span>
            </button>
          </div>
        </div>

        {/* Regular Login Card */}
        <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-soft space-y-5">
          {/* Role Selection Tabs */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Select Account Role</label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-ivory-100 rounded-2xl border border-slate-200">
              {(['customer', 'vendor', 'admin'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRole(r)}
                  className={`py-2 text-xs font-bold capitalize rounded-xl transition-all ${
                    selectedRole === r
                      ? 'bg-botanical-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Social Sign-In: Google Button */}
          <div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-3 active:scale-[0.99] disabled:opacity-60"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>{googleLoading ? 'Connecting with Google...' : 'Continue with Google'}</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider absolute">
              or sign in with email
            </span>
          </div>

          <form onSubmit={handleCustomLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder={
                    selectedRole === 'vendor'
                      ? 'priya@petalstem.in'
                      : selectedRole === 'admin'
                      ? 'admin@floralens.in'
                      : 'ananya.sharma@example.com'
                  }
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full text-xs sm:text-sm pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-botanical-500 focus:border-botanical-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <Link to="/forgot-password" className="text-[11px] text-botanical-700 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full text-xs sm:text-sm pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-botanical-500 focus:border-botanical-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-botanical-700 focus:ring-botanical-500 border-slate-300"
                />
                <span>Remember this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-botanical-700 hover:bg-botanical-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-botanical-900/15 transition-all active:scale-95 flex items-center justify-center gap-2 mt-2"
            >
              <span>{loading ? 'Signing In...' : `Sign In as ${selectedRole.toUpperCase()}`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-500 space-y-2">
            <div>
              Don't have an account yet?{' '}
              <Link to="/register" className="font-bold text-botanical-700 hover:underline">
                Create an Account
              </Link>
            </div>
            <div>
              Are you a local florist or decorator?{' '}
              <Link to="/vendor/register" className="font-bold text-terracotta-600 hover:underline">
                Partner with FloraLens
              </Link>
            </div>
          </div>
        </div>

        {/* Security Assurance */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Encrypted 256-bit authentication • FloraLens Security</span>
        </div>
      </div>
    </div>
  );
};
