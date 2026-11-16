// build_full_report.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CSS_STYLES } from './report_styles.js';
import { getPreliminaryPages } from './generate_prelim_pages.js';
import { getCh1ToCh3Pages } from './generate_ch1_ch3.js';
import { getCh4ToCh5Pages } from './generate_ch4_ch5.js';
import { getCh6ToCh7Pages } from './generate_ch6_ch7.js';
import { getCh8ToCh11Pages } from './generate_ch8_ch11.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.join(__dirname, 'FloraLens_Field_Project_Report');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const prelimPages = getPreliminaryPages();
const ch1to3 = getCh1ToCh3Pages();
const ch4to5 = getCh4ToCh5Pages();
const ch6to7 = getCh6ToCh7Pages();
const ch8to11 = getCh8ToCh11Pages();

const allPages = [
  ...prelimPages,
  ...ch1to3,
  ...ch4to5,
  ...ch6to7,
  ...ch8to11
];

console.log(`Total report pages assembled: ${allPages.length}`);

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>FloraLens – Flower and Event Decoration Marketplace (Field Project Report)</title>
<style>
${CSS_STYLES}
</style>
</head>
<body>

<button class="print-btn-banner no-print" onclick="window.print()">🖨️ Print to PDF / Save as PDF</button>

${allPages.join('\n\n')}

</body>
</html>
`;

const htmlPath = path.join(OUT_DIR, 'FloraLens_Field_Project_Report.html');
fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log(`HTML report written successfully to: ${htmlPath} (${Math.round(htmlContent.length / 1024)} KB)`);
