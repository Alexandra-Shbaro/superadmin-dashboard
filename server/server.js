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





app.use("/api/auth", authRoutes);
app.use("/api/agency", agencyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
