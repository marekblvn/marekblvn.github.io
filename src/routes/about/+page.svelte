<script>
	import Toolbar from '$lib/components/toolbar/Toolbar.svelte';
	import Window from '$lib/components/window/Window.svelte';
	import windowIcon from '$lib/static/icons/computer.ico';
</script>

<Window title="About" icon={windowIcon} toolbar={Toolbar} />
