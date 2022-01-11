import { sha256, getCookie, CFP_PASSWORD, CFP_COOKIE_MAX_AGE } from './credentials';

export async function onRequestPost(context: { request: Request }): Promise<Response> {
	const { request } = context;
	const body = await request.formData();
	const { password } = Object.fromEntries(body);

	const hashedPassword = await sha256(password.toString());
	const hashedCfpPassword = await sha256(CFP_PASSWORD);

	if (hashedPassword === hashedCfpPassword) {
		const cookieKeyValue = await getCookie();

		return new Response('', {
			status: 302,
			headers: {
				'Set-Cookie': `${cookieKeyValue}; Max-Age=${CFP_COOKIE_MAX_AGE}; Path=/; HttpOnly; Secure`,
				'Cache-Control': 'no-cache',
				Location: '/'
			}
		});
	} else {
		return new Response('', {
			status: 302,
			headers: {
				'Cache-Control': 'no-cache',
				Location: '/?error=1'
			}
		});
	}
}
