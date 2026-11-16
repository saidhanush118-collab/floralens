import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.join(__dirname, 'FloraLens_Field_Project_Report');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

export const SGU_LOGO = `
<svg width="85" height="105" viewBox="0 0 120 150">
  <path d="M 10 10 L 110 10 L 110 90 Q 110 140 60 148 Q 10 140 10 90 Z" fill="#cc141c" stroke="#900d13" stroke-width="2"/>
  <polygon points="25,24 28,33 37,33 30,38 33,47 25,41 17,47 20,38 13,33 22,33" fill="#ffffff" />
  <polygon points="42,24 45,33 54,33 47,38 50,47 42,41 34,47 37,38 30,33 39,33" fill="#ffffff" />
  <polygon points="60,24 63,33 72,33 65,38 68,47 60,41 52,47 55,38 48,33 57,33" fill="#ffffff" />
  <polygon points="78,24 81,33 90,33 83,38 86,47 78,41 70,47 73,38 66,33 75,33" fill="#ffffff" />
  <polygon points="95,24 98,33 107,33 100,38 103,47 95,41 87,47 90,38 83,33 92,33" fill="#ffffff" />
  <text x="60" y="78" fill="#ffffff" font-family="'Arial Black', Arial, sans-serif" font-weight="900" font-size="28" text-anchor="middle">SGU</text>
  <circle cx="60" cy="112" r="14" fill="#ffffff" />
  <circle cx="60" cy="112" r="8" fill="#cc141c" />
</svg>
`;

export const CSS_STYLES = `
  @page {
    size: A4;
    margin: 18mm 18mm 18mm 18mm;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: "Times New Roman", Times, Georgia, serif;
    font-size: 12pt;
    line-height: 1.5;
    color: #111111;
    background-color: #f1f5f9;
    margin: 0;
    padding: 20px 0;
  }

  .page {
    width: 210mm;
    min-height: 297mm;
    height: 297mm;
    padding: 20mm 20mm 20mm 20mm;
    margin: 0 auto 15mm auto;
    background: #ffffff;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
    position: relative;
    page-break-after: always;
    break-after: page;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  @media print {
    body {
      background: none;
      padding: 0;
    }
    .page {
      width: 100%;
      height: 100%;
      min-height: 297mm;
      max-height: 297mm;
      margin: 0;
      padding: 18mm 18mm 18mm 18mm;
      box-shadow: none;
      page-break-after: always;
      break-after: page;
    }
    .no-print {
      display: none !important;
    }
  }

  h1, h2, h3, h4 {
    font-family: "Times New Roman", Times, serif;
    font-weight: bold;
    color: #000000;
    margin-top: 0.8em;
    margin-bottom: 0.35em;
  }

  h1.report-title {
    font-size: 18pt;
    text-align: center;
    line-height: 1.35;
    margin-top: 15px;
    margin-bottom: 25px;
    text-transform: uppercase;
  }

  h2.chapter-title {
    font-size: 16pt;
    border-bottom: 1.5px solid #111827;
    padding-bottom: 4px;
    margin-top: 10px;
    margin-bottom: 14px;
    text-transform: uppercase;
  }

  h3.section-title {
    font-size: 14pt;
    margin-top: 14px;
    margin-bottom: 6px;
  }

  h4.subsection-title {
    font-size: 12.5pt;
    margin-top: 10px;
    margin-bottom: 4px;
  }

  p {
    text-align: justify;
    text-justify: inter-word;
    margin-bottom: 0.75em;
    margin-top: 0;
    font-size: 12pt;
    line-height: 1.45;
  }

  .text-center { text-align: center; }
  .text-right { text-align: right; }
  .bold { font-weight: bold; }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0 14px 0;
    font-size: 10.5pt;
  }

  table, th, td {
    border: 1px solid #333333;
  }

  th {
    background-color: #f2f2f2;
    padding: 6px 8px;
    font-weight: bold;
    text-align: left;
  }

  td {
    padding: 5px 8px;
    vertical-align: top;
  }

  .table-caption {
    font-weight: bold;
    font-size: 10.5pt;
    margin-bottom: 4px;
    text-align: left;
  }

  .figure-container {
    text-align: center;
    margin: 10px 0 12px 0;
  }

  .figure-caption {
    font-size: 10pt;
    font-weight: bold;
    margin-top: 6px;
    text-align: center;
  }

  .toc-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    font-size: 11pt;
  }

  .toc-dots {
    flex-grow: 1;
    border-bottom: 1px dotted #444;
    margin: 0 8px 4px 8px;
  }

  .sgu-logo-box {
    text-align: center;
    margin-top: 5px;
    margin-bottom: 15px;
  }

  .sign-table {
    width: 100%;
    border: none;
    margin-top: 45px;
  }

  .sign-table td {
    border: none;
    text-align: center;
    vertical-align: bottom;
    padding: 10px;
  }

  .code-block {
    background-color: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    padding: 8px 10px;
    font-family: "Courier New", Courier, monospace;
    font-size: 9pt;
    white-space: pre-wrap;
    text-align: left;
    margin: 8px 0;
    line-height: 1.35;
  }

  .page-footer {
    margin-top: auto;
    padding-top: 10px;
    text-align: center;
    font-size: 11pt;
    color: #333333;
  }

  .print-btn-banner {
    position: fixed;
    top: 15px;
    right: 15px;
    background: #047857;
    color: white;
    padding: 12px 22px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    font-family: sans-serif;
    font-weight: bold;
    cursor: pointer;
    z-index: 9999;
    border: none;
  }
  .print-btn-banner:hover { background: #065f46; }
`;
