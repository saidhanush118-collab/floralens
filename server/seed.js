import { connectToDatabase } from './db.js';
import * as mockData from './data/mockData.js';

export async function seedDatabase(dropExisting = true) {
  const { db } = await connectToDatabase();
  console.log('--- Starting MongoDB Atlas Seeding for FloraLens ---');

  const collections = [
    { name: 'categories', data: mockData.INITIAL_CATEGORIES, idKey: 'id' },
    { name: 'vendors', data: mockData.INITIAL_VENDORS, idKey: 'id' },
    { name: 'products', data: mockData.INITIAL_PRODUCTS, idKey: 'id' },
    { name: 'services', data: mockData.INITIAL_SERVICES, idKey: 'id' },
    { name: 'reviews', data: mockData.INITIAL_REVIEWS, idKey: 'id' },
    { name: 'coupons', data: mockData.INITIAL_COUPONS, idKey: 'id' },
    { name: 'addresses', data: mockData.INITIAL_ADDRESSES, idKey: 'id' },
    { name: 'orders', data: mockData.INITIAL_ORDERS, idKey: 'id' },
    { name: 'bookings', data: mockData.INITIAL_BOOKINGS, idKey: 'id' },
    {
      name: 'users',
      data: Object.values(mockData.DEMO_USERS || {}),
      idKey: 'id',
    },
  ];

  const results = {};

  for (const col of collections) {
    const collection = db.collection(col.name);

    if (dropExisting) {
      try {
        await collection.deleteMany({});
      } catch (err) {
        // Collection might not exist yet, ignore
      }
    }

    if (col.data && col.data.length > 0) {
      // Upsert or insert data
      const operations = col.data.map((item) => ({
        updateOne: {
          filter: { [col.idKey]: item[col.idKey] },
          update: { $set: item },
          upsert: true,
        },
      }));

      const res = await collection.bulkWrite(operations);
      results[col.name] = {
        upserted: res.upsertedCount,
        modified: res.modifiedCount,
        matched: res.matchedCount,
        total: col.data.length,
      };
      console.log(`Seeded collection "${col.name}": ${col.data.length} documents.`);
    }
  }

  // Create useful indexes
  try {
    await db.collection('products').createIndex({ id: 1 }, { unique: true });
    await db.collection('products').createIndex({ slug: 1 });
    await db.collection('products').createIndex({ categoryId: 1 });
    await db.collection('products').createIndex({ flowerType: 1 });
    await db.collection('products').createIndex({ vendorId: 1 });

    await db.collection('services').createIndex({ id: 1 }, { unique: true });
    await db.collection('services').createIndex({ slug: 1 });
    await db.collection('services').createIndex({ eventType: 1 });
    await db.collection('services').createIndex({ vendorId: 1 });

    await db.collection('orders').createIndex({ id: 1 }, { unique: true });
    await db.collection('orders').createIndex({ userId: 1 });

    await db.collection('bookings').createIndex({ id: 1 }, { unique: true });
    await db.collection('bookings').createIndex({ userId: 1 });
    await db.collection('bookings').createIndex({ vendorId: 1, eventDate: 1, timeSlot: 1 });

    console.log('Created MongoDB indexes successfully.');
  } catch (err) {
    console.warn('Index creation warning:', err.message);
  }

  console.log('--- MongoDB Seeding Completed Successfully! ---');
  return results;
}

// If executed directly from command line: node server/seed.js
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedDatabase(true)
    .then((results) => {
      console.log('Summary:', JSON.stringify(results, null, 2));
      process.exit(0);
    })
    .catch((err) => {
      console.error('Seeding failed:', err);
      process.exit(1);
    });
}
