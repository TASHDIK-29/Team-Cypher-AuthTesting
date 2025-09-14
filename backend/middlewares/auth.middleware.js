
// Import required modules
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blackListToken.model');

/**
 * Middleware to authenticate user using JWT token
 * Checks for token in cookies or Authorization header
 * Verifies token, checks blacklist, and attaches user to request
 */
module.exports.authUser = async (req, res, next) => {
    // Get token from cookies or Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    // If no token, deny access
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if token is blacklisted
    const isBlacklisted = await blackListTokenModel.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify token and get user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Find user by ID
        const user = await userModel.findById(decoded._id);
        // Attach user to request object
        req.user = user;
        return next();
    } catch (err) {
        // If token is invalid or expired
        return res.status(401).json({ message: 'Unauthorized' });
    }
};