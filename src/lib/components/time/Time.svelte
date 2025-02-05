<script lang="ts">
	import { onMount } from 'svelte';

	let time = $state(new Date());
	let hours = $derived(time.getHours());
	let minutes = $derived(time.getMinutes());
	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	});
</script>

<div class="rect">
	<p>{hours}:{minutes.toString().padStart(2, '0')}</p>
</div>

<style>
	p {
		height: 14px;
		font-family: 'Pixelated MS Sans Serif', sans-serif;
		font-size: smaller;
		font-weight: 500;
	}
	.rect {
		height: 21px;
		display: flex;
		align-items: center;
		margin-left: 12px;
		margin-right: 12px;
	}
</style>
