// cloudinary image upload endpoint
import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: 'unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'no file provided' },
        { status: 400 }
      );
    }

    const url = await uploadToCloudinary(file);

    return NextResponse.json({ success: true, data: { url } });
  } catch (error) {
    console.error('upload error:', error);
    return NextResponse.json(
      { success: false, error: 'upload failed' },
      { status: 500 }
    );
  }
}