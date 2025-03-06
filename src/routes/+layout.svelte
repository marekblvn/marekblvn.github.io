<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import '$lib/static/fonts.css';
	import PanelSettings from '$lib/components/panel-settings/PanelSettings.svelte';
	import PanelTabs from '$lib/components/panel-tabs/PanelTabs.svelte';
	import RouteShortcut from '$lib/components/route-shortcut/RouteShortcut.svelte';
	import SimpleDivider from '$lib/components/simple-divider/SimpleDivider.svelte';
	import StartButton from '$lib/components/start-button/StartButton.svelte';
	import { activeTabCache } from '$lib/stores/active-tab';
	import userDocIcon from '$lib/static/icons/user-documents.ico';
	import executableIcon from '$lib/static/icons/executable.ico';

	interface Route {
		route: string;
		label?: string;
		icon?: string;
	}

	let { children } = $props();
	let shortcuts: Array<Route | undefined> = $state([
		{ route: '/about-me', label: 'About Me', icon: userDocIcon },
		undefined,
		undefined,
		{ route: '/projects', label: 'Projects' },
		undefined,
		{ route: '/game-of-life', label: 'Game of Life', icon: executableIcon },
		{ route: '/langtons-ant', label: "Langton's Ant", icon: executableIcon }
	]);
	onMount(() => {
		$effect(() => {
			page.subscribe((value) => {
				if (value.url.pathname === '/') {
					activeTabCache.set('/');
				}
			});
		});
		const widthCount = Math.floor((window.innerWidth - 20) / 75);
		const heightCount = Math.floor((window.innerHeight - 30) / 75);
		const desktopCapacity = widthCount * heightCount;
		shortcuts.length = desktopCapacity;
	});
	function moveShortcut(from: number, to: number) {
		const movedItem = shortcuts.splice(from, 1)[0];
		shortcuts.splice(to, 0, movedItem);
	}
	function handleDrop(event: DragEvent, index: number) {
		event.preventDefault();
		const fromIndex = Number(event.dataTransfer?.getData('text/plain'));
		if (!isNaN(fromIndex) && fromIndex !== index) {
			moveShortcut(fromIndex, index);
		}
	}
</script>

<div class="main">
	<div class="main-page">
		<!-- {#if page.url.pathname !== '/'} -->
		<div class="apps">
			{@render children()}
		</div>
		<!-- {/if} -->
		<div class="desktop">
			{#each shortcuts as shortcut, index}
				{#if shortcut}
					<RouteShortcut {...shortcut} {index} onMove={moveShortcut} />
				{:else}
					<div
						class="empty-space"
						ondrop={(e) => handleDrop(e, index)}
						ondragover={(e) => e.preventDefault()}
					></div>
				{/if}
			{/each}
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
		padding: 15px 10px;
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
		grid-template-columns: repeat(auto-fill, 75px);
		grid-template-rows: repeat(auto-fill, 75px);
		gap: 0px;
		grid-auto-flow: column;
		overflow-x: scroll;
		scroll-behavior: smooth;
	}
	.apps {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 4500;
	}
	.empty-space {
		width: 75px;
		height: 75px;
	}
</style>
