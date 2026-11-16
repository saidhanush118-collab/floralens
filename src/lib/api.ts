import {
  FlowerProduct,
  DecorationService,
  Category,
  VendorProfile,
  FlowerOrder,
  DecorationBooking,
  Review,
  OrderStatus,
  BookingStatus,
  UserProfile,
  UserRole,
} from '../types';

const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

export const AUTH_TOKEN_KEY = 'floralens_auth_token_v1';

export function getAuthToken(): string | null {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAuthToken(token: string | null): void {
  try {
    if (token) {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  } catch (err) {
    console.error('Error modifying auth token in localStorage', err);
  }
}

export function dispatchUnauthorizedEvent(reason?: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('floralens:auth:unauthorized', {
        detail: { reason: reason || 'Session has expired or user account was deleted.' },
      })
    );
  }
}

export async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 15000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(id);
  }
}

export async function authenticatedFetch(
  url: string,
  options: RequestInit = {},
  timeoutMs = 15000
): Promise<Response> {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetchWithTimeout(url, { ...options, headers }, timeoutMs);

  if (res.status === 401) {
    // Session is invalid, expired, or user deleted from MongoDB
    const cloned = res.clone();
    try {
      const data = await cloned.json();
      dispatchUnauthorizedEvent(data.error || 'Your session has expired. Please sign in again.');
    } catch {
      dispatchUnauthorizedEvent('Your session has expired. Please sign in again.');
    }
  }

  return res;
}

export const isMongoConfigured = true;

export interface BackendStatus {
  isMongoConfigured: boolean;
  engine: string;
  cluster: string;
  dbName: string;
  mode: 'mongodb_atlas_production' | 'demo_persisted_storage';
  razorpayConfigured: boolean;
}

export const getBackendStatus = (): BackendStatus => {
  return {
    isMongoConfigured: true,
    engine: 'MongoDB Atlas',
    cluster: 'cluster0.yq3tw5x.mongodb.net',
    dbName: 'floralens',
    mode: 'mongodb_atlas_production',
    razorpayConfigured: Boolean(
      import.meta.env.VITE_RAZORPAY_KEY_ID && import.meta.env.VITE_RAZORPAY_KEY_ID.startsWith('rzp_')
    ),
  };
};

export const testMongoConnection = async (): Promise<{
  connected: boolean;
  tablesReady: boolean;
  collectionsCount?: number;
  message: string;
  latencyMs?: number;
}> => {
  const startTime = performance.now();
  try {
    const res = await fetchWithTimeout(`${API_BASE}/health`, {}, 5000);
    const latencyMs = Math.round(performance.now() - startTime);

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return {
        connected: false,
        tablesReady: false,
        message: errData.message || `API server returned status ${res.status}`,
        latencyMs,
      };
    }

    const data = await res.json();
    return {
      connected: Boolean(data.connected),
      tablesReady: Boolean(data.collectionsCount && data.collectionsCount > 0),
      collectionsCount: data.collectionsCount,
      latencyMs: data.latencyMs || latencyMs,
      message: data.message || 'Connected to MongoDB Atlas cluster0.yq3tw5x.mongodb.net/floralens',
    };
  } catch (err: any) {
    return {
      connected: false,
      tablesReady: false,
      message: `Failed to connect to MongoDB API: ${err?.message || err}. (Ensure backend server is running on port 5000)`,
    };
  }
};

// --- API Helper Methods ---

export const api = {
  // Categories
  async getCategories(): Promise<Category[]> {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  // Products
  async getProducts(params?: { categoryId?: string; flowerType?: string; featured?: boolean; search?: string }): Promise<FlowerProduct[]> {
    const query = new URLSearchParams();
    if (params?.categoryId) query.set('categoryId', params.categoryId);
    if (params?.flowerType) query.set('flowerType', params.flowerType);
    if (params?.featured) query.set('featured', 'true');
    if (params?.search) query.set('search', params.search);

    const url = `${API_BASE}/products${query.toString() ? `?${query.toString()}` : ''}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async getProduct(id: string): Promise<FlowerProduct> {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
  },

  async createProduct(product: Partial<FlowerProduct>): Promise<FlowerProduct> {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error('Failed to create product');
    return res.json();
  },

  async updateProduct(id: string, updates: Partial<FlowerProduct>): Promise<FlowerProduct> {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update product');
    return res.json();
  },

  async deleteProduct(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete product');
  },

  // Services
  async getServices(params?: { eventType?: string; categoryId?: string; featured?: boolean; search?: string }): Promise<DecorationService[]> {
    const query = new URLSearchParams();
    if (params?.eventType) query.set('eventType', params.eventType);
    if (params?.categoryId) query.set('categoryId', params.categoryId);
    if (params?.featured) query.set('featured', 'true');
    if (params?.search) query.set('search', params.search);

    const url = `${API_BASE}/services${query.toString() ? `?${query.toString()}` : ''}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch decoration services');
    return res.json();
  },

  async getService(id: string): Promise<DecorationService> {
    const res = await fetch(`${API_BASE}/services/${id}`);
    if (!res.ok) throw new Error('Failed to fetch decoration service');
    return res.json();
  },

  async createService(service: Partial<DecorationService>): Promise<DecorationService> {
    const res = await fetch(`${API_BASE}/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service),
    });
    if (!res.ok) throw new Error('Failed to create decoration service');
    return res.json();
  },

  async updateService(id: string, updates: Partial<DecorationService>): Promise<DecorationService> {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update decoration service');
    return res.json();
  },

  async deleteService(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/services/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete service');
  },

  // Vendors
  async getVendors(): Promise<VendorProfile[]> {
    const res = await fetch(`${API_BASE}/vendors`);
    if (!res.ok) throw new Error('Failed to fetch vendors');
    return res.json();
  },

  async updateVendor(id: string, updates: Partial<VendorProfile>): Promise<VendorProfile> {
    const res = await fetch(`${API_BASE}/vendors/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update vendor');
    return res.json();
  },

  // Orders
  async getOrders(params?: { userId?: string; vendorId?: string }): Promise<FlowerOrder[]> {
    const query = new URLSearchParams();
    if (params?.userId) query.set('userId', params.userId);
    if (params?.vendorId) query.set('vendorId', params.vendorId);

    const res = await authenticatedFetch(`${API_BASE}/orders${query.toString() ? `?${query.toString()}` : ''}`);
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('Authentication required or session expired.');
      }
      throw new Error('Failed to fetch orders');
    }
    return res.json();
  },

  async createOrder(order: Partial<FlowerOrder>): Promise<{ success: boolean; order?: FlowerOrder; error?: string }> {
    const res = await authenticatedFetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    return res.json();
  },

  async updateOrderStatus(orderId: string, status: OrderStatus, trackingNote?: string): Promise<any> {
    const res = await authenticatedFetch(`${API_BASE}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, trackingNote }),
    });
    return res.json();
  },

  // Bookings
  async getBookings(params?: { userId?: string; vendorId?: string }): Promise<DecorationBooking[]> {
    const query = new URLSearchParams();
    if (params?.userId) query.set('userId', params.userId);
    if (params?.vendorId) query.set('vendorId', params.vendorId);

    const res = await authenticatedFetch(`${API_BASE}/bookings${query.toString() ? `?${query.toString()}` : ''}`);
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('Authentication required or session expired.');
      }
      throw new Error('Failed to fetch bookings');
    }
    return res.json();
  },

  async createBooking(booking: Partial<DecorationBooking>): Promise<{ success: boolean; booking?: DecorationBooking; error?: string }> {
    const res = await authenticatedFetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    });
    return res.json();
  },

  async updateBookingStatus(bookingId: string, status: BookingStatus, notes?: string): Promise<any> {
    const res = await authenticatedFetch(`${API_BASE}/bookings/${bookingId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, notes }),
    });
    return res.json();
  },

  // Reviews
  async getReviews(params?: { productId?: string; serviceId?: string }): Promise<Review[]> {
    const query = new URLSearchParams();
    if (params?.productId) query.set('productId', params.productId);
    if (params?.serviceId) query.set('serviceId', params.serviceId);

    const res = await fetch(`${API_BASE}/reviews${query.toString() ? `?${query.toString()}` : ''}`);
    if (!res.ok) throw new Error('Failed to fetch reviews');
    return res.json();
  },

  async createReview(review: Partial<Review>): Promise<Review> {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    });
    return res.json();
  },

  // Seeding
  async seedDatabase(dropExisting = true): Promise<{ success: boolean; message: string; results?: any }> {
    const res = await fetch(`${API_BASE}/seed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dropExisting }),
    });
    return res.json();
  },

  // Users & Authentication
  async registerUser(userData: {
    fullName: string;
    email: string;
    password?: string;
    role: UserRole;
    phone?: string;
    city?: string;
    avatarUrl?: string;
  }): Promise<{ success: boolean; user?: UserProfile; token?: string; error?: string }> {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      }, 15000);
      const data = await res.json().catch(() => null);
      if (!data) {
        return { success: false, error: `Database server responded with status ${res.status}.` };
      }
      if (data.success && data.token) {
        setAuthToken(data.token);
      }
      return data;
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return { success: false, error: 'Connection to database server timed out. Please try again.' };
      }
      return { success: false, error: err.message || 'Network error while contacting database server.' };
    }
  },

  async loginUser(email: string, password?: string, preferredRole?: UserRole): Promise<{ success: boolean; user?: UserProfile; token?: string; error?: string }> {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, preferredRole }),
      }, 15000);
      const data = await res.json().catch(() => null);
      if (!data) {
        return { success: false, error: `Database server responded with status ${res.status}.` };
      }
      if (data.success && data.token) {
        setAuthToken(data.token);
      }
      return data;
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return { success: false, error: 'Connection to database server timed out. Please try again.' };
      }
      return { success: false, error: err.message || 'Network error while contacting database server.' };
    }
  },

  async loginWithGoogle(options?: {
    preferredRole?: UserRole;
    email?: string;
    fullName?: string;
    displayName?: string;
    avatarUrl?: string;
    photoURL?: string;
    city?: string;
    phone?: string;
  } | UserRole): Promise<{ success: boolean; user?: UserProfile; token?: string; message?: string }> {
    const payload = typeof options === 'string' ? { preferredRole: options } : options || {};
    const res = await fetch(`${API_BASE}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.success && data.token) {
      setAuthToken(data.token);
    }
    return data;
  },

  async validateSession(): Promise<{ success: boolean; user?: UserProfile; valid?: boolean; error?: string; code?: string }> {
    const token = getAuthToken();
    if (!token) {
      return { success: false, error: 'No active session token.', code: 'NO_TOKEN' };
    }

    try {
      const res = await authenticatedFetch(`${API_BASE}/auth/me`, {}, 6000);
      const data = await res.json().catch(() => null);
      if (!res.ok || !data || !data.success) {
        return {
          success: false,
          error: data?.error || 'Session validation failed.',
          code: data?.code || (res.status === 401 ? 'UNAUTHORIZED' : 'ERROR'),
        };
      }
      return { success: true, user: data.user, valid: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error during session validation.' };
    }
  },

  async deleteUser(id: string): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const res = await authenticatedFetch(`${API_BASE}/users/${id}`, {
        method: 'DELETE',
      });
      return res.json();
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to delete user.' };
    }
  },

  async getUsers(): Promise<UserProfile[]> {
    const res = await fetch(`${API_BASE}/users`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  },

  async updateUser(id: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    const res = await authenticatedFetch(`${API_BASE}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    return res.json();
  },
};
