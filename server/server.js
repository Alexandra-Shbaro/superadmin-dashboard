const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { execute } = require("./db-utils"); 
const authRoutes = require("./auth-routes"); 
const agencyRoutes = require("./agency-routes"); 
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Lumi API" });
});

// Register Endpoint
app.post("/api/auth/register", async (req, res) => {
  const {
      username,
      email: user_email,
      password,
      agency_tagline,
      business_category,
      agency_size,
      business_email,
      agency_website_url,
      agency_about,
      agency_vision,
      agency_mission,
  } = req.body;

  try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert into user table
      const userQuery = `
          INSERT INTO user (username, user_email, password, user_type, requires_logout, user_status, user_role_id)
          VALUES (?, ?, ?, 'Agency', 0, 'Active', 18)
      `;
      const userResult = await execute(userQuery, [username, user_email, hashedPassword]);

      // Get the generated user_id
      const user_id = userResult.insertId;

      // Insert into agency table
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

      // Generate an access token
      const token = jwt.sign(
          {
              user_id,
              username,
              user_email,
              user_type: "Agency",
              user_status: "Active",
              user_role_id: 18,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
      );

      // Return the access token
      res.status(201).json({
          message: "User registered successfully",
          token,
      });
  } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({
          message: "Failed to register user",
          error: error.message,
      });
  }
});

// Create Platform Manager Endpoint
app.post("/api/platform-managers", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
  if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
  }

  try {
      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { user_role_id, user_type, user_id } = decoded;

      // Log the decoded token for debugging
      console.log("Decoded Token:", decoded);

      // Check if the user is authorized to create a platform manager
      if (user_role_id !== 18 || user_type !== "Agency") {
          return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      }

      // Fetch the agency_id from the database using the user_id
      const agencyQuery = `SELECT agency_id FROM agency WHERE user_id = ?`;
      const agencyResult = await execute(agencyQuery, [user_id]);

      if (agencyResult.length === 0) {
          return res.status(404).json({ message: "Agency not found for the current user" });
      }

      const agency_id = agencyResult[0].agency_id;

      // Log the agency_id for debugging
      console.log("Agency ID:", agency_id);

      // Extract Platform Manager details from request body
      const {
          username,
          email: user_email,
          password,
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
          employment_type,
          start_date,
          work_hours,
      } = req.body;

      // Check for missing required fields
      if (!username || !user_email || !password) {
          return res.status(400).json({ message: "Username, email, and password are required" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert into the user table
      const userQuery = `
          INSERT INTO user (username, user_email, password, user_type, requires_logout, user_status, user_role_id)
          VALUES (?, ?, ?, 'Agency', 1, 'Active', 19)
      `;
      const userResult = await execute(userQuery, [username, user_email, hashedPassword]);

      // Get the generated user_id
      const new_user_id = userResult.insertId;

      // Prepare parameters for agency_user_details
      const agencyUserDetailsParams = [
          new_user_id,
          agency_id, // Use the agency_id fetched from the database
          first_name || null,
          last_name || null,
          personal_email || null,
          phone_number || null,
          date_of_birth || null,
          area || null,
          street || null,
          building || null,
          emergency_contact_name || null,
          emergency_contact_relationship || null,
          emergency_contact_email || null,
          emergency_contact_number || null,
          employment_type || null,
          start_date || null,
          work_hours || null,
      ];

      // Log the parameters for debugging
      console.log("Agency User Details Parameters:", agencyUserDetailsParams);

      // Insert into the agency_user_details table
      const agencyUserDetailsQuery = `
          INSERT INTO agency_user_details (
              user_id,
              agency_id,
              department_id,
              role_id,
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
              employment_type,
              start_date,
              work_hours
          ) VALUES (?, ?, 5, 19, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      await execute(agencyUserDetailsQuery, agencyUserDetailsParams);

      res.status(201).json({
          message: "Platform Manager created successfully",
          user_id: new_user_id,
      });
  } catch (error) {
      console.error("Error creating Platform Manager:", error);
      if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Invalid or expired token" });
      }
      res.status(500).json({
          message: "Failed to create Platform Manager",
          error: error.message,
      });
  }
});


app.use("/api/auth", authRoutes);
app.use("/api/agency", agencyRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
