require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes'); 
const path = require('path');
const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'], 
};

// Apply CORS middleware with the specified options
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection using the DB_URI from .env
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/events', eventRoutes);   
app.use('/api/auth', authRoutes);      
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Catch-all route for unmatched routes (for better error handling)
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server using the PORT from .env
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
