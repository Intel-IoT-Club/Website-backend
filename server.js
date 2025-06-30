import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';


// Import Models
import Timeline_events from './models/Timeline_Events.js';

// Import Routes
import eventRoutes from './routes/eventRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import membersRoutes from './routes/membersRoutes.js';
import timelineRoutes from './routes/timelineRoutes.js';
  
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Rate limiting 
const limiter = rateLimit({   //from express-rate-limit package
  windowMs: 15 * 60 * 1000, // 15 minutes time window has been set
  max: 50, // limiting each IP to 50 rquests per windowMs
  standardHeaders: true, 
  legacyHeaders: false, 
});
app.use(limiter);

// MongoDB Connection
mongoose.connect('mongodb+srv://inteliot:inteliot@backend.ipiryxk.mongodb.net/intel-iot-club')
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

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
