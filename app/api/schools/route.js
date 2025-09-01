import { connectDB } from "@/lib/db";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

// ✅ GET: fetch schools
export async function GET() {
  try {
    const db = await connectDB();
    const [rows] = await db.execute(
      "SELECT id, name, address, city, image FROM schools"
    );
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


// ✅ POST: add school with image
export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const file = formData.get("image");

    let filename = null;

    // ✅ Handle image file
    if (file && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public", "schoolImages");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      filename = Date.now() + "-" + file.name;
      const filePath = path.join(uploadDir, filename);

      // Write file to /public/schoolImages
      await fs.promises.writeFile(filePath, buffer);
    }

    // ✅ Save record in database
    const db = await connectDB();
    await db.execute(
      "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, email_id, filename]
    );

    return NextResponse.json({ message: "✅ School added successfully!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}