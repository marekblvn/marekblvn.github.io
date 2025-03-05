<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/state';

	interface Props {
		label: string;
		backgroundPosition: { x: number; y: number };
		disabled?: boolean;
		onClick?: (event: MouseEvent) => void;
	}
	let { label, backgroundPosition, disabled = false, onClick = (e) => {} }: Props = $props();
</script>

<button class="tool" {disabled} onclick={onClick}>
	<div
		class="icon"
		style="background-position-x: {backgroundPosition.x}px; background-position-y: {backgroundPosition.y}px"
	></div>
	<span class="label">{label}</span>
</button>

<style>
	.tool {
		display: flex;
		flex-direction: column;
		min-width: 54px;
		height: 40px;
		align-items: center;
		justify-content: space-between;
		background-color: #bfbfbf;
		font-family: 'Pixelated MS Sans Serif', sans-serif;
		border-width: 1px;
		border-style: solid;
		border-color: transparent;
	}
	.tool:hover:not(:disabled) {
		border-color: #fff #808080 #808080 #fff;
	}
	.tool:active:not(:disabled) {
		border-color: #808080 #fff #fff #808080;
	}
	.icon {
		background-image: url('/src/lib/static/images/browse-ui-icons-grayscale.png');
		width: 20px;
		height: 20px;
	}
	.tool:hover:not(:disabled) .icon {
		background-image: url('/src/lib/static/images/browse-ui-icons.png');
	}
	.label {
		font-size: 11px;
		text-align: center;
	}
</style>
