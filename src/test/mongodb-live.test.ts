import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';

// Load .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const uri =
  process.env.MONGODB_URI ||
  'mongodb+srv://saidhanush118_db_user:R8D72u5PrSnYrJ9L@cluster0.yq3tw5x.mongodb.net/floralens?retryWrites=true&w=majority';
const dbName = process.env.MONGODB_DB_NAME || 'floralens';

describe('Live MongoDB Atlas Database Connection & Schema Verification', () => {
  let client: MongoClient;

  beforeAll(async () => {
    client = new MongoClient(uri);
    await client.connect();
  });

  afterAll(async () => {
    if (client) {
      await client.close();
    }
  });

  it('should have valid MongoDB Atlas connection URI configured', () => {
    expect(uri).toBeTruthy();
    expect(uri).toMatch(/^mongodb(\+srv)?:\/\//);
    expect(uri).toContain('cluster0.yq3tw5x.mongodb.net');
  });

  it('should successfully ping MongoDB Atlas database cluster', async () => {
    const db = client.db(dbName);
    const pingResult = await db.command({ ping: 1 });
    expect(pingResult.ok).toBe(1);
  });

  const expectedCollections = [
    'categories',
    'vendors',
    'products',
    'services',
    'reviews',
    'coupons',
    'addresses',
    'orders',
    'bookings',
    'users',
  ];

  expectedCollections.forEach((collName) => {
    it(`should verify collection "${collName}" exists and is queryable in MongoDB Atlas`, async () => {
      const db = client.db(dbName);
      const collection = db.collection(collName);
      const count = await collection.countDocuments();
      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  it('should verify flower products schema in MongoDB', async () => {
    const db = client.db(dbName);
    const products = await db.collection('products').find({}).limit(5).toArray();
    expect(products.length).toBeGreaterThan(0);

    const firstProduct = products[0];
    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('name');
    expect(firstProduct).toHaveProperty('flowerType');
    expect(firstProduct).toHaveProperty('basePrice');
    expect(firstProduct).toHaveProperty('stockQuantity');
    expect(Array.isArray(firstProduct.variants)).toBe(true);
  });

  it('should verify decoration services schema in MongoDB', async () => {
    const db = client.db(dbName);
    const services = await db.collection('services').find({}).limit(5).toArray();
    expect(services.length).toBeGreaterThan(0);

    const firstService = services[0];
    expect(firstService).toHaveProperty('id');
    expect(firstService).toHaveProperty('name');
    expect(firstService).toHaveProperty('eventType');
    expect(firstService).toHaveProperty('basePrice');
    expect(Array.isArray(firstService.packages)).toBe(true);
  });

  it('should test atomic write and delete operation on MongoDB Atlas', async () => {
    const db = client.db(dbName);
    const testColl = db.collection('_test_probe');
    const testDoc = { testId: `probe-${Date.now()}`, timestamp: new Date().toISOString() };

    const insertRes = await testColl.insertOne(testDoc);
    expect(insertRes.acknowledged).toBe(true);

    const found = await testColl.findOne({ testId: testDoc.testId });
    expect(found).not.toBeNull();
    expect(found?.testId).toBe(testDoc.testId);

    const deleteRes = await testColl.deleteOne({ testId: testDoc.testId });
    expect(deleteRes.deletedCount).toBe(1);
  });

  it('should verify creating and querying user in MongoDB users collection', async () => {
    const db = client.db(dbName);
    const testEmail = `test.user.${Date.now()}@example.com`;
    const testUser = {
      id: `user-test-${Date.now()}`,
      email: testEmail,
      fullName: 'Test Automation User',
      role: 'customer',
      city: 'Bangalore',
      phone: '+91 99999 88888',
      createdAt: new Date().toISOString(),
    };

    const insertRes = await db.collection('users').insertOne(testUser);
    expect(insertRes.acknowledged).toBe(true);

    const fetched = await db.collection('users').findOne({ email: testEmail });
    expect(fetched).not.toBeNull();
    expect(fetched?.fullName).toBe('Test Automation User');

    // Clean up
    await db.collection('users').deleteOne({ email: testEmail });
  });
});
