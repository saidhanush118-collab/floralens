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

let client = null;
let db = null;
let connectionPromise = null;

export async function connectToDatabase() {
  if (db && client) {
    return { client, db };
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = (async () => {
    try {
      console.log(`Connecting to MongoDB Atlas (DB: ${DB_NAME})...`);
      client = new MongoClient(MONGODB_URI, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: false,
          deprecationErrors: true,
        },
        connectTimeoutMS: 15000,
        socketTimeoutMS: 30000,
      });

      await client.connect();
      db = client.db(DB_NAME);
      console.log(`Successfully connected to MongoDB Atlas database: "${DB_NAME}"`);
      return { client, db };
    } catch (err) {
      console.error('Failed to connect to MongoDB Atlas:', err);
      client = null;
      db = null;
      connectionPromise = null;
      throw err;
    }
  })();

  return connectionPromise;
}

export function getDb() {
  if (!db) {
    throw new Error('Database not connected. Call connectToDatabase() first.');
  }
  return db;
}

export function getClient() {
  return client;
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
