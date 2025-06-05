const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// Import Models
const Event = require('./models/Event');
const Project = require('./models/Project');
const Member = require('./models/Member');
const Admin = require('./models/Admin');

const token_key = "your_secret_key"; // To be added in .env file on Production , can also be changed before adding to .env file as per choice


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
app.get('/api/events', authenticateToken ,async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

app.post('/api/events', authenticateToken ,async (req, res) => {
  const newEvent = new Event(req.body);
  await newEvent.save();
  res.status(201).json({ message: 'Event added successfully' });
});

// Edit Event
app.put('/api/events/:id', authenticateToken ,async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (err) {
    res.status(500).json({ message: 'Error updating event', error: err });
  }
});

// Delete Event
app.delete('/api/events/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting event', error: err });
  }
});

// Projects
app.get('/api/projects', authenticateToken ,async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.post('/api/projects', authenticateToken ,async (req, res) => {
  const newProject = new Project(req.body);
  await newProject.save();
  res.status(201).json({ message: 'Project added successfully' });
});

// Edit Project
app.put('/api/projects/:id', authenticateToken ,async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project updated successfully', project: updatedProject });
  } catch (err) {
    res.status(500).json({ message: 'Error updating project', error: err });
  }
});

// Delete Project
app.delete('/api/projects/:id', authenticateToken ,async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting project', error: err });
  }
});

// Members
app.get('/api/members', async (req, res) => {
  const members = await Member.find();
  res.json(members);
});

app.post('/api/members', authenticateToken ,async (req, res) => {
  const newMember = new Member(req.body);
  await newMember.save();
  res.status(201).json({ message: 'Member added successfully' });
});

// Edit Member
app.put('/api/members/:id', async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMember) return res.status(404).json({ message: 'Member not found' });
    res.json({ message: 'Member updated successfully', member: updatedMember });
  } catch (err) {
    res.status(500).json({ message: 'Error updating member', error: err });
  }
});

// Delete Member
app.delete('/api/members/:id', authenticateToken ,async (req, res) => {
  try {
    const deletedMember = await Member.findByIdAndDelete(req.params.id);
    if (!deletedMember) return res.status(404).json({ message: 'Member not found' });
    res.json({ message: 'Member deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting member', error: err });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) return res.sendStatus(401); 
  if (err.name === 'TokenExpiredError') {
  return res.status(401).json({ message: 'Log-In Expired !' }); // This Can be remove on production and uncommenting the below line
  //return res.redirect('/') -- Uncomment on Production and add the home page url 
}

  jwt.verify(token, token_key, (err, user) => {
    if (err) return res.sendStatus(403); 

    req.user = user; 
    next();
  });
}

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Username" , username);
  try {
    const user = await Admin.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "Username does not exist" });
    }

    if (user.password === password) {
      const token = jwt.sign({ u: username }, token_key, { expiresIn: '1h' });
      return res.status(200).json({ message: "Login successful", token });
    } else {
      return res.status(401).json({ message: "Wrong password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in login" });
  }
});



// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
