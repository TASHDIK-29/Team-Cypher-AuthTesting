
// Import required modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, 'First name must be at least 3 characters long'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long'],
    },
    password: {
        type: String,
        required: true,
        select: false, // Do not return password field by default
    },
});

/**
 * Generate JWT auth token for the user
 * @returns {string} JWT token
 */
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return token;
};

/**
 * Compare a plain password with the hashed password
 * @param {string} password - Plain password to compare
 * @returns {Promise<boolean>} True if passwords match
 */
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

/**
 * Hash a plain password
 * @param {string} password - Plain password to hash
 * @returns {Promise<string>} Hashed password
 */
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

// Create and export the user model
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;