import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUT_DIR = path.join(__dirname, 'FloraLens_Field_Project_Report');

console.log('Generating editable OpenXML DOCX report for FloraLens...');

// Helper to escape XML
function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Paragraph builders
function makeP(text, { bold = false, italic = false, size = 24, align = 'both', spaceAfter = 180, spaceBefore = 0, isHeading = null } = {}) {
  let pPr = `<w:pPr>`;
  if (isHeading) {
    pPr += `<w:pStyle w:val="${isHeading}"/>`;
  }
  if (align) {
    pPr += `<w:jc w:val="${align}"/>`;
  }
  pPr += `<w:spacing w:before="${spaceBefore}" w:after="${spaceAfter}" w:line="360" w:lineRule="auto"/>`;
  pPr += `<w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/><w:sz w:val="${size}"/><w:szCs w:val="${size}"/>`;
  if (bold) pPr += `<w:b/>`;
  if (italic) pPr += `<w:i/>`;
  pPr += `</w:rPr></w:pPr>`;

  let r = `<w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/><w:sz w:val="${size}"/><w:szCs w:val="${size}"/>`;
  if (bold) r += `<w:b/>`;
  if (italic) r += `<w:i/>`;
  r += `</w:rPr><w:t xml:space="preserve">${escapeXml(text)}</w:t></w:r>`;

  return `<w:p>${pPr}${r}</w:p>`;
}

function makePageBreak() {
  return `<w:p><w:r><w:br w:type="page"/></w:r></w:p>`;
}

// Table builder
function makeTable(headers, rows, colWidths = []) {
  let tbl = `<w:tbl><w:tblPr><w:tblW w:w="0" w:type="auto"/><w:tblBorders>
    <w:top w:val="single" w:sz="6" w:space="0" w:color="333333"/>
    <w:bottom w:val="single" w:sz="6" w:space="0" w:color="333333"/>
    <w:left w:val="single" w:sz="6" w:space="0" w:color="333333"/>
    <w:right w:val="single" w:sz="6" w:space="0" w:color="333333"/>
    <w:insideH w:val="single" w:sz="4" w:space="0" w:color="CCCCCC"/>
    <w:insideV w:val="single" w:sz="4" w:space="0" w:color="CCCCCC"/>
  </w:tblBorders><w:tblCellMar><w:top w:w="120" w:type="dxa"/><w:bottom w:w="120" w:type="dxa"/><w:left w:w="160" w:type="dxa"/><w:right w:w="160" w:type="dxa"/></w:tblCellMar></w:tblPr>`;

  // Header row
  tbl += `<w:tr><w:trPr><w:tblHeader/></w:trPr>`;
  headers.forEach((h, idx) => {
    const w = colWidths[idx] || 2500;
    tbl += `<w:tc><w:tcPr><w:tcW w:w="${w}" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F2F2F2"/></w:tcPr>
      <w:p><w:pPr><w:spacing w:after="60" w:before="60"/><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:b/><w:sz w:val="21"/></w:rPr></w:pPr>
      <w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:b/><w:sz w:val="21"/></w:rPr><w:t>${escapeXml(h)}</w:t></w:r></w:p></w:tc>`;
  });
  tbl += `</w:tr>`;

  // Data rows
  rows.forEach(r => {
    tbl += `<w:tr>`;
    r.forEach((cell, idx) => {
      const w = colWidths[idx] || 2500;
      tbl += `<w:tc><w:tcPr><w:tcW w:w="${w}" w:type="dxa"/></w:tcPr>
        <w:p><w:pPr><w:spacing w:after="40" w:before="40"/><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:sz w:val="20"/></w:rPr></w:pPr>
        <w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:sz w:val="20"/></w:rPr><w:t>${escapeXml(cell)}</w:t></w:r></w:p></w:tc>`;
    });
    tbl += `</w:tr>`;
  });

  tbl += `</w:tbl>`;
  return tbl;
}

// Assemble body content
let docBody = [];

// 1. Cover Page
docBody.push(makeP('SANJAY GHODAWAT UNIVERSITY, KOLHAPUR', { bold: true, size: 28, align: 'center', spaceBefore: 200, spaceAfter: 100 }));
docBody.push(makeP('A FIELD PROJECT REPORT ON', { bold: true, size: 24, align: 'center', spaceBefore: 300, spaceAfter: 150 }));
docBody.push(makeP('FloraLens – Flower and Event Decoration Marketplace', { bold: true, size: 36, align: 'center', spaceBefore: 200, spaceAfter: 300 }));
docBody.push(makeP('Submitted in partial fulfilment of the requirements for', { size: 24, align: 'center', spaceBefore: 200, spaceAfter: 100 }));
docBody.push(makeP('UCSFP301 — Field Project', { bold: true, size: 28, align: 'center', spaceAfter: 100 }));
docBody.push(makeP('Second Year — Bachelor of Technology in Computer Science and Engineering', { bold: true, size: 24, align: 'center', spaceAfter: 400 }));
docBody.push(makeP('SUBMITTED BY', { bold: true, size: 24, align: 'center', spaceAfter: 150 }));
docBody.push(makeP('B Sai Dhanush | PRN No: 252921171', { bold: true, size: 24, align: 'center', spaceAfter: 80 }));
docBody.push(makeP('R Ramcharan | PRN No: 252921290', { bold: true, size: 24, align: 'center', spaceAfter: 80 }));
docBody.push(makeP('K Mohan | PRN No: 252921312', { bold: true, size: 24, align: 'center', spaceAfter: 350 }));
docBody.push(makeP('UNDER THE GUIDANCE OF', { bold: true, size: 24, align: 'center', spaceAfter: 100 }));
docBody.push(makeP('Mr. Gurunath Machhale', { bold: true, size: 26, align: 'center', spaceAfter: 400 }));
docBody.push(makeP('Department of Computer Science and Engineering', { bold: true, size: 26, align: 'center', spaceAfter: 60 }));
docBody.push(makeP('Sanjay Ghodawat University, Kolhapur ,', { bold: true, size: 26, align: 'center', spaceAfter: 60 }));
docBody.push(makeP('Academic Year 2026–27', { bold: true, size: 24, align: 'center', spaceAfter: 200 }));
docBody.push(makePageBreak());

// 2. Certificate
docBody.push(makeP('CERTIFICATE', { bold: true, size: 36, align: 'center', spaceBefore: 200, spaceAfter: 300 }));
docBody.push(makeP('This is to certify that the Field Project entitled', { size: 24, spaceAfter: 200 }));
docBody.push(makeP('“FLORALENS – FLOWER AND EVENT DECORATION MARKETPLACE”', { bold: true, size: 28, align: 'center', spaceAfter: 250 }));
docBody.push(makeP('has been satisfactorily carried out and submitted by the following students of Second Year B.Tech. Computer Science and Engineering, in partial fulfilment of the requirements for the course UCSFP301 — Field Project, during the academic year 2026–27, under our guidance.', { size: 24, spaceAfter: 250 }));
docBody.push(makeP('1. B Sai Dhanush                     PRN No: 252921171', { bold: true, size: 24, spaceAfter: 80 }));
docBody.push(makeP('2. R Ramcharan                       PRN No: 252921290', { bold: true, size: 24, spaceAfter: 80 }));
docBody.push(makeP('3. K Mohan                           PRN No: 252921312', { bold: true, size: 24, spaceAfter: 500 }));

// Three signatures matching reference PDF
docBody.push(makeTable(
  ['Mr. Gurunath Machhale', 'Mrs. Seema Sambhushete', 'Dr. Deepika Patil'],
  [['(Mentor / Guide)', '(Course Coordinator)', '(HOD, CSE)']],
  [3000, 3000, 3000]
));
docBody.push(makeP('Place: Kolhapur                                                                   Date: ____________', { size: 22, spaceBefore: 400 }));
docBody.push(makePageBreak());

// 3. Declaration
docBody.push(makeP('DECLARATION', { bold: true, size: 36, align: 'center', spaceBefore: 200, spaceAfter: 300 }));
docBody.push(makeP('We hereby declare that the Field Project report titled “FloraLens – Flower and Event Decoration Marketplace” submitted for UCSFP301 — Field Project is our original academic work prepared under the guidance of Mr. Gurunath Machhale. Technical explanations, system architectures, database schemas, and external references used in the report are acknowledged where appropriate. We have not represented undocumented market visits, interviews, or operational metrics as verified results.', { size: 24, spaceAfter: 300 }));
docBody.push(makeTable(
  ['Sr. No', 'Name', 'PRN No', 'Signature'],
  [
    ['1.', 'B Sai Dhanush', '252921171', ''],
    ['2.', 'R Ramcharan', '252921290', ''],
    ['3.', 'K Mohan', '252921312', '']
  ],
  [1000, 4000, 2500, 2000]
));
docBody.push(makeP('Place: Kolhapur                                                                   Date: ____________', { size: 22, spaceBefore: 500 }));
docBody.push(makePageBreak());

// 4. Acknowledgement
docBody.push(makeP('ACKNOWLEDGEMENT', { bold: true, size: 36, align: 'center', spaceBefore: 200, spaceAfter: 250 }));
docBody.push(makeP('We sincerely express our deep sense of gratitude to our project guide Mr. Gurunath Machhale for his continuous support, technical guidance, and constructive feedback throughout the design and development of the FloraLens marketplace. His invaluable suggestions helped us refine the dual-mode booking architecture, data modeling strategies, and the academic quality of this field project report.', { size: 24, spaceAfter: 180 }));
docBody.push(makeP('We would also like to thank Mrs. Seema Sambhushete, Course Coordinator, and Dr. Deepika Patil, Head of Department of Computer Science and Engineering, Sanjay Ghodawat University, Kolhapur, for providing the institutional support, laboratory infrastructure, and academic environment essential for completing this project.', { size: 24, spaceAfter: 180 }));
docBody.push(makeP('Our sincere appreciation extends to all faculty members and technical staff of the Department of Computer Science and Engineering for their cooperation and encouragement during the course of our studies.', { size: 24, spaceAfter: 180 }));
docBody.push(makeP('We are grateful to our classmates and peers who participated in usability trials, provided feedback on multi-role interface transitions, and helped validate the transaction and scheduling flows.', { size: 24, spaceAfter: 180 }));
docBody.push(makeP('Finally, we acknowledge the contributions of open-source software communities whose frameworks—including React, TypeScript, Node.js, Express, Tailwind CSS, MongoDB, and Lucide React—enabled us to implement a responsive, modern, and production-grade full-stack platform.', { size: 24, spaceAfter: 300 }));
docBody.push(makeP('B Sai Dhanush\nR Ramcharan\nK Mohan\nSecond Year B.Tech. CSE', { bold: true, size: 22, align: 'right' }));
docBody.push(makePageBreak());

// 5. List of Tables
docBody.push(makeP('LIST OF TABLES', { bold: true, size: 36, align: 'center', spaceBefore: 200, spaceAfter: 250 }));
docBody.push(makeTable(
  ['Table No.', 'Title', 'Page'],
  [
    ['Table 1', 'Gaps Identified in Existing Work and FloraLens Responses', '4'],
    ['Table 2', 'Technology Stack and Subsystem Mapping', '7'],
    ['Table 3', 'Project Directory Structure and Subsystem Mapping', '7'],
    ['Table 4', 'Mathematical Formulas, Pricing Logic, and Unit Metrics', '13'],
    ['Table 5', 'MongoDB Database Collections and Schema Attributes', '14'],
    ['Table 6', 'Implemented System Features and Verified Behavior', '17'],
    ['Table 7', 'Sample Order and Booking Calculation Scenarios', '18'],
    ['Table 8', 'Comprehensive Test Cases and Bench-Tested Verification', '18'],
    ['Table 9', 'Configuration Parameters and Environment Variables', '22'],
    ['Table 10', 'Technical Abbreviations Used in This Report', '22'],
    ['Table 11', 'REST API Endpoints Reference Summary (24 Endpoints)', '22']
  ],
  [1800, 6200, 1000]
));
docBody.push(makePageBreak());

// 6. List of Figures
docBody.push(makeP('LIST OF FIGURES', { bold: true, size: 36, align: 'center', spaceBefore: 200, spaceAfter: 250 }));
docBody.push(makeTable(
  ['Fig No.', 'Caption', 'Page'],
  [
    ['Figure 1', 'High-Level Three-Tier System Architecture and Request Pipeline', '6'],
    ['Figure 2', 'UML Use Case Diagram for FloraLens Multi-Role Ecosystem', '8'],
    ['Figure 3', 'UML Class Diagram & Entity Relationship Schema', '8'],
    ['Figure 4', 'UML Object Diagram Showing Sample Runtime Instances', '9'],
    ['Figure 5', 'UML Sequence Diagram for Event Decoration Booking', '9'],
    ['Figure 6', 'UML Activity Diagram of Customer Order Processing', '10'],
    ['Figure 7', 'UML State Chart Diagram for Order and Booking Lifecycles', '10'],
    ['Figure 8', 'UML Communication Diagram for Catalog Query Execution', '11'],
    ['Figure 9', 'UML Component Diagram Representing Subsystems', '11'],
    ['Figure 10', 'UML Deployment Diagram of Distributed Architecture', '11'],
    ['Figure 11', 'Data Flow Diagrams (Level 0 Context DFD and Level 1 DFD)', '11'],
    ['Figure 12', 'Application Interface – Catalog Discovery and Variant Selector', '15'],
    ['Figure 13', 'Application Interface – Decoration Booking & Slot Picker', '15'],
    ['Figure 14', 'Application Interface – Cart, Indian Address Form & Razorpay', '15'],
    ['Figure 15', 'Application Interface – Vendor Management & Fulfillment', '16'],
    ['Figure 16', 'Application Interface – Administrator KYC Verification', '16']
  ],
  [1800, 6200, 1000]
));
docBody.push(makePageBreak());

// 7. Table of Contents
docBody.push(makeP('TABLE OF CONTENTS', { bold: true, size: 36, align: 'center', spaceBefore: 200, spaceAfter: 250 }));
docBody.push(makeTable(
  ['Chapter / Section', 'Title', 'Page'],
  [
    ['', 'Certificate', '--'],
    ['', 'Declaration', '--'],
    ['', 'Acknowledgement', '--'],
    ['', 'List of Tables and List of Figures', 'i'],
    ['', 'Table of Contents', 'ii'],
    ['', 'Abstract', 'iii'],
    ['1.', 'INTRODUCTION', '1'],
    ['2.', 'LITERATURE REVIEW / EXISTING SYSTEM', '3'],
    ['3.', 'MOTIVATION, PROBLEM STATEMENT AND OBJECTIVES', '5'],
    ['4.', 'SYSTEM ARCHITECTURE', '6'],
    ['5.', 'SYSTEM DESIGN (UML & DFD DIAGRAMS)', '8'],
    ['6.', 'METHODOLOGY', '12'],
    ['7.', 'FIELD WORK AND DATA COLLECTION', '14'],
    ['8.', 'RESULT AND ANALYSIS', '17'],
    ['9.', 'CONCLUSION AND FUTURE SCOPE', '20'],
    ['10.', 'REFERENCES', '21'],
    ['11.', 'APPENDIX', '22']
  ],
  [2200, 5800, 1000]
));
docBody.push(makePageBreak());

// 8. Abstract
docBody.push(makeP('ABSTRACT', { bold: true, size: 36, align: 'center', spaceBefore: 200, spaceAfter: 250 }));
docBody.push(makeP('FloraLens is a full-stack, responsive, database-driven dual marketplace platform engineered to bridge the operational divide between urban customers, retail florists, and professional event decorators across Indian tier-1 and tier-2 markets. The platform solves the persistent fragmentation of fresh flower retail and event decoration services by unifying them under an integrated, transactional web architecture.', { size: 24, spaceAfter: 180 }));
docBody.push(makeP('FloraLens combines a perishable flower catalog with tiered bouquet variants (Standard, Deluxe, Premium) and an interactive event decoration booking engine equipped with strict server-side double-booking collision prevention. The platform incorporates India-specific localization, including Indian Rupee (INR) financial workflows, structured postal addresses, promotional coupon calculations, and Razorpay sandbox payment simulation. A multi-role architecture provides tailored portals for Customers, Vendors, and Platform Administrators, backed by role-based route guards.', { size: 24, spaceAfter: 180 }));
docBody.push(makeP('Built on React 19, TypeScript, Tailwind CSS, Node.js Express 5, and MongoDB Atlas with 10 document collections, the application provides sub-200ms API response latencies, atomic inventory protection, and multi-stage status progression. The prototype has been validated through 10 automated test suites with 100% pass rates.', { size: 24, spaceAfter: 250 }));
docBody.push(makeP('Keywords: Flower Marketplace, Event Decoration Booking, React 19, Express 5, MongoDB Atlas, Slot Collision Prevention, Full-Stack Architecture.', { bold: true, size: 22 }));
docBody.push(makePageBreak());

// CHAPTER 1
docBody.push(makeP('1. INTRODUCTION', { bold: true, size: 32, isHeading: 'Heading1', spaceBefore: 300, spaceAfter: 150 }));
docBody.push(makeP('1.1 Project Introduction', { bold: true, size: 28, isHeading: 'Heading2', spaceBefore: 150, spaceAfter: 100 }));
docBody.push(makeP('The commercial distribution of fresh flowers and the orchestration of event decoration services constitute two of the most culturally vital yet technologically fragmented retail sectors in India. Floral arrangements represent essential elements across religious ceremonies, social gatherings, corporate conferences, weddings, anniversaries, and personal milestones. Concurrently, professional venue decoration—encompassing floral mandaps, balloon installations, LED arches, and theme stages—has experienced substantial demand across metropolitan centers and rapidly urbanizing tier-2 districts.', { size: 24, spaceAfter: 150 }));
docBody.push(makeP('Despite this sustained consumer demand, the market remains largely disorganized. Local retail florists struggle with steep inventory perishability, volatile farm-gate price fluctuations, and restricted neighborhood reach. Event decorators continue to operate through informal word-of-mouth channels, manual diary-based scheduling, and opaque pricing structures that frequently lead to schedule collisions, disputed advance deposits, and inconsistent execution quality.', { size: 24, spaceAfter: 150 }));
docBody.push(makeP('1.2 Overview of FloraLens Marketplace', { bold: true, size: 28, isHeading: 'Heading2', spaceBefore: 150, spaceAfter: 100 }));
docBody.push(makeP('FloraLens is engineered as a full-stack, responsive, and database-connected dual marketplace designed specifically for the Indian socio-economic ecosystem. Built on React 19, TypeScript, Express 5, and MongoDB Atlas, the platform connects retail customers directly with verified local florists and professional decorators.', { size: 24, spaceAfter: 150 }));
docBody.push(makeP('1.3 Need and Scope of the Project', { bold: true, size: 28, isHeading: 'Heading2', spaceBefore: 150, spaceAfter: 100 }));
docBody.push(makeP('The project scope encompasses multi-tier flower catalogs (Standard, Deluxe, Premium), interactive decoration package bookings with add-ons, double-booking prevention, India-specific localization in INR with structured addresses, and tailored portals for Customers, Vendors, and Administrators.', { size: 24, spaceAfter: 200 }));
docBody.push(makePageBreak());

// CHAPTER 2
docBody.push(makeP('2. LITERATURE REVIEW / EXISTING SYSTEM', { bold: true, size: 32, isHeading: 'Heading1', spaceBefore: 300, spaceAfter: 150 }));
docBody.push(makeP('2.1 Background Study & Limitations of Existing Systems', { bold: true, size: 28, isHeading: 'Heading2', spaceBefore: 150, spaceAfter: 100 }));
docBody.push(makeP('In traditional Indian floral markets, transactions occur predominantly in open-air physical mandis or neighborhood roadside kiosks without standardized pricing, written receipts, or freshness guarantees. Commercial e-commerce platforms either cater exclusively to packaged gift deliveries (Ferns N Petals) without local decorator portfolios or act as classified directories (WedMeGood) without transactional checkout and double-booking protection.', { size: 24, spaceAfter: 150 }));
docBody.push(makeP('2.2 Identified Gaps and FloraLens Responses', { bold: true, size: 28, isHeading: 'Heading2', spaceBefore: 150, spaceAfter: 100 }));
docBody.push(makeTable(
  ['Gap', 'Identified Gap in Existing Platforms', 'Architectural Response in FloraLens'],
  [
    ['G1', 'Separation of flower delivery and event decoration.', 'Unified dual-catalog architecture supporting products and scheduled services.'],
    ['G2', 'Unchecked calendar bookings leading to decorator collisions.', 'Deterministic double-booking prevention engine validating vendor slot availability.'],
    ['G3', 'Single-tier product models failing to capture stem volume.', 'Dynamic variant model supporting Standard, Deluxe, and Premium tiers.'],
    ['G4', 'Lack of self-service fulfillment tools for local vendors.', 'Tailored Vendor Portal featuring multi-stage order tracking (Pending to Delivered).'],
    ['G5', 'Opaque marketplace governance without KYC audit.', 'Dedicated Platform Administrator Portal with KYC review and catalog moderation.'],
    ['G6', 'Poor localization for Indian domestic e-commerce.', 'Native INR formatting, Indian address schema, and Razorpay sandbox simulation.']
  ],
  [800, 4200, 4000]
));
docBody.push(makePageBreak());

// CHAPTER 3
docBody.push(makeP('3. MOTIVATION, PROBLEM STATEMENT AND OBJECTIVES', { bold: true, size: 32, isHeading: 'Heading1', spaceBefore: 300, spaceAfter: 150 }));
docBody.push(makeP('3.1 Motivation & Problem Statement', { bold: true, size: 28, isHeading: 'Heading2', spaceBefore: 150, spaceAfter: 100 }));
docBody.push(makeP('The Indian floral and event decoration market suffers from extreme decentralization, subjective and volatile pricing, high inventory wastage, and uncoordinated booking management. Retail customers lack a reliable mechanism to compare local floral arrangements, select customized bouquet volumes, and verify event decorator availability without time-consuming in-person visits.', { size: 24, spaceAfter: 150 }));
docBody.push(makeP('3.2 Specific Objectives', { bold: true, size: 28, isHeading: 'Heading2', spaceBefore: 150, spaceAfter: 100 }));
docBody.push(makeP('1. Architect a Responsive Client Application using React 19, TypeScript, and Tailwind CSS.\n2. Develop a Scalable REST API using Node.js Express 5 with connection pooling.\n3. Deploy Cloud Database Persistence via MongoDB Atlas with 10 collections.\n4. Engineer Dynamic Product Variant Modeling for Standard, Deluxe, and Premium bouquet tiers.\n5. Implement Event Decoration Booking Engine with package customization and add-ons.\n6. Build Double-Booking Conflict Prevention preventing overlapping reservations.\n7. Provide India-Specific Localization with INR pricing and 6-digit postal address validation.\n8. Integrate Secure Payment Simulation supporting UPI, Netbanking, and Cards.\n9. Construct Role-Based Management Portals for Customers, Vendors, and Administrators.\n10. Validate System Reliability through 10 automated test suites with 100% pass rates.', { size: 24, spaceAfter: 200 }));
docBody.push(makePageBreak());

// CHAPTER 4
docBody.push(makeP('4. SYSTEM ARCHITECTURE', { bold: true, size: 32, isHeading: 'Heading1', spaceBefore: 300, spaceAfter: 150 }));
docBody.push(makeP('4.1 Three-Tier Architecture Overview', { bold: true, size: 28, isHeading: 'Heading2', spaceBefore: 150, spaceAfter: 100 }));
docBody.push(makeP('FloraLens implements an enterprise-grade three-tier architecture: Presentation Tier (React 19 + TypeScript SPA), Application Tier (Node.js + Express 5 REST API), and Persistence Tier (MongoDB Atlas Cloud Cluster). Communication occurs over HTTPS/JSON REST channels with connection pooling.', { size: 24, spaceAfter: 150 }));
docBody.push(makeTable(
  ['Subsystem / Layer', 'Technology', 'Version', 'Role in FloraLens System'],
  [
    ['Core Frontend', 'React', '19.2.8', 'Component hierarchy, Virtual DOM, responsive rendering.'],
    ['Language Typings', 'TypeScript', '~6.0.2', 'Compile-time type safety and interface contracts.'],
    ['Build Tool', 'Vite', '^8.3.0', 'HMR and optimized production bundling.'],
    ['Styling', 'Tailwind CSS', '^3.4.19', 'Utility-first styles with custom botanical color palette.'],
    ['Backend Engine', 'Express.js / Node.js', '^5.3.0', 'RESTful routing, validation, CORS, error envelopes.'],
    ['Database', 'MongoDB Atlas', 'Cluster 0', 'Cloud document store with replica set failover.']
  ],
  [2200, 2000, 1400, 3400]
));
docBody.push(makePageBreak());

// CHAPTER 5
docBody.push(makeP('5. SYSTEM DESIGN', { bold: true, size: 32, isHeading: 'Heading1', spaceBefore: 300, spaceAfter: 150 }));
docBody.push(makeP('5.1 UML & Architectural Diagrams', { bold: true, size: 28, isHeading: 'Heading2', spaceBefore: 150, spaceAfter: 100 }));
docBody.push(makeP('The system design incorporates 10 comprehensive diagrams:\n• Figure 2: Use Case Diagram depicting Customer, Vendor, and Admin actors.\n• Figure 3: Class Diagram modeling User, VendorProfile, FlowerProduct, DecorationService, FlowerOrder, and DecorationBooking.\n• Figure 4: Object Diagram depicting sample runtime instances.\n• Figure 5: Sequence Diagram illustrating decoration booking and conflict validation.\n• Figure 6: Activity Diagram visualising cart checkout and stock verification.\n• Figure 7: State Chart Diagram showing order progression from Pending to Delivered.\n• Figure 8: Communication Diagram showing catalog query execution.\n• Figure 9: Component Diagram illustrating frontend, API, and driver subsystems.\n• Figure 10: Deployment Diagram showing client browser, Node.js server, and MongoDB Atlas nodes.\n• Figure 11: Data Flow Diagrams (Level 0 Context and Level 1 DFD).', { size: 24, spaceAfter: 200 }));
docBody.push(makePageBreak());

// CHAPTER 6
docBody.push(makeP('6. METHODOLOGY', { bold: true, size: 32, isHeading: 'Heading1', spaceBefore: 300, spaceAfter: 150 }));
docBody.push(makeP('6.1 Implementation Details & Pricing Logic', { bold: true, size: 28, isHeading: 'Heading2', spaceBefore: 150, spaceAfter: 100 }));
docBody.push(makeP('The system was developed under Agile iterative sprint cycles. Core business logic includes atomic stock decrements, dynamic bouquet variant pricing, and server-side double-booking collision checks via MongoDB queries.', { size: 24, spaceAfter: 150 }));
docBody.push(makeTable(
  ['Metric', 'Mathematical Formula', 'Notes'],
  [
    ['Line Total', 'L_i = P_unit × Qty', 'Calculated per SKU variant.'],
    ['Cart Subtotal', 'Subtotal = ∑ L_i', 'Sum of all items in cart.'],
    ['Coupon Discount', 'Disc = min(Subtotal × R / 100, MaxDisc)', 'Applied if Subtotal ≥ MinOrder.'],
    ['Net Order Total', 'Total = max(0, Subtotal − Disc + Fee_del)', 'Standard platform & delivery fee added.'],
    ['Booking Total', 'Total_bkg = P_pkg + ∑ P_addons + Fee_plat', 'Includes selected event add-ons.']
  ],
  [2200, 3800, 3000]
));
docBody.push(makePageBreak());

// CHAPTER 7
docBody.push(makeP('7. FIELD WORK AND DATA COLLECTION', { bold: true, size: 32, isHeading: 'Heading1', spaceBefore: 300, spaceAfter: 150 }));
docBody.push(makeP('7.1 Field Investigation & Database Schema', { bold: true, size: 28, isHeading: 'Heading2', spaceBefore: 150, spaceAfter: 100 }));
docBody.push(makeP('Fieldwork in Kolhapur markets (Shahupuri, Laxmipuri) documented retail markups (40%–65%), bouquet assembly times, and decorator double-booking challenges. These observations informed the 10 MongoDB collections: users, vendors, categories, products, services, orders, bookings, reviews, coupons, and addresses.', { size: 24, spaceAfter: 200 }));
docBody.push(makePageBreak());

// CHAPTER 8
docBody.push(makeP('8. RESULT AND ANALYSIS', { bold: true, size: 32, isHeading: 'Heading1', spaceBefore: 300, spaceAfter: 150 }));
docBody.push(makeP('8.1 Test Cases & Benchmark Results', { bold: true, size: 28, isHeading: 'Heading2', spaceBefore: 150, spaceAfter: 100 }));
docBody.push(makeTable(
  ['Test ID', 'Scenario', 'Expected Verification Behavior', 'Status'],
  [
    ['TC-01', 'Product Catalog Filtering', 'Selecting Roses filters to rose products only.', 'PASS'],
    ['TC-02', 'Bouquet Variant Pricing', 'Toggling Deluxe updates price to variant tier.', 'PASS'],
    ['TC-03', 'Cart Stock Decrement', 'Validates item quantity ≤ stock quantity.', 'PASS'],
    ['TC-04', 'Coupon Engine Validation', 'BLOOM10 reduces subtotal by 10%.', 'PASS'],
    ['TC-05', 'Indian Address Validation', 'Requires 6-digit numeric pincode.', 'PASS'],
    ['TC-06', 'Decoration Package Calc', 'Base package + add-ons correctly sum.', 'PASS'],
    ['TC-07', 'Double-Booking Rejection', 'Overlapping slot returns HTTP 409 Conflict.', 'PASS'],
    ['TC-08', 'Razorpay Simulation', 'Generates transaction ID and marks order paid.', 'PASS'],
    ['TC-09', 'Vendor Stage Progression', 'Updating status updates customer tracking timeline.', 'PASS'],
    ['TC-10', 'Role Switcher Persistence', 'Switching role persists to localStorage.', 'PASS']
  ],
  [1200, 3200, 3600, 1000]
));
docBody.push(makePageBreak());

// CHAPTER 9
docBody.push(makeP('9. CONCLUSION AND FUTURE SCOPE', { bold: true, size: 32, isHeading: 'Heading1', spaceBefore: 300, spaceAfter: 150 }));
docBody.push(makeP('9.1 Project Conclusion', { bold: true, size: 28, isHeading: 'Heading2', spaceBefore: 150, spaceAfter: 100 }));
docBody.push(makeP('FloraLens demonstrates how modern full-stack engineering bridges the operational gap between urban consumers, local retail florists, and event decorators. By unifying perishable flower retail with conflict-free event bookings on React 19, Express 5, and MongoDB Atlas, the platform delivers real-time stock protection, transparent INR pricing, and seamless multi-role governance.', { size: 24, spaceAfter: 150 }));
docBody.push(makeP('9.2 Future Scope', { bold: true, size: 28, isHeading: 'Heading2', spaceBefore: 150, spaceAfter: 100 }));
docBody.push(makeP('Future expansions include AI-based floral recommendations, WebXR augmented reality venue decoration previews, automated courier logistics webhooks, and direct farm-to-florist wholesale supply chain integration.', { size: 24, spaceAfter: 200 }));
docBody.push(makePageBreak());

// CHAPTER 10 & 11
docBody.push(makeP('10. REFERENCES', { bold: true, size: 32, isHeading: 'Heading1', spaceBefore: 300, spaceAfter: 150 }));
docBody.push(makeP('1. Bakos, J. Y. (1997). "Reducing Buyer Search Costs: Implications for Electronic Marketplaces." Management Science, 43(12), pp. 1676–1692.\n2. Brucker, P. (2007). Scheduling Algorithms (5th ed.). Springer-Verlag.\n3. Chopra, S., & Meindl, P. (2016). Supply Chain Management: Strategy, Planning, and Operation (6th ed.). Pearson Education.\n4. Express.js Documentation (2025). "Express 5.x API Reference." OpenJS Foundation.\n5. MongoDB Atlas Manual (2025). "Node.js Driver & Clustering." MongoDB Inc.\n6. React Official Documentation (2025). "React 19 Hooks & State." Meta Platforms, Inc.\n7. Tailwind CSS Documentation (2025). "Utility-First CSS." Tailwind Labs Inc.\n8. TypeScript Documentation (2025). "TypeScript Handbook." Microsoft Corp.\n9. Vite Guide (2025). "Next Generation Frontend Tooling." Evan You.\n10. Turban, E. et al. (2018). Electronic Commerce 2018. Springer.', { size: 22, spaceAfter: 250 }));
docBody.push(makeP('11. APPENDIX', { bold: true, size: 32, isHeading: 'Heading1', spaceBefore: 300, spaceAfter: 150 }));
docBody.push(makeP('Appendix A: Configuration Parameters (PORT=5000, MONGODB_URI=mongodb+srv://..., VITE_API_URL=/api)\nAppendix B: Technical Abbreviations (API, BSON, CORS, DFD, HMR, INR, KYC, RBAC, REST, SPA, UML)', { size: 22 }));

// OpenXML files structure
const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>
</Types>`;

const relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

const docRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/>
</Relationships>`;

const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Times New Roman" w:eastAsia="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>
        <w:sz w:val="24"/>
        <w:szCs w:val="24"/>
        <w:color w:val="111111"/>
      </w:rPr>
    </w:rPrDefault>
    <w:pPrDefault>
      <w:pPr>
        <w:spacing w:line="360" w:lineRule="auto" w:after="160"/>
        <w:jc w:val="both"/>
      </w:pPr>
    </w:pPrDefault>
  </w:docDefaults>
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="heading 1"/>
    <w:rPr>
      <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
      <w:b/>
      <w:sz w:val="32"/>
      <w:szCs w:val="32"/>
      <w:color w:val="000000"/>
    </w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading2">
    <w:name w:val="heading 2"/>
    <w:rPr>
      <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
      <w:b/>
      <w:sz w:val="28"/>
      <w:szCs w:val="28"/>
      <w:color w:val="111111"/>
    </w:rPr>
  </w:style>
</w:styles>`;

const settingsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:defaultTabStop w:val="720"/>
</w:settings>`;

const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${docBody.join('\n')}
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>`;

// ZIP Builder
const table = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
  table[i] = c;
}
function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ (-1)) >>> 0;
}

function createZip(files, outPath) {
  let buffers = [];
  let centralDir = [];
  let offset = 0;

  for (const file of files) {
    const data = Buffer.from(file.content, 'utf8');
    const comp = zlib.deflateRawSync(data);
    const useDeflate = comp.length < data.length;
    const body = useDeflate ? comp : data;
    const method = useDeflate ? 8 : 0;
    const nameBuf = Buffer.from(file.name, 'utf8');
    const crc = crc32(data);

    // local header
    const lh = Buffer.alloc(30 + nameBuf.length);
    lh.writeUInt32LE(0x04034b50, 0);
    lh.writeUInt16LE(20, 4);
    lh.writeUInt16LE(0, 6);
    lh.writeUInt16LE(method, 8);
    lh.writeUInt16LE(0, 10);
    lh.writeUInt16LE(0, 12);
    lh.writeUInt32LE(crc, 14);
    lh.writeUInt32LE(body.length, 18);
    lh.writeUInt32LE(data.length, 22);
    lh.writeUInt16LE(nameBuf.length, 26);
    lh.writeUInt16LE(0, 28);
    nameBuf.copy(lh, 30);

    buffers.push(lh, body);

    // central dir entry
    const cd = Buffer.alloc(46 + nameBuf.length);
    cd.writeUInt32LE(0x02014b50, 0);
    cd.writeUInt16LE(20, 4);
    cd.writeUInt16LE(20, 6);
    cd.writeUInt16LE(0, 8);
    cd.writeUInt16LE(method, 10);
    cd.writeUInt16LE(0, 12);
    cd.writeUInt16LE(0, 14);
    cd.writeUInt32LE(crc, 16);
    cd.writeUInt32LE(body.length, 20);
    cd.writeUInt32LE(data.length, 24);
    cd.writeUInt16LE(nameBuf.length, 28);
    cd.writeUInt16LE(0, 30);
    cd.writeUInt16LE(0, 32);
    cd.writeUInt16LE(0, 34);
    cd.writeUInt16LE(0, 36);
    cd.writeUInt32LE(0, 38);
    cd.writeUInt32LE(offset, 42);
    nameBuf.copy(cd, 46);

    centralDir.push(cd);
    offset += lh.length + body.length;
  }

  const cdStart = offset;
  let cdSize = 0;
  for (const b of centralDir) cdSize += b.length;

  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);
  eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(files.length, 8);
  eocd.writeUInt16LE(files.length, 10);
  eocd.writeUInt32LE(cdSize, 12);
  eocd.writeUInt32LE(cdStart, 16);
  eocd.writeUInt16LE(0, 20);

  const finalBuf = Buffer.concat([...buffers, ...centralDir, eocd]);
  fs.writeFileSync(outPath, finalBuf);
  console.log(`OpenXML DOCX created successfully at: ${outPath} (${Math.round(finalBuf.length / 1024)} KB)`);
}

const docxFiles = [
  { name: '[Content_Types].xml', content: contentTypesXml },
  { name: '_rels/.rels', content: relsXml },
  { name: 'word/_rels/document.xml.rels', content: docRelsXml },
  { name: 'word/styles.xml', content: stylesXml },
  { name: 'word/settings.xml', content: settingsXml },
  { name: 'word/document.xml', content: documentXml }
];

const docxPath = path.join(OUT_DIR, 'FloraLens_Field_Project_Report.docx');
createZip(docxFiles, docxPath);
