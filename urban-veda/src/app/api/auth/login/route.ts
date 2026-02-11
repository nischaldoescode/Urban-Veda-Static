// admin login endpoint
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";
import { verifyPassword, generateToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    await connectDB();

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return NextResponse.json(
        { success: false, error: "invalid credentials" },
        { status: 401 },
      );
    }

    const isValid = await verifyPassword(password, admin.passwordHash);

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
      maxAge: 60 * 60 * 24 * 7, // 7 days
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