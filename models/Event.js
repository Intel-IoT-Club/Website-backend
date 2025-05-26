const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  date: String,
  time: String,
  location: String,
  description: String,
  image: String
});

module.exports = mongoose.model('Event', eventSchema);
