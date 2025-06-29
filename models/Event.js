import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: String,
  date: String,
  time: String,
  location: String,
  description: String,
  image: String
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
