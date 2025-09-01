import mysql from "mysql2/promise";

export async function connectDB() {
  const connection = await mysql.createConnection({
    host: "localhost",     // change to your MySQL host
    user: "root",          // your MySQL username
    password: "password",  // your MySQL password
    database: "schooldb",  // your database name
  });

  return connection;
}
