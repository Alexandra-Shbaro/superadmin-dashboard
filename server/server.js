const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { execute } = require("./db-utils"); // Import the execute function
const authRoutes = require("./auth-routes"); // Import the auth routes
const agencyRoutes = require("./agency-routes"); // Import the auth routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Basic route for testing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Lumi API" });
});

// Use the auth routes
app.use("/api/auth", authRoutes);
app.use("/api/agency", agencyRoutes);

// CRUD for platform manager
app.get("/api/platform-managers", async (req, res) => {
  try {
    const rows = await execute("SELECT * FROM platform_manager");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/api/platform-managers", async (req, res) => {
  const { user_id, request_id } = req.body;
  try {
    const result = await execute(
      "INSERT INTO platform_manager (user_id, request_id) VALUES (?, ?)",
      [user_id, request_id]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// CRUD for users
app.get("/api/users", async (req, res) => {
  try {
    const rows = await execute("SELECT * FROM user");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/api/users", async (req, res) => {
  const { username, user_email, password, user_type } = req.body;
  try {
    const result = await execute(
      "INSERT INTO user (username, user_email, password, user_type) VALUES (?, ?, ?, ?)",
      [username, user_email, password, user_type]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get roles and user count
app.get("/api/roles", async (req, res) => {
  try {
    const rows = await execute(`
      SELECT r.role_name, COUNT(aud.user_id) as user_count
      FROM role r
      LEFT JOIN agency_user_details aud ON r.role_id = aud.role_id
      GROUP BY r.role_id
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// CRUD for teams
app.get("/api/teams", async (req, res) => {
  try {
    const rows = await execute("SELECT * FROM team");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/api/teams", async (req, res) => {
  const { manager_id, team_title_id, department_id, team_name, team_description, team_status } = req.body;
  try {
    const result = await execute(
      "INSERT INTO team (manager_id, team_title_id, department_id, team_name, team_description, team_status, creation_date) VALUES (?, ?, ?, ?, ?, ?, CURDATE())",
      [manager_id, team_title_id, department_id, team_name, team_description, team_status]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// CRUD for campaigns
app.get("/api/campaigns", async (req, res) => {
  try {
    const rows = await execute("SELECT * FROM campaign");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/api/campaigns", async (req, res) => {
  const { client_id, campaign_title, campaign_description, campaign_start_date, campaign_end_date, total_budget } = req.body;
  try {
    const result = await execute(
      "INSERT INTO campaign (client_id, campaign_title, campaign_description, campaign_start_date, campaign_end_date, total_budget, creation_date) VALUES (?, ?, ?, ?, ?, ?, CURDATE())",
      [client_id, campaign_title, campaign_description, campaign_start_date, campaign_end_date, total_budget]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// CRUD for clients
app.get("/api/clients", async (req, res) => {
  try {
    const rows = await execute("SELECT * FROM client");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/api/clients", async (req, res) => {
  const { client_name, agency_id, client_phone_number, client_email, client_website_url, client_address, client_industry } = req.body;
  try {
    const result = await execute(
      "INSERT INTO client (client_name, agency_id, client_phone_number, client_email, client_website_url, client_address, client_industry) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [client_name, agency_id, client_phone_number, client_email, client_website_url, client_address, client_industry]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Campaign statistics
app.get("/api/campaign-stats", async (req, res) => {
  try {
    const totalCampaigns = await execute("SELECT COUNT(*) as count FROM campaign");
    const activeCampaigns = await execute("SELECT COUNT(*) as count FROM campaign WHERE campaign_activity = 'Active'");
    const completedCampaigns = await execute("SELECT COUNT(*) as count FROM campaign WHERE campaign_end_date < CURDATE()");
    const atRiskCampaigns = await execute("SELECT COUNT(*) as count FROM campaign WHERE campaign_status = 'AtRisk'");

    res.json({
      totalCampaigns: totalCampaigns[0].count,
      activeCampaigns: activeCampaigns[0].count,
      completedCampaigns: completedCampaigns[0].count,
      atRiskCampaigns: atRiskCampaigns[0].count,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// View single campaign
app.get("/api/campaigns/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const rows = await execute("SELECT * FROM campaign WHERE campaign_id = ?", [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Campaign not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Client activity (clients per month)
app.get("/api/client-activity", async (req, res) => {
  try {
    const rows = await execute(`
      SELECT DATE_FORMAT(creation_date, '%Y-%m') as month, COUNT(*) as client_count
      FROM client
      GROUP BY month
      ORDER BY month
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Top 3 clients
app.get("/api/top-clients", async (req, res) => {
  try {
    const rows = await execute(`
      SELECT c.client_name, COUNT(ca.campaign_id) as campaign_count
      FROM client c
      LEFT JOIN campaign ca ON c.client_id = ca.client_id
      GROUP BY c.client_id
      ORDER BY campaign_count DESC
      LIMIT 3
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
