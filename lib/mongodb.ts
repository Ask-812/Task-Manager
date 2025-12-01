import { MongoClient } from 'mongodb';

let client: MongoClient;
let clientPromise: Promise<MongoClient> | null = null;

function getClientPromise() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MongoDB URI not found');
  }

  if (!clientPromise) {
    const uri = process.env.MONGODB_URI;
    
    // MongoDB options
    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };
    
    if (process.env.NODE_ENV === 'development') {
      let globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>;
      };

      if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri, options);
        globalWithMongo._mongoClientPromise = client.connect();
      }
      clientPromise = globalWithMongo._mongoClientPromise;
    } else {
      client = new MongoClient(uri, options);
      clientPromise = client.connect();
    }
  }
  
  return clientPromise;
}

export async function connectToDatabase() {
  try {
    const client = await getClientPromise();
    const db = client.db('taskmanager');
    return { client, db };
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw error;
  }
}

export default getClientPromise;