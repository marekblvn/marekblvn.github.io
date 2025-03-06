<script lang="ts">
	import defaultIcon from '$lib/static/icons/directory_closed.ico';
	let { label, icon = defaultIcon, onClick } = $props();
</script>

<div class="rect" ondblclick={onClick}>
	<img src={icon} alt="" class="icon" />
	<div class="label-div">
		{label}
	</div>
</div>

<style>
	.rect {
		width: 75px;
		height: 75px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		row-gap: 4px;
		text-align: center;
	}
	.icon {
		width: 32px;
		height: 32px;
	}
	.label-div {
		height: 37px;
		padding: 0 8px;
		margin-top: 2px;
		overflow: hidden; /* Hide overflowing text */
		display: -webkit-box;
		-webkit-line-clamp: 3; /* Number of lines before ellipsis appears */
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		font-style: 'Pixelated MS Sans Serif', sans-serif;
		font-size: 10px;
		font-weight: 500;
		inline-size: 58px;
		word-wrap: break-word;
		color: #000;
	}
</style>
