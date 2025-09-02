import { connectDB } from "@/lib/db";
import { v2 as cloudinary } from "cloudinary";
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

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    console.log("📥 POST /api/schools called");

    const formData = await req.formData();

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const file = formData.get("image");

    // 🔎 Debug logs
    console.log("Received fields:", { name, address, city, state, contact, email_id });
    console.log("File received:", file ? file.name : "❌ no file");

    let imageUrl = null;

    if (file && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // ✅ Cloudinary upload (wrapped in Promise)
      imageUrl = await new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          { folder: "schools" },
          (error, result) => {
            if (error) {
              console.error("❌ Cloudinary upload failed:", error);
              return reject(error);
            }
            console.log("✅ Cloudinary upload success:", result.secure_url);
            resolve(result.secure_url);
          }
        );
        upload.end(buffer);
      });
    }

    const db = await connectDB();
    await db.execute(
      "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, email_id, imageUrl]
    );

    return NextResponse.json({
      message: "✅ School added successfully!",
      imageUrl,
    });
  } catch (error) {
    console.error("❌ POST /schools failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
