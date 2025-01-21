const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const { execute } = require("./db-utils"); 
const bcryptjs = require("bcryptjs");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const router = express.Router();

router.post("/create-platform-manager", async (req, res) => {
    const {
        name,
        lastName,
        dateOfBirth,
        emergencyContact,
        area,
        relationship,
        personalEmail,
        street,
        emergencyContactEmail,
        phoneNumber,
        building,
        emergencyContactNumber,
        department,
        employmentType,
        startDate,
        workHours,
        username,
        email,
        temporaryPassword,
    } = req.body;

    try {
        if (!email || !username || !temporaryPassword) {
            return res.status(400).json({ message: "Required fields are missing" });
        }

        const hashedPassword = await bcryptjs.hash(temporaryPassword, 10);

        const userQuery = `
            INSERT INTO user (username, user_email, password, user_type, user_status, user_role_id)
            VALUES (?, ?, ?, 'Agency', 'Active', 19)
        `;
        const userResult = await execute(userQuery, [username, email, hashedPassword]);

        const userId = userResult.insertId;

        const agencyUserDetailsQuery = `
            INSERT INTO agency_user_details (
                user_id, 
                first_name, 
                last_name, 
                personal_email, 
                phone_number, 
                date_of_birth, 
                area, 
                street, 
                building, 
                emergency_contact_name, 
                emergency_contact_relationship, 
                emergency_contact_email, 
                emergency_contact_number, 
                department_id, 
                employment_type, 
                start_date, 
                work_hours,
                role_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)
        `;
        await execute(agencyUserDetailsQuery, [
            userId,
            name,
            lastName,
            personalEmail,
            phoneNumber,
            dateOfBirth,
            area,
            street,
            building,
            emergencyContact,
            relationship,
            emergencyContactEmail,
            emergencyContactNumber,
            department,
            employmentType,
            startDate,
            workHours,
            19
        ]);

        res.status(201).json({ message: "Platform manager created successfully", user_id: userId });
    } catch (error) {
        console.error("Error creating platform manager:", error);
        res.status(500).json({ message: "Failed to create platform manager", error: error.message });
    }
});

module.exports = router;

module.exports = router;
