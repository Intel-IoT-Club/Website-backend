import express from 'express';

import { getEvent, addEvent, editEvent, deleteEvent,searchEvents} from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getEvent);

router.post('/', addEvent);

router.put('/:id', editEvent);

router.delete('/:id', deleteEvent);

router.get('/search', searchEvents);


export default router;