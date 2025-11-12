// config/env.js
import dotenv from 'dotenv';
dotenv.config();

const required = (name) => {
  const v = process.env[name];
  if (!v) {
    console.error(`❌ Missing required environment variable: ${name}`);
    process.exit(1);
  }
  return v;
};

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  MONGO_URI: required('MONGO_URI'),
};
