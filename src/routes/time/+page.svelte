<script lang="ts">
	import type { TState } from '$lib/types';
	import { onMount } from 'svelte';
	import NodeJS from 'node:process';

	const max_second = 370;

	let second = 0;

	let wait_interval: NodeJS.Timeout;
	let count_interval: NodeJS.Timeout;

	let init_time: number = 0;

	onMount(() => {
		wait_interval = new_wait_interval();
		count_interval = new_count_interval();
		// console.log(new Date().getTime());
	});

	const new_wait_interval = () => {
		return setInterval(async () => {
			const state: TState = await fetch('/api/state')
				.then((res) => res.json())
				.catch((e) => console.log(e));

			init_time = state.start;
		}, 1000);
	};

	const new_count_interval = () => {
		const update_sec = 0.2;
		return setInterval(() => {
			second = (new Date().getTime() - init_time) / 1000;
			if (second > max_second) second = 0;
		}, update_sec * 1000);
	};

	const get_formatted_time = (second: number) => {
		const min = ~~(second / 60);
		const sec = ~~(second % 60);
		return {
			min,
			sec
		};
	};
</script>

<div
	class="w-screen h-[70vh] bg-white text-black flex flex-col justify-center items-center overflow-y-hidden"
>
	<h1 class="text-[9rem] font-extrabold">
		{get_formatted_time(second).min} : {get_formatted_time(second).sec}
	</h1>
	<div class="w-[90%] h-[8vh] bg-black mb-5 flex flex-row justify-start items-start">
		<div
			class="bg-sky-100 h-full border-[1px] border-black"
			style="width: {second / (max_second / 100)}%;"
		/>
	</div>
	<img src="/CHC_pic.png" alt="wave" class="w-[90%] h-[30vh]" />
</div>
