<script lang="ts">
	import type { TAction } from '$lib/types';
	export let config: TAction;

	const elements = [
		{ id: 'name', name: 'name', value: config.name },
		{ id: 'description', name: 'description', value: config.description },
		{ id: 'mid', name: 'midi', value: config.mid },
		{ id: 'scale', name: 'scale', value: config.scale ?? 1 },
		{ id: 'type', name: 'type', value: config.type }
	];
</script>

<div class="flex flex-col w-full">
	{#each elements as { name, value }}
		<div
			id="name"
			class="flex flex-row w-full justify-between items-center border-b-2 rounded-none"
		>
			<h1>{name}</h1>
			<p>{value}</p>
		</div>
	{/each}

	OSC Messages:
	{#each config.osc as { target, addr }}
		{#if addr !== ''}
			<div id="name" class="flex flex-row w-full justify-between items-center">
				<h1>{target}</h1>
				<p>{addr}</p>
			</div>
		{/if}
	{/each}
</div>
