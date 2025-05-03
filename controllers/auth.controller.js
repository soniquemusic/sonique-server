const soniqueUser = require('../models/auth.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const sendMail = require('../config/nodemailer');

exports.registerUser = async (req, res) => {
    const { fullName, email, password, gender, date, mobileNumber } = req.body;
    try {

        if (!fullName || !email || !password || !gender || !date || !mobileNumber) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const userExists = await soniqueUser.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new soniqueUser({
            fullName,
            gender,
            mobileNumber,
            date,
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {

        if (!email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const user = await soniqueUser.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect password.' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({
            token, user: { id: user._id, email: user.email, name: user.name, },
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
};

exports.userProfile = async (req, res) => {
    try {
        const user = await soniqueUser.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            user: { id: user._id, fullName: user.fullName, email: user.email, date: user.date, gender: user.gender, mobileNumber: user.mobileNumber }
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.updateUserProfile = async (req, res) => {
    const {
        fullName,
        email,
        gender,
        mobileNumber
    } = req.body;
    try {
        const user = await soniqueUser.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const updatedData = {
            fullName: fullName || user.fullName,
            email: email || user.email,
            gender: gender || user.gender,
            mobileNumber: mobileNumber || user.mobileNumber
        };

        const updatedUser = await soniqueUser.findByIdAndUpdate(req.user.id, updatedData, { new: true });

        res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                id: updatedUser._id,
                fullName: updatedUser.fullName,
                email: updatedUser.email,
                gender: updatedUser.gender,
                mobileNumber: updatedUser.mobileNumber
            }
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.forgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await soniqueUser.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const token = randomstring.generate();

        const updateToken = await soniqueUser.updateOne({ _id: user._id }, { $set: { token: token } });

        await sendMail(user.email, token);

        res.status(200).json({ message: 'Check your email for the password reset link', token: token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.query;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await soniqueUser.findOne({ token });
        if (!user) {
            return res.status(404).json({ error: 'Token is invalid or has expired' });
        }

        const updatePassword = await soniqueUser.findByIdAndUpdate(
            { _id: user._id },
            { $set: { password: hashedPassword, token: '' } },
            { new: true }
        );

        if (!updatePassword) {
            return res.status(500).json({ error: 'Failed to update password' });
        }

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error, please try again later' });
    }
};
