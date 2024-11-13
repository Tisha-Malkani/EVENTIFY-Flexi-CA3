const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  hostedBy: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true
  },
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
