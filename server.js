const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import Models
const Event = require('./models/Event');
const Project = require('./models/Project');
const Member = require('./models/Member');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://inteliot:inteliot@backend.ipiryxk.mongodb.net/intel-iot-club', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

/* ROUTES */

// Events
app.get('/api/events', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

app.post('/api/events', async (req, res) => {
  const newEvent = new Event(req.body);
  await newEvent.save();
  res.status(201).json({ message: 'Event added successfully' });
});

// Projects
app.get('/api/projects', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.post('/api/projects', async (req, res) => {
  const newProject = new Project(req.body);
  await newProject.save();
  res.status(201).json({ message: 'Project added successfully' });
});

// Members
app.get('/api/members', async (req, res) => {
  const members = await Member.find();
  res.json(members);
});

app.post('/api/members', async (req, res) => {
  const newMember = new Member(req.body);
  await newMember.save();
  res.status(201).json({ message: 'Member added successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
