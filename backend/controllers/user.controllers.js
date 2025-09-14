
// Import required modules
const blackListTokenModel = require('../models/blackListToken.model');
const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

/**
 * Register a new user
 * @route POST /api/users/register
 */
module.exports.registerUser = async (req, res, next) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Check if user already exists
    const isUserAlready = await userModel.findOne({ email });
    if (isUserAlready) {
        return res.status(400).json({ message: 'User already exist' });
    }

    // Hash password and create user
    const hashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
        name,
        email,
        password: hashedPassword,
    });

    // Generate JWT token
    const token = user.generateAuthToken();

    // Respond with token and user info
    res.status(201).json({ token, user });
};

/**
 * Login a user
 * @route POST /api/users/login
 */
module.exports.loginUser = async (req, res, next) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user by email and include password
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = user.generateAuthToken();
    // Set token as cookie
    res.cookie('token', token);
    // Respond with token and user info
    res.status(200).json({ token, user });
};

/**
 * Get the authenticated user's profile
 * @route GET /api/users/profile
 */
module.exports.getUserProfile = async (req, res, next) => {
    // Respond with user info attached by auth middleware
    res.status(200).json(req.user);
};

/**
 * Logout a user and blacklist the token
 * @route GET /api/users/logout
 */
module.exports.logoutUser = async (req, res, next) => {
    // Clear the token cookie
    res.clearCookie('token');
    // Get token from cookies or Authorization header
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    // Blacklist the token
    await blackListTokenModel.create({ token });
    // Respond with logout message
    res.status(200).json({ message: 'Logged out' });
};