// report_diagrams.js
// Vector SVG diagram generator for FloraLens Field Project Report

export const DIAGRAM_FIG1 = `
<svg width="620" height="230" viewBox="0 0 620 230" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="180" height="200" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
  <text x="100" y="32" font-family="'Times New Roman', serif" font-weight="bold" font-size="13" text-anchor="middle" fill="#15803d">PRESENTATION TIER</text>
  <rect x="25" y="45" width="150" height="35" rx="4" fill="#ffffff" stroke="#86efac"/>
  <text x="100" y="66" font-family="'Times New Roman', serif" font-size="11" text-anchor="middle">React 19 + TypeScript</text>
  <rect x="25" y="90" width="150" height="35" rx="4" fill="#ffffff" stroke="#86efac"/>
  <text x="100" y="111" font-family="'Times New Roman', serif" font-size="11" text-anchor="middle">Tailwind CSS + Lucide Icons</text>
  <rect x="25" y="135" width="150" height="35" rx="4" fill="#ffffff" stroke="#86efac"/>
  <text x="100" y="156" font-family="'Times New Roman', serif" font-size="11" text-anchor="middle">React Router v7 + Context API</text>
  <text x="100" y="195" font-family="'Times New Roman', serif" font-size="10" text-anchor="middle" fill="#4b5563">(Client Browser / SPA)</text>

  <!-- Arrow 1 -->
  <line x1="190" y1="100" x2="220" y2="100" stroke="#1f2937" stroke-width="2" marker-end="url(#arrowhead)"/>
  <line x1="220" y1="120" x2="190" y2="120" stroke="#1f2937" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="205" y="90" font-family="sans-serif" font-size="8" text-anchor="middle">HTTP/JSON</text>

  <rect x="220" y="10" width="180" height="200" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
  <text x="310" y="32" font-family="'Times New Roman', serif" font-weight="bold" font-size="13" text-anchor="middle" fill="#1d4ed8">APPLICATION TIER</text>
  <rect x="235" y="45" width="150" height="35" rx="4" fill="#ffffff" stroke="#93c5fd"/>
  <text x="310" y="66" font-family="'Times New Roman', serif" font-size="11" text-anchor="middle">Node.js + Express 5 REST API</text>
  <rect x="235" y="90" width="150" height="35" rx="4" fill="#ffffff" stroke="#93c5fd"/>
  <text x="310" y="111" font-family="'Times New Roman', serif" font-size="11" text-anchor="middle">Slot Conflict & Inventory Rules</text>
  <rect x="235" y="135" width="150" height="35" rx="4" fill="#ffffff" stroke="#93c5fd"/>
  <text x="310" y="156" font-family="'Times New Roman', serif" font-size="11" text-anchor="middle">Razorpay Sandbox Simulator</text>
  <text x="310" y="195" font-family="'Times New Roman', serif" font-size="10" text-anchor="middle" fill="#4b5563">(Backend Application Engine)</text>

  <!-- Arrow 2 -->
  <line x1="400" y1="100" x2="430" y2="100" stroke="#1f2937" stroke-width="2" marker-end="url(#arrowhead)"/>
  <line x1="430" y1="120" x2="400" y2="120" stroke="#1f2937" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="415" y="90" font-family="sans-serif" font-size="8" text-anchor="middle">TCP/Wire</text>

  <rect x="430" y="10" width="180" height="200" rx="8" fill="#fefce8" stroke="#ca8a04" stroke-width="1.5"/>
  <text x="520" y="32" font-family="'Times New Roman', serif" font-weight="bold" font-size="13" text-anchor="middle" fill="#a16207">PERSISTENCE TIER</text>
  <rect x="445" y="45" width="150" height="35" rx="4" fill="#ffffff" stroke="#fde047"/>
  <text x="520" y="66" font-family="'Times New Roman', serif" font-size="11" text-anchor="middle">MongoDB Atlas Cloud</text>
  <rect x="445" y="90" width="150" height="35" rx="4" fill="#ffffff" stroke="#fde047"/>
  <text x="520" y="111" font-family="'Times New Roman', serif" font-size="11" text-anchor="middle">10 Document Collections</text>
  <rect x="445" y="135" width="150" height="35" rx="4" fill="#ffffff" stroke="#fde047"/>
  <text x="520" y="156" font-family="'Times New Roman', serif" font-size="11" text-anchor="middle">Connection Pool & Indexes</text>
  <text x="520" y="195" font-family="'Times New Roman', serif" font-size="10" text-anchor="middle" fill="#4b5563">(Distributed Database Cluster)</text>

  <defs>
    <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <polygon points="0 0, 6 3, 0 6" fill="#1f2937"/>
    </marker>
  </defs>
</svg>
`;

export const DIAGRAM_FIG2 = `
<svg width="620" height="280" viewBox="0 0 620 280" xmlns="http://www.w3.org/2000/svg">
  <!-- Boundary Box -->
  <rect x="120" y="15" width="380" height="255" rx="10" fill="#f8fafc" stroke="#475569" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="310" y="35" font-family="'Times New Roman', serif" font-weight="bold" font-size="12" text-anchor="middle">FloraLens System Boundary</text>

  <!-- Actors -->
  <!-- Customer -->
  <circle cx="50" cy="80" r="14" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
  <line x1="50" y1="94" x2="50" y2="125" stroke="#0284c7" stroke-width="1.5"/>
  <line x1="30" y1="105" x2="70" y2="105" stroke="#0284c7" stroke-width="1.5"/>
  <line x1="50" y1="125" x2="35" y2="155" stroke="#0284c7" stroke-width="1.5"/>
  <line x1="50" y1="125" x2="65" y2="155" stroke="#0284c7" stroke-width="1.5"/>
  <text x="50" y="172" font-family="'Times New Roman', serif" font-weight="bold" font-size="11" text-anchor="middle">Customer</text>

  <!-- Vendor -->
  <circle cx="50" cy="200" r="14" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
  <line x1="50" y1="214" x2="50" y2="240" stroke="#d97706" stroke-width="1.5"/>
  <line x1="30" y1="222" x2="70" y2="222" stroke="#d97706" stroke-width="1.5"/>
  <line x1="50" y1="240" x2="35" y2="265" stroke="#d97706" stroke-width="1.5"/>
  <line x1="50" y1="240" x2="65" y2="265" stroke="#d97706" stroke-width="1.5"/>
  <text x="50" y="278" font-family="'Times New Roman', serif" font-weight="bold" font-size="11" text-anchor="middle">Vendor</text>

  <!-- Admin -->
  <circle cx="570" cy="130" r="14" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
  <line x1="570" y1="144" x2="570" y2="175" stroke="#dc2626" stroke-width="1.5"/>
  <line x1="550" y1="155" x2="590" y2="155" stroke="#dc2626" stroke-width="1.5"/>
  <line x1="570" y1="175" x2="555" y2="205" stroke="#dc2626" stroke-width="1.5"/>
  <line x1="570" y1="175" x2="585" y2="205" stroke="#dc2626" stroke-width="1.5"/>
  <text x="570" y="222" font-family="'Times New Roman', serif" font-weight="bold" font-size="11" text-anchor="middle">Admin</text>

  <!-- Use cases (Ovals) -->
  <ellipse cx="210" cy="65" rx="65" ry="18" fill="#ffffff" stroke="#2563eb" stroke-width="1.2"/>
  <text x="210" y="69" font-family="'Times New Roman', serif" font-size="10.5" text-anchor="middle">Browse Flowers & Decor</text>

  <ellipse cx="370" cy="65" rx="65" ry="18" fill="#ffffff" stroke="#2563eb" stroke-width="1.2"/>
  <text x="370" y="69" font-family="'Times New Roman', serif" font-size="10.5" text-anchor="middle">Book Event Decor Slot</text>

  <ellipse cx="210" cy="115" rx="65" ry="18" fill="#ffffff" stroke="#2563eb" stroke-width="1.2"/>
  <text x="210" y="119" font-family="'Times New Roman', serif" font-size="10.5" text-anchor="middle">Cart & Order Checkout</text>

  <ellipse cx="370" cy="115" rx="65" ry="18" fill="#ffffff" stroke="#2563eb" stroke-width="1.2"/>
  <text x="370" y="119" font-family="'Times New Roman', serif" font-size="10.5" text-anchor="middle">Track Order Status</text>

  <ellipse cx="210" cy="170" rx="65" ry="18" fill="#ffffff" stroke="#d97706" stroke-width="1.2"/>
  <text x="210" y="174" font-family="'Times New Roman', serif" font-size="10.5" text-anchor="middle">Manage Flower Inventory</text>

  <ellipse cx="370" cy="170" rx="65" ry="18" fill="#ffffff" stroke="#d97706" stroke-width="1.2"/>
  <text x="370" y="174" font-family="'Times New Roman', serif" font-size="10.5" text-anchor="middle">Accept / Reject Bookings</text>

  <ellipse cx="260" cy="225" rx="65" ry="18" fill="#ffffff" stroke="#d97706" stroke-width="1.2"/>
  <text x="260" y="229" font-family="'Times New Roman', serif" font-size="10.5" text-anchor="middle">Update Order Stages</text>

  <ellipse cx="400" cy="225" rx="65" ry="18" fill="#ffffff" stroke="#dc2626" stroke-width="1.2"/>
  <text x="400" y="229" font-family="'Times New Roman', serif" font-size="10.5" text-anchor="middle">Approve Vendors & KYC</text>

  <!-- Connectors -->
  <line x1="75" y1="85" x2="145" y2="65" stroke="#334155" stroke-width="1.2"/>
  <line x1="75" y1="95" x2="305" y2="65" stroke="#334155" stroke-width="1.2"/>
  <line x1="75" y1="105" x2="145" y2="115" stroke="#334155" stroke-width="1.2"/>
  <line x1="75" y1="115" x2="305" y2="115" stroke="#334155" stroke-width="1.2"/>

  <line x1="75" y1="195" x2="145" y2="170" stroke="#334155" stroke-width="1.2"/>
  <line x1="75" y1="210" x2="305" y2="170" stroke="#334155" stroke-width="1.2"/>
  <line x1="75" y1="225" x2="195" y2="225" stroke="#334155" stroke-width="1.2"/>

  <line x1="550" y1="145" x2="465" y2="225" stroke="#334155" stroke-width="1.2"/>
  <line x1="550" y1="135" x2="435" y2="170" stroke="#334155" stroke-width="1.2"/>
</svg>
`;

export const DIAGRAM_FIG3 = `
<svg width="620" height="260" viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg">
  <!-- User Class -->
  <rect x="10" y="10" width="130" height="105" fill="#f8fafc" stroke="#334155" stroke-width="1.2"/>
  <rect x="10" y="10" width="130" height="22" fill="#e2e8f0"/>
  <text x="75" y="25" font-family="'Times New Roman', serif" font-weight="bold" font-size="11" text-anchor="middle">User</text>
  <text x="15" y="45" font-family="'Courier New', monospace" font-size="8.5">+ id: String</text>
  <text x="15" y="58" font-family="'Courier New', monospace" font-size="8.5">+ email: String</text>
  <text x="15" y="71" font-family="'Courier New', monospace" font-size="8.5">+ role: UserRole</text>
  <text x="15" y="84" font-family="'Courier New', monospace" font-size="8.5">+ phone: String</text>
  <line x1="10" y1="90" x2="140" y2="90" stroke="#cbd5e1"/>
  <text x="15" y="102" font-family="'Courier New', monospace" font-size="8.5">+ switchRole()</text>

  <!-- VendorProfile Class -->
  <rect x="170" y="10" width="140" height="105" fill="#f8fafc" stroke="#334155" stroke-width="1.2"/>
  <rect x="170" y="10" width="140" height="22" fill="#e2e8f0"/>
  <text x="240" y="25" font-family="'Times New Roman', serif" font-weight="bold" font-size="11" text-anchor="middle">VendorProfile</text>
  <text x="175" y="45" font-family="'Courier New', monospace" font-size="8.5">+ id: String</text>
  <text x="175" y="58" font-family="'Courier New', monospace" font-size="8.5">+ businessName: String</text>
  <text x="175" y="71" font-family="'Courier New', monospace" font-size="8.5">+ vendorType: String</text>
  <text x="175" y="84" font-family="'Courier New', monospace" font-size="8.5">+ status: VendorStatus</text>
  <line x1="170" y1="90" x2="310" y2="90" stroke="#cbd5e1"/>
  <text x="175" y="102" font-family="'Courier New', monospace" font-size="8.5">+ updateStatus()</text>

  <!-- FlowerProduct Class -->
  <rect x="340" y="10" width="130" height="105" fill="#f8fafc" stroke="#334155" stroke-width="1.2"/>
  <rect x="340" y="10" width="130" height="22" fill="#e2e8f0"/>
  <text x="405" y="25" font-family="'Times New Roman', serif" font-weight="bold" font-size="11" text-anchor="middle">FlowerProduct</text>
  <text x="345" y="45" font-family="'Courier New', monospace" font-size="8.5">+ id: String</text>
  <text x="345" y="58" font-family="'Courier New', monospace" font-size="8.5">+ name: String</text>
  <text x="345" y="71" font-family="'Courier New', monospace" font-size="8.5">+ basePrice: Number</text>
  <text x="345" y="84" font-family="'Courier New', monospace" font-size="8.5">+ stockQty: Number</text>
  <line x1="340" y1="90" x2="470" y2="90" stroke="#cbd5e1"/>
  <text x="345" y="102" font-family="'Courier New', monospace" font-size="8.5">+ decrementStock()</text>

  <!-- DecorationService Class -->
  <rect x="490" y="10" width="120" height="105" fill="#f8fafc" stroke="#334155" stroke-width="1.2"/>
  <rect x="490" y="10" width="120" height="22" fill="#e2e8f0"/>
  <text x="550" y="25" font-family="'Times New Roman', serif" font-weight="bold" font-size="11" text-anchor="middle">DecorationService</text>
  <text x="495" y="45" font-family="'Courier New', monospace" font-size="8.5">+ id: String</text>
  <text x="495" y="58" font-family="'Courier New', monospace" font-size="8.5">+ eventType: String</text>
  <text x="495" y="71" font-family="'Courier New', monospace" font-size="8.5">+ packages: Package[]</text>
  <text x="495" y="84" font-family="'Courier New', monospace" font-size="8.5">+ slots: String[]</text>
  <line x1="490" y1="90" x2="610" y2="90" stroke="#cbd5e1"/>
  <text x="495" y="102" font-family="'Courier New', monospace" font-size="8.5">+ validateSlot()</text>

  <!-- FlowerOrder Class -->
  <rect x="90" y="145" width="150" height="105" fill="#f8fafc" stroke="#334155" stroke-width="1.2"/>
  <rect x="90" y="145" width="150" height="22" fill="#e2e8f0"/>
  <text x="165" y="160" font-family="'Times New Roman', serif" font-weight="bold" font-size="11" text-anchor="middle">FlowerOrder</text>
  <text x="95" y="180" font-family="'Courier New', monospace" font-size="8.5">+ orderNumber: String</text>
  <text x="95" y="193" font-family="'Courier New', monospace" font-size="8.5">+ items: OrderItem[]</text>
  <text x="95" y="206" font-family="'Courier New', monospace" font-size="8.5">+ totalAmount: Number</text>
  <text x="95" y="219" font-family="'Courier New', monospace" font-size="8.5">+ status: OrderStatus</text>
  <line x1="90" y1="225" x2="240" y2="225" stroke="#cbd5e1"/>
  <text x="95" y="238" font-family="'Courier New', monospace" font-size="8.5">+ transitionStatus()</text>

  <!-- DecorationBooking Class -->
  <rect x="360" y="145" width="160" height="105" fill="#f8fafc" stroke="#334155" stroke-width="1.2"/>
  <rect x="360" y="145" width="160" height="22" fill="#e2e8f0"/>
  <text x="440" y="160" font-family="'Times New Roman', serif" font-weight="bold" font-size="11" text-anchor="middle">DecorationBooking</text>
  <text x="365" y="180" font-family="'Courier New', monospace" font-size="8.5">+ bookingRef: String</text>
  <text x="365" y="193" font-family="'Courier New', monospace" font-size="8.5">+ eventDate: String</text>
  <text x="365" y="206" font-family="'Courier New', monospace" font-size="8.5">+ timeSlot: String</text>
  <text x="365" y="219" font-family="'Courier New', monospace" font-size="8.5">+ status: BookingStatus</text>
  <line x1="360" y1="225" x2="520" y2="225" stroke="#cbd5e1"/>
  <text x="365" y="238" font-family="'Courier New', monospace" font-size="8.5">+ checkSlotConflict()</text>

  <!-- Associations -->
  <line x1="140" y1="50" x2="170" y2="50" stroke="#334155" stroke-width="1.2"/>
  <text x="155" y="44" font-family="sans-serif" font-size="8">1:1</text>

  <line x1="310" y1="50" x2="340" y2="50" stroke="#334155" stroke-width="1.2"/>
  <text x="325" y="44" font-family="sans-serif" font-size="8">1:N</text>

  <line x1="310" y1="75" x2="490" y2="75" stroke="#334155" stroke-width="1.2"/>
  <text x="480" y="70" font-family="sans-serif" font-size="8">1:N</text>

  <line x1="75" y1="115" x2="115" y2="145" stroke="#334155" stroke-width="1.2"/>
  <text x="85" y="135" font-family="sans-serif" font-size="8">1:N</text>

  <line x1="140" y1="110" x2="380" y2="145" stroke="#334155" stroke-width="1.2"/>
  <text x="240" y="130" font-family="sans-serif" font-size="8">1:N</text>
</svg>
`;

export const DIAGRAM_FIG4 = `
<svg width="600" height="150" viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="15" width="260" height="120" rx="6" fill="#f8fafc" stroke="#0284c7" stroke-width="1.5"/>
  <text x="150" y="35" font-family="'Courier New', monospace" font-weight="bold" font-size="10.5" text-anchor="middle">ord1 : FlowerOrder</text>
  <line x1="20" y1="42" x2="280" y2="42" stroke="#bae6fd"/>
  <text x="30" y="60" font-family="'Courier New', monospace" font-size="9">orderNumber = "ORD-2026-9104"</text>
  <text x="30" y="75" font-family="'Courier New', monospace" font-size="9">customer = "B Sai Dhanush"</text>
  <text x="30" y="90" font-family="'Courier New', monospace" font-size="9">item = "Crimson Rose Bouquet (Deluxe)"</text>
  <text x="30" y="105" font-family="'Courier New', monospace" font-size="9">totalAmount = 1499.00 INR</text>
  <text x="30" y="120" font-family="'Courier New', monospace" font-size="9">status = "confirmed"</text>

  <rect x="320" y="15" width="260" height="120" rx="6" fill="#f8fafc" stroke="#d97706" stroke-width="1.5"/>
  <text x="450" y="35" font-family="'Courier New', monospace" font-weight="bold" font-size="10.5" text-anchor="middle">bk1 : DecorationBooking</text>
  <line x1="320" y1="42" x2="580" y2="42" stroke="#fde68a"/>
  <text x="330" y="60" font-family="'Courier New', monospace" font-size="9">bookingRef = "BKG-2026-4402"</text>
  <text x="330" y="75" font-family="'Courier New', monospace" font-size="9">service = "Pastel Balloon Arch Birthday"</text>
  <text x="330" y="90" font-family="'Courier New', monospace" font-size="9">eventDate = "2026-12-15"</text>
  <text x="330" y="105" font-family="'Courier New', monospace" font-size="9">timeSlot = "16:00 - 20:00"</text>
  <text x="330" y="120" font-family="'Courier New', monospace" font-size="9">status = "confirmed"</text>
</svg>
`;

export const DIAGRAM_FIG5 = `
<svg width="620" height="230" viewBox="0 0 620 230" xmlns="http://www.w3.org/2000/svg">
  <!-- Lifelines -->
  <rect x="30" y="10" width="80" height="25" fill="#e2e8f0" stroke="#475569" rx="4"/>
  <text x="70" y="27" font-family="'Times New Roman', serif" font-size="11" text-anchor="middle">Customer</text>
  <line x1="70" y1="35" x2="70" y2="220" stroke="#94a3b8" stroke-dasharray="3,3"/>

  <rect x="160" y="10" width="90" height="25" fill="#e2e8f0" stroke="#475569" rx="4"/>
  <text x="205" y="27" font-family="'Times New Roman', serif" font-size="11" text-anchor="middle">BookingPage</text>
  <line x1="205" y1="35" x2="205" y2="220" stroke="#94a3b8" stroke-dasharray="3,3"/>

  <rect x="295" y="10" width="90" height="25" fill="#e2e8f0" stroke="#475569" rx="4"/>
  <text x="340" y="27" font-family="'Times New Roman', serif" font-size="11" text-anchor="middle">StoreContext</text>
  <line x1="340" y1="35" x2="340" y2="220" stroke="#94a3b8" stroke-dasharray="3,3"/>

  <rect x="425" y="10" width="80" height="25" fill="#e2e8f0" stroke="#475569" rx="4"/>
  <text x="465" y="27" font-family="'Times New Roman', serif" font-size="11" text-anchor="middle">Express API</text>
  <line x1="465" y1="35" x2="465" y2="220" stroke="#94a3b8" stroke-dasharray="3,3"/>

  <rect x="535" y="10" width="75" height="25" fill="#e2e8f0" stroke="#475569" rx="4"/>
  <text x="572" y="27" font-family="'Times New Roman', serif" font-size="11" text-anchor="middle">MongoDB</text>
  <line x1="572" y1="35" x2="572" y2="220" stroke="#94a3b8" stroke-dasharray="3,3"/>

  <!-- Messages -->
  <line x1="70" y1="60" x2="205" y2="60" stroke="#1e293b" stroke-width="1.2" marker-end="url(#arr)"/>
  <text x="135" y="55" font-family="sans-serif" font-size="8.5" text-anchor="middle">1: Select package, date, slot</text>

  <line x1="205" y1="85" x2="340" y2="85" stroke="#1e293b" stroke-width="1.2" marker-end="url(#arr)"/>
  <text x="272" y="80" font-family="sans-serif" font-size="8.5" text-anchor="middle">2: createDecorationBooking()</text>

  <line x1="340" y1="110" x2="465" y2="110" stroke="#1e293b" stroke-width="1.2" marker-end="url(#arr)"/>
  <text x="402" y="105" font-family="sans-serif" font-size="8.5" text-anchor="middle">3: POST /api/bookings</text>

  <line x1="465" y1="135" x2="572" y2="135" stroke="#1e293b" stroke-width="1.2" marker-end="url(#arr)"/>
  <text x="518" y="130" font-family="sans-serif" font-size="8.5" text-anchor="middle">4: Query existing slot</text>

  <line x1="572" y1="155" x2="465" y2="155" stroke="#64748b" stroke-width="1" stroke-dasharray="3,2" marker-end="url(#arr)"/>
  <text x="518" y="150" font-family="sans-serif" font-size="8.5" text-anchor="middle">5: Slot available (count=0)</text>

  <line x1="465" y1="180" x2="340" y2="180" stroke="#64748b" stroke-width="1" stroke-dasharray="3,2" marker-end="url(#arr)"/>
  <text x="402" y="175" font-family="sans-serif" font-size="8.5" text-anchor="middle">6: 201 Created booking</text>

  <line x1="340" y1="200" x2="70" y2="200" stroke="#16a34a" stroke-width="1.2" stroke-dasharray="3,2" marker-end="url(#arr)"/>
  <text x="200" y="195" font-family="sans-serif" font-size="8.5" text-anchor="middle" fill="#15803d">7: Render Booking Confirmation Timeline</text>

  <defs>
    <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <polygon points="0 0, 6 3, 0 6" fill="#1e293b"/>
    </marker>
  </defs>
</svg>
`;

export const DIAGRAM_FIG6 = `
<svg width="600" height="200" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="35" cy="100" r="10" fill="#000000"/>
  <line x1="45" y1="100" x2="75" y2="100" stroke="#333" stroke-width="1.5" marker-end="url(#arr)"/>

  <rect x="75" y="80" width="90" height="40" rx="6" fill="#f1f5f9" stroke="#475569"/>
  <text x="120" y="104" font-family="'Times New Roman', serif" font-size="10" text-anchor="middle">Add to Cart</text>
  <line x1="165" y1="100" x2="195" y2="100" stroke="#333" stroke-width="1.5" marker-end="url(#arr)"/>

  <!-- Decision -->
  <polygon points="215,80 245,100 215,120 185,100" fill="#fef9c3" stroke="#ca8a04"/>
  <text x="215" y="103" font-family="sans-serif" font-size="7.5" text-anchor="middle">In Stock?</text>

  <!-- No branch -->
  <line x1="215" y1="80" x2="215" y2="45" stroke="#dc2626" stroke-width="1.2"/>
  <line x1="215" y1="45" x2="280" y2="45" stroke="#dc2626" stroke-width="1.2" marker-end="url(#arr)"/>
  <rect x="280" y="30" width="90" height="30" rx="4" fill="#fee2e2" stroke="#dc2626"/>
  <text x="325" y="49" font-family="'Times New Roman', serif" font-size="9" text-anchor="middle" fill="#991b1b">Show Stock Alert</text>

  <!-- Yes branch -->
  <line x1="245" y1="100" x2="280" y2="100" stroke="#16a34a" stroke-width="1.2" marker-end="url(#arr)"/>
  <rect x="280" y="80" width="95" height="40" rx="6" fill="#f1f5f9" stroke="#475569"/>
  <text x="327" y="98" font-family="'Times New Roman', serif" font-size="9.5" text-anchor="middle">Enter Address &</text>
  <text x="327" y="110" font-family="'Times New Roman', serif" font-size="9.5" text-anchor="middle">Apply Coupon</text>
  <line x1="375" y1="100" x2="405" y2="100" stroke="#333" stroke-width="1.5" marker-end="url(#arr)"/>

  <rect x="405" y="80" width="95" height="40" rx="6" fill="#f1f5f9" stroke="#475569"/>
  <text x="452" y="98" font-family="'Times New Roman', serif" font-size="9.5" text-anchor="middle">Razorpay Sandbox</text>
  <text x="452" y="110" font-family="'Times New Roman', serif" font-size="9.5" text-anchor="middle">Payment Success</text>
  <line x1="500" y1="100" x2="535" y2="100" stroke="#333" stroke-width="1.5" marker-end="url(#arr)"/>

  <!-- Final Node -->
  <circle cx="550" cy="100" r="12" fill="#ffffff" stroke="#000000" stroke-width="1.5"/>
  <circle cx="550" cy="100" r="8" fill="#000000"/>
  <text x="550" y="128" font-family="'Times New Roman', serif" font-size="9" text-anchor="middle">Order Placed</text>
</svg>
`;

export const DIAGRAM_FIG7 = `
<svg width="600" height="150" viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg">
  <circle cx="25" cy="75" r="9" fill="#000"/>
  <line x1="34" y1="75" x2="60" y2="75" stroke="#333" stroke-width="1.2" marker-end="url(#arr)"/>

  <rect x="60" y="55" width="85" height="38" rx="6" fill="#e0f2fe" stroke="#0284c7"/>
  <text x="102" y="78" font-family="'Times New Roman', serif" font-size="10.5" text-anchor="middle">Pending</text>
  <line x1="145" y1="75" x2="175" y2="75" stroke="#333" stroke-width="1.2" marker-end="url(#arr)"/>

  <rect x="175" y="55" width="85" height="38" rx="6" fill="#fef3c7" stroke="#d97706"/>
  <text x="217" y="78" font-family="'Times New Roman', serif" font-size="10.5" text-anchor="middle">Confirmed</text>
  <line x1="260" y1="75" x2="290" y2="75" stroke="#333" stroke-width="1.2" marker-end="url(#arr)"/>

  <rect x="290" y="55" width="85" height="38" rx="6" fill="#f3e8ff" stroke="#9333ea"/>
  <text x="332" y="78" font-family="'Times New Roman', serif" font-size="10.5" text-anchor="middle">Preparing</text>
  <line x1="375" y1="75" x2="405" y2="75" stroke="#333" stroke-width="1.2" marker-end="url(#arr)"/>

  <rect x="405" y="55" width="90" height="38" rx="6" fill="#dbeafe" stroke="#2563eb"/>
  <text x="450" y="78" font-family="'Times New Roman', serif" font-size="10.5" text-anchor="middle">Out for Delivery</text>
  <line x1="495" y1="75" x2="525" y2="75" stroke="#333" stroke-width="1.2" marker-end="url(#arr)"/>

  <circle cx="545" cy="75" r="13" fill="#ffffff" stroke="#16a34a" stroke-width="2"/>
  <circle cx="545" cy="75" r="8" fill="#16a34a"/>
  <text x="545" y="105" font-family="'Times New Roman', serif" font-size="9" text-anchor="middle" fill="#15803d">Delivered</text>
</svg>
`;

export const DIAGRAM_FIG8 = `
<svg width="600" height="150" viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg">
  <rect x="30" y="50" width="120" height="50" rx="6" fill="#f8fafc" stroke="#334155"/>
  <text x="90" y="78" font-family="'Times New Roman', serif" font-size="11" text-anchor="middle">:CustomerUI</text>

  <rect x="240" y="50" width="130" height="50" rx="6" fill="#f8fafc" stroke="#334155"/>
  <text x="305" y="78" font-family="'Times New Roman', serif" font-size="11" text-anchor="middle">:StoreContext</text>

  <rect x="450" y="50" width="120" height="50" rx="6" fill="#f8fafc" stroke="#334155"/>
  <text x="510" y="78" font-family="'Times New Roman', serif" font-size="11" text-anchor="middle">:MongoDbApi</text>

  <line x1="150" y1="75" x2="240" y2="75" stroke="#1e293b" stroke-width="1.5"/>
  <text x="195" y="65" font-family="sans-serif" font-size="8" text-anchor="middle">1: searchFlowers() &gt;</text>

  <line x1="370" y1="75" x2="450" y2="75" stroke="#1e293b" stroke-width="1.5"/>
  <text x="410" y="65" font-family="sans-serif" font-size="8" text-anchor="middle">2: fetchProducts() &gt;</text>
  <text x="410" y="92" font-family="sans-serif" font-size="8" text-anchor="middle">&lt; 3: return JSON</text>
</svg>
`;

export const DIAGRAM_FIG9 = `
<svg width="600" height="180" viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="20" width="160" height="135" rx="6" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.2"/>
  <text x="100" y="42" font-family="'Times New Roman', serif" font-weight="bold" font-size="11.5" text-anchor="middle">&lt;&lt;component&gt;&gt;</text>
  <text x="100" y="58" font-family="'Times New Roman', serif" font-weight="bold" font-size="11.5" text-anchor="middle">Client UI Modules</text>
  <rect x="35" y="70" width="130" height="24" fill="#fff" stroke="#86efac"/>
  <text x="100" y="86" font-family="sans-serif" font-size="9" text-anchor="middle">Customer Portal</text>
  <rect x="35" y="100" width="130" height="24" fill="#fff" stroke="#86efac"/>
  <text x="100" y="116" font-family="sans-serif" font-size="9" text-anchor="middle">Vendor Management</text>
  <rect x="35" y="130" width="130" height="20" fill="#fff" stroke="#86efac"/>
  <text x="100" y="144" font-family="sans-serif" font-size="9" text-anchor="middle">Admin Moderation</text>

  <line x1="180" y1="87" x2="220" y2="87" stroke="#333" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arr)"/>

  <rect x="220" y="20" width="170" height="135" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="1.2"/>
  <text x="305" y="42" font-family="'Times New Roman', serif" font-weight="bold" font-size="11.5" text-anchor="middle">&lt;&lt;component&gt;&gt;</text>
  <text x="305" y="58" font-family="'Times New Roman', serif" font-weight="bold" font-size="11.5" text-anchor="middle">Express Controller</text>
  <rect x="235" y="70" width="140" height="24" fill="#fff" stroke="#93c5fd"/>
  <text x="305" y="86" font-family="sans-serif" font-size="9" text-anchor="middle">Order Fulfillment Router</text>
  <rect x="235" y="100" width="140" height="24" fill="#fff" stroke="#93c5fd"/>
  <text x="305" y="116" font-family="sans-serif" font-size="9" text-anchor="middle">Slot Conflict Validator</text>

  <line x1="390" y1="87" x2="430" y2="87" stroke="#333" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arr)"/>

  <rect x="430" y="20" width="150" height="135" rx="6" fill="#fefce8" stroke="#ca8a04" stroke-width="1.2"/>
  <text x="505" y="42" font-family="'Times New Roman', serif" font-weight="bold" font-size="11.5" text-anchor="middle">&lt;&lt;component&gt;&gt;</text>
  <text x="505" y="58" font-family="'Times New Roman', serif" font-weight="bold" font-size="11.5" text-anchor="middle">Data Access Engine</text>
  <rect x="445" y="70" width="120" height="24" fill="#fff" stroke="#fde047"/>
  <text x="505" y="86" font-family="sans-serif" font-size="9" text-anchor="middle">MongoDB Connection</text>
  <rect x="445" y="100" width="120" height="24" fill="#fff" stroke="#fde047"/>
  <text x="505" y="116" font-family="sans-serif" font-size="9" text-anchor="middle">Collection Drivers</text>
</svg>
`;

export const DIAGRAM_FIG10 = `
<svg width="600" height="160" viewBox="0 0 600 160" xmlns="http://www.w3.org/2000/svg">
  <!-- Client Device Node -->
  <polygon points="20,15 35,5 185,5 170,15" fill="#e2e8f0" stroke="#475569"/>
  <polygon points="170,15 185,5 185,135 170,145" fill="#cbd5e1" stroke="#475569"/>
  <rect x="20" y="15" width="150" height="130" fill="#f8fafc" stroke="#475569" stroke-width="1.2"/>
  <text x="95" y="38" font-family="'Times New Roman', serif" font-weight="bold" font-size="11" text-anchor="middle">&lt;&lt;device&gt;&gt;</text>
  <text x="95" y="52" font-family="'Times New Roman', serif" font-size="11" text-anchor="middle">Client Browser</text>
  <rect x="30" y="65" width="130" height="35" rx="3" fill="#fff" stroke="#94a3b8"/>
  <text x="95" y="87" font-family="sans-serif" font-size="9" text-anchor="middle">Vite SPA / React 19</text>

  <line x1="170" y1="80" x2="225" y2="80" stroke="#333" stroke-width="1.5"/>
  <text x="197" y="74" font-family="sans-serif" font-size="8" text-anchor="middle">HTTPS</text>

  <!-- Application Server Node -->
  <polygon points="225,15 240,5 390,5 375,15" fill="#e2e8f0" stroke="#475569"/>
  <polygon points="375,15 390,5 390,135 375,145" fill="#cbd5e1" stroke="#475569"/>
  <rect x="225" y="15" width="150" height="130" fill="#f8fafc" stroke="#475569" stroke-width="1.2"/>
  <text x="300" y="38" font-family="'Times New Roman', serif" font-weight="bold" font-size="11" text-anchor="middle">&lt;&lt;execution env&gt;&gt;</text>
  <text x="300" y="52" font-family="'Times New Roman', serif" font-size="11" text-anchor="middle">Node.js Engine</text>
  <rect x="235" y="65" width="130" height="35" rx="3" fill="#fff" stroke="#94a3b8"/>
  <text x="300" y="87" font-family="sans-serif" font-size="9" text-anchor="middle">Express 5 REST API</text>

  <line x1="375" y1="80" x2="430" y2="80" stroke="#333" stroke-width="1.5"/>
  <text x="402" y="74" font-family="sans-serif" font-size="8" text-anchor="middle">TCP/TLS</text>

  <!-- Database Node -->
  <polygon points="430,15 445,5 585,5 570,15" fill="#e2e8f0" stroke="#475569"/>
  <polygon points="570,15 585,5 585,135 570,145" fill="#cbd5e1" stroke="#475569"/>
  <rect x="430" y="15" width="140" height="130" fill="#f8fafc" stroke="#475569" stroke-width="1.2"/>
  <text x="500" y="38" font-family="'Times New Roman', serif" font-weight="bold" font-size="11" text-anchor="middle">&lt;&lt;database cloud&gt;&gt;</text>
  <text x="500" y="52" font-family="'Times New Roman', serif" font-size="11" text-anchor="middle">MongoDB Atlas</text>
  <rect x="440" y="65" width="120" height="35" rx="3" fill="#fff" stroke="#94a3b8"/>
  <text x="500" y="87" font-family="sans-serif" font-size="9" text-anchor="middle">floralens DB (Replica)</text>
</svg>
`;

export const DIAGRAM_FIG11 = `
<svg width="600" height="190" viewBox="0 0 600 190" xmlns="http://www.w3.org/2000/svg">
  <!-- Level 0 DFD -->
  <rect x="20" y="30" width="90" height="50" rx="4" fill="#e0f2fe" stroke="#0284c7"/>
  <text x="65" y="58" font-family="'Times New Roman', serif" font-size="11" text-anchor="middle">Customer</text>

  <line x1="110" y1="45" x2="190" y2="45" stroke="#333" stroke-width="1.2" marker-end="url(#arr)"/>
  <text x="150" y="40" font-family="sans-serif" font-size="7.5" text-anchor="middle">Orders/Bookings</text>

  <line x1="190" y1="65" x2="110" y2="65" stroke="#333" stroke-width="1.2" marker-end="url(#arr)"/>
  <text x="150" y="78" font-family="sans-serif" font-size="7.5" text-anchor="middle">Receipt/Timeline</text>

  <!-- Process 0 -->
  <circle cx="230" cy="55" r="38" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
  <text x="230" y="50" font-family="'Times New Roman', serif" font-weight="bold" font-size="10" text-anchor="middle">0.0</text>
  <text x="230" y="63" font-family="'Times New Roman', serif" font-weight="bold" font-size="10" text-anchor="middle">FloraLens</text>

  <line x1="268" y1="55" x2="350" y2="55" stroke="#333" stroke-width="1.2" marker-end="url(#arr)"/>
  <text x="310" y="50" font-family="sans-serif" font-size="7.5" text-anchor="middle">Dispatched orders</text>

  <rect x="350" y="30" width="80" height="50" rx="4" fill="#fef3c7" stroke="#d97706"/>
  <text x="390" y="58" font-family="'Times New Roman', serif" font-size="11" text-anchor="middle">Vendor</text>

  <!-- Level 1 DFD Breakdown Below -->
  <line x1="230" y1="93" x2="230" y2="120" stroke="#94a3b8" stroke-dasharray="2,2"/>
  <rect x="40" y="125" width="520" height="55" rx="6" fill="#f8fafc" stroke="#64748b" stroke-width="1.2"/>
  <text x="50" y="142" font-family="'Times New Roman', serif" font-weight="bold" font-size="10">Level 1 Sub-processes:</text>
  <text x="50" y="160" font-family="sans-serif" font-size="9" fill="#1e293b">[1.0 User Auth]  ➔  [2.0 Catalog Filtering]  ➔  [3.0 Cart & Stock Decrement]  ➔  [4.0 Slot Conflict Check]  ➔  [5.0 Order Fulfillment]</text>
</svg>
`;


export const DIAGRAM_FIG12 = `
<svg width="600" height="200" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Browser Frame -->
  <rect x="10" y="10" width="580" height="180" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="10" y="10" width="580" height="24" rx="6" fill="#f1f5f9"/>
  <circle cx="25" cy="22" r="4" fill="#ef4444"/>
  <circle cx="37" cy="22" r="4" fill="#f59e0b"/>
  <circle cx="49" cy="22" r="4" fill="#10b981"/>
  <rect x="70" y="14" width="300" height="16" rx="3" fill="#ffffff" stroke="#e2e8f0"/>
  <text x="80" y="26" font-family="'Courier New', monospace" font-size="8.5" fill="#64748b">http://localhost:5173/flowers (Catalog &amp; Multi-Tier Variant Selector)</text>

  <!-- Left Sidebar Filter -->
  <rect x="20" y="42" width="120" height="138" fill="#f8fafc" stroke="#e2e8f0"/>
  <text x="30" y="58" font-family="'Times New Roman', serif" font-weight="bold" font-size="9.5">Categories &amp; Filters</text>
  <text x="30" y="74" font-family="sans-serif" font-size="8" fill="#334155">[x] Red Roses (12)</text>
  <text x="30" y="88" font-family="sans-serif" font-size="8" fill="#334155">[ ] Royal Lilies (8)</text>
  <text x="30" y="102" font-family="sans-serif" font-size="8" fill="#334155">[ ] Exotic Orchids (6)</text>
  <text x="30" y="120" font-family="'Times New Roman', serif" font-weight="bold" font-size="9">Price Range (INR)</text>
  <line x1="30" y1="130" x2="120" y2="130" stroke="#0284c7" stroke-width="2"/>
  <circle cx="70" cy="130" r="4" fill="#0284c7"/>
  <text x="30" y="146" font-family="sans-serif" font-size="8" fill="#64748b">₹499 - ₹4,999</text>

  <!-- Product Cards Grid -->
  <!-- Card 1 -->
  <rect x="155" y="42" width="130" height="138" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
  <rect x="160" y="47" width="120" height="60" rx="3" fill="#fee2e2"/>
  <text x="220" y="82" font-family="sans-serif" font-size="9" fill="#991b1b" text-anchor="middle">[ Crimson Red Roses ]</text>
  <text x="162" y="120" font-family="'Times New Roman', serif" font-weight="bold" font-size="9.5">Crimson Roses</text>
  <text x="162" y="134" font-family="sans-serif" font-size="8.5" fill="#15803d" font-weight="bold">₹799 <span style="font-size:7px; color:#64748b;">(Standard)</span></text>
  <rect x="162" y="146" width="116" height="22" rx="3" fill="#16a34a"/>
  <text x="220" y="160" font-family="sans-serif" font-size="8" fill="#fff" text-anchor="middle">Add to Cart</text>

  <!-- Card 2 (With Variant Selection) -->
  <rect x="300" y="42" width="130" height="138" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
  <rect x="305" y="47" width="120" height="60" rx="3" fill="#fef3c7"/>
  <text x="365" y="82" font-family="sans-serif" font-size="9" fill="#92400e" text-anchor="middle">[ Lily Serenity ]</text>
  <text x="307" y="120" font-family="'Times New Roman', serif" font-weight="bold" font-size="9.5">Royal White Lilies</text>
  <text x="307" y="134" font-family="sans-serif" font-size="8.5" fill="#15803d" font-weight="bold">₹1,119 <span style="font-size:7px; color:#64748b;">(Deluxe)</span></text>
  <rect x="307" y="146" width="116" height="22" rx="3" fill="#16a34a"/>
  <text x="365" y="160" font-family="sans-serif" font-size="8" fill="#fff" text-anchor="middle">Add to Cart</text>

  <!-- Card 3 -->
  <rect x="445" y="42" width="130" height="138" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
  <rect x="450" y="47" width="120" height="60" rx="3" fill="#f3e8ff"/>
  <text x="510" y="82" font-family="sans-serif" font-size="9" fill="#6b21a8" text-anchor="middle">[ Purple Orchids ]</text>
  <text x="452" y="120" font-family="'Times New Roman', serif" font-weight="bold" font-size="9.5">Blue Orchid Bunch</text>
  <text x="452" y="134" font-family="sans-serif" font-size="8.5" fill="#15803d" font-weight="bold">₹1,499 <span style="font-size:7px; color:#64748b;">(Premium)</span></text>
  <rect x="452" y="146" width="116" height="22" rx="3" fill="#16a34a"/>
  <text x="510" y="160" font-family="sans-serif" font-size="8" fill="#fff" text-anchor="middle">Add to Cart</text>
</svg>
`;

export const DIAGRAM_FIG13 = `
<svg width="600" height="200" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Browser Frame -->
  <rect x="10" y="10" width="580" height="180" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="10" y="10" width="580" height="24" rx="6" fill="#f1f5f9"/>
  <circle cx="25" cy="22" r="4" fill="#ef4444"/>
  <circle cx="37" cy="22" r="4" fill="#f59e0b"/>
  <circle cx="49" cy="22" r="4" fill="#10b981"/>
  <rect x="70" y="14" width="320" height="16" rx="3" fill="#ffffff" stroke="#e2e8f0"/>
  <text x="80" y="26" font-family="'Courier New', monospace" font-size="8.5" fill="#64748b">http://localhost:5173/decorations/dec-01 (Event Decoration Booking Engine)</text>

  <!-- Left: Service Summary & Package Selector -->
  <rect x="20" y="42" width="260" height="138" fill="#f8fafc" stroke="#e2e8f0"/>
  <text x="30" y="60" font-family="'Times New Roman', serif" font-weight="bold" font-size="10.5">Grand Wedding Floral Mandap</text>
  <text x="30" y="74" font-family="sans-serif" font-size="8.5" fill="#64748b">Vendor: Petals &amp; Drapes Kolhapur (Rating: 4.8★)</text>

  <text x="30" y="92" font-family="'Times New Roman', serif" font-weight="bold" font-size="9">Select Package:</text>
  <rect x="30" y="98" width="70" height="35" rx="3" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="65" y="112" font-family="sans-serif" font-size="8" text-anchor="middle">Silver</text>
  <text x="65" y="125" font-family="sans-serif" font-size="7.5" fill="#16a34a" text-anchor="middle">₹14,999</text>

  <rect x="105" y="98" width="80" height="35" rx="3" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
  <text x="145" y="112" font-family="sans-serif" font-size="8" font-weight="bold" fill="#1d4ed8" text-anchor="middle">Gold (Popular)</text>
  <text x="145" y="125" font-family="sans-serif" font-size="7.5" fill="#16a34a" text-anchor="middle">₹24,999</text>

  <rect x="190" y="98" width="75" height="35" rx="3" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="227" y="112" font-family="sans-serif" font-size="8" text-anchor="middle">Diamond</text>
  <text x="227" y="125" font-family="sans-serif" font-size="7.5" fill="#16a34a" text-anchor="middle">₹39,999</text>

  <text x="30" y="152" font-family="sans-serif" font-size="8" fill="#475569">Setup Duration: 6 Hours | Notice: 3 Days</text>
  <text x="30" y="166" font-family="sans-serif" font-size="8" fill="#475569">Includes: Entrance Arch, Mandap Backdrop, Stage</text>

  <!-- Right: Booking Date & Conflict-Free Slot Selector -->
  <rect x="295" y="42" width="285" height="138" fill="#ffffff" stroke="#e2e8f0"/>
  <text x="305" y="60" font-family="'Times New Roman', serif" font-weight="bold" font-size="10">Event Date &amp; Slot Schedule</text>

  <rect x="305" y="68" width="130" height="22" rx="3" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="312" y="82" font-family="'Courier New', monospace" font-size="8.5">Date: 2026-12-18</text>

  <rect x="445" y="68" width="125" height="22" rx="3" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="452" y="82" font-family="'Courier New', monospace" font-size="8.5">Guest Count: 350</text>

  <text x="305" y="105" font-family="sans-serif" font-size="8.5" font-weight="bold">Time Slots (Double-Booking Protected):</text>
  <rect x="305" y="112" width="85" height="22" rx="3" fill="#dcfce7" stroke="#16a34a"/>
  <text x="347" y="126" font-family="sans-serif" font-size="8" fill="#15803d" text-anchor="middle">08:00 - 13:00 ✓</text>

  <rect x="395" y="112" width="85" height="22" rx="3" fill="#fee2e2" stroke="#dc2626"/>
  <text x="437" y="126" font-family="sans-serif" font-size="8" fill="#991b1b" text-anchor="middle">14:00 - 19:00 ✗</text>

  <rect x="485" y="112" width="85" height="22" rx="3" fill="#dcfce7" stroke="#16a34a"/>
  <text x="527" y="126" font-family="sans-serif" font-size="8" fill="#15803d" text-anchor="middle">19:30 - 23:30 ✓</text>

  <rect x="305" y="146" width="265" height="26" rx="4" fill="#0284c7"/>
  <text x="437" y="162" font-family="sans-serif" font-size="9" fill="#fff" font-weight="bold" text-anchor="middle">Book Decoration Slot (Total: ₹24,999)</text>
</svg>
`;

export const DIAGRAM_FIG14 = `
<svg width="600" height="200" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Browser Frame -->
  <rect x="10" y="10" width="580" height="180" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="10" y="10" width="580" height="24" rx="6" fill="#f1f5f9"/>
  <circle cx="25" cy="22" r="4" fill="#ef4444"/>
  <circle cx="37" cy="22" r="4" fill="#f59e0b"/>
  <circle cx="49" cy="22" r="4" fill="#10b981"/>
  <rect x="70" y="14" width="320" height="16" rx="3" fill="#ffffff" stroke="#e2e8f0"/>
  <text x="80" y="26" font-family="'Courier New', monospace" font-size="8.5" fill="#64748b">http://localhost:5173/checkout (Cart Calculation &amp; Indian Address Spec)</text>

  <!-- Left: Cart Items & Coupon -->
  <rect x="20" y="42" width="270" height="138" fill="#f8fafc" stroke="#e2e8f0"/>
  <text x="30" y="58" font-family="'Times New Roman', serif" font-weight="bold" font-size="10">Order Summary (2 Items)</text>

  <text x="30" y="74" font-family="sans-serif" font-size="8.5">1x Crimson Rose Deluxe (24 Stems)</text>
  <text x="250" y="74" font-family="sans-serif" font-size="8.5" text-anchor="end">₹1,119.00</text>

  <text x="30" y="88" font-family="sans-serif" font-size="8.5">1x Lily Serenity Bouquet (Standard)</text>
  <text x="250" y="88" font-family="sans-serif" font-size="8.5" text-anchor="end">₹899.00</text>

  <line x1="30" y1="96" x2="275" y2="96" stroke="#cbd5e1"/>
  <text x="30" y="110" font-family="sans-serif" font-size="8">Item Subtotal: ₹2,018.00</text>
  <text x="30" y="122" font-family="sans-serif" font-size="8" fill="#15803d">Coupon Discount (BLOOM10): -₹201.80</text>
  <text x="30" y="134" font-family="sans-serif" font-size="8">Delivery Fee (Kolhapur): ₹49.00</text>
  <text x="30" y="148" font-family="sans-serif" font-size="9" font-weight="bold">Net Payable: ₹1,865.20 INR</text>
  <rect x="30" y="154" width="245" height="18" rx="2" fill="#dcfce7" stroke="#86efac"/>
  <text x="152" y="166" font-family="sans-serif" font-size="7.5" fill="#166534" text-anchor="middle">Coupon 'BLOOM10' Applied Successfully</text>

  <!-- Right: Address & Payment Gateway Modal -->
  <rect x="305" y="42" width="275" height="138" fill="#ffffff" stroke="#e2e8f0"/>
  <text x="315" y="58" font-family="'Times New Roman', serif" font-weight="bold" font-size="10">Delivery Address (Kolhapur)</text>

  <rect x="315" y="66" width="255" height="52" rx="3" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="325" y="80" font-family="sans-serif" font-size="8" font-weight="bold">B Sai Dhanush (+91 9876543210)</text>
  <text x="325" y="92" font-family="sans-serif" font-size="7.5" fill="#475569">Flat 402, Shanti Residency, Near SGU Campus</text>
  <text x="325" y="104" font-family="sans-serif" font-size="7.5" fill="#475569">Atigre, Kolhapur, Maharashtra - 416118</text>

  <rect x="315" y="126" width="255" height="46" rx="4" fill="#0f172a"/>
  <text x="442" y="144" font-family="sans-serif" font-size="8.5" fill="#fff" font-weight="bold" text-anchor="middle">Razorpay Sandbox Gateway</text>
  <text x="442" y="158" font-family="sans-serif" font-size="7.5" fill="#94a3b8" text-anchor="middle">[ UPI QR / Netbanking / Credit Card ]</text>
</svg>
`;

export const DIAGRAM_FIG15 = `
<svg width="600" height="200" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Browser Frame -->
  <rect x="10" y="10" width="580" height="180" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="10" y="10" width="580" height="24" rx="6" fill="#f1f5f9"/>
  <circle cx="25" cy="22" r="4" fill="#ef4444"/>
  <circle cx="37" cy="22" r="4" fill="#f59e0b"/>
  <circle cx="49" cy="22" r="4" fill="#10b981"/>
  <rect x="70" y="14" width="300" height="16" rx="3" fill="#ffffff" stroke="#e2e8f0"/>
  <text x="80" y="26" font-family="'Courier New', monospace" font-size="8.5" fill="#64748b">http://localhost:5173/vendor (Vendor Fulfillment &amp; Booking Management)</text>

  <!-- Metrics Header -->
  <rect x="20" y="42" width="130" height="35" rx="3" fill="#eff6ff" stroke="#bfdbfe"/>
  <text x="85" y="56" font-family="sans-serif" font-size="7.5" fill="#1e40af" text-anchor="middle">Pending Orders</text>
  <text x="85" y="71" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1d4ed8" text-anchor="middle">4 Active</text>

  <rect x="165" y="42" width="130" height="35" rx="3" fill="#fefce8" stroke="#fef08a"/>
  <text x="230" y="56" font-family="sans-serif" font-size="7.5" fill="#854d0e" text-anchor="middle">Event Bookings</text>
  <text x="230" y="71" font-family="sans-serif" font-size="11" font-weight="bold" fill="#a16207" text-anchor="middle">2 Upcoming</text>

  <rect x="310" y="42" width="130" height="35" rx="3" fill="#f0fdf4" stroke="#bbf7d0"/>
  <text x="375" y="56" font-family="sans-serif" font-size="7.5" fill="#166534" text-anchor="middle">Monthly Revenue</text>
  <text x="375" y="71" font-family="sans-serif" font-size="11" font-weight="bold" fill="#15803d" text-anchor="middle">₹54,290 INR</text>

  <rect x="455" y="42" width="125" height="35" rx="3" fill="#faf5ff" stroke="#e9d5ff"/>
  <text x="517" y="56" font-family="sans-serif" font-size="7.5" fill="#6b21a8" text-anchor="middle">Store Rating</text>
  <text x="517" y="71" font-family="sans-serif" font-size="11" font-weight="bold" fill="#7e22ce" text-anchor="middle">4.9 ★ (28)</text>

  <!-- Table of Incoming Bookings -->
  <rect x="20" y="85" width="560" height="95" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="30" y="100" font-family="'Times New Roman', serif" font-weight="bold" font-size="9.5">Incoming Decoration Booking Requests</text>

  <line x1="20" y1="106" x2="580" y2="106" stroke="#e2e8f0"/>
  <text x="30" y="120" font-family="'Courier New', monospace" font-size="8">BKG-2026-4402 | B Sai Dhanush | Birthday Arch | 2026-12-15 (16:00-20:00) | ₹4,999</text>
  <rect x="440" y="112" width="60" height="18" rx="2" fill="#16a34a"/>
  <text x="470" y="124" font-family="sans-serif" font-size="7.5" fill="#fff" text-anchor="middle">Accept</text>
  <rect x="508" y="112" width="60" height="18" rx="2" fill="#dc2626"/>
  <text x="538" y="124" font-family="sans-serif" font-size="7.5" fill="#fff" text-anchor="middle">Decline</text>

  <line x1="20" y1="136" x2="580" y2="136" stroke="#e2e8f0"/>
  <text x="30" y="152" font-family="'Courier New', monospace" font-size="8">BKG-2026-8819 | R Ramcharan | Mandap Gold | 2026-12-18 (08:00-13:00) | ₹24,999</text>
  <rect x="440" y="144" width="60" height="18" rx="2" fill="#16a34a"/>
  <text x="470" y="156" font-family="sans-serif" font-size="7.5" fill="#fff" text-anchor="middle">Accept</text>
  <rect x="508" y="144" width="60" height="18" rx="2" fill="#dc2626"/>
  <text x="538" y="156" font-family="sans-serif" font-size="7.5" fill="#fff" text-anchor="middle">Decline</text>
</svg>
`;

export const DIAGRAM_FIG16 = `
<svg width="600" height="200" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Browser Frame -->
  <rect x="10" y="10" width="580" height="180" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="10" y="10" width="580" height="24" rx="6" fill="#f1f5f9"/>
  <circle cx="25" cy="22" r="4" fill="#ef4444"/>
  <circle cx="37" cy="22" r="4" fill="#f59e0b"/>
  <circle cx="49" cy="22" r="4" fill="#10b981"/>
  <rect x="70" y="14" width="300" height="16" rx="3" fill="#ffffff" stroke="#e2e8f0"/>
  <text x="80" y="26" font-family="'Courier New', monospace" font-size="8.5" fill="#64748b">http://localhost:5173/admin (Platform Moderation &amp; Vendor KYC Audit)</text>

  <!-- Left: Vendor Approvals -->
  <rect x="20" y="42" width="270" height="138" fill="#f8fafc" stroke="#e2e8f0"/>
  <text x="30" y="58" font-family="'Times New Roman', serif" font-weight="bold" font-size="10">Vendor KYC Applications</text>

  <rect x="30" y="68" width="250" height="48" rx="3" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="38" y="82" font-family="sans-serif" font-size="8" font-weight="bold">Kolhapur Floral Art (Hybrid)</text>
  <text x="38" y="94" font-family="sans-serif" font-size="7.5" fill="#475569">GSTIN: 27AAAAA0000A1Z5 | Exp: 8 Years</text>
  <rect x="155" y="98" width="55" height="14" rx="2" fill="#16a34a"/>
  <text x="182" y="108" font-family="sans-serif" font-size="7" fill="#fff" text-anchor="middle">Approve</text>
  <rect x="218" y="98" width="55" height="14" rx="2" fill="#dc2626"/>
  <text x="245" y="108" font-family="sans-serif" font-size="7" fill="#fff" text-anchor="middle">Reject</text>

  <rect x="30" y="122" width="250" height="48" rx="3" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="38" y="136" font-family="sans-serif" font-size="8" font-weight="bold">Deccan Blossoms (Florist)</text>
  <text x="38" y="148" font-family="sans-serif" font-size="7.5" fill="#475569">GSTIN: 27BBBBB1111B2Z6 | Exp: 4 Years</text>
  <rect x="155" y="152" width="55" height="14" rx="2" fill="#16a34a"/>
  <text x="182" y="162" font-family="sans-serif" font-size="7" fill="#fff" text-anchor="middle">Approve</text>
  <rect x="218" y="152" width="55" height="14" rx="2" fill="#dc2626"/>
  <text x="245" y="162" font-family="sans-serif" font-size="7" fill="#fff" text-anchor="middle">Reject</text>

  <!-- Right: Platform Transaction Audit -->
  <rect x="305" y="42" width="275" height="138" fill="#ffffff" stroke="#e2e8f0"/>
  <text x="315" y="58" font-family="'Times New Roman', serif" font-weight="bold" font-size="10">Platform Governance &amp; Moderation</text>
  <text x="315" y="75" font-family="sans-serif" font-size="8" fill="#334155">• Active Flower SKUs: 24 (0 flagged)</text>
  <text x="315" y="90" font-family="sans-serif" font-size="8" fill="#334155">• Active Decoration Packages: 14</text>
  <text x="315" y="105" font-family="sans-serif" font-size="8" fill="#334155">• 24h Order Volume: ₹38,720 INR</text>
  <text x="315" y="120" font-family="sans-serif" font-size="8" fill="#334155">• Database Status: MongoDB Atlas Live (10 Collections)</text>
  <rect x="315" y="136" width="255" height="24" rx="3" fill="#0284c7"/>
  <text x="442" y="152" font-family="sans-serif" font-size="8" fill="#fff" font-weight="bold" text-anchor="middle">Download Platform Audit Report (CSV)</text>
</svg>
`;
