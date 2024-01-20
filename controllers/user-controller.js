// require User Schema
const User = require('../models/users');
const path = require('path');
const bcrypt = require('bcryptjs')

// signin signup page
module.exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Generate salt
        const salt = await bcrypt.genSalt(10);

        if (!salt) {
            throw new Error('Failed to generate salt');
        }

        // Hashing password
        const securedPassword = await bcrypt.hash(password, salt);

        // Check if user with the same email already exists
        let existingUser = await User.findOne({ email: email });

        if (existingUser) {
            // If a user with the specified email address exists, return an error response
            return res.json({ success: false, message: "Email already exists." });
        }

        // Create a new user if the email is unique
        let newUser = await User.create({
            username: username,
            email: email,
            password: securedPassword,
        });

        // Set user_id cookie and redirect to home
        res.cookie('user_id', newUser._id);
        return res.redirect('/');
    } catch (error) {
        console.error('Error during user signup:', error.message);
        // Provide a more detailed error response to help with debugging
        return res.json({ success: false, message: "Error creating user.", error: error.message });
    }
};


// render signin page 
module.exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Fetch the user from the database
        let user = await User.findOne({ email: email });

        // If the user does not exist, or the password is incorrect
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.json({ success: false, message: "Incorrect Email or Password." });
        }

        // Set user_id cookie and redirect
        res.cookie('user_id', user._id);
        return res.redirect('/');
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: "Some internal server error occurred." });
    }
}



// logout controller
module.exports.logout = (req, res) => {
    // chear cookie and redirect to signin
    res.clearCookie("user_id");
    return res.redirect('signin');
}