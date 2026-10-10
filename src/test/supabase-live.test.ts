import { describe, it, expect } from 'vitest';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

describe('Live Supabase Database Connection & Schema Verification', () => {
  it('should have valid Supabase credentials configured in .env', () => {
    expect(supabaseUrl).toBeTruthy();
    expect(supabaseUrl).toMatch(/^https:\/\/[a-z0-9]+\.supabase\.co/);
    expect(supabaseAnonKey).toBeTruthy();
  });

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const tablesToVerify = [
    'profiles',
    'vendor_profiles',
    'categories',
    'products',
    'decoration_services',
    'service_packages',
    'customer_addresses',
    'flower_orders',
    'flower_order_items',
    'decoration_bookings',
    'reviews',
    'notifications',
  ];

  tablesToVerify.forEach((tableName) => {
    it(`should successfully query table: ${tableName} without relation-missing errors`, async () => {
      const { data, error, status } = await supabase.from(tableName).select('*').limit(1);

      // Status 200 or 206 means the table exists and query succeeded
      // If error exists, check it's NOT '42P01' (relation does not exist)
      if (error) {
        expect(error.code).not.toBe('42P01');
      } else {
        expect([200, 206]).toContain(status);
        expect(Array.isArray(data)).toBe(true);
      }
    });
  });

  it('should test loading categories, products, and decoration services', async () => {
    const [categoriesRes, productsRes, servicesRes] = await Promise.all([
      supabase.from('categories').select('id, name, type').limit(10),
      supabase.from('products').select('id, name, base_price').limit(10),
      supabase.from('decoration_services').select('id, name, base_price').limit(10),
    ]);

    console.log('Categories query status:', categoriesRes.status, 'Rows count:', categoriesRes.data?.length);
    console.log('Products query status:', productsRes.status, 'Rows count:', productsRes.data?.length);
    console.log('Decoration Services query status:', servicesRes.status, 'Rows count:', servicesRes.data?.length);

    expect(categoriesRes.error).toBeNull();
    expect(productsRes.error).toBeNull();
    expect(servicesRes.error).toBeNull();
  });
});
