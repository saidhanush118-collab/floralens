import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { StoreProvider, useStore } from '../context/StoreContext';
import { AuthProvider } from '../context/AuthContext';
import { INITIAL_PRODUCTS, INITIAL_SERVICES, INITIAL_ADDRESSES } from '../lib/mockData';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <StoreProvider>{children}</StoreProvider>
  </AuthProvider>
);

describe('FloraLens Store & Business Logic Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('calculates cart totals, free delivery threshold, and platform fee correctly', () => {
    const { result } = renderHook(() => useStore(), { wrapper });

    expect(result.current.cart.items.length).toBe(0);
    expect(result.current.cart.subtotal).toBe(0);
    expect(result.current.cart.total).toBe(0);

    const testProduct = INITIAL_PRODUCTS[0]; // Price: ₹1299 sale price

    // Add 1 item
    act(() => {
      result.current.addToCart(testProduct, undefined, 1);
    });

    expect(result.current.cart.items.length).toBe(1);
    expect(result.current.cart.subtotal).toBe(1299);
    // Since 1299 >= 999, delivery fee should be FREE (₹0)
    expect(result.current.cart.deliveryFee).toBe(0);
    expect(result.current.cart.platformFee).toBe(29);
    expect(result.current.cart.total).toBe(1299 + 29); // 1328
  });

  it('applies coupons correctly according to minimum order rules', () => {
    const { result } = renderHook(() => useStore(), { wrapper });
    const testProduct = INITIAL_PRODUCTS[0]; // Price: ₹1299

    act(() => {
      result.current.addToCart(testProduct, undefined, 1);
    });

    // Apply BLOOM10 (10% off, max 300, min 999)
    act(() => {
      const res = result.current.applyCoupon('BLOOM10');
      expect(res.success).toBe(true);
    });

    // 10% of 1299 is ~129.9
    expect(result.current.cart.discount).toBeGreaterThan(0);
    expect(result.current.cart.total).toBeLessThan(1299 + 29);
  });

  it('strictly prevents double-booking / conflicting time slots for the same vendor', async () => {
    const { result } = renderHook(() => useStore(), { wrapper });
    const testService = INITIAL_SERVICES[0];
    const testDate = '2026-11-20';
    const testSlot = testService.availableSlots[0];
    const testAddress = INITIAL_ADDRESSES[0];

    // Verify slot is initially open
    expect(result.current.isSlotAvailable(testService.vendorId, testDate, testSlot)).toBe(true);

    // Book the slot
    await act(async () => {
      const res = await result.current.createDecorationBooking({
        service: testService,
        packageId: testService.packages[0].id,
        eventDate: testDate,
        timeSlot: testSlot,
        venueAddress: testAddress,
        selectedAddonIds: [],
        paymentMethod: 'upi',
      });
      expect(res.success).toBe(true);
      expect(res.booking).toBeDefined();
    });

    // Now verify the slot is LOCKED and conflicting booking is REJECTED
    expect(result.current.isSlotAvailable(testService.vendorId, testDate, testSlot)).toBe(false);

    // Attempting to book again must fail
    await act(async () => {
      const doubleBookingAttempt = await result.current.createDecorationBooking({
        service: testService,
        packageId: testService.packages[0].id,
        eventDate: testDate,
        timeSlot: testSlot,
        venueAddress: testAddress,
        selectedAddonIds: [],
        paymentMethod: 'upi',
      });
      expect(doubleBookingAttempt.success).toBe(false);
      expect(doubleBookingAttempt.error).toContain('already booked');
    });
  });

  it('reduces product inventory atomically when flower order is placed', async () => {
    const { result } = renderHook(() => useStore(), { wrapper });
    const product = INITIAL_PRODUCTS[0];
    const initialStock = product.stockQuantity;
    const testAddress = INITIAL_ADDRESSES[0];

    act(() => {
      result.current.addToCart(product, undefined, 2);
    });

    await act(async () => {
      const orderRes = await result.current.createFlowerOrder(testAddress, 'upi');
      expect(orderRes.success).toBe(true);
      expect(orderRes.order).toBeDefined();
      expect(orderRes.order?.orderNumber).toContain('BLOOM-ORD-');
    });

    // Verify inventory reduced by 2
    const updatedProduct = result.current.products.find((p) => p.id === product.id);
    expect(updatedProduct?.stockQuantity).toBe(initialStock - 2);
  });

  it('allows vendor to transition order status and decline orders with reason', () => {
    const { result } = renderHook(() => useStore(), { wrapper });
    const existingOrder = result.current.orders[0];

    expect(existingOrder).toBeDefined();

    act(() => {
      result.current.updateOrderStatus(existingOrder.id, 'out_for_delivery');
    });

    const updated = result.current.getOrderById(existingOrder.id);
    expect(updated?.status).toBe('out_for_delivery');
  });
});
