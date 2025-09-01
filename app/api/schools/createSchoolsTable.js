// pages/api/schools.js
import { connectDB } from "../../lib/db";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const connection = await connectDB();

      // Ensure table exists before inserting
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS schools (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name TEXT NOT NULL,
          address TEXT NOT NULL,
          city TEXT NOT NULL,
          state TEXT NOT NULL,
          contact BIGINT NOT NULL,
          image TEXT,
          email_id TEXT NOT NULL
        )
      `);

      // Parse form-data (file + text fields)
      const form = formidable();
      form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({ error: "Form parsing error" });

        const { name, address, city, state, contact, email_id } = fields;

        // Save image filename only (or upload somewhere like S3)
        const imagePath = files.image?.[0]?.originalFilename || null;

        await connection.execute(
          "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [name, address, city, state, contact, imagePath, email_id]
        );

        await connection.end();
        return res.status(200).json({ message: "School added successfully!" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Database operation failed" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
