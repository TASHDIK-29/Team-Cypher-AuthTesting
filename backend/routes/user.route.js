// Import required modules
const express = require('express');
const { body } = require('express-validator');

// Import controllers and middleware
const userController = require('../controllers/user.controllers');
const authMiddleware = require('../middlewares/auth.middleware');

// Create a new router instance
const router = express.Router();

/**
 * @route   POST /register
 * @desc    Register a new user
 * @access  Public
 */
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid Email'),
    body('name').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  userController.registerUser
);

/**
 * @route   POST /login
 * @desc    Login a user
 * @access  Public
 */
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  userController.loginUser
);

/**
 * @route   GET /logout
 * @desc    Logout a user (requires authentication)
 * @access  Private
 */
router.get('/logout', authMiddleware.authUser, userController.logoutUser);

// Export the router
module.exports = router;