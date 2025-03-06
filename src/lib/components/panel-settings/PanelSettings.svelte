<script>
	import Time from '../time/Time.svelte';
	import timeAndDateIcon from '$lib/static/icons/time_and_date.ico';
</script>

<div class="rect">
	<img src={timeAndDateIcon} alt="time_and_date" />
	<Time />
</div>

<style>
	.rect {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 26px;
		margin-right: 2px;
		border-width: 1px;
		border-style: solid;
		border-color: #808080 #dbdbdb #dbdbdb #808080;
		background-color: #c0c0c0;
	}
	img {
		height: 19px;
		width: 19px;
		margin-left: 3px;
	}
</style>
