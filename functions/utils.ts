import { CFP_COOKIE_KEY, CFP_ALLOWED_PATHS } from './constants';

export async function sha256(str: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.prototype.map
    .call(new Uint8Array(buf), (x) => ('00' + x.toString(16)).slice(-2))
    .join('');
}

export async function getCookieKeyValue(password?: string): Promise<string> {
  const hash = await sha256(password);
  return `${CFP_COOKIE_KEY}=${hash}`;
}

export function isPathAllowed(path: string): boolean {
  return CFP_ALLOWED_PATHS.some((allowedPath: [string, boolean]) => {
    if (allowedPath[1]) {
      return path.startsWith(allowedPath[0]);
    }
    return path === allowedPath[0];
  });
}
