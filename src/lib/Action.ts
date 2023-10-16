import type { OscTarget, TAction } from './types';
import { OscClient } from './Osc';
import config from '$data/config.json';
import { log } from 'console';

class Action {
	action: TAction;

	constructor(action: TAction) {
		this.action = action;
	}

	send_value(value: number) {
		// console.log(`Sending value: "${this.action.description}"`);
		for (const osc_info of this.action.osc) {
			const osc_client = new OscClient(osc_info.target);
			osc_client.send(osc_info.addr, value);
		}
	}

	trigger() {
		// console.log(`Triggering action: "${this.action.description}"`);
		for (const osc_info of this.action.osc) {
			const osc_client = new OscClient(osc_info.target);
			osc_client.send(osc_info.addr, 1);
		}
	}
}

export let actions: Action[] = [];

// setInterval(() => {
for (const action_info of config) {
	for (const osc_info of action_info.osc) {
		const action = new Action(action_info as TAction);
		actions.push(action);
	}
}
// }, 500);
