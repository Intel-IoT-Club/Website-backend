// config/db.js
import mongoose from 'mongoose';
import { ENV } from './env.js';

export async function connectDB() {
  try {
    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    // Optional: retry logic/backoff could go here for production
    process.exit(1);
  }
}
