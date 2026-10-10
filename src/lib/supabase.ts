import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validate if real credentials have been provided
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('your-project-id')
);

// Fallback dummy client if credentials are not configured, preventing crash
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://mock-supabase-placeholder.supabase.co', 'mock-anon-key-placeholder', {
      auth: { persistSession: false, autoRefreshToken: false },
    });

/**
 * Honest Integration Diagnostics
 */
export const getBackendStatus = () => {
  return {
    isSupabaseConfigured,
    supabaseUrl: isSupabaseConfigured ? supabaseUrl : null,
    mode: isSupabaseConfigured ? ('supabase_production' as const) : ('demo_persisted_storage' as const),
    razorpayConfigured: Boolean(import.meta.env.VITE_RAZORPAY_KEY_ID && import.meta.env.VITE_RAZORPAY_KEY_ID.startsWith('rzp_')),
  };
};
