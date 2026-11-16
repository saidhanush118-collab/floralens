// build_complete_report.js
// Generates the comprehensive, academically formatted HTML report for FloraLens
// Following all guidelines from Field_Project_Report_Guidelines.pdf and Field Project Format.pdf

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.join(__dirname, 'FloraLens_Field_Project_Report');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Read styles and template components
console.log('Generating complete FloraLens Field Project Report HTML...');
