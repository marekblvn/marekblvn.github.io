<script>
	import Window from '$lib/components/window/Window.svelte';
	import windowIcon from '$lib/static/icons/executable.ico';
</script>

<Window title="Langton's Ant" icon={windowIcon}>
	<embed
		src="https://marekblvn.github.io/langtons-ant/"
		width="100%"
		height="100%"
		type="text/html"
	/>
</Window>
