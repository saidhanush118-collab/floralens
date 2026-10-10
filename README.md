# Bloomora — Flower Shopping & Event Decoration Marketplace

Bloomora is a full-stack, responsive, and database-connected marketplace designed for the Indian market, connecting customers with local florists and professional event decorators. Customers can purchase fresh floral bouquets and book event decoration services (weddings, birthdays, anniversaries) with date, time slot, and venue selection.

---

## 🌟 Key Features

### 🛒 1. Fresh Flower Marketplace
- **Curated Catalog:** Roses, Lilies, Orchids, Carnations, Mixed Bouquets, Flower Baskets, and Floral Gifts.
- **Dynamic Inventory & Variants:** Real-time stock tracking with variant selection (Standard, Deluxe, Premium).
- **India-Ready Checkout:** Real-time cart calculation, delivery address management (Pincode, City, State, Landmark), and coupon discounts (`BLOOM10`, `FESTIVE20`).
- **Atomic Stock Protection:** Prevents overselling and validates inventory before payment completion.

### 🎪 2. Event Decoration Booking Engine
- **Service Categories:** Birthday, Anniversary, Wedding, Engagement, Baby Shower, Surprise Room, and Car Decorations.
- **Package & Addon Customization:** Select packages (Silver, Gold, Diamond) with add-on options (e.g., Fairy Lights, Helium Balloons, Personalized Banners).
- **Double-Booking Prevention:** Strict server/store slot validation that prevents conflicting confirmed bookings for the same vendor and time interval.
- **Detailed Booking Form:** Event date, time slot, venue address, guest count, and custom decoration instructions.

### 💳 3. Payments & India-Specific Localization
- **Currency:** Full support for Indian Rupee (`₹` INR) formatting across all catalogs, carts, and invoices.
- **Payment Gateway:** Razorpay Sandbox integration supporting UPI QR / VPA, Credit/Debit Cards, and Netbanking.
- **Honest Sandbox Mode:** Test modes for instant payment simulation (Success or Failure) with signature simulation and audit logging.

### 👥 4. Multi-Role Ecosystem & Portals
- **Customer Portal:** Order tracking timeline, decoration booking management, saved delivery addresses, wishlist, and verified customer reviews.
- **Vendor Portal:** Order fulfillment progression (`Pending` ➔ `Confirmed` ➔ `Preparing` ➔ `Dispatched` ➔ `Delivered`), booking request management (`Accept`/`Reject`), inventory and service catalogue CRUD, availability blackout dates.
- **Admin Portal:** Vendor application review and approval, listing moderation (approve/reject/flag), platform transaction audit, and instant demo database reset.

---

## 🏗️ Architecture & Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS |
| **Icons & Design** | Lucide React, Google Fonts (`Playfair Display`, `Plus Jakarta Sans`) |
| **Routing** | React Router v7 with role-based route guards (`ProtectedRoute`) |
| **Database & Schema** | PostgreSQL schema with 25+ tables & Row Level Security (RLS) policies in `supabase/migrations/20261010_bloomora_init.sql` |
| **Backend Modes** | Dual-mode: Transparently connects to live Supabase or runs an in-browser persistent offline database when credentials are not supplied |
| **Testing** | Vitest, React Testing Library |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or newer recommended)
- npm or pnpm

### 2. Installation
```bash
git clone <repository-url>
cd floralens
npm install
```

### 3. Environment Configuration
Copy the template environment file:
```bash
cp .env.example .env
```

To connect live Supabase & Razorpay credentials, configure `.env`:
```ini
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id
```
*(If left empty, Bloomora automatically activates its **Demo Local-Store Mode** with simulated persistence).*

### 4. Running Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Running the Test Suite
```bash
npm test
```

### 6. Production Build
```bash
npm run build
```

---

## 🗄️ Database Migrations (PostgreSQL / Supabase)

The complete PostgreSQL migration script is located at:
`supabase/migrations/20261010_bloomora_init.sql`

It configures:
- Tables: `profiles`, `vendor_profiles`, `categories`, `products`, `product_variants`, `inventory_movements`, `decoration_services`, `service_packages`, `service_addons`, `customer_addresses`, `flower_orders`, `flower_order_items`, `decoration_bookings`, `booking_addons`, `payments`, `reviews`, `coupons`, `audit_logs`.
- PostgreSQL triggers for automated `updated_at` timestamps.
- Row-Level Security (RLS) policies enforcing tenant isolation for customers, vendors, and platform admins.

To apply to your Supabase project:
1. Log in to [Supabase Console](https://supabase.com).
2. Open the **SQL Editor**.
3. Paste the contents of `supabase/migrations/20261010_bloomora_init.sql` and click **Run**.

---

## 🎭 Demo Accounts & Quick Role Switcher

For instant demonstrations, Bloomora includes a persistent one-click role switcher in the top navigation bar:

| Role | Demo Email | Capabilities |
|---|---|---|
| **Customer** | `customer@bloomora.in` | Browse catalog, add to cart, book decorators, track orders |
| **Vendor (Florist & Decorator)** | `vendor@petalspress.in` | Fulfill orders, accept/reject bookings, manage stock & services |
| **Platform Administrator** | `admin@bloomora.in` | Approve vendors, moderate listings, audit platform transactions |

---

## 🧪 Verified Acceptance Tests

- [x] **Product & Service Discovery:** Search, price/category filters, city selector, responsive catalog.
- [x] **Cart & Stock Validation:** Dynamic inventory decrement, minimum order validation, coupon engine.
- [x] **Decoration Booking Engine:** Time slot selection, venue capture, double-booking collision prevention.
- [x] **Razorpay Sandbox Integration:** Simulated UPI QR, cards, netbanking with order ID correlation.
- [x] **Multi-Stage Order Tracking:** Visual timeline from confirmation to doorstep delivery.
- [x] **Vendor Fulfillment Flow:** Transition statuses from Pending to Out for Delivery.
- [x] **Admin Moderation & Approvals:** Review new vendor KYC applications and moderate listings.
- [x] **Automated Test Suite:** 8/8 Vitest tests passing with 0 build warnings.
