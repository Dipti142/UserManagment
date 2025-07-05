

const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const { parsePhoneNumber } = require('libphonenumber-js');
const countries = require('i18n-iso-countries');
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

// ===== REGISTER =====
exports.register = async (req, res) => {
    try {
        const { name, countryCode, email, password, role, description } = req.body;

        // Input validation
        if (!name || !countryCode || !email || !password || !role) {
            return res.status(400).json({ message: 'All required fields must be filled.' });
        }

       
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ message: 'Email already registered.' });

        // Extract country from countryCode
        let country = 'Unknown';
        try {
            const phone = parsePhoneNumber(countryCode + '1234567890');
            if (phone && phone.country) {
                country = countries.getName(phone.country, 'en') || 'Unknown';
            }
        } catch { }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            countryCode,
            country,
            email,
            password: hashedPassword,
            role,
            description
        });

        await user.save();

        res.status(201).json({
            message: `User registered successfully from ${country}`,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                country: user.country
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ===== LOGIN =====
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: 'Email and password are required.' });

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

        res.status(200).json({
            message: `Login successful! Welcome ${user.name}`,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                country: user.country
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
