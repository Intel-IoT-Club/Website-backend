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
  
const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

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







// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:5001`);
});
