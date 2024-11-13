const Event = require('../model/Event');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });

// Fetch all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fetch a single event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new event (with image upload)
exports.createEvent = [
  upload.single('image'),
  async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;

      const { title, description, date, hostedBy } = req.body;
      const image = req.file ? req.file.path : null;

      const newEvent = new Event({
        title,
        description,
        date,
        hostedBy,
        createdBy: userId,
        image,
      });

      await newEvent.save();
      res.status(201).json(newEvent);
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ message: 'Error creating event', error: error.message });
    }
  }
];

// Update an event (only accessible by admin)
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }

    event.title = req.body.title || event.title;
    event.description = req.body.description || event.description;
    event.date = req.body.date || event.date;
    event.hostedBy = req.body.hostedBy || event.hostedBy;

    
    if (req.file) {
      event.image = req.file.path;
    }

    await event.save();
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: 'Error updating event', error: err.message });
  }
};

// Delete an event (only accessible by admin)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }
    await Event.findByIdAndDelete(req.params.id);
    if (event.image) {
        fs.unlinkSync(event.image); 
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting event', error: err.message });
  }
};

// Get events created by the logged-in admin
exports.getEventsForAdmin = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    const userId = decoded.userId; 

    const events = await Event.find({ createdBy: userId }); 

    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events for admin:', error);
    res.status(500).json({ message: 'Error fetching events for admin', error: error.message });
  }
};
