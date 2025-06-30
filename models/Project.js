import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  github: String,
  demo: String
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
