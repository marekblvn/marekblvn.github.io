<script>
	import Time from '../time/Time.svelte';
	import timeAndDateIcon from '$lib/static/icons/time_and_date.ico';
	import HelpButton from '../help-button/HelpButton.svelte';
</script>

<div class="rect">
	<HelpButton />
	<button>
		<img src={timeAndDateIcon} alt="time_and_date" />
	</button>
	<Time />
</div>

<style>
	.rect {
		display: flex;
		align-items: center;
		justify-content: center;
		column-gap: 4px;
		height: 26px;
		margin-right: 2px;
		border-width: 1px;
		border-style: solid;
		border-color: #808080 #dbdbdb #dbdbdb #808080;
		background-color: #c0c0c0;
		padding-left: 6px;
		padding-right: 6px;
	}
	button {
		padding: 0;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 19px;
		width: 19px;
		border: none;
		background-color: #bfbfbf;
		margin-right: 8px;
	}
	img {
		height: 19px;
		width: 19px;
	}
</style>
