/**
 * Health check endpoint
 * 
 * Purpose: Simple status check for monitoring/uptime services
 * Protection: NONE - This is intentionally public
 * Method: GET only
 * 
 * Returns: { "status": "ok" }
 */

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'ok' });
}