import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import Models
import Timeline_events from './models/Timeline_Events.js';

// Import Routes
import eventRoutes from './routes/eventRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import membersRoutes from './routes/membersRoutes.js';
import timelineRoutes from './routes/timelineRoutes.js';

// Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); 

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Root Health Check
app.get('/', (req, res) => {
  res.send('Backend API is live!');
});

/* ROUTES */
app.use('/api/events', eventRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/members', membersRoutes);
app.use('/api/timeline', timelineRoutes);

// Special Timeline Get
app.get("/api/timeline-events", async (req, res) => {
  try {
    const events = await Timeline_events.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching timeline events', error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
