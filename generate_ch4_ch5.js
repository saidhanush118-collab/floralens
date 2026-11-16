// generate_ch4_ch5.js
// Chapters 4 and 5 for FloraLens Field Project Report (Pages 8 to 16)
import * as DIAGRAMS from './report_diagrams.js';

export function getCh4ToCh5Pages() {
  return [
    // Page 16: Chapter 4: System Architecture (Page 8)
    `
    <div class="page" id="page-16">
      <h2 class="chapter-title">4. SYSTEM ARCHITECTURE</h2>
      <h3 class="section-title">4.1 Architecture Overview</h3>
      <p>
        FloraLens is constructed upon an enterprise-grade, three-tier decoupled client-server architecture designed for high availability, fault tolerance, and modular extensibility. The system decouples the presentation interface from the business logic and persistence tiers, communicating over standardized HTTPS/JSON REST protocols.
      </p>
      
      <div class="figure-container">
        ${DIAGRAMS.DIAGRAM_FIG1}
        <div class="figure-caption">Figure 1: High-Level Three-Tier System Architecture and Request Pipeline</div>
      </div>

      <h3 class="section-title">4.2 Layers of the Architecture</h3>
      <p>
        1. <b>Presentation Tier (Client):</b> Implemented as a Single Page Application (SPA) using React 19 and TypeScript. It compiles into static HTML/CSS/JS bundles delivered via Vite. The presentation tier manages local UI state, routes client views, and renders responsive cards, forms, and modals.
      </p>
      <p>
        2. <b>Application Tier (Server):</b> Powered by Node.js and the Express 5 framework. It encapsulates business logic, including input sanitization, stock decrements, coupon discount math, and calendar slot collision validation algorithms.
      </p>
      <p>
        3. <b>Persistence Tier (Database):</b> Hosted on a distributed MongoDB Atlas M0 replica set cluster (`floralens`), offering JSON document storage across ten collections with automated index lookups and connection pooling.
      </p>
      <div class="page-footer">8</div>
    </div>
    `,

    // Page 17: Chapter 4 (contd.) (Page 9)
    `
    <div class="page" id="page-17">
      <h3 class="section-title">4.3 Technology Stack</h3>
      <p>
        The software stack is selected to maximize execution performance, developer type safety, and responsive rendering across diverse devices:
      </p>
      
      <p class="table-caption">Table 2: Technology stack and subsystem mapping</p>
      <table>
        <thead>
          <tr>
            <th style="width: 25%;">Subsystem / Layer</th>
            <th style="width: 25%;">Technology</th>
            <th style="width: 15%;">Version</th>
            <th style="width: 35%;">Role in FloraLens System</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>Core Frontend</b></td>
            <td>React</td>
            <td>19.2.8</td>
            <td>Component hierarchy, Virtual DOM reconciliation, responsive UI rendering.</td>
          </tr>
          <tr>
            <td><b>Language Typings</b></td>
            <td>TypeScript</td>
            <td>~6.0.2</td>
            <td>Compile-time static typing, interface contracts, error prevention.</td>
          </tr>
          <tr>
            <td><b>Build Tool &amp; Bundler</b></td>
            <td>Vite</td>
            <td>^8.3.0</td>
            <td>Hot Module Replacement (HMR), tree shaking, lightning fast production builds.</td>
          </tr>
          <tr>
            <td><b>Styling Framework</b></td>
            <td>Tailwind CSS</td>
            <td>^3.4.19</td>
            <td>Utility-first CSS styling, custom botanical palette, responsive layout breakpoints.</td>
          </tr>
          <tr>
            <td><b>Client Routing</b></td>
            <td>React Router DOM</td>
            <td>^7.18.4</td>
            <td>Client-side SPA routing and role-based route protection guards.</td>
          </tr>
          <tr>
            <td><b>API Server Engine</b></td>
            <td>Express.js / Node.js</td>
            <td>^5.3.0</td>
            <td>RESTful API routing, middleware, CORS handling, payload validation.</td>
          </tr>
          <tr>
            <td><b>Database Cluster</b></td>
            <td>MongoDB Atlas</td>
            <td>Cluster 0</td>
            <td>Cloud document store with replica set failover and BSON indexing.</td>
          </tr>
          <tr>
            <td><b>Database Driver</b></td>
            <td>MongoDB Node Driver</td>
            <td>^7.7.0</td>
            <td>Connection pooling, connection caching, and atomic CRUD operations.</td>
          </tr>
          <tr>
            <td><b>Payment Gateway</b></td>
            <td>Razorpay Simulator</td>
            <td>Custom API</td>
            <td>Simulated sandbox checkout supporting UPI, Netbanking, and Cards.</td>
          </tr>
          <tr>
            <td><b>Iconography</b></td>
            <td>Lucide React</td>
            <td>^1.55.0</td>
            <td>Lightweight, scalable vector icons for interface navigation and status badges.</td>
          </tr>
        </tbody>
      </table>

      <h3 class="section-title">4.4 Project Components and Directory Structure</h3>
      <p class="table-caption">Table 3: Project directory structure and subsystem mapping</p>
      <table>
        <thead>
          <tr>
            <th style="width: 30%;">Path / Directory</th>
            <th style="width: 70%;">Architectural Purpose and File Contents</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>src/components/</code></td>
            <td>Reusable atomic UI elements: <code>FlowerProductCard</code>, <code>DecorationServiceCard</code>, <code>Navbar</code>, <code>Footer</code>, <code>PaymentModal</code>, <code>StatusTimeline</code>.</td>
          </tr>
          <tr>
            <td><code>src/context/</code></td>
            <td>Global application state: <code>AuthContext</code> (authentication and demo roles) and <code>StoreContext</code> (cart, catalog, addresses, orders, bookings).</td>
          </tr>
          <tr>
            <td><code>src/pages/</code></td>
            <td>Route views split into <code>public/</code>, <code>customer/</code>, <code>vendor/</code>, <code>admin/</code>, and <code>auth/</code> portals.</td>
          </tr>
          <tr>
            <td><code>server/index.js</code></td>
            <td>Express 5 REST API handling 24 active routing endpoints for users, catalog, bookings, orders, and reviews.</td>
          </tr>
          <tr>
            <td><code>server/db.js</code></td>
            <td>MongoDB connection pool manager implementing connection reuse, ping healthchecks, and reconnection logic.</td>
          </tr>
        </tbody>
      </table>
      <div class="page-footer">9</div>
    </div>
    `,

    // Page 18: Chapter 4 (contd.) (Page 10)
    `
    <div class="page" id="page-18">
      <h3 class="section-title">4.5 Multi-Role Ecosystem and Access Control</h3>
      <p>
        FloraLens implements a sophisticated Role-Based Access Control (RBAC) model governing three distinct user personas:
      </p>
      <p>
        1. <b>Customer Portal:</b> Accessible to registered users and authenticated shoppers. Capabilities include browsing flower and decoration catalogs, selecting bouquet tiers, configuring event packages and add-ons, managing saved delivery addresses, placing orders, and monitoring visual order progression timelines.
      </p>
      <p>
        2. <b>Vendor Portal:</b> Restricted to verified florists and decorators. Provides a dedicated management console where vendors inspect active orders, advance fulfillment stages (`Pending` ➔ `Confirmed` ➔ `Preparing` ➔ `Dispatched` ➔ `Delivered`), accept or decline decoration bookings, manage item prices and stem quantities, and configure availability calendars.
      </p>
      <p>
        3. <b>Platform Administrator Portal:</b> Restricted to platform managers. Provides governance capabilities including reviewing vendor KYC applications, verifying GSTIN credentials, moderating product and service listings, and auditing aggregate platform transactions.
      </p>

      <h3 class="section-title">4.6 System Workflow and Request Pipeline</h3>
      <p>
        Every user interaction follows a deterministic request-response flow:
      </p>
      <p>
        • <b>Action Initiation:</b> A customer interacts with a UI component (e.g., clicking "Add to Cart" or "Book Decoration Slot").
      </p>
      <p>
        • <b>Context Synchronization:</b> The action triggers a method in `StoreContext`, which immediately validates client constraints (e.g., minimum order quantity, variant existence).
      </p>
      <p>
        • <b>REST API Invocation:</b> The client issues an asynchronous HTTP request via `fetch` to `/api/orders` or `/api/bookings`.
      </p>
      <p>
        • <b>Server Validation &amp; Collision Checks:</b> Express route controllers verify payload schema, decrement stock atomically, and execute MongoDB queries to ensure no conflicting confirmed booking exists for that vendor and time slot.
      </p>
      <p>
        • <b>Database Mutation:</b> Upon successful validation, documents are committed to MongoDB Atlas, and a standardized JSON envelope (`{ success: true, data: ... }`) is returned to update the client state and UI.
      </p>
      <div class="page-footer">10</div>
    </div>
    `,

    // Page 19: Chapter 5: System Design (Page 11)
    `
    <div class="page" id="page-19">
      <h2 class="chapter-title">5. SYSTEM DESIGN</h2>
      <h3 class="section-title">5.1 Use Case Diagram</h3>
      <p>
        The Use Case Diagram depicts the system boundary and the interactions between the three primary actors (Customer, Vendor, and Platform Administrator) and the core functional modules of FloraLens.
      </p>
      
      <div class="figure-container">
        ${DIAGRAMS.DIAGRAM_FIG2}
        <div class="figure-caption">Figure 2: UML Use Case Diagram for FloraLens Multi-Role Ecosystem</div>
      </div>

      <p>
        As illustrated in Figure 2, the Customer actor initiates discovery, cart management, checkout, and tracking use cases. The Vendor actor interacts with catalog inventory controls and booking acceptance workflows. The Administrator actor possesses exclusive authority to verify vendor KYC applications and moderate marketplace content.
      </p>
      <div class="page-footer">11</div>
    </div>
    `,

    // Page 20: Chapter 5 (contd.) (Page 12)
    `
    <div class="page" id="page-20">
      <h3 class="section-title">5.2 Class Diagram &amp; Entity Relationship Schema</h3>
      <p>
        The Class Diagram models the object-oriented structure of the domain entities, outlining their private attributes, public methods, and associative cardinality.
      </p>
      
      <div class="figure-container">
        ${DIAGRAMS.DIAGRAM_FIG3}
        <div class="figure-caption">Figure 3: UML Class Diagram &amp; Entity Relationship Schema</div>
      </div>

      <p>
        The `User` entity serves as the root identity class, associated with `CustomerAddress` and `VendorProfile` records. Each vendor maintains a one-to-many relationship with `FlowerProduct` and `DecorationService` entities. Orders and bookings maintain strict foreign-key references to users and vendors.
      </p>
      <div class="page-footer">12</div>
    </div>
    `,

    // Page 21: Chapter 5 (contd.) (Page 13)
    `
    <div class="page" id="page-21">
      <h3 class="section-title">5.3 Object Diagram</h3>
      <p>
        The Object Diagram captures a concrete runtime instance of the FloraLens system during an active customer session, depicting specific attributes and initialized values for an order and a booking.
      </p>
      
      <div class="figure-container">
        ${DIAGRAMS.DIAGRAM_FIG4}
        <div class="figure-caption">Figure 4: UML Object Diagram Showing Sample Runtime Instances</div>
      </div>

      <h3 class="section-title">5.4 Sequence Diagram</h3>
      <p>
        The Sequence Diagram models the chronological message exchange between the customer, the frontend booking view, `StoreContext`, the Express API, and the MongoDB database during decoration booking.
      </p>
      
      <div class="figure-container">
        ${DIAGRAMS.DIAGRAM_FIG5}
        <div class="figure-caption">Figure 5: UML Sequence Diagram for Event Decoration Booking with Conflict Check</div>
      </div>
      <div class="page-footer">13</div>
    </div>
    `,

    // Page 22: Chapter 5 (contd.) (Page 14)
    `
    <div class="page" id="page-22">
      <h3 class="section-title">5.5 Activity Diagram</h3>
      <p>
        The Activity Diagram visualizes the sequential control flow and decision paths undertaken by a customer from adding items to cart through stock validation and payment confirmation.
      </p>
      
      <div class="figure-container">
        ${DIAGRAMS.DIAGRAM_FIG6}
        <div class="figure-caption">Figure 6: UML Activity Diagram of Customer Order Processing</div>
      </div>

      <h3 class="section-title">5.6 State Chart Diagram</h3>
      <p>
        The State Chart Diagram illustrates the discrete lifecycle states of a flower order as it progresses from creation through fulfillment, and a decoration booking through vendor confirmation.
      </p>
      
      <div class="figure-container">
        ${DIAGRAMS.DIAGRAM_FIG7}
        <div class="figure-caption">Figure 7: UML State Chart Diagram for Order and Booking Lifecycles</div>
      </div>
      <div class="page-footer">14</div>
    </div>
    `,

    // Page 23: Chapter 5 (contd.) (Page 15)
    `
    <div class="page" id="page-23">
      <h3 class="section-title">5.7 Communication / Collaboration Diagram</h3>
      <p>
        The Communication Diagram highlights the structural organization of objects that interact to execute catalog querying and cart synchronization.
      </p>
      
      <div class="figure-container">
        ${DIAGRAMS.DIAGRAM_FIG8}
        <div class="figure-caption">Figure 8: UML Communication Diagram for Catalog Query Execution</div>
      </div>

      <h3 class="section-title">5.8 Component Diagram</h3>
      <p>
        The Component Diagram details the modular organization of software artifacts, illustrating dependencies between client UI views, API controller endpoints, and data access modules.
      </p>
      
      <div class="figure-container">
        ${DIAGRAMS.DIAGRAM_FIG9}
        <div class="figure-caption">Figure 9: UML Component Diagram Representing Subsystems</div>
      </div>
      <div class="page-footer">15</div>
    </div>
    `,

    // Page 24: Chapter 5 (contd.) (Page 16)
    `
    <div class="page" id="page-24">
      <h3 class="section-title">5.9 Deployment Diagram</h3>
      <p>
        The Deployment Diagram specifies the physical hardware and execution environment nodes upon which the distributed FloraLens platform is deployed and operated.
      </p>
      
      <div class="figure-container">
        ${DIAGRAMS.DIAGRAM_FIG10}
        <div class="figure-caption">Figure 10: UML Deployment Diagram of Distributed Architecture</div>
      </div>

      <h3 class="section-title">5.10 Data Flow Diagrams (DFD)</h3>
      <p>
        The Level 0 Context DFD and Level 1 Functional DFD depict how external entities supply input parameters into the application pipeline and receive transformed outputs.
      </p>
      
      <div class="figure-container">
        ${DIAGRAMS.DIAGRAM_FIG11}
        <div class="figure-caption">Figure 11: Data Flow Diagrams (Level 0 Context DFD and Level 1 DFD)</div>
      </div>
      <div class="page-footer">16</div>
    </div>
    `
  ];
}
