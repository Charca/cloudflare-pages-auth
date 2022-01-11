export const CFP_PASSWORD = 'test'; // <- Change this to the password you want to use.
export const CFP_COOKIE_KEY = 'CFP-Auth-Key';
export const CFP_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // <- 1 week
export const CFP_ALLOWED_PATHS = ['/cfp_login']; // <- Add paths you want to allow without authentication here.

export async function sha256(str: string): Promise<string> {
	const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
	return Array.prototype.map
		.call(new Uint8Array(buf), (x) => ('00' + x.toString(16)).slice(-2))
		.join('');
}

export async function getCookie(): Promise<string> {
	const hash = await sha256(CFP_PASSWORD);
	return `${CFP_COOKIE_KEY}=${hash}`;
}
