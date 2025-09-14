
// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Import custom modules
const userRouter = require('./routes/user.route');
const connectToDb = require('./db/db');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Connect to the database
connectToDb();

// Global Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cookieParser()); // Parse cookies
app.use(morgan('dev')); // HTTP request logger

// API Routes
app.use('/api/users', userRouter); // User-related routes

// Root route for health check or welcome message
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Export the app for use in server.js
module.exports = app;
