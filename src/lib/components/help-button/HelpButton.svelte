<script lang="ts">
	import { goto } from '$app/navigation';
	import helpIcon from '$lib/static/icons/help.ico';
	function onClick() {
		goto('/help');
	}
</script>

<button onclick={onClick}>
	<img src={helpIcon} alt="" />
</button>

<style>
	button {
		padding: 0;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 19px;
		height: 19px;
		border: none;
		background-color: #bfbfbf;
		cursor: pointer;
	}
	button img {
		height: 19px;
		width: 19px;
	}
</style>
