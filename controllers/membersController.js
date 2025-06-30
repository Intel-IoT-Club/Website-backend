import Member from "../models/Member.js"

//Get all members
export const getMember = async (req, res) => {
    const members = await Member.find();
    if(!members || members.length === 0) {
      return res.status(404).json({ message: 'No members found' })};
    res.status(201).json(members);
}

// Add a new member
export const addMember = async (req, res) => {
    const newMember = new Member(req.body);
    await newMember.save();
    res.status(201).json({ message: 'Member added successfully' });
}

// Edit a member
export const editMember = async (req, res) => {
    try {
    const updatedMember = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMember) return res.status(404).json({ message: 'Member not found' });
    res.json({ message: 'Member updated successfully', member: updatedMember });
  } catch (err) {
    res.status(500).json({ message: 'Error updating member', error: err });
  }
}

// Delete a member
export const deleteMember = async (req, res) => {
      try {
        const deletedMember = await Member.findByIdAndDelete(req.params.id);
        if (!deletedMember) return res.status(404).json({ message: 'Member not found' });
        res.json({ message: 'Member deleted successfully' });
      } catch (err) {
        res.status(500).json({ message: 'Error deleting member', error: err });
      }
}