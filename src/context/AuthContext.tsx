import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { DEMO_USERS } from '../lib/mockData';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole | 'guest';
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  register: (fullName: string, email: string, role: UserRole, phone?: string, city?: string) => Promise<boolean>;
  logout: () => void;
  switchDemoRole: (role: UserRole) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'bloomora_auth_user_v1';

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

  const login = async (email: string, preferredRole: UserRole = 'customer'): Promise<boolean> => {
    // If matching one of our predefined demo accounts:
    const matched = Object.values(DEMO_USERS).find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      setUser(matched);
      return true;
    }

    // Dynamic user login
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      email,
      fullName: email.split('@')[0].replace(/[._]/g, ' ').toUpperCase(),
      role: preferredRole,
      city: 'Bangalore',
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    return true;
  };

  const register = async (
    fullName: string,
    email: string,
    role: UserRole,
    phone?: string,
    city?: string
  ): Promise<boolean> => {
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      email,
      fullName,
      phone: phone || '+91 98000 00000',
      city: city || 'Bangalore',
      role,
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    return true;
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
    setUser({ ...user, ...data });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : 'guest',
        isAuthenticated: !!user,
        login,
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
