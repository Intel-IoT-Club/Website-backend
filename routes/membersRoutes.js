import express from 'express';

import { getMember, addMember, editMember, deleteMember  } from '../controllers/membersController.js';

const router = express.Router();

// Get all members
router.get('/', getMember);

// Add a new member
router.post('/', addMember);

// Edit a member
router.put('/:id', editMember);

// Delete a member
router.delete('/:id', deleteMember);

export default router;