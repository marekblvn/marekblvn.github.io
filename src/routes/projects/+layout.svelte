<script lang="ts">
	import Window from '$lib/components/window/Window.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import ExtendedToolbar from '$lib/components/extended-toolbar/ExtendedToolbar.svelte';
	import windowIcon from '$lib/static/icons/directory_open.ico';
	let { children } = $props();
	let label = $state('');
	onMount(() => {
		page.subscribe((value) => {
			const formattedLabel = value.url.pathname
				.slice(1)
				.split('/')
				.map((token) => token.charAt(0).toUpperCase() + token.slice(1))
				.join(' — ');
			label = formattedLabel;
		});
	});
</script>

<Window title={label} icon={windowIcon} toolbar={ExtendedToolbar}>
	{@render children()}
</Window>
