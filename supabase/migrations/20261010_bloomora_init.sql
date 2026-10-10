-- ============================================================================
-- BLOOMORA MARKETPLACE — COMPREHENSIVE POSTGRESQL SCHEMA MIGRATION
-- Supports: Customers, Vendors (Florists & Decorators), Administrators
-- PostgreSQL / Supabase Compatible
-- ============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CUSTOM TYPES & ENUMS
DO $$ BEGIN
    CREATE TYPE user_role_enum AS ENUM ('customer', 'vendor', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE vendor_type_enum AS ENUM ('florist', 'decorator', 'hybrid');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE vendor_status_enum AS ENUM ('pending', 'approved', 'rejected', 'suspended');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status_enum AS ENUM (
        'pending_payment', 'payment_processing', 'confirmed', 'accepted_by_vendor',
        'preparing', 'ready_for_dispatch', 'out_for_delivery', 'delivered',
        'cancelled', 'refund_pending', 'refunded'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE booking_status_enum AS ENUM (
        'pending_payment', 'pending_approval', 'confirmed', 'accepted_by_vendor',
        'preparing', 'setup_in_progress', 'completed', 'cancelled', 'rejected',
        'refund_pending', 'refunded'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status_enum AS ENUM ('created', 'authorized', 'captured', 'failed', 'refunded');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_method_enum AS ENUM ('upi', 'card', 'netbanking', 'wallet', 'cod_advance');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. CORE USER PROFILES & ROLES
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    city TEXT DEFAULT 'Bangalore',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role user_role_enum NOT NULL DEFAULT 'customer',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, role)
);

-- 4. VENDOR PROFILES & APPLICATIONS
CREATE TABLE IF NOT EXISTS vendor_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    business_name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    vendor_type vendor_type_enum NOT NULL,
    description TEXT,
    logo_url TEXT,
    banner_url TEXT,
    contact_email TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    city TEXT NOT NULL,
    service_areas TEXT[] DEFAULT '{}',
    gstin TEXT,
    status vendor_status_enum DEFAULT 'pending',
    commission_rate NUMERIC(5,2) DEFAULT 10.00,
    rating NUMERIC(3,2) DEFAULT 5.00,
    review_count INTEGER DEFAULT 0,
    verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vendor_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    business_name TEXT NOT NULL,
    vendor_type vendor_type_enum NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    city TEXT NOT NULL,
    years_experience INTEGER DEFAULT 1,
    portfolio_links TEXT[] DEFAULT '{}',
    status vendor_status_enum DEFAULT 'pending',
    rejection_reason TEXT,
    reviewed_by UUID REFERENCES profiles(id),
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('flower', 'decoration')),
    description TEXT,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

-- 6. FLOWER PRODUCTS & INVENTORY
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES vendor_profiles(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT NOT NULL,
    flower_type TEXT NOT NULL,
    base_price NUMERIC(10,2) NOT NULL CHECK (base_price >= 0),
    sale_price NUMERIC(10,2) CHECK (sale_price IS NULL OR sale_price < base_price),
    stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    min_order_quantity INTEGER NOT NULL DEFAULT 1,
    freshness_guarantee TEXT DEFAULT 'Handpicked same-day from local farms',
    estimated_delivery_time TEXT DEFAULT '2 to 4 hours in metro areas',
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    rating NUMERIC(3,2) DEFAULT 5.00,
    review_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(vendor_id, slug)
);

CREATE TABLE IF NOT EXISTS product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    sku TEXT,
    is_default BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS inventory_movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
    quantity_change INTEGER NOT NULL,
    reason TEXT NOT NULL,
    order_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. DECORATION SERVICES & PACKAGES
CREATE TABLE IF NOT EXISTS decoration_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES vendor_profiles(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT NOT NULL,
    event_type TEXT NOT NULL,
    base_price NUMERIC(10,2) NOT NULL CHECK (base_price >= 0),
    setup_duration_hours NUMERIC(4,1) DEFAULT 3.0,
    min_notice_days INTEGER DEFAULT 2,
    cancellation_policy TEXT DEFAULT 'Free cancellation up to 48 hours prior to event start',
    service_areas TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    rating NUMERIC(3,2) DEFAULT 5.00,
    review_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(vendor_id, slug)
);

CREATE TABLE IF NOT EXISTS service_packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES decoration_services(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    included_items TEXT[] NOT NULL DEFAULT '{}',
    is_popular BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS service_addons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES decoration_services(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS service_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES decoration_services(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0
);

-- 8. VENDOR AVAILABILITY & BOOKING SLOTS
CREATE TABLE IF NOT EXISTS vendor_availability (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES vendor_profiles(id) ON DELETE CASCADE,
    day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6),
    slot_time TEXT NOT NULL,
    max_concurrent_bookings INTEGER DEFAULT 1,
    is_available BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS booking_slot_reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES vendor_profiles(id) ON DELETE CASCADE,
    event_date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES profiles(id),
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(vendor_id, event_date, time_slot)
);

-- 9. CUSTOMER ADDRESSES
CREATE TABLE IF NOT EXISTS customer_addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    recipient_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    flat_house TEXT NOT NULL,
    street_area TEXT NOT NULL,
    landmark TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL DEFAULT 'Karnataka',
    pincode TEXT NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    address_type TEXT DEFAULT 'home',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. CARTS & WISHLISTS
CREATE TABLE IF NOT EXISTS carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(cart_id, product_id, variant_id)
);

CREATE TABLE IF NOT EXISTS wishlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS wishlist_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wishlist_id UUID NOT NULL REFERENCES wishlists(id) ON DELETE CASCADE,
    item_type TEXT NOT NULL CHECK (item_type IN ('flower', 'decoration')),
    item_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(wishlist_id, item_type, item_id)
);

-- 11. ORDERS (FLOWERS)
CREATE TABLE IF NOT EXISTS flower_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES profiles(id),
    vendor_id UUID NOT NULL REFERENCES vendor_profiles(id),
    address_id UUID REFERENCES customer_addresses(id),
    delivery_address_json JSONB NOT NULL,
    subtotal NUMERIC(10,2) NOT NULL CHECK (subtotal >= 0),
    delivery_fee NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (delivery_fee >= 0),
    platform_fee NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (platform_fee >= 0),
    discount_amount NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
    total_amount NUMERIC(10,2) NOT NULL CHECK (total_amount >= 0),
    status order_status_enum DEFAULT 'pending_payment',
    delivery_instructions TEXT,
    vendor_rejection_reason TEXT,
    delivery_eta TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS flower_order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES flower_orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    variant_id UUID REFERENCES product_variants(id),
    product_name TEXT NOT NULL,
    variant_name TEXT,
    price_per_unit NUMERIC(10,2) NOT NULL CHECK (price_per_unit >= 0),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    subtotal NUMERIC(10,2) NOT NULL CHECK (subtotal >= 0)
);

-- 12. DECORATION BOOKINGS
CREATE TABLE IF NOT EXISTS decoration_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_reference TEXT UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES profiles(id),
    vendor_id UUID NOT NULL REFERENCES vendor_profiles(id),
    service_id UUID NOT NULL REFERENCES decoration_services(id),
    package_id UUID NOT NULL REFERENCES service_packages(id),
    event_type TEXT NOT NULL,
    event_date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    venue_address_json JSONB NOT NULL,
    guest_count INTEGER,
    customization_notes TEXT,
    package_price NUMERIC(10,2) NOT NULL CHECK (package_price >= 0),
    addons_total NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (addons_total >= 0),
    platform_fee NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (platform_fee >= 0),
    discount_amount NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
    total_amount NUMERIC(10,2) NOT NULL CHECK (total_amount >= 0),
    status booking_status_enum DEFAULT 'pending_payment',
    vendor_rejection_reason TEXT,
    cancellation_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS booking_addons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES decoration_bookings(id) ON DELETE CASCADE,
    addon_id UUID NOT NULL REFERENCES service_addons(id),
    addon_name TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0)
);

-- 13. PAYMENTS & REFUNDS
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_reference TEXT UNIQUE NOT NULL,
    order_id UUID REFERENCES flower_orders(id) ON DELETE SET NULL,
    booking_id UUID REFERENCES decoration_bookings(id) ON DELETE SET NULL,
    user_id UUID NOT NULL REFERENCES profiles(id),
    provider TEXT NOT NULL DEFAULT 'razorpay',
    provider_order_id TEXT,
    provider_payment_id TEXT,
    provider_signature TEXT,
    amount NUMERIC(10,2) NOT NULL CHECK (amount >= 0),
    currency TEXT DEFAULT 'INR',
    payment_method payment_method_enum NOT NULL,
    status payment_status_enum NOT NULL DEFAULT 'created',
    raw_response JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS refunds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id UUID NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL CHECK (amount >= 0),
    reason TEXT NOT NULL,
    provider_refund_id TEXT,
    status TEXT NOT NULL DEFAULT 'processed',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. REVIEWS & RATINGS
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    vendor_id UUID NOT NULL REFERENCES vendor_profiles(id) ON DELETE CASCADE,
    item_type TEXT NOT NULL CHECK (item_type IN ('flower', 'decoration')),
    item_id UUID NOT NULL,
    order_id UUID REFERENCES flower_orders(id) ON DELETE SET NULL,
    booking_id UUID REFERENCES decoration_bookings(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    is_verified_purchase BOOLEAN DEFAULT TRUE,
    is_approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL,
    link_url TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. COUPONS
CREATE TABLE IF NOT EXISTS coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    discount_percent NUMERIC(5,2) CHECK (discount_percent > 0 AND discount_percent <= 100),
    discount_flat NUMERIC(10,2) CHECK (discount_flat > 0),
    min_order_amount NUMERIC(10,2) DEFAULT 0,
    max_discount_amount NUMERIC(10,2),
    valid_until TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE
);

-- 17. AUDIT LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_products_vendor ON products(vendor_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(base_price);
CREATE INDEX IF NOT EXISTS idx_services_vendor ON decoration_services(vendor_id);
CREATE INDEX IF NOT EXISTS idx_services_category ON decoration_services(category_id);
CREATE INDEX IF NOT EXISTS idx_flower_orders_user ON flower_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_flower_orders_vendor ON flower_orders(vendor_id);
CREATE INDEX IF NOT EXISTS idx_decoration_bookings_user ON decoration_bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_decoration_bookings_vendor ON decoration_bookings(vendor_id);
CREATE INDEX IF NOT EXISTS idx_decoration_bookings_date ON decoration_bookings(event_date);
CREATE INDEX IF NOT EXISTS idx_payments_order ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_booking ON payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);

-- 19. ROW-LEVEL SECURITY (RLS) POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE flower_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE decoration_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles: Public can view vendor profile names, users can update own profile
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Addresses: Customers can manage only their own
CREATE POLICY "Users can view own addresses" ON customer_addresses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own addresses" ON customer_addresses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own addresses" ON customer_addresses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own addresses" ON customer_addresses FOR DELETE USING (auth.uid() = user_id);

-- Orders: Customer can see their orders; vendor can see orders placed with them
CREATE POLICY "Users can view own flower orders" ON flower_orders FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (SELECT 1 FROM vendor_profiles WHERE vendor_profiles.id = flower_orders.vendor_id AND vendor_profiles.user_id = auth.uid())
);

-- Bookings: Customer can see their bookings; vendor can see bookings placed with them
CREATE POLICY "Users can view own decoration bookings" ON decoration_bookings FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (SELECT 1 FROM vendor_profiles WHERE vendor_profiles.id = decoration_bookings.vendor_id AND vendor_profiles.user_id = auth.uid())
);
