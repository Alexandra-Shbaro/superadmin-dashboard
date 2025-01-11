const express = require("express");
const app = express();
const cors = require ("cors");
const mysql = require("mysql2");
const PORT =8080;

app.use(cors());

const db = mysql.createPool({
    host: "localhost",  
    user: "root",  
    password: "alexandra", 
    database: "lumi",  
    port:"3307",
  });
  
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
    } else {
      console.log("Connected to MySQL database!");
      connection.release();  
    }
  });

  app.get("/api/home", (req, res) => {
    db.query("SELECT * FROM user", (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error querying database", error: err });
      }
      res.json(results);  
    });
  });

app.listen(PORT, () =>{
    console.log(`server started on ${PORT}`);
});