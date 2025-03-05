<script lang="ts">
	import { page } from '$app/stores';
	import '$lib/assets/fonts.css';
	import PanelSettings from '$lib/components/panel-settings/PanelSettings.svelte';
	import PanelTabs from '$lib/components/panel-tabs/PanelTabs.svelte';
	import RouteShortcut from '$lib/components/route-shortcut/RouteShortcut.svelte';
	import SimpleDivider from '$lib/components/simple-divider/SimpleDivider.svelte';
	import StartButton from '$lib/components/start-button/StartButton.svelte';
	import { activeTabCache } from '$lib/stores/active-tab';
	import { onMount } from 'svelte';
	let { children } = $props();
	onMount(() => {
		$effect(() => {
			page.subscribe((value) => {
				if (value.url.pathname === '/') {
					activeTabCache.set('/');
				}
			});
		});
	});
</script>

<div class="main">
	<div class="main-page">
		<!-- {#if page.url.pathname !== '/'} -->
		<div class="apps">
			{@render children()}
		</div>
		<!-- {/if} -->
		<div class="desktop">
			<RouteShortcut icon="computer" label="About" route="/about" />
			<RouteShortcut route="/projects" label="Projects" />
			<RouteShortcut route="/game-of-life" label="Game of Life" icon="executable" />
			<RouteShortcut route="/langtons-ant" label="Langton's Ant" icon="executable" />
		</div>
	</div>
	<div class="bottom-panel">
		<StartButton />
		<SimpleDivider />
		<div style="width: 100%">
			<PanelTabs />
		</div>
		<SimpleDivider />
		<PanelSettings />
	</div>
</div>

<style>
	:global(body) {
		font-family: 'Pixelated MS Sans Serif', sans-serif;
		background-color: #bfbfbf;
		margin: 0;
		height: 100vh;
	}
	.main {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.main-page {
		height: calc(100% - 28px);
		background-color: teal;
		padding: 16px 8px;
		position: relative;
	}
	.bottom-panel {
		background-color: #bfbfbf;
		width: 100%;
		height: 28px;
		z-index: 5000;
		padding: 2px 0;
		display: flex;
		flex-direction: row;
		justify-content: center;
		column-gap: 2px;
		align-items: center;
		outline: 1px solid #dfdfdf;
		border-top: 1px solid #ffffff;
	}
	.desktop {
		width: 100%;
		height: 100%;
		display: grid;
		row-gap: 0;
		column-gap: 0;
		grid-template-columns: repeat(auto-fill, 75px);
		grid-template-rows: repeat(auto-fill, 75px);
		overflow-x: scroll;
		scroll-behavior: smooth;
	}
	.apps {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 4500;
	}
</style>
