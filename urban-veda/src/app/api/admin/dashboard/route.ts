import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Juice from "@/lib/models/Juice";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: "unauthorized" },
        { status: 401 },
      );
    }

    await connectDB();
    const [totalProducts, activeProducts, popularProducts] = await Promise.all([
      Juice.countDocuments({ isActive: { $ne: false } }),
      Juice.countDocuments({ isActive: true }),
      Juice.countDocuments({ isPopular: true, isActive: { $ne: false } }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalProducts,
        activeProducts,
        inactiveProducts: totalProducts - activeProducts,
        popularProducts,
      },
    });
  } catch (error) {
    console.error("dashboard error:", error);
    return NextResponse.json(
      { success: false, error: "failed to fetch stats" },
      { status: 500 },
    );
  }
}
