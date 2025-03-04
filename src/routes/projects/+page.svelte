<script lang="ts">
	import { goto } from '$app/navigation';
	import Folder from '$lib/components/folder/Folder.svelte';
	import { onMount } from 'svelte';
	let repositories: Array<any> = $state([]);
	onMount(async () => {
		await loadRepositories();
		await loadReadme();
	});

	async function loadRepositories() {
		const url = 'https://api.github.com/users/marekblvn/repos';
		const response = await fetch(url);
		const data: Array<any> = await response.json();
		repositories = data;
	}

	async function loadReadme() {
		const url = 'https://api.github.com/repos/marekblvn/game-of-life/readme';
		const response = await fetch(url);
		const data = await response.json();
		console.log(data);
	}

	function handleDoubleClickFolder(repoName: string) {
		goto(`/projects/${repoName}`);
	}
</script>

<!-- TODO: Create a Toolbar with back button -->

<div class="grid">
	{#each repositories as repo}
		<Folder
			label={repo.name}
			icon={'directory_closed'}
			onClick={() => handleDoubleClickFolder(repo.name)}
		/>
	{/each}
</div>

<style>
	.grid {
		width: 100%;
		height: 100%;
		display: grid;
		row-gap: 4px;
		column-gap: 4px;
		grid-template-columns: repeat(auto-fill, 75px);
		grid-template-rows: repeat(auto-fill, 75px);
		overflow-x: scroll;
		scroll-behavior: smooth;
		padding: 12px 8px;
	}
</style>
