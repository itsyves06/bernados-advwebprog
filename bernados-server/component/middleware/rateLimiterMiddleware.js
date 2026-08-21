const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // For password verification
const jwt = require('jsonwebtoken'); // For generating real tokens
const { loginLimiter } = require('./loginLimiter'); 
const User = require('./models/User'); // Import your Mongoose User model

const failedAttemptsStore = {};

function getLockoutDuration(attempts) {
    if (attempts >= 10) return 30 * 60; // 30 Minutes
    if (attempts >= 8) return 5 * 60;   // 5 Minutes
    if (attempts >= 5) return 3 * 60;   // 3 Minutes
    return 0;
}

router.post('/login', loginLimiter, async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ error: "Invalid input: Username and password are required." });
    }

    const clientKey = req.ip + "_" + username;
    const currentTime = Date.now();
    
    let record = failedAttemptsStore[clientKey] || { count: 0, lockedUntil: 0 };

    // Check if currently locked out
    if (currentTime < record.lockedUntil) {
        const waitSeconds = Math.ceil((record.lockedUntil - currentTime) / 1000);
        return res.status(429).json({
            error: `Account temporarily locked due to multiple failed login attempts. Try again in ${waitSeconds} seconds.`
        });
    }

    try {
        // 1. Fetch user from MongoDB using Mongoose (matches your Compass collection)
        const user = await User.findOne({ username });

        // 2. Setup timing attack defense with a dummy hash
        const dummyHash = '$2b$10$invalidhashvaluetopreventtimingattacksensecurely';
        const passwordHash = user ? user.password : dummyHash; // Assumes your field in Compass is named 'password'
        
        const isPasswordValid = await bcrypt.compare(password, passwordHash);
        const isAuthenticated = user && isPasswordValid;

        if (isAuthenticated) {
            // Reset failed attempts on success
            delete failedAttemptsStore[clientKey];

            // 3. Generate a real JWT token (expires in 1 hour)
            const token = jwt.sign(
                { userId: user._id, username: user.username },
                process.env.JWT_SECRET, // Store this in your .env file!
                { expiresIn: '1h' }
            );

            return res.status(200).json({ 
                message: "Login successful", 
                token 
            });
        } else {
            // Increment failed attempts
            record.count += 1;
            const lockoutSeconds = getLockoutDuration(record.count);
            
            if (lockoutSeconds > 0) {
                record.lockedUntil = currentTime + (lockoutSeconds * 1000);
            }
            
            failedAttemptsStore[clientKey] = record;

            return res.status(401).json({
                error: "Invalid credentials",
                failed_attempts: record.count,
                lockout_seconds: lockoutSeconds
            });
        }
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;