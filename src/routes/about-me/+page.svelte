<script>
	import Toolbar from '$lib/components/toolbar/Toolbar.svelte';
	import Window from '$lib/components/window/Window.svelte';
	import windowIcon from '$lib/static/icons/user-documents.ico';
</script>

<Window title="About Me" icon={windowIcon} toolbar={Toolbar} />
