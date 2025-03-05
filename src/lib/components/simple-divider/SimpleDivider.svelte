<script lang="ts">
	interface Props {
		height?: string;
		margin?: string;
	}
	let { height = '100%', margin = '0' }: Props = $props();
</script>

<div class="divider" style="height: {height}; margin: {margin}"></div>

<style>
	.divider {
		min-width: 1px;
		background-color: #808080;
		border-right: solid 1px #ffffff;
	}
</style>
