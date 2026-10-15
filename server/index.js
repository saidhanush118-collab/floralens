import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
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
  try {
    await connectToDatabase();
    next();
  } catch (err) {
    res.status(503).json({
      error: 'Database connection unavailable',
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
  app.listen(PORT, () => {
    console.log(`🌸 FloraLens MongoDB API Server running at http://localhost:${PORT}`);
    console.log(`Database connected: MongoDB Atlas [${DB_NAME}]`);
  });
}

export default app;
