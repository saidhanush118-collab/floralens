import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const DEFAULT_URI = 'mongodb+srv://saidhanush118_db_user:R8D72u5PrSnYrJ9L@cluster0.yq3tw5x.mongodb.net/floralens?retryWrites=true&w=majority';
export const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_URI;
export const DB_NAME = process.env.MONGODB_DB_NAME || 'floralens';

// Reuse connection across module reloads / hot-reloads / serverless environments
let cachedClient = globalThis.__mongoClient || null;
let cachedDb = globalThis.__mongoDb || null;
let connectionPromise = null;

const CLIENT_OPTIONS = {
  serverSelectionTimeoutMS: 30000,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  minPoolSize: 0,
  maxIdleTimeMS: 60000,
  retryWrites: true,
  retryReads: true,
};

export async function connectToDatabase(maxRetries = 2, retryDelayMs = 1200) {
  // If already connected and client is active, return immediately
  if (cachedClient && cachedDb) {
    try {
      // Quick lightweight check if topology is active
      return { client: cachedClient, db: cachedDb };
    } catch {
      // Cache invalid, proceed to reconnect
      cachedClient = null;
      cachedDb = null;
    }
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = (async () => {
    let attempt = 0;
    while (attempt <= maxRetries) {
      attempt++;
      try {
        console.log(`[MongoDB] Connecting to Atlas (DB: "${DB_NAME}", attempt ${attempt}/${maxRetries + 1})...`);
        const client = new MongoClient(MONGODB_URI, CLIENT_OPTIONS);
        await client.connect();
        const db = client.db(DB_NAME);

        // Ping database to confirm replica set primary is responsive
        await db.command({ ping: 1 });

        cachedClient = client;
        cachedDb = db;
        globalThis.__mongoClient = client;
        globalThis.__mongoDb = db;

        console.log(`✅ [MongoDB] Successfully connected to MongoDB Atlas database: "${DB_NAME}"`);
        return { client, db };
      } catch (err) {
        console.warn(`⚠️ [MongoDB] Connection attempt ${attempt} failed: ${err.message}`);
        if (attempt <= maxRetries) {
          console.log(`[MongoDB] Retrying in ${retryDelayMs}ms...`);
          await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
        } else {
          console.error('❌ [MongoDB] All connection attempts to Atlas failed:', err.message || err);
          cachedClient = null;
          cachedDb = null;
          globalThis.__mongoClient = null;
          globalThis.__mongoDb = null;
          connectionPromise = null;
          throw err;
        }
      }
    }
  })();

  try {
    const res = await connectionPromise;
    return res;
  } finally {
    connectionPromise = null;
  }
}

export function getDb() {
  if (!cachedDb) {
    throw new Error('Database not connected. Call connectToDatabase() first.');
  }
  return cachedDb;
}

export function getClient() {
  return cachedClient;
}

export async function pingDb() {
  const start = performance.now();
  const { db } = await connectToDatabase();
  const res = await db.command({ ping: 1 });
  const latencyMs = Math.round(performance.now() - start);
  return { ok: res.ok === 1, latencyMs };
}

export async function getDatabaseStatus() {
  try {
    const { db } = await connectToDatabase();
    const start = performance.now();
    await db.command({ ping: 1 });
    const latencyMs = Math.round(performance.now() - start);

    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((c) => c.name);

    return {
      connected: true,
      dbName: DB_NAME,
      host: 'cluster0.yq3tw5x.mongodb.net',
      collections: collectionNames,
      collectionsCount: collectionNames.length,
      latencyMs,
      message: `Connected to MongoDB Atlas [${DB_NAME}] with ${collectionNames.length} active collections.`,
    };
  } catch (err) {
    return {
      connected: false,
      dbName: DB_NAME,
      host: 'cluster0.yq3tw5x.mongodb.net',
      collections: [],
      collectionsCount: 0,
      error: err.message || String(err),
      message: `Failed to connect to MongoDB Atlas: ${err.message}`,
    };
  }
}
