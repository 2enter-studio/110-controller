export enum ActionTypes {
	Trigger = 'trigger',
	Run = 'run'
}

export enum OscTarget {
	Me = 'local_arena',
	Bro = 'next_arena',
	Max = 'max_msp',
	Remote = 'light_guy',
	server = 'server'
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
	midi: number;
	strength: number;
};
