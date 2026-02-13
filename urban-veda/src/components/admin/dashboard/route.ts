/**
 * admin dashboard api endpoint
 * returns statistics and recent activity
 * requires authentication
 */
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

    // fetch statistics
    const totalProducts = await Juice.countDocuments();
    const activeProducts = await Juice.countDocuments({ isActive: true });

    return NextResponse.json({
      success: true,
      stats: {
        totalProducts,
        activeProducts,
        totalViews: 1247, // placeholder - implement analytics later
        pendingUpdates: 0,
      },
    });
  } catch (error) {
    console.error('dashboard error:', error);
    return NextResponse.json(
      { success: false, error: 'failed to fetch dashboard' },
      { status: 500 }
    );
  }
}