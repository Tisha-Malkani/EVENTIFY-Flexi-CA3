const jwt = require('jsonwebtoken');
const User = require('../model/User'); 

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = { id: decoded.userId }; 
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token is invalid or expired' });
  }
};

module.exports = { verifyToken };
