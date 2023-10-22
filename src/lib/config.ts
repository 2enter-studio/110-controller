import {
	THIS_ARENA_IP,
	NEXT_ARENA_IP,
	MAX_MSP_IP,
	LIGHT_GUY_IP,
	OSC_SERVER_IP
} from '$env/static/private';
import { ActionTypes, OscTarget, generate_id } from '$lib/types';

export const new_action = () => {
	return {
		id: generate_id(),
		name: 'new',
		mid: 0,
		scale: 1,
		osc: [],
		type: ActionTypes.SendValue,
		description: ''
	};
};

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
