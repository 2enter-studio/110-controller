import { Client, Message, Server } from 'node-osc';
import 'dotenv/config';
import type { OscTarget } from './types';
import { get_target_ip } from './config';
import { OSC_SERVER_PORT } from '$env/static/private';

export class OscClient {
	readonly #client: Client;
	readonly #target: OscTarget;

	constructor(target: OscTarget) {
		const ip = get_target_ip(target);
		const addr = ip.split(':')[0];
		const port = parseInt(ip.split(':')[1]);

		this.#target = target;
		this.#client = new Client(addr, port);
	}

	send(addr: string, msg: string) {
		this.#client.send([addr, msg], () => {
			console.log(`Sent osc message to ${this.#target} ${addr} ${msg}`);
		});
	}
}

export class OscServer {
	server: Server;
	#port = parseInt(OSC_SERVER_PORT as string);

	constructor() {
		this.server = new Server(this.#port, '0.0.0.0', () => {
			console.log(`OSC Server start listening on port ${this.#port}`);
		});
	}

	start() {
		this.server.on('message', (msg) => {
			console.log(`Received new osc message ${msg}`);
		});
	}
}

export const osc_server = new OscServer();
