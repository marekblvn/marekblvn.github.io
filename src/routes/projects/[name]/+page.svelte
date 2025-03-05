<script lang="ts">
	import { page } from '$app/stores';
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	let { name } = $page.params;
	let readmeContent: string = $state('');
	const repoUrl = `https://github.com/marekblvn/${name}`;
	const iconAsset = '/src/lib/assets/icons/search_web.ico';

	onMount(async () => {
		await fetchReadme();
	});

	async function fetchReadme() {
		const url = `https://api.github.com/repos/marekblvn/${name}/readme`;
		const response = await fetch(url);
		const data = await response.json();
		readmeContent = await marked(atob(data.content));
	}
</script>

<div class="markdown">
	<button>
		<div>
			<a href={repoUrl} target="_blank">
				<img src={iconAsset} alt="" />
				<span>Visit project page</span>
			</a>
		</div>
	</button>
	{@html readmeContent}
</div>

<!-- <embed src="https://marekblvn.github.io/langtons-ant/" width="100%" height="300px" /> -->

<style>
	.markdown {
		margin: auto;
		padding: 12px;
		font-size: 14px;
		letter-spacing: 0.3px;
	}
	button {
		border-width: 1px;
		border-style: solid;
		border-color: #ffffff #000000 #000000 #ffffff;
		padding: 0;
	}
	button:active {
		border-color: #000 #fff #fff #000;
	}
	button > div {
		border-width: 1px;
		border-style: solid;
		border-color: #dbdbdb #808080 #808080 #dbdbdb;
		padding: 4px;
	}
	button:active > div {
		border-color: #808080 #dbdbdb #dbdbdb #808080;
	}
	img {
		width: 16px;
		height: 16px;
	}
	a {
		text-decoration: none;
		color: #000;
		font-family: 'Pixelated MS Sans Serif', sans-serif;
		font-weight: 800;
		letter-spacing: 0.2px;
		display: flex;
		align-items: center;
		column-gap: 8px;
	}
</style>
