import { NextRequest, NextResponse } from "next/server";
import { verifyCSRFToken } from "./csrf";

/**
 * Get allowed origins from environment variable
 * Splits comma-separated list and filters out empty strings
 */
function getAllowedOrigins(): string[] {
  const envOrigins = process.env.ALLOWED_ORIGINS;

  if (!envOrigins) {
    // Default to localhost in development
    return ["http://localhost:3000"];
  }

  // Split by comma and trim whitespace
  return envOrigins
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
}

/**
 * Check if request is from allowed origin
 */
function isAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  const allowedOrigins = getAllowedOrigins();

  console.log("Checking origin/referer:", { origin, referer });
  console.log("Allowed origins:", allowedOrigins);

  // Check origin header (most reliable for cross-origin requests)
  if (origin) {
    const isAllowed = allowedOrigins.some((allowed) => origin === allowed);
    console.log(`Origin "${origin}" allowed:`, isAllowed);
    if (isAllowed) return true;
  }

  // now let's Check referer header as fallback (for same-origin navigation)
  if (referer) {
    const isAllowed = allowedOrigins.some((allowed) =>
      referer.startsWith(allowed),
    );
    console.log(`Referer "${referer}" allowed:`, isAllowed);
    if (isAllowed) return true;
  }

  console.log("No matching origin or referer found");
  return false;
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
  } = {},
): Promise<NextResponse | null> {
  console.log("protectAPIRoute called for:", request.url);

  // 1. Check origin
  const isAllowed = isAllowedOrigin(request);

  if (!isAllowed) {
    console.log("BLOCKED: Invalid origin");
    return NextResponse.json(
      { success: false, error: "Forbidden: Invalid origin" },
      { status: 403 },
    );
  }

  console.log("Origin check passed");

  // 2. Check CSRF token (for mutation requests)
  if (options.requireCSRF && request.method !== "GET") {
    const isValidCSRF = await verifyCSRFToken(request);
    console.log("CSRF valid:", isValidCSRF);

    if (!isValidCSRF) {
      console.log("BLOCKED: Invalid CSRF token");
      return NextResponse.json(
        { success: false, error: "Forbidden: Invalid CSRF token" },
        { status: 403 },
      );
    }
  }

  console.log("ALLOWED: All checks passed");

  // All checks passed
  return null;
}
