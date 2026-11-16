import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CSS_STYLES } from './report_styles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.join(__dirname, 'report_pages');
const OUT_DIR = path.join(__dirname, 'FloraLens_Field_Project_Report');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const pageFiles = fs.readdirSync(PAGES_DIR)
  .filter(f => f.startsWith('page_') && f.endsWith('.html'))
  .sort((a, b) => {
    const numA = parseInt(a.replace('page_', '').replace('.html', ''), 10);
    const numB = parseInt(b.replace('page_', '').replace('.html', ''), 10);
    return numA - numB;
  });

console.log(`Compiling ${pageFiles.length} pages into complete report HTML...`);

const pageContents = pageFiles.map(file => {
  return fs.readFileSync(path.join(PAGES_DIR, file), 'utf8').trim();
});

const fullHtml = `<!DOCTYPE html>
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

${pageContents.join('\n\n')}

</body>
</html>
`;

const outPath = path.join(OUT_DIR, 'FloraLens_Field_Project_Report.html');
fs.writeFileSync(outPath, fullHtml, 'utf8');
console.log(`FloraLens Field Project Report compiled successfully to: ${outPath} (${Math.round(fullHtml.length / 1024)} KB)`);
