import type { OscTarget, TAction } from './types';
import { OscClient } from './Osc';
import config from '$data/config.json';

class Action {
	action: TAction;
	target: OscTarget;

	constructor(action: TAction, target: OscTarget) {
		this.action = action;
		this.target = target;
	}

	exe(value: number) {
		const osc_client = new OscClient(this.target);
		console.log(`Executing action "${this.action.description}"`);
		for (const osc_info of this.action.osc) {
			osc_client.send(osc_info.addr, value.toString());
		}
	}
}

export const actions: Action[] = [];

for (const action_info of config) {
	for (const osc_info of action_info.osc) {
		const action = new Action(action_info as TAction, osc_info.target as OscTarget);
		actions.push(action);
	}
}
