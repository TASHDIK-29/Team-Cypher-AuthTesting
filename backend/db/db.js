
// Import mongoose for MongoDB connection
const mongoose = require('mongoose');

/**
 * Connect to MongoDB database using Mongoose
 * Uses DB_CONNECT from environment variables
 */
function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT)
        .then(() => {
            console.log('Connected to DB');
        })
        .catch((err) => {
            console.error('Failed to connect to DB:', err);
        });
}

// Export the connection function
module.exports = connectToDb;