import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: String,
  role: [String],
  bio: String,
  image: String,
  github: String,
  linkedin: String,
  email: String
});

const Member = mongoose.model('Member', memberSchema);

export default Member;