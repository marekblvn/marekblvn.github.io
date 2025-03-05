<script lang="ts">
	import { page } from '$app/stores';
	import { tabCache, type Tab } from '$lib/stores/tabs';
	import { onMount } from 'svelte';

	let address: string = $state('');
	let iconAsset: string = $state('');
	onMount(() => {
		page.subscribe((value) => {
			const formattedPath = value.url.pathname
				.slice(1)
				.split('/')
				.map((token) => token.charAt(0).toUpperCase() + token.slice(1))
				.join('/');
			address = formattedPath;
		});
		tabCache.update((cache) => {
			const tab: Tab | undefined = cache.find((value) => address.includes(value.title));
			if (tab) {
				iconAsset = `/src/lib/assets/icons/${tab.icon}.ico`;
			}
			return cache;
		});
	});
</script>

<div class="bar">
	<span style="font-size: 11px; margin-right: 6px;">Address</span>
	<div class="location-wrapper">
		<div class="location">
			<div class="address">
				<img class="address-icon" src={iconAsset} alt="" />
				<span class="address-text">
					{address}
				</span>
			</div>
		</div>
	</div>
</div>

<style>
	.bar {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 4px;
		padding-bottom: 2px;
		height: 24px;
		width: 100%;
	}
	.location-wrapper {
		border-width: 1px;
		border-style: solid;
		border-color: #000 #fff #fff #000;
		width: 100%;
	}
	.location {
		border-width: 1px;
		border-style: solid;
		border-color: #808080 #dbdbdb #dbdbdb #808080;
		background-color: #fff;
		height: 20px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.address {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 2px;
	}
	.address-icon {
		width: 16px;
		height: 16px;
		margin-right: 4px;
	}
	.address-text {
		font-size: 11px;
	}
</style>
