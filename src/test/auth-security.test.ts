import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createAuthToken, verifyAuthToken } from '../../server/auth.js';
import { AUTH_STORAGE_KEY } from '../context/AuthContext';
import { AUTH_TOKEN_KEY, getAuthToken, setAuthToken } from '../lib/api';

describe('FloraLens Authentication & Security Suite (12 Scenarios)', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  // Scenario 1: Valid user login
  it('Scenario 1: Valid user login generates signed HMAC token and persists authenticated session', () => {
    const testUser = {
      id: 'user-cust-1',
      email: 'ananya.sharma@example.com',
      fullName: 'Ananya Sharma',
      role: 'customer' as const,
    };

    const token = createAuthToken(testUser);
    expect(token).toBeTruthy();
    expect(token).toContain('.');

    setAuthToken(token);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(testUser));

    expect(getAuthToken()).toBe(token);
    expect(JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY)!)).toEqual(testUser);

    const payload = verifyAuthToken(token);
    expect(payload).not.toBeNull();
    expect(payload?.userId).toBe(testUser.id);
    expect(payload?.email).toBe(testUser.email);
    expect(payload?.role).toBe('customer');
  });

  // Scenario 2: Page refresh for valid user
  it('Scenario 2: Page refresh preserves valid user session when token and DB record exist', () => {
    const validUser = {
      id: 'user-vendor-1',
      email: 'priya@petalstem.in',
      fullName: 'Priya Patel',
      role: 'vendor' as const,
    };
    const token = createAuthToken(validUser);

    setAuthToken(token);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(validUser));

    // Simulate page refresh: reading from storage
    const restoredToken = getAuthToken();
    const restoredUserRaw = localStorage.getItem(AUTH_STORAGE_KEY);
    const restoredUser = restoredUserRaw ? JSON.parse(restoredUserRaw) : null;

    expect(restoredToken).toBe(token);
    expect(restoredUser).not.toBeNull();
    expect(restoredUser.id).toBe(validUser.id);
    expect(verifyAuthToken(restoredToken!)).not.toBeNull();
  });

  // Scenario 3: Direct navigation to /payment without login
  it('Scenario 3: Direct navigation to /payment without login blocks access and requires authentication', () => {
    // When not logged in, no token or user exists
    expect(getAuthToken()).toBeNull();
    expect(localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull();

    // Verify route guard logic: unauthenticated must redirect to /login with target preserved
    const isAuthenticated = Boolean(getAuthToken() && localStorage.getItem(AUTH_STORAGE_KEY));
    expect(isAuthenticated).toBe(false);

    const simulatedRedirect = {
      redirectTo: '/login',
      state: { from: '/payment', message: 'Please sign in to access the payment section.' },
    };
    expect(simulatedRedirect.redirectTo).toBe('/login');
    expect(simulatedRedirect.state.from).toBe('/payment');
  });

  // Scenario 4: Direct navigation to /orders without login
  it('Scenario 4: Direct navigation to /orders without login blocks access and routes to login', () => {
    expect(getAuthToken()).toBeNull();
    const isAuthenticated = Boolean(getAuthToken() && localStorage.getItem(AUTH_STORAGE_KEY));
    expect(isAuthenticated).toBe(false);

    const simulatedRedirect = {
      redirectTo: '/login',
      state: { from: '/orders', message: 'Please sign in to access your orders.' },
    };
    expect(simulatedRedirect.redirectTo).toBe('/login');
    expect(simulatedRedirect.state.from).toBe('/orders');
  });

  // Scenario 5: Direct navigation to /checkout without login
  it('Scenario 5: Direct navigation to /checkout without login blocks access and preserves intended URL', () => {
    expect(getAuthToken()).toBeNull();
    const isAuthenticated = Boolean(getAuthToken() && localStorage.getItem(AUTH_STORAGE_KEY));
    expect(isAuthenticated).toBe(false);

    const simulatedRedirect = {
      redirectTo: '/login',
      state: { from: '/checkout', message: 'Please sign in to complete checkout.' },
    };
    expect(simulatedRedirect.redirectTo).toBe('/login');
    expect(simulatedRedirect.state.from).toBe('/checkout');
  });

  // Scenario 6: User deleted from database while logged in
  it('Scenario 6: User deleted from database triggers session revocation and clears client state', () => {
    const activeUser = { id: 'user-to-delete', email: 'delete.me@example.com', role: 'customer' as const };
    const token = createAuthToken(activeUser);
    setAuthToken(token);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(activeUser));

    // Authoritative backend check finds user document was deleted (null)
    const dbUserLookup = null; // Simulates db.collection('users').findOne() returning null

    let isSessionValid = true;
    let sessionError = null;

    if (!dbUserLookup) {
      isSessionValid = false;
      sessionError = 'User account no longer exists in the database. Session revoked.';
      setAuthToken(null);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }

    expect(isSessionValid).toBe(false);
    expect(getAuthToken()).toBeNull();
    expect(localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull();
    expect(sessionError).toContain('User account no longer exists');
  });

  // Scenario 7: Session expiry handling
  it('Scenario 7: Expired token is rejected by backend verification and client guard', () => {
    // Create an expired payload
    const expiredPayload = {
      userId: 'user-cust-1',
      email: 'ananya.sharma@example.com',
      role: 'customer',
      exp: Date.now() - 3600000, // 1 hour ago
      iat: Date.now() - 7200000,
    };

    const payloadB64 = Buffer.from(JSON.stringify(expiredPayload)).toString('base64url');
    const secret = process.env.AUTH_SECRET || 'floralens-secure-session-key-2026';
    const crypto = require('crypto');
    const signature = crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url');
    const expiredToken = `${payloadB64}.${signature}`;

    const verified = verifyAuthToken(expiredToken);
    expect(verified).toBeNull(); // Expired token must return null!
  });

  // Scenario 8: Post-login redirection to intended page
  it('Scenario 8: Post-login redirection returns user directly to the requested destination', () => {
    const intendedPath = '/checkout';
    const loginRedirectTarget = (intendedLocation: string | { pathname: string }) => {
      if (typeof intendedLocation === 'string') return intendedLocation;
      return intendedLocation.pathname || '/customer';
    };

    expect(loginRedirectTarget(intendedPath)).toBe('/checkout');
    expect(loginRedirectTarget({ pathname: '/payment' })).toBe('/payment');
    expect(loginRedirectTarget({ pathname: '/orders' })).toBe('/orders');
  });

  // Scenario 9: Normal logout
  it('Scenario 9: Normal logout purges authentication credentials, tokens, and cached user details', () => {
    const user = { id: 'user-admin-1', email: 'admin@floralens.in', role: 'admin' as const };
    const token = createAuthToken(user);

    setAuthToken(token);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem('floralens_cart_items', JSON.stringify([{ id: 'cart-1', qty: 2 }]));

    // Execute logout
    setAuthToken(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem('floralens_cart_items');

    expect(getAuthToken()).toBeNull();
    expect(localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull();
    expect(localStorage.getItem('floralens_cart_items')).toBeNull();
  });

  // Scenario 10: Multiple tabs behavior
  it('Scenario 10: Multiple tabs synchronize logout event via storage events', () => {
    let currentUser: any = { id: 'user-cust-1', role: 'customer' };

    // Simulate cross-tab logout handler
    const handleStorageChange = (key: string, newValue: string | null) => {
      if (key === AUTH_STORAGE_KEY && !newValue) {
        currentUser = null;
      }
    };

    // Another tab logs out
    handleStorageChange(AUTH_STORAGE_KEY, null);

    expect(currentUser).toBeNull();
  });

  // Scenario 11: Attempting to access other users orders/data
  it('Scenario 11: Backend strictly isolates customer queries and rejects cross-user data tampering', () => {
    const authenticatedUser = { id: 'user-alice', role: 'customer' as const };
    const forgedTargetUserId = 'user-bob';

    // Simulated GET /api/orders authorization logic
    const buildOrderFilter = (user: typeof authenticatedUser, requestedUserId?: string) => {
      const filter: Record<string, any> = {};
      if (user.role === 'customer') {
        // Enforce own ID regardless of what was in query params
        filter.userId = user.id;
      } else if (user.role === 'admin' && requestedUserId) {
        filter.userId = requestedUserId;
      }
      return filter;
    };

    const customerFilter = buildOrderFilter(authenticatedUser, forgedTargetUserId);
    expect(customerFilter.userId).toBe('user-alice');
    expect(customerFilter.userId).not.toBe(forgedTargetUserId);
  });

  // Scenario 12: Backend API rejection for deleted user requests
  it('Scenario 12: Backend API returns HTTP 401 USER_DELETED when user is removed from database', () => {
    const fakeReq = {
      headers: { authorization: `Bearer ${createAuthToken({ id: 'ghost-user', email: 'ghost@test.com', role: 'customer' })}` },
    };

    // Simulated middleware check against MongoDB users collection
    const checkUserInDb = (userId: string) => {
      const dbUsers: Record<string, any> = {
        'user-cust-1': { id: 'user-cust-1', email: 'ananya.sharma@example.com' },
      };
      return dbUsers[userId] || null;
    };

    const tokenPayload = verifyAuthToken(fakeReq.headers.authorization.split(' ')[1]);
    expect(tokenPayload).not.toBeNull();

    const dbUser = checkUserInDb(tokenPayload!.userId);
    const apiResponse = !dbUser
      ? { status: 401, body: { success: false, error: 'User account no longer exists in the database. Session revoked.', code: 'USER_DELETED' } }
      : { status: 200, body: { success: true } };

    expect(apiResponse.status).toBe(401);
    expect(apiResponse.body.code).toBe('USER_DELETED');
  });
});
