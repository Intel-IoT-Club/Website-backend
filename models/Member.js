const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: String,
  role: [String],
  bio: String,
  image: String,
  github: String,
  linkedin: String,
  email: String
});

module.exports = mongoose.model('Member', memberSchema);