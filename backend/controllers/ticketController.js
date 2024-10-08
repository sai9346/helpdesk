// backend/controllers/ticketController.js
const Ticket = require('../models/Ticket');
const User = require('../models/User');

// Create a new ticket
exports.createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    const ticket = await Ticket.create({
      title,
      description,
      customer: req.user._id,
      status: 'Active',
    });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all tickets for a customer or all tickets for agents/admins
exports.getTickets = async (req, res) => {
  try {
    const filter = req.user.role === 'customer' ? { customer: req.user._id } : {};
    const tickets = await Ticket.find(filter).populate('customer', 'name');
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a note to a ticket
exports.addNote = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    ticket.notes.push({
      text: req.body.note,
      user: req.user._id,
      role: req.user.role,
    });

    ticket.lastUpdatedOn = Date.now();
    await ticket.save();
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
