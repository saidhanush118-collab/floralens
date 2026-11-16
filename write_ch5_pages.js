import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as DIAGRAMS from './report_diagrams.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PAGES_DIR = path.join(__dirname, 'report_pages');

// Page 19: Use Case Diagram (Page 11)
fs.writeFileSync(path.join(PAGES_DIR, 'page_19.html'), `
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
`, 'utf8');

// Page 20: Class Diagram (Page 12)
fs.writeFileSync(path.join(PAGES_DIR, 'page_20.html'), `
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
    The <code>User</code> entity serves as the root identity class, associated with <code>CustomerAddress</code> and <code>VendorProfile</code> records. Each vendor maintains a one-to-many relationship with <code>FlowerProduct</code> and <code>DecorationService</code> entities. Orders and bookings maintain strict foreign-key references to users and vendors.
  </p>
  <div class="page-footer">12</div>
</div>
`, 'utf8');

// Page 21: Object & Sequence Diagrams (Page 13)
fs.writeFileSync(path.join(PAGES_DIR, 'page_21.html'), `
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
    The Sequence Diagram models the chronological message exchange between the customer, the frontend booking view, <code>StoreContext</code>, the Express API, and the MongoDB database during decoration booking.
  </p>
  
  <div class="figure-container">
    ${DIAGRAMS.DIAGRAM_FIG5}
    <div class="figure-caption">Figure 5: UML Sequence Diagram for Event Decoration Booking with Conflict Check</div>
  </div>
  <div class="page-footer">13</div>
</div>
`, 'utf8');

// Page 22: Activity & State Chart Diagrams (Page 14)
fs.writeFileSync(path.join(PAGES_DIR, 'page_22.html'), `
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
`, 'utf8');

// Page 23: Communication & Component Diagrams (Page 15)
fs.writeFileSync(path.join(PAGES_DIR, 'page_23.html'), `
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
`, 'utf8');

// Page 24: Deployment & DFD Diagrams (Page 16)
fs.writeFileSync(path.join(PAGES_DIR, 'page_24.html'), `
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
`, 'utf8');

console.log('Chapter 5 pages (19 to 24) written successfully!');
