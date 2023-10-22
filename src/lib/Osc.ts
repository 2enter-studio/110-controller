import { Client, Server } from 'node-osc';
import 'dotenv/config';
import type { OscTarget } from './types';
import { get_target_ip } from './config';
import { OSC_SERVER_IP } from '$env/static/private';

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

	send(addr: string, msg: number) {
		if (addr === '') return;
		this.#client.send([addr, msg], () => {
			this.close();
		});
	}

	close() {
		this.#client.close();
	}
}

export class OscServer {
	server: Server;
	#port = parseInt((OSC_SERVER_IP as string).split(':')[1]);

	constructor() {
		this.server = new Server(this.#port, 'localhost', () => {
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
