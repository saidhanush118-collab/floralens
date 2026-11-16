import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile, UserRole } from '../types';
import { DEMO_USERS } from '../lib/mockData';
import { api, getAuthToken, setAuthToken } from '../lib/mongodb';

export interface AuthContextType {
  user: UserProfile | null;
  role: UserRole | 'guest';
  isAuthenticated: boolean;
  isLoading: boolean;
  sessionError: string | null;
  clearSessionError: () => void;
  validateSession: (force?: boolean) => Promise<boolean>;
  login: (email: string, password?: string, role?: UserRole) => Promise<{ success: boolean; user?: UserProfile; error?: string }>;
  loginWithGoogle: (preferredRole?: UserRole) => Promise<{ success: boolean; message?: string }>;
  register: (fullName: string, email: string, password?: string, role?: UserRole, phone?: string, city?: string) => Promise<{ success: boolean; user?: UserProfile; error?: string }>;
  logout: () => void;
  switchDemoRole: (role: UserRole) => void;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; user?: UserProfile; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AUTH_STORAGE_KEY = 'floralens_auth_user_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      const token = getAuthToken();
      // Only retain user if token is also present
      if (saved && token) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse cached auth user', e);
    }
    // Security Fix: Do NOT default to demo user. Unauthenticated visitors must start as null.
    return null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sessionError, setSessionError] = useState<string | null>(null);

  const clearSessionError = useCallback(() => {
    setSessionError(null);
  }, []);

  // Sync user state to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  /**
   * Authoritative session validation against backend MongoDB database.
   * If user was deleted or session is invalid, terminates session immediately.
   */
  const validateSession = useCallback(async (_force = false): Promise<boolean> => {
    const token = getAuthToken();
    if (!token) {
      setUser(null);
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return false;
    }

    // Skip validation for client demo simulation tokens if backend is unavailable
    if (token.startsWith('demo-token-')) {
      return true;
    }

    try {
      const res = await api.validateSession();
      if (res.success && res.user) {
        // Authoritative user confirmed in MongoDB
        setUser(res.user);
        setSessionError(null);
        return true;
      } else {
        // Account was deleted from MongoDB, revoked, or token expired
        console.warn('Authoritative session validation failed:', res.error);
        setUser(null);
        setAuthToken(null);
        localStorage.removeItem(AUTH_STORAGE_KEY);
        setSessionError(res.error || 'Your session has expired. Please sign in again.');
        return false;
      }
    } catch (err: any) {
      console.warn('Network error during session validation:', err);
      // In offline/glitch scenarios, if token exists keep user but return false
      return false;
    }
  }, []);

  // Initial session verification on application mount
  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      const token = getAuthToken();
      const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);

      if (!token || !savedUser) {
        if (isMounted) {
          setUser(null);
          setAuthToken(null);
          localStorage.removeItem(AUTH_STORAGE_KEY);
          setIsLoading(false);
        }
        return;
      }

      // Check if client-side demo token
      if (token.startsWith('demo-token-')) {
        if (isMounted) {
          setIsLoading(false);
        }
        return;
      }

      try {
        const res = await api.validateSession();
        if (!isMounted) return;

        if (res.success && res.user) {
          setUser(res.user);
          setSessionError(null);
        } else {
          // Account was deleted from MongoDB or token is no longer valid
          console.warn('Initial session check: Account no longer valid in MongoDB');
          setUser(null);
          setAuthToken(null);
          localStorage.removeItem(AUTH_STORAGE_KEY);
          setSessionError(res.error || 'Your session has expired. Please sign in again.');
        }
      } catch (err) {
        console.warn('Initial session validation error:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initAuth();

    // Event listener: Triggered by 401 interceptor in api.ts
    const handleUnauthorizedEvent = (e: any) => {
      console.warn('Received unauthorized event:', e?.detail?.reason);
      setUser(null);
      setAuthToken(null);
      localStorage.removeItem(AUTH_STORAGE_KEY);
      setSessionError(e?.detail?.reason || 'Your session has expired. Please sign in again.');
    };

    // Event listener: Cross-tab logout synchronization
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === AUTH_STORAGE_KEY && !e.newValue) {
        setUser(null);
        setAuthToken(null);
      }
    };

    // Event listener: Re-validate session when window gains focus
    const handleWindowFocus = () => {
      const currentToken = getAuthToken();
      if (currentToken && !currentToken.startsWith('demo-token-')) {
        api.validateSession().then((res) => {
          if (!isMounted) return;
          if (!res.success) {
            console.warn('Focus validation: User was deleted or session invalidated');
            setUser(null);
            setAuthToken(null);
            localStorage.removeItem(AUTH_STORAGE_KEY);
            setSessionError(res.error || 'Your session has expired. Please sign in again.');
          } else if (res.user) {
            setUser(res.user);
          }
        });
      }
    };

    window.addEventListener('floralens:auth:unauthorized', handleUnauthorizedEvent);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      isMounted = false;
      window.removeEventListener('floralens:auth:unauthorized', handleUnauthorizedEvent);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [validateSession]);

  const login = async (
    email: string,
    password?: string,
    preferredRole: UserRole = 'customer'
  ): Promise<{ success: boolean; user?: UserProfile; error?: string }> => {
    setIsLoading(true);
    setSessionError(null);
    try {
      const res = await api.loginUser(email, password, preferredRole);
      if (res.success && res.user) {
        setUser(res.user);
        setIsLoading(false);
        return { success: true, user: res.user };
      }
      setIsLoading(false);
      return { success: false, error: res.error || 'Invalid email or password.' };
    } catch (err: any) {
      setIsLoading(false);
      console.warn('Backend login error:', err);
      return { success: false, error: err.message || 'Login failed. Please check network connection.' };
    }
  };

  const loginWithGoogle = async (preferredRole: UserRole = 'customer'): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    setSessionError(null);
    try {
      const res = await api.loginWithGoogle(preferredRole);
      if (res.success && res.user) {
        setUser(res.user);
        setIsLoading(false);
        return { success: true, message: 'Successfully signed in with Google Account' };
      }
    } catch (err) {
      console.warn('Backend Google sign-in failed, using local simulation:', err);
    }

    const googleUser: UserProfile = {
      id: `google-${Date.now()}`,
      email: 'alex.floralens@gmail.com',
      fullName: 'Alex Morgan',
      role: preferredRole,
      city: 'Bangalore',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      createdAt: new Date().toISOString(),
    };
    setAuthToken(`demo-token-google-${Date.now()}`);
    setUser(googleUser);
    setIsLoading(false);
    return { success: true, message: 'Successfully signed in with Google Account' };
  };

  const register = async (
    fullName: string,
    email: string,
    password?: string,
    role: UserRole = 'customer',
    phone?: string,
    city?: string
  ): Promise<{ success: boolean; user?: UserProfile; error?: string }> => {
    setIsLoading(true);
    setSessionError(null);
    try {
      const res = await api.registerUser({
        fullName,
        email,
        password,
        role,
        phone,
        city,
      });

      if (res.success && res.user) {
        setUser(res.user);
        setIsLoading(false);
        return { success: true, user: res.user };
      }
      setIsLoading(false);
      return { success: false, error: res.error || 'Failed to create account.' };
    } catch (err: any) {
      setIsLoading(false);
      console.warn('Backend registration error:', err);
      return { success: false, error: err.message || 'Failed to create account.' };
    }
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setSessionError(null);
    // Dispatch custom event to notify StoreContext to reset customer-specific state
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('floralens:store:reset'));
    }
  };

  const switchDemoRole = (targetRole: UserRole) => {
    const demoProfile = DEMO_USERS[targetRole];
    if (demoProfile) {
      setAuthToken(`demo-token-${targetRole}-${Date.now()}`);
      setUser(demoProfile);
      setSessionError(null);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>): Promise<{ success: boolean; user?: UserProfile; error?: string }> => {
    if (!user) return { success: false, error: 'No user is currently logged in.' };
    const updated = { ...user, ...data };
    setUser(updated);
    try {
      const serverUser = await api.updateUser(user.id, data);
      if (serverUser && serverUser.id) {
        setUser((prev) => (prev ? { ...prev, ...serverUser } : serverUser));
        return { success: true, user: serverUser };
      }
      return { success: true, user: updated };
    } catch (e: any) {
      console.warn('Could not sync user profile to MongoDB:', e);
      return { success: false, error: e.message || 'Failed to update user profile in MongoDB.' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : 'guest',
        isAuthenticated: !!user,
        isLoading,
        sessionError,
        clearSessionError,
        validateSession,
        login,
        loginWithGoogle,
        register,
        logout,
        switchDemoRole,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
