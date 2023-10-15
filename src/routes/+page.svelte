<script lang="ts">
	import type { TAction, TState } from '$lib/types';
	import DataFetcher from '$lib/components/DataFetcher.svelte';
	import ConfigEditor from '$lib/components/ConfigEditor.svelte';
	import ConfigViewer from '$lib/components/ConfigViewer.svelte';

	let configs: TAction[];
	let state: TState = {
		midi: 0,
		strength: 0
	};

	let editing: string = '';
	let loading_dot: number = 0;
	setInterval(() => {
		if (loading_dot === 3) loading_dot = 0;
		else loading_dot++;
	}, 100);
</script>

<div class="flex flex-row">
	<div class="flex flex-col w-[40vw] h-screen overflow-y-auto bg-black p-4 gap-3 join">
		<DataFetcher endpoint={'/api/config'} bind:value={configs} name="Config" />
		<DataFetcher endpoint={'/api/state'} bind:value={state} name="State" update_rate={10} />

		{#if configs === undefined}
			<div class="flex w-full h-full justify-center items-center">
				<p>Loading{'.'.repeat(loading_dot)}</p>
			</div>
		{:else}
			{#each configs as config}
				<div class="flex flex-col items-end">
					{#if config.id === editing}
						<ConfigEditor {config} />
					{:else}
						<ConfigViewer {config} />
						<button class="btn btn-accent w-[20%]" on:click={() => (editing = config.id)}>
							Edit me!
						</button>
					{/if}
				</div>
			{/each}
			<form action="?/create" method="post">
				<button type="submit" class="btn btn-group float-right">Create New</button>
			</form>
		{/if}
	</div>
	<div id="state" class="w-[60vw] h-screen flex justify-center items-center text-8xl">
		<div
			style="width: {state.strength / 2}vh; height: {state.strength / 2}vh"
			class="bg-black flex justify-center items-center rounded-full"
		>
			{state.midi}
		</div>
	</div>
</div>
