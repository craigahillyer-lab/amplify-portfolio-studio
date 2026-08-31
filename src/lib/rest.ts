const SUPABASE_URL = import.meta.env['VITE_SUPABASE_URL'] as string;
const SUPABASE_KEY = import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY'] as string;

/**
 * Minimal anon REST helper. Used for the public visit counter so tracking and the
 * private dashboard never wait on auth session resolution.
 */
export async function restFetch(pathAndQuery: string, init?: RequestInit): Promise<Response> {
  const headers = new Headers(init?.headers);
  headers.set('apikey', SUPABASE_KEY);
  headers.set('Content-Type', 'application/json');
  return fetch(`${SUPABASE_URL}/rest/v1/${pathAndQuery}`, { ...init, headers });
}
