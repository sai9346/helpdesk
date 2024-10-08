// backend/models/Ticket.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Active', 'Pending', 'Closed'], default: 'Active' },
  notes: [noteSchema],
  lastUpdatedOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Ticket', ticketSchema);
