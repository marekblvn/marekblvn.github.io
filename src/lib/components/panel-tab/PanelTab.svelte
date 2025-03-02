<script lang="ts">
	import { goto } from '$app/navigation';
	import { activeTabCache } from '$lib/stores/active-tab';
	import { iconCache } from '$lib/stores/icons';
	import { tabCache } from '$lib/stores/tabs';
	import { onMount } from 'svelte';

	interface Props {
		title: string;
		icon: string;
		isActive?: boolean;
	}
	let { icon, title, isActive = false }: Props = $props();
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
		$effect(() => {
			tabCache.subscribe((cache) => {
				const tab = cache.find((tab) => tab.title === title);
				icon = tab?.icon || 'directory_open';
			});
		});
	});
	function onClick() {
		const path = title.toLowerCase().replaceAll(' ', '-');
		activeTabCache.set(title);
		goto(path);
	}
</script>

<button class="tab" class:active={isActive} onclick={onClick}>
	<img src={iconAsset} alt="" />
	<div class="tab-title">{title}</div>
</button>

<style>
	.tab {
		width: 100%;
		height: 22px;
		padding: 1px;
		display: flex;
		flex-direction: row;
		align-items: center;
		text-align: center;
		min-width: 100px;
		flex-shrink: 1;
		border: none;
		background-color: #bfbfbf;
	}
	.tab.active {
		background: repeating-conic-gradient(#f0f0f0 0deg 90deg, #dbdbdb 90deg 180deg);
		background-size: 5px 5px;
	}
	.tab img {
		width: 16px;
		height: 16px;
		margin-right: 6px;
		margin-left: 4px;
	}
	.tab.active img {
		margin-left: 2px;
	}
	.tab-title {
		font-family: 'Pixelated MS Sans Serif', sans-serif;
		font-size: 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 100%;
	}
	.tab.active .tab-title {
		font-family: 'Pixelated MS Sans Serif Bold', sans-serif;
	}
</style>
