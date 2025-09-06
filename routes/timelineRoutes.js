import express from 'express';

import { addTimeline, editTimeline, deleteTimeline } from '../controllers/timelineController.js';

const router = express.Router();

import Timeline_events from "../models/Timeline_Events.js";



// GET /api/timeline
router.get("/", async (req, res) => {
  try {
    const events = await Timeline_events.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching timeline events", error: err.message });
  }
});



//Get Timeline
//get has a speacial intermediate path o it has been left in server.js
//router.get('/timeline_events/get', getTimeline);

// Add Timeline Event
router.post('/add', addTimeline);

// Edit Timeline Event
router.patch('/update/:id', editTimeline);

// Delete Timeline Event
router.delete('/delete/:id', deleteTimeline);

export default router;