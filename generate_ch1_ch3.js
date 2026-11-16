// generate_ch1_ch3.js
// Chapters 1, 2, and 3 for FloraLens Field Project Report (Pages 1 to 7)

export function getCh1ToCh3Pages() {
  return [
    // Page 9: Chapter 1: Introduction (Page 1)
    `
    <div class="page" id="page-9">
      <h2 class="chapter-title">1. INTRODUCTION</h2>
      <h3 class="section-title">1.1 Project Introduction</h3>
      <p>
        The commercial distribution of fresh flowers and the orchestration of event decoration services constitute two of the most culturally vital yet technologically fragmented retail sectors in India. Floral arrangements represent essential elements across religious ceremonies, social gatherings, corporate conferences, weddings, anniversaries, and personal milestones. Concurrently, professional venue decoration—encompassing floral mandaps, balloon installations, LED arches, and theme stages—has experienced substantial demand across metropolitan centers and rapidly urbanizing tier-2 districts.
      </p>
      <p>
        Despite this sustained consumer demand, the market remains largely disorganized. Local retail florists struggle with steep inventory perishability, volatile farm-gate price fluctuations, and restricted neighborhood reach. Event decorators continue to operate through informal word-of-mouth channels, manual diary-based scheduling, and opaque pricing structures that frequently lead to schedule collisions, disputed advance deposits, and inconsistent execution quality.
      </p>
      
      <h3 class="section-title">1.2 Background of the Project</h3>
      <p>
        Traditional e-commerce platforms and quick-commerce delivery networks have successfully standardized packaged consumer goods, groceries, and electronics. However, the floral and event decoration industry poses distinct domain-specific challenges that conventional retail engines fail to accommodate:
      </p>
      <p>
        1. <b>Extreme Perishability:</b> Fresh cut flowers possess a viable retail shelf life of only 24 to 48 hours under non-cold-chain tropical ambient conditions, requiring immediate local fulfillment rather than centralized warehousing.
      </p>
      <p>
        2. <b>Temporal Scheduling Conflicts:</b> Venue decoration is fundamentally service-bound, requiring specialized crews, setup durations spanning 4 to 8 hours, and strict venue access windows. Standard shopping carts that treat services like physical SKUs cannot enforce vendor slot exclusivity.
      </p>

      <h3 class="section-title">1.3 Overview of FloraLens Marketplace</h3>
      <p>
        <b>FloraLens</b> is engineered as a full-stack, responsive, and database-connected dual marketplace designed specifically for the Indian socio-economic ecosystem. Built on React 19, TypeScript, Express 5, and MongoDB Atlas, the platform connects retail customers directly with verified local florists and professional decorators.
      </p>
      <div class="page-footer">1</div>
    </div>
    `,

    // Page 10: Chapter 1 (contd.) (Page 2)
    `
    <div class="page" id="page-10">
      <h3 class="section-title">1.4 Need for the Project</h3>
      <p>
        The development of FloraLens is motivated by the clear requirement for a unified digital platform capable of handling both tangible product sales and intangible calendar-scheduled service appointments. In tier-2 cities like Kolhapur, Sangli, and Pune, customers planning private celebrations currently navigate multiple fragmented vendors: visiting a physical wholesale market for loose stems, contacting an independent decorator via phone calls, negotiating rates without written contracts, and coordinating manual payments.
      </p>
      <p>
        For vendors, the absence of accessible digital management tools forces reliance on physical paper ledgers. This operational friction results in accidental double-bookings on auspicious wedding dates (muhurats), lost customer communications, and severe financial losses when customized floral inventory goes unsold. FloraLens fulfills this structural need through automated inventory decrement, transparent package itemization, and deterministic slot conflict detection.
      </p>

      <h3 class="section-title">1.5 Scope of the Project</h3>
      <p>
        The architectural scope of FloraLens is defined by the following functional boundaries:
      </p>
      <p>
        • <b>Multi-Tier Flower Retail Catalog:</b> Dynamic product listings categorized by floral variety (Roses, Lilies, Orchids, Carnations) featuring multi-tiered stem variants (Standard, Deluxe, Premium).
      </p>
      <p>
        • <b>Event Decoration Booking Engine:</b> Category-based service discovery (Weddings, Birthdays, Anniversaries, Baby Showers) with package tiers (Silver, Gold, Diamond), customizable add-on accessories, and date/time-slot selection.
      </p>
      <p>
        • <b>Double-Booking Prevention Engine:</b> Rigorous server-side collision validation ensuring no vendor can be booked twice for overlapping time intervals on the same calendar date.
      </p>
      <p>
        • <b>India-Centric Commerce &amp; Localization:</b> Real-time Indian Rupee (INR) financial math, structured Indian postal address management (pincode, city, state, landmark), and Razorpay sandbox simulation.
      </p>
      <p>
        • <b>Role-Based Portals:</b> Independent dashboard environments for Customers, Vendors, and Platform Administrators, protected by role-based routing guards.
      </p>

      <h3 class="section-title">1.6 Target User Personas</h3>
      <p>
        1. <b>Retail Customers:</b> Individuals purchasing bouquets for gifting or booking decorated venues for intimate family events with upfront pricing and verified delivery timelines.
      </p>
      <p>
        2. <b>Independent Florists &amp; Decorators:</b> Small business owners seeking digital showcase capabilities, streamlined order fulfillment progression, and schedule management.
      </p>
      <p>
        3. <b>Platform Administrators:</b> Governance operators auditing transactions, reviewing vendor KYC documentation, and moderating marketplace product catalogs.
      </p>
      <div class="page-footer">2</div>
    </div>
    `,

    // Page 11: Chapter 2: Literature Review / Existing System (Page 3)
    `
    <div class="page" id="page-11">
      <h2 class="chapter-title">2. LITERATURE REVIEW / EXISTING SYSTEM</h2>
      <h3 class="section-title">2.1 Background Study</h3>
      <p>
        E-commerce architectures have evolved from monolithic server-rendered storefronts to distributed, API-first client-side web applications. Research in electronic marketplaces (Bakos, 1997; Turban et al., 2018) demonstrates that digital intermediaries reduce consumer search costs, increase market transparency, and resolve information asymmetry between buyers and localized sellers.
      </p>
      <p>
        In perishable goods commerce, modern inventory theory highlights the critical importance of atomic stock decrement and localized dispatch windows to prevent stockouts and spoilage (Chopra &amp; Meindl, 2016). When applied to service reservations, temporal scheduling models (Brucker, 2007) establish that discrete interval allocation algorithms are essential to avoid resource contention across shared human labor and material inventory.
      </p>

      <h3 class="section-title">2.2 Traditional Flower Purchasing and In-Person Booking</h3>
      <p>
        In traditional Indian floral markets, transactions occur predominantly in open-air physical mandis or neighborhood roadside kiosks. The conventional customer workflow involves:
      </p>
      <p>
        1. <b>Physical Store Discovery:</b> The customer must physically travel to local market clusters to inspect stem quality, stem count, and floral variety.
      </p>
      <p>
        2. <b>Subjective Price Bargaining:</b> Stems are sold without printed or standardized price tags. Prices fluctuate unpredictably based on festivals, weather conditions, and perceived customer affluence.
      </p>
      <p>
        3. <b>Unstructured Cash Payments:</b> Transactions occur via cash or non-invoiced peer-to-peer UPI transfers, leaving the customer without formal invoices, return mechanisms, or freshness guarantees.
      </p>
      <p>
        4. <b>Unverified Lead Times:</b> For customized bouquets or bridal garlands, customers must place advance requests verbally, with frequent occurrences of delayed handovers or substitute flowers due to stockouts.
      </p>
      <div class="page-footer">3</div>
    </div>
    `,

    // Page 12: Chapter 2 (contd.) (Page 4)
    `
    <div class="page" id="page-12">
      <h3 class="section-title">2.3 Existing Online E-Commerce Aggregators</h3>
      <p>
        Several commercial platforms cater to portions of the gifting and event planning landscape:
      </p>
      <p>
        • <b>National Gifting Portals (e.g., Ferns N Petals, Floweraura):</b> These platforms excel at cross-city floral delivery and standardized gift combos. However, they operate primarily via centralized franchise hubs rather than empowering local neighborhood florists. Their catalogs feature rigid pre-packaged combos with limited transparency regarding individual florist provenance. Crucially, they do not offer comprehensive on-site event venue decoration with crew scheduling.
      </p>
      <p>
        • <b>Home Service Platforms (e.g., Urban Company):</b> While offering on-demand home cleaning, salon services, and basic festive balloon decoration, these platforms employ closed gig-worker models rather than open vendor marketplaces. Customers cannot select a specific trusted local florist or inspect custom wedding mandap portfolios.
      </p>
      <p>
        • <b>Event Directory Aggregators (e.g., WedMeGood, WeddingWire):</b> These services serve primarily as digital classified directories. They list decorator phone numbers and portfolio photographs but lack real-time transactional checkout, live calendar slot validation, and transparent pricing.
      </p>

      <h3 class="section-title">2.4 Limitations of Existing Systems</h3>
      <p>
        A comprehensive review of the current market highlights four primary architectural and functional limitations:
      </p>
      <p>
        1. <b>Siloed Architecture:</b> No mainstream platform unifies both perishable flower delivery and high-value venue decoration under one cohesive transactional basket.
      </p>
      <p>
        2. <b>Schedule Double-Booking Vulnerabilities:</b> Existing directory systems allow customers to request bookings on dates when the decorator is already committed, resulting in last-minute vendor rejections or unqualified subcontractor outsourcing.
      </p>
      <p>
        3. <b>Lack of Granular Vendor Controls:</b> Local florists lack lightweight self-service portals to update real-time stem inventories, adjust prices for festive peaks, or configure specific delivery radius zones.
      </p>
      <p>
        4. <b>Inflexible Package Customization:</b> Conventional carts do not allow customers to combine fixed base packages (e.g., Gold Mandap) with arbitrary add-on accessories (e.g., dry ice fog entry, fairylight backdrops).
      </p>
      <div class="page-footer">4</div>
    </div>
    `,

    // Page 13: Chapter 2 (contd.) (Page 5)
    `
    <div class="page" id="page-13">
      <h3 class="section-title">2.5 Identified Research and Implementation Gaps</h3>
      <p>
        From the literature review and comparative analysis, six critical operational gaps were identified. Each gap is addressed by an explicit architectural design decision in FloraLens:
      </p>
      
      <p class="table-caption">Table 1: Gaps identified in existing work and FloraLens responses</p>
      <table>
        <thead>
          <tr>
            <th style="width: 10%;">Gap</th>
            <th style="width: 45%;">Identified Gap in Existing Platforms</th>
            <th style="width: 45%;">Architectural Response in FloraLens</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>G1</b></td>
            <td>Separation of flower delivery and event venue decoration into disparate, incompatible platforms.</td>
            <td>Unified dual-catalog architecture supporting both physical inventory orders and calendar-scheduled service bookings.</td>
          </tr>
          <tr>
            <td><b>G2</b></td>
            <td>Unchecked calendar bookings leading to decorator schedule collisions on peak event dates.</td>
            <td>Deterministic double-booking prevention engine validating vendor slot availability across MongoDB Atlas bookings.</td>
          </tr>
          <tr>
            <td><b>G3</b></td>
            <td>Single-tier product models that fail to capture bouquet stem volume options.</td>
            <td>Dynamic variant data model supporting Standard, Deluxe, and Premium tiers with automatic price recalculation.</td>
          </tr>
          <tr>
            <td><b>G4</b></td>
            <td>Lack of self-service fulfillment tools for small independent vendors.</td>
            <td>Tailored Vendor Portal featuring multi-stage order tracking (Pending ➔ Confirmed ➔ Preparing ➔ Dispatched ➔ Delivered).</td>
          </tr>
          <tr>
            <td><b>G5</b></td>
            <td>Opaque marketplace governance without listing moderation or vendor credentials audit.</td>
            <td>Dedicated Platform Administrator Portal with KYC review, business registration audit, and catalog moderation.</td>
          </tr>
          <tr>
            <td><b>G6</b></td>
            <td>Poor localization for Indian domestic e-commerce specifications.</td>
            <td>Native INR (₹) formatting, Indian address schema (pincode, landmark), and Razorpay sandbox simulation.</td>
          </tr>
        </tbody>
      </table>

      <h3 class="section-title">2.6 How FloraLens Addresses These Gaps</h3>
      <p>
        FloraLens systematically eliminates these deficiencies by delivering an integrated, three-tier cloud-backed web platform. By coupling client-side React 19 state synchronization with server-side collision validation in Express 5 and persistent document collections in MongoDB Atlas, FloraLens provides a transparent, deterministic, and dependable commercial marketplace.
      </p>
      <div class="page-footer">5</div>
    </div>
    `,

    // Page 14: Chapter 3: Motivation, Problem Statement and Objectives (Page 6)
    `
    <div class="page" id="page-14">
      <h2 class="chapter-title">3. MOTIVATION, PROBLEM STATEMENT AND OBJECTIVES</h2>
      <h3 class="section-title">3.1 Motivation</h3>
      <p>
        The primary motivation behind FloraLens arises from the intersection of computer science engineering principles with local retail commerce challenges. As undergraduate students in Computer Science and Engineering, our goal was to design and deploy an industrial-grade, full-stack software system that addresses tangible, real-world logistical problems faced by our local business community in Kolhapur and Maharashtra.
      </p>
      <p>
        From a software engineering perspective, designing a marketplace that reconciles perishable inventory transactions with temporal service reservations presents compelling architectural challenges: managing atomic state updates across distributed components, enforcing relational integrity within a flexible document database, preventing race conditions during checkout, and providing responsive user interfaces. FloraLens provided an exceptional vehicle to synthesize these modern paradigms into a functioning software artifact.
      </p>

      <h3 class="section-title">3.2 Problem Statement</h3>
      <p>
        The Indian floral and event decoration market suffers from extreme decentralization, subjective and volatile pricing, high inventory wastage, and uncoordinated booking management. Retail customers lack a reliable mechanism to compare local floral arrangements, select customized bouquet volumes, and verify event decorator availability without time-consuming in-person visits. Concurrently, local florists and decorators are unable to market their services digitally, protect against schedule double-bookings, or systematically track fulfillment stages.
      </p>
      <p>
        Therefore, the technical problem addressed by this project is:
      </p>
      <p style="padding-left: 20px; font-style: italic; border-left: 3px solid #0284c7; margin: 15px 0;">
        "To architect, implement, and rigorously benchmark a full-stack, responsive, multi-role web marketplace that unifies fresh flower inventory retail with conflict-free event decoration booking, providing real-time stock protection, deterministic time-slot scheduling, India-localized payments, and administrative oversight."
      </p>

      <h3 class="section-title">3.3 Main Aim</h3>
      <p>
        The principal aim of this field project is to develop and deploy **FloraLens**, a production-ready, locally testable, and cloud-backed web application connecting customers, florists, and event decorators through an intuitive, transactional, and secure digital platform.
      </p>
      <div class="page-footer">6</div>
    </div>
    `,

    // Page 15: Chapter 3 (contd.) (Page 7)
    `
    <div class="page" id="page-15">
      <h3 class="section-title">3.4 Specific Objectives</h3>
      <p>
        To fulfill the primary aim, the project is structured around ten concrete, measurable technical objectives:
      </p>
      <p>
        1. <b>Architect a Responsive Client Application:</b> Construct an atomic, component-driven user interface using React 19, TypeScript, Vite, and Tailwind CSS optimized for desktop and mobile viewports.
      </p>
      <p>
        2. <b>Develop a Scalable REST API:</b> Implement an Express 5 backend server handling structured HTTP endpoints with JSON serialization, CORS management, and centralized error handling.
      </p>
      <p>
        3. <b>Deploy Cloud Database Persistence:</b> Establish an active MongoDB Atlas replica set cluster with ten document collections enforcing schema constraints and optimized indexes.
      </p>
      <p>
        4. <b>Engineer Dynamic Product Variant Modeling:</b> Implement a multi-tiered catalog schema supporting Standard, Deluxe, and Premium bouquet tiers with dynamic price and stem calculations.
      </p>
      <p>
        5. <b>Implement Event Decoration Booking Engine:</b> Build a package customization system allowing customers to select base tiers (Silver/Gold/Diamond), configure add-ons, and schedule dates/time slots.
      </p>
      <p>
        6. <b>Build Double-Booking Conflict Prevention:</b> Construct a server-side collision validation algorithm preventing duplicate confirmed bookings for identical vendor-date-slot tuples.
      </p>
      <p>
        7. <b>Provide India-Specific Commercial Localization:</b> Incorporate Indian Rupee (INR) financial math, structured Indian postal address validation (pincodes, landmarks), and coupon calculation engines.
      </p>
      <p>
        8. <b>Integrate Secure Payment Simulation:</b> Connect a simulated Razorpay sandbox gateway supporting UPI QR, Netbanking, and Card transactions with signature verification.
      </p>
      <p>
        9. <b>Construct Role-Based Management Portals:</b> Deliver tailored, authenticated dashboards for Customers (order tracking), Vendors (fulfillment progression), and Administrators (KYC approvals).
      </p>
      <p>
        10. <b>Validate System Reliability:</b> Perform automated unit, integration, and load testing verifying 100% test pass rates across core transactions and sub-200ms API response latencies.
      </p>

      <h3 class="section-title">3.5 Expected Benefits</h3>
      <p>
        • <b>For Customers:</b> Guaranteed transparent pricing, freshness assurances, convenient home delivery, and elimination of decorator scheduling disputes.
      </p>
      <p>
        • <b>For Vendors:</b> Enhanced digital visibility, automated inventory tracking, reduction of spoilage, and guaranteed calendar protection against accidental double-bookings.
      </p>
      <div class="page-footer">7</div>
    </div>
    `
  ];
}
