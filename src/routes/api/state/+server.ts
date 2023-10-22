import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { state } from '$lib/state';

export const GET: RequestHandler = () => {
	return json(state);
};
