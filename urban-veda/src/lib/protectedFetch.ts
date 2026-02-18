import { getCSRFToken, CSRF_HEADER_NAME } from './csrf';

/**
 * Wrapper around fetch that adds required headers
 * Use this instead of fetch() for all API calls in your app
 */
export async function protectedFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const csrfToken = await getCSRFToken();
  
  const headers = new Headers(options.headers);
  
  // Add custom header
  headers.set('x-app-request', 'urbanveda-internal');
  
  // Add CSRF token for mutation requests
  if (options.method && options.method !== 'GET' && csrfToken) {
    headers.set(CSRF_HEADER_NAME, csrfToken);
  }
  
  return fetch(url, {
    ...options,
    headers,
    credentials: 'same-origin', // Include cookies
  });
}