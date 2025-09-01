import mysql from "mysql2/promise";

export async function connectDB() {
  const connection = await mysql.createConnection({
    host: "ballast.proxy.rlwy.net",  // Railway host
    user: "root",                     // Railway username
    password: "DgunJEpFTjdpHcwbwyOCOXQQhbBtEDxV", // Railway password
    database: "schooldb",             // Database name
    port: 50410,                      // Railway port
  });

  return connection;
}
