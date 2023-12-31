import midi from 'midi';
import { actions } from './Action';
import { MIDI_NAME } from '$env/static/private';
import { set_midi, set_start } from './state';

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
			set_midi(channel, strength);

			for (const action of actions) {
				if (action.action.mid === channel) {
					const type = action.action.type;
					switch (type) {
						case 'trigger':
							if (action.action.name === 'start') {
								set_start(new Date().getTime());
								// for (const tri_action of ['tri_1', 'tri_2', 'tri_3', 'tri_4', 'noise']) {
								// 	const act = actions.find((action) => action.action.name === tri_action);
								// 	act?.trigger();
								// }
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
