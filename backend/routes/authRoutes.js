const express = require('express');
const router = express.Router();
const { register, login, getUserData } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');
const User = require('../model/User');
// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Get user data route (protected)
router.get('/me', verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.id); 
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
