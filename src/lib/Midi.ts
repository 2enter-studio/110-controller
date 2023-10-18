import midi from 'midi';
import { actions } from './Action';
import { file_manager } from '$lib/server/FileManager';
import { MIDI_NAME } from '$env/static/private';

export class MidiInput {
	private input = new midi.Input();
	midi_index: number = 100;

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
			file_manager.set_state({ midi: channel, strength, start: -1 });

			for (const action of actions) {
				if (action.action.mid === channel) {
					const type = action.action.type;
					switch (type) {
						case 'trigger':
							if (action.action.name === 'start') {
								// file_manager.clear_count();
								file_manager.set_state({ midi: channel, strength, start: new Date().getTime() });
							}
							action.trigger();
							break;
						case 'send_value':
							action.send_value(strength / 127);
							break;
					}
				}
			}
		});

		if (this.input.getPortCount() > 0 && this.midi_index !== 100) {
			try {
				this.input.openPort(this.midi_index);
				console.log('MIDI Port opened!');
			} catch (e) {
				this.input.closePort();
				console.log(e);
				this.input.openPort(this.midi_index);
				console.log('MIDI Port opened!');
			}
		}
	}
}

export const midi_input = new MidiInput();

await new Promise((resolve) => {
	setTimeout(resolve, 3000);
});
file_manager.set_state({ midi: 41, strength: 33, start: new Date().getTime() });
await new Promise((resolve) => {
	setTimeout(resolve, 8000);
});
file_manager.set_state({ midi: 41, strength: 33, start: new Date().getTime() });
