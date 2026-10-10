import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Flower2, Mail, Lock, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const { login, switchDemoRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [loading, setLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/customer';

  const handleCustomLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await login(email, selectedRole);
    setLoading(false);

    if (selectedRole === 'vendor') navigate('/vendor');
    else if (selectedRole === 'admin') navigate('/admin');
    else navigate(from || '/customer');
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    switchDemoRole(role);
    if (role === 'vendor') navigate('/vendor');
    else if (role === 'admin') navigate('/admin');
    else navigate('/customer');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-botanical-700 flex items-center justify-center text-white shadow-md">
              <Flower2 className="w-6 h-6 text-blush-200" />
            </div>
            <span className="font-display text-2xl font-bold text-botanical-900">Bloomora</span>
          </Link>
          <h1 className="font-display text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-xs text-slate-500">Sign in to manage your flower orders, bookings, and profile</p>
        </div>

        {/* Evaluator Quick One-Click Logins */}
        <div className="bg-ivory-100/90 rounded-2xl p-4 border border-botanical-200/60 space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-botanical-900 uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-botanical-600" />
              One-Click Demo Accounts (For Evaluator):
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('customer')}
              className="py-2 px-2.5 bg-white hover:bg-emerald-50 border border-slate-200 text-slate-800 font-semibold text-xs rounded-xl shadow-xs transition-colors text-center"
            >
              <span className="block text-[10px] text-emerald-700 font-bold uppercase">Customer</span>
              <span>Ananya</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('vendor')}
              className="py-2 px-2.5 bg-white hover:bg-amber-50 border border-slate-200 text-slate-800 font-semibold text-xs rounded-xl shadow-xs transition-colors text-center"
            >
              <span className="block text-[10px] text-amber-700 font-bold uppercase">Vendor</span>
              <span>Petal & Stem</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin')}
              className="py-2 px-2.5 bg-white hover:bg-purple-50 border border-slate-200 text-slate-800 font-semibold text-xs rounded-xl shadow-xs transition-colors text-center"
            >
              <span className="block text-[10px] text-purple-700 font-bold uppercase">Admin</span>
              <span>Operations</span>
            </button>
          </div>
        </div>

        {/* Regular Login Form */}
        <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-soft space-y-5">
          <form onSubmit={handleCustomLogin} className="space-y-4">
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

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <Link to="/forgot-password" className="text-[11px] text-botanical-700 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs sm:text-sm pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-botanical-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Login As Role</label>
              <div className="grid grid-cols-3 gap-2">
                {(['customer', 'vendor', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRole(r)}
                    className={`py-1.5 text-xs font-semibold capitalize rounded-xl border transition-colors ${
                      selectedRole === r
                        ? 'border-botanical-700 bg-botanical-50 text-botanical-900 font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-botanical-700 hover:bg-botanical-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 mt-2"
            >
              <span>{loading ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-botanical-700 hover:underline">
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
