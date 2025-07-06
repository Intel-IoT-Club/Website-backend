import Event from '../models/Event.js';

// Get all events
export const getEvent = async (req, res) => {
    try {
        const events = await Event.find().sort({ date: -1 }); // ← sort by date DESCENDING
        if(!events || events.length === 0) {
          return res.status(404).json({ message: 'No events found' });}
        res.status(200).json(events);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error: error.message });
      }
};

//Add a new event
export const addEvent = async (req, res) => {
      try{
        const newEvent = new Event(req.body);
        await newEvent.save();
        if(!newEvent) {
          return res.status(400).json({ message: 'Error adding event' });
        }
        res.status(201).json({ message: 'Event added successfully' });}
      catch (err) {
        res.status(500).json({ message: 'Error adding event', error: err });
      }
};


//Edit a specific event 
export const editEvent = async(req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (err) {
    res.status(500).json({ message: 'Error updating event', error: err });
  }
};

//Delete a specific event
export const deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event deleted successfully' });
      } catch (err) {
        res.status(500).json({ message: 'Error deleting event', error: err });
      }
};


export const searchEvents = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: 'Title query parameter is required' });
    }

    const events = await Event.find({
      title: { $regex: title, $options: 'i' }  // case-insensitive search
    });

    if (events.length === 0) {
      return res.status(404).json({ message: 'No events found matching the title' });
    }

    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error searching events', error: err.message });
  }
};