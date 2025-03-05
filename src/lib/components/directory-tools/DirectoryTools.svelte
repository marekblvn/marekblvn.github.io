<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import SimpleDivider from '../simple-divider/SimpleDivider.svelte';
	import ToolIcon from '../tool-icon/ToolIcon.svelte';
	import { page } from '$app/state';

	let currentPage: string = $state('/');
	onMount(() => {
		$effect(() => {
			if (page.url.pathname !== '/') {
				currentPage = page.url.pathname;
			}
		});
	});

	function handleClickBack(): void {
		const stepBack = currentPage.slice(1).split('/').at(-2);
		if (stepBack) {
			goto(`/${stepBack}`);
		}
	}

	function shouldBackBeDisabled(): boolean {
		const stepBack = currentPage.slice(1).split('/').at(-2);
		return stepBack === undefined;
	}

	function handleClickUp(): void {
		const root = currentPage.slice(1).split('/').at(0);
		if (root) {
			goto(`/${root}`);
		}
	}

	function shouldUpBeDisabled(): boolean {
		const root = currentPage.slice(1).split('/').at(0);
		const isAtRootAlready = `/${root}` === currentPage;
		return root === undefined || isAtRootAlready;
	}
</script>

<div class="tools">
	<ToolIcon
		backgroundPosition={{ x: 0, y: 0 }}
		label="Back"
		onClick={handleClickBack}
		disabled={shouldBackBeDisabled()}
	/>
	<ToolIcon backgroundPosition={{ x: -20, y: 0 }} label="Forward" disabled />
	<ToolIcon
		backgroundPosition={{ x: -880, y: 0 }}
		label="Up"
		onClick={handleClickUp}
		disabled={shouldUpBeDisabled()}
	/>
	<SimpleDivider height="24px" margin="0 3px" />
	<ToolIcon backgroundPosition={{ x: -420, y: 0 }} label="Cut" disabled />
	<ToolIcon backgroundPosition={{ x: -440, y: 0 }} label="Copy" disabled />
	<ToolIcon backgroundPosition={{ x: -460, y: 0 }} label="Paste" disabled />
	<SimpleDivider height="24px" margin="0 3px" />
	<ToolIcon backgroundPosition={{ x: -480, y: 0 }} label="Undo" disabled />
	<SimpleDivider height="24px" margin="0 3px" />
	<ToolIcon backgroundPosition={{ x: -520, y: 0 }} label="Delete" disabled />
	<ToolIcon backgroundPosition={{ x: -620, y: 0 }} label="Properties" disabled />
	<SimpleDivider height="24px" margin="0 3px" />
	<ToolIcon backgroundPosition={{ x: -760, y: 0 }} label="Views" disabled />
</div>

<style>
	.tools {
		display: flex;
		flex-direction: row;
		align-items: center;
		overflow-y: scroll;
	}
</style>
