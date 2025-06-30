import express from 'express';

const router = express.Router();
import { getProject, addProject, editProject, deleteProject } from '../controllers/projectController.js';

// Get all projects
router.get('/', getProject); 

// Add a new project
router.post('/', addProject);

// Edit a Project
router.put('/:id', editProject);

// Delete a Project
router.delete('/:id', deleteProject);

export default router;