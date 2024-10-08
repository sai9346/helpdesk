// backend/routes/ticketRoutes.js
const express = require('express');
const { createTicket, getTickets, addNote } = require('../controllers/ticketController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Customer can create a new ticket
router.post('/create', authMiddleware, roleMiddleware(['customer']), createTicket);

// Agents and Admins can view all tickets
router.get('/all', authMiddleware, roleMiddleware(['admin', 'agent']), getTickets);

// Add a note to a ticket
router.post('/:id/note', authMiddleware, addNote);

module.exports = router;
