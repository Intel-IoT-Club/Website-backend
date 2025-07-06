import express from 'express';

import { getEvent, addEvent, editEvent, deleteEvent,getPaginatedEvents } from '../controllers/eventController.js';

const router = express.Router();

router.get('/paginated', getPaginatedEvents);

router.get('/', getEvent);

router.post('/', addEvent);

router.put('/:id', editEvent);

router.delete('/:id', deleteEvent);


export default router;