<script lang="ts">
	import { generate_id } from '$lib/types';
	import type { TAction } from '$lib/types';
	import { ActionTypes, OscTarget } from '$lib/types';

	const types = Object.values(ActionTypes);
	const targets = Object.values(OscTarget);

	console.log(types, targets);

	export let config: TAction;
	const elements = [
		{ id: 'id', name: 'id', value: config.id ?? generate_id() },
		{ id: 'name', name: 'name', value: config.name ?? 'new' },
		{ id: 'description', name: 'description', value: config.description ?? '' },
		{ id: 'mid', name: 'midi', value: config.mid ?? 0 },
		{ id: 'scale', name: 'scale', value: config.scale ?? 1 },
		{ id: 'type', name: 'type', value: config.type ?? ActionTypes.Trigger }
	];
</script>

<form action="?/update" method="post" class="flex flex-col w-full items-end">
	{#each elements as { id, name, value }}
		{#if name === 'type'}
			<div class="flex flex-row w-full justify-between items-center border-b-2 rounded-none">
				<h1>{name}</h1>
				<select name="type" id="type" class="text-black">
					{#each types as type}
						<option value={type} selected={type === config.type}>{type}</option>
					{/each}
					<option value="" />
				</select>
			</div>
		{:else}
			<div
				class="flex flex-row w-full justify-between items-center border-b-2 rounded-none {name ===
				'id'
					? 'hidden'
					: ''}"
			>
				<h1>{name}</h1>
				<input type="text" class="h-6 text-black" {id} name={id} {value} required />
			</div>
		{/if}
	{/each}
	{#each targets as target}
		<div class="flex flex-row w-full justify-between items-center border-b-2 rounded-none">
			<h1>{target}</h1>
			<input
				type="text"
				class="h-6 text-black w-2/3"
				name="target-{target}"
				value={config.osc.find((osc) => osc.target === target)?.addr ?? ''}
			/>
		</div>
	{/each}
	<div class="flex flex-row w-[40%] mt-2">
		<form action="?/remove" method="post">
			<button type="submit" class="btn btn-error"> Remove </button>
			<input type="text" name="id" value={config.id} hidden />
		</form>
		<button type="submit" class="btn btn-primary"> Save </button>
	</div>
</form>
