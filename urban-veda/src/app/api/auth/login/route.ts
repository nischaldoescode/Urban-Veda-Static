import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongodb";
import { verifyPassword, generateToken } from "@/lib/auth";
import mongoose from "mongoose";

// define schema inline to avoid any model caching issues
const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

function getAdminModel() {
  return mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // console.log("=== LOGIN DEBUG ===");
    // console.log("Username:", username);
    // console.log("Password length:", password?.length);

    await connectDB();

    const Admin = getAdminModel();

    // log which database we're connected to
    // console.log("DB name:", mongoose.connection.db?.databaseName);
    // console.log("Looking for username:", username);

    // find all admins to debug
    const allAdmins = await Admin.find({});
    // console.log("Total admins in collection:", allAdmins.length);
    // console.log(
    //   "Admin usernames:",
    //   allAdmins.map((a: any) => a.username),
    // );

    const admin = await Admin.findOne({ username });
    // console.log("findOne result:", admin ? "FOUND" : "NOT FOUND");

    if (!admin) {
      return NextResponse.json(
        { success: false, error: "invalid credentials" },
        { status: 401 },
      );
    }

    const isValid = await verifyPassword(password, admin.passwordHash);
    // console.log("Password valid:", isValid);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "invalid credentials" },
        { status: 401 },
      );
    }

    const token = generateToken({ username: admin.username });

    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({
      success: true,
      data: { username: admin.username },
    });
  } catch (error) {
    console.error("login error:", error);
    return NextResponse.json(
      { success: false, error: "login failed" },
      { status: 500 },
    );
  }
}
