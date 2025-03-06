<script lang="ts">
	import minimizeIcon from '$lib/static/icons/minimize.ico';
	import maximizeIcon from '$lib/static/icons/maximize.ico';
	import closeIcon from '$lib/static/icons/close.ico';
	interface Props {
		onClose?: (event: MouseEvent) => void;
		onMinimize?: (event: MouseEvent) => void;
		onMaximize?: (event: MouseEvent) => void;
	}
	let { onClose = () => {}, onMinimize = () => {}, onMaximize = () => {} }: Props = $props();
</script>

<div class="window-buttons">
	<button onclick={onMinimize}>
		<div class="icon-rect">
			<img src={minimizeIcon} alt="min" class="icon" />
		</div>
	</button>
	<button onclick={onMaximize}>
		<div class="icon-rect">
			<img src={maximizeIcon} alt="max" class="icon" />
		</div>
	</button>
	<button onclick={onClose} style="margin-left: 2px;">
		<div class="icon-rect">
			<img src={closeIcon} alt="close" class="icon" />
		</div>
	</button>
</div>

<style>
	.window-buttons {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50px;
	}
	button {
		background-color: #bfbfbf;
		width: 16px;
		height: 14px;
		border-width: 1px;
		border-style: solid;
		border-color: #ffffff #000000 #000000 #ffffff;
		padding: 1px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	button:active {
		border-color: #000000 #ffffff #ffffff #000000;
	}
	button:active .icon-rect {
		border-color: #808080 #dbdbdb #dbdbdb #808080;
	}
	.icon-rect {
		border-width: 1px;
		border-style: solid;
		border-color: #dbdbdb #808080 #808080 #dbdbdb;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.icon {
		width: 12px;
		height: 10px;
		image-rendering: pixelated;
		user-select: none;
		-webkit-user-drag: none;
	}
</style>
