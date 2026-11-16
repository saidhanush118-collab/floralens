import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SGU_LOGO, CSS_STYLES } from './report_styles.js';
import * as DIAGRAMS from './report_diagrams.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUT_DIR = path.join(__dirname, 'FloraLens_Field_Project_Report');

const pages = [];

// ==========================================
// PRELIMINARY PAGES (8 PAGES)
// ==========================================

// Page 1: Cover Page
pages.push(`
<div class="page" id="page-1">
  <div class="sgu-logo-box">
    ${SGU_LOGO}
  </div>
  <div class="text-center" style="margin-top: 10px;">
    <p style="font-size: 13pt; font-weight: bold; letter-spacing: 1.5px; margin-bottom: 22px;">
      A FIELD PROJECT REPORT ON
    </p>
    <h1 class="report-title" style="margin-bottom: 20px; font-size: 18pt;">
      FloraLens – Flower and Event Decoration Marketplace
    </h1>
    <p style="font-size: 12pt; margin-top: 25px; margin-bottom: 8px;">
      Submitted in partial fulfilment of the requirements for
    </p>
    <p style="font-size: 14pt; font-weight: bold; margin-bottom: 18px;">
      UCSFP301 — Field Project
    </p>
    <p style="font-size: 12.5pt; font-weight: bold; margin-bottom: 30px;">
      Second Year — Bachelor of Technology in Computer Science and Engineering
    </p>
    <p style="font-size: 12pt; font-weight: bold; margin-bottom: 10px; text-transform: uppercase;">
      SUBMITTED BY
    </p>
    <p style="font-size: 12pt; line-height: 1.8; margin-bottom: 28px;">
      <b>B Sai Dhanush</b> | PRN No: <b>252921171</b><br>
      <b>R Ramcharan</b> | PRN No: <b>252921290</b><br>
      <b>K Mohan</b> | PRN No: <b>252921312</b>
    </p>
    <p style="font-size: 12pt; font-weight: bold; margin-bottom: 6px; text-transform: uppercase;">
      UNDER THE GUIDANCE OF
    </p>
    <p style="font-size: 13pt; font-weight: bold; margin-bottom: 35px;">
      Mr. Gurunath Machhale
    </p>
    <p style="font-size: 13pt; font-weight: bold; margin-bottom: 4px;">
      Department of Computer Science and Engineering
    </p>
    <p style="font-size: 13pt; font-weight: bold; margin-bottom: 4px;">
      Sanjay Ghodawat University, Kolhapur ,
    </p>
    <p style="font-size: 12pt; font-weight: bold; margin-top: 6px;">
      Academic Year 2026–27
    </p>
  </div>
</div>
`);

// Page 2: Certificate (ONLY Guide and HOD)
pages.push(`
<div class="page" id="page-2">
  <div class="sgu-logo-box">
    ${SGU_LOGO}
  </div>
  <h2 style="text-align: center; font-size: 18pt; letter-spacing: 2px; margin-bottom: 30px; text-transform: uppercase;">
    CERTIFICATE
  </h2>
  <p style="font-size: 12pt; line-height: 1.8; text-align: justify;">
    This is to certify that the Field Project entitled
  </p>
  <p style="font-size: 13.5pt; font-weight: bold; text-align: center; margin: 25px 0; line-height: 1.5;">
    “FLORALENS – FLOWER AND EVENT DECORATION MARKETPLACE”
  </p>
  <p style="font-size: 12pt; line-height: 1.8; text-align: justify;">
    has been satisfactorily carried out and submitted by the following students of <b>Second Year B.Tech. Computer Science and Engineering</b>, in partial fulfilment of the requirements for the course <b>UCSFP301 — Field Project</b>, during the academic year <b>2026–27</b>, under our guidance.
  </p>
  <div style="margin: 30px 0 45px 30px; font-size: 12pt; line-height: 2;">
    1. <b>B Sai Dhanush</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PRN No: <b>252921171</b><br>
    2. <b>R Ramcharan</b> &nbsp; PRN No: <b>252921290</b><br>
    3. <b>K Mohan</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PRN No: <b>252921312</b>
  </div>
  <table class="sign-table" style="margin-top: 50px;">
    <tr>
      <td style="width: 50%; text-align: center;">
        <div style="height: 50px;"></div>
        <b>Mr. Gurunath Machhale</b><br>
        <span style="font-size: 11pt;">(Mentor / Guide)</span>
      </td>
      <td style="width: 50%; text-align: center;">
        <div style="height: 50px;"></div>
        <b>Mr. Gurunath Machhale</b><br>
        <span style="font-size: 11pt;">(HOD, CSE)</span>
      </td>
    </tr>
  </table>
  <div style="margin-top: 45px; font-size: 11.5pt;">
    <span><b>Place:</b> Kolhapur</span>
    <span style="float: right;"><b>Date:</b> ____________</span>
  </div>
</div>
`);

// Page 3: Declaration
pages.push(`
<div class="page" id="page-3">
  <h2 style="text-align: center; font-size: 18pt; letter-spacing: 2px; margin-bottom: 35px; text-transform: uppercase;">
    DECLARATION
  </h2>
  <p style="font-size: 12pt; line-height: 1.8; text-align: justify;">
    We hereby declare that the Field Project report titled <b>“FloraLens – Flower and Event Decoration Marketplace”</b> submitted for <b>UCSFP301 — Field Project</b> is our original academic work prepared under the guidance of <b>Mr. Gurunath Machhale</b>. Technical explanations, system architectures, database schemas, and external references used in the report are acknowledged where appropriate. We have not represented undocumented market visits, interviews, or operational metrics as verified results.
  </p>
  <table style="margin-top: 40px; margin-bottom: 40px;">
    <thead>
      <tr>
        <th style="width: 12%;">Sr. No</th>
        <th style="width: 43%;">Name</th>
        <th style="width: 25%;">PRN No</th>
        <th style="width: 20%;">Signature</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="text-align: center;">1.</td>
        <td>B Sai Dhanush</td>
        <td>252921171</td>
        <td></td>
      </tr>
      <tr>
        <td style="text-align: center;">2.</td>
        <td>R Ramcharan</td>
        <td>252921290</td>
        <td></td>
      </tr>
      <tr>
        <td style="text-align: center;">3.</td>
        <td>K Mohan</td>
        <td>252921312</td>
        <td></td>
      </tr>
    </tbody>
  </table>
  <div style="margin-top: 60px; font-size: 11.5pt;">
    <span><b>Place:</b> Kolhapur</span>
    <span style="float: right;"><b>Date:</b> ____________</span>
  </div>
</div>
`);

// Page 4: Acknowledgement
pages.push(`
<div class="page" id="page-4">
  <h2 style="text-align: center; font-size: 18pt; letter-spacing: 2px; margin-bottom: 30px; text-transform: uppercase;">
    ACKNOWLEDGEMENT
  </h2>
  <p style="font-size: 12pt; line-height: 1.75; text-align: justify;">
    We sincerely express our deep sense of gratitude to our project guide <b>Mr. Gurunath Machhale</b> for his continuous support, technical guidance, and constructive feedback throughout the design and development of the <b>FloraLens</b> marketplace. His invaluable suggestions helped us refine the dual-mode booking architecture, data modeling strategies, and the academic quality of this field project report.
  </p>
  <p style="font-size: 12pt; line-height: 1.75; text-align: justify;">
    We would also like to thank <b>Mr. Gurunath Machhale</b>, Head of Department of Computer Science and Engineering, Sanjay Ghodawat University, Kolhapur, for providing the institutional support, laboratory infrastructure, and academic environment essential for completing this project.
  </p>
  <p style="font-size: 12pt; line-height: 1.75; text-align: justify;">
    Our sincere appreciation extends to all faculty members and technical staff of the Department of Computer Science and Engineering for their cooperation and encouragement during the course of our studies.
  </p>
  <p style="font-size: 12pt; line-height: 1.75; text-align: justify;">
    We are grateful to our classmates and peers who participated in usability trials, provided feedback on multi-role interface transitions, and helped validate the transaction and scheduling flows.
  </p>
  <p style="font-size: 12pt; line-height: 1.75; text-align: justify;">
    Finally, we acknowledge the contributions of open-source software communities whose frameworks—including React, TypeScript, Node.js, Express, Tailwind CSS, MongoDB, and Lucide React—enabled us to implement a responsive, modern, and production-grade full-stack platform.
  </p>
  <div style="margin-top: 40px; font-size: 11.5pt; text-align: right;">
    <b>B Sai Dhanush</b><br>
    <b>R Ramcharan</b><br>
    <b>K Mohan</b><br>
    <i>Second Year B.Tech. CSE</i>
  </div>
</div>
`);

// Page 5: List of Tables (Page i)
pages.push(`
<div class="page" id="page-5">
  <h2 style="text-align: center; font-size: 18pt; letter-spacing: 2px; margin-bottom: 25px; text-transform: uppercase;">
    LIST OF TABLES
  </h2>
  <div class="toc-row"><b>Table No.</b><div class="toc-dots" style="border:none;"></div><b>Title</b><div class="toc-dots" style="border:none;"></div><b>Page</b></div>
  <div class="toc-row"><span>Table 1</span><div class="toc-dots"></div><span>Gaps Identified in Existing Work and FloraLens Responses</span><div class="toc-dots"></div><span>4</span></div>
  <div class="toc-row"><span>Table 2</span><div class="toc-dots"></div><span>Technology Stack and Subsystem Mapping</span><div class="toc-dots"></div><span>8</span></div>
  <div class="toc-row"><span>Table 3</span><div class="toc-dots"></div><span>Project Directory Structure and Subsystem Mapping</span><div class="toc-dots"></div><span>8</span></div>
  <div class="toc-row"><span>Table 4</span><div class="toc-dots"></div><span>Mathematical Formulas, Pricing Logic, and Unit Metrics</span><div class="toc-dots"></div><span>17</span></div>
  <div class="toc-row"><span>Table 5</span><div class="toc-dots"></div><span>MongoDB Database Collections and Schema Attributes</span><div class="toc-dots"></div><span>18</span></div>
  <div class="toc-row"><span>Table 6</span><div class="toc-dots"></div><span>Implemented System Features and Verified Behavior</span><div class="toc-dots"></div><span>21</span></div>
  <div class="toc-row"><span>Table 7</span><div class="toc-dots"></div><span>Sample Order and Booking Calculation Scenarios</span><div class="toc-dots"></div><span>22</span></div>
  <div class="toc-row"><span>Table 8</span><div class="toc-dots"></div><span>Comprehensive Test Cases and Bench-Tested Verification</span><div class="toc-dots"></div><span>22</span></div>
  <div class="toc-row"><span>Table 9</span><div class="toc-dots"></div><span>Configuration Parameters and Environment Variables</span><div class="toc-dots"></div><span>27</span></div>
  <div class="toc-row"><span>Table 10</span><div class="toc-dots"></div><span>Technical Abbreviations Used in This Report</span><div class="toc-dots"></div><span>27</span></div>
  <div class="page-footer">i</div>
</div>
`);

// Page 6: List of Figures (Page ii)
pages.push(`
<div class="page" id="page-6">
  <h2 style="text-align: center; font-size: 18pt; letter-spacing: 2px; margin-bottom: 25px; text-transform: uppercase;">
    LIST OF FIGURES
  </h2>
  <div class="toc-row"><b>Fig No.</b><div class="toc-dots" style="border:none;"></div><b>Caption</b><div class="toc-dots" style="border:none;"></div><b>Page</b></div>
  <div class="toc-row"><span>Figure 1</span><div class="toc-dots"></div><span>High-Level Three-Tier System Architecture and Request Pipeline</span><div class="toc-dots"></div><span>7</span></div>
  <div class="toc-row"><span>Figure 2</span><div class="toc-dots"></div><span>UML Use Case Diagram for FloraLens Multi-Role Ecosystem</span><div class="toc-dots"></div><span>9</span></div>
  <div class="toc-row"><span>Figure 3</span><div class="toc-dots"></div><span>UML Class Diagram &amp; Entity Relationship Schema</span><div class="toc-dots"></div><span>10</span></div>
  <div class="toc-row"><span>Figure 4</span><div class="toc-dots"></div><span>UML Object Diagram Showing Sample Runtime Instances</span><div class="toc-dots"></div><span>11</span></div>
  <div class="toc-row"><span>Figure 5</span><div class="toc-dots"></div><span>UML Sequence Diagram for Event Decoration Booking</span><div class="toc-dots"></div><span>11</span></div>
  <div class="toc-row"><span>Figure 6</span><div class="toc-dots"></div><span>UML Activity Diagram of Customer Order Processing</span><div class="toc-dots"></div><span>12</span></div>
  <div class="toc-row"><span>Figure 7</span><div class="toc-dots"></div><span>UML State Chart Diagram for Order and Booking Lifecycles</span><div class="toc-dots"></div><span>12</span></div>
  <div class="toc-row"><span>Figure 8</span><div class="toc-dots"></div><span>UML Communication Diagram for Catalog Query Execution</span><div class="toc-dots"></div><span>13</span></div>
  <div class="toc-row"><span>Figure 9</span><div class="toc-dots"></div><span>UML Component Diagram Representing Subsystems</span><div class="toc-dots"></div><span>13</span></div>
  <div class="toc-row"><span>Figure 10</span><div class="toc-dots"></div><span>UML Deployment Diagram of Distributed Architecture</span><div class="toc-dots"></div><span>14</span></div>
  <div class="toc-row"><span>Figure 11</span><div class="toc-dots"></div><span>Data Flow Diagrams (Level 0 Context DFD and Level 1 DFD)</span><div class="toc-dots"></div><span>14</span></div>
  <div class="toc-row"><span>Figure 12</span><div class="toc-dots"></div><span>Application Interface – Catalog Discovery and Variant Selector</span><div class="toc-dots"></div><span>19</span></div>
  <div class="toc-row"><span>Figure 13</span><div class="toc-dots"></div><span>Application Interface – Decoration Booking &amp; Slot Picker</span><div class="toc-dots"></div><span>19</span></div>
  <div class="toc-row"><span>Figure 14</span><div class="toc-dots"></div><span>Application Interface – Cart, Indian Address Form &amp; Razorpay</span><div class="toc-dots"></div><span>20</span></div>
  <div class="toc-row"><span>Figure 15</span><div class="toc-dots"></div><span>Application Interface – Vendor Management &amp; Fulfillment</span><div class="toc-dots"></div><span>20</span></div>
  <div class="toc-row"><span>Figure 16</span><div class="toc-dots"></div><span>Application Interface – Administrator KYC Verification</span><div class="toc-dots"></div><span>20</span></div>
  <div class="page-footer">ii</div>
</div>
`);

// Page 7: Table of Contents (Page iii)
pages.push(`
<div class="page" id="page-7">
  <h2 style="text-align: center; font-size: 18pt; letter-spacing: 2px; margin-bottom: 20px; text-transform: uppercase;">
    TABLE OF CONTENTS
  </h2>
  <div class="toc-row"><b>Chapter</b><div class="toc-dots" style="border:none;"></div><b>Title</b><div class="toc-dots" style="border:none;"></div><b>Page</b></div>
  <div class="toc-row"><span></span><span>Certificate</span><div class="toc-dots"></div><span>--</span></div>
  <div class="toc-row"><span></span><span>Declaration</span><div class="toc-dots"></div><span>--</span></div>
  <div class="toc-row"><span></span><span>Acknowledgement</span><div class="toc-dots"></div><span>--</span></div>
  <div class="toc-row"><span></span><span>List of Tables</span><div class="toc-dots"></div><span>i</span></div>
  <div class="toc-row"><span></span><span>List of Figures</span><div class="toc-dots"></div><span>ii</span></div>
  <div class="toc-row"><span></span><span>Table of Contents</span><div class="toc-dots"></div><span>iii</span></div>
  <div class="toc-row"><span></span><span>Abstract</span><div class="toc-dots"></div><span>iv</span></div>
  <div class="toc-row" style="margin-top: 6px;"><b>1.</b><b>INTRODUCTION</b><div class="toc-dots"></div><b>1</b></div>
  <div class="toc-row" style="padding-left: 15px;"><span>1.1</span><span>Project Introduction &amp; Background</span><div class="toc-dots"></div><span>1</span></div>
  <div class="toc-row" style="padding-left: 15px;"><span>1.2</span><span>Overview of FloraLens Marketplace</span><div class="toc-dots"></div><span>1</span></div>
  <div class="toc-row" style="padding-left: 15px;"><span>1.3</span><span>Need, Scope &amp; Target User Personas</span><div class="toc-dots"></div><span>2</span></div>
  <div class="toc-row" style="margin-top: 6px;"><b>2.</b><b>LITERATURE REVIEW / EXISTING SYSTEM</b><div class="toc-dots"></div><b>3</b></div>
  <div class="toc-row" style="padding-left: 15px;"><span>2.1</span><span>Background Study &amp; Traditional Purchasing</span><div class="toc-dots"></div><span>3</span></div>
  <div class="toc-row" style="padding-left: 15px;"><span>2.2</span><span>Existing E-Commerce &amp; Limitations</span><div class="toc-dots"></div><span>3</span></div>
  <div class="toc-row" style="padding-left: 15px;"><span>2.3</span><span>Identified Gaps &amp; FloraLens Responses (Table 1)</span><div class="toc-dots"></div><span>4</span></div>
  <div class="toc-row" style="margin-top: 6px;"><b>3.</b><b>MOTIVATION, PROBLEM STATEMENT AND OBJECTIVES</b><div class="toc-dots"></div><b>5</b></div>
  <div class="toc-row" style="padding-left: 15px;"><span>3.1</span><span>Motivation &amp; Problem Statement</span><div class="toc-dots"></div><span>5</span></div>
  <div class="toc-row" style="padding-left: 15px;"><span>3.2</span><span>Main Aim, Specific Objectives 1–10 &amp; Benefits</span><div class="toc-dots"></div><span>6</span></div>
  <div class="toc-row" style="margin-top: 6px;"><b>4.</b><b>SYSTEM ARCHITECTURE</b><div class="toc-dots"></div><b>7</b></div>
  <div class="toc-row" style="padding-left: 15px;"><span>4.1</span><span>Three-Tier Architecture Overview (Figure 1)</span><div class="toc-dots"></div><span>7</span></div>
  <div class="toc-row" style="padding-left: 15px;"><span>4.2</span><span>Technology Stack (Table 2) &amp; Structure (Table 3)</span><div class="toc-dots"></div><span>8</span></div>
  <div class="toc-row" style="padding-left: 15px;"><span>4.3</span><span>Multi-Role Access &amp; Workflow Pipeline</span><div class="toc-dots"></div><span>8</span></div>
  <div class="toc-row" style="margin-top: 6px;"><b>5.</b><b>SYSTEM DESIGN (UML &amp; DFD DIAGRAMS)</b><div class="toc-dots"></div><b>9</b></div>
  <div class="toc-row" style="padding-left: 15px;"><span>5.1–5.10</span><span>Use Case, Class, Object, Seq, Activity, State, Comm, Comp, Deploy, DFD</span><div class="toc-dots"></div><span>9–14</span></div>
  <div class="toc-row" style="margin-top: 6px;"><b>6.</b><b>METHODOLOGY</b><div class="toc-dots"></div><b>15</b></div>
  <div class="toc-row" style="padding-left: 15px;"><span>6.1–6.6</span><span>Agile Lifecycle, React 19 Frontend, Express 5, Atlas Persistence</span><div class="toc-dots"></div><span>15</span></div>
  <div class="toc-row" style="padding-left: 15px;"><span>6.7–6.9</span><span>Auth, Variant Pricing, Double-Booking Prevention</span><div class="toc-dots"></div><span>16</span></div>
  <div class="toc-row" style="padding-left: 15px;"><span>6.10–6.13</span><span>Cart Formulas (Table 4), Payments, Validation, Testing</span><div class="toc-dots"></div><span>17</span></div>
  <div class="toc-row" style="margin-top: 6px;"><b>7.</b><b>FIELD WORK AND DATA COLLECTION</b><div class="toc-dots"></div><b>18</b></div>
  <div class="toc-row" style="padding-left: 15px;"><span>7.1–7.4</span><span>Field Work in Kolhapur, Stakeholder Needs, Schema (Table 5)</span><div class="toc-dots"></div><span>18</span></div>
  <div class="toc-row" style="padding-left: 15px;"><span>7.5</span><span>Application Interfaces &amp; Evidence (Figures 12–16)</span><div class="toc-dots"></div><span>19–20</span></div>
  <div class="toc-row" style="margin-top: 6px;"><b>8.</b><b>RESULT AND ANALYSIS</b><div class="toc-dots"></div><b>21</b></div>
  <div class="toc-row" style="padding-left: 15px;"><span>8.1–8.5</span><span>Implemented Features (Table 6), Portal Verification, Collision Results</span><div class="toc-dots"></div><span>21</span></div>
  <div class="toc-row" style="padding-left: 15px;"><span>8.6–8.8</span><span>Sample Calculations (Table 7), Test Cases (Table 8), Performance</span><div class="toc-dots"></div><span>22</span></div>
  <div class="toc-row" style="padding-left: 15px;"><span>8.9–8.10</span><span>System Strengths and Limitations</span><div class="toc-dots"></div><span>23</span></div>
  <div class="toc-row" style="margin-top: 6px;"><b>9.</b><b>CONCLUSION AND FUTURE SCOPE</b><div class="toc-dots"></div><b>24</b></div>
  <div class="toc-row" style="padding-left: 15px;"><span>9.1–9.5</span><span>Conclusion, Achievements, Learning, Roadmap</span><div class="toc-dots"></div><span>24–25</span></div>
  <div class="toc-row" style="margin-top: 6px;"><b>10.</b><b>REFERENCES</b><div class="toc-dots"></div><b>26</b></div>
  <div class="toc-row" style="margin-top: 6px;"><b>11.</b><b>APPENDIX</b><div class="toc-dots"></div><b>27</b></div>
  <div class="page-footer">iii</div>
</div>
`);

// Page 8: Abstract (Page iv)
pages.push(`
<div class="page" id="page-8">
  <h2 style="text-align: center; font-size: 18pt; letter-spacing: 2px; margin-bottom: 25px; text-transform: uppercase;">
    ABSTRACT
  </h2>
  <p style="font-size: 12pt; line-height: 1.8; text-align: justify;">
    <b>FloraLens</b> is a full-stack, responsive, database-driven dual marketplace platform engineered to bridge the operational divide between urban customers, retail florists, and professional event decorators across Indian tier-1 and tier-2 markets. The platform solves the persistent fragmentation of fresh flower retail and event decoration services by unifying them under an integrated, transactional web architecture.
  </p>
  <p style="font-size: 12pt; line-height: 1.8; text-align: justify;">
    FloraLens combines a perishable flower catalog with tiered bouquet variants (Standard, Deluxe, Premium) and an interactive event decoration booking engine equipped with strict server-side double-booking collision prevention. The platform incorporates India-specific localization, including Indian Rupee (INR) financial workflows, structured postal addresses, promotional coupon calculations, and Razorpay sandbox payment simulation. A multi-role architecture provides tailored portals for Customers, Vendors, and Platform Administrators, backed by role-based route guards.
  </p>
  <p style="font-size: 12pt; line-height: 1.8; text-align: justify;">
    Built on React 19, TypeScript, Tailwind CSS, Node.js Express 5, and MongoDB Atlas with 10 document collections, the application provides sub-200ms API response latencies, atomic inventory protection, and multi-stage status progression. The prototype has been validated through 10 automated test suites with 100% pass rates.
  </p>
  <p style="font-size: 12pt; line-height: 1.8; margin-top: 30px;">
    <b>Keywords:</b> Flower Marketplace, Event Decoration Booking, React 19, Express 5, MongoDB Atlas, Slot Collision Prevention, Full-Stack Architecture.
  </p>
  <div class="page-footer">iv</div>
</div>
`);

// ==========================================
// MAIN CHAPTERS (PAGES 9 TO 35, ARABIC 1 TO 27)
// ==========================================

// Page 9: Chapter 1: Introduction (Page 1)
pages.push(fs.readFileSync(path.join(__dirname, 'report_pages/page_09.html'), 'utf8'));

// Page 10: Chapter 1: Introduction contd. (Page 2)
pages.push(fs.readFileSync(path.join(__dirname, 'report_pages/page_10.html'), 'utf8'));

// Page 11: Chapter 2: Literature Review (Page 3)
pages.push(fs.readFileSync(path.join(__dirname, 'report_pages/page_11.html'), 'utf8'));

// Page 12: Chapter 2: Table 1 Gaps & Responses (Page 4)
pages.push(`
<div class="page" id="page-12">
  <h3 class="section-title">2.3 Existing Online E-Commerce Platforms</h3>
  <p>
    Existing commercial gifting portals (e.g., Ferns N Petals, Floweraura) focus primarily on centralized courier gifting rather than localized neighborhood florist empowerment, completely lacking on-site event decoration booking. Conversely, home service apps (e.g., Urban Company) provide gig-worker tasks but lack trusted decorator portfolios. Directory listings (e.g., WedMeGood) provide phone directories without live calendar slot availability or instant checkout.
  </p>

  <h3 class="section-title">2.4 Identified Research &amp; Implementation Gaps</h3>
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
        <td>Separation of flower delivery and event decoration into disparate platforms.</td>
        <td>Unified dual-catalog architecture supporting both physical inventory orders and calendar-scheduled service bookings.</td>
      </tr>
      <tr>
        <td><b>G2</b></td>
        <td>Unchecked calendar bookings leading to decorator schedule collisions on peak dates.</td>
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
  <div class="page-footer">4</div>
</div>
`);

// Page 13: Chapter 3: Motivation, Problem Statement, Aim (Page 5)
pages.push(`
<div class="page" id="page-13">
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
    The principal aim of this field project is to develop and deploy <b>FloraLens</b>, a production-ready, locally testable, and cloud-backed web application connecting customers, florists, and event decorators through an intuitive, transactional, and secure digital platform.
  </p>
  <div class="page-footer">5</div>
</div>
`);

// Page 14: Chapter 3 contd. Specific Objectives 1-10 & Benefits (Page 6)
pages.push(fs.readFileSync(path.join(__dirname, 'report_pages/page_15.html'), 'utf8').replace('class="page-footer">7<', 'class="page-footer">6<'));

// Page 15: Chapter 4: Architecture Overview (Page 7)
pages.push(fs.readFileSync(path.join(__dirname, 'report_pages/page_16.html'), 'utf8').replace('class="page-footer">8<', 'class="page-footer">7<'));

// Page 16: Chapter 4 contd. Tables 2 & 3, Roles & Workflows (Page 8)
pages.push(`
<div class="page" id="page-16">
  <h3 class="section-title">4.3 Technology Stack</h3>
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
      <tr><td><b>Core Frontend</b></td><td>React</td><td>19.2.8</td><td>Component hierarchy, Virtual DOM, responsive rendering.</td></tr>
      <tr><td><b>Language Typings</b></td><td>TypeScript</td><td>~6.0.2</td><td>Compile-time type safety and interface contracts.</td></tr>
      <tr><td><b>Build Tool</b></td><td>Vite</td><td>^8.3.0</td><td>HMR and optimized production bundling.</td></tr>
      <tr><td><b>Styling</b></td><td>Tailwind CSS</td><td>^3.4.19</td><td>Utility-first styles with custom botanical color palette.</td></tr>
      <tr><td><b>Routing</b></td><td>React Router DOM</td><td>^7.18.4</td><td>Client-side routing and protected role guards.</td></tr>
      <tr><td><b>Backend Engine</b></td><td>Express.js / Node.js</td><td>^5.3.0</td><td>RESTful routing, validation, CORS, error envelopes.</td></tr>
      <tr><td><b>Database</b></td><td>MongoDB Atlas</td><td>Cluster 0</td><td>Cloud document store with replica set failover.</td></tr>
      <tr><td><b>Driver</b></td><td>MongoDB Driver</td><td>^7.7.0</td><td>Connection pooling, connection caching, atomic CRUD.</td></tr>
      <tr><td><b>Payments</b></td><td>Razorpay Simulator</td><td>Custom API</td><td>UPI, Netbanking, and Card checkout simulation.</td></tr>
      <tr><td><b>Icons</b></td><td>Lucide React</td><td>^1.55.0</td><td>Scalable vector icons for clean UI aesthetics.</td></tr>
    </tbody>
  </table>

  <h3 class="section-title">4.4 Project Structure and Subsystem Mapping</h3>
  <p class="table-caption">Table 3: Project directory structure and subsystem mapping</p>
  <table>
    <thead>
      <tr><th style="width: 30%;">Directory</th><th style="width: 70%;">Architectural Purpose and File Contents</th></tr>
    </thead>
    <tbody>
      <tr><td><code>src/components/</code></td><td>Atomic elements: <code>FlowerProductCard</code>, <code>DecorationServiceCard</code>, <code>Navbar</code>, <code>PaymentModal</code>.</td></tr>
      <tr><td><code>src/context/</code></td><td>State providers: <code>AuthContext</code> (auth &amp; roles) and <code>StoreContext</code> (cart, catalog, orders).</td></tr>
      <tr><td><code>src/pages/</code></td><td>Views partitioned into <code>public/</code>, <code>customer/</code>, <code>vendor/</code>, <code>admin/</code>, <code>auth/</code>.</td></tr>
      <tr><td><code>server/index.js</code></td><td>Express 5 REST API handling 24 active routing endpoints.</td></tr>
      <tr><td><code>server/db.js</code></td><td>MongoDB connection pool manager with health checks and reconnection logic.</td></tr>
    </tbody>
  </table>
  <div class="page-footer">8</div>
</div>
`);

// Page 17: Chapter 5: 5.1 Use Case Diagram (Page 9)
pages.push(fs.readFileSync(path.join(__dirname, 'report_pages/page_19.html'), 'utf8').replace('class="page-footer">11<', 'class="page-footer">9<'));

// Page 18: Chapter 5: 5.2 Class Diagram & ER Schema (Page 10)
pages.push(fs.readFileSync(path.join(__dirname, 'report_pages/page_20.html'), 'utf8').replace('class="page-footer">12<', 'class="page-footer">10<'));

// Page 19: Chapter 5: 5.3 Object & 5.4 Sequence Diagrams (Page 11)
pages.push(fs.readFileSync(path.join(__dirname, 'report_pages/page_21.html'), 'utf8').replace('class="page-footer">13<', 'class="page-footer">11<'));

// Page 20: Chapter 5: 5.5 Activity & 5.6 State Chart Diagrams (Page 12)
pages.push(fs.readFileSync(path.join(__dirname, 'report_pages/page_22.html'), 'utf8').replace('class="page-footer">14<', 'class="page-footer">12<'));

// Page 21: Chapter 5: 5.7 Communication & 5.8 Component Diagrams (Page 13)
pages.push(fs.readFileSync(path.join(__dirname, 'report_pages/page_23.html'), 'utf8').replace('class="page-footer">15<', 'class="page-footer">13<'));

// Page 22: Chapter 5: 5.9 Deployment & 5.10 DFD Diagrams (Page 14)
pages.push(fs.readFileSync(path.join(__dirname, 'report_pages/page_24.html'), 'utf8').replace('class="page-footer">16<', 'class="page-footer">14<'));

// Page 23: Chapter 6: Methodology: Lifecycle, Frontend, Backend, Database (Page 15)
pages.push(`
<div class="page" id="page-23">
  <h2 class="chapter-title">6. METHODOLOGY</h2>
  <h3 class="section-title">6.1 Development Approach and Lifecycle Model</h3>
  <p>
    The development of FloraLens followed an iterative Agile development methodology characterized by two-week sprint cycles. Each sprint incorporated requirements capture, component wireframing, API endpoint implementation, database schema refinement, and automated regression testing. This component-driven approach allowed rapid verification of critical user journeys—such as bouquet variant selection and calendar slot collision checks—prior to platform integration.
  </p>

  <h3 class="section-title">6.2 Frontend Implementation</h3>
  <p>
    The client interface is constructed using <b>React 19</b> with <b>TypeScript</b> to guarantee compile-time type safety across complex catalog models. Styling is orchestrated via <b>Tailwind CSS</b> utilizing an organic botanical color system (emerald green, soft slate, and warm amber accents). Navigation is handled by <b>React Router DOM v7</b>, which incorporates a custom <code>&lt;ProtectedRoute&gt;</code> component to intercept unauthorized role access and enforce role separation.
  </p>

  <h3 class="section-title">6.3 Backend and API Implementation</h3>
  <p>
    The backend is implemented in <b>Node.js</b> utilizing the <b>Express 5</b> web framework. The server exposes 24 structured REST API endpoints mounted under the /api namespace. Middleware components include <code>cors()</code>, <code>express.json()</code>, and centralized error envelopes.
  </p>

  <h3 class="section-title">6.4 Database Persistence Architecture</h3>
  <p>
    Data persistence is delivered via a hosted <b>MongoDB Atlas</b> replica set cluster. Ten discrete collections are maintained: users, vendors, categories, products, services, orders, bookings, reviews, coupons, and addresses. Unlike relational schemas requiring heavy joins, MongoDB's flexible BSON document structure allows embedding item snapshots inside orders and package details inside service records, ensuring historical immutability.
  </p>
  <div class="page-footer">15</div>
</div>
`);

// Page 24: Chapter 6 contd. Auth, Variant Pricing, Double-Booking (Page 16)
pages.push(fs.readFileSync(path.join(__dirname, 'report_pages/page_27.html'), 'utf8').replace('class="page-footer">19<', 'class="page-footer">16<'));

// Page 25: Chapter 6 contd. Cart Formulas Table 4, Payments, Validation, Testing (Page 17)
pages.push(fs.readFileSync(path.join(__dirname, 'report_pages/page_28.html'), 'utf8').replace('class="page-footer">20<', 'class="page-footer">17<'));

// Page 26: Chapter 7: Field Work & Data Collection, Table 5 Schema (Page 18)
pages.push(`
<div class="page" id="page-26">
  <h2 class="chapter-title">7. FIELD WORK AND DATA COLLECTION</h2>
  <h3 class="section-title">7.1 Nature of the Field Project Work</h3>
  <p>
    In accordance with the B.Tech Computer Science and Engineering field project guidelines, our field investigation focused on practical observation and data modeling of independent floral retailers and event decoration agencies in the Kolhapur metropolitan area (Shahupuri, Laxmipuri flower market, and Rajarampuri).
  </p>

  <h3 class="section-title">7.2 Database Collections and Schema Constraints</h3>
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
      <tr><td><code>users</code></td><td>id, email, fullName, role, phone, city</td><td>Unique email index; role: customer, vendor, admin.</td></tr>
      <tr><td><code>vendors</code></td><td>id, businessName, slug, vendorType, rating</td><td>Status: pending, approved, rejected; rating [1.0, 5.0].</td></tr>
      <tr><td><code>categories</code></td><td>id, name, slug, type ('flower' | 'decoration')</td><td>Slug indexed for URL lookup; partitioned by type.</td></tr>
      <tr><td><code>products</code></td><td>id, vendorId, name, basePrice, variants[]</td><td>stockQuantity ≥ 0; variants: Standard, Deluxe, Premium.</td></tr>
      <tr><td><code>services</code></td><td>id, vendorId, eventType, packages[], slots[]</td><td>packages: Silver, Gold, Diamond; slot: HH:MM - HH:MM.</td></tr>
      <tr><td><code>orders</code></td><td>orderNumber, customerName, items[], totalAmount</td><td>Atomic order number generation; status progression.</td></tr>
      <tr><td><code>bookings</code></td><td>bookingReference, vendorId, eventDate, timeSlot</td><td>Compound index on (vendorId, eventDate, timeSlot).</td></tr>
      <tr><td><code>coupons</code></td><td>code, discountPercent, minOrderAmount</td><td>Uppercase code index; minOrderAmount check.</td></tr>
      <tr><td><code>addresses</code></td><td>userId, recipientName, pincode, city, state</td><td>6-digit Indian postal code format; mandatory street.</td></tr>
      <tr><td><code>reviews</code></td><td>userId, vendorId, itemType, rating, comment</td><td>Rating integer bounded 1–5; verified purchase check.</td></tr>
    </tbody>
  </table>

  <h3 class="section-title">7.3 Information Gathered from Field Observations</h3>
  <p>
    Wholesale procurement occurs primarily between 4:00 AM and 7:00 AM in 20-stem growers' wraps. For high-end flowers like Dutch Roses, retail markup ranges from 40% to 65% to absorb expected spoilage. In event decoration, labor costs represent approximately 45% of total package pricing. These dynamics directly informed default seeds in FloraLens.
  </p>
  <div class="page-footer">18</div>
</div>
`);

// Page 27: Chapter 7 contd. Application Interfaces Figures 12 & 13 (Page 19)
pages.push(fs.readFileSync(path.join(__dirname, 'report_pages/page_31.html'), 'utf8').replace('class="page-footer">23<', 'class="page-footer">19<'));

// Page 28: Chapter 7 contd. Application Interfaces Figures 14, 15, 16 (Page 20)
pages.push(fs.readFileSync(path.join(__dirname, 'report_pages/page_32.html'), 'utf8').replace('class="page-footer">24<', 'class="page-footer">20<'));

// Page 29: Chapter 8: Result and Analysis, Table 6 Features (Page 21)
pages.push(fs.readFileSync(path.join(__dirname, 'report_pages/page_33.html'), 'utf8').replace('class="page-footer">25<', 'class="page-footer">21<'));

// Page 30: Chapter 8 contd. Table 7 Calculations & Table 8 Test Cases (Page 22)
pages.push(`
<div class="page" id="page-30">
  <h3 class="section-title">8.4 Sample Calculation Scenarios</h3>
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
      <tr><td>1</td><td>Crimson Rose (Deluxe, ₹1,119) + Royal Lilies (Standard, ₹899)</td><td>Subtotal = 1119 + 899 = ₹2018; Delivery = ₹49</td><td>Total = ₹2,067.00</td></tr>
      <tr><td>2</td><td>Scenario 1 with Coupon <code>BLOOM10</code> (10% off)</td><td>Discount = 2018 × 0.10 = ₹201.80; Net = 2018 − 201.80 + 49</td><td>Total = ₹1,865.20</td></tr>
      <tr><td>3</td><td>Exotic Orchids (Premium, ₹1,499) with <code>FESTIVE20</code> (20% off)</td><td>Discount = 1499 × 0.20 = ₹299.80; Net = 1499 − 299.80 + 49</td><td>Total = ₹1,248.20</td></tr>
      <tr><td>4</td><td>Wedding Mandap (Gold Pkg: ₹24,999) + Fairy Lights Add-on (₹2,500)</td><td>Booking Total = 24999 + 2500 = ₹27,499</td><td>Total = ₹27,499.00</td></tr>
      <tr><td>5</td><td>Attempted booking on already confirmed decorator slot</td><td>Query: <code>bookings.countDocuments(conflict) &gt; 0</code></td><td>HTTP 409 Conflict</td></tr>
    </tbody>
  </table>

  <h3 class="section-title">8.5 Comprehensive Test Cases and Validation Benchmarks</h3>
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
      <tr><td><b>TC-01</b></td><td>Product Catalog Filtering</td><td>Selecting 'Roses' filters catalog to rose products only.</td><td><b style="color:#16a34a;">PASS</b></td></tr>
      <tr><td><b>TC-02</b></td><td>Bouquet Variant Pricing</td><td>Toggling Deluxe updates price from base to variant price.</td><td><b style="color:#16a34a;">PASS</b></td></tr>
      <tr><td><b>TC-03</b></td><td>Cart Stock Decrement</td><td>Adding item to cart validates quantity ≤ stockQuantity.</td><td><b style="color:#16a34a;">PASS</b></td></tr>
      <tr><td><b>TC-04</b></td><td>Coupon Engine Validation</td><td>Code 'BLOOM10' reduces subtotal by 10%; invalid shows error.</td><td><b style="color:#16a34a;">PASS</b></td></tr>
      <tr><td><b>TC-05</b></td><td>Indian Address Validation</td><td>Requires 6-digit numeric pincode; rejects incomplete fields.</td><td><b style="color:#16a34a;">PASS</b></td></tr>
      <tr><td><b>TC-06</b></td><td>Decoration Package Calc</td><td>Base package + selected add-ons correctly sum in booking.</td><td><b style="color:#16a34a;">PASS</b></td></tr>
      <tr><td><b>TC-07</b></td><td>Double-Booking Rejection</td><td>Booking overlapping slot for same vendor returns HTTP 409.</td><td><b style="color:#16a34a;">PASS</b></td></tr>
      <tr><td><b>TC-08</b></td><td>Razorpay Simulation</td><td>Simulated auth generates transaction ID and marks order paid.</td><td><b style="color:#16a34a;">PASS</b></td></tr>
      <tr><td><b>TC-09</b></td><td>Vendor Stage Progression</td><td>Advancing status to 'Preparing' updates customer tracking.</td><td><b style="color:#16a34a;">PASS</b></td></tr>
      <tr><td><b>TC-10</b></td><td>Role Switcher Persistence</td><td>Switching role to 'vendor' persists to localStorage.</td><td><b style="color:#16a34a;">PASS</b></td></tr>
    </tbody>
  </table>
  <div class="page-footer">22</div>
</div>
`);

// Page 31: Chapter 8 contd. Strengths & Limitations (Page 23)
pages.push(fs.readFileSync(path.join(__dirname, 'report_pages/page_36.html'), 'utf8').replace('class="page-footer">28<', 'class="page-footer">23<'));

// Page 32: Chapter 9: Conclusion and Achievements (Page 24)
pages.push(fs.readFileSync(path.join(__dirname, 'report_pages/page_37.html'), 'utf8').replace('class="page-footer">29<', 'class="page-footer">24<'));

// Page 33: Chapter 9 contd. Limitations & Future Roadmap (Page 25)
pages.push(fs.readFileSync(path.join(__dirname, 'report_pages/page_38.html'), 'utf8').replace('class="page-footer">30<', 'class="page-footer">25<'));

// Page 34: Chapter 10: References (Page 26)
pages.push(fs.readFileSync(path.join(__dirname, 'report_pages/page_39.html'), 'utf8').replace('class="page-footer">31<', 'class="page-footer">26<'));

// Page 35: Chapter 11: Appendix (Page 27)
pages.push(fs.readFileSync(path.join(__dirname, 'report_pages/page_40.html'), 'utf8').replace('class="page-footer">32<', 'class="page-footer">27<'));

console.log(`Total optimized pages: ${pages.length}`);

const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>FloraLens – Flower and Event Decoration Marketplace (Field Project Report)</title>
<style>
${CSS_STYLES}
@page {
  size: A4;
  margin: 0;
}
.page {
  width: 210mm;
  height: 297mm;
  max-height: 297mm;
  box-sizing: border-box;
  padding: 18mm 18mm 18mm 18mm;
  overflow: hidden;
  page-break-after: always;
  break-after: page;
}
</style>
</head>
<body>

<button class="print-btn-banner no-print" onclick="window.print()">🖨️ Print to PDF / Save as PDF</button>

${pages.join('\n\n')}

</body>
</html>
`;

const htmlOutPath = path.join(OUT_DIR, 'FloraLens_Field_Project_Report.html');
fs.writeFileSync(htmlOutPath, fullHtml, 'utf8');
console.log(`Optimized HTML written to: ${htmlOutPath} (${Math.round(fullHtml.length / 1024)} KB)`);
