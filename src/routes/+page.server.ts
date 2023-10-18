import { midi_input } from '$lib/Midi';
import { osc_server } from '$lib/Osc';
import type { Action, Actions } from '@sveltejs/kit';
import { OscTarget, ActionTypes } from '$lib/types';

import { file_manager } from '$lib/server/FileManager';
import { generate_id, new_action } from '$lib/config';

const target_types = Object.values(OscTarget);

midi_input.start();
osc_server.start();

console.log('Requesting...');
const update: Action = async ({ request }) => {
	const data = await request.formData();

	const id = data.get('id') as string;
	const name = data.get('name') as string;
	const type: ActionTypes = data.get('type') as ActionTypes;
	const mid = parseInt(data.get('mid') as string);
	const description = data.get('description') as string;

	const osc = target_types.map((target) => {
		return { target: target as OscTarget, addr: data.get(`target-${target}`) as string };
	});

	const action = { id, name, type, mid, osc, description };
	console.log(action);
	file_manager.set_config(action);
};
const remove: Action = async ({ request }) => {
	console.log('removing!!!');
	const data = await request.formData();
	const mid = parseInt(data.get('mid') as string);
	console.log(mid);
	file_manager.remove_config_by_mid(mid);
};

const create: Action = async () => {
	// const data = await request.formData();

	// const mid = parseInt(data.get('create-mid') as string);

	const action = new_action();
	console.log(action);
	file_manager.set_config(action);
};

export const actions: Actions = { update, remove, create };
