// get all juices and create new juice
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Juice from "@/lib/models/Juice";
import { isAuthenticated } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    await connectDB();

    const juices = await Juice.find({ isActive: true })
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: juices });
  } catch (error) {
    console.error("juices fetch error:", error);
    return NextResponse.json(
      { success: false, error: "failed to fetch juices" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: "unauthorized" },
        { status: 401 },
      );
    }

    const data = await request.json();

    await connectDB();

    const juice = await Juice.create(data);

    revalidatePath("/products");

    return NextResponse.json({ success: true, data: juice });
  } catch (error) {
    console.error("juice creation error:", error);
    return NextResponse.json(
      { success: false, error: "failed to create juice" },
      { status: 500 },
    );
  }
}
