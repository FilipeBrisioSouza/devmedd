import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "mysql-devmed.alwaysdata.net",
  user: process.env.DB_USER || "devmed",
  password: process.env.DB_PASS || "c84dWEyVk9ujCez",
  database: process.env.DB_NAME || "devmed_senai",
});