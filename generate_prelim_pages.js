// generate_pages_content.js
// Exports the 40 pages content for FloraLens Field Project Report
import { SGU_LOGO } from './report_styles.js';
import * as DIAGRAMS from './report_diagrams.js';

export function getPreliminaryPages() {
  return [
    // Page 1: Cover Page
    `
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
    `,

    // Page 2: Certificate
    `
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
    `,

    // Page 3: Declaration
    `
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
    `,

    // Page 4: Acknowledgement
    `
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
    `,

    // Page 5: List of Tables (Page i)
    `
    <div class="page" id="page-5">
      <h2 style="text-align: center; font-size: 18pt; letter-spacing: 2px; margin-bottom: 25px; text-transform: uppercase;">
        LIST OF TABLES
      </h2>
      <div class="toc-row"><b>Table No.</b><div class="toc-dots" style="border:none;"></div><b>Title</b><div class="toc-dots" style="border:none;"></div><b>Page</b></div>
      <div class="toc-row"><span>Table 1</span><div class="toc-dots"></div><span>Gaps Identified in Existing Work and FloraLens Responses</span><div class="toc-dots"></div><span>5</span></div>
      <div class="toc-row"><span>Table 2</span><div class="toc-dots"></div><span>Technology Stack and Subsystem Mapping</span><div class="toc-dots"></div><span>9</span></div>
      <div class="toc-row"><span>Table 3</span><div class="toc-dots"></div><span>Project Directory Structure and Subsystem Mapping</span><div class="toc-dots"></div><span>9</span></div>
      <div class="toc-row"><span>Table 4</span><div class="toc-dots"></div><span>Mathematical Formulas, Pricing Logic, and Unit Metrics</span><div class="toc-dots"></div><span>20</span></div>
      <div class="toc-row"><span>Table 5</span><div class="toc-dots"></div><span>MongoDB Database Collections and Schema Attributes</span><div class="toc-dots"></div><span>22</span></div>
      <div class="toc-row"><span>Table 6</span><div class="toc-dots"></div><span>Implemented System Features and Verified Behavior</span><div class="toc-dots"></div><span>25</span></div>
      <div class="toc-row"><span>Table 7</span><div class="toc-dots"></div><span>Sample Order and Booking Calculation Scenarios</span><div class="toc-dots"></div><span>26</span></div>
      <div class="toc-row"><span>Table 8</span><div class="toc-dots"></div><span>Comprehensive Test Cases and Bench-Tested Verification</span><div class="toc-dots"></div><span>27</span></div>
      <div class="toc-row"><span>Table 9</span><div class="toc-dots"></div><span>Configuration Parameters and Environment Variables</span><div class="toc-dots"></div><span>32</span></div>
      <div class="toc-row"><span>Table 10</span><div class="toc-dots"></div><span>Technical Abbreviations Used in This Report</span><div class="toc-dots"></div><span>32</span></div>
      <div class="page-footer">i</div>
    </div>
    `,

    // Page 6: List of Figures (Page ii)
    `
    <div class="page" id="page-6">
      <h2 style="text-align: center; font-size: 18pt; letter-spacing: 2px; margin-bottom: 25px; text-transform: uppercase;">
        LIST OF FIGURES
      </h2>
      <div class="toc-row"><b>Fig No.</b><div class="toc-dots" style="border:none;"></div><b>Caption</b><div class="toc-dots" style="border:none;"></div><b>Page</b></div>
      <div class="toc-row"><span>Figure 1</span><div class="toc-dots"></div><span>High-Level Three-Tier System Architecture and Request Pipeline</span><div class="toc-dots"></div><span>8</span></div>
      <div class="toc-row"><span>Figure 2</span><div class="toc-dots"></div><span>UML Use Case Diagram for FloraLens Multi-Role Ecosystem</span><div class="toc-dots"></div><span>11</span></div>
      <div class="toc-row"><span>Figure 3</span><div class="toc-dots"></div><span>UML Class Diagram &amp; Entity Relationship Schema</span><div class="toc-dots"></div><span>12</span></div>
      <div class="toc-row"><span>Figure 4</span><div class="toc-dots"></div><span>UML Object Diagram Showing Sample Runtime Instances</span><div class="toc-dots"></div><span>13</span></div>
      <div class="toc-row"><span>Figure 5</span><div class="toc-dots"></div><span>UML Sequence Diagram for Event Decoration Booking</span><div class="toc-dots"></div><span>13</span></div>
      <div class="toc-row"><span>Figure 6</span><div class="toc-dots"></div><span>UML Activity Diagram of Customer Order Processing</span><div class="toc-dots"></div><span>14</span></div>
      <div class="toc-row"><span>Figure 7</span><div class="toc-dots"></div><span>UML State Chart Diagram for Order and Booking Lifecycles</span><div class="toc-dots"></div><span>14</span></div>
      <div class="toc-row"><span>Figure 8</span><div class="toc-dots"></div><span>UML Communication Diagram for Catalog Query Execution</span><div class="toc-dots"></div><span>15</span></div>
      <div class="toc-row"><span>Figure 9</span><div class="toc-dots"></div><span>UML Component Diagram Representing Subsystems</span><div class="toc-dots"></div><span>15</span></div>
      <div class="toc-row"><span>Figure 10</span><div class="toc-dots"></div><span>UML Deployment Diagram of Distributed Architecture</span><div class="toc-dots"></div><span>16</span></div>
      <div class="toc-row"><span>Figure 11</span><div class="toc-dots"></div><span>Data Flow Diagrams (Level 0 Context DFD and Level 1 DFD)</span><div class="toc-dots"></div><span>16</span></div>
      <div class="toc-row"><span>Figure 12</span><div class="toc-dots"></div><span>Application Interface – Catalog Discovery and Variant Selector</span><div class="toc-dots"></div><span>23</span></div>
      <div class="toc-row"><span>Figure 13</span><div class="toc-dots"></div><span>Application Interface – Decoration Booking &amp; Slot Picker</span><div class="toc-dots"></div><span>23</span></div>
      <div class="toc-row"><span>Figure 14</span><div class="toc-dots"></div><span>Application Interface – Cart, Indian Address Form &amp; Razorpay</span><div class="toc-dots"></div><span>24</span></div>
      <div class="toc-row"><span>Figure 15</span><div class="toc-dots"></div><span>Application Interface – Vendor Management &amp; Fulfillment</span><div class="toc-dots"></div><span>24</span></div>
      <div class="toc-row"><span>Figure 16</span><div class="toc-dots"></div><span>Application Interface – Administrator KYC Verification</span><div class="toc-dots"></div><span>24</span></div>
      <div class="page-footer">ii</div>
    </div>
    `,

    // Page 7: Table of Contents (Page iii)
    `
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
      <div class="toc-row" style="padding-left: 15px;"><span>1.1</span><span>Project Introduction</span><div class="toc-dots"></div><span>1</span></div>
      <div class="toc-row" style="padding-left: 15px;"><span>1.2</span><span>Background of the Project</span><div class="toc-dots"></div><span>1</span></div>
      <div class="toc-row" style="padding-left: 15px;"><span>1.3</span><span>Overview of FloraLens Marketplace</span><div class="toc-dots"></div><span>1</span></div>
      <div class="toc-row" style="padding-left: 15px;"><span>1.4</span><span>Need for the Project</span><div class="toc-dots"></div><span>2</span></div>
      <div class="toc-row" style="padding-left: 15px;"><span>1.5</span><span>Scope of the Project</span><div class="toc-dots"></div><span>2</span></div>
      <div class="toc-row" style="padding-left: 15px;"><span>1.6</span><span>Target User Personas</span><div class="toc-dots"></div><span>2</span></div>
      <div class="toc-row" style="margin-top: 6px;"><b>2.</b><b>LITERATURE REVIEW / EXISTING SYSTEM</b><div class="toc-dots"></div><b>3</b></div>
      <div class="toc-row" style="padding-left: 15px;"><span>2.1</span><span>Background Study</span><div class="toc-dots"></div><span>3</span></div>
      <div class="toc-row" style="padding-left: 15px;"><span>2.2</span><span>Traditional Flower Purchasing and In-Person Booking</span><div class="toc-dots"></div><span>3</span></div>
      <div class="toc-row" style="padding-left: 15px;"><span>2.3</span><span>Existing Online E-Commerce Aggregators</span><div class="toc-dots"></div><span>4</span></div>
      <div class="toc-row" style="padding-left: 15px;"><span>2.4</span><span>Limitations of Existing Systems</span><div class="toc-dots"></div><span>4</span></div>
      <div class="toc-row" style="padding-left: 15px;"><span>2.5</span><span>Identified Research and Implementation Gaps</span><div class="toc-dots"></div><span>5</span></div>
      <div class="toc-row" style="padding-left: 15px;"><span>2.6</span><span>How FloraLens Addresses These Gaps</span><div class="toc-dots"></div><span>5</span></div>
      <div class="toc-row" style="margin-top: 6px;"><b>3.</b><b>MOTIVATION, PROBLEM STATEMENT AND OBJECTIVES</b><div class="toc-dots"></div><b>6</b></div>
      <div class="toc-row" style="padding-left: 15px;"><span>3.1</span><span>Motivation</span><div class="toc-dots"></div><span>6</span></div>
      <div class="toc-row" style="padding-left: 15px;"><span>3.2</span><span>Problem Statement</span><div class="toc-dots"></div><span>6</span></div>
      <div class="toc-row" style="padding-left: 15px;"><span>3.3</span><span>Main Aim</span><div class="toc-dots"></div><span>6</span></div>
      <div class="toc-row" style="padding-left: 15px;"><span>3.4</span><span>Specific Objectives (1 to 10)</span><div class="toc-dots"></div><span>7</span></div>
      <div class="toc-row" style="padding-left: 15px;"><span>3.5</span><span>Expected Benefits</span><div class="toc-dots"></div><span>7</span></div>
      <div class="toc-row" style="margin-top: 6px;"><b>4.</b><b>SYSTEM ARCHITECTURE</b><div class="toc-dots"></div><b>8</b></div>
      <div class="toc-row" style="padding-left: 15px;"><span>4.1</span><span>Architecture Overview</span><div class="toc-dots"></div><span>8</span></div>
      <div class="toc-row" style="padding-left: 15px;"><span>4.2</span><span>Layers of the Architecture</span><div class="toc-dots"></div><span>8</span></div>
      <div class="toc-row" style="padding-left: 15px;"><span>4.3</span><span>Technology Stack</span><div class="toc-dots"></div><span>9</span></div>
      <div class="toc-row" style="padding-left: 15px;"><span>4.4</span><span>Project Components and Directory Structure</span><div class="toc-dots"></div><span>9</span></div>
      <div class="toc-row" style="padding-left: 15px;"><span>4.5</span><span>Multi-Role Ecosystem and Access Control</span><div class="toc-dots"></div><span>10</span></div>
      <div class="toc-row" style="padding-left: 15px;"><span>4.6</span><span>System Workflow and Request Pipeline</span><div class="toc-dots"></div><span>10</span></div>
      <div class="page-footer">iii</div>
    </div>
    `,

    // Page 8: Table of Contents (contd.) & Abstract (Page iv)
    `
    <div class="page" id="page-8">
      <div class="toc-row" style="margin-top: 2px;"><b>5.</b><b>SYSTEM DESIGN (UML &amp; DFD DIAGRAMS)</b><div class="toc-dots"></div><b>11</b></div>
      <div class="toc-row" style="padding-left: 15px;"><span>5.1 to 5.10</span><span>Use Case, Class, Object, Sequence, Activity, State, Comm, Comp, Deploy, DFD</span><div class="toc-dots"></div><span>11–16</span></div>
      <div class="toc-row" style="margin-top: 4px;"><b>6.</b><b>METHODOLOGY</b><div class="toc-dots"></div><b>17</b></div>
      <div class="toc-row" style="padding-left: 15px;"><span>6.1 to 6.13</span><span>Agile Lifecycle, React 19 Frontend, Express 5, Atlas, Conflict Checker, Payments</span><div class="toc-dots"></div><span>17–20</span></div>
      <div class="toc-row" style="margin-top: 4px;"><b>7.</b><b>FIELD WORK AND DATA COLLECTION</b><div class="toc-dots"></div><b>21</b></div>
      <div class="toc-row" style="padding-left: 15px;"><span>7.1 to 7.6</span><span>Field Study in Kolhapur, Schema Modeling, Implemented UI Evidence</span><div class="toc-dots"></div><span>21–24</span></div>
      <div class="toc-row" style="margin-top: 4px;"><b>8.</b><b>RESULT AND ANALYSIS</b><div class="toc-dots"></div><b>25</b></div>
      <div class="toc-row" style="padding-left: 15px;"><span>8.1 to 8.9</span><span>Module Results, Test Cases (10/10 Passed), Performance, Strengths &amp; Limitations</span><div class="toc-dots"></div><span>25–28</span></div>
      <div class="toc-row" style="margin-top: 4px;"><b>9.</b><b>CONCLUSION AND FUTURE SCOPE</b><div class="toc-dots"></div><b>29</b></div>
      <div class="toc-row" style="padding-left: 15px;"><span>9.1 to 9.5</span><span>Conclusion, Learning Outcomes, Limitations, Extended Features Roadmap</span><div class="toc-dots"></div><span>29–30</span></div>
      <div class="toc-row" style="margin-top: 4px;"><b>10.</b><b>REFERENCES</b><div class="toc-dots"></div><b>31</b></div>
      <div class="toc-row" style="margin-top: 4px;"><b>11.</b><b>APPENDIX</b><div class="toc-dots"></div><b>32</b></div>
      
      <hr style="margin: 15px 0 10px 0; border: 0.5px solid #cbd5e1;">

      <h2 style="text-align: center; font-size: 15pt; letter-spacing: 2px; margin-bottom: 8px; text-transform: uppercase;">
        ABSTRACT
      </h2>
      <p style="font-size: 11pt; line-height: 1.5; text-align: justify;">
        <b>FloraLens</b> is a full-stack, responsive, database-driven dual marketplace platform engineered to bridge the operational divide between urban customers, retail florists, and professional event decorators across Indian tier-1 and tier-2 markets. The platform solves the persistent fragmentation of fresh flower retail and event decoration services by unifying them under an integrated, transactional web architecture.
      </p>
      <p style="font-size: 11pt; line-height: 1.5; text-align: justify;">
        FloraLens combines a perishable flower catalog with tiered bouquet variants (Standard, Deluxe, Premium) and an interactive event decoration booking engine equipped with strict server-side double-booking collision prevention. The platform incorporates India-specific localization, including Indian Rupee (INR) financial workflows, structured postal addresses, promotional coupon calculations, and Razorpay sandbox payment simulation. A multi-role architecture provides tailored portals for Customers, Vendors, and Platform Administrators, backed by role-based route guards.
      </p>
      <p style="font-size: 11pt; line-height: 1.5; text-align: justify;">
        Built on React 19, TypeScript, Tailwind CSS, Node.js Express 5, and MongoDB Atlas with 10 document collections, the application provides sub-200ms API response latencies, atomic inventory protection, and multi-stage status progression. The prototype has been validated through 10 automated test suites with 100% pass rates.
      </p>
      <p style="font-size: 11pt; line-height: 1.5;">
        <b>Keywords:</b> Flower Marketplace, Event Decoration Booking, React 19, Express 5, MongoDB Atlas, Slot Collision Prevention, Full-Stack Architecture.
      </p>
      <div class="page-footer">iv</div>
    </div>
    `
  ];
}
