// Core Type Definitions for Bloomora Marketplace

export type UserRole = 'customer' | 'vendor' | 'admin';
export type VendorType = 'florist' | 'decorator' | 'hybrid';
export type VendorStatus = 'pending' | 'approved' | 'rejected' | 'suspended';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  avatarUrl?: string;
  city?: string;
  role: UserRole;
  createdAt: string;
}

export interface CustomerAddress {
  id: string;
  userId: string;
  recipientName: string;
  phone: string;
  flatHouse: string;
  streetArea: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  addressType: 'home' | 'work' | 'other';
}

export interface VendorProfile {
  id: string;
  userId: string;
  businessName: string;
  slug: string;
  vendorType: VendorType;
  description: string;
  logoUrl: string;
  bannerUrl: string;
  contactEmail: string;
  contactPhone: string;
  city: string;
  serviceAreas: string[];
  gstin?: string;
  status: VendorStatus;
  commissionRate: number; // percentage, e.g. 10
  rating: number;
  reviewCount: number;
  verified: boolean;
  isActive: boolean;
  yearsOfExperience?: number;
  createdAt: string;
}

export interface VendorApplication {
  id: string;
  userId: string;
  businessName: string;
  vendorType: VendorType;
  phone: string;
  email: string;
  city: string;
  yearsExperience: number;
  portfolioLinks: string[];
  status: VendorStatus;
  rejectionReason?: string;
  submittedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  type: 'flower' | 'decoration';
  description?: string;
  imageUrl?: string;
}

export interface ProductVariant {
  id: string;
  name: string; // e.g. "Standard (12 Stems)", "Deluxe (24 Stems)", "Grand (36 Stems)"
  price: number;
  stockQuantity: number;
  sku?: string;
  isDefault?: boolean;
}

export interface FlowerProduct {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorCity: string;
  categoryId: string;
  categoryName: string;
  name: string;
  slug: string;
  description: string;
  flowerType: string; // e.g. "Roses", "Lilies", "Orchids", "Carnations", "Mixed"
  basePrice: number;
  salePrice?: number;
  stockQuantity: number;
  minOrderQuantity: number;
  freshnessGuarantee: string;
  estimatedDeliveryTime: string;
  images: string[];
  variants: ProductVariant[];
  isActive: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface ServicePackage {
  id: string;
  name: string; // e.g. "Silver Canopy", "Gold Floral Extravaganza"
  description: string;
  price: number;
  includedItems: string[];
  isPopular?: boolean;
}

export interface ServiceAddon {
  id: string;
  name: string; // e.g. "Warm Fairy Lights (50m)", "LED Floral Marquee Numbers", "Dry Ice Fog Entry"
  description?: string;
  price: number;
}

export interface DecorationService {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorCity: string;
  categoryId: string;
  categoryName: string;
  name: string;
  slug: string;
  description: string;
  eventType: string; // e.g. "Birthday", "Wedding", "Anniversary", "Engagement", "Baby Shower", "Car Decor"
  basePrice: number;
  setupDurationHours: number;
  minNoticeDays: number;
  cancellationPolicy: string;
  serviceAreas: string[];
  images: string[];
  packages: ServicePackage[];
  addons: ServiceAddon[];
  availableSlots: string[]; // e.g. ["09:00 - 12:00", "13:00 - 16:00", "17:00 - 20:00"]
  isActive: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: FlowerProduct;
  variantId?: string;
  variantName?: string;
  unitPrice: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  platformFee: number;
  discount: number;
  total: number;
}

export interface WishlistItem {
  id: string;
  type: 'flower' | 'decoration';
  itemId: string;
  product?: FlowerProduct;
  service?: DecorationService;
  addedAt: string;
}

export type OrderStatus =
  | 'pending_payment'
  | 'payment_processing'
  | 'confirmed'
  | 'accepted_by_vendor'
  | 'preparing'
  | 'ready_for_dispatch'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'refund_pending'
  | 'refunded';

export interface FlowerOrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  variantName?: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface FlowerOrder {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  vendorId: string;
  vendorName: string;
  deliveryAddress: CustomerAddress;
  items: FlowerOrderItem[];
  subtotal: number;
  deliveryFee: number;
  platformFee: number;
  discountAmount: number;
  totalAmount: number;
  status: OrderStatus;
  deliveryInstructions?: string;
  rejectionReason?: string;
  paymentReference?: string;
  paymentMethod?: PaymentMethod;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus =
  | 'pending_payment'
  | 'pending_approval'
  | 'confirmed'
  | 'accepted_by_vendor'
  | 'preparing'
  | 'setup_in_progress'
  | 'completed'
  | 'cancelled'
  | 'rejected'
  | 'refund_pending'
  | 'refunded';

export interface DecorationBooking {
  id: string;
  bookingReference: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  vendorId: string;
  vendorName: string;
  serviceId: string;
  serviceName: string;
  serviceImage: string;
  packageId: string;
  packageName: string;
  eventType: string;
  eventDate: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "14:00 - 17:00"
  venueAddress: CustomerAddress;
  guestCount?: number;
  customizationNotes?: string;
  packagePrice: number;
  selectedAddons: { addonId: string; name: string; price: number }[];
  addonsTotal: number;
  platformFee: number;
  discountAmount: number;
  totalAmount: number;
  status: BookingStatus;
  rejectionReason?: string;
  cancellationReason?: string;
  paymentReference?: string;
  paymentMethod?: PaymentMethod;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
}

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallet' | 'cod_advance';
export type PaymentStatus = 'created' | 'authorized' | 'captured' | 'failed' | 'refunded';

export interface PaymentTransaction {
  id: string;
  paymentReference: string;
  orderId?: string;
  bookingId?: string;
  userId: string;
  provider: 'razorpay' | 'sandbox_simulator';
  providerOrderId?: string;
  providerPaymentId?: string;
  amount: number;
  currency: 'INR';
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  vendorId: string;
  vendorName: string;
  itemType: 'flower' | 'decoration';
  itemId: string;
  itemName: string;
  orderId?: string;
  bookingId?: string;
  rating: number; // 1 to 5
  comment: string;
  images?: string[];
  isVerifiedPurchase: boolean;
  isDemo?: boolean;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'booking' | 'system' | 'vendor';
  linkUrl?: string;
  isRead: boolean;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent?: number;
  discountFlat?: number;
  minOrderAmount: number;
  maxDiscount?: number;
  description: string;
  validUntil: string;
  isActive: boolean;
}
