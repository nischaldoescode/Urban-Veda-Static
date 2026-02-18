import { NextRequest, NextResponse } from 'next/server';
import { verifyCSRFToken } from './csrf';

/**
 * Check if request is from allowed origin
 */
function isAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    'http://localhost:3000',
  ];
  
  // Check origin header
  if (origin && allowedOrigins.some(allowed => origin.startsWith(allowed))) {
    return true;
  }
  
  // Check referer header as fallback
  if (referer && allowedOrigins.some(allowed => referer.startsWith(allowed))) {
    return true;
  }
  
  return false;
}

/**
 * Check if request has required custom header
 */
function hasRequiredHeader(request: NextRequest): boolean {
  const customHeader = request.headers.get('x-app-request');
  return customHeader === 'urbanveda-internal';
}

/**
 * Protect API route from external access
 * Use this for routes that should ONLY be called from your app
 */
export async function protectAPIRoute(
  request: NextRequest,
  options: {
    requireAuth?: boolean;
    requireCSRF?: boolean;
  } = {}
): Promise<NextResponse | null> {
  // 1. Check custom header
  if (!hasRequiredHeader(request)) {
    return NextResponse.json(
      { success: false, error: 'Forbidden: Invalid request source' },
      { status: 403 }
    );
  }
  
  // 2. Check origin
  if (!isAllowedOrigin(request)) {
    return NextResponse.json(
      { success: false, error: 'Forbidden: Invalid origin' },
      { status: 403 }
    );
  }
  
  // 3. Check CSRF token (for mutation requests)
  if (options.requireCSRF && request.method !== 'GET') {
    const isValidCSRF = await verifyCSRFToken(request);
    if (!isValidCSRF) {
      return NextResponse.json(
        { success: false, error: 'Forbidden: Invalid CSRF token' },
        { status: 403 }
      );
    }
  }
  
  // All checks passed
  return null;
}