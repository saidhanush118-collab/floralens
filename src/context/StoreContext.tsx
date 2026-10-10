import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  FlowerProduct,
  DecorationService,
  VendorProfile,
  Category,
  CartItem,
  Cart,
  WishlistItem,
  CustomerAddress,
  FlowerOrder,
  DecorationBooking,
  Review,
  NotificationItem,
  Coupon,
  OrderStatus,
  BookingStatus,
  PaymentMethod,
  VendorApplication,
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_VENDORS,
  INITIAL_PRODUCTS,
  INITIAL_SERVICES,
  INITIAL_REVIEWS,
  INITIAL_COUPONS,
  INITIAL_ADDRESSES,
  INITIAL_ORDERS,
  INITIAL_BOOKINGS,
} from '../lib/mockData';
import { useAuth } from './AuthContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface StoreContextType {
  // Catalogs
  categories: Category[];
  vendors: VendorProfile[];
  products: FlowerProduct[];
  services: DecorationService[];
  coupons: Coupon[];
  reviews: Review[];

  // Cart
  cart: Cart;
  addToCart: (product: FlowerProduct, variantId?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist
  wishlist: WishlistItem[];
  toggleWishlist: (type: 'flower' | 'decoration', itemId: string) => void;
  isWishlisted: (type: 'flower' | 'decoration', itemId: string) => boolean;

  // Addresses
  addresses: CustomerAddress[];
  addAddress: (address: Omit<CustomerAddress, 'id' | 'userId'>) => CustomerAddress;
  updateAddress: (address: CustomerAddress) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  // Orders
  orders: FlowerOrder[];
  createFlowerOrder: (
    address: CustomerAddress,
    paymentMethod: PaymentMethod,
    instructions?: string
  ) => Promise<{ success: boolean; order?: FlowerOrder; error?: string }>;
  updateOrderStatus: (orderId: string, status: OrderStatus, reason?: string) => void;
  getOrderById: (orderId: string) => FlowerOrder | undefined;

  // Bookings
  bookings: DecorationBooking[];
  isSlotAvailable: (vendorId: string, eventDate: string, timeSlot: string) => boolean;
  createDecorationBooking: (params: {
    service: DecorationService;
    packageId: string;
    eventDate: string;
    timeSlot: string;
    venueAddress: CustomerAddress;
    guestCount?: number;
    customizationNotes?: string;
    selectedAddonIds: string[];
    paymentMethod: PaymentMethod;
  }) => Promise<{ success: boolean; booking?: DecorationBooking; error?: string }>;
  updateBookingStatus: (bookingId: string, status: BookingStatus, reason?: string) => void;
  getBookingById: (bookingId: string) => DecorationBooking | undefined;

  // Vendor Management (For Vendors)
  createProduct: (product: Omit<FlowerProduct, 'id' | 'createdAt' | 'rating' | 'reviewCount'>) => void;
  updateProduct: (id: string, updates: Partial<FlowerProduct>) => void;
  deleteProduct: (id: string) => void;
  createService: (service: Omit<DecorationService, 'id' | 'createdAt' | 'rating' | 'reviewCount'>) => void;
  updateService: (id: string, updates: Partial<DecorationService>) => void;
  deleteService: (id: string) => void;
  updateVendorProfile: (vendorId: string, updates: Partial<VendorProfile>) => void;

  // Admin Controls
  vendorApplications: VendorApplication[];
  submitVendorApplication: (app: Omit<VendorApplication, 'id' | 'status' | 'submittedAt'>) => void;
  approveVendorApplication: (appId: string) => void;
  rejectVendorApplication: (appId: string, reason: string) => void;
  toggleProductStatus: (id: string) => void;
  toggleServiceStatus: (id: string) => void;
  deleteReview: (reviewId: string) => void;

  // Reviews
  addReview: (params: {
    vendorId: string;
    itemType: 'flower' | 'decoration';
    itemId: string;
    itemName: string;
    rating: number;
    comment: string;
    orderId?: string;
    bookingId?: string;
  }) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Reset to pristine demo data
  resetDemoData: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_PREFIX = 'bloomora_v1_';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  // Helper to load or initialize local storage
  const loadStorage = <T,>(key: string, initial: T): T => {
    try {
      const saved = localStorage.getItem(STORAGE_PREFIX + key);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(`Failed to load ${key} from localStorage`, e);
    }
    return initial;
  };

  // State definitions
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [vendors, setVendors] = useState<VendorProfile[]>(() => loadStorage('vendors', INITIAL_VENDORS));
  const [products, setProducts] = useState<FlowerProduct[]>(() => loadStorage('products', INITIAL_PRODUCTS));
  const [services, setServices] = useState<DecorationService[]>(() => loadStorage('services', INITIAL_SERVICES));
  const [reviews, setReviews] = useState<Review[]>(() => loadStorage('reviews', INITIAL_REVIEWS));
  const [coupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => loadStorage('cart_items', []));
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => loadStorage('wishlist', []));
  const [addresses, setAddresses] = useState<CustomerAddress[]>(() => loadStorage('addresses', INITIAL_ADDRESSES));
  const [orders, setOrders] = useState<FlowerOrder[]>(() => loadStorage('orders', INITIAL_ORDERS));
  const [bookings, setBookings] = useState<DecorationBooking[]>(() => loadStorage('bookings', INITIAL_BOOKINGS));
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => loadStorage('notifications', []));
  const [vendorApplications, setVendorApplications] = useState<VendorApplication[]>(() =>
    loadStorage('vendor_apps', [
      {
        id: 'app-901',
        userId: 'user-cand-1',
        businessName: 'Lotus Bloom Botanica',
        vendorType: 'florist',
        phone: '+91 98860 12345',
        email: 'lotus@bloom.in',
        city: 'Bangalore',
        yearsExperience: 4,
        portfolioLinks: ['https://instagram.com/lotusbloom'],
        status: 'pending',
        submittedAt: '2024-03-01T12:00:00Z',
      },
    ])
  );

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'vendors', JSON.stringify(vendors));
  }, [vendors]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'products', JSON.stringify(products));
  }, [products]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'services', JSON.stringify(services));
  }, [services]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'reviews', JSON.stringify(reviews));
  }, [reviews]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'cart_items', JSON.stringify(cartItems));
  }, [cartItems]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'addresses', JSON.stringify(addresses));
  }, [addresses]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'orders', JSON.stringify(orders));
  }, [orders]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'bookings', JSON.stringify(bookings));
  }, [bookings]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'notifications', JSON.stringify(notifications));
  }, [notifications]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'vendor_apps', JSON.stringify(vendorApplications));
  }, [vendorApplications]);

  // Load live data from Supabase if configured
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    let isMounted = true;
    const loadFromSupabase = async () => {
      try {
        const { data: dbProducts, error: prodErr } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true);

        if (!prodErr && dbProducts && dbProducts.length > 0 && isMounted) {
          setProducts((prev) => {
            const remoteMap = new Map(
              dbProducts.map((p: any) => [
                p.id,
                {
                  id: p.id,
                  name: p.name,
                  slug: p.slug,
                  description: p.description,
                  vendorId: p.vendor_id,
                  vendorName: p.vendor_name || 'Verified Florist',
                  vendorCity: p.vendor_city || 'Bangalore',
                  categoryId: p.category_id || 'cat-1',
                  categoryName: p.category_name || 'Roses',
                  flowerType: p.flower_type || 'Roses',
                  basePrice: Number(p.base_price),
                  salePrice: p.sale_price ? Number(p.sale_price) : undefined,
                  images: Array.isArray(p.images) && p.images.length > 0 ? p.images : [
                    'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=800',
                  ],
                  variants: p.variants || [],
                  stockQuantity: Number(p.stock_quantity),
                  minOrderQuantity: Number(p.min_order_quantity) || 1,
                  freshnessGuarantee: p.freshness_guarantee || 'Handpicked same-day',
                  estimatedDeliveryTime: p.estimated_delivery_time || '2 to 4 hours',
                  isActive: p.is_active ?? true,
                  isFeatured: p.is_featured ?? false,
                  rating: Number(p.rating) || 5.0,
                  reviewCount: Number(p.review_count) || 0,
                  createdAt: p.created_at || new Date().toISOString(),
                },
              ])
            );
            return prev.map((p) => (remoteMap.has(p.id) ? (remoteMap.get(p.id) as FlowerProduct) : p));
          });
        }

        const { data: dbServices, error: servErr } = await supabase
          .from('decoration_services')
          .select('*')
          .eq('is_active', true);

        if (!servErr && dbServices && dbServices.length > 0 && isMounted) {
          setServices((prev) => {
            const remoteMap = new Map(
              dbServices.map((s: any) => [
                s.id,
                {
                  id: s.id,
                  name: s.name,
                  slug: s.slug,
                  description: s.description,
                  vendorId: s.vendor_id,
                  vendorName: s.vendor_name || 'Grand Floral Decorators',
                  vendorCity: s.vendor_city || 'Bangalore',
                  categoryId: s.category_id || 'decor-wedding',
                  categoryName: s.category_name || 'Wedding Decorations',
                  eventType: s.event_type || 'Wedding',
                  basePrice: Number(s.base_price),
                  setupDurationHours: Number(s.setup_duration_hours) || 4,
                  minNoticeDays: Number(s.min_notice_days) || 3,
                  cancellationPolicy: s.cancellation_policy || 'Free cancellation up to 48 hours prior',
                  serviceAreas: s.service_areas || ['Bangalore Central'],
                  images: Array.isArray(s.images) && s.images.length > 0 ? s.images : [
                    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
                  ],
                  packages: s.packages || [],
                  addons: s.addons || [],
                  availableSlots: s.available_slots || ['09:00 - 13:00', '14:00 - 18:00', '18:00 - 22:00'],
                  isActive: s.is_active ?? true,
                  isFeatured: s.is_featured ?? false,
                  rating: Number(s.rating) || 5.0,
                  reviewCount: Number(s.review_count) || 0,
                  createdAt: s.created_at || new Date().toISOString(),
                },
              ])
            );
            return prev.map((s) => (remoteMap.has(s.id) ? (remoteMap.get(s.id) as DecorationService) : s));
          });
        }
      } catch (e) {
        console.warn('Could not load records from Supabase:', e);
      }
    };

    loadFromSupabase();

    return () => {
      isMounted = false;
    };
  }, []);

  // Derived Cart Calculation
  const cart: Cart = useMemo(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
    // Free delivery on orders over ₹999, else ₹99
    const deliveryFee = subtotal === 0 ? 0 : subtotal >= 999 ? 0 : 99;
    const platformFee = subtotal === 0 ? 0 : 29;

    let discount = 0;
    if (appliedCoupon && subtotal >= appliedCoupon.minOrderAmount) {
      if (appliedCoupon.discountPercent) {
        const rawDiscount = (subtotal * appliedCoupon.discountPercent) / 100;
        discount = appliedCoupon.maxDiscount ? Math.min(rawDiscount, appliedCoupon.maxDiscount) : rawDiscount;
      } else if (appliedCoupon.discountFlat) {
        discount = appliedCoupon.discountFlat;
      }
    }

    const total = Math.max(0, subtotal + deliveryFee + platformFee - discount);
    return {
      items: cartItems,
      subtotal,
      deliveryFee,
      platformFee,
      discount,
      total,
    };
  }, [cartItems, appliedCoupon]);

  // Cart Functions
  const addToCart = (product: FlowerProduct, variantId?: string, quantity: number = 1) => {
    let unitPrice = product.salePrice ?? product.basePrice;
    let variantName: string | undefined = undefined;

    if (variantId) {
      const foundVariant = product.variants.find((v) => v.id === variantId);
      if (foundVariant) {
        unitPrice = foundVariant.price;
        variantName = foundVariant.name;
      }
    } else if (product.variants.length > 0) {
      const defaultVar = product.variants.find((v) => v.isDefault) || product.variants[0];
      variantId = defaultVar.id;
      unitPrice = defaultVar.price;
      variantName = defaultVar.name;
    }

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.variantId === variantId
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      const newItem: CartItem = {
        id: `cart-item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        productId: product.id,
        product,
        variantId,
        variantName,
        unitPrice,
        quantity,
      };
      return [...prev, newItem];
    });

    addNotification({
      title: 'Added to Bag',
      message: `${product.name} was added to your shopping cart.`,
      type: 'order',
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === trimmed && c.isActive);
    if (!found) {
      return { success: false, message: 'Invalid or expired promo coupon.' };
    }
    if (cart.subtotal < found.minOrderAmount) {
      return {
        success: false,
        message: `This coupon requires a minimum cart value of ₹${found.minOrderAmount}.`,
      };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Wishlist Functions
  const toggleWishlist = (type: 'flower' | 'decoration', itemId: string) => {
    setWishlist((prev) => {
      const exists = prev.some((w) => w.type === type && w.itemId === itemId);
      if (exists) {
        return prev.filter((w) => !(w.type === type && w.itemId === itemId));
      }

      const product = type === 'flower' ? products.find((p) => p.id === itemId) : undefined;
      const service = type === 'decoration' ? services.find((s) => s.id === itemId) : undefined;

      const newItem: WishlistItem = {
        id: `wish-${Date.now()}`,
        type,
        itemId,
        product,
        service,
        addedAt: new Date().toISOString(),
      };
      return [...prev, newItem];
    });
  };

  const isWishlisted = (type: 'flower' | 'decoration', itemId: string) => {
    return wishlist.some((w) => w.type === type && w.itemId === itemId);
  };

  // Addresses
  const addAddress = (data: Omit<CustomerAddress, 'id' | 'userId'>): CustomerAddress => {
    const newAddr: CustomerAddress = {
      ...data,
      id: `addr-${Date.now()}`,
      userId: user?.id || 'guest',
    };
    if (newAddr.isDefault) {
      setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: false })).concat(newAddr));
    } else {
      setAddresses((prev) => [...prev, newAddr]);
    }
    return newAddr;
  };

  const updateAddress = (updated: CustomerAddress) => {
    setAddresses((prev) =>
      prev.map((a) => {
        if (a.id === updated.id) return updated;
        if (updated.isDefault) return { ...a, isDefault: false };
        return a;
      })
    );
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  // Orders
  const createFlowerOrder = async (
    deliveryAddress: CustomerAddress,
    paymentMethod: PaymentMethod,
    instructions?: string
  ): Promise<{ success: boolean; order?: FlowerOrder; error?: string }> => {
    if (cart.items.length === 0) {
      return { success: false, error: 'Your cart is empty.' };
    }

    // 1. Stock validation check
    for (const item of cart.items) {
      const prod = products.find((p) => p.id === item.productId);
      if (!prod || !prod.isActive) {
        return { success: false, error: `${item.product.name} is currently unavailable.` };
      }
      if (prod.stockQuantity < item.quantity) {
        return {
          success: false,
          error: `Insufficient stock for ${prod.name}. Available: ${prod.stockQuantity}`,
        };
      }
    }

    // 2. Reduce stock inventory atomically
    setProducts((prev) =>
      prev.map((p) => {
        const itemInCart = cart.items.find((item) => item.productId === p.id);
        if (itemInCart) {
          return {
            ...p,
            stockQuantity: Math.max(0, p.stockQuantity - itemInCart.quantity),
          };
        }
        return p;
      })
    );

    // 3. Construct Order record
    const primaryVendorId = cart.items[0]?.product.vendorId || 'vendor-1';
    const primaryVendorName = cart.items[0]?.product.vendorName || 'Petal & Stem Botanics';

    const orderNumber = `BLOOM-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: FlowerOrder = {
      id: `ord-${Date.now()}`,
      orderNumber,
      userId: user?.id || 'guest',
      customerName: user?.fullName || deliveryAddress.recipientName,
      customerEmail: user?.email || 'customer@example.com',
      customerPhone: user?.phone || deliveryAddress.phone,
      vendorId: primaryVendorId,
      vendorName: primaryVendorName,
      deliveryAddress,
      items: cart.items.map((i) => ({
        id: `item-${Math.random()}`,
        productId: i.productId,
        productName: i.product.name,
        productImage: i.product.images[0],
        variantName: i.variantName,
        unitPrice: i.unitPrice,
        quantity: i.quantity,
        subtotal: i.unitPrice * i.quantity,
      })),
      subtotal: cart.subtotal,
      deliveryFee: cart.deliveryFee,
      platformFee: cart.platformFee,
      discountAmount: cart.discount,
      totalAmount: cart.total,
      status: 'confirmed',
      deliveryInstructions: instructions,
      paymentReference: `PAY-TXN-${Date.now().toString().slice(-6)}`,
      paymentMethod,
      isPaid: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    addNotification({
      title: 'Order Confirmed!',
      message: `Your flower order ${orderNumber} for ₹${newOrder.totalAmount} has been confirmed.`,
      type: 'order',
      linkUrl: `/customer/orders/${newOrder.id}`,
    });

    return { success: true, order: newOrder };
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, reason?: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status,
              rejectionReason: reason || o.rejectionReason,
              updatedAt: new Date().toISOString(),
            }
          : o
      )
    );

    const targetOrder = orders.find((o) => o.id === orderId);
    if (targetOrder) {
      addNotification({
        title: `Order Status: ${status.replace(/_/g, ' ').toUpperCase()}`,
        message: `Order #${targetOrder.orderNumber} is now ${status.replace(/_/g, ' ')}.`,
        type: 'order',
        linkUrl: `/customer/orders/${orderId}`,
      });
    }
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId || o.orderNumber === orderId);
  };

  // Decoration Booking with Double-Booking / Overlap Conflict Prevention
  const isSlotAvailable = (vendorId: string, eventDate: string, timeSlot: string): boolean => {
    const conflictingBookings = bookings.filter(
      (b) =>
        b.vendorId === vendorId &&
        b.eventDate === eventDate &&
        b.timeSlot === timeSlot &&
        ['confirmed', 'accepted_by_vendor', 'preparing', 'setup_in_progress'].includes(b.status)
    );
    return conflictingBookings.length === 0;
  };

  const createDecorationBooking = async ({
    service,
    packageId,
    eventDate,
    timeSlot,
    venueAddress,
    guestCount,
    customizationNotes,
    selectedAddonIds,
    paymentMethod,
  }: {
    service: DecorationService;
    packageId: string;
    eventDate: string;
    timeSlot: string;
    venueAddress: CustomerAddress;
    guestCount?: number;
    customizationNotes?: string;
    selectedAddonIds: string[];
    paymentMethod: PaymentMethod;
  }): Promise<{ success: boolean; booking?: DecorationBooking; error?: string }> => {
    // 1. Strict server-side slot availability check
    if (!isSlotAvailable(service.vendorId, eventDate, timeSlot)) {
      return {
        success: false,
        error: `Sorry, this decorator is already booked for ${eventDate} (${timeSlot}). Please choose an alternate slot or date.`,
      };
    }

    const pkg = service.packages.find((p) => p.id === packageId) || service.packages[0];
    const selectedAddons = service.addons
      .filter((a) => selectedAddonIds.includes(a.id))
      .map((a) => ({ addonId: a.id, name: a.name, price: a.price }));

    const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    const platformFee = 99;
    const subtotal = pkg.price + addonsTotal;
    const totalAmount = subtotal + platformFee;

    const bookingReference = `BLOOM-BKG-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: DecorationBooking = {
      id: `bk-${Date.now()}`,
      bookingReference,
      userId: user?.id || 'guest',
      customerName: user?.fullName || venueAddress.recipientName,
      customerEmail: user?.email || 'customer@example.com',
      customerPhone: user?.phone || venueAddress.phone,
      vendorId: service.vendorId,
      vendorName: service.vendorName,
      serviceId: service.id,
      serviceName: service.name,
      serviceImage: service.images[0],
      packageId: pkg.id,
      packageName: pkg.name,
      eventType: service.eventType,
      eventDate,
      timeSlot,
      venueAddress,
      guestCount,
      customizationNotes,
      packagePrice: pkg.price,
      selectedAddons,
      addonsTotal,
      platformFee,
      discountAmount: 0,
      totalAmount,
      status: 'confirmed',
      paymentReference: `PAY-TXN-${Date.now().toString().slice(-6)}`,
      paymentMethod,
      isPaid: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);

    addNotification({
      title: 'Decoration Booking Reserved!',
      message: `Your booking ${bookingReference} for ${service.name} on ${eventDate} is confirmed.`,
      type: 'booking',
      linkUrl: `/customer/bookings/${newBooking.id}`,
    });

    return { success: true, booking: newBooking };
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus, reason?: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              status,
              rejectionReason: reason || b.rejectionReason,
              updatedAt: new Date().toISOString(),
            }
          : b
      )
    );

    const targetBooking = bookings.find((b) => b.id === bookingId);
    if (targetBooking) {
      addNotification({
        title: `Booking Update: ${status.replace(/_/g, ' ').toUpperCase()}`,
        message: `Booking #${targetBooking.bookingReference} status changed to ${status.replace(/_/g, ' ')}.`,
        type: 'booking',
        linkUrl: `/customer/bookings/${bookingId}`,
      });
    }
  };

  const getBookingById = (bookingId: string) => {
    return bookings.find((b) => b.id === bookingId || b.bookingReference === bookingId);
  };

  // Vendor Management Actions
  const createProduct = (productData: Omit<FlowerProduct, 'id' | 'createdAt' | 'rating' | 'reviewCount'>) => {
    const newProduct: FlowerProduct = {
      ...productData,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewCount: 0,
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<FlowerProduct>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const createService = (serviceData: Omit<DecorationService, 'id' | 'createdAt' | 'rating' | 'reviewCount'>) => {
    const newService: DecorationService = {
      ...serviceData,
      id: `serv-${Date.now()}`,
      rating: 5.0,
      reviewCount: 0,
      createdAt: new Date().toISOString(),
    };
    setServices((prev) => [newService, ...prev]);
  };

  const updateService = (id: string, updates: Partial<DecorationService>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const updateVendorProfile = (vendorId: string, updates: Partial<VendorProfile>) => {
    setVendors((prev) => prev.map((v) => (v.id === vendorId ? { ...v, ...updates } : v)));
  };

  // Admin Controls
  const submitVendorApplication = (appData: Omit<VendorApplication, 'id' | 'status' | 'submittedAt'>) => {
    const newApp: VendorApplication = {
      ...appData,
      id: `app-${Date.now()}`,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };
    setVendorApplications((prev) => [newApp, ...prev]);
  };

  const approveVendorApplication = (appId: string) => {
    const app = vendorApplications.find((a) => a.id === appId);
    if (!app) return;

    setVendorApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: 'approved' } : a))
    );

    // Create active vendor profile
    const newVendor: VendorProfile = {
      id: `vendor-${Date.now()}`,
      userId: app.userId,
      businessName: app.businessName,
      slug: app.businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      vendorType: app.vendorType,
      description: `Newly verified artisan ${app.vendorType} based in ${app.city}.`,
      logoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80',
      contactEmail: app.email,
      contactPhone: app.phone,
      city: app.city,
      serviceAreas: [app.city],
      status: 'approved',
      commissionRate: 10,
      rating: 5.0,
      reviewCount: 0,
      verified: true,
      isActive: true,
      yearsOfExperience: app.yearsExperience,
      createdAt: new Date().toISOString(),
    };

    setVendors((prev) => [...prev, newVendor]);
  };

  const rejectVendorApplication = (appId: string, reason: string) => {
    setVendorApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: 'rejected', rejectionReason: reason } : a))
    );
  };

  const toggleProductStatus = (id: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p)));
  };

  const toggleServiceStatus = (id: string) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s)));
  };

  const deleteReview = (reviewId: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
  };

  // Review Submission & Rating Aggregation
  const addReview = ({
    vendorId,
    itemType,
    itemId,
    itemName,
    rating,
    comment,
    orderId,
    bookingId,
  }: {
    vendorId: string;
    itemType: 'flower' | 'decoration';
    itemId: string;
    itemName: string;
    rating: number;
    comment: string;
    orderId?: string;
    bookingId?: string;
  }) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      userId: user?.id || 'user-cust-1',
      userName: user?.fullName || 'Verified Customer',
      userAvatar: user?.avatarUrl,
      vendorId,
      vendorName: vendors.find((v) => v.id === vendorId)?.businessName || 'Bloomora Vendor',
      itemType,
      itemId,
      itemName,
      orderId,
      bookingId,
      rating,
      comment,
      isVerifiedPurchase: true,
      createdAt: new Date().toISOString(),
    };

    const updatedReviews = [newRev, ...reviews];
    setReviews(updatedReviews);

    // Recalculate Vendor Rating
    const vendorRevs = updatedReviews.filter((r) => r.vendorId === vendorId);
    const avgVendorRating =
      vendorRevs.reduce((sum, r) => sum + r.rating, 0) / (vendorRevs.length || 1);
    updateVendorProfile(vendorId, {
      rating: parseFloat(avgVendorRating.toFixed(2)),
      reviewCount: vendorRevs.length,
    });

    // Recalculate Item Rating
    const itemRevs = updatedReviews.filter((r) => r.itemId === itemId);
    const avgItemRating =
      itemRevs.reduce((sum, r) => sum + r.rating, 0) / (itemRevs.length || 1);

    if (itemType === 'flower') {
      updateProduct(itemId, {
        rating: parseFloat(avgItemRating.toFixed(2)),
        reviewCount: itemRevs.length,
      });
    } else {
      updateService(itemId, {
        rating: parseFloat(avgItemRating.toFixed(2)),
        reviewCount: itemRevs.length,
      });
    }
  };

  // Notifications
  const addNotification = (n: Omit<NotificationItem, 'id' | 'userId' | 'createdAt' | 'isRead'>) => {
    const newItem: NotificationItem = {
      ...n,
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId: user?.id || 'guest',
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [newItem, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const resetDemoData = () => {
    localStorage.clear();
    setVendors(INITIAL_VENDORS);
    setProducts(INITIAL_PRODUCTS);
    setServices(INITIAL_SERVICES);
    setReviews(INITIAL_REVIEWS);
    setAddresses(INITIAL_ADDRESSES);
    setOrders(INITIAL_ORDERS);
    setBookings(INITIAL_BOOKINGS);
    setCartItems([]);
    setWishlist([]);
    setNotifications([]);
  };

  return (
    <StoreContext.Provider
      value={{
        categories,
        vendors,
        products,
        services,
        coupons,
        reviews,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isWishlisted,
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        orders,
        createFlowerOrder,
        updateOrderStatus,
        getOrderById,
        bookings,
        isSlotAvailable,
        createDecorationBooking,
        updateBookingStatus,
        getBookingById,
        createProduct,
        updateProduct,
        deleteProduct,
        createService,
        updateService,
        deleteService,
        updateVendorProfile,
        vendorApplications,
        submitVendorApplication,
        approveVendorApplication,
        rejectVendorApplication,
        toggleProductStatus,
        toggleServiceStatus,
        deleteReview,
        addReview,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        resetDemoData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
