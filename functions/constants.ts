/**
 * Key for the auth cookie.
 */
export const CFP_COOKIE_KEY = 'CFP-Auth-Key';

/**
 * Max age of the auth cookie in seconds.
 * Default: 1 week.
 */
export const CFP_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

/**
 * Paths that don't require authentication.
 * Set the boolean to true to add a trailing wildcard.
 * The /cfp_login path must be included.
 */
export const CFP_ALLOWED_PATHS: [string, boolean][] = [
    ['/cfp_login', false]
];
