import type { TAction } from './types';
import { OscClient } from './Osc';
import config from '$data/config.json';
import { file_manager } from './server/FileManager';

class Action {
	action: TAction;

	constructor(action: TAction) {
		this.action = action;
	}

	send_value(value: number) {
		for (const osc_info of this.action.osc) {
			const osc_client = new OscClient(osc_info.target);
			osc_client.send(osc_info.addr, value * this.action.scale);
		}
	}

	trigger() {
		for (const osc_info of this.action.osc) {
			const osc_client = new OscClient(osc_info.target);
			osc_client.send(osc_info.addr, 1);
		}
	}
}

// export const actions = (): Action[] => {
// 	const config = file_manager.get_config();
// 	const actions = [];
// 	for (const action_info of config) {
// 		const action = new Action(action_info as TAction);
// 		actions.push(action);
// 	}
// 	return actions;
// };

export let actions: Action[] = [];

for (const action_info of config) {
	const action = new Action(action_info as TAction);
	actions.push(action);
}
