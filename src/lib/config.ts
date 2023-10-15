import {
	THIS_ARENA_IP,
	NEXT_ARENA_IP,
	MAX_MSP_IP,
	LIGHT_GUY_IP,
	OSC_SERVER_IP
} from '$env/static/private';
import { ActionTypes, OscTarget } from '$lib/types';
import { log } from 'console';

export const new_action = () => {
	return {
		id: generate_id(),
		name: 'new',
		type: ActionTypes.SendValue,
		mid: 0,
		osc: [],
		description: ''
	};
};

export function generate_id(length: number = 6): string {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}

export function get_target_ip(target: OscTarget): string {
	switch (target) {
		case OscTarget.Me:
			return THIS_ARENA_IP as string;
		case OscTarget.Bro:
			return NEXT_ARENA_IP as string;
		case OscTarget.Max:
			return MAX_MSP_IP as string;
		case OscTarget.LightGuy:
			return LIGHT_GUY_IP as string;
		case OscTarget.Server:
			return OSC_SERVER_IP as string;
		default:
			return '';
	}
}
