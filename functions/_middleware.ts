import { getTemplate } from './template';
import { getCookie, CFP_ALLOWED_PATHS } from './credentials';

export async function onRequest(context: {
	request: Request;
	next: () => Promise<Response>;
}): Promise<Response> {
	const { request, next } = context;
	const { pathname, searchParams } = new URL(request.url);
	const { error } = Object.fromEntries(searchParams);
	const cookie = request.headers.get('cookie') || '';
	const cookieKeyValue = await getCookie();

	if (cookie.includes(cookieKeyValue) || CFP_ALLOWED_PATHS.includes(pathname)) {
		// Correct hash in cookie or allowed path. Continue to next middleware.
		return await next();
	} else {
		// No cookie or incorrect hash in cookie. Redirect to login.
		return new Response(getTemplate({ withError: error === '1' }), {
			headers: {
				'content-type': 'text/html'
			}
		});
	}
}
