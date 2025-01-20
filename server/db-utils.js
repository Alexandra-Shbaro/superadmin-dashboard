const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASS,
    database: "lumi",
    port: "3306",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

/**
 * Executes a SQL query using the connection pool.
 * @param {string} query - The SQL query to execute.
 * @param {Array} params - The parameters for the SQL query.
 * @returns {Promise<Array>} - Resolves with the result of the query.
 */
const execute = async (query, params = []) => {
    try {
        const [rows] = await pool.execute(query, params);
        return rows;
    } catch (error) {
        console.error("Database query failed:", error.message);
        throw error;
    }
};

module.exports = {
    execute,
};
