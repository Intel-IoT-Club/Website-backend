import Project from "../models/Project.js";

// Get all projects
export const getProject = async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
};

// Add a new project
export const addProject = async (req, res) => {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json({ message: 'Project added successfully' });
};

//Edit a Project
export const editProject = async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project updated successfully', project: updatedProject });
    } catch (err) {
        res.status(500).json({ message: 'Error updating project', error: err });
  }
};

//Delete a Project

export const deleteProject = async (req, res) => {
    try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
    } catch (err) {
    res.status(500).json({ message: 'Error deleting project', error: err });
    }
};