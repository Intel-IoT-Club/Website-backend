import express from 'express';

import { addTimeline, editTimeline, deleteTimeline } from '../controllers/timelineController.js';

const router = express.Router();

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