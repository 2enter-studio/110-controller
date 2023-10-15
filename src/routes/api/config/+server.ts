import type { RequestHandler } from '@sveltejs/kit';
import { file_manager } from '$lib/server/FileManager';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
	return json(file_manager.get_config());
};
