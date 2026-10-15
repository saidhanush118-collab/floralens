import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { DEMO_USERS } from '../lib/mockData';
import { api } from '../lib/mongodb';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole | 'guest';
  isAuthenticated: boolean;
  login: (email: string, password?: string, role?: UserRole) => Promise<{ success: boolean; user?: UserProfile; error?: string }>;
  loginWithGoogle: (preferredRole?: UserRole) => Promise<{ success: boolean; message?: string }>;
  register: (fullName: string, email: string, password?: string, role?: UserRole, phone?: string, city?: string) => Promise<{ success: boolean; user?: UserProfile; error?: string }>;
  logout: () => void;
  switchDemoRole: (role: UserRole) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'floralens_auth_user_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse auth user', e);
    }
    // Default to Customer role so visitors immediately experience a smooth customer view
    return DEMO_USERS.customer;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = async (
    email: string,
    password?: string,
    preferredRole: UserRole = 'customer'
  ): Promise<{ success: boolean; user?: UserProfile; error?: string }> => {
    try {
      const res = await api.loginUser(email, password, preferredRole);
      if (res.success && res.user) {
        setUser(res.user);
        return { success: true, user: res.user };
      }
      return { success: false, error: res.error || 'Invalid email or password.' };
    } catch (err: any) {
      console.warn('Backend login error:', err);
      return { success: false, error: err.message || 'Login failed. Please check network connection.' };
    }
  };

  const loginWithGoogle = async (preferredRole: UserRole = 'customer'): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await api.loginWithGoogle(preferredRole);
      if (res.success && res.user) {
        setUser(res.user);
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
    setUser(googleUser);
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
        return { success: true, user: res.user };
      }
      return { success: false, error: res.error || 'Failed to create account.' };
    } catch (err: any) {
      console.warn('Backend registration error:', err);
      return { success: false, error: err.message || 'Failed to create account.' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const switchDemoRole = (targetRole: UserRole) => {
    const demoProfile = DEMO_USERS[targetRole];
    if (demoProfile) {
      setUser(demoProfile);
    }
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    api.updateUser(user.id, data).catch((e) => console.warn('Could not sync user profile to MongoDB:', e));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : 'guest',
        isAuthenticated: !!user,
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
