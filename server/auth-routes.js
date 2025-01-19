const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
const { execute } = require("./db-utils"); // Use the execute function for database operations

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const router = express.Router();

// Login a user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user in the database by email
        const users = await execute("SELECT * FROM user WHERE user_email = ?", [email]);
        if (users.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = users[0];

        // Compare the plain-text password
        if (password !== user.password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate a JWT with the complete user details
        const token = jwt.sign(
            {
                user_id: user.user_id,
                username: user.username,
                user_email: user.user_email,
                user_type: user.user_type,
                requires_logout: user.requires_logout,
                user_status: user.user_status,
                user_role_id: user.user_role_id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Return the user details and the token
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                user_id: user.user_id,
                username: user.username,
                user_email: user.user_email,
                user_type: user.user_type,
                requires_logout: user.requires_logout,
                user_status: user.user_status,
                user_role_id: user.user_role_id,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Create an agency admin user
router.post("/create-agency-admin", async (req, res) => {
    const {
        companyTagline,
        businessCategory,
        companySize,
        companyEmail,
        companyNumber,
        businessWebsite,
        companyAbout,
        companyVision,
        companyMission,
        companyName: username,
        email: user_email,
        password,
    } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // SQL query to insert the user
        const query = `
            INSERT INTO user (username, user_email, password, user_type, user_status, user_role_id)
            VALUES (?, ?, ?, 'Agency', 'Active', 18)
        `;

        // Execute the query
        const result = await execute(query, [username, user_email, hashedPassword]);

        res.status(201).json({
            message: "Agency admin created successfully",
            user_id: result.insertId,
        });
    } catch (error) {
        console.error("Error creating agency admin:", error);
        res.status(500).json({
            message: "Failed to create agency admin",
            error: error.message,
        });
    }
});
module.exports = router;
