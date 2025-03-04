<script lang="ts">
	import Window from '$lib/components/window/Window.svelte';
	import Toolbar from '$lib/components/toolbar/Toolbar.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
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

<Window title={label} toolbar={Toolbar}>
	{@render children()}
</Window>
