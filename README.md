# FloraLens — Flower Shopping & Event Decoration Marketplace

FloraLens is a full-stack, responsive, and database-connected marketplace designed for the Indian market, connecting customers with local florists and professional event decorators. Customers can purchase fresh floral bouquets and book event decoration services (weddings, birthdays, anniversaries) with date, time slot, and venue selection.

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
| **Backend & API** | Node.js, Express.js REST API with CORS & connection pooling |
| **Database & Schema** | MongoDB Atlas Cluster with collections: `categories`, `products`, `services`, `vendors`, `orders`, `bookings`, `reviews`, `coupons`, `addresses`, `users` |
| **Testing** | Vitest, React Testing Library, Live MongoDB Atlas probe tests |

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
Configure `.env`:
```ini
VITE_APP_NAME=FloraLens
VITE_APP_URL=http://localhost:5173
VITE_API_URL=/api
PORT=5000

# MongoDB Database Configuration
MONGODB_URI=mongodb+srv://saidhanush118_db_user:R8D72u5PrSnYrJ9L@cluster0.yq3tw5x.mongodb.net/floralens?retryWrites=true&w=majority
MONGODB_DB_NAME=floralens

VITE_RAZORPAY_KEY_ID=
VITE_DEMO_MODE=false
```

### 4. Seed MongoDB Atlas Database
To populate the 10 collections and indexes on MongoDB Atlas:
```bash
npm run seed
```

### 5. Running Locally
Start both the Express API backend and Vite client concurrently:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.
API server will run on [http://localhost:5000](http://localhost:5000).

### 6. Running the Test Suite
```bash
npm test
```

### 7. Production Build
```bash
npm run build
```

---

## 🗄️ Database Architecture (MongoDB Atlas)

FloraLens connects to a live MongoDB Atlas cluster running database `floralens` with the following active collections:
- `categories`: Flower & event decoration categories with slug and image.
- `vendors`: Florist, Decorator, and Hybrid vendor profiles with city, rating, and commission metrics.
- `products`: Fresh flower catalog with multi-tier variants, stock quantities, and delivery estimates.
- `services`: Event decoration packages (Silver, Gold, Diamond), add-on accessories, setup durations, and available time slots.
- `orders`: Flower delivery orders with item snapshots, addresses, and delivery status progression.
- `bookings`: Event decoration bookings with strict vendor double-booking prevention and time slot collision checks.
- `reviews`: Customer ratings and feedback linked to products and services.
- `coupons`: Promotional discount codes (`BLOOM10`, `FESTIVE20`).
- `addresses`: Customer delivery addresses with Indian pincodes, landmarks, and recipient details.
- `users`: Multi-role user accounts (`customer`, `vendor`, `admin`).

---

## 🎭 Demo Accounts & Quick Role Switcher

For instant demonstrations, FloraLens includes a persistent one-click role switcher in the top navigation bar:

| Role | Demo Email | Capabilities |
|---|---|---|
| **Customer** | `customer@floralens.in` | Browse catalog, add to cart, book decorators, track orders |
| **Vendor (Florist & Decorator)** | `vendor@petalspress.in` | Fulfill orders, accept/reject bookings, manage stock & services |
| **Platform Administrator** | `admin@floralens.in` | Approve vendors, moderate listings, audit platform transactions |

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
