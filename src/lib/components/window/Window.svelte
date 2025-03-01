<script lang="ts">
	import { onMount, type Component, type Snippet } from 'svelte';
	import { iconCache } from '$lib/stores/icons';
	import WindowButton from '../window-button/WindowButton.svelte';

	interface Props {
		children?: Snippet;
		icon?: string;
		title?: string;
		toolbar?: Component;
		onCloseWindow?: Function;
	}
	let {
		children,
		icon = 'directory_open',
		title = 'Untitled',
		toolbar,
		onCloseWindow = () => {}
	}: Props = $props();

	let iconAsset = $state('');
	let pos = $state({ top: 120, left: 200 });
	let maximized = $state(false);
	let isResizing = $state(false);
	let dimensions = $state({ width: 300, height: 200 });
	let initialMouseX = $state(0);
	let initialMouseY = $state(0);
	let initialWidth = $state(dimensions.width);
	let initialHeight = $state(dimensions.height);
	let resizeDirection = $state('');

	onMount(() => {
		iconCache.update((cache) => {
			if (cache[icon]) {
				iconAsset = cache[icon];
			} else {
				const uri = `/src/lib/assets/icons/${icon}.ico`;
				cache[icon] = uri;
				iconAsset = uri;
			}
			return cache;
		});
	});

	function minimizeWindow() {
		return;
	}

	function toggleMaximized() {
		maximized = !maximized;
	}

	function closeWindow() {
		onCloseWindow();
		window.history.back();
	}
</script>

<div
	class="resizable"
	style="width: {dimensions.width}px; height: {dimensions.height}px; left: {maximized
		? 0
		: pos.left}px; top: {maximized ? 0 : pos.top}px"
>
	<!-- Corner handles -->
	<div class="resize-handle tl"></div>
	<div class="resize-handle tr"></div>
	<div class="resize-handle bl"></div>
	<div class="resize-handle br"></div>
	<!-- Edge handles -->
	<div class="resize-handle top"></div>
	<div class="resize-handle bottom"></div>
	<div class="resize-handle left"></div>
	<div class="resize-handle right"></div>
	<div class="window-frame">
		<div class="window">
			<div class="top-bar">
				<div class="title">
					<img src={iconAsset} alt="" class="icon" />
					<div class="label">{title}</div>
				</div>
				<div class="window-buttons">
					<WindowButton icon="minimize" onclick={minimizeWindow} />
					<WindowButton icon="maximize" onclick={toggleMaximized} />
					<WindowButton style="margin-left: 2px;" icon="close" onclick={closeWindow} />
				</div>
			</div>
			<div class="content">
				{#if toolbar != null}
					{@const ToolbarComponent = toolbar}
					<ToolbarComponent />
				{/if}
				<div class="children">
					{#if children}
						{@render children()}
					{:else}
						<div id="empty" />
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	#empty {
		height: 100%;
		background-color: #ffffff;
	}
	.resizable {
		position: relative;
		min-width: 300px;
		min-height: 300px;
	}
	.resize-handle {
		position: absolute;
		background-color: transparent;
		z-index: 1;
	}
	/* Corner handles */
	.resize-handle.tl {
		top: 0;
		left: 0;
		width: 5px;
		height: 5px;
		z-index: 2;
		cursor: nw-resize;
	}
	.resize-handle.tr {
		top: 0;
		right: 0;
		width: 5px;
		height: 5px;
		z-index: 2;
		cursor: ne-resize;
	}
	.resize-handle.bl {
		bottom: 0;
		left: 0;
		width: 5px;
		height: 5px;
		z-index: 2;
		cursor: sw-resize;
	}
	.resize-handle.br {
		bottom: 0;
		right: 0;
		width: 5px;
		height: 5px;
		z-index: 2;
		cursor: se-resize;
	}
	/* Edge handles */
	.resize-handle.top {
		top: 0;
		left: 0;
		right: 0;
		height: 5px;
		cursor: n-resize;
	}
	.resize-handle.bottom {
		bottom: 0;
		right: 0;
		left: 0;
		height: 5px;
		cursor: s-resize;
	}
	.resize-handle.left {
		top: 0;
		bottom: 0;
		left: 0;
		width: 5px;
		cursor: w-resize;
	}
	.resize-handle.right {
		top: 0;
		bottom: 0;
		right: 0;
		width: 5px;
		cursor: e-resize;
	}
	.window-frame {
		border-width: 1px;
		border-style: solid;
		border-color: #ffffff #000000 #000000 #ffffff;
		width: calc(100% - 2px);
		height: calc(100% - 2px);
	}
	.window {
		border-width: 1px;
		border-style: solid;
		border-color: #dbdbdb #808080 #808080 #dbdbdb;
		padding: 2px;
		background-color: #bfbfbf;
		width: calc(100% - 6px);
		height: calc(100% - 6px);
	}
	.top-bar {
		width: calc(100% - 4px);
		height: 18px;
		background: linear-gradient(to right, #00007b, #1085d2);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 2px;
		padding-right: 2px;
		margin-bottom: 1px;
	}
	.title {
		display: flex;
		justify-content: start;
		align-items: center;
		column-gap: 2px;
		width: calc(100% - 20px);
	}
	.icon {
		height: 14px;
		width: 14px;
		user-select: none;
	}
	.label {
		color: #ffffff;
		font-family: 'Pixelated MS Sans Serif Bold', sans-serif;
		font-size: 11px;
		font-weight: 500;
		text-align: left;
		vertical-align: bottom;
		user-select: none;
	}
	.window-buttons {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50px;
	}
	.content {
		height: calc(100% - 21px);
		display: flex;
		flex-direction: column;
	}
	.children {
		flex: 1;
		border-width: 1px;
		border-style: solid;
		border-color: #808080 #dbdbdb #dbdbdb #808080;
	}
</style>
