const jwt = require('jsonwebtoken');
const User = require('../model/User');

// Register controller
const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password ) {
    return res.status(400).json({ success: false, message: 'Email, password are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    const newUser = new User({ email, password });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ success: true, message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error in register controller:', error);  
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};


// Login controller
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, { expiresIn: '24h' });

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

// Get user data controller
const fetchUserData = async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await User.findById(userId).select('-password'); 

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  register,
  login,
  fetchUserData,
};
