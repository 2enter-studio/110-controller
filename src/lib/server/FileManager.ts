import fs from 'fs-extra';
import type { TAction, TState } from '../types';

const data_path = 'data';
const config_path = [data_path, 'config.json'].join('/');
const state_path = [data_path, 'state.json'].join('/');

class FileManager {
	constructor() {
		if (!fs.existsSync(data_path)) {
			fs.mkdirSync(data_path, { recursive: true });
			fs.writeFileSync(config_path, JSON.stringify([{}]));
			console.log(`FileManager: Created file: ${data_path}`);
		}
	}
	get_state() {
		return JSON.parse(fs.readFileSync(state_path, 'utf8'));
	}

	set_state(state: TState) {
		fs.writeFileSync(state_path, JSON.stringify(state, null, 4));
	}

	get_config(): TAction[] {
		const text = fs.readFileSync(config_path, 'utf-8');
		return JSON.parse(text);
	}

	set_config(config: TAction) {
		const current_config = this.get_config();
		const index = current_config.findIndex((action: TAction) => {
			return action.id === config.id;
		});

		if (index === -1) {
			current_config.push(config);
		} else {
			current_config[index] = config;
		}

		fs.writeFileSync(config_path, JSON.stringify(current_config, null, 4));
	}

	remove_config_by_mid(mid: number) {
		const current_state = this.get_config();
		const new_config = current_state.filter((action: TAction) => {
			return action.mid !== mid;
		});
		console.log(new_config);
		fs.writeFileSync(config_path, JSON.stringify(new_config, null, 4));
	}
}

export const file_manager = new FileManager();
