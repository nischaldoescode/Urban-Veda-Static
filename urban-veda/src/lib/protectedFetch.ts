/**
 * Client-side protected fetch wrapper
 * Adds required headers for API protection
 */

/**
 * Get CSRF token from cookie (client-side)
 */
function getCSRFTokenFromCookie(): string | null {
  if (typeof document === 'undefined') return null;
  
  const name = 'csrf_token=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(';');
  
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length);
    }
  }
  
  return null;
}

/**
 * Wrapper around fetch that adds required headers
 * Use this instead of fetch() for all API calls in your app
 */
export async function protectedFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const csrfToken = getCSRFTokenFromCookie();
  
  const headers = new Headers(options.headers);
  
  // Add custom header (required for all requests)
  headers.set('x-app-request', 'urbanveda-internal');
  
  // Add CSRF token for mutation requests
  if (options.method && options.method !== 'GET' && csrfToken) {
    headers.set('x-csrf-token', csrfToken);
  }
  
  // Add content type for JSON requests
  if (options.body && typeof options.body === 'string') {
    headers.set('Content-Type', 'application/json');
  }
  
  return fetch(url, {
    ...options,
    headers,
    credentials: 'same-origin', // Include cookies
  });
}