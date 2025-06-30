import Timeline_events from "../models/Timeline_Events.js";

// Get all timeline events
export const addTimeline = async (req, res) => {
    try {
    const newEvent = new Timeline_events(req.body);
    await newEvent.save();
    res.status(201).json({ message: 'Event added' });
    } catch (err) {
    res.status(500).json({ message: 'Error adding timeline event', error: err.message });
    }
};

//Edit a timeline event
export const editTimeline = async (req, res) => {
    try {
    const updatedEvent = await Timeline_events.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },  // only update fields sent in request
        { new: true }        // return the updated document
    );

    if (!updatedEvent) {
        return res.status(404).json({ message: 'Timeline event not found' });
    }

    res.json({ message: 'Timeline event updated successfully', event: updatedEvent });
    } catch (err) {
    res.status(500).json({ message: 'Error updating timeline event', error: err.message });
    }
};

//Delete a timeline event
export const deleteTimeline = async (req, res) => {
      try {
        const deletedEvent = await Timeline_events.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
          return res.status(404).json({ message: 'Timeline event not found' });
        }
        res.json({ message: 'Timeline event deleted successfully' });
      } catch (err) {
        res.status(500).json({ message: 'Error deleting timeline event', error: err.message });
      }
};