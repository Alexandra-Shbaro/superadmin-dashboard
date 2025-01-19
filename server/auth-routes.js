const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
const { execute } = require("./db-utils"); // Use the execute function for database operations

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const router = express.Router();

// Login a user
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

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
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
        companyTagline: agency_tagline,
        businessCategory: business_category,
        companySize: agency_size,
        companyEmail: business_email,
        businessWebsite: agency_website_url,
        companyAbout: agency_about,
        companyVision: agency_vision,
        companyMission: agency_mission,
        companyName: username,
        email: user_email,
        password,
    } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into the `user` table
        const userQuery = `
            INSERT INTO user (username, user_email, password, user_type, user_status, user_role_id)
            VALUES (?, ?, ?, 'Agency', 'Active', 18)
        `;
        const userResult = await execute(userQuery, [username, user_email, hashedPassword]);

        // Get the `user_id` from the inserted user
        const user_id = userResult.insertId;

        // Insert into the `agency` table
        const agencyQuery = `
            INSERT INTO agency (
                user_id, 
                subscription_plan_id, 
                agency_tagline, 
                business_category, 
                agency_size, 
                business_email, 
                agency_website_url, 
                agency_about, 
                agency_vision, 
                agency_mission
            ) VALUES (?, 1, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const agencyResult = await execute(agencyQuery, [
            user_id,
            agency_tagline,
            business_category,
            agency_size,
            business_email,
            agency_website_url,
            agency_about,
            agency_vision,
            agency_mission,
        ]);

        // Get the `agency_id` from the inserted agency
        const agency_id = agencyResult.insertId;

        // Insert into the `agency_user_details` table
        const agencyUserDetailsQuery = `
            INSERT INTO agency_user_details (user_id, agency_id, role_id)
            VALUES (?, ?, 18)
        `;
        await execute(agencyUserDetailsQuery, [user_id, agency_id]);

        res.status(201).json({
            message: "Agency admin created successfully",
            user_id,
            agency_id,
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
