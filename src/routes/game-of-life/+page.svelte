<script>
	import Window from '$lib/components/window/Window.svelte';
	import windowIcon from '$lib/static/icons/executable.ico';
</script>

<Window title="Game of Life" icon={windowIcon}>
	<embed
		src="https://marekblvn.github.io/game-of-life/"
		width="100%"
		height="100%"
		type="text/html"
	/>
</Window>
