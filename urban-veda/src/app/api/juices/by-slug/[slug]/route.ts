import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Juice from "@/lib/models/Juice";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    await connectDB();

    const juice = await Juice.findOne({ slug }).lean();

    if (!juice) {
      return NextResponse.json(
        { success: false, error: "juice not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: juice });
  } catch (error) {
    console.error("juice fetch by slug error:", error);
    return NextResponse.json(
      { success: false, error: "failed to fetch juice" },
      { status: 500 },
    );
  }
}