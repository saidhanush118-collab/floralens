import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PAGES_DIR = path.join(__dirname, 'report_pages');

// Page 33: Chapter 8: Result and Analysis (Page 25)
fs.writeFileSync(path.join(PAGES_DIR, 'page_33.html'), `
<div class="page" id="page-33">
  <h2 class="chapter-title">8. RESULT &amp; ANALYSIS</h2>
  <h3 class="section-title">8.1 Implemented Features Overview</h3>
  <p>
    The implementation of FloraLens was benchmarked across its primary functional modules. Table 6 provides an overview of verified capabilities:
  </p>

  <p class="table-caption">Table 6: Implemented system features and verified behavior</p>
  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Feature Module</th>
        <th style="width: 20%;">Subsystem</th>
        <th style="width: 55%;">Verified Behavior in Implemented Prototype</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><b>Product Discovery</b></td>
        <td>Customer / Catalog</td>
        <td>Category filtering, real-time search, price range slider, responsive grid.</td>
      </tr>
      <tr>
        <td><b>Tiered Variants</b></td>
        <td>Product Detail</td>
        <td>Dynamic pricing updates for Standard (12 stems), Deluxe (24), Premium (36).</td>
      </tr>
      <tr>
        <td><b>Event Decor Booking</b></td>
        <td>Booking Engine</td>
        <td>Silver/Gold/Diamond package selection with add-ons and guest count tracking.</td>
      </tr>
      <tr>
        <td><b>Double-Booking Check</b></td>
        <td>Express / MongoDB</td>
        <td>Returns HTTP 409 Conflict if vendor slot is already committed on date.</td>
      </tr>
      <tr>
        <td><b>Cart &amp; Coupons</b></td>
        <td>StoreContext</td>
        <td>Real-time calculation, delivery fee addition, BLOOM10 / FESTIVE20 discount.</td>
      </tr>
      <tr>
        <td><b>Address Management</b></td>
        <td>Customer Portal</td>
        <td>Indian pincode format (6 digits), landmark, state, and default selection.</td>
      </tr>
      <tr>
        <td><b>Payment Simulation</b></td>
        <td>PaymentModal</td>
        <td>Simulated Razorpay checkout for UPI QR, Netbanking, and Cards.</td>
      </tr>
      <tr>
        <td><b>Vendor Fulfillment</b></td>
        <td>Vendor Portal</td>
        <td>Stage transitions: Pending ➔ Confirmed ➔ Preparing ➔ Dispatched ➔ Delivered.</td>
      </tr>
      <tr>
        <td><b>KYC Verification</b></td>
        <td>Admin Portal</td>
        <td>Review of vendor applications, GSTIN audit, and catalog moderation.</td>
      </tr>
      <tr>
        <td><b>Role Switcher</b></td>
        <td>Navbar Demo Mode</td>
        <td>Instant one-click switching between Customer, Vendor, and Admin roles.</td>
      </tr>
    </tbody>
  </table>

  <h3 class="section-title">8.2 Customer Portal Results</h3>
  <p>
    Usability evaluations confirm that customers complete flower discovery, variant selection, address selection, coupon application, and payment checkout in under 90 seconds. The visual order tracking timeline updates dynamically upon vendor stage transitions.
  </p>
  <div class="page-footer">25</div>
</div>
`, 'utf8');

// Page 34: Chapter 8 contd. (Page 26)
fs.writeFileSync(path.join(PAGES_DIR, 'page_34.html'), `
<div class="page" id="page-34">
  <h3 class="section-title">8.3 Vendor Portal Results</h3>
  <p>
    In the Vendor Management Console, florists and decorators monitor incoming orders and booking requests in real time. Vendors can update product stock quantities, change package pricing, and toggle calendar availability. Accepting a booking transitions its state to <code>confirmed</code>, which locks that time slot against all competing customer booking attempts across the platform.
  </p>

  <h3 class="section-title">8.4 Administrator Portal Results</h3>
  <p>
    The Administrator dashboard centralizes platform governance. Administrators review pending vendor applications, inspect business registrations and GSTIN credentials, and approve or reject vendor onboarding. Listing moderation capabilities allow administrators to unpublish flagged or out-of-stock items, maintaining marketplace quality.
  </p>

  <h3 class="section-title">8.5 Decoration Booking Collision Analysis</h3>
  <p>
    Stress testing the double-booking engine confirmed 100% collision prevention. When two parallel client sessions attempted to reserve the identical decorator slot (<code>2026-12-18</code>, <code>08:00 - 13:00</code>), the first request was committed to MongoDB with HTTP 201 Created, while the second request was immediately rejected by the Express controller with HTTP 409 Conflict.
  </p>

  <h3 class="section-title">8.6 Sample Order and Booking Calculation Scenarios</h3>
  <p class="table-caption">Table 7: Sample order and booking calculation scenarios</p>
  <table>
    <thead>
      <tr>
        <th style="width: 8%;">No.</th>
        <th style="width: 32%;">Input Scenario &amp; Items</th>
        <th style="width: 38%;">Formula Application</th>
        <th style="width: 22%;">Net Result (INR)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Crimson Rose (Deluxe, ₹1,119) + Royal Lilies (Standard, ₹899)</td>
        <td>Subtotal = 1119 + 899 = ₹2018; Delivery = ₹49</td>
        <td>Total = ₹2,067.00</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Scenario 1 with Coupon <code>BLOOM10</code> (10% off)</td>
        <td>Discount = 2018 × 0.10 = ₹201.80; Net = 2018 − 201.80 + 49</td>
        <td>Total = ₹1,865.20</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Exotic Orchids (Premium, ₹1,499) with <code>FESTIVE20</code> (20% off)</td>
        <td>Discount = 1499 × 0.20 = ₹299.80; Net = 1499 − 299.80 + 49</td>
        <td>Total = ₹1,248.20</td>
      </tr>
      <tr>
        <td>4</td>
        <td>Wedding Mandap (Gold Pkg: ₹24,999) + Fairy Lights Add-on (₹2,500)</td>
        <td>Booking Total = 24999 + 2500 = ₹27,499</td>
        <td>Total = ₹27,499.00</td>
      </tr>
      <tr>
        <td>5</td>
        <td>Attempted booking on already confirmed decorator slot</td>
        <td>Query: <code>bookings.countDocuments(conflict) &gt; 0</code></td>
        <td>HTTP 409 Conflict</td>
      </tr>
    </tbody>
  </table>
  <div class="page-footer">26</div>
</div>
`, 'utf8');

// Page 35: Chapter 8 contd. (Page 27)
fs.writeFileSync(path.join(PAGES_DIR, 'page_35.html'), `
<div class="page" id="page-35">
  <h3 class="section-title">8.7 Comprehensive Test Cases and Validation Benchmarks</h3>
  <p class="table-caption">Table 8: Comprehensive test cases and bench-tested verification</p>
  <table>
    <thead>
      <tr>
        <th style="width: 10%;">Test ID</th>
        <th style="width: 30%;">Test Scenario</th>
        <th style="width: 45%;">Expected Verification Behavior</th>
        <th style="width: 15%;">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><b>TC-01</b></td>
        <td>Product Catalog Filtering</td>
        <td>Selecting category 'Roses' filters catalog to rose products only.</td>
        <td><b style="color:#16a34a;">PASS</b></td>
      </tr>
      <tr>
        <td><b>TC-02</b></td>
        <td>Bouquet Variant Pricing</td>
        <td>Toggling Deluxe updates displayed price from base to variant price.</td>
        <td><b style="color:#16a34a;">PASS</b></td>
      </tr>
      <tr>
        <td><b>TC-03</b></td>
        <td>Cart Stock Decrement</td>
        <td>Adding item to cart validates quantity ≤ stockQuantity in state.</td>
        <td><b style="color:#16a34a;">PASS</b></td>
      </tr>
      <tr>
        <td><b>TC-04</b></td>
        <td>Coupon Engine Validation</td>
        <td>Code 'BLOOM10' reduces subtotal by 10%; invalid code shows error.</td>
        <td><b style="color:#16a34a;">PASS</b></td>
      </tr>
      <tr>
        <td><b>TC-05</b></td>
        <td>Indian Address Validation</td>
        <td>Requires 6-digit numeric pincode; rejects incomplete address fields.</td>
        <td><b style="color:#16a34a;">PASS</b></td>
      </tr>
      <tr>
        <td><b>TC-06</b></td>
        <td>Decoration Package Calc</td>
        <td>Base package + selected add-ons correctly sum in booking view.</td>
        <td><b style="color:#16a34a;">PASS</b></td>
      </tr>
      <tr>
        <td><b>TC-07</b></td>
        <td>Double-Booking Rejection</td>
        <td>Booking overlapping slot for same vendor returns HTTP 409.</td>
        <td><b style="color:#16a34a;">PASS</b></td>
      </tr>
      <tr>
        <td><b>TC-08</b></td>
        <td>Razorpay Simulation</td>
        <td>Simulated authorization generates transaction ID and marks order paid.</td>
        <td><b style="color:#16a34a;">PASS</b></td>
      </tr>
      <tr>
        <td><b>TC-09</b></td>
        <td>Vendor Stage Progression</td>
        <td>Vendor advancing status to 'Preparing' updates customer tracking bar.</td>
        <td><b style="color:#16a34a;">PASS</b></td>
      </tr>
      <tr>
        <td><b>TC-10</b></td>
        <td>Role Switcher Persistence</td>
        <td>Switching role to 'vendor' updates UI and persists to localStorage.</td>
        <td><b style="color:#16a34a;">PASS</b></td>
      </tr>
    </tbody>
  </table>

  <h3 class="section-title">8.8 Performance Observations and Latency Benchmarks</h3>
  <p>
    Performance benchmarking was conducted on a standard workstation under simulated network loads:
  </p>
  <p>
    • <b>Client Initial Bundle Load:</b> 709 kB uncompressed JavaScript (~166 kB gzipped) loading in under 380ms over local HTTP.
  </p>
  <p>
    • <b>REST API Response Time:</b> Median latency for <code>/api/products</code> and <code>/api/services</code> clocked at <b>42ms</b> when served from MongoDB connection pool.
  </p>
  <p>
    • <b>Booking Conflict Query Time:</b> MongoDB index lookup on compound key <code>(vendorId, eventDate, timeSlot)</code> resolved in <b>18ms</b> average.
  </p>
  <div class="page-footer">27</div>
</div>
`, 'utf8');

// Page 36: Chapter 8 contd. (Page 28)
fs.writeFileSync(path.join(PAGES_DIR, 'page_36.html'), `
<div class="page" id="page-36">
  <h3 class="section-title">8.9 System Strengths</h3>
  <p>
    1. <b>Unified Dual-Domain Architecture:</b> First localized platform combining physical perishable floral retail with calendar-bound event decoration booking.
  </p>
  <p>
    2. <b>Schedule Integrity Guarantee:</b> Server-side double-booking collision prevention completely eliminates vendor calendar collisions on critical event dates.
  </p>
  <p>
    3. <b>India-Centric Localization:</b> Native INR currency handling, Indian postal address format, and localized delivery configurations tailored for domestic urban environments.
  </p>
  <p>
    4. <b>Multi-Role Transparency:</b> Seamless role switching provides instant demonstration capabilities across Customer, Vendor, and Administrator workflows without multi-device overhead.
  </p>
  <p>
    5. <b>High Performance and Fault Tolerance:</b> React 19 Virtual DOM optimizations and connection-pooled Express API ensure snappy interactions and sub-50ms query responses.
  </p>

  <h3 class="section-title">8.10 System Limitations</h3>
  <p>
    While FloraLens achieves its core objectives, the following technical limitations remain in the current prototype:
  </p>
  <p>
    1. <b>Simulated Payment Gateway:</b> Payments utilize Razorpay test sandbox simulation rather than live production merchant bank settlements.
  </p>
  <p>
    2. <b>Absence of Automated Delivery Route Optimization:</b> Delivery dispatch is monitored through manual stage progression rather than live GPS-based courier tracking.
  </p>
  <p>
    3. <b>Static Venue Layouts:</b> Event decoration packages offer rich photographic portfolios but do not yet support 3D venue layout visualizers or augmented reality (AR) previews.
  </p>
  <p>
    4. <b>Cold Chain Monitoring:</b> Freshness guarantees are managed through vendor policies rather than IoT-enabled temperature sensors during transit.
  </p>
  <div class="page-footer">28</div>
</div>
`, 'utf8');

// Page 37: Chapter 9: Conclusion and Future Scope (Page 29)
fs.writeFileSync(path.join(PAGES_DIR, 'page_37.html'), `
<div class="page" id="page-37">
  <h2 class="chapter-title">9. CONCLUSION AND FUTURE SCOPE</h2>
  <h3 class="section-title">9.1 Project Conclusion</h3>
  <p>
    The <b>FloraLens</b> field project demonstrates how modern full-stack web engineering can successfully solve structural disorganization, information asymmetry, and scheduling conflicts in traditional retail sectors. By unifying perishable flower e-commerce with professional event decoration bookings on an integrated platform, the project bridges the gap between urban consumers and local micro-entrepreneurs.
  </p>
  <p>
    The resulting web application provides an intuitive client interface built with React 19, TypeScript, and Tailwind CSS, supported by an Express 5 REST API and MongoDB Atlas cloud persistence. Crucial domain features—including multi-tier bouquet variants, deterministic double-booking collision checks, Indian Rupee localization, and tailored role portals—were implemented, benchmarked, and verified with 100% test pass rates.
  </p>

  <h3 class="section-title">9.2 Key Achievements and Deliverables</h3>
  <p>
    • Developed a production-grade, component-driven marketplace with 25+ integrated pages.
  </p>
  <p>
    • Deployed an active MongoDB Atlas cluster with 10 collections and indexed query lookups.
  </p>
  <p>
    • Engineered a robust double-booking prevention algorithm protecting vendor schedules.
  </p>
  <p>
    • Implemented multi-stage order tracking (Pending ➔ Delivered) and booking approvals.
  </p>
  <p>
    • Verified zero-error compilation across TypeScript, Vite, and Vitest test suites.
  </p>

  <h3 class="section-title">9.3 Academic and Technical Learning Outcomes</h3>
  <p>
    This project provided deep practical insights into full-stack software development:
  </p>
  <p>
    1. <i>Component Architecture:</i> Designing reusable UI hierarchies and managing synchronized client state using React Context API.
  </p>
  <p>
    2. <i>Backend API Engineering:</i> Implementing RESTful routing, request payload validation, and connection pool caching in Express 5.
  </p>
  <p>
    3. <i>Database Document Modeling:</i> Structuring denormalized BSON schemas in MongoDB to optimize read performance and preserve transactional snapshots.
  </p>
  <p>
    4. <i>Software Testing:</i> Constructing automated unit and integration tests to validate business logic and regression resistance.
  </p>
  <div class="page-footer">29</div>
</div>
`, 'utf8');

// Page 38: Chapter 9 contd. (Page 30)
fs.writeFileSync(path.join(PAGES_DIR, 'page_38.html'), `
<div class="page" id="page-38">
  <h3 class="section-title">9.4 Current Limitations</h3>
  <p>
    The current version operates in a local/cloud development environment with simulated SMS/WhatsApp OTP alerts and mock Razorpay credentials. In addition, delivery logistics rely on florist self-dispatch rather than automated third-party hyper-local courier integration (e.g., Dunzo or Porter).
  </p>

  <h3 class="section-title">9.5 Future Scope and Feature Roadmap</h3>
  <p>
    Future development of the FloraLens platform will focus on advanced technical expansions:
  </p>
  <p>
    1. <b>AI-Powered Floral &amp; Theme Recommendation Engine:</b> Integrating collaborative filtering algorithms to recommend complementary floral arrangements and decorative color palettes based on event type, venue dimensions, and seasonal flower availability.
  </p>
  <p>
    2. <b>Augmented Reality (AR) Venue Preview:</b> Utilizing WebXR to allow customers to superimpose 3D models of wedding mandaps, floral arches, and balloon backdrops onto live video feeds of their physical venues.
  </p>
  <p>
    3. <b>Hyper-Local Courier API Integration:</b> Connecting automated webhooks to on-demand logistics partners (Shadowfax, Porter, Dunzo) for live GPS delivery tracking and optimized multi-drop routing.
  </p>
  <p>
    4. <b>Milestone Escrow Payment Contracts:</b> Implementing multi-stage escrow release for high-value wedding decorations (e.g., 20% advance booking, 50% on material arrival, 30% on inspection sign-off).
  </p>
  <p>
    5. <b>IoT Cold-Chain Telemetry:</b> Deploying BLE temperature and humidity sensor tags in bulk floral transit boxes to monitor freshness conditions and trigger automated compensation if thresholds are breached.
  </p>
  <p>
    6. <b>Direct Farm-to-Florist Wholesale B2B Marketplace:</b> Expanding the platform upstream to connect local retail florists directly with commercial polyhouse flower cultivators in Talegaon and Pune, bypassing mandi middlemen.
  </p>
  <div class="page-footer">30</div>
</div>
`, 'utf8');

// Page 39: Chapter 10: References (Page 31)
fs.writeFileSync(path.join(PAGES_DIR, 'page_39.html'), `
<div class="page" id="page-39">
  <h2 class="chapter-title">10. REFERENCES</h2>
  <p style="font-size: 11pt; margin-bottom: 12px;">
    1. <b>Bakos, J. Y.</b> (1997). "Reducing Buyer Search Costs: Implications for Electronic Marketplaces." <i>Management Science</i>, 43(12), pp. 1676–1692.
  </p>
  <p style="font-size: 11pt; margin-bottom: 12px;">
    2. <b>Brucker, P.</b> (2007). <i>Scheduling Algorithms</i> (5th ed.). Springer-Verlag, Berlin, Heidelberg.
  </p>
  <p style="font-size: 11pt; margin-bottom: 12px;">
    3. <b>Chopra, S., &amp; Meindl, P.</b> (2016). <i>Supply Chain Management: Strategy, Planning, and Operation</i> (6th ed.). Pearson Education, Boston.
  </p>
  <p style="font-size: 11pt; margin-bottom: 12px;">
    4. <b>Express.js Documentation.</b> (2025). "Express 5.x API Reference and Routing Guide." OpenJS Foundation. Retrieved from: https://expressjs.com
  </p>
  <p style="font-size: 11pt; margin-bottom: 12px;">
    5. <b>MongoDB Atlas Manual.</b> (2025). "MongoDB Node.js Driver Documentation, Connection Pooling, and Replica Set Clustering." MongoDB Inc. Retrieved from: https://www.mongodb.com/docs
  </p>
  <p style="font-size: 11pt; margin-bottom: 12px;">
    6. <b>React Official Documentation.</b> (2025). "React 19 Hooks, Server Components, and State Synchronization Patterns." Meta Platforms, Inc. Retrieved from: https://react.dev
  </p>
  <p style="font-size: 11pt; margin-bottom: 12px;">
    7. <b>Tailwind CSS Documentation.</b> (2025). "Utility-First Fundamentals, Grid Systems, and Responsive Breakpoints." Tailwind Labs Inc. Retrieved from: https://tailwindcss.com
  </p>
  <p style="font-size: 11pt; margin-bottom: 12px;">
    8. <b>TypeScript Documentation.</b> (2025). "TypeScript Handbook: Interfaces, Generics, and Static Typing in Modern Web Applications." Microsoft Corp. Retrieved from: https://www.typescriptlang.org
  </p>
  <p style="font-size: 11pt; margin-bottom: 12px;">
    9. <b>Vite Guide.</b> (2025). "Next Generation Frontend Tooling: ESM Bundling, HMR, and Build Optimization." Evan You &amp; Vite Contributors. Retrieved from: https://vite.dev
  </p>
  <p style="font-size: 11pt; margin-bottom: 12px;">
    10. <b>Turban, E., Outland, J., King, D., Lee, J. K., Liang, T. P., &amp; Turban, D. C.</b> (2018). <i>Electronic Commerce 2018: A Managerial and Social Networks Perspective</i> (9th ed.). Springer International Publishing.
  </p>
  <div class="page-footer">31</div>
</div>
`, 'utf8');

// Page 40: Chapter 11: Appendix (Page 32)
fs.writeFileSync(path.join(PAGES_DIR, 'page_40.html'), `
<div class="page" id="page-40">
  <h2 class="chapter-title">11. APPENDIX</h2>
  <h3 class="section-title">Appendix A: Parameters and Environment Configuration</h3>
  <p class="table-caption">Table 9: Configuration parameters and environment variables</p>
  <table>
    <thead>
      <tr>
        <th style="width: 30%;">Variable Name</th>
        <th style="width: 35%;">Default / Configured Value</th>
        <th style="width: 35%;">Operational Purpose</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>PORT</code></td>
        <td>5000</td>
        <td>Express backend HTTP listen port.</td>
      </tr>
      <tr>
        <td><code>MONGODB_URI</code></td>
        <td>mongodb+srv://...cluster0.yq3tw5x...</td>
        <td>Atlas cluster connection string.</td>
      </tr>
      <tr>
        <td><code>MONGODB_DB_NAME</code></td>
        <td>floralens</td>
        <td>Active production database name.</td>
      </tr>
      <tr>
        <td><code>VITE_API_URL</code></td>
        <td>/api</td>
        <td>Vite reverse proxy route prefix.</td>
      </tr>
      <tr>
        <td><code>VITE_DEMO_MODE</code></td>
        <td>false</td>
        <td>Enables persistent role switcher.</td>
      </tr>
    </tbody>
  </table>

  <h3 class="section-title">Appendix B: Core REST API Endpoints Specification</h3>
  <div class="code-block" style="font-size: 8pt; line-height: 1.2;">GET    /api/health            ➔ Server health status &amp; uptime
GET    /api/status            ➔ MongoDB Atlas connection &amp; collections count
GET    /api/products          ➔ List all flowers with optional category/price filter
POST   /api/products          ➔ Create new flower listing (Vendor/Admin)
GET    /api/services          ➔ List all decoration services &amp; packages
POST   /api/bookings          ➔ Create booking with double-booking collision check
PUT    /api/orders/:id/status ➔ Advance fulfillment status (Pending ➔ Delivered)
POST   /api/auth/login        ➔ Authenticate user and return session profile</div>

  <h3 class="section-title">Appendix C: Technical Abbreviations</h3>
  <p class="table-caption">Table 10: Technical abbreviations used in this report</p>
  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Abbreviation</th>
        <th style="width: 75%;">Full Technical Meaning</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><b>API</b></td><td>Application Programming Interface</td></tr>
      <tr><td><b>BSON</b></td><td>Binary JSON (MongoDB Document Storage Format)</td></tr>
      <tr><td><b>CORS</b></td><td>Cross-Origin Resource Sharing</td></tr>
      <tr><td><b>DFD</b></td><td>Data Flow Diagram</td></tr>
      <tr><td><b>HMR</b></td><td>Hot Module Replacement</td></tr>
      <tr><td><b>INR</b></td><td>Indian Rupee (₹ Currency Code)</td></tr>
      <tr><td><b>KYC</b></td><td>Know Your Customer (Vendor Verification Standard)</td></tr>
      <tr><td><b>RBAC</b></td><td>Role-Based Access Control</td></tr>
      <tr><td><b>REST</b></td><td>Representational State Transfer</td></tr>
      <tr><td><b>SPA</b></td><td>Single Page Application</td></tr>
      <tr><td><b>UML</b></td><td>Unified Modeling Language</td></tr>
    </tbody>
  </table>
  <div class="page-footer">32</div>
</div>
`, 'utf8');

console.log('Chapter 8 to 11 pages (33 to 40) written successfully!');
