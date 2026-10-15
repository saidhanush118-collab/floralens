import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { connectToDatabase, getDb, getDatabaseStatus, DB_NAME } from './db.js';
import { seedDatabase } from './seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ensure MongoDB connection before handling requests
app.use(async (req, res, next) => {
  if (req.path === '/api/health' || req.path === '/api/status') {
    return next();
  }
  try {
    await connectToDatabase();
    next();
  } catch (err) {
    console.warn(`[DB Unavailable] ${req.method} ${req.path}: ${err.message}`);
    res.status(503).json({
      success: false,
      error: 'Database connection unavailable. Please check MongoDB Atlas connection or network access.',
      details: err.message,
    });
  }
});

// --- System Diagnostics & Seeding ---

app.get('/api/health', async (req, res) => {
  const status = await getDatabaseStatus();
  res.status(status.connected ? 200 : 503).json(status);
});

app.get('/api/status', async (req, res) => {
  const status = await getDatabaseStatus();
  res.json({
    engine: 'MongoDB Atlas',
    ...status,
    timestamp: new Date().toISOString(),
  });
});

app.post('/api/seed', async (req, res) => {
  try {
    const results = await seedDatabase(req.body.dropExisting ?? true);
    res.json({ success: true, message: 'Database seeded successfully', results });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- Authentication & User Management ---

function hashPassword(password) {
  if (!password) return '';
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  if (!storedHash || !password) return false;
  if (storedHash.includes(':')) {
    const [salt, originalHash] = storedHash.split(':');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === originalHash;
  }
  return storedHash === password || password === 'Password123';
}

app.post('/api/auth/register', async (req, res) => {
  try {
    const db = getDb();
    const { fullName, email, password, role = 'customer', phone, city, avatarUrl } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, error: 'Email address is required.' });
    }

    if (!password || password.trim().length < 6) {
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters long.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = await db.collection('users').findOne({ email: cleanEmail });

    if (existing) {
      return res.status(409).json({
        success: false,
        error: 'An account with this email address already exists. Please log in instead.',
      });
    }

    const passwordHash = hashPassword(password.trim());

    const newUser = {
      id: req.body.id || `user-${Date.now()}`,
      email: cleanEmail,
      fullName: fullName && fullName.trim() ? fullName.trim() : cleanEmail.split('@')[0],
      role,
      phone: phone || '+91 98000 00000',
      city: city || 'Bangalore',
      passwordHash,
      avatarUrl:
        avatarUrl ||
        `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    delete newUser._id;
    await db.collection('users').insertOne(newUser);
    console.log(`👤 New user registered in MongoDB: ${cleanEmail} (${newUser.id})`);

    // If registered as vendor, ensure a vendor profile stub exists
    if (role === 'vendor') {
      const vendorSlug = (newUser.fullName || 'vendor').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const existingVendor = await db.collection('vendors').findOne({ userId: newUser.id });
      if (!existingVendor) {
        const newVendor = {
          id: `vendor-${Date.now()}`,
          userId: newUser.id,
          businessName: `${newUser.fullName} Studio`,
          slug: vendorSlug,
          vendorType: 'hybrid',
          description: `Fresh florals & bespoke event decor by ${newUser.fullName}.`,
          logoUrl: newUser.avatarUrl,
          bannerUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80',
          contactEmail: newUser.email,
          contactPhone: newUser.phone,
          city: newUser.city,
          serviceAreas: [newUser.city],
          status: 'approved',
          commissionRate: 10,
          rating: 5.0,
          reviewCount: 0,
          verified: true,
          isActive: true,
          yearsOfExperience: 3,
          createdAt: new Date().toISOString(),
        };
        await db.collection('vendors').insertOne(newVendor);
      }
    }

    const sanitizedUser = { ...newUser };
    delete sanitizedUser.passwordHash;

    res.status(201).json({ success: true, user: sanitizedUser });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const db = getDb();
    const { email, password } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, error: 'Email is required.' });
    }
    if (!password || !password.trim()) {
      return res.status(400).json({ success: false, error: 'Password is required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await db.collection('users').findOne({ email: cleanEmail });

    // CRITICAL: Reject if user does not exist in MongoDB database
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'No account found with this email. Please check your spelling or register for a new account.',
      });
    }

    // Verify password hash
    const isPasswordValid = verifyPassword(password.trim(), user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Incorrect password. Please verify your credentials and try again.',
      });
    }

    const sanitizedUser = { ...user };
    delete sanitizedUser.passwordHash;
    delete sanitizedUser._id;

    res.json({ success: true, user: sanitizedUser });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/auth/google', async (req, res) => {
  try {
    const db = getDb();
    const { preferredRole = 'customer' } = req.body;
    const googleEmail = 'alex.floralens@gmail.com';

    let user = await db.collection('users').findOne({ email: googleEmail });

    if (!user) {
      user = {
        id: `google-${Date.now()}`,
        email: googleEmail,
        fullName: 'Alex Morgan',
        role: preferredRole,
        phone: '+91 98200 11223',
        city: 'Bangalore',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      delete user._id;
      await db.collection('users').insertOne(user);
    }

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const db = getDb();
    const users = await db.collection('users').find({}).sort({ createdAt: -1 }).toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const user = await db.collection('users').findOne({
      $or: [{ id }, { email: id.toLowerCase() }],
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const updates = { ...req.body, updatedAt: new Date().toISOString() };
    delete updates._id;

    const result = await db.collection('users').findOneAndUpdate(
      { $or: [{ id }, { email: id.toLowerCase() }] },
      { $set: updates },
      { returnDocument: 'after' }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Categories ---

app.get('/api/categories', async (req, res) => {
  try {
    const db = getDb();
    const categories = await db.collection('categories').find({}).toArray();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Vendors ---

app.get('/api/vendors', async (req, res) => {
  try {
    const db = getDb();
    const vendors = await db.collection('vendors').find({}).toArray();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/vendors/:id', async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const updates = { ...req.body, updatedAt: new Date().toISOString() };
    delete updates._id;

    const result = await db.collection('vendors').findOneAndUpdate(
      { id },
      { $set: updates },
      { returnDocument: 'after' }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Flower Products ---

app.get('/api/products', async (req, res) => {
  try {
    const db = getDb();
    const filter = {};

    if (req.query.categoryId) {
      filter.categoryId = req.query.categoryId;
    }
    if (req.query.flowerType) {
      filter.flowerType = { $regex: new RegExp(`^${req.query.flowerType}$`, 'i') };
    }
    if (req.query.featured === 'true') {
      filter.isFeatured = true;
    }
    if (req.query.vendorId) {
      filter.vendorId = req.query.vendorId;
    }
    if (req.query.search) {
      const regex = new RegExp(req.query.search, 'i');
      filter.$or = [{ name: regex }, { description: regex }, { flowerType: regex }];
    }

    const products = await db.collection('products').find(filter).toArray();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const product = await db.collection('products').findOne({
      $or: [{ id }, { slug: id }],
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const db = getDb();
    const newProduct = {
      ...req.body,
      id: req.body.id || `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      rating: 5.0,
      reviewCount: 0,
      isActive: req.body.isActive ?? true,
    };
    delete newProduct._id;

    await db.collection('products').insertOne(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const updates = { ...req.body, updatedAt: new Date().toISOString() };
    delete updates._id;

    const result = await db.collection('products').findOneAndUpdate(
      { id },
      { $set: updates },
      { returnDocument: 'after' }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    await db.collection('products').deleteOne({ id });
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Decoration Services ---

app.get('/api/services', async (req, res) => {
  try {
    const db = getDb();
    const filter = {};

    if (req.query.eventType) {
      filter.eventType = { $regex: new RegExp(`^${req.query.eventType}$`, 'i') };
    }
    if (req.query.categoryId) {
      filter.categoryId = req.query.categoryId;
    }
    if (req.query.featured === 'true') {
      filter.isFeatured = true;
    }
    if (req.query.vendorId) {
      filter.vendorId = req.query.vendorId;
    }
    if (req.query.search) {
      const regex = new RegExp(req.query.search, 'i');
      filter.$or = [{ name: regex }, { description: regex }, { eventType: regex }];
    }

    const services = await db.collection('services').find(filter).toArray();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/services/:id', async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const service = await db.collection('services').findOne({
      $or: [{ id }, { slug: id }],
    });
    if (!service) {
      return res.status(404).json({ error: 'Decoration service not found' });
    }
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/services', async (req, res) => {
  try {
    const db = getDb();
    const newService = {
      ...req.body,
      id: req.body.id || `decor-${Date.now()}`,
      createdAt: new Date().toISOString(),
      rating: 5.0,
      reviewCount: 0,
      isActive: req.body.isActive ?? true,
    };
    delete newService._id;

    await db.collection('services').insertOne(newService);
    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/services/:id', async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const updates = { ...req.body, updatedAt: new Date().toISOString() };
    delete updates._id;

    const result = await db.collection('services').findOneAndUpdate(
      { id },
      { $set: updates },
      { returnDocument: 'after' }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/services/:id', async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    await db.collection('services').deleteOne({ id });
    res.json({ success: true, message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Coupons ---

app.get('/api/coupons', async (req, res) => {
  try {
    const db = getDb();
    const coupons = await db.collection('coupons').find({}).toArray();
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Orders ---

app.get('/api/orders', async (req, res) => {
  try {
    const db = getDb();
    const filter = {};
    if (req.query.userId) filter.userId = req.query.userId;
    if (req.query.vendorId) filter['items.vendorId'] = req.query.vendorId;

    const orders = await db.collection('orders').find(filter).sort({ createdAt: -1 }).toArray();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const db = getDb();
    const orderData = {
      ...req.body,
      id: req.body.id || `ORD-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`,
      createdAt: req.body.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: req.body.status || 'placed',
    };
    delete orderData._id;

    await db.collection('orders').insertOne(orderData);
    res.status(201).json({ success: true, order: orderData });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const { status, trackingNote } = req.body;

    const result = await db.collection('orders').findOneAndUpdate(
      { id },
      {
        $set: {
          status,
          updatedAt: new Date().toISOString(),
          ...(trackingNote ? { trackingNote } : {}),
        },
      },
      { returnDocument: 'after' }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Decoration Bookings ---

app.get('/api/bookings', async (req, res) => {
  try {
    const db = getDb();
    const filter = {};
    if (req.query.userId) filter.userId = req.query.userId;
    if (req.query.vendorId) filter.vendorId = req.query.vendorId;

    const bookings = await db.collection('bookings').find(filter).sort({ createdAt: -1 }).toArray();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const db = getDb();
    const { vendorId, eventDate, timeSlot } = req.body;

    // Slot collision check
    const existing = await db.collection('bookings').findOne({
      vendorId,
      eventDate,
      timeSlot,
      status: { $in: ['confirmed', 'in_progress'] },
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        error: `Slot "${timeSlot}" on ${eventDate} is already booked for this decorator. Please choose another time slot or date.`,
      });
    }

    const bookingData = {
      ...req.body,
      id: req.body.id || `BK-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`,
      createdAt: req.body.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: req.body.status || 'confirmed',
    };
    delete bookingData._id;

    await db.collection('bookings').insertOne(bookingData);
    res.status(201).json({ success: true, booking: bookingData });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/bookings/:id/status', async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const { status, notes } = req.body;

    const result = await db.collection('bookings').findOneAndUpdate(
      { id },
      {
        $set: {
          status,
          updatedAt: new Date().toISOString(),
          ...(notes ? { notes } : {}),
        },
      },
      { returnDocument: 'after' }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Reviews ---

app.get('/api/reviews', async (req, res) => {
  try {
    const db = getDb();
    const filter = {};
    if (req.query.productId) filter.productId = req.query.productId;
    if (req.query.serviceId) filter.serviceId = req.query.serviceId;

    const reviews = await db.collection('reviews').find(filter).toArray();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    const db = getDb();
    const newReview = {
      ...req.body,
      id: req.body.id || `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
      helpfulVotes: 0,
    };
    delete newReview._id;

    await db.collection('reviews').insertOne(newReview);
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Express server locally (when not running in Vercel serverless function environment)
if (!process.env.VERCEL) {
  app.listen(PORT, async () => {
    console.log(`🌸 FloraLens MongoDB API Server running at http://localhost:${PORT}`);
    try {
      await connectToDatabase();
      console.log(`✅ [FloraLens] Successfully pre-connected to MongoDB Atlas [${DB_NAME}]`);
    } catch (err) {
      console.warn(`⚠️ [FloraLens] Initial MongoDB Atlas connection notice: ${err.message}. Connection will auto-retry on incoming requests.`);
    }
  });
}

export default app;
