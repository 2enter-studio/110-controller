import fs from 'fs-extra';
import type { TAction, TState } from '../types';
import { generate_id } from '$lib/config';

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
	get_state(): TState {
		return JSON.parse(fs.readFileSync(state_path, 'utf8'));
	}

	set_state(state: TState) {
		const old_state = this.get_state();
		const count = state.count === -1 ? old_state.count : state.count;
		state.count = count;
		fs.writeFileSync(state_path, JSON.stringify(state, null, 4));
	}

	add_count(num: number): number {
		const state = this.get_state();
		state.count = parseFloat((state.count + num).toFixed(1));
		fs.writeFileSync(state_path, JSON.stringify(state, null, 4));
		return state.count;
	}

	clear_count() {
		const state = this.get_state();
		state.count = 0;
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

		for (let i = 0; i < current_config.length; i++) {
			if (!current_config[i].id) {
				current_config[i].id = generate_id();
			}
		}

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
