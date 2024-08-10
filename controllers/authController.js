import jwt from 'jsonwebtoken';
import User from '../models/Users.js';
import sendEmail from '../utils/sendEmail.js';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export const register = async (req, res) => {
    const { name, email, password, profileImage,state,city } = req.body;

    try {
        const user = await User.create({ name, email, password, profileImage,state,city });

        const verifyToken = generateToken(user._id);
        const url = `${process.env.CLIENT_URL}/verify-email?token=${verifyToken}`;

        await sendEmail({
            email: user.email,
            subject: 'Verify your email',
            message: `<a href="${url}">Verify Email</a>`,
        });

        res.status(201).json({ message: 'User registered. Please check your email to verify your account.' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const verifyEmail = async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ message: 'Invalid or missing token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Token expired or invalid' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (!user.isVerified) {
            return res.status(401).json({ message: 'Please verify your email to login' });
        }

        const token = generateToken(user._id);
        res.status(200).json({ token,user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, isAdmin } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's name and isAdmin status
        if (name) user.name = name;
        if (typeof isAdmin === 'boolean') user.isAdmin = isAdmin;

        // Save the updated user information
        await user.save();

        res.status(200).json({
            message: 'User updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const sendAlertsToUsers = async (req, res) => {
    const { state, city, subject, message } = req.body;

    if (!state || !city || !subject || !message) {
        return res.status(400).json({ error: 'State, city, subject, and message are required.' });
    }

    try {
        // Fetch users based on state and city
        const users = await User.find({ state, city });

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found for the specified state and city.' });
        }

        // Send email to each user
        for (const user of users) {
            await sendEmail({
                email: user.email,
                subject,
                message,
            });
        }

        return res.status(200).json({ message: 'Alerts sent successfully to users.' });
    } catch (error) {
        console.error('Error sending alerts:', error);
        return res.status(500).json({ error: 'Failed to send alerts.' });
    }
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = generateToken(user._id);
        const url = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

        await sendEmail({
            email: user.email,
            subject: 'Reset Password',
            message: `<a href="${url}">Reset Password</a>`,
        });

        res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const resetPassword = async (req, res) => {
    const { token, password } = req.body;

    if (!token) {
        return res.status(400).json({ message: 'Invalid or missing token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        user.password = password;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Token expired or invalid' });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const verifyToken = async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        res.status(200).json({ message: 'Token is valid' });
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
