/**
 * logout endpoint
 * clears authentication cookie
 */
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    
    // delete auth cookie
    cookieStore.delete('admin_token');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'logout failed' },
      { status: 500 }
    );
  }
}