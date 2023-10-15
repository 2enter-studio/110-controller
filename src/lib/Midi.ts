import midi from 'midi';
import { actions } from './Action';
import { file_manager } from '$lib/server/FileManager';

export class MidiInput {
	private input = new midi.Input();

	constructor() {
		console.log('input.getPortCount()', this.input.getPortCount());
		console.log('input.getPortName(0)', this.input.getPortName(0));
	}

	start() {
		this.input.on('message', (dt, msg) => {
			const channel = msg[1];
			const strength = msg[2];
			// console.log('message received', dt, msg);
			file_manager.set_state({ midi: channel, strength });
			for (const action of actions) {
				if (action.action.mid === channel) {
					action.exe(strength / 127);
				}
			}
		});

		if (this.input.getPortCount() > 0) {
			this.input.openPort(0);
		}
	}
}

export const midi_input = new MidiInput();
