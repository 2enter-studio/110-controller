import midi from 'midi';
import { actions } from './Action';
import { file_manager } from '$lib/server/FileManager';
import { MIDI_NAME } from '$env/static/private';

export class MidiInput {
	private input = new midi.Input();
	midi_index = 0;

	constructor() {
		const port_count = this.input.getPortCount();
		console.log(`Port Count: ${port_count}`);
		console.log('Port Names: ');
		for (let i = 0; i < port_count; i++) {
			const name = this.input.getPortName(i);
			console.log(`${i}: ${name}`);
			if (name === MIDI_NAME) {
				this.midi_index = i;
			}
		}
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
			this.input.openPort(this.midi_index);
		}
	}
}

export const midi_input = new MidiInput();
