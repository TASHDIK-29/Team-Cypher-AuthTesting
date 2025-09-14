
// Import the user model
const userModel = require('../models/user.model');

/**
 * Service to create a new user
 * @param {Object} param0 - User details
 * @param {string} param0.name - Name of the user
 * @param {string} param0.email - Email of the user
 * @param {string} param0.password - Password of the user
 * @returns {Promise<Object>} The created user document
 * @throws {Error} If any required field is missing
 */
module.exports.createUser = async ({ name, email, password }) => {
    // Validate required fields
    if (!name || !email || !password) {
        throw new Error('All fields are required');
    }

    // Create a new user in the database
    const user = await userModel.create({
        name,
        email,
        password,
    });

    // Return the created user
    return user;
};