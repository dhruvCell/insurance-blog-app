import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/blog-app";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads in development.
 * This prevents connections growing exponentially during API Route usage.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached?.conn) {
    console.log("Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log("Attempting to connect to MongoDB...");
    console.log(`MongoDB URI: ${MONGODB_URI.replace(/\/\/.*@/, "//***:***@")}`); // Hide credentials in logs

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("MongoDB connected successfully!");
      console.log(`Database: ${mongoose.connection.db?.databaseName || 'unknown'}`);
      console.log(`Host: ${mongoose.connection.host}:${mongoose.connection.port}`);
      return mongoose;
    }).catch((error) => {
      console.error("MongoDB connection failed:", error.message);
      throw error;
    });
  }

  try {
    cached!.conn = await cached!.promise;
    return cached!.conn;
  } catch (error) {
    console.error("❌ Failed to establish MongoDB connection:", error);
    throw error;
  }
}

export default dbConnect;
