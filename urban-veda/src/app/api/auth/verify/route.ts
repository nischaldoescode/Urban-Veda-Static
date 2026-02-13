/**
 * authentication verification endpoint
 * checks if user has valid session token
 * 
 * returns:
 * - 200: authenticated
 * - 401: not authenticated
 */
import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    
    if (authenticated) {
      return NextResponse.json({ success: true, authenticated: true });
    } else {
      return NextResponse.json(
        { success: false, authenticated: false },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, authenticated: false },
      { status: 401 }
    );
  }
}