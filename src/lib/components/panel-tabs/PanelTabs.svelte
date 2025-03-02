<script lang="ts">
	import { activeTabCache } from '$lib/stores/active-tab';
	import { tabCache, type Tab } from '$lib/stores/tabs';
	import { onMount } from 'svelte';
	import PanelTab from '../panel-tab/PanelTab.svelte';

	let activeTab = $state('');
	let tabs: Array<Tab> = $state([]);
	onMount(() => {
		activeTabCache.subscribe((value) => {
			activeTab = value;
		});
		tabCache.subscribe((value) => {
			tabs = value;
		});
	});
</script>

<div class="tabs">
	{#each tabs as tab}
		<div class="outer-frame" class:active={tab.title === activeTab}>
			<div class="inner-frame" class:active={tab.title === activeTab}>
				<PanelTab title={tab.title} icon={tab.icon} isActive={activeTab === tab.title} />
			</div>
		</div>
	{/each}
</div>

<!-- FIXME: The tabs are not shrinking properly -->

<style>
	.tabs {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 22px;
		align-items: center;
		gap: 2px;
	}
	.tabs > div {
		flex: 1 1 auto;
		max-width: 200px;
	}
	.outer-frame {
		border-width: 1px;
		border-style: solid;
		border-color: #ffffff #000000 #000000 #ffffff;
	}
	.outer-frame.active {
		border-color: #000000 #ffffff #ffffff #000000;
	}
	.inner-frame {
		border-width: 1px;
		border-style: solid;
		border-color: #dbdbdb #808080 #808080 #dbdbdb;
	}
	.inner-frame.active {
		border-color: #808080 #dbdbdb #dbdbdb #808080;
	}
</style>
