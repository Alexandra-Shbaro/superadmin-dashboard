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

//Login Endpoint
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
      // Validate request body
      if (!email || !password) {
          return res.status(400).json({ message: "Email and password are required." });
      }

      // Fetch user by email
      const userQuery = `SELECT * FROM user WHERE user_email = ?`;
      const userResult = await execute(userQuery, [email]);

      if (userResult.length === 0) {
          return res.status(404).json({ message: "User not found" });
      }

      const user = userResult[0];

      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
          {
              user_id: user.user_id,
              username: user.username,
              user_email: user.user_email,
              user_type: user.user_type,
              user_status: user.user_status,
              user_role_id: user.user_role_id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
      );

      // Return success response
      res.status(200).json({
          message: "Login successful",
          token,
          user: {
              user_id: user.user_id,
              username: user.username,
              user_email: user.user_email,
              user_type: user.user_type,
              user_status: user.user_status,
              user_role_id: user.user_role_id,
          },
      });
  } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// Create Platform Manager 
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

// Get all Platform Managers for the agency
app.get("/api/platform-managers", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
  }

  try {
      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { user_role_id, user_type, user_id } = decoded;

      // Check if the user is authorized
      if (user_role_id !== 18 || user_type !== "Agency") {
          return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      }

      // Fetch the agency_id using the user_id
      const agencyQuery = `SELECT agency_id FROM agency WHERE user_id = ?`;
      const agencyResult = await execute(agencyQuery, [user_id]);

      if (agencyResult.length === 0) {
          return res.status(404).json({ message: "Agency not found for the current user" });
      }

      const agency_id = agencyResult[0].agency_id;

      // Fetch platform managers for the agency
      const platformManagersQuery = `
          SELECT 
              u.user_id, u.username, u.user_email, u.user_status, aud.first_name, aud.last_name, 
              aud.personal_email, aud.phone_number, aud.date_of_birth, aud.employment_type, aud.start_date, aud.work_hours
          FROM 
              user u
          INNER JOIN 
              agency_user_details aud ON u.user_id = aud.user_id
          WHERE 
              aud.agency_id = ? AND aud.role_id = 19
      `;
      const platformManagers = await execute(platformManagersQuery, [agency_id]);

      res.status(200).json(platformManagers);
  } catch (error) {
      console.error("Error fetching Platform Managers:", error);
      res.status(500).json({ message: "Failed to fetch Platform Managers", error: error.message });
  }
});

// Get details of a single Platform Manager
app.get("/api/platform-managers/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
  }

  try {
      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { user_role_id, user_type, user_id } = decoded;

      // Check if the user is authorized
      if (user_role_id !== 18 || user_type !== "Agency") {
          return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      }

      // Fetch the agency_id using the user_id
      const agencyQuery = `SELECT agency_id FROM agency WHERE user_id = ?`;
      const agencyResult = await execute(agencyQuery, [user_id]);

      if (agencyResult.length === 0) {
          return res.status(404).json({ message: "Agency not found for the current user" });
      }

      const agency_id = agencyResult[0].agency_id;

      // Extract platform manager ID from params
      const platformManagerId = req.params.id;

      // Fetch details of the platform manager
      const platformManagerQuery = `
          SELECT 
              u.user_id, u.username, u.user_email, u.user_status, aud.first_name, aud.last_name, 
              aud.personal_email, aud.phone_number, aud.date_of_birth, aud.area, aud.street, aud.building,
              aud.emergency_contact_name, aud.emergency_contact_relationship, aud.emergency_contact_email, 
              aud.emergency_contact_number, aud.employment_type, aud.start_date, aud.work_hours
          FROM 
              user u
          INNER JOIN 
              agency_user_details aud ON u.user_id = aud.user_id
          WHERE 
              aud.agency_id = ? AND aud.role_id = 19 AND aud.user_id = ?
      `;
      const platformManagerResult = await execute(platformManagerQuery, [agency_id, platformManagerId]);

      if (platformManagerResult.length === 0) {
          return res.status(404).json({ message: "Platform Manager not found" });
      }

      res.status(200).json(platformManagerResult[0]);
  } catch (error) {
      console.error("Error fetching Platform Manager details:", error);
      res.status(500).json({ message: "Failed to fetch Platform Manager details", error: error.message });
  }
});


// Edit Platform Manager
app.put("/api/platform-managers/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
  }

  try {
      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { user_role_id, user_type, user_id } = decoded;

      // Check if the user is authorized
      if (user_role_id !== 18 || user_type !== "Agency") {
          return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      }

      // Fetch the agency_id using the user_id
      const agencyQuery = `SELECT agency_id FROM agency WHERE user_id = ?`;
      const agencyResult = await execute(agencyQuery, [user_id]);

      if (agencyResult.length === 0) {
          return res.status(404).json({ message: "Agency not found for the current user" });
      }

      const agency_id = agencyResult[0].agency_id;

      // Extract platform manager ID and new details
      const platformManagerId = req.params.id;
      const {
          first_name,
          last_name,
          personal_email,
          phone_number,
          date_of_birth,
          employment_type,
          start_date,
          work_hours,
      } = req.body;

      // Update the platform manager in the agency_user_details table
      const updateQuery = `
          UPDATE agency_user_details
          SET 
              first_name = ?, 
              last_name = ?, 
              personal_email = ?, 
              phone_number = ?, 
              date_of_birth = ?, 
              employment_type = ?, 
              start_date = ?, 
              work_hours = ?
          WHERE 
              user_id = ? AND agency_id = ?
      `;
      await execute(updateQuery, [
          first_name || null,
          last_name || null,
          personal_email || null,
          phone_number || null,
          date_of_birth || null,
          employment_type || null,
          start_date || null,
          work_hours || null,
          platformManagerId,
          agency_id,
      ]);

      res.status(200).json({ message: "Platform Manager updated successfully" });
  } catch (error) {
      console.error("Error updating Platform Manager:", error);
      res.status(500).json({ message: "Failed to update Platform Manager", error: error.message });
  }
});

// Delete Platform Manager
app.delete("/api/platform-managers/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
  }

  try {
      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { user_role_id, user_type, user_id } = decoded;

      // Check if the user is authorized
      if (user_role_id !== 18 || user_type !== "Agency") {
          return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      }

      // Fetch the agency_id using the user_id
      const agencyQuery = `SELECT agency_id FROM agency WHERE user_id = ?`;
      const agencyResult = await execute(agencyQuery, [user_id]);

      if (agencyResult.length === 0) {
          return res.status(404).json({ message: "Agency not found for the current user" });
      }

      const agency_id = agencyResult[0].agency_id;

      // Extract platform manager ID from params
      const platformManagerId = req.params.id;

      // Delete the platform manager from the agency_user_details table
      const deleteDetailsQuery = `
          DELETE FROM agency_user_details
          WHERE user_id = ? AND agency_id = ?
      `;
      await execute(deleteDetailsQuery, [platformManagerId, agency_id]);

      // Delete the platform manager from the user table
      const deleteUserQuery = `DELETE FROM user WHERE user_id = ?`;
      await execute(deleteUserQuery, [platformManagerId]);

      res.status(200).json({ message: "Platform Manager deleted successfully" });
  } catch (error) {
      console.error("Error deleting Platform Manager:", error);
      res.status(500).json({ message: "Failed to delete Platform Manager", error: error.message });
  }
});

//Create User 
app.post("/api/users", async (req, res) => {
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

      // Check if the user is authorized
      if (user_role_id !== 18 || user_type !== "Agency") {
          return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      }

      // Fetch the agency_id using the user_id
      const agencyQuery = `SELECT agency_id FROM agency WHERE user_id = ?`;
      const agencyResult = await execute(agencyQuery, [user_id]);

      if (agencyResult.length === 0) {
          return res.status(404).json({ message: "Agency not found for the current user" });
      }

      const agency_id = agencyResult[0].agency_id;

      // Extract Normal User details from request body
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
          user_role_id: new_user_role_id,
          department_id,
      } = req.body;

      // Validate user_role_id and department_id
      if (!new_user_role_id || new_user_role_id < 1 || new_user_role_id > 17) {
          return res.status(400).json({ message: "Invalid user_role_id. It must be between 1 and 17." });
      }
      if (!department_id) {
          return res.status(400).json({ message: "department_id is required." });
      }

      // Check for required fields
      if (!username || !user_email || !password) {
          return res.status(400).json({ message: "Username, email, and password are required" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert into the user table
      const userQuery = `
          INSERT INTO user (username, user_email, password, user_type, requires_logout, user_status, user_role_id)
          VALUES (?, ?, ?, 'Agency', 1, 'Active', ?)
      `;
      const userResult = await execute(userQuery, [username, user_email, hashedPassword, new_user_role_id]);

      // Get the generated user_id
      const new_user_id = userResult.insertId;

      // Prepare parameters for agency_user_details
      const agencyUserDetailsParams = [
          new_user_id,
          agency_id, // Use the agency_id fetched from the database
          department_id,
          new_user_role_id,
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
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      await execute(agencyUserDetailsQuery, agencyUserDetailsParams);

      res.status(201).json({
          message: "Normal user created successfully",
          user_id: new_user_id,
      });
  } catch (error) {
      console.error("Error creating Normal User:", error);
      if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Invalid or expired token" });
      }
      res.status(500).json({
          message: "Failed to create Normal User",
          error: error.message,
      });
  }
});

// Get all  Users for the agency
app.get("/api/users", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
  }

  try {
      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { user_role_id, user_type, user_id } = decoded;

      // Check if the user is authorized
      if (user_role_id !== 18 || user_type !== "Agency") {
          return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      }

      // Fetch the agency_id using the user_id
      const agencyQuery = `SELECT agency_id FROM agency WHERE user_id = ?`;
      const agencyResult = await execute(agencyQuery, [user_id]);

      if (agencyResult.length === 0) {
          return res.status(404).json({ message: "Agency not found for the current user" });
      }

      const agency_id = agencyResult[0].agency_id;

      // Fetch all normal users for the agency
      const usersQuery = `
          SELECT 
              u.user_id, u.username, u.user_email, u.user_status, aud.first_name, aud.last_name, 
              aud.personal_email, aud.phone_number, aud.date_of_birth, aud.department_id, aud.role_id, 
              aud.area, aud.street, aud.building, aud.employment_type, aud.start_date, aud.work_hours
          FROM 
              user u
          INNER JOIN 
              agency_user_details aud ON u.user_id = aud.user_id
          WHERE 
              aud.agency_id = ? AND aud.role_id BETWEEN 1 AND 17
      `;
      const users = await execute(usersQuery, [agency_id]);

      res.status(200).json(users);
  } catch (error) {
      console.error("Error fetching Normal Users:", error);
      res.status(500).json({ message: "Failed to fetch Normal Users", error: error.message });
  }
});

// Get details of a single User
app.get("/api/users/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
  }

  try {
      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { user_role_id, user_type, user_id } = decoded;

      // Check if the user is authorized
      if (user_role_id !== 18 || user_type !== "Agency") {
          return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      }

      // Fetch the agency_id using the user_id
      const agencyQuery = `SELECT agency_id FROM agency WHERE user_id = ?`;
      const agencyResult = await execute(agencyQuery, [user_id]);

      if (agencyResult.length === 0) {
          return res.status(404).json({ message: "Agency not found for the current user" });
      }

      const agency_id = agencyResult[0].agency_id;

      // Extract normal user ID from params
      const userIdToFetch = req.params.id;

      // Fetch details of the normal user
      const userQuery = `
          SELECT 
              u.user_id, u.username, u.user_email, u.user_status, aud.first_name, aud.last_name, 
              aud.personal_email, aud.phone_number, aud.date_of_birth, aud.department_id, aud.role_id, 
              aud.area, aud.street, aud.building, aud.employment_type, aud.start_date, aud.work_hours
          FROM 
              user u
          INNER JOIN 
              agency_user_details aud ON u.user_id = aud.user_id
          WHERE 
              aud.agency_id = ? AND aud.role_id BETWEEN 1 AND 17 AND u.user_id = ?
      `;
      const userResult = await execute(userQuery, [agency_id, userIdToFetch]);

      if (userResult.length === 0) {
          return res.status(404).json({ message: "Normal User not found" });
      }

      res.status(200).json(userResult[0]);
  } catch (error) {
      console.error("Error fetching Normal User details:", error);
      res.status(500).json({ message: "Failed to fetch Normal User details", error: error.message });
  }
});

// Edit Normal User
app.put("/api/users/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
  }

  try {
      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { user_role_id, user_type, user_id } = decoded;

      // Check if the user is authorized
      if (user_role_id !== 18 || user_type !== "Agency") {
          return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      }

      // Fetch the agency_id using the user_id
      const agencyQuery = `SELECT agency_id FROM agency WHERE user_id = ?`;
      const agencyResult = await execute(agencyQuery, [user_id]);

      if (agencyResult.length === 0) {
          return res.status(404).json({ message: "Agency not found for the current user" });
      }

      const agency_id = agencyResult[0].agency_id;

      // Extract normal user ID and new details
      const userIdToUpdate = req.params.id;
      const {
          first_name,
          last_name,
          personal_email,
          phone_number,
          date_of_birth,
          area,
          street,
          building,
          employment_type,
          start_date,
          work_hours,
          department_id,
          user_role_id: new_user_role_id,
      } = req.body;

      // Validate user_role_id (only for the user being edited)
      if (!new_user_role_id || new_user_role_id < 1 || new_user_role_id > 17) {
          return res.status(400).json({ message: "Invalid user_role_id. It must be between 1 and 17 for the user being edited." });
      }

      // Update the normal user in the agency_user_details table
      const updateQuery = `
          UPDATE agency_user_details
          SET 
              first_name = ?, 
              last_name = ?, 
              personal_email = ?, 
              phone_number = ?, 
              date_of_birth = ?, 
              area = ?, 
              street = ?, 
              building = ?, 
              employment_type = ?, 
              start_date = ?, 
              work_hours = ?, 
              department_id = ?, 
              role_id = ?
          WHERE 
              user_id = ? AND agency_id = ?
      `;
      await execute(updateQuery, [
          first_name || null,
          last_name || null,
          personal_email || null,
          phone_number || null,
          date_of_birth || null,
          area || null,
          street || null,
          building || null,
          employment_type || null,
          start_date || null,
          work_hours || null,
          department_id,
          new_user_role_id,
          userIdToUpdate,
          agency_id,
      ]);

      res.status(200).json({ message: "Normal user updated successfully" });
  } catch (error) {
      console.error("Error updating Normal User:", error);
      res.status(500).json({ message: "Failed to update Normal User", error: error.message });
  }
});

// Delete User
app.delete("/api/users/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
  }

  try {
      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { user_role_id, user_type, user_id } = decoded;

      // Check if the user is authorized
      if (user_role_id !== 18 || user_type !== "Agency") {
          return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      }

      // Fetch the agency_id using the user_id
      const agencyQuery = `SELECT agency_id FROM agency WHERE user_id = ?`;
      const agencyResult = await execute(agencyQuery, [user_id]);

      if (agencyResult.length === 0) {
          return res.status(404).json({ message: "Agency not found for the current user" });
      }

      const agency_id = agencyResult[0].agency_id;

      // Extract normal user ID from params
      const userIdToDelete = req.params.id;

      // Delete the normal user from the agency_user_details table
      const deleteDetailsQuery = `
          DELETE FROM agency_user_details
          WHERE user_id = ? AND agency_id = ?
      `;
      await execute(deleteDetailsQuery, [userIdToDelete, agency_id]);

      // Delete the normal user from the user table
      const deleteUserQuery = `DELETE FROM user WHERE user_id = ?`;
      await execute(deleteUserQuery, [userIdToDelete]);

      res.status(200).json({ message: "Normal user deleted successfully" });
  } catch (error) {
      console.error("Error deleting Normal User:", error);
      res.status(500).json({ message: "Failed to delete Normal User", error: error.message });
  }
});

//Create Team
app.post("/api/teams", async (req, res) => {
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

      // Check if the user is authorized to create a team
      if (user_role_id !== 18 || user_type !== "Agency") {
          return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      }

      // Fetch the agency_id using the user_id
      const agencyQuery = `SELECT agency_id FROM agency WHERE user_id = ?`;
      const agencyResult = await execute(agencyQuery, [user_id]);

      if (agencyResult.length === 0) {
          return res.status(404).json({ message: "Agency not found for the current user" });
      }

      const agency_id = agencyResult[0].agency_id;

      // Extract team details from request body
      const {
          manager_id,
          team_title_id,
          department_id,
          team_name,
          team_description,
          team_status,
      } = req.body;

      // Validate required fields
      if (!manager_id || !team_title_id || !department_id || !team_name || !team_status) {
          return res.status(400).json({
              message: "manager_id, team_title_id, department_id, team_name, and team_status are required.",
          });
      }

      // Insert the new team into the `team` table, including `agency_id`
      const createTeamQuery = `
          INSERT INTO team (agency_id, manager_id, team_title_id, department_id, team_name, team_description, team_status, creation_date)
          VALUES (?, ?, ?, ?, ?, ?, ?, CURDATE())
      `;
      const result = await execute(createTeamQuery, [
          agency_id,
          manager_id,
          team_title_id,
          department_id,
          team_name,
          team_description || null,
          team_status,
      ]);

      // Return success response
      res.status(201).json({
          message: "Team created successfully",
          team_id: result.insertId,
      });
  } catch (error) {
      console.error("Error creating Team:", error);
      if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Invalid or expired token" });
      }
      res.status(500).json({
          message: "Failed to create Team",
          error: error.message,
      });
  }
});

//View All Teams
app.get("/api/teams", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
  }

  try {
      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { user_role_id, user_type, user_id } = decoded;

      // Log the decoded token for debugging
      console.log("Decoded Token:", decoded);

      // Check if the user is authorized
      if (user_role_id !== 18 || user_type !== "Agency") {
          return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      }

      // Fetch the agency_id using the user_id
      const agencyQuery = `SELECT agency_id FROM agency WHERE user_id = ?`;
      const agencyResult = await execute(agencyQuery, [user_id]);

      if (agencyResult.length === 0) {
          return res.status(404).json({ message: "Agency not found for the current user" });
      }

      const agency_id = agencyResult[0].agency_id;
      console.log("Agency ID:", agency_id); // Log agency_id

      // Fetch teams for this agency
      const teamsQuery = `
          SELECT 
              t.team_id, t.team_name, t.team_description, t.team_status, t.creation_date, 
              t.manager_id, t.team_title_id, t.department_id
          FROM 
              team t
          WHERE 
              t.agency_id = ?;
      `;
      const teams = await execute(teamsQuery, [agency_id]);
      console.log("Teams Query Result:", teams); // Log query result

      res.status(200).json(teams);
  } catch (error) {
      console.error("Error fetching teams:", error);
      res.status(500).json({ message: "Failed to fetch teams", error: error.message });
  }
});

//View Single Team 
app.get("/api/teams/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
  }

  try {
      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { user_role_id, user_type, user_id } = decoded;

      // Check if the user is authorized
      if (user_role_id !== 18 || user_type !== "Agency") {
          return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      }

      // Fetch the agency_id using the user_id
      const agencyQuery = `SELECT agency_id FROM agency WHERE user_id = ?`;
      const agencyResult = await execute(agencyQuery, [user_id]);

      if (agencyResult.length === 0) {
          return res.status(404).json({ message: "Agency not found for the current user" });
      }

      const agency_id = agencyResult[0].agency_id;

      // Extract team ID
      const teamId = req.params.id;

      // Fetch team details
      const teamQuery = `
          SELECT 
              t.team_id, t.team_name, t.team_description, t.team_status, t.creation_date, 
              t.manager_id, t.team_title_id, t.department_id
          FROM 
              team t
          WHERE 
              t.team_id = ? AND t.agency_id = ?;
      `;
      const teamResult = await execute(teamQuery, [teamId, agency_id]);

      if (teamResult.length === 0) {
          return res.status(404).json({ message: "Team not found" });
      }

      res.status(200).json(teamResult[0]);
  } catch (error) {
      console.error("Error fetching team details:", error);
      res.status(500).json({ message: "Failed to fetch team details", error: error.message });
  }
});

//Edit Team 
app.put("/api/teams/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
  }

  try {
      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { user_role_id, user_type, user_id } = decoded;

      // Check if the user is authorized
      if (user_role_id !== 18 || user_type !== "Agency") {
          return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      }

      // Fetch the agency_id using the user_id
      const agencyQuery = `SELECT agency_id FROM agency WHERE user_id = ?`;
      const agencyResult = await execute(agencyQuery, [user_id]);

      if (agencyResult.length === 0) {
          return res.status(404).json({ message: "Agency not found for the current user" });
      }

      const agency_id = agencyResult[0].agency_id;

      // Extract team ID and new details
      const teamId = req.params.id;
      const { manager_id, team_title_id, department_id, team_name, team_description, team_status } = req.body;

      // Validate required fields
      if (!manager_id || !team_title_id || !department_id || !team_name || !team_status) {
          return res.status(400).json({
              message: "manager_id, team_title_id, department_id, team_name, and team_status are required.",
          });
      }

      // Update the team
      const updateTeamQuery = `
          UPDATE team
          SET 
              manager_id = ?, 
              team_title_id = ?, 
              department_id = ?, 
              team_name = ?, 
              team_description = ?, 
              team_status = ?
          WHERE 
              team_id = ? AND agency_id = ?;
      `;
      await execute(updateTeamQuery, [
          manager_id,
          team_title_id,
          department_id,
          team_name,
          team_description || null,
          team_status,
          teamId,
          agency_id,
      ]);

      res.status(200).json({ message: "Team updated successfully" });
  } catch (error) {
      console.error("Error updating team:", error);
      res.status(500).json({ message: "Failed to update team", error: error.message });
  }
});

//Delete Team
app.delete("/api/teams/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
  }

  try {
      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { user_role_id, user_type, user_id } = decoded;

      // Check if the user is authorized
      if (user_role_id !== 18 || user_type !== "Agency") {
          return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      }

      // Fetch the agency_id using the user_id
      const agencyQuery = `SELECT agency_id FROM agency WHERE user_id = ?`;
      const agencyResult = await execute(agencyQuery, [user_id]);

      if (agencyResult.length === 0) {
          return res.status(404).json({ message: "Agency not found for the current user" });
      }

      const agency_id = agencyResult[0].agency_id;

      // Extract team ID
      const teamId = req.params.id;

      // Delete the team
      const deleteTeamQuery = `
          DELETE FROM team
          WHERE team_id = ? AND agency_id = ?;
      `;
      await execute(deleteTeamQuery, [teamId, agency_id]);

      res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
      console.error("Error deleting team:", error);
      res.status(500).json({ message: "Failed to delete team", error: error.message });
  }
});

//Create Client 
app.post("/api/clients", async (req, res) => {
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

      // Check if the user is authorized to create a client
      if (user_role_id !== 18 || user_type !== "Agency") {
          return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      }

      // Fetch the agency_id using the user_id
      const agencyQuery = `SELECT agency_id FROM agency WHERE user_id = ?`;
      const agencyResult = await execute(agencyQuery, [user_id]);

      if (agencyResult.length === 0) {
          return res.status(404).json({ message: "Agency not found for the current user" });
      }

      const agency_id = agencyResult[0].agency_id;

      // Extract client details from request body
      const {
          username,
          email: user_email,
          password,
          client_name,
          client_phone_number,
          client_email,
          client_website_url,
          client_address,
          client_industry,
      } = req.body;

      // Validate required fields
      if (!username || !user_email || !password || !client_name || !client_phone_number || !client_email) {
          return res.status(400).json({
              message: "username, email, password, client_name, client_phone_number, and client_email are required.",
          });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert into the `user` table
      const userQuery = `
          INSERT INTO user (username, user_email, password, user_type, requires_logout, user_status, user_role_id)
          VALUES (?, ?, ?, 'Client', 1, 'Active', 20)
      `;
      const userResult = await execute(userQuery, [username, user_email, hashedPassword]);

      // Get the generated user_id
      const new_user_id = userResult.insertId;

      // Insert into the `client` table
      const clientQuery = `
          INSERT INTO client (agency_id, client_name, client_phone_number, client_email, client_website_url, client_address, client_industry)
          VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      await execute(clientQuery, [
          agency_id,
          client_name,
          client_phone_number,
          client_email,
          client_website_url || null,
          client_address || null,
          client_industry || null,
      ]);

      // Return success response
      res.status(201).json({
          message: "Client created successfully",
          user_id: new_user_id,
      });
  } catch (error) {
      console.error("Error creating Client:", error);
      if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Invalid or expired token" });
      }
      res.status(500).json({
          message: "Failed to create Client",
          error: error.message,
      });
  }
});

//ViewAllClients
app.get("/api/clients", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
  }

  try {
      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { user_role_id, user_type, user_id } = decoded;

      // Check if the user is authorized
      if (user_role_id !== 18 || user_type !== "Agency") {
          return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      }

      // Fetch the agency_id using the user_id
      const agencyQuery = `SELECT agency_id FROM agency WHERE user_id = ?`;
      const agencyResult = await execute(agencyQuery, [user_id]);

      if (agencyResult.length === 0) {
          return res.status(404).json({ message: "Agency not found for the current user" });
      }

      const agency_id = agencyResult[0].agency_id;

      // Fetch all clients for the agency
      const clientsQuery = `
          SELECT 
              client_id, client_name, client_phone_number, client_email, 
              client_website_url, client_address, client_industry
          FROM 
              client
          WHERE 
              agency_id = ?;
      `;
      const clients = await execute(clientsQuery, [agency_id]);

      res.status(200).json(clients);
  } catch (error) {
      console.error("Error fetching clients:", error);
      res.status(500).json({ message: "Failed to fetch clients", error: error.message });
  }
});

//View Single client Details
app.get("/api/clients/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
  }

  try {
      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { user_role_id, user_type, user_id } = decoded;

      // Check if the user is authorized
      if (user_role_id !== 18 || user_type !== "Agency") {
          return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      }

      // Fetch the agency_id using the user_id
      const agencyQuery = `SELECT agency_id FROM agency WHERE user_id = ?`;
      const agencyResult = await execute(agencyQuery, [user_id]);

      if (agencyResult.length === 0) {
          return res.status(404).json({ message: "Agency not found for the current user" });
      }

      const agency_id = agencyResult[0].agency_id;

      // Fetch client details
      const clientId = req.params.id;
      const clientQuery = `
          SELECT 
              client_id, client_name, client_phone_number, client_email, 
              client_website_url, client_address, client_industry
          FROM 
              client
          WHERE 
              client_id = ? AND agency_id = ?;
      `;
      const clientResult = await execute(clientQuery, [clientId, agency_id]);

      if (clientResult.length === 0) {
          return res.status(404).json({ message: "Client not found" });
      }

      res.status(200).json(clientResult[0]);
  } catch (error) {
      console.error("Error fetching client details:", error);
      res.status(500).json({ message: "Failed to fetch client details", error: error.message });
  }
});

//Edit Client 
app.put("/api/clients/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
  }

  try {
      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { user_role_id, user_type, user_id } = decoded;

      // Check if the user is authorized
      if (user_role_id !== 18 || user_type !== "Agency") {
          return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      }

      // Fetch the agency_id using the user_id
      const agencyQuery = `SELECT agency_id FROM agency WHERE user_id = ?`;
      const agencyResult = await execute(agencyQuery, [user_id]);

      if (agencyResult.length === 0) {
          return res.status(404).json({ message: "Agency not found for the current user" });
      }

      const agency_id = agencyResult[0].agency_id;

      // Extract client ID and new details
      const clientId = req.params.id;
      const { client_name, client_phone_number, client_email, client_website_url, client_address, client_industry } = req.body;

      // Validate required fields
      if (!client_name || !client_phone_number || !client_email) {
          return res.status(400).json({
              message: "client_name, client_phone_number, and client_email are required.",
          });
      }

      // Update the client
      const updateClientQuery = `
          UPDATE client
          SET 
              client_name = ?, 
              client_phone_number = ?, 
              client_email = ?, 
              client_website_url = ?, 
              client_address = ?, 
              client_industry = ?
          WHERE 
              client_id = ? AND agency_id = ?;
      `;
      await execute(updateClientQuery, [
          client_name,
          client_phone_number,
          client_email,
          client_website_url || null,
          client_address || null,
          client_industry || null,
          clientId,
          agency_id,
      ]);

      res.status(200).json({ message: "Client updated successfully" });
  } catch (error) {
      console.error("Error updating client:", error);
      res.status(500).json({ message: "Failed to update client", error: error.message });
  }
});

//Delete Client
app.delete("/api/clients/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
  }

  try {
      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { user_role_id, user_type, user_id } = decoded;

      // Check if the user is authorized
      if (user_role_id !== 18 || user_type !== "Agency") {
          return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      }

      // Fetch the agency_id using the user_id
      const agencyQuery = `SELECT agency_id FROM agency WHERE user_id = ?`;
      const agencyResult = await execute(agencyQuery, [user_id]);

      if (agencyResult.length === 0) {
          return res.status(404).json({ message: "Agency not found for the current user" });
      }

      const agency_id = agencyResult[0].agency_id;

      // Extract client ID
      const clientId = req.params.id;

      // Delete the client
      const deleteClientQuery = `
          DELETE FROM client
          WHERE client_id = ? AND agency_id = ?;
      `;
      await execute(deleteClientQuery, [clientId, agency_id]);

      res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
      console.error("Error deleting client:", error);
      res.status(500).json({ message: "Failed to delete client", error: error.message });
  }
});

//Create Campaign
app.post("/api/campaigns", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
  }

  try {
      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { user_role_id, user_type, user_id } = decoded;

      // Log the decoded token for debugging
      console.log("Decoded Token:", decoded);

      // Check if the user is authorized to create a campaign
      if (user_role_id !== 18 || user_type !== "Agency") {
          return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      }

      // Fetch the agency_id using the user_id
      const agencyQuery = `SELECT agency_id FROM agency WHERE user_id = ?`;
      const agencyResult = await execute(agencyQuery, [user_id]);

      if (agencyResult.length === 0) {
          return res.status(404).json({ message: "Agency not found for the current user" });
      }

      const agency_id = agencyResult[0].agency_id;

      // Extract campaign details from request body
      const {
          client_id,
          campaign_title,
          campaign_description,
          campaign_start_date,
          campaign_end_date,
          strategy_start_date,
          strategy_end_date,
          design_start_date,
          design_end_date,
          prototype_start_date,
          prototype_end_date,
          analysis_start_date,
          analysis_end_date,
          total_budget,
          advertising_spend,
          analytics_tools,
          campaign_activity,
          campaign_status,
          campaign_phase,
      } = req.body;

      // Validate required fields
      if (!client_id || !campaign_title || !campaign_start_date || !campaign_end_date || !total_budget) {
          return res.status(400).json({
              message: "client_id, campaign_title, campaign_start_date, campaign_end_date, and total_budget are required.",
          });
      }

      // Insert the new campaign into the `campaign` table
      const createCampaignQuery = `
          INSERT INTO campaign (
              client_id, campaign_title, campaign_description, campaign_start_date, campaign_end_date, 
              strategy_start_date, strategy_end_date, design_start_date, design_end_date, 
              prototype_start_date, prototype_end_date, analysis_start_date, analysis_end_date, 
              total_budget, advertising_spend, analytics_tools, creation_date, 
              campaign_activity, campaign_status, campaign_phase
          ) VALUES (
              ?, ?, ?, ?, ?, 
              ?, ?, ?, ?, 
              ?, ?, ?, ?, 
              ?, ?, ?, CURDATE(), 
              ?, ?, ?
          )
      `;
      const result = await execute(createCampaignQuery, [
          client_id,
          campaign_title,
          campaign_description || null,
          campaign_start_date,
          campaign_end_date,
          strategy_start_date || null,
          strategy_end_date || null,
          design_start_date || null,
          design_end_date || null,
          prototype_start_date || null,
          prototype_end_date || null,
          analysis_start_date || null,
          analysis_end_date || null,
          total_budget,
          advertising_spend || null,
          analytics_tools || null,
          campaign_activity || "Active",
          campaign_status || "OnTrack",
          campaign_phase || null,
      ]);

      // Return success response
      res.status(201).json({
          message: "Campaign created successfully",
          campaign_id: result.insertId,
      });
  } catch (error) {
      console.error("Error creating Campaign:", error);
      res.status(500).json({
          message: "Failed to create Campaign",
          error: error.message,
      });
  }
});

//View All Campaigns
app.get("/api/campaigns", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
  }

  try {
      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { user_role_id, user_type, user_id } = decoded;

      // Check if the user is authorized
      if (user_role_id !== 18 || user_type !== "Agency") {
          return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      }

      // Fetch the agency_id using the user_id
      const agencyQuery = `SELECT agency_id FROM agency WHERE user_id = ?`;
      const agencyResult = await execute(agencyQuery, [user_id]);

      if (agencyResult.length === 0) {
          return res.status(404).json({ message: "Agency not found for the current user" });
      }

      const agency_id = agencyResult[0].agency_id;

      // Fetch all campaigns for the agency
      const campaignsQuery = `
          SELECT 
              c.campaign_id, c.campaign_title, c.campaign_description, 
              c.campaign_start_date, c.campaign_end_date, c.total_budget, 
              c.campaign_activity, c.campaign_status, c.campaign_phase
          FROM 
              campaign c
          INNER JOIN 
              client cl ON c.client_id = cl.client_id
          WHERE 
              cl.agency_id = ?;
      `;
      const campaigns = await execute(campaignsQuery, [agency_id]);

      res.status(200).json(campaigns);
  } catch (error) {
      console.error("Error fetching campaigns:", error);
      res.status(500).json({ message: "Failed to fetch campaigns", error: error.message });
  }
});

//View Single Campaign
app.get("/api/campaigns/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
  }

  try {
      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { user_role_id, user_type, user_id } = decoded;

      // Check if the user is authorized
      if (user_role_id !== 18 || user_type !== "Agency") {
          return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      }

      // Fetch the agency_id using the user_id
      const agencyQuery = `SELECT agency_id FROM agency WHERE user_id = ?`;
      const agencyResult = await execute(agencyQuery, [user_id]);

      if (agencyResult.length === 0) {
          return res.status(404).json({ message: "Agency not found for the current user" });
      }

      const agency_id = agencyResult[0].agency_id;

      // Fetch campaign details
      const campaignId = req.params.id;
      const campaignQuery = `
          SELECT 
              c.campaign_id, c.campaign_title, c.campaign_description, 
              c.campaign_start_date, c.campaign_end_date, c.total_budget, 
              c.campaign_activity, c.campaign_status, c.campaign_phase
          FROM 
              campaign c
          INNER JOIN 
              client cl ON c.client_id = cl.client_id
          WHERE 
              c.campaign_id = ? AND cl.agency_id = ?;
      `;
      const campaignResult = await execute(campaignQuery, [campaignId, agency_id]);

      if (campaignResult.length === 0) {
          return res.status(404).json({ message: "Campaign not found" });
      }

      res.status(200).json(campaignResult[0]);
  } catch (error) {
      console.error("Error fetching campaign details:", error);
      res.status(500).json({ message: "Failed to fetch campaign details", error: error.message });
  }
});

//Edit Campaign
app.put("/api/campaigns/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
  }

  try {
      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { user_role_id, user_type, user_id } = decoded;

      // Check if the user is authorized
      if (user_role_id !== 18 || user_type !== "Agency") {
          return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      }

      // Fetch the agency_id using the user_id
      const agencyQuery = `SELECT agency_id FROM agency WHERE user_id = ?`;
      const agencyResult = await execute(agencyQuery, [user_id]);

      if (agencyResult.length === 0) {
          return res.status(404).json({ message: "Agency not found for the current user" });
      }

      const agency_id = agencyResult[0].agency_id;

      // Extract campaign ID and new details
      const campaignId = req.params.id;
      const {
          campaign_title,
          campaign_description,
          campaign_start_date,
          campaign_end_date,
          total_budget,
          campaign_activity,
          campaign_status,
          campaign_phase,
      } = req.body;

      // Validate required fields
      if (!campaign_title || !campaign_start_date || !campaign_end_date || !total_budget) {
          return res.status(400).json({
              message: "campaign_title, campaign_start_date, campaign_end_date, and total_budget are required.",
          });
      }

      // Update the campaign
      const updateCampaignQuery = `
          UPDATE campaign
          SET 
              campaign_title = ?, 
              campaign_description = ?, 
              campaign_start_date = ?, 
              campaign_end_date = ?, 
              total_budget = ?, 
              campaign_activity = ?, 
              campaign_status = ?, 
              campaign_phase = ?
          WHERE 
              campaign_id = ?;
      `;
      await execute(updateCampaignQuery, [
          campaign_title,
          campaign_description || null,
          campaign_start_date,
          campaign_end_date,
          total_budget,
          campaign_activity || "Active",
          campaign_status || "OnTrack",
          campaign_phase || null,
          campaignId,
      ]);

      res.status(200).json({ message: "Campaign updated successfully" });
  } catch (error) {
      console.error("Error updating campaign:", error);
      res.status(500).json({ message: "Failed to update campaign", error: error.message });
  }
});

//Delete Campaign
app.delete("/api/campaigns/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
  }

  try {
      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { user_role_id, user_type, user_id } = decoded;

      // Check if the user is authorized
      if (user_role_id !== 18 || user_type !== "Agency") {
          return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      }

      // Fetch the agency_id using the user_id
      const agencyQuery = `SELECT agency_id FROM agency WHERE user_id = ?`;
      const agencyResult = await execute(agencyQuery, [user_id]);

      if (agencyResult.length === 0) {
          return res.status(404).json({ message: "Agency not found for the current user" });
      }

      const agency_id = agencyResult[0].agency_id;

      // Extract campaign ID
      const campaignId = req.params.id;

      // Delete the campaign
      const deleteCampaignQuery = `
          DELETE FROM campaign
          WHERE campaign_id = ? AND client_id IN (
              SELECT client_id FROM client WHERE agency_id = ?
          );
      `;
      await execute(deleteCampaignQuery, [campaignId, agency_id]);

      res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
      console.error("Error deleting campaign:", error);
      res.status(500).json({ message: "Failed to delete campaign", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
