// src/database/config.js

const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
const path = require("path");

// Carrega .env.dev que está UM NÍVEL acima desta pasta “src/database”
dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env.dev") });

const pool = mysql.createPool({
  host:     process.env.DB_HOST, 
  database: process.env.DB_DATABASE, 
  user:     process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  port:     parseInt(process.env.DB_PORT, 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
