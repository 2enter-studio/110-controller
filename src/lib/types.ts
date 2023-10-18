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
};

export type TState = {
	start: number;
	midi: number;
	strength: number;
};
