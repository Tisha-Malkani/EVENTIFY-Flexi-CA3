const express = require('express');
const router = express.Router();
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsForAdmin,
} = require('../controllers/eventController');
const { verifyToken } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getEvents);
router.get('/:id', getEventById);

// Admin-only routes
router.post('/create', verifyToken, createEvent);  
router.put('/:id', verifyToken, updateEvent);
router.delete('/:id', verifyToken, deleteEvent);
router.get('/admin/events', verifyToken, getEventsForAdmin);

module.exports = router;
