import { connectDB } from "@/lib/db";
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

    console.log("Received fields:", { name, address, city, state, contact, email_id });
    console.log("File received:", file ? file.name : "❌ no file");

    let imageUrl = null;

    if (file && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // ✅ Upload to Cloudinary via REST API (unsigned preset)
      const uploadForm = new FormData();
      uploadForm.append("file", new Blob([buffer]), file.name);
      uploadForm.append("upload_preset", "schools_unsigned");

      const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: "POST",
        body: uploadForm,
      });

      const data = await uploadRes.json();

      if (data.secure_url) {
        imageUrl = data.secure_url;
        console.log("✅ Cloudinary upload success:", imageUrl);
      } else {
        throw new Error(data.error?.message || "Cloudinary upload failed");
      }
    }

    // ✅ Save record in DB
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
