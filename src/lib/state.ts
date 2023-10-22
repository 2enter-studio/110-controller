import type { TState } from './types';

export let state: TState = {
	start: 0,
	midi: 0,
	strength: 0
};

export const set_midi = (midi: number, strength: number): TState => {
	state.midi = midi;
	state.strength = strength;
	return state;
};

export const set_start = (start_time: number): TState => {
	state.start = start_time;
	return state;
};
export const get_state = () => {
	return state;
};
