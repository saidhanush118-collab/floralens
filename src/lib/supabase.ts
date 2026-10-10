import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

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

/**
 * Real-time connection tester to verify database connectivity and schema readiness
 */
export const testSupabaseConnection = async (): Promise<{
  connected: boolean;
  tablesReady: boolean;
  message: string;
  latencyMs?: number;
}> => {
  if (!isSupabaseConfigured) {
    return {
      connected: false,
      tablesReady: false,
      message: 'Supabase credentials are not set in .env (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are missing).',
    };
  }

  const startTime = performance.now();
  try {
    const { data, error } = await supabase.from('categories').select('id, name').limit(1);
    const latencyMs = Math.round(performance.now() - startTime);

    if (error) {
      if (error.code === '42P01') {
        return {
          connected: true,
          tablesReady: false,
          message: 'Connected to Supabase project, but migration tables have not been created yet in the SQL Editor.',
          latencyMs,
        };
      }
      return {
        connected: false,
        tablesReady: false,
        message: `Supabase returned error: ${error.message} (Code: ${error.code})`,
        latencyMs,
      };
    }

    return {
      connected: true,
      tablesReady: true,
      message: 'Successfully connected to Supabase and verified database tables!',
      latencyMs,
    };
  } catch (err: any) {
    return {
      connected: false,
      tablesReady: false,
      message: `Network or connection failure: ${err?.message || err}`,
    };
  }
};
