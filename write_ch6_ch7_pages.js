import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as DIAGRAMS from './report_diagrams.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PAGES_DIR = path.join(__dirname, 'report_pages');

// Page 25: Chapter 6: Methodology (Page 17)
fs.writeFileSync(path.join(PAGES_DIR, 'page_25.html'), `
<div class="page" id="page-25">
  <h2 class="chapter-title">6. METHODOLOGY</h2>
  <h3 class="section-title">6.1 Development Approach and Lifecycle Model</h3>
  <p>
    The development of FloraLens followed an iterative Agile development methodology characterized by two-week sprint cycles. Each sprint incorporated requirements capture, component wireframing, API endpoint implementation, database schema refinement, and automated regression testing. This component-driven approach allowed rapid verification of critical user journeys—such as bouquet variant selection and calendar slot collision checks—prior to platform integration.
  </p>

  <h3 class="section-title">6.2 Requirement Analysis and Feature Scoping</h3>
  <p>
    During the requirement engineering phase, functional and non-functional specifications were derived from local florist interviews and customer retail surveys across Maharashtra. High-priority requirements included:
  </p>
  <p>
    • Unified checkout accommodating physical bouquets and scheduled decoration services.
  </p>
  <p>
    • Deterministic schedule validation preventing conflicting reservations on identical dates.
  </p>
  <p>
    • Zero-friction demonstration modes allowing examiners to inspect all three roles without multi-device authentication barriers.
  </p>

  <h3 class="section-title">6.3 Frontend Implementation</h3>
  <p>
    The client interface is constructed using <b>React 19</b> with <b>TypeScript</b> to guarantee compile-time type safety across complex catalog models. Styling is orchestrated via <b>Tailwind CSS</b> utilizing an organic botanical color system (emerald green, soft slate, and warm amber accents). Navigation is handled by <b>React Router DOM v7</b>, which incorporates a custom <code>&lt;ProtectedRoute&gt;</code> component to intercept unauthorized role access and enforce role separation.
  </p>
  <p>
    Global client state is partitioned into two specialized React Context providers:
  </p>
  <p>
    • <code>AuthContext</code>: Manages user authentication state, session caching in <code>localStorage</code>, and instant role switching between Customer, Vendor, and Admin personas.
  </p>
  <p>
    • <code>StoreContext</code>: Governs catalog state, dynamic cart calculations, coupon discount deduction, saved addresses, order creation, and decoration booking reservations.
  </p>
  <div class="page-footer">17</div>
</div>
`, 'utf8');

// Page 26: Chapter 6 contd. (Page 18)
fs.writeFileSync(path.join(PAGES_DIR, 'page_26.html'), `
<div class="page" id="page-26">
  <h3 class="section-title">6.4 Backend Implementation</h3>
  <p>
    The backend is implemented in <b>Node.js</b> utilizing the <b>Express 5</b> web framework. The server exposes 24 structured REST API endpoints mounted under the /api namespace. Key middleware components include:
  </p>
  <p>
    • <code>cors()</code>: Configured to support Cross-Origin Resource Sharing across local development ports (5173, 5000, 8080).
  </p>
  <p>
    • <code>express.json()</code>: Parses incoming JSON request payloads with rigorous body size limits.
  </p>
  <p>
    • Connection Caching Middleware: Maintains active TCP connection pools to MongoDB Atlas across asynchronous request cycles, preventing socket exhaustion.
  </p>

  <h3 class="section-title">6.5 Database Implementation</h3>
  <p>
    Data persistence is delivered via a hosted <b>MongoDB Atlas</b> replica set cluster. Ten discrete collections are maintained: users, vendors, categories, products, services, orders, bookings, reviews, coupons, and addresses. Unlike relational schemas requiring heavy joins, MongoDB's flexible BSON document structure allows embedding item snapshots inside orders and package details inside service records, ensuring historical immutability if catalog prices change later.
  </p>

  <h3 class="section-title">6.6 API Integration and Service Layer</h3>
  <p>
    Client-to-server communication is managed through dual-mode service modules (<code>src/lib/api.ts</code> and <code>src/lib/mongodb.ts</code>). When an active network connection to MongoDB Atlas is detected, the frontend performs live HTTP REST operations. If network degradation occurs or offline sandbox mode is toggled, the application seamlessly falls back to local in-memory mock datasets (<code>src/lib/mockData.ts</code>), ensuring complete operational continuity and zero UI blocking during academic presentations.
  </p>
  <div class="page-footer">18</div>
</div>
`, 'utf8');

// Page 27: Chapter 6 contd. (Page 19)
fs.writeFileSync(path.join(PAGES_DIR, 'page_27.html'), `
<div class="page" id="page-27">
  <h3 class="section-title">6.7 Authentication and Role-Based Authorization</h3>
  <p>
    FloraLens implements a multi-tier authentication engine supporting email/password registration, Google OAuth simulation, and persistent session storage. The system enforces strict access policies:
  </p>
  <p>
    • <b>Public Routes:</b> Homepage, Catalog, Product Details, Vendor Showcase, About, FAQ, Privacy, Terms.
  </p>
  <p>
    • <b>Customer Routes (/customer/*):</b> Restricted to registered shoppers; permits address management, wishlist operations, and personal order tracking.
  </p>
  <p>
    • <b>Vendor Routes (/vendor/*):</b> Restricted to accounts with vendor role; permits order stage progression, inventory updates, and booking acceptance.
  </p>
  <p>
    • <b>Admin Routes (/admin/*):</b> Restricted to admin accounts; permits vendor KYC verification and transaction audit.
  </p>

  <h3 class="section-title">6.8 Product Catalog and Multi-Tier Variant Pricing Logic</h3>
  <p>
    To model realistic florist operations, each flower product defines a base price and an array of variants. For example, a "Crimson Rose Bouquet" provides:
  </p>
  <p>
    • <i>Standard Tier:</i> 12 Stems (Base Price, e.g., ₹799)
  </p>
  <p>
    • <i>Deluxe Tier:</i> 24 Stems (Base Price × 1.40, e.g., ₹1,119)
  </p>
  <p>
    • <i>Premium Tier:</i> 36 Stems (Base Price × 1.88, e.g., ₹1,499)
  </p>

  <h3 class="section-title">6.9 Event Decoration Booking Logic and Double-Booking Prevention</h3>
  <p>
    The double-booking prevention engine constitutes a primary technical innovation of FloraLens. When a customer submits a booking request for a decorator on a specific eventDate and timeSlot, the Express route executes a deterministic query against MongoDB Atlas:
  </p>
  <div class="code-block">const existingConflict = await db.collection('bookings').findOne({
  vendorId: req.body.vendorId,
  eventDate: req.body.eventDate,
  timeSlot: req.body.timeSlot,
  status: { $in: ['confirmed', 'accepted_by_vendor', 'preparing'] }
});
if (existingConflict) {
  return res.status(409).json({ success: false, error: 'Double-Booking Conflict: Slot already reserved.' });
}</div>
  <p>
    If an existing active booking matches the tuple (vendorId, eventDate, timeSlot), the API returns HTTP 409 Conflict, safeguarding the decorator's schedule integrity.
  </p>
  <div class="page-footer">19</div>
</div>
`, 'utf8');

// Page 28: Chapter 6 contd. (Page 20)
fs.writeFileSync(path.join(PAGES_DIR, 'page_28.html'), `
<div class="page" id="page-28">
  <h3 class="section-title">6.10 Cart Calculation and Coupon Discount Logic</h3>
  <p>
    The shopping cart recalculates totals deterministically upon every mutation. All calculations are executed in Indian Rupees (INR) with standard rounding:
  </p>

  <p class="table-caption">Table 4: Mathematical formulas, pricing logic, and unit metrics</p>
  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Quantity / Metric</th>
        <th style="width: 45%;">Mathematical Formula</th>
        <th style="width: 30%;">Notes &amp; Constraints</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><b>Item Line Total</b></td>
        <td><code>L_i = P_unit × Qty</code></td>
        <td>Calculated per SKU variant.</td>
      </tr>
      <tr>
        <td><b>Cart Subtotal</b></td>
        <td><code>Subtotal = ∑ L_i</code></td>
        <td>Sum of all items in cart.</td>
      </tr>
      <tr>
        <td><b>Percentage Discount</b></td>
        <td><code>Disc = min(Subtotal × (R / 100), MaxDisc)</code></td>
        <td>Applied if <code>Subtotal ≥ MinOrder</code>.</td>
      </tr>
      <tr>
        <td><b>Flat Discount</b></td>
        <td><code>Disc = FlatAmount</code></td>
        <td>E.g., FESTIVE20 flat reduction.</td>
      </tr>
      <tr>
        <td><b>Net Order Total</b></td>
        <td><code>Total = max(0, Subtotal − Disc + Fee_del + Fee_plat)</code></td>
        <td>Standard platform &amp; delivery fee added.</td>
      </tr>
      <tr>
        <td><b>Booking Total</b></td>
        <td><code>Total_bkg = P_pkg + ∑ P_addons + Fee_plat − Disc</code></td>
        <td>Includes selected event add-ons.</td>
      </tr>
    </tbody>
  </table>

  <h3 class="section-title">6.11 Payment Integration</h3>
  <p>
    FloraLens integrates a simulated <b>Razorpay Sandbox</b> modal supporting Indian payment methods: UPI QR code scanning, Virtual Private Address (VPA), Netbanking across major Indian public/private banks, and Credit/Debit cards. Each successful transaction generates a unique alphanumeric reference (e.g., PAY-SIM-173155829104) correlated with the order or booking document.
  </p>

  <h3 class="section-title">6.12 Data Handling, Sanitization, and Error Recovery</h3>
  <p>
    All user inputs undergo client-side validation via HTML5 form constraints and React state guards, complemented by server-side sanity checks. Empty postal fields, invalid email formats, and negative stem quantities are rejected with explicit, friendly error messages.
  </p>

  <h3 class="section-title">6.13 Testing Methodology</h3>
  <p>
    Testing was executed systematically using <b>Vitest</b> and <b>React Testing Library</b>. The test suite verifies store actions (cart increment, coupon application, address addition) and UI component rendering under simulated customer interactions.
  </p>
  <div class="page-footer">20</div>
</div>
`, 'utf8');

// Page 29: Chapter 7: Field Work and Data Collection (Page 21)
fs.writeFileSync(path.join(PAGES_DIR, 'page_29.html'), `
<div class="page" id="page-29">
  <h2 class="chapter-title">7. FIELD WORK AND DATA COLLECTION</h2>
  <h3 class="section-title">7.1 Nature of the Field Project Work</h3>
  <p>
    In accordance with the B.Tech Computer Science and Engineering field project guidelines, our field investigation focused on the practical observation, workflow analysis, and data modeling of independent floral retailers and event decoration agencies in the Kolhapur metropolitan area and neighboring commercial corridors (Shahupuri, Laxmipuri flower market, and Rajarampuri).
  </p>
  <p>
    The field study was structured around three core investigative activities:
  </p>
  <p>
    1. <b>Retail Florist Operational Workflow Observation:</b> Examining daily stem procurement cycles from wholesale mandis, water-retention practices, bouquet assembly durations, and retail wastage rates.
  </p>
  <p>
    2. <b>Event Decorator Scheduling Audit:</b> Interviewing independent decorators regarding calendar management, booking lead times (typically 3 to 14 days), advance payment policies, and recurring schedule conflicts during peak wedding seasons.
  </p>
  <p>
    3. <b>Consumer Purchase Habit Survey:</b> Documenting consumer grievances concerning lack of price transparency, inconsistent stem quality, and difficulty in finding trustworthy decorators for domestic functions.
  </p>

  <h3 class="section-title">7.2 Requirement Gathering and Stakeholder Needs</h3>
  <p>
    The field study revealed specific stakeholder requirements that guided system design:
  </p>
  <p>
    • <b>Florist Needs:</b> Need for rapid inventory updates, protection against uncommitted orders, and localized delivery radius controls to prevent stem wilting during transit.
  </p>
  <p>
    • <b>Decorator Needs:</b> Critical requirement to prevent double-bookings, itemized package agreements (specifying backdrop dimensions, floral densities, and lighting addons), and structured milestone tracking.
  </p>
  <p>
    • <b>Customer Needs:</b> Upfront, all-inclusive pricing in INR, clear photographs of realistic past work rather than generic stock imagery, and transparent delivery slot guarantees.
  </p>
  <div class="page-footer">21</div>
</div>
`, 'utf8');

// Page 30: Chapter 7 contd. (Page 22)
fs.writeFileSync(path.join(PAGES_DIR, 'page_30.html'), `
<div class="page" id="page-30">
  <h3 class="section-title">7.3 Data Sources and Catalog Modeling</h3>
  <p>
    Field data gathered from local vendors was synthesized into standardized BSON catalog schemas for MongoDB Atlas:
  </p>

  <p class="table-caption">Table 5: MongoDB database collections and schema attributes</p>
  <table>
    <thead>
      <tr>
        <th style="width: 20%;">Collection</th>
        <th style="width: 35%;">Key Document Attributes</th>
        <th style="width: 45%;">Field Validation &amp; Constraint Rules</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>users</code></td>
        <td>id, email, fullName, role, phone, city, createdAt</td>
        <td>Unique email index; role must be 'customer', 'vendor', or 'admin'.</td>
      </tr>
      <tr>
        <td><code>vendors</code></td>
        <td>id, businessName, slug, vendorType, city, rating, status</td>
        <td>Status: 'pending', 'approved', 'rejected'; rating bounded [1.0, 5.0].</td>
      </tr>
      <tr>
        <td><code>categories</code></td>
        <td>id, name, slug, type ('flower' | 'decoration'), imageUrl</td>
        <td>Slug indexed for URL lookup; partitioned by product vs service.</td>
      </tr>
      <tr>
        <td><code>products</code></td>
        <td>id, vendorId, name, basePrice, stockQuantity, variants[]</td>
        <td>stockQuantity ≥ 0; variants array with name, price, stockQuantity.</td>
      </tr>
      <tr>
        <td><code>services</code></td>
        <td>id, vendorId, eventType, basePrice, packages[], availableSlots[]</td>
        <td>packages: Silver, Gold, Diamond; slots formatted "HH:MM - HH:MM".</td>
      </tr>
      <tr>
        <td><code>orders</code></td>
        <td>orderNumber, customerName, vendorId, items[], totalAmount, status</td>
        <td>Atomic order number generation; status transitions validated.</td>
      </tr>
      <tr>
        <td><code>bookings</code></td>
        <td>bookingReference, vendorId, eventDate, timeSlot, totalAmount, status</td>
        <td>Compound index on (vendorId, eventDate, timeSlot) for collision checks.</td>
      </tr>
      <tr>
        <td><code>coupons</code></td>
        <td>code, discountPercent, minOrderAmount, maxDiscount, isActive</td>
        <td>Case-insensitive uppercase code index; minOrderAmount check.</td>
      </tr>
      <tr>
        <td><code>addresses</code></td>
        <td>userId, recipientName, pincode, city, state, isDefault</td>
        <td>6-digit Indian postal code format; mandatory street and landmark.</td>
      </tr>
      <tr>
        <td><code>reviews</code></td>
        <td>userId, vendorId, itemType, rating, comment, isVerified</td>
        <td>Rating integer bounded 1–5; linked to verified purchase.</td>
      </tr>
    </tbody>
  </table>

  <h3 class="section-title">7.4 Information Gathered and Field Observations</h3>
  <p>
    Wholesale procurement occurs primarily between 4:00 AM and 7:00 AM. Stems are bundled in standard 20-stem growers' wraps. For high-end flowers like Dutch Roses and Anthuriums, retail markup ranges from 40% to 65% to absorb expected spoilage. In event decoration, labor costs represent approximately 45% of total package pricing. These real-world pricing dynamics directly informed the default values seeded into FloraLens.
  </p>
  <div class="page-footer">22</div>
</div>
`, 'utf8');

// Page 31: Chapter 7 contd. (Page 23)
fs.writeFileSync(path.join(PAGES_DIR, 'page_31.html'), `
<div class="page" id="page-31">
  <h3 class="section-title">7.5 Application Interfaces and Implementation Evidence</h3>
  <p>
    The operational implementation of FloraLens is evidenced by the production interface layouts captured from the running local application:
  </p>
  
  <div class="figure-container">
    ${DIAGRAMS.DIAGRAM_FIG12}
    <div class="figure-caption">Figure 12: Application Interface – Catalog Discovery and Multi-Tier Variant Selector</div>
  </div>

  <div class="figure-container">
    ${DIAGRAMS.DIAGRAM_FIG13}
    <div class="figure-caption">Figure 13: Application Interface – Event Decoration Package Selection &amp; Slot Scheduling</div>
  </div>
  <div class="page-footer">23</div>
</div>
`, 'utf8');

// Page 32: Chapter 7 contd. (Page 24)
fs.writeFileSync(path.join(PAGES_DIR, 'page_32.html'), `
<div class="page" id="page-32">
  <div class="figure-container">
    ${DIAGRAMS.DIAGRAM_FIG14}
    <div class="figure-caption">Figure 14: Application Interface – Cart, Indian Address Form, and Razorpay Sandbox</div>
  </div>

  <div class="figure-container">
    ${DIAGRAMS.DIAGRAM_FIG15}
    <div class="figure-caption">Figure 15: Application Interface – Vendor Management Dashboard &amp; Fulfillment Flow</div>
  </div>

  <div class="figure-container">
    ${DIAGRAMS.DIAGRAM_FIG16}
    <div class="figure-caption">Figure 16: Application Interface – Administrator KYC Verification &amp; Platform Moderation</div>
  </div>
  <div class="page-footer">24</div>
</div>
`, 'utf8');

console.log('Chapter 6 and 7 pages (25 to 32) written successfully!');
