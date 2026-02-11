// update individual config field
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Config from '@/lib/models/config';
import { isAuthenticated } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ field: string }> }
) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: 'unauthorized' },
        { status: 401 }
      );
    }

    const { field } = await params;
    const { value } = await request.json();
    
    await connectDB();
    
    // update specific field
    const config = await Config.findOneAndUpdate(
      {},
      { [field]: value, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    revalidatePath('/', 'layout');

    return NextResponse.json({ success: true, data: config });
  } catch (error) {
    console.error('config field update error:', error);
    return NextResponse.json(
      { success: false, error: 'failed to update field' },
      { status: 500 }
    );
  }
}