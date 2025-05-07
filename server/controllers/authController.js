const User = require('../models/User');
const OTP = require('../models/otp');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Generate a random 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP via email
const sendOTP = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Login OTP',
        text: `Your OTP for login is: ${otp}. This OTP will expire in 5 minutes.`
    };

    await transporter.sendMail(mailOptions);
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Return userId for OTP verification
        res.json({ userId: user._id });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.generateOTP = async (req, res) => {
    try {
        const { userId } = req.body;
        
        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate OTP
        const otp = generateOTP();

        // Save OTP to database
        await OTP.create({
            userId,
            otp: await bcrypt.hash(otp, 10)
        });

        // Send OTP to user's email
        await sendOTP(user.email, otp);

        res.json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('OTP generation error:', error);
        res.status(500).json({ message: 'Failed to generate OTP' });
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        const { userId, otp } = req.body;

        // Find the latest OTP for the user
        const otpDoc = await OTP.findOne({ userId }).sort({ createdAt: -1 });
        
        if (!otpDoc) {
            return res.status(400).json({ message: 'OTP expired or not found' });
        }

        // Verify OTP
        const isValid = await bcrypt.compare(otp, otpDoc.otp);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid OTP' });
        }

        // Delete the used OTP
        await OTP.deleteOne({ _id: otpDoc._id });

        // Generate JWT token
        const token = jwt.sign(
            { userId: userId },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token });
    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({ message: 'Failed to verify OTP' });
    }
};