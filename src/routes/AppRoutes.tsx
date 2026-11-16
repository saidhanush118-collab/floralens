import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Flower2, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

// Public Pages
import { HomePage } from '../pages/public/HomePage';
import { ShopFlowersPage } from '../pages/public/ShopFlowersPage';
import { FlowerDetailPage } from '../pages/public/FlowerDetailPage';
import { DecorationServicesPage } from '../pages/public/DecorationServicesPage';
import { DecorationDetailPage } from '../pages/public/DecorationDetailPage';
import { VendorProfilePage } from '../pages/public/VendorProfilePage';
import { SearchResultsPage } from '../pages/public/SearchResultsPage';
import { CartPage } from '../pages/public/CartPage';
import { CheckoutPage } from '../pages/public/CheckoutPage';
import { PaymentPage } from '../pages/public/PaymentPage';
import { OrderTrackingPage } from '../pages/public/OrderTrackingPage';
import { AboutPage } from '../pages/public/AboutPage';
import { ContactPage } from '../pages/public/ContactPage';
import { FAQPage } from '../pages/public/FAQPage';
import { PrivacyPage } from '../pages/public/PrivacyPage';
import { TermsPage } from '../pages/public/TermsPage';

// Auth Pages
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';

// Customer Pages
import { CustomerDashboard } from '../pages/customer/CustomerDashboard';
import { CustomerOrdersPage } from '../pages/customer/CustomerOrdersPage';
import { CustomerOrderDetailPage } from '../pages/customer/CustomerOrderDetailPage';
import { CustomerBookingsPage } from '../pages/customer/CustomerBookingsPage';
import { CustomerBookingDetailPage } from '../pages/customer/CustomerBookingDetailPage';
import { CustomerAddressesPage } from '../pages/customer/CustomerAddressesPage';
import { CustomerWishlistPage } from '../pages/customer/CustomerWishlistPage';
import { CustomerProfilePage } from '../pages/customer/CustomerProfilePage';

// Vendor Pages
import { VendorRegisterPage } from '../pages/vendor/VendorRegisterPage';
import { VendorDashboard } from '../pages/vendor/VendorDashboard';
import { VendorProductsPage } from '../pages/vendor/VendorProductsPage';
import { VendorServicesPage } from '../pages/vendor/VendorServicesPage';
import { VendorOrdersPage } from '../pages/vendor/VendorOrdersPage';
import { VendorBookingsPage } from '../pages/vendor/VendorBookingsPage';
import { VendorAvailabilityPage } from '../pages/vendor/VendorAvailabilityPage';

// Admin Pages
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminVendorApprovalsPage } from '../pages/admin/AdminVendorApprovalsPage';
import { AdminModerationPage } from '../pages/admin/AdminModerationPage';
import { AdminOrdersBookingsPage } from '../pages/admin/AdminOrdersBookingsPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, isLoading, sessionError, switchDemoRole } = useAuth();
  const location = useLocation();

  // 1. Loading State: Never flash private content or prematurely redirect
  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 px-4 py-20 text-center animate-fadeIn">
        <div className="w-14 h-14 rounded-2xl bg-botanical-50 border border-botanical-200 flex items-center justify-center shadow-soft">
          <Flower2 className="w-7 h-7 text-botanical-700 animate-spin" />
        </div>
        <div className="space-y-1">
          <h3 className="font-display text-lg font-bold text-slate-800">Verifying Secure Session</h3>
          <p className="text-xs text-slate-500">Checking credentials against authoritative authentication provider...</p>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated / Deleted / Expired User: Redirect to Login with location and error message
  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
          message: sessionError || 'Please sign in to access this protected section.',
        }}
        replace
      />
    );
  }

  // 3. Role Restriction Check
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
          <strong>Restricted Portal:</strong> Your current session role is <strong>{user.role}</strong>. This section is restricted to <strong>{allowedRoles.join(', ')}</strong>.
        </div>
        <p className="text-xs text-slate-500">
          In demo mode, you can instantly switch roles to preview this view:
        </p>
        <button
          type="button"
          onClick={() => switchDemoRole(allowedRoles[0])}
          className="px-5 py-2.5 rounded-xl bg-botanical-700 hover:bg-botanical-800 text-white font-bold text-xs"
        >
          Switch to {allowedRoles[0].toUpperCase()} Role Now
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/flowers" element={<ShopFlowersPage />} />
      <Route path="/flowers/:id" element={<FlowerDetailPage />} />
      <Route path="/decorations" element={<DecorationServicesPage />} />
      <Route path="/decorations/:id" element={<DecorationDetailPage />} />
      <Route path="/vendor-profile/:id" element={<VendorProfilePage />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/track-order" element={<OrderTrackingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />

      {/* Auth Pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Protected General User Routes */}
      <Route
        path="/checkout"
        element={
          <ProtectedRoute allowedRoles={['customer', 'vendor', 'admin']}>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <ProtectedRoute allowedRoles={['customer', 'vendor', 'admin']}>
            <PaymentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute allowedRoles={['customer', 'vendor', 'admin']}>
            <CustomerOrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={['customer', 'vendor', 'admin']}>
            <CustomerProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute allowedRoles={['customer', 'vendor', 'admin']}>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute allowedRoles={['customer', 'vendor', 'admin']}>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Customer Pages */}
      <Route
        path="/customer"
        element={
          <ProtectedRoute allowedRoles={['customer', 'vendor', 'admin']}>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/orders"
        element={
          <ProtectedRoute allowedRoles={['customer', 'vendor', 'admin']}>
            <CustomerOrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/orders/:id"
        element={
          <ProtectedRoute allowedRoles={['customer', 'vendor', 'admin']}>
            <CustomerOrderDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/bookings"
        element={
          <ProtectedRoute allowedRoles={['customer', 'vendor', 'admin']}>
            <CustomerBookingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/bookings/:id"
        element={
          <ProtectedRoute allowedRoles={['customer', 'vendor', 'admin']}>
            <CustomerBookingDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/addresses"
        element={
          <ProtectedRoute allowedRoles={['customer', 'vendor', 'admin']}>
            <CustomerAddressesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/wishlist"
        element={
          <ProtectedRoute allowedRoles={['customer', 'vendor', 'admin']}>
            <CustomerWishlistPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/profile"
        element={
          <ProtectedRoute allowedRoles={['customer', 'vendor', 'admin']}>
            <CustomerProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Vendor Pages */}
      <Route path="/vendor/register" element={<VendorRegisterPage />} />
      <Route
        path="/vendor"
        element={
          <ProtectedRoute allowedRoles={['vendor', 'admin']}>
            <VendorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor/products"
        element={
          <ProtectedRoute allowedRoles={['vendor', 'admin']}>
            <VendorProductsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor/services"
        element={
          <ProtectedRoute allowedRoles={['vendor', 'admin']}>
            <VendorServicesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor/orders"
        element={
          <ProtectedRoute allowedRoles={['vendor', 'admin']}>
            <VendorOrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor/bookings"
        element={
          <ProtectedRoute allowedRoles={['vendor', 'admin']}>
            <VendorBookingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor/availability"
        element={
          <ProtectedRoute allowedRoles={['vendor', 'admin']}>
            <VendorAvailabilityPage />
          </ProtectedRoute>
        }
      />

      {/* Admin Pages */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/vendors"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminVendorApprovalsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/moderation"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminModerationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/orders-bookings"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminOrdersBookingsPage />
          </ProtectedRoute>
        }
      />

      {/* Catch-all 404 Route */}
      <Route
        path="*"
        element={
          <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
            <h1 className="font-display text-4xl font-bold text-slate-900">404</h1>
            <p className="text-xs text-slate-500">Page not found in FloraLens Marketplace.</p>
            <a
              href="/"
              className="inline-block px-5 py-2.5 rounded-full bg-botanical-700 text-white font-semibold text-xs"
            >
              Back to Home
            </a>
          </div>
        }
      />
    </Routes>
  );
};
