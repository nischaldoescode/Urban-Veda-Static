import { NextResponse } from 'next/server';
import { setCSRFToken } from '@/lib/csrf';

export async function POST() {
  try {
    const token = await setCSRFToken();
    return NextResponse.json({ success: true, token });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to initialize CSRF token' },
      { status: 500 }
    );
  }
}