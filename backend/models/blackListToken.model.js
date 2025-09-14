
// Import mongoose for schema and model creation
const mongoose = require('mongoose');

// Define the schema for blacklisted tokens
const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true, // Ensure each token is only blacklisted once
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the creation date
        expires: 86400, // Document will be removed after 24 hours (in seconds)
    },
});

// Create and export the BlacklistToken model
module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);