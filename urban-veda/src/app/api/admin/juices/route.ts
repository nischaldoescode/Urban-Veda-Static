import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Juice from '@/lib/models/Juice';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: 'unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const juices = await Juice.find({})
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: juices });
  } catch (error) {
    console.error('admin juices fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'failed to fetch juices' },
      { status: 500 }
    );
  }
}