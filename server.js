import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

// Import Models
import Timeline_events from './models/Timeline_Events.js';

// Import Routes
import eventRoutes from './routes/eventRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import membersRoutes from './routes/membersRoutes.js';
import timelineRoutes from './routes/timelineRoutes.js';

import dotenv from 'dotenv';
dotenv.config();
  
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());

app.use(express.json());


// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB error:', err.message);
    process.exit(1);
  }
};

connectDB();


/* ROUTES */

// Events
app.use('/api/events', eventRoutes);

// Projects
app.use('/api/projects', projectRoutes);

// Members
app.use('/api/members', membersRoutes);

// Timeline Events
app.use('/api/timeline', timelineRoutes);

app.get("/api/timeline_events/get", async (req, res) => {
  try {
    const events = await Timeline_events.find().sort({ date: 1 }); // sorted by date ascending
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching timeline events', error: err.message });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
