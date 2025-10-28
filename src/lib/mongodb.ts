import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

/**
 * Mongoose connection caching for Next.js hot-reload / serverless environments.
 * Keeps a single connection in `global` to avoid creating multiple connections.
 */
declare global {
  var _mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    cached!.promise = mongoose
      .connect(MONGODB_URI!, {
        bufferCommands: false,
        dbName: "todos",
      })
      .then((mongooseInstance) => {
        return mongooseInstance;
      });
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
};
