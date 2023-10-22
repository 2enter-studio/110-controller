<script lang="ts">
	import { onMount } from 'svelte';
	import NodeJS from 'node:process';
	export let endpoint: string;
	export let name: string;
	export let value;
	export let update_rate = 1000;

	let update_interval: NodeJS.Timeout;

	onMount(() => {
		set_interval();
	});

	const change_update_rate = () => {
		console.log(`change update rate to ${update_rate}ms`);
		clearInterval(update_interval);
		set_interval();
	};

	function set_interval() {
		update_interval = setInterval(async () => {
			value = await fetch(endpoint).then((r) => r.json());
		}, update_rate);
	}
</script>

<div class="bg-white/80 p-3 text-black">
	<label for="update_rate">{name} will update per {update_rate} (ms)</label>
	<input
		class="range range-accent"
		type="range"
		name="update_rate"
		id="update_rate"
		min="1"
		max="100"
		bind:value={update_rate}
		on:change={change_update_rate}
	/>
</div>
