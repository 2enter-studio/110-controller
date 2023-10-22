import type { TState } from './types';

export const state: TState = {
	start: 0,
	midi: 0,
	strength: 0
};

export const set_midi = (midi: number, strength: number): TState => {
	state.midi = midi;
	state.strength = strength;
	return state;
};

export const set_start = (time: number): TState => {
	state.start = time;
	return state;
};
