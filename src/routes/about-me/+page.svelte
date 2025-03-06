<script>
	import { onMount } from 'svelte';
	import Toolbar from '$lib/components/toolbar/Toolbar.svelte';
	import Window from '$lib/components/window/Window.svelte';
	import windowIcon from '$lib/static/icons/user-documents.ico';
	import { marked } from 'marked';

	let markdownContent = $state('');
	onMount(() => {
		import('$lib/static/markdown/ABOUTME.md?raw').then(async (module) => {
			markdownContent = await marked(module.default);
		});
	});
</script>

<Window title="About Me" icon={windowIcon} toolbar={Toolbar}>
	<div class="markdown">
		{@html markdownContent}
	</div>
</Window>

<style>
	.markdown {
		margin: auto;
		padding: 0 12px;
		font-size: 14px;
		letter-spacing: 0.3px;
	}
</style>
