<script lang="ts">
	import { iconCache } from '$lib/stores/icons';
	import { onMount } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';
	interface Props {
		icon?: string;
		style?: string;
		onclick?: MouseEventHandler<HTMLButtonElement>;
	}
	let { icon = 'close', style = '', onclick = () => {} }: Props = $props();
	let iconAsset = $state('');
	onMount(() => {
		iconCache.update((cache) => {
			if (cache[icon]) {
				iconAsset = cache[icon];
			} else {
				const uri = `/src/lib/assets/icons/${icon}.ico`;
				cache[icon] = uri;
				iconAsset = uri;
			}
			return cache;
		});
	});
</script>

<button {style} {onclick}>
	<div class="icon-rect">
		<img src={iconAsset} alt="" class="icon" />
	</div>
</button>

<style>
	button {
		background-color: #bfbfbf;
		width: 16px;
		height: 14px;
		border-width: 1px;
		border-style: solid;
		border-color: #ffffff #000000 #000000 #ffffff;
		padding: 1px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	button:active {
		border-color: #000000 #ffffff #ffffff #000000;
	}
	button:active .icon-rect {
		border-color: #808080 #dbdbdb #dbdbdb #808080;
	}
	.icon-rect {
		border-width: 1px;
		border-style: solid;
		border-color: #dbdbdb #808080 #808080 #dbdbdb;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.icon {
		width: 12px;
		height: 10px;
		image-rendering: pixelated;
		user-select: none;
		-webkit-user-drag: none;
	}
</style>
