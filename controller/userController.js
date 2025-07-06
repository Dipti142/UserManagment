// const User = require('../model/userModel'); // Adjust path if needed
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken'); // For login, optional

// // Create/Register a user
// exports.registerUser = async (req, res) => {
//     try {
//         const { name, email, mobile, image, password, is_admin } = req.body;

//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Email already exists' });
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({
//             name,
//             email,
//             mobile,
//             image,
//             password: hashedPassword,
//             is_admin,
//         });

//         const savedUser = await newUser.save();
//         res.status(201).json(savedUser);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Get all users
// exports.getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find().select('-password'); // omit password
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Get a single user by ID
// exports.getUserById = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id).select('-password');
//         if (!user) return res.status(404).json({ message: 'User not found' });
//         res.json(user);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Update user
// exports.updateUser = async (req, res) => {
//     try {
//         const updates = req.body;
//         if (updates.password) {
//             updates.password = await bcrypt.hash(updates.password, 10);
//         }
//         const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
//             new: true,
//         });
//         res.json(updatedUser);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Delete user
// exports.deleteUser = async (req, res) => {
//     try {
//         await User.findByIdAndDelete(req.params.id);
//         res.json({ message: 'User deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Optional: Login
// exports.loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await User.findOne({ email });
//         if (!user) return res.status(404).json({ message: 'User not found' });

//         const match = await bcrypt.compare(password, user.password);
//         if (!match) return res.status(401).json({ message: 'Invalid credentials' });

//         const token = jwt.sign(
//             { id: user._id, is_admin: user.is_admin },
//             'your_secret_key', // replace with env secret
//             { expiresIn: '1d' }
//         );

//         res.json({ token, user: { name: user.name, email: user.email, is_admin: user.is_admin } });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };


const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    try {
        const { email, mobile, countryCode, password, role, profilePic, roleDescription } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            mobile,
            countryCode,
            password: hashedPassword,
            role,
            profilePic,
            roleDescription
        });

        const savedUser = await user.save();
        res.status(201).json({ message: "User registered successfully", user: savedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
       
        if (!match) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        //console.log(token, "hyyyy")
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
