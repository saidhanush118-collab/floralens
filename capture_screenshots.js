import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8088;
const DIST_DIR = path.join(__dirname, 'dist');
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

// Create lightweight SPA static server
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  let filePath = path.join(DIST_DIR, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    // SPA fallback
    const indexHtml = path.join(DIST_DIR, 'index.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(indexHtml).pipe(res);
  }
});

server.listen(PORT, async () => {
  console.log(`Static SPA server running on http://localhost:${PORT}`);

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tempUserDir = path.join(__dirname, '.chrome-temp');

  const pages = [
    { name: '01_home', url: `http://localhost:${PORT}/` },
    { name: '02_shop_flowers', url: `http://localhost:${PORT}/flowers` },
    { name: '03_decorations', url: `http://localhost:${PORT}/decorations` },
    { name: '04_cart', url: `http://localhost:${PORT}/cart` },
    { name: '05_customer_orders', url: `http://localhost:${PORT}/customer/orders` },
    { name: '06_vendor_dashboard', url: `http://localhost:${PORT}/vendor` },
    { name: '07_admin_dashboard', url: `http://localhost:${PORT}/admin` }
  ];

  for (const page of pages) {
    const outFile = path.join(SCREENSHOT_DIR, `${page.name}.png`);
    console.log(`Capturing ${page.name} from ${page.url}...`);

    await new Promise((resolve) => {
      const args = [
        '--headless=new',
        '--no-sandbox',
        '--disable-gpu',
        `--user-data-dir=${tempUserDir}`,
        '--window-size=1280,850',
        `--screenshot=${outFile}`,
        page.url
      ];

      const child = spawn(chromePath, args);
      child.on('close', (code) => {
        console.log(`Captured ${page.name} (exit code ${code})`);
        resolve();
      });
      child.on('error', (err) => {
        console.error(`Error capturing ${page.name}:`, err.message);
        resolve();
      });
    });
  }

  console.log('All screenshots captured!');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});
