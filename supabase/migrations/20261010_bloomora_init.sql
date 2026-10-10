-- ============================================================================
-- BLOOMORA MARKETPLACE — COMPREHENSIVE POSTGRESQL SCHEMA MIGRATION
-- Supports: Customers, Vendors (Florists & Decorators), Administrators
-- Supabase / PostgreSQL Compatible
-- ============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUM TYPES
DO $$ BEGIN
    CREATE TYPE user_role_enum AS ENUM ('customer', 'vendor', 'admin');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE vendor_type_enum AS ENUM ('florist', 'decorator', 'hybrid');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE vendor_status_enum AS ENUM ('pending', 'approved', 'rejected', 'suspended');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE order_status_enum AS ENUM (
        'pending_payment', 'payment_processing', 'confirmed', 'accepted_by_vendor',
        'preparing', 'ready_for_dispatch', 'out_for_delivery', 'delivered',
        'cancelled', 'refund_pending', 'refunded'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE booking_status_enum AS ENUM (
        'pending_payment', 'pending_approval', 'confirmed', 'accepted_by_vendor',
        'preparing', 'setup_in_progress', 'completed', 'cancelled', 'rejected',
        'refund_pending', 'refunded'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE payment_status_enum AS ENUM ('created', 'authorized', 'captured', 'failed', 'refunded');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE payment_method_enum AS ENUM ('upi', 'card', 'netbanking', 'wallet', 'cod_advance');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 3. HELPER FUNCTIONS & TRIGGERS
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. ESSENTIAL TABLE 1: profiles (Linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    city TEXT DEFAULT 'Bangalore',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User roles table (Protected from privilege escalation)
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role user_role_enum NOT NULL DEFAULT 'customer',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, role)
);

-- Admin check function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Automatic trigger for new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, phone)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        NEW.raw_user_meta_data->>'phone'
    )
    ON CONFLICT (id) DO NOTHING;

    -- Assign default role 'customer' only (Prevents self-assigning admin)
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'customer')
    ON CONFLICT DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. ESSENTIAL TABLE 2: vendor_profiles
CREATE TABLE IF NOT EXISTS public.vendor_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
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

-- Vendor applications queue for KYC & admin review
CREATE TABLE IF NOT EXISTS public.vendor_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    business_name TEXT NOT NULL,
    vendor_type vendor_type_enum NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    city TEXT NOT NULL,
    years_experience INTEGER DEFAULT 1,
    portfolio_links TEXT[] DEFAULT '{}',
    status vendor_status_enum DEFAULT 'pending',
    rejection_reason TEXT,
    reviewed_by UUID REFERENCES public.profiles(id),
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ESSENTIAL TABLE 3: categories
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('flower', 'decoration')),
    description TEXT,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ESSENTIAL TABLE 4: products (Fresh Flowers)
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES public.vendor_profiles(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT NOT NULL,
    flower_type TEXT NOT NULL,
    base_price NUMERIC(10,2) NOT NULL CHECK (base_price >= 0),
    sale_price NUMERIC(10,2) CHECK (sale_price IS NULL OR sale_price < base_price),
    stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    min_order_quantity INTEGER NOT NULL DEFAULT 1 CHECK (min_order_quantity >= 1),
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

-- Product variants (Standard, Deluxe, Premium)
CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    sku TEXT,
    is_default BOOLEAN DEFAULT FALSE
);

-- Product image gallery
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0
);

-- 8. ESSENTIAL TABLE 5: decoration_services
CREATE TABLE IF NOT EXISTS public.decoration_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES public.vendor_profiles(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
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

-- 9. ESSENTIAL TABLE 6: service_packages (Silver, Gold, Diamond tiers)
CREATE TABLE IF NOT EXISTS public.service_packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES public.decoration_services(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    included_items TEXT[] NOT NULL DEFAULT '{}',
    is_popular BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0
);

-- Service Add-ons (e.g. Fairy Lights, Helium Balloon Clusters)
CREATE TABLE IF NOT EXISTS public.service_addons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES public.decoration_services(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    is_active BOOLEAN DEFAULT TRUE
);

-- Service portfolio gallery
CREATE TABLE IF NOT EXISTS public.service_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES public.decoration_services(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0
);

-- Vendor availability blackout dates & weekly capacity
CREATE TABLE IF NOT EXISTS public.vendor_availability (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES public.vendor_profiles(id) ON DELETE CASCADE,
    day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6),
    slot_time TEXT NOT NULL,
    max_concurrent_bookings INTEGER DEFAULT 1,
    is_available BOOLEAN DEFAULT TRUE
);

-- Double-booking prevention slot reservations
CREATE TABLE IF NOT EXISTS public.booking_slot_reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES public.vendor_profiles(id) ON DELETE CASCADE,
    event_date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES public.profiles(id),
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(vendor_id, event_date, time_slot)
);

-- 10. ESSENTIAL TABLE 7: customer_addresses (Indian format)
CREATE TABLE IF NOT EXISTS public.customer_addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
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

-- 11. ESSENTIAL TABLE 8: flower_orders
CREATE TABLE IF NOT EXISTS public.flower_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES public.profiles(id),
    vendor_id UUID NOT NULL REFERENCES public.vendor_profiles(id),
    address_id UUID REFERENCES public.customer_addresses(id),
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

-- 12. ESSENTIAL TABLE 9: flower_order_items
CREATE TABLE IF NOT EXISTS public.flower_order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.flower_orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id),
    variant_id UUID REFERENCES public.product_variants(id),
    product_name TEXT NOT NULL,
    variant_name TEXT,
    price_per_unit NUMERIC(10,2) NOT NULL CHECK (price_per_unit >= 0),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    subtotal NUMERIC(10,2) NOT NULL CHECK (subtotal >= 0)
);

-- 13. ESSENTIAL TABLE 10: decoration_bookings
CREATE TABLE IF NOT EXISTS public.decoration_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_reference TEXT UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES public.profiles(id),
    vendor_id UUID NOT NULL REFERENCES public.vendor_profiles(id),
    service_id UUID NOT NULL REFERENCES public.decoration_services(id),
    package_id UUID NOT NULL REFERENCES public.service_packages(id),
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

CREATE TABLE IF NOT EXISTS public.booking_addons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES public.decoration_bookings(id) ON DELETE CASCADE,
    addon_id UUID NOT NULL REFERENCES public.service_addons(id),
    addon_name TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0)
);

-- Payments & Transactions table
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_reference TEXT UNIQUE NOT NULL,
    order_id UUID REFERENCES public.flower_orders(id) ON DELETE SET NULL,
    booking_id UUID REFERENCES public.decoration_bookings(id) ON DELETE SET NULL,
    user_id UUID NOT NULL REFERENCES public.profiles(id),
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

-- 14. ESSENTIAL TABLE 11: reviews (Verified purchases & bookings)
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    vendor_id UUID NOT NULL REFERENCES public.vendor_profiles(id) ON DELETE CASCADE,
    item_type TEXT NOT NULL CHECK (item_type IN ('flower', 'decoration')),
    item_id UUID NOT NULL,
    order_id UUID REFERENCES public.flower_orders(id) ON DELETE SET NULL,
    booking_id UUID REFERENCES public.decoration_bookings(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    is_verified_purchase BOOLEAN DEFAULT TRUE,
    is_approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. ESSENTIAL TABLE 12: notifications
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL,
    link_url TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_products_vendor ON public.products(vendor_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products(base_price);
CREATE INDEX IF NOT EXISTS idx_services_vendor ON public.decoration_services(vendor_id);
CREATE INDEX IF NOT EXISTS idx_services_category ON public.decoration_services(category_id);
CREATE INDEX IF NOT EXISTS idx_flower_orders_user ON public.flower_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_flower_orders_vendor ON public.flower_orders(vendor_id);
CREATE INDEX IF NOT EXISTS idx_flower_orders_status ON public.flower_orders(status);
CREATE INDEX IF NOT EXISTS idx_decoration_bookings_user ON public.decoration_bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_decoration_bookings_vendor ON public.decoration_bookings(vendor_id);
CREATE INDEX IF NOT EXISTS idx_decoration_bookings_date ON public.decoration_bookings(event_date);
CREATE INDEX IF NOT EXISTS idx_reviews_vendor ON public.reviews(vendor_id);
CREATE INDEX IF NOT EXISTS idx_reviews_item ON public.reviews(item_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id);

-- Updated_at triggers
DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles;
CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_vendor_profiles_updated_at ON public.vendor_profiles;
CREATE TRIGGER trg_vendor_profiles_updated_at BEFORE UPDATE ON public.vendor_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_products_updated_at ON public.products;
CREATE TRIGGER trg_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_services_updated_at ON public.decoration_services;
CREATE TRIGGER trg_services_updated_at BEFORE UPDATE ON public.decoration_services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_flower_orders_updated_at ON public.flower_orders;
CREATE TRIGGER trg_flower_orders_updated_at BEFORE UPDATE ON public.flower_orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_decoration_bookings_updated_at ON public.decoration_bookings;
CREATE TRIGGER trg_decoration_bookings_updated_at BEFORE UPDATE ON public.decoration_bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW-LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all exposed tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.decoration_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flower_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flower_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.decoration_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- 1. profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. user_roles policies (Strict privilege separation: users cannot grant themselves admin)
CREATE POLICY "Users can view own roles"
    ON public.user_roles FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Only admins can modify roles"
    ON public.user_roles FOR ALL USING (public.is_admin());

-- 3. vendor_profiles policies
CREATE POLICY "Active approved vendor profiles are viewable by all"
    ON public.vendor_profiles FOR SELECT
    USING ((status = 'approved' AND is_active = true) OR auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Vendors can update own profile"
    ON public.vendor_profiles FOR UPDATE
    USING (auth.uid() = user_id OR public.is_admin());

-- 4. categories policies
CREATE POLICY "Categories are viewable by everyone"
    ON public.categories FOR SELECT USING (is_active = true OR public.is_admin());

CREATE POLICY "Only admins can modify categories"
    ON public.categories FOR ALL USING (public.is_admin());

-- 5. products policies
CREATE POLICY "Active products are viewable by everyone"
    ON public.products FOR SELECT
    USING (is_active = true OR EXISTS (
        SELECT 1 FROM public.vendor_profiles WHERE vendor_profiles.id = products.vendor_id AND vendor_profiles.user_id = auth.uid()
    ) OR public.is_admin());

CREATE POLICY "Vendors can insert their own products"
    ON public.products FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM public.vendor_profiles WHERE vendor_profiles.id = vendor_id AND vendor_profiles.user_id = auth.uid()) OR public.is_admin()
    );

CREATE POLICY "Vendors can update their own products"
    ON public.products FOR UPDATE USING (
        EXISTS (SELECT 1 FROM public.vendor_profiles WHERE vendor_profiles.id = vendor_id AND vendor_profiles.user_id = auth.uid()) OR public.is_admin()
    );

CREATE POLICY "Vendors can delete their own products"
    ON public.products FOR DELETE USING (
        EXISTS (SELECT 1 FROM public.vendor_profiles WHERE vendor_profiles.id = vendor_id AND vendor_profiles.user_id = auth.uid()) OR public.is_admin()
    );

-- 6. product variants & images
CREATE POLICY "Product variants viewable by everyone"
    ON public.product_variants FOR SELECT USING (true);

CREATE POLICY "Product images viewable by everyone"
    ON public.product_images FOR SELECT USING (true);

-- 7. decoration_services policies
CREATE POLICY "Active decoration services are viewable by everyone"
    ON public.decoration_services FOR SELECT
    USING (is_active = true OR EXISTS (
        SELECT 1 FROM public.vendor_profiles WHERE vendor_profiles.id = decoration_services.vendor_id AND vendor_profiles.user_id = auth.uid()
    ) OR public.is_admin());

CREATE POLICY "Vendors can manage their own decoration services"
    ON public.decoration_services FOR ALL USING (
        EXISTS (SELECT 1 FROM public.vendor_profiles WHERE vendor_profiles.id = vendor_id AND vendor_profiles.user_id = auth.uid()) OR public.is_admin()
    );

-- 8. service packages, addons & images
CREATE POLICY "Service packages viewable by everyone"
    ON public.service_packages FOR SELECT USING (true);

CREATE POLICY "Service addons viewable by everyone"
    ON public.service_addons FOR SELECT USING (true);

CREATE POLICY "Service images viewable by everyone"
    ON public.service_images FOR SELECT USING (true);

-- 9. customer_addresses policies (Customers only access their own)
CREATE POLICY "Users can view own addresses"
    ON public.customer_addresses FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can insert own addresses"
    ON public.customer_addresses FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses"
    ON public.customer_addresses FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses"
    ON public.customer_addresses FOR DELETE USING (auth.uid() = user_id);

-- 10. flower_orders policies (Customer sees own, vendor sees orders assigned to them, admin sees all)
CREATE POLICY "Users and vendors can view relevant flower orders"
    ON public.flower_orders FOR SELECT USING (
        auth.uid() = user_id OR 
        EXISTS (SELECT 1 FROM public.vendor_profiles WHERE vendor_profiles.id = flower_orders.vendor_id AND vendor_profiles.user_id = auth.uid()) OR
        public.is_admin()
    );

CREATE POLICY "Customers can place flower orders"
    ON public.flower_orders FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Customers and vendors can update relevant flower orders"
    ON public.flower_orders FOR UPDATE USING (
        auth.uid() = user_id OR 
        EXISTS (SELECT 1 FROM public.vendor_profiles WHERE vendor_profiles.id = flower_orders.vendor_id AND vendor_profiles.user_id = auth.uid()) OR
        public.is_admin()
    );

-- 11. flower_order_items policies
CREATE POLICY "Relevant parties can view flower order items"
    ON public.flower_order_items FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.flower_orders 
            WHERE flower_orders.id = flower_order_items.order_id AND (
                flower_orders.user_id = auth.uid() OR
                EXISTS (SELECT 1 FROM public.vendor_profiles WHERE vendor_profiles.id = flower_orders.vendor_id AND vendor_profiles.user_id = auth.uid()) OR
                public.is_admin()
            )
        )
    );

CREATE POLICY "Customers can insert order items"
    ON public.flower_order_items FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM public.flower_orders WHERE flower_orders.id = order_id AND flower_orders.user_id = auth.uid())
    );

-- 12. decoration_bookings policies
CREATE POLICY "Users and vendors can view relevant decoration bookings"
    ON public.decoration_bookings FOR SELECT USING (
        auth.uid() = user_id OR 
        EXISTS (SELECT 1 FROM public.vendor_profiles WHERE vendor_profiles.id = decoration_bookings.vendor_id AND vendor_profiles.user_id = auth.uid()) OR
        public.is_admin()
    );

CREATE POLICY "Customers can submit decoration bookings"
    ON public.decoration_bookings FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Customers and vendors can update relevant decoration bookings"
    ON public.decoration_bookings FOR UPDATE USING (
        auth.uid() = user_id OR 
        EXISTS (SELECT 1 FROM public.vendor_profiles WHERE vendor_profiles.id = decoration_bookings.vendor_id AND vendor_profiles.user_id = auth.uid()) OR
        public.is_admin()
    );

CREATE POLICY "Relevant parties can view booking addons"
    ON public.booking_addons FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.decoration_bookings 
            WHERE decoration_bookings.id = booking_addons.booking_id AND (
                decoration_bookings.user_id = auth.uid() OR
                EXISTS (SELECT 1 FROM public.vendor_profiles WHERE vendor_profiles.id = decoration_bookings.vendor_id AND vendor_profiles.user_id = auth.uid()) OR
                public.is_admin()
            )
        )
    );

-- 13. payments policies
CREATE POLICY "Users and admins can view payments"
    ON public.payments FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can create payments"
    ON public.payments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 14. reviews policies
CREATE POLICY "Approved reviews viewable by everyone"
    ON public.reviews FOR SELECT USING (is_approved = true OR auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Customers can write reviews"
    ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
    ON public.reviews FOR UPDATE USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users and admins can delete reviews"
    ON public.reviews FOR DELETE USING (auth.uid() = user_id OR public.is_admin());

-- 15. notifications policies (Recipients only)
CREATE POLICY "Users can view own notifications"
    ON public.notifications FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can mark own notifications as read"
    ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
