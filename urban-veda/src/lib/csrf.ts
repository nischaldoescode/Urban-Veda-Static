import { cookies } from 'next/headers';
import crypto from 'crypto';

const CSRF_TOKEN_NAME = 'csrf_token';
const CSRF_HEADER_NAME = 'x-csrf-token';

/**
 * Generate a new CSRF token
 */
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Set CSRF token in cookie (call this on page load)
 */
export async function setCSRFToken(): Promise<string> {
  const token = generateCSRFToken();
  const cookieStore = await cookies();
  
  cookieStore.set(CSRF_TOKEN_NAME, token, {
    httpOnly: false, // Must be accessible to JavaScript
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
  });
  
  return token;
}

/**
 * Verify CSRF token from request
 */
export async function verifyCSRFToken(request: Request): Promise<boolean> {
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(CSRF_TOKEN_NAME)?.value;
  const headerToken = request.headers.get(CSRF_HEADER_NAME);
  
  if (!cookieToken || !headerToken) {
    return false;
  }
  
  return cookieToken === headerToken;
}

/**
 * Get CSRF token from cookie
 */
export async function getCSRFToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(CSRF_TOKEN_NAME)?.value;
}

export { CSRF_HEADER_NAME };