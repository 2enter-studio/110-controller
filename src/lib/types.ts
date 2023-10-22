export enum ActionTypes {
	SendValue = 'send_value',
	Trigger = 'trigger'
}

export enum OscTarget {
	Me = 'local_arena',
	Bro = 'next_arena',
	Max = 'max_msp',
	LightGuy = 'light_guy',
	Server = 'server'
}

export type TAction = {
	id: string;
	name: string;
	type: ActionTypes;
	mid: number;
	osc: { target: OscTarget; addr: string }[];
	description: string;
	scale: number;
};

export type TState = {
	start: number;
	midi: number;
	strength: number;
};

export function generate_id(length: number = 6): string {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}
