// get, update, delete specific juice
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Juice from "@/lib/models/Juice";
import { isAuthenticated } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await connectDB();

    const juice = await Juice.findById(id);

    if (!juice) {
      return NextResponse.json(
        { success: false, error: "juice not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: juice });
  } catch (error) {
    console.error("juice fetch error:", error);
    return NextResponse.json(
      { success: false, error: "failed to fetch juice" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: "unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const updates = await request.json();

    await connectDB();

    const juice = await Juice.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true },
    );

    if (!juice) {
      return NextResponse.json(
        { success: false, error: "juice not found" },
        { status: 404 },
      );
    }

    revalidatePath("/products");
    revalidatePath(`/products/${id}`);

    return NextResponse.json({ success: true, data: juice });
  } catch (error) {
    console.error("juice update error:", error);
    return NextResponse.json(
      { success: false, error: "failed to update juice" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: "unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;
    await connectDB();

    // HARD DELETE - actually remove from database
    const juice = await Juice.findByIdAndDelete(id);

    if (!juice) {
      return NextResponse.json(
        { success: false, error: "juice not found" },
        { status: 404 },
      );
    }

    revalidatePath("/products");

    return NextResponse.json({ success: true, data: juice });
  } catch (error) {
    console.error("juice deletion error:", error);
    return NextResponse.json(
      { success: false, error: "failed to delete juice" },
      { status: 500 },
    );
  }
}
